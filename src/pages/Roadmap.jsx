import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { AlertCircle, Calendar, GripVertical } from 'lucide-react';
import { checklistData } from '../data/checklistData';
import { cn } from '../lib/utils';

const STORAGE_KEY_CHECKLIST = 'entra_checklist_data';
const STORAGE_KEY_ROADMAP = 'entra_roadmap_layout';

// Initial columns structure
const initialColumns = {
    phase1: {
        id: 'phase1',
        title: 'Phase 1: Immediate',
        itemIds: [],
        color: 'border-red-500',
        bg: 'bg-red-50'
    },
    phase2: {
        id: 'phase2',
        title: 'Phase 2: Short-term',
        itemIds: [],
        color: 'border-orange-500',
        bg: 'bg-orange-50'
    },
    phase3: {
        id: 'phase3',
        title: 'Phase 3: Long-term',
        itemIds: [],
        color: 'border-blue-500',
        bg: 'bg-blue-50'
    },
};

const Roadmap = () => {
    // 1. Load Checklist Data to get the items that need to be planned
    const [checklistItems, setChecklistItems] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
        if (saved) {
            const parsedSaved = JSON.parse(saved);
            return checklistData.map(defaultItem => {
                const savedItem = parsedSaved.find(i => i.id === defaultItem.id);
                return savedItem ? { ...defaultItem, ...savedItem } : defaultItem;
            });
        }
        return checklistData;
    });

    // 2. Load Roadmap Layout
    const [columns, setColumns] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_ROADMAP);
        return saved ? JSON.parse(saved) : initialColumns;
    });

    // Sync logic: Identify items that are "Not Implemented" or "Planned" but NOT yet in the roadmap
    useEffect(() => {
        const actionableItems = checklistItems.filter(i =>
            i.status === 'Not Implemented' || i.status === 'Planned'
        );

        // Get all IDs currently in columns
        const currentIdsInRoadmap = new Set(
            Object.values(columns).flatMap(col => col.itemIds)
        );

        const newItems = actionableItems.filter(i => !currentIdsInRoadmap.has(i.id));

        if (newItems.length > 0) {
            setColumns(prev => ({
                ...prev,
                phase1: {
                    ...prev.phase1,
                    itemIds: [...prev.phase1.itemIds, ...newItems.map(i => i.id)]
                }
            }));
        }
    }, [checklistItems]); // Run once on mount/data load, but simpler to rely on items change

    // Save columns whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(columns));
    }, [columns]);


    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newItemIds = Array.from(start.itemIds);
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                itemIds: newItemIds,
            };

            setColumns(prev => ({
                ...prev,
                [newColumn.id]: newColumn,
            }));
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.itemIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            itemIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.itemIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            itemIds: finishTaskIds,
        };

        setColumns(prev => ({
            ...prev,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        }));
    };

    const getItemDetails = (id) => checklistItems.find(i => i.id === id);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Project Roadmap</h2>
                <p className="text-slate-500 text-sm">Plan and prioritize your implementation phases.</p>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-1 gap-6 overflow-x-auto pb-4 h-full">
                    {Object.values(columns).map((column) => (
                        <div
                            key={column.id}
                            className="flex flex-col flex-1 min-w-[320px] bg-slate-100 rounded-md border border-slate-200"
                        >
                            <div className={cn("p-4 border-b border-slate-200 rounded-t-md bg-white flex justify-between items-center", column.color.replace('border-', 'border-t-4 '))}>
                                <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{column.title}</h3>
                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                                    {column.itemIds.length}
                                </span>
                            </div>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={cn(
                                            "flex-1 p-3 space-y-3 overflow-y-auto transition-colors",
                                            snapshot.isDraggingOver ? "bg-slate-200/50" : ""
                                        )}
                                    >
                                        {column.itemIds.map((itemId, index) => {
                                            const item = getItemDetails(itemId);
                                            if (!item) return null; // Should not happen

                                            return (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={cn(
                                                                "bg-white p-4 rounded border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing",
                                                                snapshot.isDragging ? "shadow-lg rotate-1 ring-1 ring-[#0078D4]" : ""
                                                            )}
                                                            style={provided.draggableProps.style}
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className={cn(
                                                                    "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
                                                                    item.impact === 'Critical' ? "bg-red-50 text-red-700" :
                                                                        item.impact === 'High' ? "bg-orange-50 text-orange-700" :
                                                                            "bg-blue-50 text-blue-700"
                                                                )}>
                                                                    {item.impact}
                                                                </span>
                                                                <GripVertical className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-800 line-clamp-3">
                                                                {item.item}
                                                            </p>
                                                            <div className="mt-3 flex items-center text-xs text-slate-400">
                                                                <span className="truncate max-w-[150px]">{item.category}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Roadmap;

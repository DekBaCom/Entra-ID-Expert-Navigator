import React, { useState, useEffect } from 'react';
import { Save, ExternalLink, AlertCircle, CheckCircle2, Circle, XCircle, MinusCircle } from 'lucide-react';
import { checklistData } from '../data/checklistData';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'entra_checklist_data';

const Checklist = () => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            // Merge saved data with latest structure in case new items were added to code
            const parsedSaved = JSON.parse(saved);
            return checklistData.map(defaultItem => {
                const savedItem = parsedSaved.find(i => i.id === defaultItem.id);
                return savedItem ? { ...defaultItem, ...savedItem } : defaultItem;
            });
        }
        return checklistData.map(item => ({ ...item, status: 'Not Implemented', notes: '' }));
    });

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            setHasUnsavedChanges(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [items]);

    const updateItem = (id, field, value) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
        setHasUnsavedChanges(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Implemented': return 'bg-green-100 text-green-700 border-green-200';
            case 'Planned': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Not Implemented': return 'bg-red-100 text-red-700 border-red-200';
            case 'N/A': return 'bg-slate-100 text-slate-700 border-slate-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const categories = [...new Set(items.map(i => i.category))];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Entra Audit Checklist</h2>
                    <p className="text-slate-500">Track implementation status against best practices.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={cn("text-sm transition-opacity", hasUnsavedChanges ? "opacity-100 text-amber-500" : "opacity-100 text-green-500")}>
                        {hasUnsavedChanges ? "Saving..." : "All changes saved"}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {categories.map(category => (
                    <div key={category} className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center">
                            <h3 className="text-base font-semibold text-slate-800">{category}</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {items.filter(i => i.category === category).map(item => (
                                <div key={item.id} className="p-4 transition-colors hover:bg-slate-50/80 group">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-sm font-semibold text-slate-900">{item.item}</h4>
                                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border uppercase tracking-wide ml-2",
                                                    item.impact === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' :
                                                        item.impact === 'High' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                            'bg-blue-50 text-blue-700 border-blue-100'
                                                )}>
                                                    {item.impact}
                                                </span>
                                            </div>

                                            <div className="flex items-center mt-1">
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center text-xs text-[#0078D4] hover:underline"
                                                >
                                                    Documentation <ExternalLink className="h-3 w-3 ml-1" />
                                                </a>
                                            </div>

                                            <div className="pt-2">
                                                <textarea
                                                    placeholder="Implementation notes..."
                                                    className="w-full text-xs p-2 rounded border border-slate-200 focus:ring-1 focus:ring-[#0078D4] focus:border-[#0078D4] min-h-[60px] bg-slate-50 focus:bg-white transition-colors"
                                                    value={item.notes || ''}
                                                    onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 w-full lg:w-40">
                                            <div className="grid grid-cols-1 gap-1.5">
                                                {['Implemented', 'Planned', 'Not Implemented', 'N/A'].map((statusOption) => (
                                                    <button
                                                        key={statusOption}
                                                        onClick={() => updateItem(item.id, 'status', statusOption)}
                                                        className={cn(
                                                            "flex items-center px-3 py-1.5 text-xs rounded border transition-all text-left",
                                                            item.status === statusOption
                                                                ? getStatusColor(statusOption) + " shadow-sm font-medium"
                                                                : "bg-white border-transparent text-slate-500 hover:bg-slate-100"
                                                        )}
                                                    >
                                                        {statusOption === 'Implemented' && <CheckCircle2 className="h-3.5 w-3.5 mr-2" />}
                                                        {statusOption === 'Planned' && <Circle className="h-3.5 w-3.5 mr-2" />}
                                                        {statusOption === 'Not Implemented' && <XCircle className="h-3.5 w-3.5 mr-2" />}
                                                        {statusOption === 'N/A' && <MinusCircle className="h-3.5 w-3.5 mr-2" />}
                                                        {statusOption}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checklist;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, CheckSquare, BarChart, Map, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = () => {
    const navItems = [
        { name: 'Entra Learn', path: '/learn', icon: BookOpen },
        { name: 'Audit Checklist', path: '/checklist', icon: CheckSquare },
        { name: 'Assessment & Report', path: '/assessment', icon: BarChart },
        { name: 'Roadmap Planner', path: '/roadmap', icon: Map },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] z-20">
            {/* Header Area behaving like the Suite Bar */}
            <div className="h-14 bg-[#0078D4] flex items-center px-4 shrink-0 shadow-sm">
                <LayoutDashboard className="h-6 w-6 text-white mr-3" />
                <h1 className="text-base font-semibold text-white tracking-wide">
                    Entra ID <span className="font-normal opacity-90">Expert</span>
                </h1>
            </div>

            <div className="p-2 flex-col flex-1 overflow-y-auto pt-6">
                <div className="px-3 mb-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Navigation</p>
                </div>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-all duration-100",
                                    isActive
                                        ? "bg-slate-100 text-[#0078D4] font-semibold ring-1 ring-slate-200 border-l-4 border-[#0078D4]"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={cn("h-4 w-4", isActive ? "text-[#0078D4]" : "text-slate-500")} />
                                    <span>{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-100 bg-slate-50/50">
                <div className="text-xs text-slate-500 flex flex-col gap-1">
                    <p className="font-semibold text-slate-700">Microsoft Identity</p>
                    <p>Consulting Toolkit v1.0</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

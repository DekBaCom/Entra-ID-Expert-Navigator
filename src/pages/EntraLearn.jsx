import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { architectureScenarios } from '../data/checklistData';

const EntraLearn = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedScenario, setSelectedScenario] = useState(null);

    const filteredScenarios = architectureScenarios.filter(scenario =>
        scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Entra Learning Hub</h2>
                <p className="text-slate-500">Explore architecture scenarios and best practices.</p>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search topics..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScenarios.map((scenario) => (
                    <div
                        key={scenario.id}
                        className="group bg-white rounded-md border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col h-full"
                        onClick={() => setSelectedScenario(scenario)}
                    >
                        <div className="h-40 overflow-hidden border-b border-slate-100">
                            <img
                                src={scenario.imageUrl}
                                alt={scenario.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-semibold text-[#0078D4] mb-2 group-hover:underline decoration-2 underline-offset-2">
                                {scenario.title}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                                {scenario.description}
                            </p>
                            <div className="mt-auto pt-4 border-t border-slate-100">
                                <span className="text-xs font-semibold uppercase text-slate-500 group-hover:text-[#0078D4] transition-colors">
                                    Read Architecture →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedScenario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-slate-200">
                        <div className="sticky top-0 right-0 bg-white/95 backdrop-blur z-10 p-4 border-b border-slate-100 flex justify-end">
                            <button
                                onClick={() => setSelectedScenario(null)}
                                className="p-2 rounded hover:bg-slate-100 transition-colors"
                            >
                                <X className="h-6 w-6 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedScenario.title}</h2>
                            <div className="rounded-xl overflow-hidden mb-6 border border-slate-200">
                                <img
                                    src={selectedScenario.imageUrl}
                                    alt={selectedScenario.title}
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {selectedScenario.description}
                                </p>
                                {/* Placeholder for more detailed content */}
                                <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg">
                                    <h4 className="font-semibold mb-2">Key Considerations:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Security implications and risk assessment</li>
                                        <li>User experience and seamless access</li>
                                        <li>Scalability and maintenance</li>
                                        <li>Compliance requirements</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntraLearn;

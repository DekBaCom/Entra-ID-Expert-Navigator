import React, { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { checklistData } from '../data/checklistData';

const STORAGE_KEY = 'entra_checklist_data';

const AssessmentReport = () => {
    const items = useMemo(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsedSaved = JSON.parse(saved);
            return checklistData.map(defaultItem => {
                const savedItem = parsedSaved.find(i => i.id === defaultItem.id);
                return savedItem ? { ...defaultItem, ...savedItem } : defaultItem;
            });
        }
        return checklistData;
    }, []);

    const stats = useMemo(() => {
        const categories = [...new Set(items.map(i => i.category))];
        const data = categories.map(cat => {
            const catItems = items.filter(i => i.category === cat);
            const implemented = catItems.filter(i => i.status === 'Implemented').length;
            const total = catItems.filter(i => i.status !== 'N/A').length; // Exclude N/A from denominator? Usually yes.
            const score = total === 0 ? 0 : Math.round((implemented / total) * 100);
            return {
                subject: cat,
                A: score,
                fullMark: 100,
                totalItems: total,
                implementedCount: implemented
            };
        });

        const totalImplemented = items.filter(i => i.status === 'Implemented').length;
        const totalApplicable = items.filter(i => i.status !== 'N/A').length;
        const overallScore = totalApplicable === 0 ? 0 : Math.round((totalImplemented / totalApplicable) * 100);

        return { chartData: data, overallScore };
    }, [items]);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.setTextColor(41, 70, 91);
        doc.text("Entra ID Assessment Report", 20, 20);

        doc.setFontSize(12);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

        // Executive Summary
        doc.setFontSize(16);
        doc.text("Executive Summary", 20, 45);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Overall Maturity Score: ${stats.overallScore}%`, 20, 55);

        // Critical Gaps
        doc.setFontSize(16);
        doc.setTextColor(190, 20, 20);
        doc.text("Critical Gaps (Not Implemented)", 20, 70);

        const criticalItems = items.filter(i => i.status === 'Not Implemented' && (i.impact === 'Critical' || i.impact === 'High'));

        const tableData = criticalItems.map(item => [
            item.category,
            item.item,
            item.impact
        ]);

        doc.autoTable({
            startY: 75,
            head: [['Category', 'Item', 'Impact']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [41, 70, 91] },
        });

        doc.save("entra-assessment-report.pdf");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Assessment Report</h2>
                    <p className="text-slate-500 text-sm">Visualization of your current identity posture.</p>
                </div>
                <button
                    onClick={generatePDF}
                    className="inline-flex items-center px-4 py-2 bg-[#0078D4] text-white rounded-sm hover:bg-[#106EBE] transition-colors shadow-sm font-medium text-sm"
                >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overall Score Card */}
                <div className="lg:col-span-1 bg-white rounded-md shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
                    <h3 className="text-base font-semibold text-slate-800 mb-6 self-start w-full border-b border-slate-100 pb-2">Overall Maturity</h3>
                    <div className="relative size-48 flex items-center justify-center">
                        <svg className="size-full" viewBox="0 0 36 36">
                            <path
                                className="text-slate-100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                className={stats.overallScore >= 70 ? "text-green-600" : stats.overallScore >= 40 ? "text-yellow-500" : "text-red-500"}
                                strokeDasharray={`${stats.overallScore}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-5xl font-light text-slate-900">{stats.overallScore}%</span>
                            <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">Score</span>
                        </div>
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="lg:col-span-2 bg-white rounded-md shadow-sm border border-slate-200 p-6 h-[400px]">
                    <h3 className="text-base font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.chartData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Score"
                                dataKey="A"
                                stroke="#0078D4"
                                fill="#0078D4"
                                fillOpacity={0.5}
                            />
                            <Tooltip contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart for Detail */}
            <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6 h-[400px]">
                <h3 className="text-base font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-2">Implementation Progress by Category</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={stats.chartData} layout="vertical" margin={{ left: 50, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="subject" type="category" width={150} tick={{ fontSize: 13, fill: '#475569' }} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="A" fill="#0078D4" radius={[0, 4, 4, 0]} barSize={24} name="Score %" background={{ fill: '#f1f5f9' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AssessmentReport;

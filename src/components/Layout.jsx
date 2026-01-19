import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#f3f2f1]">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <div className="max-w-7xl mx-auto p-8 animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;

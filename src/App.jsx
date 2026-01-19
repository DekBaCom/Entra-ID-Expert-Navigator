import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EntraLearn from './pages/EntraLearn';
import Checklist from './pages/Checklist';
import AssessmentReport from './pages/AssessmentReport';
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/learn" replace />} />
        <Route path="/learn" element={<EntraLearn />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/assessment" element={<AssessmentReport />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </Layout>
  );
}

export default App;

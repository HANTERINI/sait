import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import SoonPage from './pages/SoonPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="App min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/gpt" element={<SoonPage />} />
        <Route path="/soon" element={<SoonPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
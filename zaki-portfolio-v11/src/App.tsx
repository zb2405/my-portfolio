import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Navbar/Sidebar';
import { AboutPage } from '../app/about/page';
import { ExperiencePage } from '../app/experience/page';
import { HomePage } from '../app/home/page';
import { ProjectsPage } from '../app/projects/page';
import { SkillsPage } from '../app/skills/page';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
}

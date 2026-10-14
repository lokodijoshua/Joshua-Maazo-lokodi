/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SkillsBanner } from './components/SkillsBanner';
import { SelectedProjectsSection } from './components/SelectedProjectsSection';
import { ExperienceAndContactSection } from './components/ExperienceAndContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { CertificationsModal } from './components/CertificationsModal';
import { InteractiveCrudDemoModal } from './components/InteractiveCrudDemoModal';
import { Project } from './types/portfolio';
import { DEVELOPER_INFO } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);
  const [isCrudDemoOpen, setIsCrudDemoOpen] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById('selected-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const resumeText = `# ${DEVELOPER_INFO.name}
${DEVELOPER_INFO.title}
Email: ${DEVELOPER_INFO.email}
Location: ${DEVELOPER_INFO.location}

## ABOUT
${DEVELOPER_INFO.bio}

## CORE COMPETENCIES
- AI Automation & Autonomous Agent Pipelines (Python, LangChain, OpenAI, LLM fine-tuning)
- Full Stack Engineering (React 19, TypeScript, Next.js, Node.js, Express, PostgreSQL)
- UI/UX Design & Systems (Figma, Atomic Component Tokens, WCAG AA Accessibility)
- High Performance Web Applications (CRUD architectures, real-time WebSockets, Three.js 3D)

## SELECTED CLIENT WORKS
1. Aura Wellness & Flow — Enterprise UI/UX Design System & Behavioral Health Platform
2. FlowState AI Automation — Autonomous Agent Orchestration & Real-Time Pipeline Engine
3. Apex Finance Platform — Next-Gen Fintech & Neo-Banking Mobile & Web Interface
4. SwiftFlow Workspace — Real-Time Collaborative Kanban & CRUD Project Engine

## CERTIFICATIONS
- Google Advanced Data Analytics Professional Certificate
- freeCodeCamp JavaScript Algorithms & Data Structures
- Meta Front-End Developer Professional Certificate
- Tailwind CSS Official Certification
- Supabase Fundamentals & Realtime Architecture
`;
    const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Joshua_Maazo_Lokodi_Resume_${new Date().getFullYear()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#faf7f0] text-gray-900 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* Top Header Navigation */}
      <Header
        onOpenContact={scrollToContact}
        onOpenCertifications={() => setIsCertificationsOpen(true)}
        onOpenCrudDemo={() => setIsCrudDemoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onScrollToProjects={scrollToProjects}
          onOpenContact={scrollToContact}
          onOpenCertifications={() => setIsCertificationsOpen(true)}
        />

        {/* Skills Banner Strip */}
        <SkillsBanner
          onSelectSkill={scrollToProjects}
        />

        {/* Selected Works Section */}
        <SelectedProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenCertifications={() => setIsCertificationsOpen(true)}
          onOpenCrudDemo={() => setIsCrudDemoOpen(true)}
        />

        {/* Experience Timeline & Contact Section */}
        <ExperienceAndContactSection
          onOpenContact={scrollToContact}
          onDownloadResume={handleDownloadResume}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchCrudDemo={() => {
          setSelectedProject(null);
          setIsCrudDemoOpen(true);
        }}
      />

      {/* Full Certifications Archive Modal (matching Reference 1) */}
      <CertificationsModal
        isOpen={isCertificationsOpen}
        onClose={() => setIsCertificationsOpen(false)}
        onOpenProjects={() => {
          setIsCertificationsOpen(false);
          scrollToProjects();
        }}
      />

      {/* Interactive Live CRUD Application Modal */}
      <InteractiveCrudDemoModal
        isOpen={isCrudDemoOpen}
        onClose={() => setIsCrudDemoOpen(false)}
      />
    </div>
  );
}

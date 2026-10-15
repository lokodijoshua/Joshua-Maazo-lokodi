import React, { useState } from 'react';
import { DEVELOPER_INFO } from '@/src/data/portfolioData';
import { ThreeModelScene } from '@/src/components/ThreeModelScene';
import { 
  ArrowUpRight, Download, Github, Linkedin, Twitter, Mail, 
  Box 
} from 'lucide-react';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onOpenContact: () => void;
  onOpenCertifications: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProjects,
  onOpenContact
}) => {
  // Use explicit Cloudinary .jpg conversion URL for guaranteed browser rendering
  const [photoUrl] = useState<string>("https://res.cloudinary.com/dyzlx6pnt/image/upload/v1792022631/IMG_0752_jjffg8.jpg");
  const [activeRightTab, setActiveRightTab] = useState<'photo' | '3d'>('photo');

  const handleDownloadResume = () => {
    const resumeText = `# JOSHUA MAAZO LOKODI
Software Developer & AI Systems Engineer
Email: ${DEVELOPER_INFO.email} | Open to Global & Remote Roles

## PROFESSIONAL SUMMARY
Software Developer with expertise in AI Automation, Full Stack Engineering, and UI/UX Systems. Proven track record in architecting responsive web applications, autonomous agent pipelines, and high-performance relational databases.

## TECHNICAL STACK
- Frontend: React 19, TypeScript, Next.js, Tailwind CSS, Three.js, Redux, Zustand
- AI & Automation: Python, LLM Orchestration, LangChain, Vector Embeddings, Prompt Systems
- Backend & DB: Node.js, Express, PostgreSQL, Supabase, RESTful CRUD APIs, Docker
- Design: Figma, Atomic Design Systems, User Research, WCAG AA Accessibility

## SELECTED CLIENT PROJECTS
- Aura Wellness & Flow: Enterprise UI/UX Design System & Behavioral Health Platform
- FlowState AI Automation: Autonomous Agent Orchestration & Real-Time Pipeline Engine
- Apex Finance Platform: Neo-Banking Mobile & Web Interface
- SwiftFlow Workspace: Collaborative Real-Time Kanban & CRUD Platform

## RECENT CERTIFICATIONS
- Google Advanced Data Analytics Professional Certificate
- freeCodeCamp JavaScript Algorithms & Data Structures
- Meta Front-End Developer Professional Certificate
- Tailwind CSS Official Certification
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
    <section id="hero" className="relative w-full border-b-2 border-black bg-grid-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500 text-white font-mono font-bold text-xs border-neo shadow-neo-sm rounded-md mb-4 uppercase">
              <span>HEY, I'M JOSHUA 👋</span>
            </div>

            {/* Developer Name in Big Bold Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-[1.05] mb-2 uppercase">
              JOSHUA MAAZO LOKODI
            </h1>

            {/* Role Title */}
            <div className="text-xl sm:text-3xl font-extrabold text-purple-700 tracking-tight mb-4 uppercase font-mono">
              SOFTWARE DEVELOPER
            </div>

            {/* Domain Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-200 border-neo rounded">
                ⚡ AI Automation
              </span>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-pink-200 border-neo rounded">
                ✦ UI/UX Design
              </span>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-lime-200 border-neo rounded">
                ☵ Web Development
              </span>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-200 border-neo rounded">
                ⚙ Full Stack Engineering
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed max-w-xl mb-8">
              {DEVELOPER_INFO.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={onScrollToProjects}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-extrabold bg-lime-300 hover:bg-lime-400 text-black border-neo shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rounded-lg"
              >
                <span>VIEW MY WORK</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleDownloadResume}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-extrabold bg-white hover:bg-gray-100 text-black border-neo shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rounded-lg"
              >
                <span>DOWNLOAD RESUME</span>
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveRightTab(activeRightTab === '3d' ? 'photo' : '3d')}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold bg-purple-100 hover:bg-purple-200 text-purple-900 border-neo rounded-lg transition-colors"
                title="Toggle between Developer Portrait and Interactive 3D Model"
              >
                <Box className="w-4 h-4 text-purple-700" />
                <span>{activeRightTab === '3d' ? 'VIEW PORTRAIT' : 'VIEW 3D ASSET'}</span>
              </button>
            </div>

            {/* Connect With Me Socials */}
            <div className="flex flex-col gap-2 w-full pt-4 border-t border-gray-300">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600">
                CONNECT WITH ME:
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={DEVELOPER_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white border-neo shadow-neo-sm hover:translate-y-[-2px] transition-all rounded-lg text-black hover:bg-gray-50"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={DEVELOPER_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white border-neo shadow-neo-sm hover:translate-y-[-2px] transition-all rounded-lg text-black hover:bg-gray-50"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={DEVELOPER_INFO.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white border-neo shadow-neo-sm hover:translate-y-[-2px] transition-all rounded-lg text-black hover:bg-gray-50"
                  title="Twitter / X Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <button
                  onClick={onOpenContact}
                  className="p-2.5 bg-white border-neo shadow-neo-sm hover:translate-y-[-2px] transition-all rounded-lg text-black hover:bg-gray-50"
                  title={`Email Joshua (${DEVELOPER_INFO.email})`}
                >
                  <Mail className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-gray-500 ml-2 hidden sm:inline">
                  {DEVELOPER_INFO.email}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Neobrutalist Media Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Outer Pink Card Frame */}
            <div className="relative w-full max-w-[440px] bg-rose-300 border-neo-thick shadow-neo-lg rounded-2xl p-4 sm:p-5">
              
              {/* Media Mode Switcher Tabs */}
              <div className="flex items-center justify-between mb-3 bg-white border-neo rounded-lg p-1 font-mono text-xs font-bold">
                <button
                  onClick={() => setActiveRightTab('photo')}
                  className={`flex-1 py-1 text-center rounded transition-all ${
                    activeRightTab === 'photo' 
                      ? 'bg-rose-400 text-black font-extrabold shadow-neo-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  [DEVELOPER PORTRAIT]
                </button>
                <button
                  onClick={() => setActiveRightTab('3d')}
                  className={`flex-1 py-1 text-center rounded transition-all flex items-center justify-center gap-1 ${
                    activeRightTab === '3d' 
                      ? 'bg-purple-600 text-white font-extrabold shadow-neo-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>[3D TECH SCENE]</span>
                </button>
              </div>

              {/* View 1: Developer Photo Card (Explicit .jpg Cloudinary format) */}
              {activeRightTab === 'photo' ? (
                <div className="relative">
                  {/* Green Inner Photo Frame */}
                  <div className="relative bg-lime-300 border-neo-thick rounded-xl p-2.5 shadow-neo">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-neo bg-black flex items-center justify-center">
                      <img
                        src={photoUrl}
                        alt="Joshua Maazo Lokodi - Software Developer & AI Systems Engineer"
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* View 2: Three.js 3D Procedural Scene */
                <div className="relative w-full aspect-[3/4] min-h-[380px]">
                  <ThreeModelScene className="w-full h-full" isInteractive={true} />
                </div>
              )}

              {/* Signature Retro Floating Terminal Card */}
              <div className="mt-3 p-3 bg-purple-900 text-purple-100 border-neo shadow-neo rounded-xl font-mono text-[11px] leading-relaxed">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-purple-800 text-[10px] text-purple-300">
                  <span>TERMINAL · JOSHUA_CONFIG.TS</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-purple-300">&gt; const developer = &#123;</div>
                <div className="pl-3 text-purple-200">
                  code: <span className="text-lime-300">'TypeScript & Python'</span>,
                </div>
                <div className="pl-3 text-purple-200">
                  build: <span className="text-cyan-300">'Full Stack & AI'</span>,
                </div>
                <div className="pl-3 text-purple-200">
                  design: <span className="text-amber-300">'UI/UX Systems'</span>,
                </div>
                <div className="pl-3 text-purple-200">
                  passion: <span className="text-pink-300">'Impactful Products'</span>
                </div>
                <div className="text-purple-300">&#125;</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

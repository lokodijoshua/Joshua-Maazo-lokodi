import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types/portfolio';
import { SELECTED_PROJECTS, CERTIFICATIONS_LIST } from '../data/portfolioData';
import { 
  ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, 
  ExternalLink, Layers, Award, Sparkles, Play, Check 
} from 'lucide-react';

interface SelectedProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenCertifications: () => void;
  onOpenCrudDemo: () => void;
}

export const SelectedProjectsSection: React.FC<SelectedProjectsSectionProps> = ({
  onSelectProject,
  onOpenCertifications,
  onOpenCrudDemo
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Selected Works' },
    { id: 'ux-design', label: 'UX Design' },
    { id: 'full-stack', label: 'Full Stack App' },
    { id: 'ui-design', label: 'UI Design' },
    { id: 'crud-app', label: 'CRUD Application' }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? SELECTED_PROJECTS 
    : SELECTED_PROJECTS.filter(p => p.category === activeCategory);

  const activeProject = filteredProjects[currentIndex % filteredProjects.length] || SELECTED_PROJECTS[0];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  // Top 3 certifications for the right sidebar card
  const topCerts = CERTIFICATIONS_LIST.slice(0, 3);

  return (
    <section id="selected-works" className="w-full bg-[#fbf8f2] border-b-2 border-black py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Strip matching Reference Image */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-200 border-neo rounded font-mono text-xs font-bold text-black uppercase mb-1">
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              SELECTED WORKS
            </h2>
          </div>

          {/* Right Action & Carousel Controls */}
          <div className="flex items-center gap-3">
            {/* Prev / Next buttons from reference layout */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-9 h-9 flex items-center justify-center bg-rose-300 hover:bg-rose-400 border-neo shadow-neo-sm active:translate-y-0.5 transition-all rounded font-bold text-black cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 flex items-center justify-center bg-rose-300 hover:bg-rose-400 border-neo shadow-neo-sm active:translate-y-0.5 transition-all rounded font-bold text-black cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Functional Filter Controls) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-white border-neo rounded-xl shadow-neo-sm">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-neo-sm'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Layout matching Reference Image (Left: Project Feature, Right: Certifications preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Big Project Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative flex flex-col bg-white border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden h-full">
              
              {/* Pink Photo Card Container matching Reference layout */}
              <div className="p-4 sm:p-6 bg-rose-200 border-b-2 border-black">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border-neo-thick bg-black shadow-neo group cursor-pointer"
                  onClick={() => onSelectProject(activeProject)}
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Category overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white border-neo shadow-neo-sm rounded font-mono font-bold text-xs text-black">
                    {activeProject.categoryLabel}
                  </div>

                  {activeProject.category === 'crud-app' && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-lime-300 border-neo shadow-neo-sm rounded-lg font-mono font-black text-xs text-black">
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>LIVE CRUD DEMO READY</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details Bottom Area */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-purple-700">
                      Client: {activeProject.client} · {activeProject.year}
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      Project 0{currentIndex + 1} / 0{filteredProjects.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2">
                    {activeProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed mb-4">
                    {activeProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono font-bold bg-[#f4efe4] border-neo rounded text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-black">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectProject(activeProject)}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-extrabold bg-white hover:bg-gray-100 text-black border-neo shadow-neo-sm rounded transition-all"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {activeProject.category === 'crud-app' && (
                      <button
                        onClick={onOpenCrudDemo}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-extrabold bg-lime-300 hover:bg-lime-400 text-black border-neo shadow-neo rounded transition-all animate-bounce-subtle"
                      >
                        <span>TRY LIVE CRUD APP</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Carousel Dots */}
                  <div className="flex items-center gap-1.5">
                    {filteredProjects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full border border-black transition-all ${
                          i === currentIndex ? 'bg-black w-6' : 'bg-gray-200 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Certifications Highlight Box (4 cols) matching Baseline Layout */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-lime-300 border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden flex-1 flex flex-col">
              
              {/* Lime Header */}
              <div className="p-4 sm:p-5 border-b-2 border-black">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-black">
                  CREDENTIALS & AUDITS
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-black uppercase">
                  CERTIFICATIONS
                </h3>
              </div>

              {/* List of Certs cards */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3 justify-center bg-[#fdfdfc]">
                {topCerts.map((cert, idx) => (
                  <div
                    key={cert.id}
                    onClick={onOpenCertifications}
                    className="p-3.5 bg-white border-neo rounded-xl shadow-neo-sm hover:translate-x-1 hover:shadow-neo transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-black group-hover:text-purple-600 transition-colors leading-snug">
                      {cert.title}
                    </h4>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span>{cert.issueDate}</span>
                      <span className="text-black font-bold">View →</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Certifications Bottom Button */}
              <div className="p-4 bg-white border-t-2 border-black text-center">
                <button
                  onClick={onOpenCertifications}
                  className="w-full py-2.5 px-4 font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-lime-300 hover:bg-lime-400 border-neo shadow-neo-sm hover:translate-y-[-1px] transition-all rounded-lg flex items-center justify-center gap-1.5"
                >
                  <span>VIEW ALL CERTIFICATIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Grid Preview of the Other 3 Selected Works */}
        <div className="mt-12 pt-8 border-t-2 border-black">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono font-extrabold text-sm sm:text-base uppercase tracking-wider text-black">
              EXPLORE ALL 4 SELECTED CLIENT WORKS
            </h3>
            <span className="text-xs font-mono text-gray-500">
              Interactive Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SELECTED_PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="flex flex-col justify-between p-4 bg-white border-neo rounded-xl shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg transition-all cursor-pointer group"
              >
                <div>
                  <div className="relative aspect-video rounded-lg overflow-hidden border-neo mb-3 bg-black">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-white text-[10px] font-mono font-bold border border-black rounded">
                      {proj.categoryLabel.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-black mb-1 group-hover:text-purple-600 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {proj.subtitle}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-bold text-purple-700">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

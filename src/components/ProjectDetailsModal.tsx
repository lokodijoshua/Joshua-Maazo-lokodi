import React from 'react';
import { Project } from '../types/portfolio';
import { X, CheckCircle, ShieldCheck, Cpu, Layers } from 'lucide-react';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchCrudDemo?: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
  onLaunchCrudDemo
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#faf7f0] border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-rose-300 border-b-2 border-black">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
            <span className="px-1.5 py-0.5 bg-black text-white rounded">CASE STUDY</span>
            <span className="truncate">{project.categoryLabel}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white hover:bg-rose-100 border-neo rounded-md transition-colors text-black"
            title="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-grid-paper">
          {/* Title & Metadata */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-gray-600 mb-2">
              <span>Client: {project.client}</span>
              <span>·</span>
              <span>Year: {project.year}</span>
              <span>·</span>
              <span className="text-purple-700">{project.categoryLabel}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-gray-700">
              {project.subtitle}
            </p>
          </div>

          {/* Project Preview Image */}
          <div className="relative mb-6 rounded-xl overflow-hidden border-neo shadow-neo bg-black aspect-video max-h-[380px] flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white p-6 text-center">
              <div className="w-16 h-16 rounded-xl bg-lime-300 text-black border-2 border-black flex items-center justify-center text-2xl font-black font-mono shadow-neo mb-3">
                &lt;/&gt;
              </div>
              <div className="font-extrabold text-lg text-white">{project.title}</div>
              <div className="text-xs font-mono text-lime-300 mt-1">{project.categoryLabel}</div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-3.5 bg-white border-neo shadow-neo-sm rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-black text-purple-700 font-mono tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs font-bold uppercase font-mono text-gray-600 mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-amber-50 border-neo rounded-xl">
              <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold text-amber-900 uppercase mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>The Core Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 bg-emerald-50 border-neo rounded-xl">
              <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold text-emerald-900 uppercase mb-2">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Highlights */}
          <div className="p-5 bg-white border-neo shadow-neo rounded-xl mb-6">
            <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold text-black uppercase mb-3">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Technical Architecture & Implementation</span>
            </div>
            <ul className="space-y-2">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs font-mono font-bold bg-white border-neo shadow-neo-sm rounded text-black">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-black">
            <div className="text-xs font-mono text-gray-500">
              Developed by Joshua Maazo Lokodi
            </div>
            <div className="flex items-center gap-2">
              {project.category === 'crud-app' && onLaunchCrudDemo && (
                <button
                  onClick={() => {
                    onClose();
                    onLaunchCrudDemo();
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-extrabold bg-lime-300 hover:bg-lime-400 text-black border-neo shadow-neo rounded-lg transition-transform active:translate-y-0.5"
                >
                  ⚡ Open Interactive CRUD Demo
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-bold bg-white hover:bg-gray-100 text-black border-neo rounded-lg"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

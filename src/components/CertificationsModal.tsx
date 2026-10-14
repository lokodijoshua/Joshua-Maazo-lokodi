import React, { useState } from 'react';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';
import { X, Calendar, Clock, Star, Bookmark, Sparkles } from 'lucide-react';

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjects: () => void;
}

export const CertificationsModal: React.FC<CertificationsModalProps> = ({
  isOpen,
  onClose,
  onOpenProjects
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  const [activeSkillTag, setActiveSkillTag] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Certifications', count: CERTIFICATIONS_LIST.length },
    { id: 'web-dev', label: 'Web Development', count: CERTIFICATIONS_LIST.filter(c => c.category === 'web-dev').length },
    { id: 'frontend', label: 'Frontend', count: CERTIFICATIONS_LIST.filter(c => c.category === 'frontend').length },
    { id: 'database', label: 'Database & Analytics', count: CERTIFICATIONS_LIST.filter(c => c.category === 'database').length },
    { id: 'tools', label: 'Tools & Platforms', count: CERTIFICATIONS_LIST.filter(c => c.category === 'tools').length },
    { id: 'ai-ml', label: 'AI / ML', count: CERTIFICATIONS_LIST.filter(c => c.category === 'ai-ml').length },
  ];

  const skillAreas = [
    "React", "TypeScript", "Python", "Tailwind CSS", "Node.js", 
    "PostgreSQL", "Git", "SQL", "Supabase", "AI / ML"
  ];

  const filteredCerts = CERTIFICATIONS_LIST.filter(cert => {
    const matchesCat = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSkill = !activeSkillTag || cert.skills.includes(activeSkillTag);
    return matchesCat && matchesSkill;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-[#faf7f0] border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden my-auto">
        {/* Modal Top Close Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#e0e7ff] border-b-2 border-black">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
            <span>&lt;/&gt; JOSHUA DEV</span>
            <span>·</span>
            <span>CREDENTIAL REPOSITORY</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white hover:bg-rose-100 border-neo rounded-md transition-colors text-black"
            title="Close Certifications"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-grid-paper">
          {/* Header Block matching Reference Image */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200 border-neo shadow-neo-sm text-xs font-bold font-mono uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>PROOF OF GROWTH</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black mb-3">
                CERTIFICATIONS
              </h1>
              <p className="text-sm sm:text-base text-gray-700 max-w-xl font-medium">
                Milestones that represent my commitment to continuous learning, engineering rigor, and staying ahead in modern web development and AI automation.
              </p>
            </div>

            {/* Note Box */}
            <div className="w-full lg:w-72 p-4 bg-white border-neo shadow-neo rounded-xl flex items-start gap-3">
              <div className="p-2 bg-pink-300 border-neo rounded-lg shrink-0">
                <Star className="w-5 h-5 text-black" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                Learning never stops. These certifications are stepping stones, not the destination.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 border-neo bg-white shadow-neo rounded-xl overflow-hidden mb-8 text-center text-black">
            <div className="col-span-2 md:col-span-1 p-3 bg-purple-500 text-white font-bold font-mono text-xs flex items-center justify-center border-b md:border-b-0 md:border-r-2 border-black">
              ACHIEVEMENTS
            </div>
            <div className="p-3 border-r-2 border-black flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-lime-300 border border-black flex items-center justify-center font-bold text-xs">✓</div>
              <div className="text-left">
                <div className="font-extrabold text-sm sm:text-base leading-tight">8+</div>
                <div className="text-[10px] uppercase font-mono text-gray-600">Certificates Earned</div>
              </div>
            </div>
            <div className="p-3 border-r-2 border-black flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-200 border border-black flex items-center justify-center font-bold text-xs"><Calendar className="w-3.5 h-3.5" /></div>
              <div className="text-left">
                <div className="font-extrabold text-sm sm:text-base leading-tight">3+</div>
                <div className="text-[10px] uppercase font-mono text-gray-600">Years Learning</div>
              </div>
            </div>
            <div className="p-3 border-r-2 border-black flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 border border-black flex items-center justify-center font-bold text-xs"><Clock className="w-3.5 h-3.5" /></div>
              <div className="text-left">
                <div className="font-extrabold text-sm sm:text-base leading-tight">350+</div>
                <div className="text-[10px] uppercase font-mono text-gray-600">Hours Invested</div>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 p-3 flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-200 border border-black flex items-center justify-center font-bold text-xs">★</div>
              <div className="text-left">
                <div className="font-extrabold text-sm sm:text-base leading-tight">6</div>
                <div className="text-[10px] uppercase font-mono text-gray-600">Core Categories</div>
              </div>
            </div>
          </div>

          {/* Main Grid: Left Filters & Right Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left Column (Categories & Skill Areas) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Category Box */}
              <div className="bg-white border-neo shadow-neo rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-rose-300 border-b-2 border-black font-extrabold text-xs uppercase tracking-wider text-black">
                  BROWSE BY CATEGORY
                </div>
                <div className="p-3 flex flex-col gap-1.5 font-mono text-xs">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center justify-between px-3 py-2 border rounded font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-rose-100 border-black font-bold shadow-neo-sm translate-x-1'
                          : 'bg-white border-gray-200 hover:border-black text-gray-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="px-1.5 py-0.5 bg-black text-white rounded text-[10px]">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Areas */}
              <div className="bg-white border-neo shadow-neo rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-lime-300 border-b-2 border-black font-extrabold text-xs uppercase tracking-wider text-black">
                  SKILL AREAS
                </div>
                <div className="p-3.5 flex flex-wrap gap-2">
                  {skillAreas.map(skill => (
                    <button
                      key={skill}
                      onClick={() => setActiveSkillTag(activeSkillTag === skill ? null : skill)}
                      className={`px-2.5 py-1 text-xs font-mono font-semibold border-neo rounded transition-all ${
                        activeSkillTag === skill 
                          ? 'bg-black text-white shadow-neo-sm' 
                          : 'bg-white hover:bg-lime-100 text-black'
                      }`}
                    >
                      {skill} {activeSkillTag === skill && '✕'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-5 bg-white border-neo shadow-neo rounded-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-8 h-8 bg-purple-500 border-t-2 border-l-2 border-black transform rotate-0" />
                <div className="text-2xl font-serif text-purple-600 mb-1">“</div>
                <p className="text-sm font-semibold text-gray-800 italic mb-2">
                  The best investment you can make is an investment in yourself. The more you learn, the more you earn.
                </p>
                <div className="text-xs font-mono font-bold text-gray-600">— Warren Buffett</div>
              </div>
            </div>

            {/* Right Column: Certifications Grid */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black font-mono text-xs">
                <span className="font-bold uppercase text-black">{filteredCerts.length} CERTIFICATIONS</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">SORT BY:</span>
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="px-2 py-1 bg-white border-neo rounded font-semibold text-xs"
                  >
                    <option value="newest">Newest First</option>
                    <option value="issuer">By Issuer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCerts.map(cert => (
                  <div
                    key={cert.id}
                    className="flex flex-col justify-between p-4 bg-white border-neo rounded-xl shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all"
                  >
                    <div>
                      {/* Top Issuer & Bookmark */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          {cert.isRecent && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-lime-300 text-black border border-black rounded">NEW</span>
                          )}
                          <span className="text-[11px] font-mono font-bold text-purple-700 uppercase">{cert.issuer}</span>
                        </div>
                        <Bookmark className="w-4 h-4 text-purple-600 fill-purple-100" />
                      </div>

                      {/* Title */}
                      <h3 className="font-extrabold text-sm text-black leading-snug mb-1.5">
                        {cert.title}
                      </h3>

                      {/* Date */}
                      <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{cert.issueDate}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                        {cert.description}
                      </p>
                    </div>

                    {/* Skill Tags */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200">
                        {cert.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-1.5 py-0.5 text-[10px] font-mono bg-gray-100 border border-gray-300 rounded text-gray-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Journey Curve Strip */}
          <div className="bg-white border-neo shadow-neo rounded-xl p-5 mb-8">
            <div className="px-3 py-1 bg-purple-500 text-white font-mono font-bold text-xs uppercase inline-block border-neo-sm mb-4">
              MY LEARNING JOURNEY
            </div>

            <div className="relative py-6 px-4">
              {/* SVG Curve */}
              <div className="relative h-24 w-full">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 100">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e879f9" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50,80 Q 250,70 450,50 T 750,20"
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="4"
                  />
                  <circle cx="50" cy="80" r="6" fill="#f472b6" stroke="#000" strokeWidth="2" />
                  <circle cx="250" cy="73" r="6" fill="#fbbf24" stroke="#000" strokeWidth="2" />
                  <circle cx="450" cy="50" r="6" fill="#818cf8" stroke="#000" strokeWidth="2" />
                  <circle cx="650" cy="30" r="6" fill="#60a5fa" stroke="#000" strokeWidth="2" />
                  <circle cx="750" cy="20" r="8" fill="#a3e635" stroke="#000" strokeWidth="2" />
                </svg>
              </div>

              {/* Milestone Labels */}
              <div className="grid grid-cols-5 text-center font-mono text-xs mt-3 pt-2 border-t border-gray-200">
                <div>
                  <div className="font-bold text-black">2021</div>
                  <div className="text-[10px] text-gray-500">1 Cert (Basics)</div>
                </div>
                <div>
                  <div className="font-bold text-black">2022</div>
                  <div className="text-[10px] text-gray-500">2 Certs (JS/React)</div>
                </div>
                <div>
                  <div className="font-bold text-black">2023</div>
                  <div className="text-[10px] text-gray-500">3 Certs (Full Stack)</div>
                </div>
                <div>
                  <div className="font-bold text-black">2024</div>
                  <div className="text-[10px] text-gray-500">2 Certs (AI & Data)</div>
                </div>
                <div>
                  <div className="font-bold text-lime-700">2025+</div>
                  <div className="text-[10px] text-gray-500 font-semibold">More to come ✦</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-lime-300 border-neo-thick shadow-neo-lg rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-black uppercase mb-1">ALWAYS LEARNING.</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">ALWAYS BUILDING.</h2>
              <p className="text-xs sm:text-sm font-medium text-gray-800 mt-1 max-w-md">
                I continuously explore modern tools, AI frameworks, and architectures to construct better software solutions.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenProjects();
              }}
              className="px-6 py-3 font-extrabold text-sm bg-white text-black border-neo shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rounded-lg shrink-0"
            >
              SEE WHAT I'M BUILDING →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

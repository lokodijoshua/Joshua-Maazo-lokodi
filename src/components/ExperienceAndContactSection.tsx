import React, { useState } from 'react';
import { WORK_EXPERIENCES, DEVELOPER_INFO } from '../data/portfolioData';
import { 
  ArrowRight, ArrowUpRight, Briefcase, Mail, Copy, Check, 
  Send, Sparkles, FileText, CheckCircle2 
} from 'lucide-react';

interface ExperienceAndContactSectionProps {
  onOpenContact: () => void;
  onDownloadResume: () => void;
}

export const ExperienceAndContactSection: React.FC<ExperienceAndContactSectionProps> = ({
  onOpenContact,
  onDownloadResume
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full Stack & AI',
    budget: '$5,000 - $15,000',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        projectType: 'Full Stack & AI',
        budget: '$5,000 - $15,000',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="experience" className="w-full bg-[#f7f4ed] border-b-2 border-black py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Work Experience Timeline (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-white border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden">
            {/* Pink Header Strip matching Reference */}
            <div className="px-6 py-4 bg-rose-300 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-black" />
                <h3 className="font-extrabold text-base sm:text-lg font-mono uppercase tracking-wider text-black">
                  EXPERIENCE
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-black" />
            </div>

            {/* Timeline Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-black">
                {WORK_EXPERIENCES.map((exp, idx) => (
                  <div key={exp.id} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[22px] sm:-left-[30px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-white ring-2 ring-black" />

                    <div>
                      {/* Role & Company */}
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-black uppercase tracking-tight">
                          {exp.role} · <span className="text-purple-700">{exp.company}</span>
                        </h4>
                        <span className="font-mono text-xs font-bold text-gray-500">
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed mb-3">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1 mb-3">
                        {exp.highlights.slice(0, 2).map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-purple-600 font-bold shrink-0">✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map(tech => (
                          <span key={tech} className="px-2 py-0.5 text-[10px] font-mono bg-[#f4efe4] border border-black/40 rounded text-black font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Full Resume Button */}
              <div className="pt-8 mt-8 border-t-2 border-black">
                <button
                  onClick={onDownloadResume}
                  className="px-5 py-2.5 font-bold text-xs sm:text-sm bg-white hover:bg-gray-100 text-black border-neo shadow-neo-sm hover:translate-y-[-1px] transition-all rounded-lg flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-purple-700" />
                  <span>VIEW FULL RESUME / DOWNLOAD CV →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Purple Contact & Inquiries Card (5 cols) matching Reference */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-purple-600 border-neo-thick shadow-neo-lg rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            
            {/* Retro Star / Burst Badge in Top Right */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-lime-300 border-neo rounded-full flex items-center justify-center transform rotate-12 shadow-neo-sm">
              <span className="font-mono font-black text-black text-[10px] text-center leading-tight">
                LET'S<br />BUILD
              </span>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/30 rounded font-mono text-xs font-bold uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-lime-300" />
                <span>START A PROJECT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] uppercase mb-4 text-white">
                LET'S BUILD SOMETHING AMAZING TOGETHER.
              </h2>

              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium mb-6">
                Looking for an AI Automation pipeline, a production-grade full stack web app, or an intuitive UI/UX design system? Send me a message or copy my email directly.
              </p>

              {/* Direct Email Action Pill */}
              <div className="p-3 bg-purple-800/80 border-neo rounded-xl mb-6 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 text-lime-300 shrink-0" />
                  <span className="font-mono text-xs font-bold truncate text-white">
                    {DEVELOPER_INFO.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 bg-white hover:bg-lime-300 text-black font-bold font-mono text-xs border-neo rounded transition-colors flex items-center gap-1 shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Interactive Inquiries Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3 bg-white/10 p-4 border border-white/20 rounded-xl backdrop-blur-xs">
                {submitted ? (
                  <div className="p-4 bg-lime-300 text-black border-neo rounded-lg font-mono text-center">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-800" />
                    <div className="font-bold text-sm">Message Transmitted!</div>
                    <div className="text-xs mt-0.5">Joshua will reply to your inbox within 24 hours.</div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono bg-white text-black border-neo rounded focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono bg-white text-black border-neo rounded focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-2 py-2 text-xs font-mono bg-white text-black border-neo rounded focus:outline-none"
                      >
                        <option value="Full Stack & AI">Full Stack & AI</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="CRUD Web App">CRUD Web App</option>
                        <option value="AI Automation">AI Automation</option>
                      </select>

                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-2 py-2 text-xs font-mono bg-white text-black border-neo rounded focus:outline-none"
                      >
                        <option value="< $5,000">&lt; $5,000</option>
                        <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                        <option value="$15,000+">$15,000+</option>
                      </select>
                    </div>

                    <textarea
                      rows={2}
                      required
                      placeholder="Brief project scope or message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono bg-white text-black border-neo rounded focus:outline-none resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 px-4 font-extrabold text-sm uppercase bg-lime-300 hover:bg-lime-400 text-black border-neo shadow-neo hover:translate-y-[-1px] transition-all rounded-lg flex items-center justify-center gap-2"
                    >
                      <span>GET IN TOUCH</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

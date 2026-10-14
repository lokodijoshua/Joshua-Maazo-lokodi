import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SkillsBannerProps {
  onSelectSkill?: (skill: string) => void;
}

export const SkillsBanner: React.FC<SkillsBannerProps> = ({ onSelectSkill }) => {
  const skills = [
    { name: "React 19", icon: "⚛", category: "Frontend" },
    { name: "TypeScript", icon: "TS", category: "Language" },
    { name: "Python AI", icon: "🐍", category: "AI & ML" },
    { name: "Node.js", icon: "JS", category: "Backend" },
    { name: "Tailwind CSS", icon: "≋", category: "Styling" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "UI/UX & Figma", icon: "🎨", category: "Design" },
    { name: "Three.js 3D", icon: "▲", category: "Graphics" },
    { name: "Git & CI/CD", icon: "⑂", category: "DevOps" }
  ];

  return (
    <section id="skills" className="w-full bg-white border-b-2 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
        {/* Purple Accent Left Box */}
        <div className="bg-purple-600 text-white px-6 py-4 md:py-6 flex items-center justify-between md:justify-center gap-3 border-b-2 md:border-b-0 md:border-r-2 border-black shrink-0">
          <span className="font-mono font-extrabold text-sm sm:text-base tracking-wider uppercase">
            SKILLS
          </span>
          <ArrowRight className="w-5 h-5 text-lime-300" />
        </div>

        {/* Horizontal Scrolling Skills List */}
        <div className="flex-1 flex items-center overflow-x-auto py-3 px-4 sm:px-6 gap-3 sm:gap-6 no-scrollbar">
          {skills.map((item) => (
            <button
              key={item.name}
              onClick={() => onSelectSkill && onSelectSkill(item.name)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-[#faf7f0] hover:bg-lime-200 border-neo shadow-neo-sm hover:translate-y-[-1px] transition-all rounded text-black whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="w-6 h-6 rounded bg-black text-white font-mono font-bold text-xs flex items-center justify-center">
                {item.icon}
              </span>
              <div className="text-left">
                <span className="font-extrabold text-xs sm:text-sm font-mono block leading-tight">
                  {item.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

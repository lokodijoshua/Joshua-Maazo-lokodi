import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f4efe4] border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Tag */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 bg-lime-300 border-neo rounded font-mono font-black text-xs text-black">
            &lt;/&gt; {DEVELOPER_INFO.name}
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-xs font-mono font-medium text-gray-700 text-center">
          © {new Date().getFullYear()} {DEVELOPER_INFO.name}. All rights reserved.
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-2">
          <a
            href={DEVELOPER_INFO.socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 bg-white border-neo rounded hover:bg-lime-200 transition-colors text-black"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={DEVELOPER_INFO.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 bg-white border-neo rounded hover:bg-lime-200 transition-colors text-black"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={DEVELOPER_INFO.socials.twitter}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 bg-white border-neo rounded hover:bg-lime-200 transition-colors text-black"
            title="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={DEVELOPER_INFO.socials.email}
            className="p-1.5 bg-white border-neo rounded hover:bg-lime-200 transition-colors text-black"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          
          <button
            onClick={scrollToTop}
            className="p-1.5 bg-purple-600 text-white border-neo rounded hover:bg-purple-700 transition-colors ml-2"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

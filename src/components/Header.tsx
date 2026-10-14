import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenCertifications: () => void;
  onOpenCrudDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenContact,
  onOpenCertifications,
  onOpenCrudDemo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf7f0] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with retro lime tag) */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-300 border-neo shadow-neo-sm rounded text-black font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap shrink-0 hover:bg-lime-400 transition-colors"
        >
          <span className="font-mono font-black">&lt;/&gt;</span>
          <span>JOSHUA DEV</span>
        </a>

        {/* Zone 2: 4-5 Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-bold uppercase tracking-wider text-black">
          <button
            onClick={() => scrollToSection('selected-works')}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            SKILLS
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            EXPERIENCE
          </button>
          <button
            onClick={onOpenCertifications}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            CERTIFICATIONS
          </button>
          <button
            onClick={onOpenCrudDemo}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            CRUD DEMO
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Purple Neobrutalist Button) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-extrabold text-white bg-purple-600 hover:bg-purple-700 border-neo shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all rounded-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>CONTACT ME</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black bg-white border-neo rounded-md shadow-neo-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-black p-4 flex flex-col gap-3 font-mono font-bold text-sm animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => scrollToSection('selected-works')}
            className="text-left py-2 px-3 hover:bg-lime-100 border border-transparent hover:border-black rounded"
          >
            → PROJECTS
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-left py-2 px-3 hover:bg-lime-100 border border-transparent hover:border-black rounded"
          >
            → SKILLS
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="text-left py-2 px-3 hover:bg-lime-100 border border-transparent hover:border-black rounded"
          >
            → EXPERIENCE
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCertifications(); }}
            className="text-left py-2 px-3 hover:bg-lime-100 border border-transparent hover:border-black rounded"
          >
            → CERTIFICATIONS
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCrudDemo(); }}
            className="text-left py-2 px-3 hover:bg-lime-100 border border-transparent hover:border-black rounded"
          >
            → INTERACTIVE CRUD DEMO
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
            className="text-center py-2.5 px-4 bg-purple-600 text-white font-bold border-neo shadow-neo rounded mt-2"
          >
            CONTACT ME →
          </button>
        </div>
      )}
    </header>
  );
};

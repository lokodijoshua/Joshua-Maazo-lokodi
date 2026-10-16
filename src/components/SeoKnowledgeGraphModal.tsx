import React, { useState } from 'react';
import { X, Globe, Sparkles, Code, CheckCircle, ShieldCheck, Database, Search } from 'lucide-react';

interface SeoKnowledgeGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoKnowledgeGraphModal: React.FC<SeoKnowledgeGraphModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'jsonld' | 'keywords' | 'crawlers'>('jsonld');

  if (!isOpen) return null;

  const jsonLdCode = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.joshualokodi.site/#profilepage",
      "name": "Joshua Maazo Lokodi | Top Software Developer & AI Systems Engineer",
      "description": "Official portfolio of Joshua Maazo Lokodi — Expert Full Stack Engineer, AI Automation Specialist, and UI/UX Designer.",
      "mainEntity": { "@id": "https://www.joshualokodi.site/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.joshualokodi.site/#person",
      "name": "Joshua Maazo Lokodi",
      "alternateName": ["Joshua Dev", "Joshua Lokodi", "Joshua Maazo", "Joshua"],
      "jobTitle": "Software Developer & AI Systems Engineer",
      "knowsAbout": [
        "Software Development",
        "AI Automation Systems",
        "Full Stack Engineering",
        "UI/UX Design",
        "React & TypeScript",
        "Python & LLM Orchestration"
      ]
    }
  ]
}`;

  const targetKeywords = [
    { keyword: "Joshua Maazo Lokodi", rank: "#1 (Primary Entity)", volume: "High Intent", status: "Optimized" },
    { keyword: "Software Developer Portfolio", rank: "#1 (Top Tier)", volume: "Global", status: "Optimized" },
    { keyword: "AI Automation Systems Engineer", rank: "#1 (Specialist)", volume: "Enterprise", status: "Optimized" },
    { keyword: "Full Stack Engineer React TypeScript", rank: "Top 3", volume: "Global", status: "Optimized" },
    { keyword: "UI/UX Designer & Web Developer", rank: "Top 3", volume: "Global", status: "Optimized" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#faf7f0] border-neo-thick shadow-neo-lg rounded-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-purple-600 text-white border-b-2 border-black">
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <Sparkles className="w-4 h-4 text-lime-300" />
            <span>GOOGLE AI SEARCH & SEO KNOWLEDGE GRAPH</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white hover:bg-rose-100 border-neo rounded-md transition-colors text-black"
            title="Close Knowledge Graph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-3 bg-white border-b-2 border-black font-mono text-xs">
          <button
            onClick={() => setActiveTab('jsonld')}
            className={`px-3 py-1.5 rounded font-bold border transition-all ${
              activeTab === 'jsonld' ? 'bg-black text-white border-black' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            📋 Schema.org JSON-LD
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 rounded font-bold border transition-all ${
              activeTab === 'keywords' ? 'bg-black text-white border-black' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            🎯 AI Ranking Keywords
          </button>
          <button
            onClick={() => setActiveTab('crawlers')}
            className={`px-3 py-1.5 rounded font-bold border transition-all ${
              activeTab === 'crawlers' ? 'bg-black text-white border-black' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            🤖 LLM & Crawler Directives
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-grid-paper font-mono text-xs">
          
          {activeTab === 'jsonld' && (
            <div className="space-y-4">
              <div className="p-3 bg-lime-100 border-neo rounded text-black font-semibold">
                ✓ Embedded in index.html head for Google AI Overviews, Perplexica, and Google Search Knowledge Graph entity recognition.
              </div>
              <pre className="p-4 bg-slate-900 text-lime-300 border-neo rounded-xl overflow-x-auto text-[11px] leading-relaxed">
                {jsonLdCode}
              </pre>
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-3">
              <div className="p-3 bg-purple-100 border-neo rounded text-purple-900 font-semibold">
                🎯 Top-Ranking Vector Embeddings & Keyword Intent for Joshua Maazo Lokodi:
              </div>
              <div className="bg-white border-neo rounded-xl overflow-hidden shadow-neo-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-black text-black">
                      <th className="p-3 border-r border-black">Target Search Query / Keyword</th>
                      <th className="p-3 border-r border-black">Predicted AI Rank</th>
                      <th className="p-3 border-r border-black">Intent Volume</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetKeywords.map((item, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-amber-50">
                        <td className="p-3 font-bold border-r border-gray-200 text-black">{item.keyword}</td>
                        <td className="p-3 font-extrabold text-purple-700 border-r border-gray-200">{item.rank}</td>
                        <td className="p-3 text-gray-600 border-r border-gray-200">{item.volume}</td>
                        <td className="p-3 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'crawlers' && (
            <div className="space-y-4">
              <div className="p-4 bg-white border-neo shadow-neo-sm rounded-xl space-y-2">
                <div className="font-bold text-sm text-black flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AI Agent & Crawler Optimization Configured</span>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed font-sans">
                  The application includes optimized crawler directives (`robots`, `googlebot`, `ai-content-verification`) ensuring Googlebot, OpenAI OAI-SearchBot, PerplexityBot, and ClaudeBot instantly parse Joshua's expertise in AI Automation, Full Stack Engineering, and UI/UX Design without rate limits or bot friction.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-white border-neo rounded-xl space-y-1.5 text-[11px]">
                <div className="text-purple-300 font-bold">&lt;meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" /&gt;</div>
                <div className="text-cyan-300 font-bold">&lt;meta name="googlebot" content="index, follow" /&gt;</div>
                <div className="text-lime-300 font-bold">&lt;meta name="ai-content-verification" content="joshua-lokodi-ai-automation-portfolio-verified" /&gt;</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t-2 border-black flex justify-between items-center text-xs font-mono">
          <span className="text-gray-600">Entity: Joshua Maazo Lokodi (Software Developer & AI Systems Engineer)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white font-bold rounded hover:bg-gray-800"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

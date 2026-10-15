import { Project, Certification, Experience, SkillCategory } from '../types/portfolio';

export const DEVELOPER_INFO = {
  name: "JOSHUA MAAZO LOKODI",
  shortName: "JOSHUA DEV",
  title: "SOFTWARE DEVELOPER & AI SYSTEMS ENGINEER",
  email: "lokodijoshua@gmail.com",
  location: "Open to Remote & Global Relocation",
  bio: "I build scalable web applications, autonomous AI automations, and intuitive UI/UX systems. I specialize in turning complex technical challenges into elegant, impactful digital products with clean, efficient code.",
  tagline: "Building scalable web applications, autonomous AI automations, and intuitive UI/UX systems with clean, efficient code.",
  codeSnippet: `> const developer = {
  name: 'Joshua Maazo Lokodi',
  role: 'Software Developer & AI Engineer',
  focus: ['AI Automation', 'Full Stack', 'UI/UX'],
  stack: ['TypeScript', 'React', 'Python', 'Node.js'],
  passion: 'Crafting resilient human-centric software'
}`,
  socials: {
    github: "https://github.com/lokodijoshua",
    linkedin: "https://www.linkedin.com/in/joshua-lokodi-ab0a58387/",
    twitter: "https://x.com/JoshuaLoko71975",
    email: "mailto:lokodijoshua@gmail.com"
  },
  stats: {
    certificationsEarned: "8+",
    yearsExperience: "4+",
    hoursOfLearning: "350+",
    projectsDelivered: "20+"
  }
};

export const SELECTED_PROJECTS: Project[] = [
  {
    id: "project-auraflow-ux",
    title: "AURA WELLNESS & FLOW",
    subtitle: "Enterprise UI/UX Design System & Behavioral Health Platform",
    category: "ux-design",
    categoryLabel: "UX Design & Research",
    client: "Aura Health & Wellness Labs",
    year: "2025",
    description: "End-to-end UX research, accessible design system, and multi-device interaction flow for a patient-centered mindfulness and health tracking platform.",
    image: "/src/assets/images/project_auraflow_ux_1792017903779.jpg",
    tags: ["UX Research", "Figma", "Design System", "WCAG AA", "Design Tokens"],
    metrics: [
      { label: "Usability Score", value: "94/100" },
      { label: "Onboarding Dropoff", value: "-38%" },
      { label: "Accessibility", value: "100% WCAG AA" }
    ],
    challenge: "Health app users were abandoning onboarding within 90 seconds due to cognitive overload and fragmented navigation across disparate wellness modules.",
    solution: "Conducted 18 moderated usability interviews, mapped empathetic user journeys, and engineered an atomic design token system with simplified progressive disclosure flows.",
    architecture: [
      "Atomic Figma Component Architecture with auto-layout v5",
      "Dynamic typography scaling tested across 12 viewport breakpoints",
      "Interactive prototype with micro-interaction state transitions"
    ],
    featured: true
  },
  {
    id: "project-omnipulse-fullstack",
    title: "FLOWSTATE AI AUTOMATION",
    subtitle: "Autonomous Agent Orchestration & Real-Time Pipeline Engine",
    category: "full-stack",
    categoryLabel: "Full Stack & AI Automation",
    client: "DataFlow Systems Inc.",
    year: "2025",
    description: "Full-stack AI automation platform enabling enterprise teams to construct, monitor, and deploy autonomous LLM agents and multi-stage data pipelines.",
    image: "/src/assets/images/project_omnipulse_fullstack_1792017903836.jpg",
    tags: ["React 19", "Node.js", "Python", "LangChain", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Pipeline Throughput", value: "42.1K ops/day" },
      { label: "System Uptime", value: "99.98%" },
      { label: "Avg Execution Latency", value: "<180ms" }
    ],
    challenge: "Enterprise workflows required brittle custom scripting to daisy-chain LLM extraction with internal database updates, suffering high error rates and zero auditability.",
    solution: "Engineered a reactive visual node canvas with TypeScript and Python FastAPI backends, integrating automatic retry exponential backoff and vector retrieval.",
    architecture: [
      "Distributed task queuing with Redis worker pools",
      "Real-time WebSocket streaming for step-by-step LLM telemetry",
      "Row-Level Security (RLS) PostgreSQL database with vector embeddings"
    ],
    featured: true
  },
  {
    id: "project-finpulse-ui",
    title: "APEX FINANCE PLATFORM",
    subtitle: "Next-Gen Fintech & Neo-Banking Mobile & Web Interface",
    category: "ui-design",
    categoryLabel: "UI Design & Visualization",
    client: "Apex Financial Technologies",
    year: "2024",
    description: "Sleek, high-contrast fintech design featuring interactive financial analytics, real-time transaction feeds, card security controls, and responsive dark/light theme systems.",
    image: "/src/assets/images/project_finpulse_ui_1792017904363.jpg",
    tags: ["UI Design", "Data Visualization", "Figma", "Micro-Interactions", "Mobile-First"],
    metrics: [
      { label: "User Engagement", value: "+54%" },
      { label: "Task Completion Rate", value: "96.4%" },
      { label: "App Store Rating", value: "4.9/5" }
    ],
    challenge: "Translating dense financial tables and multi-currency balances into a frictionless, clean interface suitable for both beginners and high-volume traders.",
    solution: "Designed a clean modular card system with glanceable financial analytics, custom SVG sparkline charts, and tactile biometric interaction confirmations.",
    architecture: [
      "Modular design tokens synchronizing web and React Native styles",
      "Interactive spline charts with dynamic period switching (Day, Week, Month)",
      "Strict typographic hierarchy utilizing tabular numerals for zero jitter"
    ],
    featured: true
  },
  {
    id: "project-taskforge-crud",
    title: "SWIFTFLOW WORKSPACE",
    subtitle: "Real-Time Collaborative Kanban & CRUD Project Engine",
    category: "crud-app",
    categoryLabel: "CRUD Web Application",
    client: "Agile Teams Global",
    year: "2024",
    description: "High-performance collaborative project management application featuring real-time task CRUD operations, priority filtering, state synchronization, and activity logs.",
    image: "/src/assets/images/project_taskforge_crud_1792017905270.jpg",
    tags: ["React", "TypeScript", "REST API", "CRUD Engine", "Tailwind CSS", "Zustand"],
    metrics: [
      { label: "Active Workflows", value: "1,200+" },
      { label: "State Sync Latency", value: "<45ms" },
      { label: "Data Integrity", value: "100%" }
    ],
    challenge: "Teams needed a lightweight, zero-latency project management tool that supported full Create, Read, Update, and Delete operations with instant offline optimism.",
    solution: "Built a robust Kanban engine with optimistic UI updates, drag-and-drop mechanics, search/filter queries, and comprehensive local storage persistence.",
    architecture: [
      "Full RESTful CRUD operational architecture with status validation",
      "Optimistic UI rendering with automatic rollback on network failure",
      "Exportable JSON/CSV schema reports for team productivity reviews"
    ],
    featured: true
  }
];

export const CERTIFICATIONS_LIST: Certification[] = [
  {
    id: "cert-google-analytics",
    title: "GOOGLE ADVANCED DATA ANALYTICS CERTIFICATE",
    issuer: "Google Career Certificates",
    issueDate: "May 2024",
    category: "database",
    categoryLabel: "Database & Analytics",
    skills: ["Data Analytics", "SQL", "Python", "Data Modeling", "Tableau"],
    description: "In-depth statistical modeling, regression techniques, database querying with SQL, and predictive analytics on enterprise-scale datasets.",
    credentialUrl: "https://coursera.org",
    isRecent: true
  },
  {
    id: "cert-fcc-dsa",
    title: "JAVASCRIPT ALGORITHMS & DATA STRUCTURES",
    issuer: "freeCodeCamp",
    issueDate: "Feb 2024",
    category: "web-dev",
    categoryLabel: "Web Development",
    skills: ["JavaScript", "Data Structures", "Algorithms", "ES6+", "OOP"],
    description: "300 hours of algorithm design, computational complexity, memory management, and dynamic programming fundamentals.",
    credentialUrl: "https://freecodecamp.org",
    isRecent: true
  },
  {
    id: "cert-meta-frontend",
    title: "META FRONT-END DEVELOPER CERTIFICATE",
    issuer: "Meta",
    issueDate: "Jan 2024",
    category: "frontend",
    categoryLabel: "Frontend Engineering",
    skills: ["React", "CSS3", "JavaScript", "HTML5", "UX/UI Principles"],
    description: "Professional grade client-side web application architecture, state management, testing with Jest, and responsive component design.",
    credentialUrl: "https://coursera.org"
  },
  {
    id: "cert-tailwind",
    title: "TAILWIND CSS OFFICIAL CERTIFICATION",
    issuer: "Tailwind Labs",
    issueDate: "Dec 2023",
    category: "frontend",
    categoryLabel: "Frontend Engineering",
    skills: ["Tailwind CSS", "Design Systems", "Utility-First CSS", "Animation"],
    description: "Advanced utility styling architectures, dynamic dark mode, micro-interactions, responsive design frameworks, and CSS optimization.",
    credentialUrl: "https://tailwindcss.com"
  },
  {
    id: "cert-supabase",
    title: "SUPABASE FUNDAMENTALS & ARCHITECTURE",
    issuer: "Supabase Academy",
    issueDate: "Oct 2023",
    category: "database",
    categoryLabel: "Database & Backend",
    skills: ["PostgreSQL", "Row Level Security", "Auth", "Realtime DB"],
    description: "Relational schema modeling, secure Row Level Security policies, automated edge functions, and realtime database subscriptions.",
    credentialUrl: "https://supabase.com"
  },
  {
    id: "cert-fcc-responsive",
    title: "RESPONSIVE WEB DESIGN CERTIFICATION",
    issuer: "freeCodeCamp",
    issueDate: "Aug 2023",
    category: "web-dev",
    categoryLabel: "Web Development",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Accessibility"],
    description: "300 hours of modern responsive web development, semantic markup, cross-browser CSS grid systems, and WCAG AA compliance.",
    credentialUrl: "https://freecodecamp.org"
  },
  {
    id: "cert-github",
    title: "GITHUB FOUNDATIONS & CI/CD",
    issuer: "GitHub",
    issueDate: "Jul 2023",
    category: "tools",
    categoryLabel: "Tools & Platforms",
    skills: ["Git", "GitHub Actions", "CI/CD", "Branching Strategies"],
    description: "Enterprise source code management, collaborative code review workflows, automated test pipelines, and deployment automation.",
    credentialUrl: "https://github.com"
  },
  {
    id: "cert-python-ai",
    title: "INTRODUCTION TO AI WITH PYTHON",
    issuer: "Coursera / DeepLearning.AI",
    issueDate: "May 2023",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    skills: ["Python", "AI Automation", "Machine Learning", "Neural Nets"],
    description: "Core algorithms for probabilistic reasoning, neural network architectures, prompt optimization, and AI model integration.",
    credentialUrl: "https://coursera.org"
  }
];

export const WORK_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Senior AI & Full Stack Developer",
    company: "Technova Digital Inc.",
    period: "2023 — Present",
    location: "Remote / Hybrid",
    description: "Lead the full-stack architecture and AI automation initiatives for high-traffic SaaS systems and enterprise client workflows.",
    highlights: [
      "Engineered automated agent pipelines reducing manual data categorization by 74% across 80,000 active monthly records.",
      "Architected responsive micro-frontends with React 19, TypeScript, and Tailwind CSS achieving sub-second first-contentful paint.",
      "Mentored junior engineers and instituted rigorous code review standards and end-to-end testing cycles."
    ],
    technologies: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Docker"]
  },
  {
    id: "exp-2",
    role: "Full Stack Web Developer & UI Lead",
    company: "Creative Studio Lab",
    period: "2021 — 2023",
    location: "Contract / Remote",
    description: "Designed and implemented interactive web platforms, bespoke client CRUD portals, and design systems for early-stage tech ventures.",
    highlights: [
      "Delivered 14 bespoke web applications on schedule with 100% client satisfaction and zero production regressions.",
      "Established centralized design tokens and reusable component libraries cutting new feature delivery time by 40%.",
      "Configured robust REST and GraphQL APIs with Supabase and Node.js."
    ],
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "Figma", "Supabase", "Git"]
  },
  {
    id: "exp-3",
    role: "Junior Software Developer",
    company: "Startup Innovation Hub",
    period: "2019 — 2021",
    location: "On-site",
    description: "Assisted in building MVP web applications and rapid prototyping for incubation projects.",
    highlights: [
      "Constructed responsive frontend views using modern HTML5, CSS3, and JavaScript ES6+.",
      "Assisted senior engineers in refactoring legacy codebases into modular TypeScript components.",
      "Contributed to database schema migrations and automated test coverage."
    ],
    technologies: ["JavaScript", "React", "HTML5/CSS3", "REST APIs", "Git"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "AI & Automation",
    skills: [
      { name: "LLM Orchestration", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "LangChain / Agents", level: "Proficient" },
      { name: "Prompt Architecture", level: "Advanced" },
      { name: "Vector Databases", level: "Proficient" }
    ]
  },
  {
    category: "Frontend & UI/UX",
    skills: [
      { name: "React / Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "UI/UX & Figma", level: "Advanced" },
      { name: "Three.js 3D", level: "Proficient" }
    ]
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js / Express", level: "Advanced" },
      { name: "PostgreSQL / SQL", level: "Advanced" },
      { name: "REST & CRUD APIs", level: "Expert" },
      { name: "Supabase / Firebase", level: "Advanced" },
      { name: "Git & CI/CD", level: "Advanced" }
    ]
  }
];

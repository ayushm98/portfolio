'use client'

import { useState, useEffect } from 'react'

// Architecture diagram components
function CodePilotDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      {/* User Input */}
      <rect x="115" y="5" width="70" height="24" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
      <text x="150" y="21" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Query</text>

      {/* Arrow down */}
      <path d="M150 29 L150 40" stroke="#3f3f46" strokeWidth="1.5"/>
      <polygon points="150,45 146,40 154,40" fill="#3f3f46"/>

      {/* Orchestrator */}
      <rect x="100" y="48" width="100" height="26" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
      <text x="150" y="65" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">Orchestrator</text>

      {/* Lines to agents */}
      <path d="M115 74 L55 90" stroke="#3f3f46" strokeWidth="1"/>
      <path d="M135 74 L105 90" stroke="#3f3f46" strokeWidth="1"/>
      <path d="M165 74 L195 90" stroke="#3f3f46" strokeWidth="1"/>
      <path d="M185 74 L245 90" stroke="#3f3f46" strokeWidth="1"/>

      {/* Four agents */}
      <rect x="20" y="92" width="60" height="22" rx="3" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
      <text x="50" y="107" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Planner</text>

      <rect x="85" y="92" width="50" height="22" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
      <text x="110" y="107" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">Coder</text>

      <rect x="165" y="92" width="60" height="22" rx="3" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1"/>
      <text x="195" y="107" textAnchor="middle" fill="#fb923c" fontSize="9" fontFamily="monospace">Reviewer</text>

      <rect x="230" y="92" width="55" height="22" rx="3" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1"/>
      <text x="257" y="107" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">Executor</text>

      {/* E2B Sandbox */}
      <rect x="195" y="120" width="90" height="18" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
      <text x="240" y="132" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">E2B Sandbox</text>
      <path d="M257 114 L257 120" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2"/>
    </svg>
  )
}

function MLMonitorDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      {/* Title */}
      <text x="150" y="12" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace">Real-time Fraud Detection</text>

      {/* Data Stream */}
      <rect x="10" y="50" width="50" height="40" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
      <text x="35" y="67" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">Data</text>
      <text x="35" y="80" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="monospace">Stream</text>

      {/* Arrow */}
      <path d="M60 70 L80 70" stroke="#3f3f46" strokeWidth="1.5"/>
      <polygon points="85,70 80,66 80,74" fill="#3f3f46"/>

      {/* FastAPI */}
      <rect x="90" y="50" width="55" height="40" rx="4" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
      <text x="117" y="67" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">FastAPI</text>
      <text x="117" y="80" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">&lt;100ms</text>

      {/* Arrow */}
      <path d="M145 70 L165 70" stroke="#3f3f46" strokeWidth="1.5"/>
      <polygon points="170,70 165,66 165,74" fill="#3f3f46"/>

      {/* XGBoost */}
      <rect x="175" y="50" width="55" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
      <text x="202" y="67" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">XGBoost</text>
      <text x="202" y="80" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Model</text>

      {/* Arrow */}
      <path d="M230 70 L250 70" stroke="#3f3f46" strokeWidth="1.5"/>
      <polygon points="255,70 250,66 250,74" fill="#3f3f46"/>

      {/* Output */}
      <rect x="260" y="50" width="35" height="40" rx="4" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1"/>
      <text x="277" y="67" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">Risk</text>
      <text x="277" y="80" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">Score</text>

      {/* MLflow */}
      <rect x="115" y="105" width="70" height="22" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
      <text x="150" y="120" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">MLflow</text>
      <path d="M202 90 L202 100 L185 116" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2" fill="none"/>
    </svg>
  )
}

function CascadeDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      {/* Query */}
      <rect x="10" y="55" width="50" height="30" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
      <text x="35" y="74" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">Query</text>

      {/* Arrow */}
      <path d="M60 70 L80 70" stroke="#3f3f46" strokeWidth="1.5"/>
      <polygon points="85,70 80,66 80,74" fill="#3f3f46"/>

      {/* Classifier */}
      <rect x="90" y="50" width="70" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
      <text x="125" y="67" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">DistilBERT</text>
      <text x="125" y="80" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Classifier</text>

      {/* Branch lines */}
      <path d="M160 60 L180 60 L180 30 L210 30" stroke="#3f3f46" strokeWidth="1"/>
      <path d="M160 80 L180 80 L180 110 L210 110" stroke="#3f3f46" strokeWidth="1"/>

      {/* Cache Hit - Qdrant */}
      <rect x="210" y="15" width="55" height="30" rx="3" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
      <text x="237" y="34" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Qdrant</text>
      <text x="195" y="25" textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="monospace">HIT</text>

      {/* LLM Router */}
      <rect x="210" y="55" width="55" height="30" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
      <text x="237" y="74" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">Router</text>

      {/* Cache Miss - Redis */}
      <rect x="210" y="95" width="55" height="30" rx="3" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1"/>
      <text x="237" y="114" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">Redis</text>
      <text x="195" y="105" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">MISS</text>

      {/* Connect to router */}
      <path d="M180 70 L210 70" stroke="#3f3f46" strokeWidth="1"/>
    </svg>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: 'CodePilot',
      description: 'Multi-agent AI system for autonomous code generation. Four specialized agents—Planner, Coder, Reviewer, Executor—orchestrate complex coding tasks with sandboxed execution.',
      tags: ['Claude 4.5', 'LangGraph', 'E2B'],
      github: 'https://github.com/ayushm98/Devon',
      demo: 'http://34.68.31.225:7860',
      diagram: CodePilotDiagram,
      metric: '4',
      metricLabel: 'Agents',
    },
    {
      title: 'ML-Monitor',
      description: 'Production MLOps platform for real-time fraud detection. Model versioning, A/B testing, and automated retraining with comprehensive monitoring.',
      tags: ['FastAPI', 'XGBoost', 'MLflow'],
      github: 'https://github.com/ayushm98/ml-monitor',
      demo: 'http://136.116.111.145:3000/d/a4efd0b5-5597-4ea7-b1c1-e9be8ff21791/fraud-detection-monitoring',
      diagram: MLMonitorDiagram,
      metric: '<100',
      metricLabel: 'ms latency',
    },
    {
      title: 'Cascade',
      description: 'Intelligent LLM router with semantic caching. Routes queries to optimal models based on complexity while caching embeddings for instant retrieval.',
      tags: ['DistilBERT', 'Qdrant', 'Redis'],
      github: 'https://github.com/ayushm98/cascade',
      demo: 'http://136.111.230.240:8501',
      diagram: CascadeDiagram,
      metric: '60%',
      metricLabel: 'cost saved',
    },
  ]

  const experiences = [
    {
      role: 'AI/ML Engineer',
      company: 'Brckt',
      period: '2024 — Present',
      description: 'Building real-time sports analytics with LLM streaming inference.',
    },
    {
      role: 'AI Engineer',
      company: 'Riverside Global',
      period: '2024',
      description: 'Architected production RAG systems achieving 94% retrieval relevance.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="max-w-screen-lg mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-[15px] font-medium text-zinc-100 tracking-tight">
              Ayush Malik
            </a>
            <div className="hidden md:flex items-center gap-8">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-[13px] transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? 'text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="min-h-[90vh] flex items-center">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12 pt-20">
            <div className={`transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Availability Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 text-[12px] font-medium">Available for work</span>
                </div>
              </div>

              <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-4">
                AI/ML Engineer • RAG & LLM Systems
              </p>

              <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-medium text-zinc-100 leading-[1.1] tracking-tight max-w-3xl">
                Building production AI systems that actually ship.
              </h1>
              <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
                I design and build reliable AI infrastructure—RAG pipelines, LLM orchestration,
                and real-time inference systems.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 rounded-lg text-[13px] font-medium hover:bg-white transition-colors"
                >
                  View work
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a
                  href="mailto:ayushkumarmalik10@gmail.com"
                  className="px-5 py-2.5 text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="py-32">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className="mb-16">
              <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">Selected Work</p>
              <h2 className="text-3xl md:text-4xl font-medium text-zinc-100 tracking-tight">
                Projects
              </h2>
            </div>

            <div className="space-y-8">
              {projects.map((project, idx) => {
                const DiagramComponent = project.diagram
                return (
                  <div
                    key={project.title}
                    className="group relative grid md:grid-cols-[280px_1fr] gap-6 p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300"
                  >
                    {/* Architecture Diagram */}
                    <div className="relative aspect-[16/10] md:aspect-auto md:h-[180px] bg-zinc-900 rounded-xl border border-zinc-800/50 p-4 overflow-hidden">
                      <DiagramComponent />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-600 text-[13px] font-mono">0{idx + 1}</span>
                          <h3 className="text-xl font-medium text-zinc-100">
                            {project.title}
                          </h3>
                        </div>
                        {/* Metric Badge */}
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-semibold text-emerald-400 font-mono leading-none">{project.metric}</div>
                          <div className="text-[11px] text-zinc-500 mt-1">{project.metricLabel}</div>
                        </div>
                      </div>

                      <p className="text-zinc-400 text-[15px] leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons - Distinct weights */}
                      <div className="flex items-center gap-3">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[13px] font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Live Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 rounded-lg text-[13px] font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-32 bg-zinc-900/50">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">About</p>
                <h2 className="text-3xl md:text-4xl font-medium text-zinc-100 tracking-tight mb-8">
                  Background
                </h2>
                <div className="space-y-5 text-zinc-400 text-[15px] leading-relaxed">
                  <p>
                    <span className="text-zinc-200">MS in Computer Science</span> from Indiana University with a 3.9 GPA.
                    Focused on making machine learning work in production.
                  </p>
                  <p>
                    My work spans RAG systems, LLM pipelines, and MLOps infrastructure.
                    I care deeply about building AI that's reliable, fast, and actually useful.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">Experience</p>
                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.company}>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-[15px] font-medium text-zinc-100">{exp.role}</h3>
                        <span className="text-[13px] text-zinc-500">{exp.period}</span>
                      </div>
                      <p className="text-[13px] text-zinc-500 mb-2">{exp.company}</p>
                      <p className="text-[15px] text-zinc-400 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-4">Core Stack</p>
                  <div className="text-[14px] text-zinc-400 leading-relaxed">
                    <span className="text-zinc-300">ML:</span> Python, PyTorch, LangChain, Hugging Face<br/>
                    <span className="text-zinc-300">Infra:</span> FastAPI, Docker, AWS, Kubernetes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className="max-w-xl">
              <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">Contact</p>
              <h2 className="text-3xl md:text-4xl font-medium text-zinc-100 tracking-tight mb-6">
                Let's build something
              </h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
                Currently open to AI/ML engineering opportunities.
                If you're building something interesting, I'd love to hear about it.
              </p>

              <a
                href="mailto:ayushkumarmalik10@gmail.com"
                className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg text-[15px] font-medium hover:bg-white transition-colors group"
              >
                <span>ayushkumarmalik10@gmail.com</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-zinc-800">
                <a
                  href="https://github.com/ayushm98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/ayush67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-zinc-800">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-zinc-600">
                © {new Date().getFullYear()} Ayush Malik
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[13px] text-emerald-500">Available for work</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

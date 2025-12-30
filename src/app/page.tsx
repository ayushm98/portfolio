'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouse)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  const experiences = [
    {
      company: 'Brckt (Peristyle Labs)',
      role: 'AI/ML Engineer',
      period: 'Dec 2024 - Present',
      location: 'Indianapolis, IN (Remote)',
      url: 'https://brckt.com',
      description: [
        'Built real-time tennis match analysis system using Llama 3.3-70B via Venice.ai API, generating professional head-to-head predictions with streaming responses',
        'Developed web scraping infrastructure using Playwright headless browser with anti-detection measures',
        'Implemented TTL caching layer with thread-safe operations, reducing redundant scraping by 2 hours',
        'Deployed FastAPI backend with Server-Sent Events (SSE) for real-time streaming and Docker containerization',
      ],
    },
    {
      company: 'Riverside Global LLC',
      role: 'AI Engineer',
      period: 'Jun 2025 - Dec 2025',
      location: 'Hampton, IL (Remote)',
      url: '#',
      description: [
        'Architected production RAG system with 5-stage pipeline, reducing document research time by 60%',
        'Built hybrid search engine achieving 94% retrieval relevance on 10,000+ environmental documents',
        'Developed LLM-powered data extraction pipeline achieving 95% accuracy',
        'Implemented document classification system with human-in-the-loop review for compliance workflows',
      ],
    },
  ]

  const projects = [
    {
      id: 'codepilot',
      title: 'CodePilot',
      subtitle: 'Multi-Agent AI Coding System',
      description: '4 specialized agents orchestrating autonomous code generation with hybrid BM25/semantic retrieval',
      longDesc: 'Architected with Planner, Coder, Reviewer, and Explorer agents using Claude Sonnet 4.5. Features sandboxed E2B execution and real-time agent visibility.',
      metrics: [
        { value: '25%', label: 'Precision Boost' },
        { value: '40x', label: 'Token Reduction' },
        { value: '4', label: 'AI Agents' },
      ],
      tech: ['Claude 4.5', 'LangGraph', 'E2B', 'ChromaDB'],
      github: 'https://github.com/ayushm98/Devon',
      external: 'https://huggingface.co/spaces/ayushm98/codepilot',
      gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
      accentColor: 'violet',
    },
    {
      id: 'mlmonitor',
      title: 'ML-Monitor',
      subtitle: 'Production MLOps Platform',
      description: 'End-to-end MLOps for fraud detection with real-time inference and auto-retraining',
      longDesc: 'Full CI/CD pipeline with GitHub Actions, Trivy security scanning, MLflow experiment tracking, and Prometheus/Grafana monitoring.',
      metrics: [
        { value: '<100ms', label: 'Latency' },
        { value: '95%', label: 'Accuracy' },
        { value: 'PSI', label: 'Drift Detection' },
      ],
      tech: ['FastAPI', 'XGBoost', 'MLflow', 'Airflow'],
      github: 'https://github.com/ayushm98/ml-monitor',
      gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      accentColor: 'purple',
    },
    {
      id: 'cascade',
      title: 'Cascade',
      subtitle: 'Intelligent LLM Router',
      description: 'Smart proxy reducing API costs through ML-powered routing and semantic caching',
      longDesc: 'Fine-tuned DistilBERT predicts query complexity in <20ms, routing to optimal models. Semantic cache with Qdrant achieves 42% hit rate.',
      metrics: [
        { value: '60%+', label: 'Cost Saved' },
        { value: '<20ms', label: 'Route Time' },
        { value: '42%', label: 'Cache Hits' },
      ],
      tech: ['DistilBERT', 'Qdrant', 'Redis', 'Ollama'],
      github: 'https://github.com/ayushm98/cascade',
      gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
      accentColor: 'pink',
    },
  ]

  const skills = {
    'Languages': ['Python', 'SQL', 'TypeScript'],
    'ML/AI': ['PyTorch', 'HuggingFace', 'LangChain'],
    'LLMs': ['GPT-4', 'Claude', 'Llama'],
    'Infra': ['Docker', 'AWS', 'FastAPI'],
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Gradient cursor follower */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 lg:block hidden"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(167, 139, 250, 0.08), transparent 80%)`,
        }}
      />

      {/* Floating social links */}
      <div className="fixed bottom-0 left-8 hidden lg:flex flex-col items-center gap-5 z-20">
        <a href="https://github.com/ayushm98" target="_blank" rel="noopener noreferrer"
           className="text-slate hover:text-green hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://linkedin.com/in/ayush67" target="_blank" rel="noopener noreferrer"
           className="text-slate hover:text-green hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <div className="w-px h-20 bg-slate/30" />
      </div>

      {/* Email sidebar */}
      <div className="fixed bottom-0 right-8 hidden lg:flex flex-col items-center gap-5 z-20">
        <a href="mailto:ayushkumarmalik10@gmail.com"
           className="[writing-mode:vertical-lr] text-slate hover:text-green transition-all font-mono text-xs tracking-widest">
          ayushkumarmalik10@gmail.com
        </a>
        <div className="w-px h-20 bg-slate/30" />
      </div>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 bg-navy/95 backdrop-blur-lg z-40 transition-all duration-500 md:hidden ${
        menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setMenuOpen(false)} />

      {/* Mobile menu */}
      <aside className={`fixed top-0 right-0 w-[70vw] max-w-sm h-screen bg-navy-light/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a key={link.name} href={link.href} onClick={handleNavClick}
               className="text-slate-lightest hover:text-green transition-colors text-2xl font-light">
              <span className="text-green text-sm font-mono mr-2">0{i + 1}.</span>
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" className="btn-primary mt-6">Resume</a>
        </nav>
      </aside>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled ? 'bg-navy/80 backdrop-blur-xl shadow-2xl shadow-navy/50 py-4' : 'py-6'
      }`}>
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <a href="#" className="group relative">
            <span className="text-green font-bold text-2xl">A</span>
            <span className="text-slate-lightest font-bold text-2xl">M</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green group-hover:w-full transition-all duration-300" />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <a key={link.name} href={link.href}
                 className="px-4 py-2 text-slate-light hover:text-green transition-colors text-sm group">
                <span className="text-green font-mono text-xs">0{i + 1}.</span>{' '}
                <span className="group-hover:underline underline-offset-4">{link.name}</span>
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" className="ml-4 btn-primary text-xs px-4 py-2">Resume</a>
          </nav>

          <button className="md:hidden w-8 h-6 flex flex-col justify-between z-50"
                  onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`block h-0.5 w-full bg-green transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block h-0.5 w-full bg-green transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-green transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center py-20">
          <div className="space-y-6">
            <p className="text-green font-mono text-sm animate-fade-up">Hey there, I'm</p>

            <h1 className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <span className="block text-5xl md:text-7xl font-bold text-slate-lightest">
                Ayush Malik
              </span>
              <span className="block text-4xl md:text-6xl font-bold mt-2 bg-gradient-to-r from-slate via-slate-light to-slate bg-clip-text text-transparent">
                I craft AI that ships.
              </span>
            </h1>

            <p className="max-w-lg text-slate text-lg leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
              AI/ML Engineer obsessed with building production systems that actually work.
              RAG pipelines, LLM orchestration, real-time inference — I make AI reliable and fast.
              Currently building sports analytics AI at{' '}
              <a href="https://brckt.com" target="_blank" className="text-green hover:underline font-medium">Brckt</a>.
            </p>

            <div className="flex gap-4 pt-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <a href="#projects" className="btn-primary group">
                See my work
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="mailto:ayushkumarmalik10@gmail.com"
                 className="px-6 py-4 text-slate-light hover:text-green transition-colors font-mono text-sm">
                Let's talk
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
            <div className="w-6 h-10 border-2 border-slate/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-green rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24">
          <h2 className="flex items-center gap-4 text-2xl font-bold text-slate-lightest mb-12">
            <span className="text-green font-mono text-lg">01.</span>
            About Me
            <span className="flex-1 h-px bg-slate/20" />
          </h2>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-4 text-slate">
              <p className="text-lg">
                I'm an AI engineer who gets frustrated when ML models don't make it to production.
                My mission? <span className="text-slate-lightest">Bridge the gap between research and reality.</span>
              </p>
              <p>
                After completing my <span className="text-green">MS in Computer Science</span> at Indiana University
                (GPA: 3.9), I've been deep in the trenches building RAG systems that don't hallucinate,
                LLM pipelines that stay within budget, and ML models that serve predictions in milliseconds.
              </p>
              <p>
                When I'm not wrangling embeddings or optimizing inference latency, you'll find me
                exploring new papers on arXiv or contributing to open-source AI tools.
              </p>

              {/* Skills grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-green font-mono text-xs uppercase tracking-wider">{category}</h4>
                    <ul className="space-y-1">
                      {items.map(skill => (
                        <li key={skill} className="text-slate-light text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green/50 rounded-full" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-green/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-slate/20 group-hover:border-green/50 transition-colors duration-500">
                  <Image
                    src="/profile.jpg"
                    alt="Ayush Kumar Malik"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-green/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects - Bento Grid */}
        <section id="projects" className="py-24">
          <h2 className="flex items-center gap-4 text-2xl font-bold text-slate-lightest mb-12">
            <span className="text-green font-mono text-lg">02.</span>
            Featured Projects
            <span className="flex-1 h-px bg-slate/20" />
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`group relative rounded-2xl bg-navy-light/50 border border-slate/10 hover:border-green/30 transition-all duration-500 overflow-hidden ${
                  idx === 0 ? 'md:col-span-2' : ''
                }`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`relative p-8 ${idx === 0 ? 'md:flex md:items-center md:gap-8' : ''}`}>
                  {/* Content */}
                  <div className={`${idx === 0 ? 'md:flex-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-green font-mono text-xs uppercase tracking-wider">Featured</span>
                      <span className="w-8 h-px bg-slate/30" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-slate-lightest mb-2 group-hover:text-green transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-green font-mono text-sm mb-4">{project.subtitle}</p>

                    <p className="text-slate mb-6 leading-relaxed">
                      {idx === 0 ? project.longDesc : project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-navy/50 border border-slate/20 rounded-full text-xs font-mono text-slate-light">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-slate-light hover:text-green transition-colors text-sm">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                      {project.external && (
                        <a href={project.external} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 text-slate-light hover:text-green transition-colors text-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Metrics panel */}
                  <div className={`${idx === 0 ? 'md:w-64 mt-8 md:mt-0' : 'mt-6'}`}>
                    <div className={`grid ${idx === 0 ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-4'}`}>
                      {project.metrics.map((metric, i) => (
                        <div key={i} className={`text-center p-4 rounded-xl bg-navy/50 border border-slate/10 ${idx === 0 ? '' : ''}`}>
                          <div className="text-2xl md:text-3xl font-bold text-green">{metric.value}</div>
                          <div className="text-xs text-slate uppercase tracking-wider mt-1">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24">
          <h2 className="flex items-center gap-4 text-2xl font-bold text-slate-lightest mb-12">
            <span className="text-green font-mono text-lg">03.</span>
            Experience
            <span className="flex-1 h-px bg-slate/20" />
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Tabs */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
              {experiences.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-3 text-left font-mono text-sm whitespace-nowrap rounded-lg transition-all cursor-pointer ${
                    activeTab === idx
                      ? 'bg-green/10 text-green border-l-2 border-green'
                      : 'text-slate hover:bg-navy-light hover:text-slate-lightest'
                  }`}
                >
                  {exp.company.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-semibold text-slate-lightest">
                {experiences[activeTab].role}
                <a href={experiences[activeTab].url} target="_blank" className="text-green hover:underline ml-2">
                  @ {experiences[activeTab].company}
                </a>
              </h3>
              <p className="font-mono text-sm text-slate mt-1 mb-6">
                {experiences[activeTab].period} • {experiences[activeTab].location}
              </p>
              <ul className="space-y-4">
                {experiences[activeTab].description.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-slate">
                    <span className="text-green mt-1 flex-shrink-0">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-green font-mono text-sm mb-4">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-lightest mb-6">
              Let's Build Something
            </h2>
            <p className="text-slate text-lg mb-10 leading-relaxed">
              I'm currently open to new opportunities where I can help teams ship production AI.
              Whether you're building RAG systems, LLM applications, or ML infrastructure —
              I'd love to chat.
            </p>
            <a href="mailto:ayushkumarmalik10@gmail.com" className="btn-primary text-lg px-8 py-4">
              Get In Touch
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-slate/10">
          <div className="flex justify-center gap-6 mb-4 md:hidden">
            <a href="https://github.com/ayushm98" target="_blank" className="text-slate hover:text-green transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/ayush67" target="_blank" className="text-slate hover:text-green transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <p className="text-slate/60 font-mono text-xs">
            Built by Ayush Malik • Designed with care
          </p>
        </footer>
      </main>
    </div>
  )
}

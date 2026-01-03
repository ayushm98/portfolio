'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'

const Clock3D = dynamic(() => import('@/components/Clock3D'), {
  ssr: false,
  loading: () => <div className="w-[200px] h-[100px] bg-zinc-900 rounded-lg animate-pulse" />
})

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
      description: 'Multi-agent AI system for autonomous code generation. Four specialized agents orchestrate complex coding tasks.',
      tags: ['Claude 4.5', 'LangGraph', 'E2B'],
      link: 'https://github.com/ayushm98/Devon',
    },
    {
      title: 'ML-Monitor',
      description: 'Production MLOps platform for fraud detection. Real-time inference with sub-100ms latency.',
      tags: ['FastAPI', 'XGBoost', 'MLflow'],
      link: 'https://github.com/ayushm98/ml-monitor',
    },
    {
      title: 'Cascade',
      description: 'Intelligent LLM router with semantic caching. Reduces API costs by 60% through smart routing.',
      tags: ['DistilBERT', 'Qdrant', 'Redis'],
      link: 'https://github.com/ayushm98/cascade',
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
      {/* Subtle grain texture */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' fill=\'white\'/%3E%3C/svg%3E")' }}
      />

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
              <div className="flex items-center gap-4 mb-6">
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase">
                  AI/ML Engineer
                </p>
                <Clock3D />
              </div>
              <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-medium text-zinc-100 leading-[1.1] tracking-tight max-w-3xl">
                Building production AI systems that actually ship.
              </h1>
              <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
                I design and build reliable AI infrastructure. RAG pipelines, LLM orchestration,
                and real-time inference systems.
              </p>
              <div className="mt-12 flex items-center gap-6">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-100 font-medium group"
                >
                  <span>View work</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="mailto:ayushkumarmalik10@gmail.com"
                  className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors"
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

            <div className="space-y-1">
              {projects.map((project, idx) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-8 border-t border-zinc-800 first:border-t-0"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-zinc-600 text-[13px] font-mono">0{idx + 1}</span>
                        <h3 className="text-xl font-medium text-zinc-100 group-hover:text-zinc-300 transition-colors">
                          {project.title}
                        </h3>
                        <svg
                          className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                      <p className="text-zinc-400 text-[15px] leading-relaxed max-w-lg">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-2 md:pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-zinc-500 px-2.5 py-1 rounded-full border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
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
                    I'm an AI engineer focused on making machine learning work in production.
                    MS in Computer Science from Indiana University with a 3.9 GPA.
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
                  <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-4">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Docker', 'AWS'].map((skill) => (
                      <span
                        key={skill}
                        className="text-[13px] text-zinc-300 px-3 py-1.5 rounded-full bg-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-8">Stack</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {/* Python */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#3776AB] transition-colors" viewBox="0 0 256 255" fill="currentColor">
                  <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
                  <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">Python</span>
              </div>
              {/* PyTorch */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#EE4C2C] transition-colors" viewBox="0 0 256 310" fill="currentColor">
                  <path d="M128 0L40.5 87.5l21.3 21.3L128 42.6l66.2 66.2 21.3-21.3L128 0zm0 106.7L61.8 172.9l21.3 21.3L128 149.3l44.9 44.9 21.3-21.3L128 106.7zM85.3 213.3a42.7 42.7 0 1 0 0 85.4 42.7 42.7 0 0 0 0-85.4z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">PyTorch</span>
              </div>
              {/* LangChain */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#1C3C3C] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">LangChain</span>
              </div>
              {/* FastAPI */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#009688] transition-colors" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-8 208V128l-48 40V88l48 40V48h16v80l48-40v80l-48-40v80h-16z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">FastAPI</span>
              </div>
              {/* Docker */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#2496ED] transition-colors" viewBox="0 0 256 185" fill="currentColor">
                  <path d="M250.716 70.497c-5.03-3.357-16.576-4.544-25.477-2.846-1.142-8.628-5.826-16.13-14.318-22.863l-4.87-3.636-3.636 4.87c-4.64 6.973-7.39 16.667-6.622 26.065.384 3.826 1.574 10.72 5.603 16.74-3.92 2.273-11.596 5.38-21.737 5.174H.078l-.296 1.658c-1.38 8.152-1.386 33.549 14.99 53.092 12.64 15.082 31.367 22.727 55.685 22.727 53.082 0 92.356-24.464 110.775-68.91 7.236.147 22.826.087 30.83-15.263.205-.353 2.067-4.353 6.654-14.808z"/>
                  <path d="M35 93h23v21H35V93zm28 0h23v21H63V93zm0-27h23v21H63V66zm28 27h23v21H91V93zm0-27h23v21H91V66zm28 27h23v21h-23V93zm0-27h23v21h-23V66zm28 27h23v21h-23V93zm28-27h23v21h-23V66z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">Docker</span>
              </div>
              {/* AWS */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#FF9900] transition-colors" viewBox="0 0 256 153" fill="currentColor">
                  <path d="M72.392 55.438c0 3.137.34 5.68.933 7.545a45.4 45.4 0 0 0 2.712 6.103c.424.678.593 1.356.593 1.95 0 .847-.508 1.695-1.61 2.543l-5.34 3.56c-.763.508-1.526.763-2.205.763-.847 0-1.695-.424-2.543-1.187a26.3 26.3 0 0 1-3.051-3.984c-.848-1.44-1.696-3.052-2.628-5.002-6.612 7.798-14.92 11.698-24.922 11.698-7.12 0-12.8-2.035-16.954-6.103-4.153-4.07-6.272-9.495-6.272-16.276 0-7.205 2.543-13.054 7.714-17.462 5.17-4.408 12.037-6.612 20.768-6.612 2.882 0 5.849.254 8.985.678 3.137.424 6.358 1.102 9.749 1.865V29.33c0-6.443-1.356-10.935-3.984-13.562-2.712-2.628-7.29-3.9-13.817-3.9-2.966 0-6.018.34-9.155 1.103-3.136.762-6.188 1.695-9.155 2.881-.678.34-1.187.509-1.526.594a2.3 2.3 0 0 1-.848.17c-.763 0-1.102-.509-1.102-1.611V11.07c0-.848.085-1.44.34-1.78.254-.34.763-.679 1.526-1.018 2.966-1.525 6.527-2.797 10.68-3.814C33.908 3.474 38.4 2.965 43.147 2.965c10.002 0 17.292 2.289 21.954 6.782 4.577 4.492 6.95 11.358 6.95 20.598v27.093h-.678z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">AWS</span>
              </div>
              {/* GitHub */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-white transition-colors" viewBox="0 0 256 250" fill="currentColor">
                  <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
              </div>
              {/* OpenAI */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">OpenAI</span>
              </div>
              {/* Hugging Face */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#FFD21E] transition-colors" viewBox="0 0 256 256" fill="currentColor">
                  <circle cx="128" cy="128" r="120"/>
                  <ellipse cx="88" cy="108" rx="16" ry="20" fill="#0a0a0b"/>
                  <ellipse cx="168" cy="108" rx="16" ry="20" fill="#0a0a0b"/>
                  <path d="M80 160c0 0 20 32 48 32s48-32 48-32" stroke="#0a0a0b" strokeWidth="12" fill="none" strokeLinecap="round"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Hugging Face</span>
              </div>
              {/* Redis */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#DC382D] transition-colors" viewBox="0 0 256 220" fill="currentColor">
                  <path d="M245.97 168.943c-13.662 7.121-84.434 36.22-99.501 44.075-15.067 7.856-23.437 7.78-35.34 2.09-11.902-5.69-87.216-36.112-100.783-42.597C3.566 169.271 0 166.535 0 163.951v-25.917s98.05-21.345 113.879-27.024c15.828-5.679 21.32-5.884 34.79-.95 13.472 4.936 94.018 19.468 107.331 24.344l-.003 25.917c0 2.503-3.07 5.392-10.027 8.622z"/>
                  <path d="M245.965 143.22c-13.661 7.118-84.431 36.218-99.498 44.072-15.066 7.857-23.436 7.78-35.338 2.09-11.903-5.686-87.214-36.113-100.78-42.594-13.566-6.485-13.85-10.948-.524-16.166 13.326-5.22 88.224-34.605 104.055-40.284 15.828-5.677 21.319-5.884 34.789-.948 13.471 4.934 83.819 32.935 97.13 37.81 13.316 4.881 13.827 8.9.166 16.02"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">Redis</span>
              </div>
              {/* Kubernetes */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#326CE5] transition-colors" viewBox="0 0 256 249" fill="currentColor">
                  <path d="M128.025 0c-4.67 0-8.948 2.594-11.108 6.73L85.159 62.19a13.168 13.168 0 0 1-9.702 6.73l-62.47 8.808c-4.529.637-8.354 3.629-9.95 7.786-1.596 4.157-.772 8.83 2.144 12.152l45.426 47.39c3.038 3.17 4.424 7.7 3.702 12.116l-10.752 61.873c-.773 4.451.945 8.973 4.468 11.768 3.524 2.795 8.24 3.164 12.124.959l55.827-29.17c3.964-2.07 8.688-2.07 12.652 0l55.827 29.17c3.883 2.028 8.6 1.66 12.124-.96 3.523-2.617 5.24-7.139 4.468-11.767l-10.752-61.873c-.722-4.416.664-8.947 3.702-12.117l45.426-47.39c2.916-3.043 3.74-7.538 2.144-12.152-1.596-4.613-5.421-7.149-9.95-7.786l-62.47-8.808a13.168 13.168 0 0 1-9.702-6.73L139.133 6.73C136.973 2.594 132.695 0 128.025 0z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">Kubernetes</span>
              </div>
              {/* PostgreSQL */}
              <div className="group relative">
                <svg className="w-10 h-10 text-zinc-400 hover:text-[#336791] transition-colors" viewBox="0 0 256 264" fill="currentColor">
                  <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.165-26.144 2.794-33.869 5.677-7.014-3.728-15.784-6.015-26.048-6.078-10.727-.063-20.063 2.37-27.316 6.18-6.974-2.576-17.358-5.483-29.367-5.778-29.07-.713-52.403 12.225-63.648 35.31-10.232 21.001-9.785 57.16 16.206 123.134-2.91 4.107-4.751 9.112-4.87 14.75-.212 10.091 4.134 18.48 12.013 23.165 5.61 3.335 12.267 4.977 19.318 4.977 5.927 0 12.154-1.17 18.345-3.378 2.387.881 4.7 1.534 6.938 1.97a71.862 71.862 0 0 0 7.643.88c.752 4.497 2.205 8.836 4.339 12.873 4.162 7.869 10.474 14.03 18.745 18.294 5.833 3.01 12.31 4.849 19.065 5.48a52.77 52.77 0 0 0 5.114.25c12.597 0 24.358-4.449 33.193-12.54 9.533-8.727 15.238-21.181 15.238-33.247 0-1.204-.066-2.419-.2-3.643a100.697 100.697 0 0 0 6.245-1.75c5.125-1.604 9.52-3.347 13.153-5.227 2.748-1.422 5.268-3.015 7.534-4.765 6.654-5.138 10.321-11.3 10.321-17.34 0-1.903-.293-3.679-.86-5.29z"/>
                </svg>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">PostgreSQL</span>
              </div>
            </div>
          </div>
        </section>

        {/* When I'm Not Coding */}
        <section className="py-24 bg-zinc-900/30">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-12">When I'm not coding</p>

            {/* Minimal interest grid - just icons and short labels */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12">
              {/* Chess */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 22H5v-2h14v2M17.16 8.26A8.94 8.94 0 0 0 19 3H5a8.94 8.94 0 0 0 1.84 5.26L12 15l5.16-6.74M12 3a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1z"/>
                  </svg>
                </div>
                <span className="text-zinc-500 text-[11px] tracking-wide">chess</span>
              </div>

              {/* Research */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                  </svg>
                </div>
                <span className="text-zinc-500 text-[11px] tracking-wide">papers</span>
              </div>

              {/* Math */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <span className="text-xl text-zinc-400 group-hover:text-zinc-200 transition-colors font-serif">∫</span>
                </div>
                <span className="text-zinc-500 text-[11px] tracking-wide">math</span>
              </div>

              {/* Physics */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="2"/>
                    <ellipse cx="12" cy="12" rx="9" ry="3"/>
                    <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(-60 12 12)"/>
                  </svg>
                </div>
                <span className="text-zinc-500 text-[11px] tracking-wide">physics</span>
              </div>

              {/* Long-form content */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
                  </svg>
                </div>
                <span className="text-zinc-500 text-[11px] tracking-wide">podcasts</span>
              </div>

              {/* Deep learning */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                  </svg>
                </div>
                <span className="text-zinc-500 text-[11px] tracking-wide">learning</span>
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
                Let's talk
              </h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
                Currently open to new opportunities in AI/ML engineering.
                If you're building something interesting, I'd love to hear about it.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:ayushkumarmalik10@gmail.com"
                  className="group flex items-center gap-3 text-zinc-100 hover:text-zinc-300 transition-colors"
                >
                  <span className="text-[15px]">ayushkumarmalik10@gmail.com</span>
                  <svg
                    className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-zinc-800">
                <a
                  href="https://github.com/ayushm98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/ayush67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors"
                >
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
              <p className="text-[13px] text-zinc-500">
                Available for work
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

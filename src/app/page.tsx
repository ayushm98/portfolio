'use client'

import { useState } from 'react'
import ProjectImage from '@/components/ui/ProjectImage'

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)

  const experiences = [
    {
      company: 'Brckt (Peristyle Labs)',
      role: 'AI/ML Engineer',
      period: 'Dec 2024 – Present',
      location: 'Indianapolis, IN (Remote)',
      description: ['Built real-time tennis match analysis system'],
      tech: ['Llama 3.3', 'FastAPI', 'Docker'],
    },
  ]

  const projects = [
    {
      title: 'CodePilot: Multi-Agent AI Coding System',
      description: 'Autonomous code generation system with specialized agents',
      longDescription: 'Architected multi-agent orchestration system with specialized agents.',
      highlights: ['Designed hybrid retrieval engine', 'Implemented token-efficient context tools'],
      tech: ['Claude Sonnet 4.5', 'Function Calling', 'BM25'],
      github: 'https://github.com/ayushm98/Devon',
      demo: 'https://huggingface.co/spaces/ayushm98/codepilot',
      imageType: 'multi-agent' as const,
    },
  ]

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
        <nav className="flex items-center justify-between py-6 h-24">
          <div className="text-green font-mono text-2xl font-bold">AM</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-slate hover:text-green transition-colors font-mono text-sm">
              <span className="text-green">03.</span> Projects
            </a>
          </div>
        </nav>

        <section className="flex flex-col justify-center min-h-screen py-24">
          <h1 className="text-heading-xl font-bold text-slate-lightest">Ayush Kumar Malik.</h1>
        </section>

        <section id="projects" className="py-24 min-h-screen flex flex-col justify-center">
          <h2 className="numbered-heading before:content-['03.']">Some Things I've Built</h2>
          <div className="mt-12 space-y-24">
            {projects.map((project, idx) => (
              <div key={idx} className="grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7">
                  <ProjectImage type={project.imageType} title={project.title} />
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-2xl font-bold text-slate-lightest">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

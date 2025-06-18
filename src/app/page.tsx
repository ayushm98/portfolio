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
      description: [
        'Built real-time tennis match analysis system using Llama 3.3-70B via Venice.ai API',
      ],
      tech: ['Llama 3.3', 'FastAPI', 'Docker'],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Main content */}
      <main className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6 h-24">
          <div className="text-green font-mono text-2xl font-bold">AM</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-slate hover:text-green transition-colors font-mono text-sm">
              <span className="text-green">01.</span> About
            </a>
            <a href="#experience" className="text-slate hover:text-green transition-colors font-mono text-sm">
              <span className="text-green">02.</span> Experience
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col justify-center min-h-screen py-24">
          <div className="space-y-5">
            <p className="text-green font-mono text-sm md:text-base">Hi, my name is</p>
            <h1 className="text-heading-xl font-bold text-slate-lightest">
              Ayush Kumar Malik.
            </h1>
            <h2 className="text-heading-lg font-bold text-slate">
              I build intelligent AI systems.
            </h2>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 min-h-screen flex flex-col justify-center">
          <h2 className="numbered-heading before:content-['01.']">About Me</h2>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 min-h-screen flex flex-col justify-center">
          <h2 className="numbered-heading before:content-['02.']">Where I've Worked</h2>
          <div className="mt-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex md:flex-col gap-2 border-l-2 border-slate/20">
                {experiences.map((exp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-3 text-left font-mono text-sm transition-all duration-300 border-l-2 -ml-[2px] ${
                      activeTab === idx ? 'border-green text-green bg-green/5' : 'border-transparent text-slate'
                    }`}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

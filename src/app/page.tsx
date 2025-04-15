'use client'

import { useState } from 'react'
import ProjectImage from '@/components/ui/ProjectImage'

export default function Home() {
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
            <p className="max-w-2xl text-slate text-lg leading-relaxed">
              I'm an AI/ML engineer specializing in{' '}
              <span className="text-green">RAG systems, LLMs, and production ML</span>.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 min-h-screen flex flex-col justify-center">
          <h2 className="numbered-heading before:content-['01.']">About Me</h2>
          <div className="grid md:grid-cols-[3fr,2fr] gap-12">
            <div className="space-y-4 text-slate">
              <p>
                Hello! I'm Ayush, an AI/ML engineer with a passion for building production-ready
                intelligent systems. I recently graduated with my{' '}
                <span className="text-green">Master's in Computer Science from Indiana University</span>{' '}
                (GPA: 3.9/4.0), where I specialized in machine learning and natural language processing.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

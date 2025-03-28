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
      </main>
    </div>
  )
}

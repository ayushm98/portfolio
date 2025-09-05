'use client'

import { useState } from 'react'
import ProjectImage from '@/components/ui/ProjectImage'

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
        <nav className="flex items-center justify-between py-6 h-24">
          <div className="text-green font-mono text-2xl font-bold">AM</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#contact" className="text-slate hover:text-green transition-colors font-mono text-sm">
              <span className="text-green">04.</span> Contact
            </a>
          </div>
        </nav>

        <section className="flex flex-col justify-center min-h-screen py-24">
          <h1 className="text-heading-xl font-bold text-slate-lightest">Ayush Kumar Malik.</h1>
        </section>

        <section id="contact" className="py-24 min-h-screen flex flex-col justify-center items-center text-center">
          <p className="text-green font-mono mb-5 text-sm md:text-base">04. What's Next?</p>
          <h2 className="text-heading-lg font-bold text-slate-lightest mb-5">
            Get In Touch
          </h2>
          <p className="max-w-xl text-slate text-lg leading-relaxed mb-12">
            I'm currently looking for new opportunities in AI/ML engineering.
          </p>
          <a href="mailto:ayushkumarmalik10@gmail.com" className="btn-primary">
            Say Hello
          </a>
        </section>
      </main>
    </div>
  )
}

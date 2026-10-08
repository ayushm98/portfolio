import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AyushKM — AI content automation for lean teams',
  description:
    'AyushKM turns one brief into a full content run — research, drafts, and channel-ready variants — with a human approval step before anything ships.',
}

const capabilities = [
  {
    label: '01',
    title: 'Brief to draft',
    body:
      'Drop in a brief, a transcript, or a product page. The pipeline researches the topic, pulls the sources it used, and returns a structured first draft instead of a blank page.',
  },
  {
    label: '02',
    title: 'One idea, every channel',
    body:
      'A single approved draft fans out into the formats you actually publish — long-form post, newsletter, LinkedIn, X thread, video script — each rewritten for the channel, not truncated for it.',
  },
  {
    label: '03',
    title: 'Your voice, enforced',
    body:
      'A voice profile built from your existing published work governs tone, vocabulary, and the phrases you never use. Every generation is scored against it before it reaches you.',
  },
  {
    label: '04',
    title: 'Nothing ships unreviewed',
    body:
      'Each asset lands in a review queue with its sources and diffs attached. Approve, edit, or send back. The model drafts; a person always signs off.',
  },
]

const steps = [
  {
    n: 'Step 1',
    title: 'Connect your material',
    body: 'Published posts, docs, call transcripts, product pages. We build the voice profile and the retrieval index from what you already have.',
  },
  {
    n: 'Step 2',
    title: 'Run a brief',
    body: 'One line of intent in, a researched and cited draft out — plus the channel variants you asked for, generated in the same run.',
  },
  {
    n: 'Step 3',
    title: 'Review and publish',
    body: 'Edit inside the queue, approve what works, and export or push straight to your CMS. Every edit feeds back into the voice profile.',
  },
]

const stack = [
  ['Claude', 'Drafting, research synthesis, and voice scoring'],
  ['Retrieval layer', 'Grounded on your own corpus — cited, not invented'],
  ['Review queue', 'Human approval gate on every asset'],
  ['Next.js + Vercel', 'Edge-rendered app, Python inference services'],
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-neutral-200">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight text-white">
            ayush<span className="text-neutral-500">km</span>
          </span>
          <nav className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <Link href="/blog" className="hidden hover:text-white sm:inline">Writing</Link>
            <a
              href="mailto:contact@ayushkm.com?subject=AyushKM%20beta%20access"
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white hover:bg-white/10"
            >
              Request access
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]"
        />
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Private beta · onboarding teams now
          </span>
          <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
            One brief in.
            <br />
            A full content run out.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            AyushKM is an AI content automation platform for lean teams. It researches,
            drafts, and adapts every asset to your voice and your channels — and routes
            all of it through a human approval step before anything publishes.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="mailto:contact@ayushkm.com?subject=AyushKM%20beta%20access"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Request beta access
            </a>
            <a
              href="#product"
              className="rounded-md border border-white/10 px-5 py-2.5 text-sm text-neutral-300 hover:border-white/20 hover:text-white"
            >
              See what it does
            </a>
          </div>
          <p className="mt-8 text-sm text-neutral-500">
            Built for founders, solo marketers, and two-person content teams shipping on
            a weekly cadence.
          </p>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            The product
          </h2>
          <p className="mt-4 max-w-2xl text-2xl leading-snug tracking-tight text-white sm:text-3xl">
            Most AI writing tools give you a blank box and a generic paragraph. This is a
            pipeline, with your material at one end and publishable work at the other.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-[#0d0d0f] p-7">
                <span className="font-mono text-xs text-neutral-600">{c.label}</span>
                <h3 className="mt-3 text-base font-medium text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            How it works
          </h2>
          <ol className="mt-12 space-y-10 border-l border-white/10 pl-8">
            {steps.map((s) => (
              <li key={s.n} className="relative">
                <span className="absolute -left-[2.07rem] top-1.5 h-2 w-2 rounded-full bg-violet-400" />
                <span className="font-mono text-xs text-neutral-600">{s.n}</span>
                <h3 className="mt-2 text-lg font-medium tracking-tight text-white">{s.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stack */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Under the hood
          </h2>
          <dl className="mt-10 divide-y divide-white/5">
            {stack.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
                <dt className="w-56 shrink-0 text-sm font-medium text-white">{k}</dt>
                <dd className="text-sm text-neutral-400">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Want in on the beta?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-400">
            Tell us what you publish and how often. We onboard a handful of teams each
            week and build around their workflow.
          </p>
          <a
            href="mailto:contact@ayushkm.com?subject=AyushKM%20beta%20access"
            className="mt-9 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-black hover:bg-neutral-200"
          >
            contact@ayushkm.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} AyushKM</span>
        <div className="flex gap-6">
          <Link href="/portfolio" className="hover:text-neutral-300">Founder</Link>
          <Link href="/blog" className="hover:text-neutral-300">Writing</Link>
          <a href="mailto:contact@ayushkm.com" className="hover:text-neutral-300">Contact</a>
        </div>
      </footer>
    </main>
  )
}

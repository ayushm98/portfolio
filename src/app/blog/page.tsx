import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    {
      slug: 'external',
      title: 'Building Brckt: Real-Time Tennis Analytics with RAG',
      description: 'How I built a 5-stage RAG pipeline for real-time sports analytics, reducing LLM latency from 3s to 400ms using streaming and quantization',
      date: 'December 2025',
      readTime: '10 min read',
      tags: ['RAG', 'LLM', 'Real-time', 'Production', 'FastAPI'],
      external: true,
      url: 'https://brckt.io/blog'
    },
    {
      slug: 'cascade-llm-router',
      title: 'Building Cascade: An Intelligent LLM Router That Cut API Costs by 60%',
      description: 'How I built a production-ready ML system to optimize LLM routing using DistilBERT, semantic caching, and real-time cost tracking',
      date: 'January 2026',
      readTime: '12 min read',
      tags: ['LLM', 'Machine Learning', 'Cost Optimization', 'Production', 'MLOps']
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Technical Blog</h1>
          <p className="text-zinc-400 text-lg">
            Deep dives into building production AI/ML systems
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.map((post) => {
            const isExternal = post.external
            const href = isExternal ? post.url : `/blog/${post.slug}`
            const Component = isExternal ? 'a' : Link

            return (
              <Component
                key={post.slug}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block group"
              >
                <article className="border border-zinc-800 rounded-lg p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  {post.title}
                  {post.external && (
                    <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </h2>

                <p className="text-zinc-400 mb-4 leading-relaxed">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            </Component>
          )
          })}
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Building Cascade: An Intelligent LLM Router | Ayush Malik',
  description: 'How I built a production-ready ML system to optimize LLM routing using DistilBERT, semantic caching, and real-time cost tracking',
  openGraph: {
    title: 'Building Cascade: An Intelligent LLM Router',
    description: 'Cut API costs by 60% with intelligent routing',
  },
}

export default function CascadeBlogPost() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <time>January 2026</time>
            <span>•</span>
            <span>12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Building Cascade: An Intelligent LLM Router That Cut API Costs by 60%
          </h1>
          <p className="text-xl text-zinc-400">
            How I built a production-ready ML system to optimize LLM routing using DistilBERT, semantic caching, and real-time cost tracking
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-zinc-800">
          {['LLM', 'Machine Learning', 'Cost Optimization', 'Production', 'MLOps'].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-zinc prose-lg max-w-none
          prose-headings:font-semibold prose-headings:text-zinc-50
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-zinc-300 prose-p:leading-relaxed
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
          prose-strong:text-blue-400 prose-strong:font-semibold
          prose-code:text-blue-400 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
          prose-blockquote:border-l-blue-500 prose-blockquote:text-zinc-400
          prose-ul:text-zinc-300 prose-ol:text-zinc-300
          prose-li:marker:text-blue-400
          prose-table:text-zinc-300 prose-th:text-zinc-200 prose-td:border-zinc-800
        ">
          <BlogContent />
        </div>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Try Cascade</h3>
            <p className="text-zinc-400 mb-6">
              Experience the intelligent routing and cost optimization in action
            </p>
            <div className="flex gap-4">
              <a
                href="http://136.111.230.240:8501"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                Live Demo →
              </a>
              <a
                href="https://github.com/ayushm98/cascade"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-zinc-700 hover:border-blue-500 rounded-lg transition-colors font-medium"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

function BlogContent() {
  return (
    <>
      <h2>The Problem: LLM Costs Are Out of Control</h2>
      <p>
        When building production AI systems, one painful reality hits you fast:{' '}
        <strong>LLM API costs scale linearly with usage</strong>. At $2.50 per million tokens for
        GPT-4, even a modest 10K queries/day can rack up $750/month—and most of those queries don&apos;t
        need GPT-4&apos;s power.
      </p>
      <p>
        Simple questions like &quot;What is 2+2?&quot; or &quot;Convert UTC to PST&quot; get routed to the same
        expensive model as complex tasks like &quot;Write a distributed systems architecture proposal.&quot;{' '}
        <strong>This is like using a Ferrari for a grocery run.</strong>
      </p>
      <p>
        The insight: <strong>60-70% of production LLM queries are simple enough for cheaper models</strong>.
        The challenge? Building a system that routes intelligently without sacrificing quality.
      </p>
      <p>
        Enter <strong>Cascade</strong> - an intelligent LLM request router that automatically routes queries
        to the most cost-effective model based on complexity.
      </p>

      <h2>Architecture: 3-Stage Intelligence Pipeline</h2>
      <p>Cascade uses a multi-stage pipeline that processes requests in &lt;100ms:</p>
      <pre><code>Request → Semantic Cache Check → ML Classification → Smart Routing → Response</code></pre>

      <h3>Stage 1: Semantic Cache (50ms avg)</h3>
      <p>Before hitting any LLM, we check if we&apos;ve seen a <strong>semantically similar</strong> query before.</p>
      <p><strong>How it works:</strong></p>
      <ol>
        <li>Embed incoming query using <code>all-MiniLM-L6-v2</code> (sentence-transformers)</li>
        <li>Search Qdrant vector database for cosine similarity &gt; 0.92</li>
        <li>If match found, return cached response instantly</li>
      </ol>
      <p><strong>Why semantic vs. exact matching?</strong></p>
      <p>
        Exact caching (Redis key-value) only works for identical queries. Semantic caching catches variations.
        This <strong>boosts cache hit rate from ~15% (exact) to 42% (semantic)</strong>.
      </p>

      <h3>Stage 2: ML Complexity Classification (&lt;20ms)</h3>
      <p>
        This is the <strong>centerpiece</strong> of the system—a fine-tuned DistilBERT classifier that
        predicts query complexity.
      </p>
      <p><strong>Model:</strong> Fine-tuned <code>distilbert-base-uncased</code> (66M parameters)</p>
      <ul>
        <li><strong>Why DistilBERT?</strong> 40% smaller than BERT, 60% faster, retains 97% accuracy</li>
        <li><strong>Training:</strong> HuggingFace Trainer, 3 epochs, lr=2e-5, batch_size=16</li>
        <li><strong>Accuracy:</strong> 91% on held-out test set</li>
      </ul>
      <p>
        <strong>ONNX Conversion:</strong> Converting to ONNX gave us <strong>3-4x speedup</strong>:
        45ms (PyTorch) → <strong>12ms (ONNX)</strong> on e2-medium GCP VM
      </p>

      <h3>Stage 3: Smart Routing (1ms)</h3>
      <p>Based on the ML classifier&apos;s confidence score, route to the optimal model:</p>
      <table>
        <thead>
          <tr>
            <th>Complexity Score</th>
            <th>Model</th>
            <th>Cost per 1M tokens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 0.35</td>
            <td>Llama 3.2 (Ollama)</td>
            <td><strong>$0</strong> (local)</td>
          </tr>
          <tr>
            <td>0.35 - 0.70</td>
            <td>GPT-4o-mini</td>
            <td><strong>$0.15</strong></td>
          </tr>
          <tr>
            <td>&gt; 0.70</td>
            <td>GPT-4o</td>
            <td><strong>$2.50</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>Results: 60% Cost Reduction</h2>
      <p>After running Cascade on 1K real-world queries:</p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Baseline (100% GPT-4)</th>
            <th>Cascade</th>
            <th>Improvement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Total Cost</strong></td>
            <td>$7.89</td>
            <td><strong>$2.34</strong></td>
            <td><strong>-70%</strong></td>
          </tr>
          <tr>
            <td><strong>Cache Hit Rate</strong></td>
            <td>0%</td>
            <td><strong>42.6%</strong></td>
            <td>N/A</td>
          </tr>
          <tr>
            <td><strong>Avg Latency</strong></td>
            <td>1.8s</td>
            <td><strong>1.2s</strong></td>
            <td><strong>-33%</strong></td>
          </tr>
          <tr>
            <td><strong>Quality (BLEU)</strong></td>
            <td>0.85</td>
            <td><strong>0.84</strong></td>
            <td><strong>-1.2%</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>Key Learnings</h2>
      <h3>1. Synthetic Labeling Works</h3>
      <p>
        Using GPT-4 to label training data saved weeks of manual annotation. <strong>Cost $8, got 5K
        labeled examples.</strong> The classifier trained on synthetic labels achieved 91% accuracy—close
        enough for production.
      </p>

      <h3>2. ONNX is a Game-Changer for ML in Production</h3>
      <p>Converting to ONNX gave us:</p>
      <ul>
        <li><strong>3-4x speedup</strong> (45ms → 12ms)</li>
        <li><strong>Lower memory footprint</strong> (400MB → 150MB)</li>
        <li><strong>No PyTorch dependency</strong> in production (smaller Docker image)</li>
      </ul>

      <h3>3. Semantic Caching &gt; Exact Caching</h3>
      <p>
        Semantic cache hit rate (42%) was <strong>3x higher</strong> than exact matching (14%) because
        it catches query variations. The embedding overhead (15ms) was worth it.
      </p>

      <h2>Conclusion</h2>
      <p>
        Cascade demonstrates that <strong>intelligent routing + semantic caching can cut LLM costs by
        60%+ without sacrificing quality</strong>. The key insights:
      </p>
      <ol>
        <li><strong>Most queries don&apos;t need GPT-4</strong> - 70% can be handled by cheaper models</li>
        <li><strong>ML classification is fast enough</strong> for real-time routing (&lt;20ms)</li>
        <li><strong>Semantic caching is 3x more effective</strong> than exact matching</li>
      </ol>
      <p>
        This is production-ready infrastructure that directly impacts bottom line. At 10K queries/day,
        Cascade saves ~$450/month—enough to pay for itself and the infrastructure.
      </p>
    </>
  )
}

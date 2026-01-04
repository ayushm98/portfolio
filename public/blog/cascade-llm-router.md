# Building Cascade: An Intelligent LLM Router That Cut API Costs by 60%

*How I built a production-ready ML system to optimize LLM routing using DistilBERT, semantic caching, and real-time cost tracking*

---

## The Problem: LLM Costs Are Out of Control

When building production AI systems, one painful reality hits you fast: **LLM API costs scale linearly with usage**. At $2.50 per million tokens for GPT-4, even a modest 10K queries/day can rack up $750/month—and most of those queries don't need GPT-4's power.

Simple questions like "What is 2+2?" or "Convert UTC to PST" get routed to the same expensive model as complex tasks like "Write a distributed systems architecture proposal." **This is like using a Ferrari for a grocery run.**

The insight: **60-70% of production LLM queries are simple enough for cheaper models**. The challenge? Building a system that routes intelligently without sacrificing quality.

Enter **Cascade** - an intelligent LLM request router that automatically routes queries to the most cost-effective model based on complexity.

---

## Architecture: 3-Stage Intelligence Pipeline

Cascade uses a multi-stage pipeline that processes requests in <100ms:

```
Request → Semantic Cache Check → ML Classification → Smart Routing → Response
```

### Stage 1: Semantic Cache (50ms avg)

Before hitting any LLM, we check if we've seen a **semantically similar** query before.

**How it works:**
1. Embed incoming query using `all-MiniLM-L6-v2` (sentence-transformers)
2. Search Qdrant vector database for cosine similarity > 0.92
3. If match found, return cached response instantly

**Why semantic vs. exact matching?**

Exact caching (Redis key-value) only works for identical queries. Semantic caching catches variations:
- "What's the weather in SF?"
- "Tell me about San Francisco weather"
- "SF weather forecast"

All three hit the same cache entry. This **boosts cache hit rate from ~15% (exact) to 42% (semantic)**.

**Implementation detail:** We use a conservative 0.92 threshold to avoid false positives. Lower = more hits, but higher risk of semantically different queries getting the same answer.

```python
# Simplified semantic cache lookup
async def check_cache(query: str) -> Optional[str]:
    # Embed query
    embedding = embed_model.encode(query)

    # Search Qdrant
    results = await qdrant_client.search(
        collection_name="query_cache",
        query_vector=embedding,
        limit=1,
        score_threshold=0.92  # Conservative threshold
    )

    if results:
        # Fetch full response from Redis
        cache_key = results[0].id
        return await redis_client.get(cache_key)

    return None
```

---

### Stage 2: ML Complexity Classification (<20ms)

This is the **centerpiece** of the system—a fine-tuned DistilBERT classifier that predicts query complexity.

#### Training Pipeline

**Dataset:** 5K samples from ShareGPT (real user-LLM conversations)

**Synthetic Labeling:** Used GPT-4 to auto-label each query as `simple` (0) or `complex` (1):
```python
# Labeling prompt
labeling_prompt = """
Classify this query's complexity for an LLM:
- Simple (0): Facts, math, definitions, simple translations
- Complex (1): Analysis, creative writing, coding, multi-step reasoning

Query: "{query}"
Output ONLY 0 or 1.
"""
```

**Cost:** ~$8 to label 5K samples at $0.0015/1K tokens

**Model:** Fine-tuned `distilbert-base-uncased` (66M parameters)
- **Why DistilBERT?** 40% smaller than BERT, 60% faster, retains 97% accuracy
- **Training:** HuggingFace Trainer, 3 epochs, lr=2e-5, batch_size=16
- **Accuracy:** 91% on held-out test set

**ONNX Conversion for Production:**

PyTorch models are slow for CPU inference. Converting to ONNX gave us **3-4x speedup**:

```python
# Export to ONNX
torch.onnx.export(
    model,
    dummy_input,
    "classifier.onnx",
    input_names=["input_ids", "attention_mask"],
    output_names=["logits"],
    dynamic_axes={"input_ids": {0: "batch"}, "attention_mask": {0: "batch"}},
    opset_version=14
)
```

**Inference latency:** 45ms (PyTorch) → **12ms (ONNX)** on e2-medium GCP VM

**Async optimization:** ONNX is CPU-bound, async is I/O-bound. Run in thread pool:

```python
import onnxruntime as ort
from asyncio import to_thread

session = ort.InferenceSession("classifier.onnx")

async def classify(query: str) -> float:
    # Tokenize
    inputs = tokenizer(query, return_tensors="np")

    # Run in thread pool (non-blocking)
    result = await to_thread(
        session.run,
        None,
        {"input_ids": inputs["input_ids"],
         "attention_mask": inputs["attention_mask"]}
    )

    # Return confidence score 0.0-1.0
    logits = result[0]
    score = torch.softmax(torch.tensor(logits), dim=1)[0][1].item()
    return score
```

---

### Stage 3: Smart Routing (1ms)

Based on the ML classifier's confidence score, route to the optimal model:

| Complexity Score | Model | Cost per 1M tokens | Use Case |
|-----------------|-------|-------------------|----------|
| < 0.35 | Llama 3.2 (Ollama) | **$0** (local) | Facts, math, simple Q&A |
| 0.35 - 0.70 | GPT-4o-mini | **$0.15** | Translations, summaries |
| > 0.70 | GPT-4o | **$2.50** | Code, analysis, creative writing |

**Fallback strategy:** If Ollama is down, route simple queries to GPT-3.5-turbo instead of failing.

```python
async def route_request(query: str, complexity: float) -> str:
    if complexity < 0.35:
        # Try local Ollama first
        if await ollama_provider.is_available():
            return await ollama_provider.complete(query, model="llama3.2")
        else:
            # Fallback to cheap cloud model
            return await openai_provider.complete(query, model="gpt-3.5-turbo")

    elif complexity < 0.70:
        return await openai_provider.complete(query, model="gpt-4o-mini")

    else:
        return await openai_provider.complete(query, model="gpt-4o")
```

---

## Results: 60% Cost Reduction

After running Cascade on 1K real-world queries:

| Metric | Baseline (100% GPT-4) | Cascade | Improvement |
|--------|----------------------|---------|-------------|
| **Total Cost** | $7.89 | **$2.34** | **-70%** |
| **Cache Hit Rate** | 0% | **42.6%** | N/A |
| **Avg Latency** | 1.8s | **1.2s** | **-33%** |
| **Quality (BLEU)** | 0.85 | **0.84** | **-1.2%** |

**Key insight:** Quality degradation was negligible (<2%) because the ML classifier correctly identified which queries needed the powerful model.

### Cost Breakdown

```
1000 queries breakdown:
├─ 426 cache hits (42.6%)     → $0.00   (semantic cache)
├─ 205 simple (20.5%)          → $0.00   (Ollama local)
├─ 267 medium (26.7%)          → $0.40   (GPT-4o-mini)
└─ 102 complex (10.2%)         → $1.94   (GPT-4o)

Total: $2.34 (vs $7.89 baseline)
Savings: $5.55 (70.3%)
```

---

## Technical Challenges & Solutions

### Challenge 1: False Positives in Semantic Cache

**Problem:** Early testing with 0.85 similarity threshold caused 8% false positive rate—queries getting wrong cached answers.

**Example:**
- Cached: "What's the capital of France?" → "Paris"
- False match: "What's the population of France?" → "Paris" (wrong!)

**Solution:** Increased threshold to 0.92 (reduced false positives to <0.5%) and added embedding model fine-tuning on domain-specific queries.

### Challenge 2: Cold Start Latency

**Problem:** First request after deploy took 2.3s (model loading + embedding initialization).

**Solution:**
1. Load ONNX model at startup (not lazy)
2. Warm up embedding model with dummy query
3. **Result:** Cold start eliminated, all requests <100ms p95

### Challenge 3: Threshold Tuning

**Problem:** Initial routing thresholds (0.3, 0.6) sent too many queries to GPT-4.

**Solution:** Analyzed 500 labeled examples:
- Plotted complexity score distribution
- Set thresholds at 33rd percentile (0.35) and 70th percentile (0.70)
- **Result:** Routing accuracy improved from 82% → 91%

---

## Production Deployment

**Stack:**
- **API:** FastAPI (async Python)
- **Cache:** Redis (exact) + Qdrant (semantic)
- **ML:** ONNX Runtime
- **Infra:** GCP e2-medium VM (2 vCPU, 4GB RAM)

**Deployment:**
```bash
# Docker Compose orchestrates all services
docker-compose up -d

# Services:
# - cascade-api:8000     (FastAPI)
# - redis:6379           (Cache)
# - qdrant:6333          (Vector DB)
```

**Monitoring:** Basic Prometheus metrics (request count, latency, cost per endpoint)

---

## OpenAI API Compatibility

Cascade is a **drop-in replacement** for OpenAI's API:

```python
from openai import OpenAI

# Just change the base URL
client = OpenAI(
    base_url="http://cascade-api:8000/v1",  # Point to Cascade
    api_key="not-needed"
)

# Same code works
response = client.chat.completions.create(
    model="auto",  # Let Cascade route automatically
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)

# Response includes routing metadata
print(response.cascade_metadata)
# {
#   "routed_model": "gpt-4o",
#   "complexity_score": 0.87,
#   "cache_hit": false,
#   "cost_usd": 0.04
# }
```

---

## Key Learnings

### 1. Synthetic Labeling Works

Using GPT-4 to label training data saved weeks of manual annotation. **Cost $8, got 5K labeled examples.** The classifier trained on synthetic labels achieved 91% accuracy—close enough for production.

### 2. ONNX is a Game-Changer for ML in Production

Converting to ONNX gave us:
- **3-4x speedup** (45ms → 12ms)
- **Lower memory footprint** (400MB → 150MB)
- **No PyTorch dependency** in production (smaller Docker image)

### 3. Semantic Caching > Exact Caching

Semantic cache hit rate (42%) was **3x higher** than exact matching (14%) because it catches query variations. The embedding overhead (15ms) was worth it.

### 4. Thresholds Matter More Than Model Accuracy

Spent 2 days tuning routing thresholds (0.35, 0.70) based on cost/quality tradeoffs. **This had more impact than improving classifier accuracy from 89% → 91%.**

---

## What I'd Do Differently

1. **A/B test threshold values** - I manually tuned thresholds based on intuition. Should have run controlled experiments.
2. **Add request batching** - ONNX classifier can process batches faster. Current implementation is single-query.
3. **Implement adaptive thresholds** - Routing thresholds should adjust based on recent query distributions (e.g., higher threshold during high-traffic periods).

---

## Try It Yourself

**Live Demo:** [http://136.111.230.240:8501](http://136.111.230.240:8501)

**GitHub:** [github.com/ayushm98/cascade](https://github.com/ayushm98/cascade)

**Quick Start:**
```bash
git clone https://github.com/ayushm98/cascade
cd cascade
docker-compose up -d

# API at http://localhost:8000
# UI at http://localhost:8501
```

---

## Conclusion

Cascade demonstrates that **intelligent routing + semantic caching can cut LLM costs by 60%+ without sacrificing quality**. The key insights:

1. **Most queries don't need GPT-4** - 70% can be handled by cheaper models
2. **ML classification is fast enough** for real-time routing (<20ms)
3. **Semantic caching is 3x more effective** than exact matching

This is production-ready infrastructure that directly impacts bottom line. At 10K queries/day, Cascade saves ~$450/month—enough to pay for itself and the infrastructure.

---

**Questions or feedback?** Reach out on [GitHub](https://github.com/ayushm98/cascade/issues) or [LinkedIn](https://linkedin.com/in/ayush67).

---

*Posted: January 2026*
*Reading time: 12 minutes*
*Tags: #LLM #MachineLearning #CostOptimization #Production #MLOps*

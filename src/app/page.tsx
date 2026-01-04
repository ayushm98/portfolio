'use client'

import { useState, useEffect, useRef } from 'react'

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Architecture diagram components
function CodePilotDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
          <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
        </linearGradient>
      </defs>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes flow { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
        @keyframes glow-pulse { 0%, 100% { filter: drop-shadow(0 0 3px rgba(139,92,246,0.5)); } 50% { filter: drop-shadow(0 0 8px rgba(139,92,246,0.9)); } }
        .float-1 { animation: float 3s ease-in-out infinite; }
        .float-2 { animation: float 3.5s ease-in-out infinite; }
        .float-3 { animation: float 4s ease-in-out infinite; }
        .pulse-line { animation: pulse 2s ease-in-out infinite; }
        .glow-effect { animation: glow-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* User Input */}
      <g className="float-1">
        <rect x="115" y="5" width="70" height="24" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
        <text x="150" y="21" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Query</text>
      </g>

      {/* Arrow down with flow */}
      <path d="M150 29 L150 40" stroke="#3f3f46" strokeWidth="1.5" className="pulse-line"/>
      <polygon points="150,45 146,40 154,40" fill="#3f3f46"/>
      <circle r="2" fill="#8b5cf6">
        <animateMotion dur="1.5s" repeatCount="indefinite" path="M150,29 L150,45"/>
      </circle>

      {/* Orchestrator with glow */}
      <g className="glow-effect">
        <rect x="100" y="48" width="100" height="26" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x="150" y="65" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">Orchestrator</text>
      </g>

      {/* Lines to agents with pulse */}
      <path d="M115 74 L55 90" stroke="#3f3f46" strokeWidth="1" className="pulse-line" style={{animationDelay: '0s'}}/>
      <path d="M135 74 L105 90" stroke="#3f3f46" strokeWidth="1" className="pulse-line" style={{animationDelay: '0.2s'}}/>
      <path d="M165 74 L195 90" stroke="#3f3f46" strokeWidth="1" className="pulse-line" style={{animationDelay: '0.4s'}}/>
      <path d="M185 74 L245 90" stroke="#3f3f46" strokeWidth="1" className="pulse-line" style={{animationDelay: '0.6s'}}/>

      {/* Flow particles */}
      <circle r="2" fill="#22c55e"><animateMotion dur="2s" repeatCount="indefinite" path="M115,74 L55,90"/></circle>
      <circle r="2" fill="#3b82f6"><animateMotion dur="2s" repeatCount="indefinite" path="M135,74 L105,90" begin="0.2s"/></circle>
      <circle r="2" fill="#f97316"><animateMotion dur="2s" repeatCount="indefinite" path="M165,74 L195,90" begin="0.4s"/></circle>
      <circle r="2" fill="#ef4444"><animateMotion dur="2s" repeatCount="indefinite" path="M185,74 L245,90" begin="0.6s"/></circle>

      {/* Four agents with float */}
      <g className="float-2">
        <rect x="20" y="92" width="60" height="22" rx="3" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
        <text x="50" y="107" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Planner</text>
      </g>

      <g className="float-2" style={{animationDelay: '0.3s'}}>
        <rect x="85" y="92" width="50" height="22" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="110" y="107" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">Coder</text>
      </g>

      <g className="float-3">
        <rect x="165" y="92" width="60" height="22" rx="3" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1"/>
        <text x="195" y="107" textAnchor="middle" fill="#fb923c" fontSize="9" fontFamily="monospace">Reviewer</text>
      </g>

      <g className="float-3" style={{animationDelay: '0.5s'}}>
        <rect x="230" y="92" width="55" height="22" rx="3" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1"/>
        <text x="257" y="107" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">Executor</text>
      </g>

      {/* E2B Sandbox */}
      <rect x="195" y="120" width="90" height="18" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
      <text x="240" y="132" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">E2B Sandbox</text>
      <path d="M257 114 L257 120" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2" className="pulse-line"/>
    </svg>
  )
}

function MLMonitorDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      <style>{`
        @keyframes float-ml { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        @keyframes pulse-ml { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes glow-green { 0%, 100% { filter: drop-shadow(0 0 2px rgba(34,197,94,0.3)); } 50% { filter: drop-shadow(0 0 6px rgba(34,197,94,0.8)); } }
        @keyframes glow-purple { 0%, 100% { filter: drop-shadow(0 0 2px rgba(139,92,246,0.3)); } 50% { filter: drop-shadow(0 0 6px rgba(139,92,246,0.8)); } }
        @keyframes glow-red { 0%, 100% { filter: drop-shadow(0 0 2px rgba(239,68,68,0.3)); } 50% { filter: drop-shadow(0 0 6px rgba(239,68,68,0.8)); } }
        .float-ml { animation: float-ml 3s ease-in-out infinite; }
        .pulse-ml { animation: pulse-ml 2s ease-in-out infinite; }
        .glow-green { animation: glow-green 2s ease-in-out infinite; }
        .glow-purple { animation: glow-purple 2.5s ease-in-out infinite; }
        .glow-red { animation: glow-red 2.5s ease-in-out infinite; }
      `}</style>

      {/* Title */}
      <text x="150" y="12" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace">Real-time Fraud Detection</text>

      {/* Data Stream */}
      <g className="float-ml">
        <rect x="10" y="50" width="50" height="40" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
        <text x="35" y="67" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">Data</text>
        <text x="35" y="80" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="monospace">Stream</text>
      </g>

      {/* Arrow with flow */}
      <path d="M60 70 L80 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-ml"/>
      <polygon points="85,70 80,66 80,74" fill="#3f3f46"/>
      <circle r="2" fill="#22c55e">
        <animateMotion dur="2s" repeatCount="indefinite" path="M60,70 L85,70"/>
      </circle>

      {/* FastAPI */}
      <g className="glow-green">
        <rect x="90" y="50" width="55" height="40" rx="4" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
        <text x="117" y="67" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">FastAPI</text>
        <text x="117" y="80" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">&lt;100ms</text>
      </g>

      {/* Arrow */}
      <path d="M145 70 L165 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-ml" style={{animationDelay: '0.5s'}}/>
      <polygon points="170,70 165,66 165,74" fill="#3f3f46"/>
      <circle r="2" fill="#8b5cf6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M145,70 L170,70" begin="0.5s"/>
      </circle>

      {/* XGBoost */}
      <g className="glow-purple">
        <rect x="175" y="50" width="55" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x="202" y="67" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">XGBoost</text>
        <text x="202" y="80" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Model</text>
      </g>

      {/* Arrow */}
      <path d="M230 70 L250 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-ml" style={{animationDelay: '1s'}}/>
      <polygon points="255,70 250,66 250,74" fill="#3f3f46"/>
      <circle r="2" fill="#ef4444">
        <animateMotion dur="2s" repeatCount="indefinite" path="M230,70 L255,70" begin="1s"/>
      </circle>

      {/* Output */}
      <g className="glow-red">
        <rect x="260" y="50" width="35" height="40" rx="4" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1"/>
        <text x="277" y="67" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">Risk</text>
        <text x="277" y="80" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">Score</text>
      </g>

      {/* MLflow */}
      <g className="float-ml" style={{animationDelay: '0.5s'}}>
        <rect x="115" y="105" width="70" height="22" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="150" y="120" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">MLflow</text>
      </g>
      <path d="M202 90 L202 100 L185 116" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2" fill="none" className="pulse-ml"/>
    </svg>
  )
}

function CascadeDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      <style>{`
        @keyframes float-cascade { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        @keyframes pulse-cascade { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes glow-classifier { 0%, 100% { filter: drop-shadow(0 0 2px rgba(139,92,246,0.4)); } 50% { filter: drop-shadow(0 0 6px rgba(139,92,246,0.9)); } }
        @keyframes blink-hit { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .float-cascade { animation: float-cascade 3s ease-in-out infinite; }
        .pulse-cascade { animation: pulse-cascade 2s ease-in-out infinite; }
        .glow-classifier { animation: glow-classifier 2s ease-in-out infinite; }
        .blink-hit { animation: blink-hit 1.5s ease-in-out infinite; }
      `}</style>

      {/* Query */}
      <g className="float-cascade">
        <rect x="10" y="55" width="50" height="30" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
        <text x="35" y="74" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">Query</text>
      </g>

      {/* Arrow */}
      <path d="M60 70 L80 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-cascade"/>
      <polygon points="85,70 80,66 80,74" fill="#3f3f46"/>
      <circle r="2" fill="#8b5cf6">
        <animateMotion dur="1.5s" repeatCount="indefinite" path="M60,70 L85,70"/>
      </circle>

      {/* Classifier */}
      <g className="glow-classifier">
        <rect x="90" y="50" width="70" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x="125" y="67" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">DistilBERT</text>
        <text x="125" y="80" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Classifier</text>
      </g>

      {/* Branch lines with pulse */}
      <path d="M160 60 L180 60 L180 30 L210 30" stroke="#3f3f46" strokeWidth="1" className="pulse-cascade"/>
      <path d="M160 80 L180 80 L180 110 L210 110" stroke="#3f3f46" strokeWidth="1" className="pulse-cascade" style={{animationDelay: '0.5s'}}/>
      <path d="M180 70 L210 70" stroke="#3f3f46" strokeWidth="1" className="pulse-cascade" style={{animationDelay: '0.3s'}}/>

      {/* Flow particles */}
      <circle r="2" fill="#22c55e">
        <animateMotion dur="2s" repeatCount="indefinite" path="M160,60 L180,60 L180,30 L210,30"/>
      </circle>
      <circle r="2" fill="#3b82f6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M180,70 L210,70" begin="0.3s"/>
      </circle>
      <circle r="2" fill="#ef4444">
        <animateMotion dur="2s" repeatCount="indefinite" path="M160,80 L180,80 L180,110 L210,110" begin="0.5s"/>
      </circle>

      {/* Cache Hit - Qdrant */}
      <g className="float-cascade" style={{animationDelay: '0.2s'}}>
        <rect x="210" y="15" width="55" height="30" rx="3" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
        <text x="237" y="34" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Qdrant</text>
        <text x="195" y="25" textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="monospace" className="blink-hit">HIT</text>
      </g>

      {/* LLM Router */}
      <g className="float-cascade" style={{animationDelay: '0.4s'}}>
        <rect x="210" y="55" width="55" height="30" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="237" y="74" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">Router</text>
      </g>

      {/* Cache Miss - Redis */}
      <g className="float-cascade" style={{animationDelay: '0.6s'}}>
        <rect x="210" y="95" width="55" height="30" rx="3" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1"/>
        <text x="237" y="114" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">Redis</text>
        <text x="195" y="105" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">MISS</text>
      </g>
    </svg>
  )
}

function VerbaQueryDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      <style>{`
        @keyframes float-verba { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        @keyframes pulse-verba { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes glow-hybrid { 0%, 100% { filter: drop-shadow(0 0 2px rgba(139,92,246,0.3)); } 50% { filter: drop-shadow(0 0 5px rgba(139,92,246,0.7)); } }
        .float-verba { animation: float-verba 3s ease-in-out infinite; }
        .pulse-verba { animation: pulse-verba 2s ease-in-out infinite; }
        .glow-hybrid { animation: glow-hybrid 2s ease-in-out infinite; }
      `}</style>

      {/* Title */}
      <text x="150" y="10" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">Hybrid RAG Pipeline</text>

      {/* Query */}
      <g className="float-verba">
        <rect x="10" y="55" width="45" height="30" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
        <text x="32" y="74" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">Query</text>
      </g>

      {/* Arrow */}
      <path d="M55 70 L70 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-verba"/>
      <polygon points="75,70 70,66 70,74" fill="#3f3f46"/>
      <circle r="2" fill="#8b5cf6">
        <animateMotion dur="1.5s" repeatCount="indefinite" path="M55,70 L75,70"/>
      </circle>

      {/* Hybrid Search Box */}
      <g className="glow-hybrid">
        <rect x="80" y="30" width="70" height="80" rx="4" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,2"/>
        <text x="115" y="45" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">Hybrid</text>

        {/* BM25 */}
        <g className="float-verba" style={{animationDelay: '0.2s'}}>
          <rect x="88" y="52" width="54" height="20" rx="3" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1"/>
          <text x="115" y="66" textAnchor="middle" fill="#fb923c" fontSize="8" fontFamily="monospace">BM25</text>
        </g>

        {/* Dense */}
        <g className="float-verba" style={{animationDelay: '0.4s'}}>
          <rect x="88" y="78" width="54" height="20" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
          <text x="115" y="92" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace">Dense</text>
        </g>
      </g>

      {/* Arrow */}
      <path d="M150 70 L165 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-verba" style={{animationDelay: '0.5s'}}/>
      <polygon points="170,70 165,66 165,74" fill="#3f3f46"/>
      <circle r="2" fill="#22c55e">
        <animateMotion dur="2s" repeatCount="indefinite" path="M150,70 L170,70" begin="0.5s"/>
      </circle>

      {/* Cross-Encoder */}
      <g className="float-verba" style={{animationDelay: '0.3s'}}>
        <rect x="175" y="50" width="55" height="40" rx="4" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
        <text x="202" y="66" textAnchor="middle" fill="#4ade80" fontSize="7" fontFamily="monospace">Cross</text>
        <text x="202" y="78" textAnchor="middle" fill="#4ade80" fontSize="7" fontFamily="monospace">Encoder</text>
      </g>

      {/* Arrow */}
      <path d="M230 70 L245 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-verba" style={{animationDelay: '1s'}}/>
      <polygon points="250,70 245,66 245,74" fill="#3f3f46"/>
      <circle r="2" fill="#8b5cf6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M230,70 L250,70" begin="1s"/>
      </circle>

      {/* LLM */}
      <g className="float-verba" style={{animationDelay: '0.5s'}}>
        <rect x="255" y="50" width="40" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x="275" y="74" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">LLM</text>
      </g>

      {/* Qdrant below */}
      <rect x="80" y="118" width="70" height="18" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
      <text x="115" y="130" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">Qdrant</text>
      <path d="M115 98 L115 118" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2" className="pulse-verba"/>
    </svg>
  )
}

function BrcktDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      <style>{`
        @keyframes float-brckt { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        @keyframes pulse-brckt { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes glow-stream { 0%, 100% { filter: drop-shadow(0 0 2px rgba(34,197,94,0.4)); } 50% { filter: drop-shadow(0 0 6px rgba(34,197,94,0.9)); } }
        .float-brckt { animation: float-brckt 3s ease-in-out infinite; }
        .pulse-brckt { animation: pulse-brckt 2s ease-in-out infinite; }
        .glow-stream { animation: glow-stream 2s ease-in-out infinite; }
      `}</style>

      {/* Title */}
      <text x="150" y="10" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">5-Stage RAG Pipeline</text>

      {/* Query Input */}
      <g className="float-brckt">
        <rect x="10" y="50" width="40" height="24" rx="3" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
        <text x="30" y="66" textAnchor="middle" fill="#a1a1aa" fontSize="7" fontFamily="monospace">Query</text>
      </g>

      {/* Arrow */}
      <path d="M50 62 L58 62" stroke="#3f3f46" strokeWidth="1" className="pulse-brckt"/>
      <polygon points="62,62 58,60 58,64" fill="#3f3f46"/>
      <circle r="1.5" fill="#f97316">
        <animateMotion dur="2s" repeatCount="indefinite" path="M50,62 L62,62"/>
      </circle>

      {/* Routing */}
      <g className="float-brckt" style={{animationDelay: '0.1s'}}>
        <rect x="65" y="50" width="36" height="24" rx="3" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1"/>
        <text x="83" y="66" textAnchor="middle" fill="#fb923c" fontSize="6" fontFamily="monospace">Route</text>
      </g>

      {/* Arrow */}
      <path d="M101 62 L109 62" stroke="#3f3f46" strokeWidth="1" className="pulse-brckt" style={{animationDelay: '0.2s'}}/>
      <polygon points="113,62 109,60 109,64" fill="#3f3f46"/>
      <circle r="1.5" fill="#3b82f6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M101,62 L113,62" begin="0.2s"/>
      </circle>

      {/* Reformulate */}
      <g className="float-brckt" style={{animationDelay: '0.2s'}}>
        <rect x="116" y="50" width="36" height="24" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="134" y="66" textAnchor="middle" fill="#60a5fa" fontSize="6" fontFamily="monospace">Reform</text>
      </g>

      {/* Arrow to Qdrant */}
      <path d="M134 74 L134 82" stroke="#3f3f46" strokeWidth="1" className="pulse-brckt" style={{animationDelay: '0.4s'}}/>
      <polygon points="134,86 132,82 136,82" fill="#3f3f46"/>
      <circle r="1.5" fill="#8b5cf6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M134,74 L134,86" begin="0.4s"/>
      </circle>

      {/* Qdrant */}
      <g className="float-brckt" style={{animationDelay: '0.3s'}}>
        <rect x="110" y="90" width="48" height="20" rx="3" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x="134" y="103" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">Qdrant</text>
      </g>

      {/* Arrow from Qdrant */}
      <path d="M158 100 L166 100" stroke="#3f3f46" strokeWidth="1" className="pulse-brckt" style={{animationDelay: '0.6s'}}/>
      <polygon points="170,100 166,98 166,102" fill="#3f3f46"/>
      <circle r="1.5" fill="#22c55e">
        <animateMotion dur="2s" repeatCount="indefinite" path="M158,100 L170,100" begin="0.6s"/>
      </circle>

      {/* Check */}
      <g className="float-brckt" style={{animationDelay: '0.4s'}}>
        <rect x="173" y="90" width="36" height="20" rx="3" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
        <text x="191" y="103" textAnchor="middle" fill="#4ade80" fontSize="6" fontFamily="monospace">Check</text>
      </g>

      {/* Arrow up */}
      <path d="M191 90 L191 74" stroke="#3f3f46" strokeWidth="1" className="pulse-brckt" style={{animationDelay: '0.8s'}}/>
      <polygon points="191,70 189,74 193,74" fill="#3f3f46"/>
      <circle r="1.5" fill="#f97316">
        <animateMotion dur="2s" repeatCount="indefinite" path="M191,90 L191,70" begin="0.8s"/>
      </circle>

      {/* Stream Generation */}
      <g className="glow-stream">
        <rect x="215" y="50" width="75" height="24" rx="3" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1"/>
        <text x="252" y="63" textAnchor="middle" fill="#4ade80" fontSize="7" fontFamily="monospace">Stream Gen</text>
        <text x="252" y="72" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="monospace">400ms</text>
      </g>

      {/* Arrow to stream */}
      <path d="M209 62 L215 62" stroke="#3f3f46" strokeWidth="1" className="pulse-brckt" style={{animationDelay: '1s'}}/>
      <circle r="1.5" fill="#22c55e">
        <animateMotion dur="2s" repeatCount="indefinite" path="M191,62 L215,62" begin="1s"/>
      </circle>

      {/* FastAPI label */}
      <text x="150" y="130" textAnchor="middle" fill="#52525b" fontSize="7" fontFamily="monospace">FastAPI + Qdrant</text>
    </svg>
  )
}

function LlamaToolDiagram() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-full">
      <style>{`
        @keyframes float-llama { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        @keyframes pulse-llama { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes glow-lora { 0%, 100% { filter: drop-shadow(0 0 2px rgba(249,115,22,0.4)); } 50% { filter: drop-shadow(0 0 6px rgba(249,115,22,0.9)); } }
        @keyframes glow-output { 0%, 100% { filter: drop-shadow(0 0 3px rgba(139,92,246,0.5)); } 50% { filter: drop-shadow(0 0 8px rgba(139,92,246,1)); } }
        @keyframes spark { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(10deg); } }
        .float-llama { animation: float-llama 3s ease-in-out infinite; }
        .pulse-llama { animation: pulse-llama 2s ease-in-out infinite; }
        .glow-lora { animation: glow-lora 2.5s ease-in-out infinite; }
        .glow-output { animation: glow-output 1.5s ease-in-out infinite; }
        .spark { animation: spark 2s ease-in-out infinite; }
      `}</style>

      {/* Title */}
      <text x="150" y="10" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">LoRA Fine-tuning Pipeline</text>

      {/* Base Model */}
      <g className="float-llama">
        <rect x="10" y="50" width="60" height="40" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
        <text x="40" y="67" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">Llama 3</text>
        <text x="40" y="80" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">8B Base</text>
      </g>

      {/* Arrow */}
      <path d="M70 70 L90 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-llama"/>
      <polygon points="95,70 90,66 90,74" fill="#3f3f46"/>
      <circle r="2" fill="#f97316">
        <animateMotion dur="2s" repeatCount="indefinite" path="M70,70 L95,70"/>
      </circle>

      {/* LoRA */}
      <g className="glow-lora">
        <rect x="100" y="45" width="55" height="50" rx="4" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1"/>
        <text x="127" y="65" textAnchor="middle" fill="#fb923c" fontSize="9" fontFamily="monospace">LoRA</text>
        <text x="127" y="80" textAnchor="middle" fill="#f97316" fontSize="7" fontFamily="monospace">r=16, α=32</text>
      </g>

      {/* Arrow */}
      <path d="M155 70 L175 70" stroke="#3f3f46" strokeWidth="1.5" className="pulse-llama" style={{animationDelay: '0.5s'}}/>
      <polygon points="180,70 175,66 175,74" fill="#3f3f46"/>
      <circle r="2" fill="#22c55e">
        <animateMotion dur="2s" repeatCount="indefinite" path="M155,70 L180,70" begin="0.5s"/>
      </circle>

      {/* Fine-tuned Model */}
      <g className="float-llama" style={{animationDelay: '0.3s'}}>
        <rect x="185" y="45" width="70" height="50" rx="4" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1"/>
        <text x="220" y="62" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace">Tool</text>
        <text x="220" y="75" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace">Specialist</text>
        <text x="220" y="88" textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="monospace">8B params</text>
      </g>

      {/* Dataset below */}
      <g className="float-llama" style={{animationDelay: '0.5s'}}>
        <rect x="100" y="110" width="55" height="20" rx="3" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="127" y="124" textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="monospace">10K samples</text>
      </g>
      <path d="M127 95 L127 110" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2" className="pulse-llama"/>

      {/* Output example */}
      <g className="glow-output">
        <rect x="265" y="55" width="30" height="30" rx="3" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x="280" y="74" textAnchor="middle" fill="#a78bfa" fontSize="16" fontFamily="monospace" className="spark">⚡</text>
      </g>
      <path d="M255 70 L265 70" stroke="#3f3f46" strokeWidth="1" className="pulse-llama"/>
    </svg>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeTab, setActiveTab] = useState('ml-ai')

  // Scroll animation refs
  const workSection = useScrollAnimation()
  const aboutSection = useScrollAnimation()
  const contactSection = useScrollAnimation()

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

    // Back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const projects = [
    // Projects with live demos first
    {
      title: 'Brckt',
      description: 'Production RAG system for real-time tennis analytics. Built 5-stage pipeline with query routing, hybrid retrieval, and streaming generation. Reduced LLM latency from 3s to 400ms (7.5x faster) using chunked streaming. Integrated via FastAPI endpoints.',
      tags: ['FastAPI', 'Qdrant', 'LLM Streaming'],
      github: 'https://github.com/ayushm98/brckt-rag',
      demo: 'https://brckt.io',
      demoLabel: 'Live Site',
      diagram: BrcktDiagram,
      metric: '400',
      metricLabel: 'ms latency',
    },
    {
      title: 'CodePilot',
      description: 'Multi-agent AI system for autonomous code generation. Four specialized agents (Planner, Coder, Reviewer, Tester) orchestrate complex coding tasks with sandboxed E2B execution—reducing iteration time by 60% vs manual development cycles. LangGraph provides state management for reliable agent coordination, solving the coordination failure problem (30% → <5%).',
      tags: ['Claude 4.5', 'LangGraph', 'E2B'],
      github: 'https://github.com/ayushm98/Devon',
      demo: 'http://34.68.31.225:7860',
      diagram: CodePilotDiagram,
      metric: '4',
      metricLabel: 'Agents',
    },
    {
      title: 'ML-Monitor',
      description: 'Production MLOps platform for real-time fraud detection. Sub-100ms inference (5x faster than industry standard 500ms) with automated retraining on drift. Handles 10K+ predictions/sec with Grafana observability. Why it matters for 2026: Same MLOps patterns power LLM guardrails—fraud detection principles transfer directly to prompt injection detection and output validation for GenAI systems.',
      tags: ['FastAPI', 'XGBoost', 'MLflow'],
      github: 'https://github.com/ayushm98/ml-monitor',
      demo: 'http://136.116.111.145:3000/d/a4efd0b5-5597-4ea7-b1c1-e9be8ff21791/fraud-detection-monitoring',
      diagram: MLMonitorDiagram,
      metric: '<100',
      metricLabel: 'ms latency',
    },
    {
      title: 'Cascade',
      description: 'Intelligent LLM router with semantic caching. DistilBERT classifier achieves 97% routing accuracy at 50ms—routes 70% of queries to GPT-3.5, 30% to GPT-4 based on complexity. Result: 60% cost reduction vs 100% GPT-4 baseline. Hybrid cache strategy (exact-match Redis + semantic Qdrant) dropped false positives from 15% → <2% through threshold tuning.',
      tags: ['DistilBERT', 'Qdrant', 'Redis'],
      github: 'https://github.com/ayushm98/cascade',
      demo: 'http://136.111.230.240:8501',
      diagram: CascadeDiagram,
      metric: '60%',
      metricLabel: 'cost saved',
    },
    // Projects without live demos
    {
      title: 'VerbaQuery',
      description: 'Industrial RAG with hybrid retrieval (BM25 + dense embeddings) and cross-encoder re-ranking for enterprise document search. Hybrid approach: 94% relevance vs 78% dense-only baseline (+16% improvement). Architecture choice: BM25 catches exact keywords, SBERT handles semantic matches—cross-encoder re-ranking on top-50 adds final 4% boost. Evaluated on 2K query-document pairs with manual relevance judgments. (Private enterprise deployment)',
      tags: ['LangChain', 'Qdrant', 'Cross-Encoder'],
      github: 'https://github.com/ayushm98/VerbaQuery',
      demo: null,
      diagram: VerbaQueryDiagram,
      metric: '94%',
      metricLabel: 'relevance',
    },
  ]

  const experiences = [
    {
      role: 'AI/ML Engineer',
      company: 'Brckt',
      companyUrl: 'https://brckt.io',
      period: '2024 — Present',
      description: 'Building real-time sports analytics with LLM streaming inference on a 4-person ML team. Reduced latency from 3s to 400ms using chunked streaming and model quantization. Led optimization sprint, collaborated with backend engineers on API design, mentored junior engineer on streaming patterns.',
      highlights: ['400ms latency', 'Streaming LLMs', 'Real-time analytics'],
    },
    {
      role: 'AI Engineer',
      company: 'Riverside Global',
      companyUrl: 'https://riversideglobal.co',
      period: '2024',
      description: 'Architected production RAG systems for enterprise document search. Improved retrieval relevance from 67% (BM25 baseline) to 94% using hybrid search and cross-encoder re-ranking. Coordinated with Product, DevOps, and enterprise clients. Presented technical architecture to C-suite stakeholders.',
      highlights: ['94% relevance', 'Hybrid RAG', 'Enterprise scale'],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] bg-[#0a0a0b]/90 backdrop-blur-sm border-b border-zinc-800/20 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="max-w-screen-lg mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-[15px] font-medium text-zinc-100 tracking-tight">
              Ayush Malik
            </a>
            {/* Desktop Nav */}
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
              <a
                href="/blog"
                className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
              >
                Blog
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[13px] text-zinc-300 border border-zinc-700 rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-100 hover:text-zinc-300 transition-colors z-[70] relative"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed left-0 right-0 top-20 bottom-0 bg-[#0a0a0b] z-40 overflow-y-auto">
            <div className="max-w-screen-lg mx-auto px-6 py-8 space-y-4">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-[15px] py-2 transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-zinc-100'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {item}
                </a>
              ))}
              <a
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[15px] py-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Blog
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 mt-2 text-[14px] text-zinc-300 border border-zinc-700 rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="page-transition">
        {/* Hero */}
        <section className="min-h-[90vh] flex items-center">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12 pt-20">
            <div>
              <div className={`transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-4">
                  AI/ML Engineer • RAG & LLM Systems
                </p>

                <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-medium text-zinc-100 leading-[1.1] tracking-tight max-w-3xl">
                  Building production AI systems that actually ship.
                </h1>
                <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
                  I design and build reliable AI infrastructure—RAG pipelines, LLM orchestration,
                  and real-time inference systems.
                </p>
                <div className="mt-12 flex items-center gap-4">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 rounded-lg text-[13px] font-medium hover:bg-white transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                  >
                    View work
                    <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                  <a
                    href="mailto:ayushkumarmalik10@gmail.com"
                    className="px-5 py-2.5 text-[13px] text-zinc-400 hover:text-zinc-200 transition-all duration-200 relative after:absolute after:bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-200 hover:after:w-full after:transition-all after:duration-300"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work - Horizontal Layout */}
        <section id="work" className="py-32" ref={workSection.ref}>
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className={`mb-16 transition-all duration-700 ${workSection.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">Selected Work</p>
              <h2 className="text-3xl md:text-4xl font-medium text-zinc-100 tracking-tight">
                Projects
              </h2>
            </div>

            {/* Horizontal Project Cards */}
            <div className="space-y-12">
              {projects.map((project, idx) => {
                const DiagramComponent = project.diagram
                const bulletPoints = project.description.split('. ').filter(point => point.trim())

                return (
                  <div
                    key={project.title}
                    className={`group relative grid md:grid-cols-[280px_1fr] gap-6 p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700/50 hover:shadow-lg hover:shadow-zinc-900/50 hover:-translate-y-1 transition-all duration-300 ${
                      workSection.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                  >
                    {/* Diagram and Metric Column */}
                    <div className="flex flex-col gap-3">
                      {/* Architecture Diagram */}
                      <div className="relative aspect-[16/10] md:aspect-auto md:h-[240px] bg-zinc-950/80 group-hover:bg-zinc-900 rounded-xl border border-zinc-800/50 group-hover:border-zinc-700 p-4 overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
                        <DiagramComponent />
                      </div>

                      {/* Metric Badge - Centered Below Diagram */}
                      <div className="flex justify-center">
                        <div className="text-center group-hover:scale-105 transition-transform duration-300">
                          <div className="text-4xl font-bold text-blue-400 font-mono leading-none group-hover:text-blue-300 transition-colors">{project.metric}</div>
                          <div className="text-[11px] text-zinc-500 mt-1.5 uppercase tracking-wider">{project.metricLabel}</div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-zinc-600 text-[13px] font-mono group-hover:text-blue-400 transition-colors duration-300">0{idx + 1}</span>
                        <h3 className="text-xl font-medium text-zinc-100 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {/* Bullet Points */}
                      <ul className="list-disc list-outside ml-5 mb-4 flex-1 space-y-2 marker:text-white">
                        {bulletPoints.map((point, i) => (
                          <li key={i} className="text-zinc-400 text-[15px] leading-relaxed">
                            {point.trim()}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-blue-400 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[13px] font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {project.demoLabel || 'Live Demo'}
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 rounded-lg text-[13px] font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          View Code
                        </a>
                      </div>
                    </div>
                    {/* Separator between projects */}
                    {idx < projects.length - 1 && (
                      <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-32 bg-zinc-900/50" ref={aboutSection.ref}>
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div className={`transition-all duration-700 ${aboutSection.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">About</p>
                <h2 className="text-3xl md:text-4xl font-medium text-zinc-100 tracking-tight mb-8">
                  Background
                </h2>
                <div className="space-y-5 text-zinc-400 text-[15px] leading-relaxed">
                  <p>
                    <span className="text-zinc-200">MS in Computer Science</span> from Indiana University with a 3.9 GPA.
                    Focused on making machine learning work in production.
                  </p>
                  <p>
                    My work spans RAG systems, LLM pipelines, and MLOps infrastructure.
                    I care deeply about building AI that's reliable, fast, and actually useful.
                  </p>
                </div>
              </div>

              <div className={`transition-all duration-700 delay-200 ${aboutSection.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">Experience</p>
                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.company}>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-[15px] font-medium text-zinc-100">{exp.role}</h3>
                        <span className="text-[13px] text-zinc-500">{exp.period}</span>
                      </div>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-zinc-500 hover:text-blue-400 transition-colors mb-2 inline-block"
                      >
                        {exp.company} →
                      </a>
                      <p className="text-[15px] text-zinc-400 leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="text-[11px] text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24">
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-12 text-center">Tech Stack</p>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveTab('ml-ai')}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'ml-ai'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/50 border border-zinc-800'
                }`}
              >
                ML/AI
              </button>
              <button
                onClick={() => setActiveTab('infrastructure')}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'infrastructure'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/50 border border-zinc-800'
                }`}
              >
                Infrastructure
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'data'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/50 border border-zinc-800'
                }`}
              >
                Data
              </button>
            </div>

            {/* ML & AI */}
            {activeTab === 'ml-ai' && (
            <div className="mb-12">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {/* Python */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#3776AB]" viewBox="0 0 256 255" fill="currentColor">
                    <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
                    <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Python</span>
                </div>
                {/* PyTorch */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#EE4C2C]" viewBox="0 0 256 310" fill="currentColor">
                    <path d="M128 0L40.5 87.5l21.3 21.3L128 42.6l66.2 66.2 21.3-21.3L128 0zm0 106.7L61.8 172.9l21.3 21.3L128 149.3l44.9 44.9 21.3-21.3L128 106.7zM85.3 213.3a42.7 42.7 0 1 0 0 85.4 42.7 42.7 0 0 0 0-85.4z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">PyTorch</span>
                </div>
                {/* TensorFlow */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#FF6F00]" viewBox="0 0 256 274" fill="currentColor">
                    <path d="M145.726 42.065v42.07l72.861 42.07v-42.07l-72.86-42.07zM0 84.135v42.07l36.43 21.03V105.17L0 84.135zm109.291 21.035l-36.43 21.035v126.2l36.43 21.035v-84.13l36.435 21.035v-42.07l-36.435-21.035v-42.07z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">TensorFlow</span>
                </div>
                {/* LangChain */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">LangChain</span>
                </div>
                {/* Hugging Face */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#FFD21E]" viewBox="0 0 256 256" fill="currentColor">
                    <circle cx="128" cy="128" r="120"/>
                    <ellipse cx="88" cy="108" rx="16" ry="20" fill="#0a0a0b"/>
                    <ellipse cx="168" cy="108" rx="16" ry="20" fill="#0a0a0b"/>
                    <path d="M80 160c0 0 20 32 48 32s48-32 48-32" stroke="#0a0a0b" strokeWidth="12" fill="none" strokeLinecap="round"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Hugging Face</span>
                </div>
                {/* OpenAI */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">OpenAI</span>
                </div>
                {/* Claude */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#D4A574]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.304 3.541l-5.296 16.918h-3.208L14.096 3.54h3.208zm-10.608 0L1.4 20.459h3.208L9.904 3.54H6.696z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Claude</span>
                </div>
                {/* Ollama */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Ollama</span>
                </div>
              </div>
            </div>
            )}

            {/* Infrastructure */}
            {activeTab === 'infrastructure' && (
            <div className="mb-12">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {/* FastAPI */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#009688]" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-8 208V128l-48 40V88l48 40V48h16v80l48-40v80l-48-40v80h-16z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">FastAPI</span>
                </div>
                {/* Docker */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#2496ED]" viewBox="0 0 256 185" fill="currentColor">
                    <path d="M250.716 70.497c-5.03-3.357-16.576-4.544-25.477-2.846-1.142-8.628-5.826-16.13-14.318-22.863l-4.87-3.636-3.636 4.87c-4.64 6.973-7.39 16.667-6.622 26.065.384 3.826 1.574 10.72 5.603 16.74-3.92 2.273-11.596 5.38-21.737 5.174H.078l-.296 1.658c-1.38 8.152-1.386 33.549 14.99 53.092 12.64 15.082 31.367 22.727 55.685 22.727 53.082 0 92.356-24.464 110.775-68.91 7.236.147 22.826.087 30.83-15.263.205-.353 2.067-4.353 6.654-14.808z"/>
                    <path d="M35 93h23v21H35V93zm28 0h23v21H63V93zm0-27h23v21H63V66zm28 27h23v21H91V93zm0-27h23v21H91V66zm28 27h23v21h-23V93zm0-27h23v21h-23V66zm28 27h23v21h-23V93zm28-27h23v21h-23V66z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Docker</span>
                </div>
                {/* AWS */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#FF9900]" viewBox="0 0 256 153" fill="currentColor">
                    <path d="M72.392 55.438c0 3.137.34 5.68.933 7.545a45.4 45.4 0 0 0 2.712 6.103c.424.678.593 1.356.593 1.95 0 .847-.508 1.695-1.61 2.543l-5.34 3.56c-.763.508-1.526.763-2.205.763-.847 0-1.695-.424-2.543-1.187a26.3 26.3 0 0 1-3.051-3.984c-.848-1.44-1.696-3.052-2.628-5.002-6.612 7.798-14.92 11.698-24.922 11.698-7.12 0-12.8-2.035-16.954-6.103-4.153-4.07-6.272-9.495-6.272-16.276 0-7.205 2.543-13.054 7.714-17.462 5.17-4.408 12.037-6.612 20.768-6.612 2.882 0 5.849.254 8.985.678 3.137.424 6.358 1.102 9.749 1.865V29.33c0-6.443-1.356-10.935-3.984-13.562-2.712-2.628-7.29-3.9-13.817-3.9-2.966 0-6.018.34-9.155 1.103-3.136.762-6.188 1.695-9.155 2.881-.678.34-1.187.509-1.526.594a2.3 2.3 0 0 1-.848.17c-.763 0-1.102-.509-1.102-1.611V11.07c0-.848.085-1.44.34-1.78.254-.34.763-.679 1.526-1.018 2.966-1.525 6.527-2.797 10.68-3.814C33.908 3.474 38.4 2.965 43.147 2.965c10.002 0 17.292 2.289 21.954 6.782 4.577 4.492 6.95 11.358 6.95 20.598v27.093h-.678z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">AWS</span>
                </div>
                {/* GCP */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9" viewBox="0 0 256 206" fill="currentColor">
                    <path d="M170.252 56.819l22.253-22.253 1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92 42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123 44.505-7.34 3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168l7.496.39z" fill="#EA4335"/>
                    <path d="M224.205 73.918a100.249 100.249 0 0 0-30.217-48.722l-31.232 31.232a55.515 55.515 0 0 1 20.379 44.037v5.544c15.35 0 27.797 12.445 27.797 27.796 0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.67c39.93.311 72.553-31.494 72.864-71.424a71.846 71.846 0 0 0-31.793-60.453z" fill="#4285F4"/>
                    <path d="M72.008 205.473h55.592v-44.505H72.008a27.373 27.373 0 0 1-11.399-2.498l-7.886 2.42-22.409 22.253-1.952 7.574c12.567 9.489 27.96 14.748 43.646 14.756z" fill="#34A853"/>
                    <path d="M72.008 62.974C32.156 63.207-.237 95.932.001 135.784a71.846 71.846 0 0 0 28.361 56.932l32.247-32.247c-13.586-6.144-19.63-22.39-13.487-35.976a27.796 27.796 0 0 1 25.12-15.86c4.536.009 9.002 1.117 13.016 3.23l32.247-32.247A71.846 71.846 0 0 0 72.008 62.974z" fill="#FBBC05"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">GCP</span>
                </div>
                {/* Kubernetes */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#326CE5]" viewBox="0 0 256 249" fill="currentColor">
                    <path d="M128.025 0c-4.67 0-8.948 2.594-11.108 6.73L85.159 62.19a13.168 13.168 0 0 1-9.702 6.73l-62.47 8.808c-4.529.637-8.354 3.629-9.95 7.786-1.596 4.157-.772 8.83 2.144 12.152l45.426 47.39c3.038 3.17 4.424 7.7 3.702 12.116l-10.752 61.873c-.773 4.451.945 8.973 4.468 11.768 3.524 2.795 8.24 3.164 12.124.959l55.827-29.17c3.964-2.07 8.688-2.07 12.652 0l55.827 29.17c3.883 2.028 8.6 1.66 12.124-.96 3.523-2.617 5.24-7.139 4.468-11.767l-10.752-61.873c-.722-4.416.664-8.947 3.702-12.117l45.426-47.39c2.916-3.043 3.74-7.538 2.144-12.152-1.596-4.613-5.421-7.149-9.95-7.786l-62.47-8.808a13.168 13.168 0 0 1-9.702-6.73L139.133 6.73C136.973 2.594 132.695 0 128.025 0z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Kubernetes</span>
                </div>
                {/* PostgreSQL */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#336791]" viewBox="0 0 256 264" fill="currentColor">
                    <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.165-26.144 2.794-33.869 5.677-7.014-3.728-15.784-6.015-26.048-6.078-10.727-.063-20.063 2.37-27.316 6.18-6.974-2.576-17.358-5.483-29.367-5.778-29.07-.713-52.403 12.225-63.648 35.31-10.232 21.001-9.785 57.16 16.206 123.134-2.91 4.107-4.751 9.112-4.87 14.75-.212 10.091 4.134 18.48 12.013 23.165 5.61 3.335 12.267 4.977 19.318 4.977 5.927 0 12.154-1.17 18.345-3.378 2.387.881 4.7 1.534 6.938 1.97a71.862 71.862 0 0 0 7.643.88c.752 4.497 2.205 8.836 4.339 12.873 4.162 7.869 10.474 14.03 18.745 18.294 5.833 3.01 12.31 4.849 19.065 5.48a52.77 52.77 0 0 0 5.114.25c12.597 0 24.358-4.449 33.193-12.54 9.533-8.727 15.238-21.181 15.238-33.247 0-1.204-.066-2.419-.2-3.643a100.697 100.697 0 0 0 6.245-1.75c5.125-1.604 9.52-3.347 13.153-5.227 2.748-1.422 5.268-3.015 7.534-4.765 6.654-5.138 10.321-11.3 10.321-17.34 0-1.903-.293-3.679-.86-5.29z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">PostgreSQL</span>
                </div>
                {/* Redis */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#DC382D]" viewBox="0 0 256 220" fill="currentColor">
                    <path d="M245.97 168.943c-13.662 7.121-84.434 36.22-99.501 44.075-15.067 7.856-23.437 7.78-35.34 2.09-11.902-5.69-87.216-36.112-100.783-42.597C3.566 169.271 0 166.535 0 163.951v-25.917s98.05-21.345 113.879-27.024c15.828-5.679 21.32-5.884 34.79-.95 13.472 4.936 94.018 19.468 107.331 24.344l-.003 25.917c0 2.503-3.07 5.392-10.027 8.622z"/>
                    <path d="M245.965 143.22c-13.661 7.118-84.431 36.218-99.498 44.072-15.066 7.857-23.436 7.78-35.338 2.09-11.903-5.686-87.214-36.113-100.78-42.594-13.566-6.485-13.85-10.948-.524-16.166 13.326-5.22 88.224-34.605 104.055-40.284 15.828-5.677 21.319-5.884 34.789-.948 13.471 4.934 83.819 32.935 97.13 37.81 13.316 4.881 13.827 8.9.166 16.02"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Redis</span>
                </div>
                {/* Kafka */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-zinc-300" viewBox="0 0 256 416" fill="currentColor">
                    <path d="M201.816 230.216c-16.186 0-30.697 7.171-40.634 18.461l-25.463-18.026c2.703-7.442 4.255-15.433 4.255-23.797 0-8.219-1.498-16.076-4.112-23.408l25.406-17.835c9.936 11.233 24.409 18.365 40.548 18.365 29.875 0 54.184-24.305 54.184-54.184 0-29.879-24.309-54.184-54.184-54.184-29.875 0-54.184 24.305-54.184 54.184 0 5.348.808 10.505 2.258 15.389l-25.423 17.844c-10.62-13.175-25.911-22.374-43.333-25.182v-30.64c24.544-5.155 43.037-26.962 43.037-53.019C124.171 24.305 99.862 0 69.987 0 40.112 0 15.803 24.305 15.803 54.184c0 25.708 18.014 47.246 42.067 52.769v31.038C25.044 143.753 0 172.401 0 206.854c0 34.621 25.292 63.374 58.355 68.94v32.774c-24.299 5.341-42.552 27.011-42.552 52.894 0 29.879 24.309 54.184 54.184 54.184 29.875 0 54.184-24.305 54.184-54.184 0-25.883-18.253-47.553-42.552-52.894v-32.775a69.965 69.965 0 0 0 42.6-24.776l25.633 18.143c-1.423 4.84-2.22 9.946-2.22 15.24 0 29.879 24.309 54.184 54.184 54.184 29.875 0 54.184-24.305 54.184-54.184 0-29.879-24.309-54.184-54.184-54.184z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Kafka</span>
                </div>
              </div>
            </div>
            )}

            {/* Vector DBs & Data */}
            {activeTab === 'data' && (
            <div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {/* Pinecone */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="#0F9D58"/>
                    <path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Pinecone</span>
                </div>
                {/* Qdrant */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#DC244C]" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor"/>
                    <polygon points="12,6 17,9 17,15 12,18 7,15 7,9" fill="#0a0a0b"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Qdrant</span>
                </div>
                {/* Weaviate */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#00D1B2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l6 3-6 3-6-3 6-3zm-7 5l7 3.5 7-3.5v6l-7 3.5-7-3.5v-6z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">Weaviate</span>
                </div>
                {/* ChromaDB */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9" viewBox="0 0 24 24">
                    <circle cx="8" cy="8" r="5" fill="#FF6B6B"/>
                    <circle cx="16" cy="8" r="5" fill="#4ECDC4"/>
                    <circle cx="12" cy="15" r="5" fill="#FFE66D"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">ChromaDB</span>
                </div>
                {/* MLflow */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#0194E2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">MLflow</span>
                </div>
                {/* Weights & Biases */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-[#FFBE00]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">W&B</span>
                </div>
                {/* GitHub */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center justify-center">
                  <svg className="w-9 h-9 text-white" viewBox="0 0 256 250" fill="currentColor">
                    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0z"/>
                  </svg>
                  <span className="mt-3 text-[11px] text-zinc-400">GitHub</span>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>
        {/* Contact */}
        <section id="contact" className="py-32" ref={contactSection.ref}>
          <div className="max-w-screen-lg mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16">
              <div className={`transition-all duration-700 ${contactSection.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">Contact</p>
                <h2 className="text-3xl md:text-4xl font-medium text-zinc-100 tracking-tight mb-6">
                  Let's build something
                </h2>
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
                  Currently open to AI/ML engineering opportunities.
                  If you're building something interesting, I'd love to hear about it.
                </p>

                <a
                  href="mailto:ayushkumarmalik10@gmail.com"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg text-[15px] font-medium hover:bg-white transition-colors group"
                >
                  <span>ayushkumarmalik10@gmail.com</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <div className="flex items-center gap-6 mt-10 pt-10 border-t border-zinc-800">
                  <a
                    href="https://github.com/ayushm98"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1 -mx-2"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span className="relative">
                      GitHub
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-100 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                  <a
                    href="https://linkedin.com/in/ayush67"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1 -mx-2"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="relative">
                      LinkedIn
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-100 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </div>
              </div>

              {/* What I'm Looking For */}
              <div className={`transition-all duration-700 delay-200 ${contactSection.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-zinc-500 text-[13px] tracking-wide uppercase mb-3">What I'm Looking For</p>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-[15px] font-medium text-zinc-100">High-impact AI roles</h3>
                    </div>
                    <p className="text-[14px] text-zinc-400 leading-relaxed">
                      Teams shipping real ML products to production—not just prototypes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="text-[15px] font-medium text-zinc-100">Hard problems</h3>
                    </div>
                    <p className="text-[14px] text-zinc-400 leading-relaxed">
                      RAG at scale, LLM orchestration, real-time inference systems.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-[15px] font-medium text-zinc-100">Strong engineering culture</h3>
                    </div>
                    <p className="text-[14px] text-zinc-400 leading-relaxed">
                      Code reviews, testing, and ownership over ML systems end-to-end.
                    </p>
                  </div>
                </div>
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
            </div>
          </div>
        </footer>
      </main>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full shadow-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-300 z-50 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

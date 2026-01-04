interface ProjectImageProps {
  type: 'multi-agent' | 'rag' | 'evaluation'
  title: string
}

export default function ProjectImage({ type, title }: ProjectImageProps) {
  const renderImage = () => {
    switch (type) {
      case 'multi-agent':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, #64ffda 0px, transparent 1px, transparent 20px),
                                 repeating-linear-gradient(90deg, #64ffda 0px, transparent 1px, transparent 20px)`
              }}></div>
            </div>

            {/* Central orchestration hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Central coordinator */}
                <div className="w-20 h-20 rounded-full border-2 border-green bg-navy flex items-center justify-center relative z-10">
                  <div className="w-14 h-14 rounded-full border-2 border-green/50 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green animate-pulse"></div>
                    </div>
                  </div>
                  {/* Pulse rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-green/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                </div>

                {/* Agent nodes in circular layout */}
                {[
                  { name: 'Planner', angle: 0, icon: '📋' },
                  { name: 'Coder', angle: 90, icon: '💻' },
                  { name: 'Reviewer', angle: 180, icon: '🔍' },
                  { name: 'Explorer', angle: 270, icon: '🗺️' }
                ].map((agent, idx) => {
                  const radius = 140
                  const x = Math.cos((agent.angle * Math.PI) / 180) * radius
                  const y = Math.sin((agent.angle * Math.PI) / 180) * radius

                  return (
                    <div
                      key={agent.name}
                      className="absolute w-24 h-24"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      {/* Connection line to center */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% - ${x}px)`}
                          y2={`calc(50% - ${y}px)`}
                          stroke="#64ffda"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          opacity="0.3"
                        />
                      </svg>

                      {/* Agent card */}
                      <div
                        className="w-full h-full rounded-lg border-2 border-green/40 bg-navy-light/90 backdrop-blur-sm flex flex-col items-center justify-center gap-1 hover:border-green hover:bg-green/10 hover:scale-110 transition-all duration-300 cursor-pointer"
                        style={{
                          animation: 'float 3s ease-in-out infinite',
                          animationDelay: `${idx * 0.5}s`
                        }}
                      >
                        <span className="text-2xl" role="img" aria-label={agent.name}>{agent.icon}</span>
                        <span className="text-green text-xs font-mono font-bold">{agent.name}</span>
                        {/* Activity indicator */}
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 rounded-full bg-green"
                              style={{
                                animation: 'pulse 1.5s ease-in-out infinite',
                                animationDelay: `${i * 0.2}s`,
                                opacity: 0.5
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Data packets flowing */}
                      <div
                        className="absolute w-2 h-2 rounded-full bg-green"
                        style={{
                          animation: 'dataFlow 2s linear infinite',
                          animationDelay: `${idx * 0.5}s`,
                          left: '50%',
                          top: '50%'
                        }}
                      ></div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Network traffic visualization */}
            <div className="absolute top-6 right-6 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Network Traffic</div>
              <div className="flex gap-1">
                {[18, 14, 22, 12, 20, 16, 24, 15].map((height, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-green/40 rounded-t"
                    style={{
                      height: `${height}px`,
                      animation: 'pulse 1s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Task Queue */}
            <div className="absolute bottom-6 left-6 bg-navy-light/90 border border-green/30 rounded px-3 py-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Task Queue</div>
              <div className="space-y-1">
                {['Planning task...', 'Coding module...', 'Review pending'].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-[8px] font-mono text-slate/60">
                    <div className="w-1 h-1 rounded-full bg-green animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}></div>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance metrics */}
            <div className="absolute top-6 left-6 bg-navy-light/90 border border-green/30 rounded px-3 py-2 backdrop-blur-sm">
              <div className="text-green font-mono text-[10px] font-bold">98.5%</div>
              <div className="text-green/50 text-[8px] font-mono">Success Rate</div>
            </div>

            {/* Log stream */}
            <div className="absolute bottom-6 right-6 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm max-w-[140px]">
              <div className="text-green/70 text-[8px] font-mono mb-1">Live Logs</div>
              <div className="space-y-0.5 text-[7px] font-mono text-slate/40">
                <div className="truncate">Agent.plan: initialized</div>
                <div className="truncate">Agent.code: executing...</div>
                <div className="truncate flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green animate-pulse"></div>
                  Active
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              @keyframes dataFlow {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
              }
            `}</style>
          </div>
        )

      case 'rag':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle, #64ffda 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3">
              {/* User Query */}
              <div className="w-full max-w-md">
                <div className="text-green/70 text-xs font-mono mb-1">User Query</div>
                <div className="relative h-14 rounded-lg border-2 border-green/40 bg-navy-light/90 backdrop-blur-sm flex items-center px-4 gap-3 hover:border-green transition-all">
                  <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 bg-slate/30 rounded w-3/4 animate-pulse"></div>
                    <div className="h-1.5 bg-slate/20 rounded w-1/2"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green animate-pulse"></div>
                </div>
              </div>

              {/* Pipeline Stages */}
              <div className="flex items-center gap-1 my-2">
                {['Route', 'Reform', 'Retrieve', 'Rerank', 'Generate'].map((stage, idx) => (
                  <div key={stage} className="flex items-center">
                    <div className="relative group">
                      <div
                        className="w-3 h-3 rounded-full bg-green/30 border-2 border-green group-hover:scale-125 transition-transform"
                        style={{
                          animation: 'stagePulse 2s ease-in-out infinite',
                          animationDelay: `${idx * 0.4}s`
                        }}
                      ></div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-green/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {stage}
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-green/50 to-green/20 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-green to-transparent"
                          style={{
                            animation: 'flowRight 2s linear infinite',
                            animationDelay: `${idx * 0.4}s`
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Vector Database / Document Store */}
              <div className="w-full max-w-md">
                <div className="text-green/70 text-xs font-mono mb-1 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  Vector Database (10,000+ docs)
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="relative h-10 rounded border border-green/20 bg-green/5 overflow-hidden group hover:border-green/50 transition-all"
                      style={{
                        animation: 'fadeInUp 0.5s ease-out',
                        animationDelay: `${i * 0.05}s`,
                        opacity: 1 - (i * 0.05)
                      }}
                    >
                      {/* Document lines */}
                      <div className="absolute inset-0 p-1 space-y-0.5">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-0.5 bg-green/20 rounded" style={{ width: `${80 - j * 15}%` }}></div>
                        ))}
                      </div>
                      {/* Relevance score */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-green/20">
                        <div
                          className="h-full bg-green"
                          style={{ width: `${Math.max(20, 100 - i * 8)}%` }}
                        ></div>
                      </div>
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-green/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retrieved Context */}
              <div className="w-full max-w-md">
                <div className="text-green/70 text-xs font-mono mb-1">Retrieved Context → LLM</div>
                <div className="relative rounded-lg border-2 border-green/40 bg-navy-light/90 backdrop-blur-sm p-3">
                  <div className="space-y-1.5">
                    {[100, 85, 70].map((width, i) => (
                      <div
                        key={i}
                        className="h-1.5 bg-slate/20 rounded relative overflow-hidden"
                        style={{ width: `${width}%` }}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-green/0 via-green/30 to-green/0"
                          style={{
                            animation: 'shimmer 2s linear infinite',
                            animationDelay: `${i * 0.3}s`
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  {/* Generation indicator */}
                  <div className="flex items-center gap-2 mt-2 text-green/50 text-xs font-mono">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-green animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-1 h-1 rounded-full bg-green animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 rounded-full bg-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>Generating response...</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex gap-4 mt-2">
                <div className="text-center">
                  <div className="text-green font-mono text-sm font-bold">92%</div>
                  <div className="text-green/50 text-[10px] font-mono">Recall@10</div>
                </div>
                <div className="text-center">
                  <div className="text-green font-mono text-sm font-bold">&lt;100ms</div>
                  <div className="text-green/50 text-[10px] font-mono">Latency</div>
                </div>
                <div className="text-center">
                  <div className="text-green font-mono text-sm font-bold">-40%</div>
                  <div className="text-green/50 text-[10px] font-mono">Hallucination</div>
                </div>
              </div>
            </div>

            {/* Confidence meter */}
            <div className="absolute top-4 right-4 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Confidence</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-6 rounded ${i < 4 ? 'bg-green/60' : 'bg-slate/20'}`}
                    style={{
                      animation: i < 4 ? 'fillBar 1s ease-out' : 'none',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
              <div className="text-green font-mono text-[10px] font-bold mt-1">87%</div>
            </div>

            {/* Token counter */}
            <div className="absolute top-4 left-4 bg-navy-light/90 border border-green/30 rounded px-3 py-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="text-green/70 text-[8px] font-mono">Tokens:</div>
                <div className="text-green font-mono text-[10px] font-bold">2.4k / 8k</div>
              </div>
              <div className="h-0.5 bg-slate/20 rounded-full mt-1 w-16 overflow-hidden">
                <div className="h-full bg-green/60" style={{ width: '30%', animation: 'fillBar 1s ease-out' }}></div>
              </div>
            </div>

            {/* Document preview tooltip */}
            <div className="absolute bottom-4 left-4 bg-navy-light/95 border border-green/30 rounded p-2 backdrop-blur-sm max-w-[180px]">
              <div className="text-green/70 text-[8px] font-mono mb-1 flex items-center gap-1">
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                </svg>
                Top Match (94.2%)
              </div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-green/30 rounded" style={{ width: '100%' }}></div>
                <div className="h-0.5 bg-green/20 rounded" style={{ width: '85%' }}></div>
                <div className="h-0.5 bg-green/15 rounded" style={{ width: '92%' }}></div>
              </div>
              <div className="text-slate/40 text-[7px] font-mono mt-1">doc_1247.pdf · Page 3</div>
            </div>

            {/* Similarity heatmap indicator */}
            <div className="absolute bottom-4 right-4 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Similarity</div>
              <div className="grid grid-cols-4 gap-0.5">
                {[95, 87, 82, 78, 71, 65, 58, 52, 45, 38, 31, 24].map((score, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-sm"
                    style={{
                      backgroundColor: `rgba(100, 255, 218, ${score / 100})`,
                      animation: 'fadeInUp 0.3s ease-out',
                      animationDelay: `${i * 0.05}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <style jsx>{`
              @keyframes stagePulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 1; }
              }
              @keyframes flowRight {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        )

      case 'evaluation':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
            {/* Background chart grid */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute left-0 right-0 border-t border-green/20" style={{ top: `${i * 10}%` }}></div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-md space-y-4">
                {/* Title */}
                <div className="text-center mb-6">
                  <div className="text-green font-mono text-xs mb-1">Model Benchmarking</div>
                  <div className="text-green/50 font-mono text-[10px]">JSON Schema Compliance</div>
                </div>

                {/* Model Comparison Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'GPT-4', score: 95, color: '#64ffda', cost: '$$$' },
                    { name: 'GPT-3.5', score: 85, color: '#64ffda', cost: '$$' },
                    { name: 'Llama', score: 78, color: '#64ffda', cost: '$' }
                  ].map((model, idx) => (
                    <div
                      key={model.name}
                      className="relative aspect-square rounded-lg border-2 border-green/30 bg-navy-light/80 backdrop-blur-sm p-3 flex flex-col items-center justify-between hover:border-green hover:scale-105 transition-all duration-300 cursor-pointer group"
                      style={{
                        animation: 'slideUp 0.5s ease-out',
                        animationDelay: `${idx * 0.15}s`
                      }}
                    >
                      {/* Model icon */}
                      <div className="w-8 h-8 rounded-full border-2 border-green/50 flex items-center justify-center bg-green/10">
                        <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>

                      {/* Model name */}
                      <div className="text-green font-mono text-xs font-bold">{model.name}</div>

                      {/* Circular progress */}
                      <div className="relative w-16 h-16">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-green/20"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={model.color}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - model.score / 100)}`}
                            className="transition-all duration-1000"
                            style={{
                              animation: 'drawCircle 1.5s ease-out',
                              animationDelay: `${idx * 0.2}s`
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-green font-mono text-sm font-bold">
                          {model.score}%
                        </div>
                      </div>

                      {/* Cost indicator */}
                      <div className="text-green/50 font-mono text-[10px] mt-1">{model.cost}</div>

                      {/* Rank badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green text-navy flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics */}
                <div className="space-y-3 pt-4">
                  {[
                    { label: 'Accuracy', value: 95, color: '#64ffda' },
                    { label: 'Latency', value: 70, color: '#8892b0', unit: 'ms' },
                    { label: 'Cost Savings', value: 95, color: '#64ffda', highlight: true }
                  ].map((metric, idx) => (
                    <div key={metric.label} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-light font-mono text-xs">{metric.label}</span>
                        <span className={`font-mono text-xs font-bold ${metric.highlight ? 'text-green' : 'text-slate'}`}>
                          {metric.value}%{metric.unit || ''}
                        </span>
                      </div>
                      <div className="relative h-2 bg-slate/10 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                          style={{
                            width: `${metric.value}%`,
                            background: `linear-gradient(90deg, ${metric.color}80, ${metric.color})`,
                            animation: 'fillBar 1.5s ease-out',
                            animationDelay: `${idx * 0.2}s`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Statistical Summary */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-green/20">
                  <div className="text-center">
                    <div className="text-green font-mono text-xs">3</div>
                    <div className="text-green/50 font-mono text-[9px]">Models</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green font-mono text-xs">1000+</div>
                    <div className="text-green/50 font-mono text-[9px]">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green font-mono text-xs">95%</div>
                    <div className="text-green/50 font-mono text-[9px]">↓ Cost</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Test dataset visualization */}
            <div className="absolute top-4 left-4 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1 flex items-center gap-1">
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Dataset
              </div>
              <div className="flex gap-1 mb-1">
                <div className="w-8 h-1 bg-green/60 rounded"></div>
                <div className="w-6 h-1 bg-green/40 rounded"></div>
                <div className="w-4 h-1 bg-green/20 rounded"></div>
              </div>
              <div className="text-green font-mono text-[9px]">1,247 samples</div>
            </div>

            {/* Latency distribution */}
            <div className="absolute top-4 right-4 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Response Time</div>
              <div className="flex items-end gap-0.5 h-8">
                {[4, 7, 12, 15, 13, 9, 5, 3].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-green/50 rounded-t"
                    style={{
                      height: `${height * 2}px`,
                      animation: 'slideUp 0.5s ease-out',
                      animationDelay: `${i * 0.05}s`
                    }}
                  ></div>
                ))}
              </div>
              <div className="text-green font-mono text-[9px] mt-1">Avg: 124ms</div>
            </div>

            {/* Confusion matrix mini */}
            <div className="absolute bottom-4 left-4 bg-navy-light/90 border border-green/30 rounded p-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Confusion Matrix</div>
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-6 h-6 bg-green/70 rounded-sm flex items-center justify-center text-[8px] font-mono text-navy font-bold">95</div>
                <div className="w-6 h-6 bg-green/10 rounded-sm flex items-center justify-center text-[8px] font-mono text-green/40">5</div>
                <div className="w-6 h-6 bg-green/10 rounded-sm flex items-center justify-center text-[8px] font-mono text-green/40">3</div>
                <div className="w-6 h-6 bg-green/70 rounded-sm flex items-center justify-center text-[8px] font-mono text-navy font-bold">97</div>
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="absolute bottom-4 right-4 bg-navy-light/90 border border-green/30 rounded px-3 py-2 backdrop-blur-sm">
              <div className="text-green/70 text-[8px] font-mono mb-1">Cost Analysis</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate/50 text-[8px] font-mono">GPT-4:</span>
                  <span className="text-slate text-[8px] font-mono">$12.40</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate/50 text-[8px] font-mono">GPT-3.5:</span>
                  <span className="text-green text-[8px] font-mono font-bold">$0.62</span>
                </div>
                <div className="h-px bg-green/20 my-1"></div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-green/70 text-[8px] font-mono">Saved:</span>
                  <span className="text-green text-[8px] font-mono font-bold">$11.78</span>
                </div>
              </div>
            </div>

            {/* Export indicator */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-navy-light/90 border border-green/30 rounded p-1.5 backdrop-blur-sm hover:bg-green/10 transition-colors cursor-pointer group">
              <svg className="w-4 h-4 text-green/70 group-hover:text-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <style jsx>{`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes drawCircle {
                from { stroke-dashoffset: ${2 * Math.PI * 28}; }
              }
              @keyframes fillBar {
                from { width: 0; }
              }
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </div>
        )
    }
  }

  return (
    <div className="relative w-full aspect-video rounded overflow-hidden border border-green/30 group">
      {renderImage()}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

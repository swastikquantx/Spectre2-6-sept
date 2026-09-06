import { Settings, Database, Server, Layout, Bot, Zap, Box, Code } from "lucide-react";

export default function Factory() {
  const tools = [
    { name: "Project Creator", icon: Box },
    { name: "Architecture Studio", icon: Server },
    { name: "Application Builder", icon: Layout },
    { name: "Agent Studio", icon: Bot },
    { name: "Workflow Studio", icon: Zap },
    { name: "Skills Library", icon: Code },
    { name: "APIs & Models", icon: Database },
    { name: "Templates", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-light text-white tracking-tight mb-2">AI Factory</h1>
        <p className="text-slate-500 text-sm">Design, orchestrate, and build autonomous systems.</p>
      </div>

      {/* Conceptual Pipeline */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 mb-12">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-6 text-center">Conceptual Pipeline</div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
          {["IDEA", "REQUIREMENTS", "RESEARCH", "ARCHITECTURE", "DATABASE", "UI", "APIs", "AGENTS", "WORKFLOWS", "CODE", "TEST", "DEPLOY"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-white/5 rounded border border-white/5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">{step}</span>
              {i < arr.length - 1 && <span className="text-white/20">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-white/20 rounded-xl p-6 flex flex-col items-center justify-center h-40 cursor-pointer transition-all hover:bg-white/[0.05] group">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all">
              <tool.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

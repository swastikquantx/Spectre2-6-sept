import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function CommandCenter() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight mb-1">Command Center</h1>
          <p className="text-slate-500 text-sm">Venture Studio & AI Autonomous Operating System</p>
        </div>
        <div className="flex gap-3">
          <Link to="/app/create" className="px-4 py-2 text-xs font-semibold bg-white text-black rounded hover:bg-slate-200 transition-colors">
            CREATE PROJECT
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-[500px]">
        {/* Column 1: Core Operations */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto lg:h-1/3">
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Active Missions</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">4 RUNNING</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-2xl font-mono text-white">89.4%</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1">Aggregate Readiness</div>
              </div>
              <div className="mt-2 flex gap-1">
                <div className="h-1 flex-1 bg-indigo-500/50 rounded-full"></div>
                <div className="h-1 flex-1 bg-indigo-500/50 rounded-full"></div>
                <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Decisions Required</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              </div>
              <div className="flex-1 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-amber-500">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white font-medium">App Architecture Approval</div>
                    <div className="text-[10px] text-slate-500 italic">Project: NexaFlow CRM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Project Grid */}
          <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-6 flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-medium text-white">Active Venture Projects</h2>
              <span className="text-xs text-slate-500 cursor-pointer hover:text-white transition-colors">View All</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto custom-scrollbar">
              <div className="border border-white/5 bg-white/5 rounded-lg p-4 hover:border-white/10 transition-colors cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-white mb-1">AETHER CLOUD</div>
                  <div className="text-[10px] text-slate-500 mb-3">SaaS Infrastructure Platform</div>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="text-indigo-400">STAGE: ARCHITECTURE</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">8 AGENTS ACTIVE</span>
                </div>
              </div>
              <div className="border border-white/5 bg-white/5 rounded-lg p-4 hover:border-white/10 transition-colors cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-white mb-1">SYNERGY LOGISTICS</div>
                  <div className="text-[10px] text-slate-500 mb-3">Autonomous SCM System</div>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="text-emerald-400">STAGE: OPERATIONAL</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">12 WORKFLOWS</span>
                </div>
              </div>
              <Link to="/app/create" className="border border-dashed border-white/10 rounded-lg p-4 flex items-center justify-center text-slate-600 hover:text-slate-400 cursor-pointer transition-colors min-h-[120px]">
                <div className="text-center">
                  <div className="text-xl mb-1">+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest">Initialize New</div>
                </div>
              </Link>
              <div className="bg-white/[0.01] rounded-lg p-4 flex items-center justify-center border border-white/5 min-h-[120px]">
                <span className="text-[10px] text-slate-700 italic font-mono">// Slot available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Context & Intelligence */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full">
          <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl p-5 flex flex-col min-h-[300px]">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-6">AI Team Activity</span>
            <div className="flex-1 overflow-y-auto space-y-4 relative custom-scrollbar pr-2">
              <div className="flex gap-3">
                <div className="w-1 bg-indigo-500 h-8 rounded-full shrink-0"></div>
                <div>
                  <div className="text-[11px] text-white">Spectre Architect</div>
                  <div className="text-[10px] text-slate-500">Finalized data model for CRM project</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-slate-700 h-8 rounded-full shrink-0"></div>
                <div>
                  <div className="text-[11px] text-slate-300">Market Analyst</div>
                  <div className="text-[10px] text-slate-500">Researching competitor pricing trends</div>
                </div>
              </div>
              <div className="flex gap-3 opacity-60">
                <div className="w-1 bg-slate-700 h-8 rounded-full shrink-0"></div>
                <div>
                  <div className="text-[11px] text-slate-300">Security Bot</div>
                  <div className="text-[10px] text-slate-500">Audit of API endpoints complete</div>
                </div>
              </div>
              <div className="flex gap-3 opacity-40">
                <div className="w-1 bg-emerald-500 h-8 rounded-full shrink-0"></div>
                <div>
                  <div className="text-[11px] text-slate-300">Deployment Agent</div>
                  <div className="text-[10px] text-slate-500">Staging environment synced</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-auto lg:h-1/3 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5 rounded-xl p-5 shrink-0 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold block mb-3">Spectre Recommendations</span>
              <p className="text-xs text-white/80 leading-relaxed mb-4 italic">
                "I recommend initializing a 'Research Mission' for the Aether project to evaluate serverless vs container-based edge deployment."
              </p>
            </div>
            <button disabled className="w-full py-2 bg-white/5 opacity-50 cursor-not-allowed text-white text-[10px] uppercase tracking-tighter font-bold rounded transition-colors mt-auto">
              NOT CONFIGURED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

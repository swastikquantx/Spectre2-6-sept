import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Project } from "../../../core/types";
import { Activity, FileText, CheckSquare, Zap, Loader2 } from "lucide-react";

export default function ProjectOverview() {
  const { project } = useOutletContext<{ project: Project }>();
  const [loading, setLoading] = useState(false);
  const [artifact, setArtifact] = useState<any>(null);

  const runAIFactory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/factory`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setArtifact(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full pb-6">
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
        
        {/* Summary Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
          <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Project Summary</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {project.description || "No description provided for this project."}
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
             <div>
               <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Architecture</div>
               <div className="text-xs text-white">{artifact ? 'Generated' : 'Pending Initialization'}</div>
             </div>
             <div>
               <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Build Status</div>
               <div className="text-xs text-white">{artifact ? 'In Progress' : 'Not Started'}</div>
             </div>
             <div>
               <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Active Agents</div>
               <div className="text-xs text-white">{artifact ? '1' : '0'}</div>
             </div>
          </div>
        </div>

        {/* AI Factory Path */}
        <div className="bg-white/[0.02] border border-indigo-500/20 rounded-xl p-6 flex-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center justify-between">
            AI Factory Pipeline
          </h2>
          
          {!artifact && !loading && (
            <div className="flex flex-col items-center justify-center h-40 text-center border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
               <Zap className="w-6 h-6 text-indigo-400 mb-3" />
               <p className="text-xs text-slate-300 mb-4">Run the minimum core path to generate blueprints.</p>
               <button onClick={runAIFactory} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded text-xs font-bold transition-colors">
                  GENERATE ARCHITECTURE & BLUEPRINTS
               </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-40 text-center">
               <Loader2 className="w-6 h-6 text-indigo-400 animate-spin mb-3" />
               <p className="text-xs text-slate-400 font-mono">Generating Requirements → Architecture → Database...</p>
            </div>
          )}

          {artifact && !loading && (
            <div className="bg-black/30 border border-white/10 rounded-lg p-4">
              <h3 className="text-emerald-400 text-xs font-bold mb-2">Generation Complete</h3>
              <p className="text-xs text-slate-300 mb-4">{artifact.summary}</p>
              <div className="bg-black p-3 rounded border border-white/5 overflow-x-auto">
                <pre className="text-[10px] text-slate-400 font-mono">{artifact.data}</pre>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 flex-1">
          <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1 bg-emerald-500 h-8 rounded-full shrink-0"></div>
              <div>
                <div className="text-[11px] text-white">Project Created</div>
                <div className="text-[10px] text-slate-500">{new Date(project.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            {artifact && (
              <div className="flex gap-3">
                <div className="w-1 bg-indigo-500 h-8 rounded-full shrink-0"></div>
                <div>
                  <div className="text-[11px] text-white">AI Factory Completed</div>
                  <div className="text-[10px] text-slate-500">Blueprints generated successfully.</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

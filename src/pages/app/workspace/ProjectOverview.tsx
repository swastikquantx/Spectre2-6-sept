import { useOutletContext } from "react-router-dom";
import { Project } from "../../../core/types";
import { Activity, FileText, CheckSquare, Zap } from "lucide-react";

export default function ProjectOverview() {
  const { project } = useOutletContext<{ project: Project }>();

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
               <div className="text-xs text-white">Pending Initialization</div>
             </div>
             <div>
               <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Build Status</div>
               <div className="text-xs text-white">Not Started</div>
             </div>
             <div>
               <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Active Agents</div>
               <div className="text-xs text-white">0</div>
             </div>
          </div>
        </div>

        {/* Next Actions & Decisions */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center justify-between">
              Decisions Required
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            </h2>
            <div className="flex flex-col items-center justify-center h-40 text-center border border-dashed border-white/5 rounded-lg">
               <Activity className="w-6 h-6 text-slate-600 mb-2" />
               <p className="text-xs text-slate-500">No pending decisions.</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Active Missions</h2>
            <div className="flex flex-col items-center justify-center h-40 text-center border border-dashed border-white/5 rounded-lg">
               <Zap className="w-6 h-6 text-slate-600 mb-2" />
               <p className="text-xs text-slate-500">No active autonomous missions.</p>
               <button className="mt-3 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Initialize Mission</button>
            </div>
          </div>
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
            <div className="flex gap-3 opacity-50">
              <div className="w-1 bg-slate-700 h-8 rounded-full shrink-0"></div>
              <div>
                <div className="text-[11px] text-slate-300">Awaiting Architecture Definition</div>
                <div className="text-[10px] text-slate-500">System pending instructions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-slate-900 to-black border border-white/5 rounded-xl p-4">
           <div className="space-y-2">
             <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors text-slate-300 hover:text-white">
                <FileText className="w-4 h-4" />
                <span className="text-xs">Project Documents</span>
             </div>
             <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors text-slate-300 hover:text-white">
                <CheckSquare className="w-4 h-4" />
                <span className="text-xs">Task Board</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}

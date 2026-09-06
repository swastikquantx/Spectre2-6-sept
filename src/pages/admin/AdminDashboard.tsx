import { Activity, Users, Database, Shield, Server } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [config, setConfig] = useState<{providers: any[], models: any[]} | null>(null);

  useEffect(() => {
    fetch('/api/spectre-config', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(r => r.json())
      .then(setConfig)
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-white tracking-tight mb-1">Platform Overview</h1>
        <p className="text-slate-500 text-sm">System administration and multi-tenant management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
             <Users className="w-4 h-4 text-slate-400" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Users</h3>
          </div>
          <div className="text-2xl text-white font-mono">1,248</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
             <Database className="w-4 h-4 text-slate-400" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Orgs</h3>
          </div>
          <div className="text-2xl text-white font-mono">84</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
             <Activity className="w-4 h-4 text-slate-400" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Calls / hr</h3>
          </div>
          <div className="text-2xl text-white font-mono">45.2k</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
             <Shield className="w-4 h-4 text-emerald-500" />
             <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">System Health</h3>
          </div>
          <div className="text-2xl text-emerald-400 font-mono">100%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">AI Providers</h2>
           <div className="space-y-3">
             {config?.providers.map(p => (
               <div key={p.id} className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-black/20">
                 <div className="flex items-center gap-3">
                   <Server className="w-4 h-4 text-slate-500" />
                   <span className="text-sm font-semibold text-slate-300">{p.id}</span>
                 </div>
                 <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                   p.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400' :
                   p.status === 'NOT_CONFIGURED' ? 'bg-slate-800 text-slate-500' :
                   'bg-amber-500/10 text-amber-400'
                 }`}>
                   {p.status}
                 </span>
               </div>
             ))}
             {!config && <div className="text-sm text-slate-600">Loading providers...</div>}
           </div>
         </div>
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Enabled Models</h2>
           <div className="space-y-3">
             {config?.models.map(m => (
               <div key={m.id} className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-black/20">
                 <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-indigo-500" />
                   <div className="flex flex-col">
                     <span className="text-sm font-semibold text-slate-300">{m.displayName}</span>
                     <span className="text-[10px] text-slate-500">{m.provider}</span>
                   </div>
                 </div>
                 <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase tracking-wider">
                   {m.modelClass}
                 </span>
               </div>
             ))}
             {!config && <div className="text-sm text-slate-600">Loading models...</div>}
           </div>
         </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6">
         <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Recent Audit Logs</h2>
         <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800 rounded-lg text-slate-600">
           <Activity className="w-6 h-6 mb-2 opacity-50" />
           <p className="text-xs">No recent administrative actions.</p>
         </div>
      </div>
    </div>
  );
}

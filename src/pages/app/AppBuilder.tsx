export default function AppBuilder() {
  return (
    <div className="flex h-full border border-white/5 rounded-2xl overflow-hidden bg-[#080808]">
      {/* Left sidebar - Structure */}
      <div className="w-64 border-r border-white/5 flex flex-col bg-[#050505]/50">
        <div className="p-4 border-b border-white/5 text-xs font-bold text-white uppercase tracking-wider">Project Structure</div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {["Requirements", "Architecture", "Database", "UI", "APIs", "Business Rules", "Agents", "Workflows", "Code", "Tests", "Deployment"].map((item) => (
            <div key={item} className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Center - Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#050505]/50">
          <div className="text-sm font-semibold text-slate-300">NexaFlow CRM / UI</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-white/20 rounded transition-colors">TEST</button>
            <button className="px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-white/20 rounded transition-colors">PREVIEW</button>
            <button className="px-3 py-1.5 text-xs text-black bg-white hover:bg-slate-200 rounded font-semibold transition-colors">BUILD</button>
          </div>
        </div>
        <div className="flex-1 bg-black p-8 overflow-auto flex items-center justify-center relative">
           <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
           <div className="w-[800px] h-[600px] bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl relative z-10 flex items-center justify-center text-slate-500 font-mono text-sm">
             Main Working Canvas
           </div>
        </div>
      </div>

      {/* Right - Copilot */}
      <div className="w-80 border-l border-white/5 flex flex-col bg-[#050505]/50">
        <div className="p-4 border-b border-white/5 text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
           Spectre Copilot
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
           <div className="bg-white/5 rounded-lg p-3 text-sm text-slate-300 border border-white/5">
             I noticed you added a Data Grid component. Should I scaffold the underlying database schema and API endpoints for it?
           </div>
        </div>
        <div className="p-4 border-t border-white/5">
           <input type="text" placeholder="Ask Copilot..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50" />
        </div>
      </div>
    </div>
  );
}

import { Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../core/AuthContext";
import { useProjectContext } from "../../core/ProjectContext";

export default function TopBar() {
  const [query, setQuery] = useState("");
  const [isIntentOpen, setIsIntentOpen] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [intentResult, setIntentResult] = useState<any>(null);
  const { activeProject } = useProjectContext();
  const { user, logout } = useAuth();

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter" && query.trim()) {
      const currentQuery = query;
      setSubmittedQuery(currentQuery);
      setIsIntentOpen(true);
      setIsLoading(true);
      setIntentResult(null);
      
      try {
        const response = await fetch('/api/spectre-run', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            taskType: 'GENERAL',
            prompt: currentQuery,
            projectId: activeProject?.id,
            systemPrompt: "You are Spectre, an AI venture and software operating assistant. Analyse the user's request and provide structured, actionable guidance. Return a JSON object with intentType (CREATE, RESEARCH, PLAN, BUILD, AUTOMATE, OPERATE, GENERAL), summary, projectType (if relevant), and recommendedNextAction. Do not claim actions were performed unless they actually were.",
            requiredCapabilities: ['FAST']
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          try {
            setIntentResult(JSON.parse(data.content));
          } catch (e) {
            setIntentResult({
               intentType: "GENERAL",
               summary: data.content,
               recommendedNextAction: "Review response"
            });
          }
        } else {
          setIntentResult({
            intentType: "ERROR",
            summary: "Failed to connect to AI Core.",
            recommendedNextAction: "Check configuration."
          });
        }
      } catch (error) {
        setIntentResult({
          intentType: "ERROR",
          summary: "Network error calling AI Core.",
          recommendedNextAction: "Try again later."
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeIntent = () => {
    setIsIntentOpen(false);
    setQuery("");
  };

  return (
    <header className="h-20 border-b border-white/5 flex items-center px-8 z-50 shrink-0 bg-[#050505]/80 backdrop-blur-sm">
      <div className="w-64 text-xs font-medium text-slate-500 truncate pr-4">
        {activeProject ? (
          <div className="flex items-center gap-2">
             <span className="text-indigo-400">Context:</span>
             <span className="text-white">{activeProject.name}</span>
          </div>
        ) : (
          "Global Context"
        )}
      </div>
      <div className="flex-1 max-w-2xl mx-auto relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-6 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all" 
            placeholder="Ask Spectre to research, plan, build or operate something..." 
            type="text" 
          />
        </div>

        {/* Command Intent Panel */}
        {isIntentOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={closeIntent}></div>
            <div className="absolute top-full left-0 right-0 mt-4 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Command Intent Detected</div>
              <div className="text-lg text-white mb-6 font-light italic">"{submittedQuery}"</div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                   <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-4" />
                   <div className="text-xs text-slate-400 font-bold tracking-widest uppercase">Spectre AI Core Processing...</div>
                </div>
              ) : intentResult && (
                <div className="animate-in fade-in">
                  <div className="flex gap-2 mb-6">
                    <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-full text-indigo-300 font-bold">
                      {intentResult.intentType || 'GENERAL'}
                    </span>
                    {intentResult.projectType && (
                      <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300 font-bold">
                        {intentResult.projectType}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-slate-300 mb-6 bg-white/[0.02] p-4 rounded-lg border border-white/5">
                    {intentResult.summary}
                  </div>
                  
                  {intentResult.recommendedNextAction && (
                    <div className="text-xs text-emerald-400 mb-8 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                       {intentResult.recommendedNextAction}
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-3">
                    <button onClick={closeIntent} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                      CANCEL
                    </button>
                    <button onClick={closeIntent} className="px-6 py-2 text-xs font-semibold bg-white text-black rounded hover:bg-slate-200 transition-colors">
                      CONTINUE WITH SPECTRE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 ml-4 w-64 justify-end">
        <div className="flex flex-col text-right"><span className="text-xs font-bold text-white">{user?.name}</span><span className="text-[9px] uppercase tracking-widest text-slate-400">{user?.role}</span></div>
        <button onClick={logout} className="text-[10px] text-red-500 hover:text-red-400 uppercase tracking-widest font-bold">Logout</button>
        <Link to="/app/settings/profile" className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"></Link>
      </div>
    </header>
  );
}

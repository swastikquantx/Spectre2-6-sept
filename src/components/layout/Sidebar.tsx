import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Command, Grid, Box, Bot, Zap, Brain, Activity, Globe, Folder } from "lucide-react";

const navGroups = [
  {
    label: "Command Center",
    items: [
      { name: "Overview", path: "/app/command", icon: Command },
      { name: "My Projects", path: "/app/projects", icon: Folder },
    ]
  },
  {
    label: "Create",
    items: [
      { name: "New Project", path: "/app/create" },
    ]
  },
  {
    label: "AI Factory",
    items: [
      { name: "AI Factory Home", path: "/app/factory", icon: Grid },
      { name: "Architecture Studio", path: "/app/factory/architecture", icon: Box },
      { name: "App Builder", path: "/app/factory/builder", icon: Box },
      { name: "Agent Studio", path: "/app/factory/agents", icon: Bot },
      { name: "Workflow Studio", path: "/app/factory/workflows", icon: Zap },
    ]
  },
  {
    label: "Intelligence",
    items: [
      { name: "Intelligence Center", path: "/app/intelligence", icon: Brain },
      { name: "Research", path: "/app/intelligence/research", icon: Brain },
      { name: "Knowledge", path: "/app/intelligence/knowledge", icon: Brain },
    ]
  },
  {
    label: "Automation",
    items: [
      { name: "Automation Center", path: "/app/automation", icon: Activity },
    ]
  },
  {
    label: "Ecosystem",
    items: [
      { name: "Ecosystem", path: "/app/ecosystem", icon: Globe },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 h-full border-r border-white/5 flex flex-col bg-[#080808] z-20 shrink-0">
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/90 rounded-md flex items-center justify-center p-1 shrink-0">
            <img src="/spectre-logo.webp" alt="Spectre Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white leading-none">SPECTRE</span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">LETS BUILD</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar">
        {navGroups.map((group, i) => (
          <div key={i}>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = location.pathname === item.path || (location.pathname.startsWith('/app/projects') && item.path === '/app/projects');
                return (
                  <Link
                    key={j}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-1.5 text-sm rounded-md transition-colors",
                      isActive 
                        ? "bg-white/10 text-white" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {group.label === 'Create' ? (
                       <span className="w-4 text-center text-xs opacity-50">+</span>
                    ) : (
                       item.icon && <item.icon className="w-4 h-4" />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link to="/admin" className="flex items-center gap-3 px-2 py-2 text-xs text-slate-500 hover:text-white transition-colors">
          <div className="w-2 h-2 rounded-full bg-slate-700"></div> 
          Admin Console
        </Link>
      </div>
    </aside>
  );
}

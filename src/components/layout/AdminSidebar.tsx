import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Users, Server, Shield, Database, Settings } from "lucide-react";

const navGroups = [
  {
    label: "Platform",
    items: [
      { name: "Overview", path: "/admin", icon: Server },
      { name: "Users & Orgs", path: "/admin/users", icon: Users },
      { name: "Billing & Plans", path: "/admin/billing", icon: Database },
    ]
  },
  {
    label: "AI Orchestration",
    items: [
      { name: "AI Economics", path: "/admin/ai-economics", icon: Server },
      { name: "Providers & Models", path: "/admin/models", icon: Database },
      { name: "OmniRoute", path: "/admin/omniroute", icon: Settings },
    ]
  },
  {
    label: "Security & Health",
    items: [
      { name: "System Health", path: "/admin/health", icon: Server },
      { name: "Security & Audit", path: "/admin/security", icon: Shield },
    ]
  }
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 h-full border-r border-slate-800 flex flex-col bg-[#020202] z-20 shrink-0">
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/90 rounded-md flex items-center justify-center p-1 shrink-0">
            <img src="/spectre-logo.webp" alt="Spectre Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white leading-none">SPECTRE</span>
            <span className="text-[9px] uppercase tracking-widest text-red-500 font-bold mt-1">ADMIN CONSOLE</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar">
        {navGroups.map((group, i) => (
          <div key={i}>
            <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-3 px-2">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={j}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                      isActive 
                        ? "bg-slate-800 text-white" 
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    )}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link to="/app" className="flex items-center gap-3 px-2 py-2 text-xs text-slate-400 hover:text-white transition-colors">
          Exit Admin Console
        </Link>
      </div>
    </aside>
  );
}

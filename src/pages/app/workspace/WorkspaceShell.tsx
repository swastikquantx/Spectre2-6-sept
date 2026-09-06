import { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Project, ProjectCategory } from "../../../core/types";
import { projectRepo } from "../../../core/ProjectRepository";
import { useProjectContext } from "../../../core/ProjectContext";

const getModulesForCategory = (category: ProjectCategory): string[] => {
  const base = ['OVERVIEW', 'DOCUMENTS', 'TASKS', 'MISSIONS'];
  switch (category) {
    case 'VENTURE':
      return ['OVERVIEW', 'RESEARCH', 'MARKET', 'STRATEGY', 'BUSINESS_MODEL', 'FINANCIALS', 'BRAND', ...base.slice(1)];
    case 'SOFTWARE':
    case 'BUSINESS_SYSTEM':
    case 'AI_APPLICATION':
      return ['OVERVIEW', 'ARCHITECTURE', 'PRODUCT', 'APPLICATION', 'AGENTS', 'WORKFLOWS', 'INTEGRATIONS', 'LAUNCH', ...base.slice(1)];
    default:
      return ['OVERVIEW', 'ARCHITECTURE', 'PRODUCT', 'APPLICATION', ...base.slice(1)];
  }
};

export default function WorkspaceShell() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveProject } = useProjectContext();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      projectRepo.get(projectId).then(p => {
        if (p) {
          setProject(p);
          setActiveProject(p);
        } else {
          navigate('/app/projects');
        }
      });
    }
    return () => setActiveProject(null);
  }, [projectId, navigate, setActiveProject]);

  if (!project) return <div className="p-8 text-slate-500">Loading workspace...</div>;

  const modules = getModulesForCategory(project.category);
  const currentPathEnd = location.pathname.split('/').pop()?.toUpperCase() || 'OVERVIEW';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Workspace Header */}
      <div className="border-b border-white/5 pb-0 shrink-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-light text-white tracking-tight">{project.name}</h1>
              {project.businessSystemType && (
                 <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded ml-2">
                   {project.businessSystemType}
                 </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span className="text-slate-300">{project.category}</span>
              <span className="text-white/20">|</span>
              <span className="text-amber-400">STAGE: {project.stage}</span>
              <span className="text-white/20">|</span>
              <span className={project.status === 'ACTIVE' ? 'text-emerald-400' : 'text-slate-400'}>STATUS: {project.status}</span>
            </div>
          </div>
          <button className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded hover:bg-slate-200 transition-colors">
             ASK SPECTRE
          </button>
        </div>
        
        {/* Module Navigation */}
        <div className="flex gap-6 overflow-x-auto text-[11px] font-bold tracking-widest text-slate-500 custom-scrollbar uppercase">
          {modules.map(m => {
            const isActive = currentPathEnd === m || (m === 'APPLICATION' && location.pathname.includes('/builder')) || (m === 'ARCHITECTURE' && location.pathname.includes('/architecture'));
            const path = m === 'APPLICATION' ? 'factory/builder' : m === 'ARCHITECTURE' ? 'factory/architecture' : m.toLowerCase();
            return (
              <Link 
                key={m}
                to={`/app/projects/${project.id}/${path}`} 
                className={`pb-3 whitespace-nowrap border-b-2 transition-colors ${isActive ? 'border-indigo-400 text-white' : 'border-transparent hover:text-slate-300'}`}
              >
                {m.replace('_', ' ')}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Workspace Content */}
      <div className="flex-1 overflow-auto pt-6 custom-scrollbar">
        <Outlet context={{ project }} />
      </div>
    </div>
  );
}

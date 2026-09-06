import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../core/types";
import { projectRepo } from "../../core/ProjectRepository";
import { FolderPlus, Search, Filter } from "lucide-react";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    projectRepo.list().then(setProjects);
  }, []);

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight mb-1">My Projects</h1>
          <p className="text-slate-500 text-sm">Manage ventures, applications, and autonomous systems.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/app/create')}
            className="px-4 py-2 text-xs font-semibold bg-white text-black rounded hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            CREATE PROJECT
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6 flex gap-4 shrink-0">
        <div className="relative flex-1">
           <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
           <input 
             type="text" 
             placeholder="Search projects..." 
             className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
           />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 cursor-pointer hover:bg-white/10 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {projects.length === 0 ? (
          <div className="h-64 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-slate-500">
            <FolderPlus className="w-8 h-8 mb-4 opacity-50" />
            <p className="text-sm">No projects found. Create one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div 
                key={project.id}
                onClick={() => navigate(`/app/projects/${project.id}`)}
                className="bg-white/[0.02] border border-white/5 hover:border-white/15 rounded-xl p-6 cursor-pointer transition-colors group flex flex-col min-h-[160px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold bg-white/5 px-2 py-1 rounded">
                    {project.category}
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-1 rounded ${
                    project.status === 'ACTIVE' ? 'text-emerald-400 bg-emerald-400/10' : 
                    project.status === 'DRAFT' ? 'text-amber-400 bg-amber-400/10' : 
                    'text-slate-400 bg-white/5'
                  }`}>
                    {project.status}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-indigo-300 transition-colors">{project.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 flex-1">{project.description}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-auto border-t border-white/5 pt-3">
                  <span>STAGE: {project.stage}</span>
                  <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

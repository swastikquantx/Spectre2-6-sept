import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCategory } from "../../core/types";
import { projectRepo } from "../../core/ProjectRepository";

const CATEGORIES: { id: ProjectCategory; label: string; subcategories?: string[] }[] = [
  { id: 'VENTURE', label: 'NEW VENTURE' },
  { id: 'SOFTWARE', label: 'SOFTWARE / SaaS' },
  { id: 'BUSINESS_SYSTEM', label: 'BUSINESS SYSTEM', subcategories: ['CRM', 'ERP', 'HRMS', 'ACCOUNTING', 'SCM', 'PROCUREMENT', 'INVENTORY', 'WAREHOUSE', 'HELPDESK', 'PROJECT MANAGEMENT', 'WORKFLOW / BPM', 'CUSTOM'] },
  { id: 'AI_APPLICATION', label: 'AI APPLICATION' },
  { id: 'AUTOMATION', label: 'AUTOMATION' },
  { id: 'AGENT', label: 'AGENT' },
  { id: 'WEBSITE', label: 'WEBSITE / PORTAL' },
  { id: 'CUSTOM', label: 'CUSTOM' }
];

export default function CreateFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  
  const [basics, setBasics] = useState({ name: "", description: "" });

  const handleNextTo2 = () => {
    if (query.trim()) {
      // Basic extraction for prototype
      setBasics(prev => ({ ...prev, description: query }));
      setStep(2);
    }
  };

  const handleCategorySelect = (catId: ProjectCategory) => {
    setCategory(catId);
    if (catId !== 'BUSINESS_SYSTEM') {
      setStep(3);
    }
  };

  const handleCreate = async () => {
    if (basics.name.trim() && category) {
      const proj = await projectRepo.create({
        name: basics.name,
        description: basics.description,
        category: category,
        businessSystemType: subCategory || undefined
      });
      navigate(`/app/projects/${proj.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto py-10 w-full animate-in fade-in duration-300">
      
      {step === 1 && (
        <div className="text-center w-full">
          <h1 className="text-4xl font-light tracking-tight text-white mb-8">What do you want to build?</h1>
          <div className="w-full relative mb-16">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNextTo2()}
              placeholder="Describe your software, venture, or system..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-xl text-white placeholder-slate-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all text-center"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button onClick={handleNextTo2} className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold tracking-tight hover:bg-slate-200 transition-colors">
                NEXT
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-500">Press Enter to continue, or choose from popular templates below.</div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full">
          <div className="text-center mb-10">
            <div className="text-xs text-indigo-400 font-bold tracking-widest mb-2 uppercase">Step 2 of 3</div>
            <h1 className="text-3xl font-light tracking-tight text-white">Select Project Category</h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => handleCategorySelect(cat.id)}
                className={`border rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center h-32 gap-3 transition-colors ${category === cat.id ? 'bg-white/10 border-white/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 transition-colors">
                  <span className="text-lg">+</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-colors text-center">{cat.label}</span>
              </div>
            ))}
          </div>

          {category === 'BUSINESS_SYSTEM' && (
            <div className="mt-8 animate-in slide-in-from-top-4 fade-in">
              <h3 className="text-sm font-medium text-white mb-4">Select Business System Type</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.find(c => c.id === 'BUSINESS_SYSTEM')?.subcategories?.map(sub => (
                  <button 
                    key={sub}
                    onClick={() => { setSubCategory(sub); setStep(3); }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs text-slate-300 transition-colors"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs text-indigo-400 font-bold tracking-widest mb-2 uppercase">Step 3 of 3</div>
            <h1 className="text-3xl font-light tracking-tight text-white">Project Basics</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Project Name</label>
              <input 
                type="text" 
                value={basics.name}
                onChange={e => setBasics({ ...basics, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white/20"
                placeholder="e.g. NexaFlow CRM"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Description</label>
              <textarea 
                value={basics.description}
                onChange={e => setBasics({ ...basics, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white/20 min-h-[120px]"
                placeholder="Brief description..."
              />
            </div>
            <div className="pt-4 flex justify-between">
               <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-colors">
                  BACK
               </button>
               <button 
                 onClick={handleCreate} 
                 disabled={!basics.name.trim()}
                 className="bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 text-white px-8 py-3 rounded-lg text-sm font-bold transition-colors"
               >
                  CREATE PROJECT
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

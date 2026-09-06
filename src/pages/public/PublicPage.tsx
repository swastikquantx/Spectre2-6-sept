import { useLocation, Link } from "react-router-dom";

export default function PublicPage() {
  const location = useLocation();
  const title = location.pathname === '/' ? 'Spectre' : location.pathname.split('/').pop()?.replace(/-/g, ' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-8 text-center">
      <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6 capitalize">
        {title}
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
        Designed to architect, build, and orchestrate {title} ecosystems. 
        Progressively enabling autonomous business systems.
      </p>
      
      {location.pathname === '/' && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app" className="bg-white text-black px-8 py-4 rounded text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
            Enter Spectre
          </Link>
          <Link to="/ai-factory" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Explore AI Factory
          </Link>
        </div>
      )}
      
      {location.pathname !== '/' && (
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
          System Architecture Preview
        </div>
      )}
    </div>
  );
}

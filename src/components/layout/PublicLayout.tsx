import { Outlet, Link } from "react-router-dom";
import { Box, Code, Database, Layout, Server, Settings, Zap, Bot } from "lucide-react";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 z-50 bg-black/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/90 rounded-md flex items-center justify-center p-1 shrink-0">
              <img src="/spectre-logo.webp" alt="Spectre Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter text-white leading-none">SPECTRE</span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">LETS BUILD</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
            <Link to="/product" className="hover:text-white transition-colors">Product</Link>
            <Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link to="/ai-factory" className="hover:text-white transition-colors">AI Factory</Link>
            <Link to="/use-cases" className="hover:text-white transition-colors">Use Cases</Link>
            <Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Sign In</Link>
          <Link to="/app" className="bg-white text-black px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">Enter Spectre</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* SEO Footer */}
      <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white/50 rounded-md flex items-center justify-center p-1 shrink-0">
                <img src="/spectre-logo.webp" alt="Spectre Logo" className="w-full h-full object-contain opacity-50" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter text-white leading-none opacity-80">SPECTRE</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">LETS BUILD</span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              AI Venture, Software & Autonomous Business Operating System.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">Product</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/product" className="hover:text-white transition-colors">Spectre Core</Link></li>
              <li><Link to="/ai-factory" className="hover:text-white transition-colors">AI Factory</Link></li>
              <li><Link to="/application-builder" className="hover:text-white transition-colors">Application Builder</Link></li>
              <li><Link to="/agent-studio" className="hover:text-white transition-colors">Agent Studio</Link></li>
              <li><Link to="/workflow-studio" className="hover:text-white transition-colors">Workflow Studio</Link></li>
              <li><Link to="/automation" className="hover:text-white transition-colors">Automation</Link></li>
              <li><Link to="/intelligence" className="hover:text-white transition-colors">Intelligence</Link></li>
              <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">Solutions</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/solutions/saas" className="hover:text-white transition-colors">SaaS Builder</Link></li>
              <li><Link to="/solutions/crm" className="hover:text-white transition-colors">CRM Builder</Link></li>
              <li><Link to="/solutions/erp" className="hover:text-white transition-colors">ERP Builder</Link></li>
              <li><Link to="/solutions/hrms" className="hover:text-white transition-colors">HRMS Builder</Link></li>
              <li><Link to="/solutions/business-systems" className="hover:text-white transition-colors">Business Systems</Link></li>
              <li><Link to="/solutions/ai-applications" className="hover:text-white transition-colors">AI Applications</Link></li>
              <li><Link to="/solutions/enterprise-automation" className="hover:text-white transition-colors">Enterprise Automation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/api" className="hover:text-white transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">Company & Legal</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-white transition-colors">About Swastik AI Labs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/responsible-ai" className="hover:text-white transition-colors">Responsible AI</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Swastik AI Labs. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-slate-600">
            <span>Ecosystem: Vectra &middot; QuantX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

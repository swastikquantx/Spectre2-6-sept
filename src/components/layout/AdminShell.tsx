import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell() {
  return (
    <div className="flex h-screen w-full bg-[#050505] text-slate-200 overflow-hidden font-sans relative">
      <AdminSidebar />
      <main className="flex-1 flex flex-col relative h-full z-10 bg-[#0a0a0a]">
        <header className="h-14 border-b border-slate-800 flex items-center px-8 shrink-0 bg-[#020202]">
          <h2 className="text-sm font-semibold text-slate-300">Platform Administration</h2>
        </header>
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

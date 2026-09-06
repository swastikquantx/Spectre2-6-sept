import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell() {
  return (
    <div className="flex h-screen w-full bg-[#050505] text-slate-200 overflow-hidden font-sans relative">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full z-10">
        <TopBar />
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./core/AuthContext";
import { ProtectedRoute } from "./core/ProtectedRoute";

import AppShell from "./components/layout/AppShell";
import AdminShell from "./components/layout/AdminShell";
import PublicLayout from "./components/layout/PublicLayout";
import PublicPage from "./pages/public/PublicPage";
import Login from "./pages/public/Login";

import CommandCenter from "./pages/app/CommandCenter";
import CreateFlow from "./pages/app/CreateFlow";
import ProjectList from "./pages/app/ProjectList";
import Factory from "./pages/app/Factory";
import AppBuilder from "./pages/app/AppBuilder";
import WorkspaceShell from "./pages/app/workspace/WorkspaceShell";
import ProjectOverview from "./pages/app/workspace/ProjectOverview";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { ProjectProvider } from "./core/ProjectContext";

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<PublicPage />} />
              <Route path="product" element={<PublicPage />} />
              <Route path="ai-factory" element={<PublicPage />} />
              <Route path="application-builder" element={<PublicPage />} />
              <Route path="agent-studio" element={<PublicPage />} />
              <Route path="workflow-studio" element={<PublicPage />} />
              <Route path="automation" element={<PublicPage />} />
              <Route path="intelligence" element={<PublicPage />} />
              <Route path="integrations" element={<PublicPage />} />
              <Route path="solutions" element={<PublicPage />} />
              <Route path="solutions/*" element={<PublicPage />} />
              <Route path="templates" element={<PublicPage />} />
              <Route path="use-cases" element={<PublicPage />} />
              <Route path="about" element={<PublicPage />} />
              <Route path="contact" element={<PublicPage />} />
              <Route path="security" element={<PublicPage />} />
              <Route path="responsible-ai" element={<PublicPage />} />
              <Route path="privacy" element={<PublicPage />} />
              <Route path="terms" element={<PublicPage />} />
              <Route path="cookies" element={<PublicPage />} />
              <Route path="docs" element={<PublicPage />} />
              <Route path="api" element={<PublicPage />} />
            </Route>
            
            <Route path="/login" element={<Login />} />
            
            {/* App Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/app" element={<AppShell />}>
                <Route index element={<Navigate to="command" replace />} />
                <Route path="command" element={<CommandCenter />} />
                <Route path="create" element={<CreateFlow />} />
                <Route path="projects" element={<ProjectList />} />
                
                <Route path="projects/:projectId" element={<WorkspaceShell />}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<ProjectOverview />} />
                  
                  {/* Contextual Factory/Tools within a project */}
                  <Route path="factory" element={<Factory />} />
                  <Route path="factory/architecture" element={<div className="p-8 text-slate-400">Project Architecture Studio Placeholder</div>} />
                  <Route path="factory/builder" element={<AppBuilder />} />
                  <Route path="factory/agents" element={<div className="p-8 text-slate-400">Project Agent Studio Placeholder</div>} />
                  <Route path="factory/workflows" element={<div className="p-8 text-slate-400">Project Workflow Studio Placeholder</div>} />
                  
                  {/* Contextual Knowledge/Memory */}
                  <Route path="knowledge" element={<div className="p-8 text-slate-400">Project Knowledge Placeholder</div>} />
                  <Route path=":module" element={<div className="p-8 text-slate-400 uppercase">Module View Placeholder</div>} />
                </Route>
                
                {/* Global Tools */}
                <Route path="factory" element={<Factory />} />
                <Route path="factory/architecture" element={<div className="p-8 text-slate-400">ARCHITECTURE STUDIO - NOT CONFIGURED</div>} />
                <Route path="factory/builder" element={<AppBuilder />} />
                <Route path="factory/agents" element={<div className="p-8 text-slate-400">AGENT STUDIO - NOT CONFIGURED</div>} />
                <Route path="factory/workflows" element={<div className="p-8 text-slate-400">WORKFLOW STUDIO - NOT CONFIGURED</div>} />
                
                <Route path="intelligence">
                  <Route index element={<div className="p-8 text-slate-400">INTELLIGENCE - NOT CONFIGURED</div>} />
                  <Route path="research" element={<div className="p-8 text-slate-400">Research Placeholder</div>} />
                  <Route path="knowledge" element={<div className="p-8 text-slate-400">Global Knowledge Placeholder</div>} />
                </Route>
                
                <Route path="automation">
                  <Route index element={<div className="p-8 text-slate-400">AUTOMATION - NOT CONFIGURED</div>} />
                </Route>
                
                <Route path="ecosystem" element={<div className="p-8 text-slate-400">ECOSYSTEM - NOT CONFIGURED</div>} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PLATFORM_ADMIN']} />}>
              <Route path="/admin" element={<AdminShell />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<div className="p-8 text-slate-400">Users Management Placeholder</div>} />
                <Route path="billing" element={<div className="p-8 text-slate-400">Billing Placeholder</div>} />
                <Route path="ai-economics" element={<div className="p-8 text-slate-400">AI Economics Placeholder</div>} />
                <Route path="models" element={<div className="p-8 text-slate-400">Models Placeholder</div>} />
                <Route path="omniroute" element={<div className="p-8 text-slate-400">OmniRoute Placeholder</div>} />
                <Route path="health" element={<div className="p-8 text-slate-400">System Health Placeholder</div>} />
                <Route path="security" element={<div className="p-8 text-slate-400">Security Placeholder</div>} />
              </Route>
            </Route>

            {/* Catch-All 404 */}
            <Route path="*" element={<PublicPage />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}

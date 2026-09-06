import { Project, ProjectStatus, ProjectStage, ProjectCategory } from "./types";

export interface ProjectRepository {
  create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'stage'>): Promise<Project>;
  get(id: string): Promise<Project | null>;
  list(): Promise<Project[]>;
  update(id: string, updates: Partial<Project>): Promise<Project>;
}

export class ApiProjectRepository implements ProjectRepository {
  async create(p: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'stage'>): Promise<Project> {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(p)
    });
    return res.json();
  }

  async get(id: string): Promise<Project | null> {
    const res = await fetch(`/api/projects/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    if (res.status === 404) return null;
    return res.json();
  }

  async list(): Promise<Project[]> {
    const res = await fetch('/api/projects', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    const data = await res.json();
    return data.sort((a: Project, b: Project) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error("Failed to update project");
    return res.json();
  }
}

export const projectRepo = new ApiProjectRepository();

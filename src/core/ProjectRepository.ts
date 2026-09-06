import { Project, ProjectStatus, ProjectStage, ProjectCategory } from "./types";

export interface ProjectRepository {
  create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'stage'>): Promise<Project>;
  get(id: string): Promise<Project | null>;
  list(): Promise<Project[]>;
  update(id: string, updates: Partial<Project>): Promise<Project>;
}

// Prototype mode adapter using localStorage
export class PrototypeProjectRepository implements ProjectRepository {
  private readonly STORAGE_KEY = 'spectre_prototype_projects';

  private getProjects(): Project[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveProjects(projects: Project[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  async create(p: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'stage'>): Promise<Project> {
    const newProj: Project = {
      ...p,
      id: `prj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      status: 'DRAFT',
      stage: 'IDEA',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const projects = this.getProjects();
    projects.push(newProj);
    this.saveProjects(projects);
    return newProj;
  }

  async get(id: string): Promise<Project | null> {
    const projects = this.getProjects();
    return projects.find(p => p.id === id) || null;
  }

  async list(): Promise<Project[]> {
    return this.getProjects().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");
    
    const updated = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
    projects[index] = updated;
    this.saveProjects(projects);
    return updated;
  }
}

export const projectRepo = new PrototypeProjectRepository();

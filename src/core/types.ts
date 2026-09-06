export type ProjectStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
export type ProjectStage = 'IDEA' | 'DISCOVERY' | 'PLANNING' | 'ARCHITECTURE' | 'BUILDING' | 'TESTING' | 'PRE_LAUNCH' | 'LAUNCHED' | 'OPERATING';
export type ProjectCategory = 'VENTURE' | 'SOFTWARE' | 'BUSINESS_SYSTEM' | 'AI_APPLICATION' | 'AUTOMATION' | 'AGENT' | 'WEBSITE' | 'CUSTOM';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  businessSystemType?: string;
  status: ProjectStatus;
  stage: ProjectStage;
  createdAt: string;
  updatedAt: string;
}

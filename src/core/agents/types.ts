import { AITaskType, AIModelClass, AICapability } from '../ai/types';

export type AgentStatus = 'AVAILABLE' | 'DEGRADED' | 'DISABLED';

export interface SpectreAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  systemInstruction: string;
  capabilities: AICapability[];
  allowedTaskTypes: AITaskType[];
  preferredModelClass: AIModelClass;
  tools: string[]; // For now just strings representing tools
  permissions: string[];
  enabled: boolean;
  version: string;
}

export type ExecutionStatus = 'QUEUED' | 'RUNNING' | 'WAITING' | 'NEEDS_APPROVAL' | 'COMPLETE' | 'FAILED' | 'CANCELLED' | 'BLOCKED';

export interface AgentRunMetadata {
  runId: string;
  agentId: string;
  task: string;
  projectId?: string;
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  result?: string;
  error?: string;
  metadata?: any;
}

export interface OrchestrationStep {
  id: string;
  stepNumber: number;
  objective: string;
  assignedAgent: string;
  expectedOutput: string;
  requiresCritic: boolean;
  requiresApproval: boolean;
  dependencies: string[]; // step IDs
  status: ExecutionStatus;
  result?: string;
  criticStatus?: CriticStatus;
}

export interface OrchestrationPlan {
  id: string;
  objective: string;
  projectId?: string;
  steps: OrchestrationStep[];
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
}

export type CriticStatus = 'APPROVED' | 'APPROVED_WITH_NOTES' | 'REVISION_REQUIRED' | 'REJECTED' | 'PENDING' | 'SKIPPED';

export interface CriticReview {
  status: CriticStatus;
  issues: string[];
  unsupportedClaims: string[];
  missingInformation: string[];
  recommendedChanges: string[];
  confidence: number;
}

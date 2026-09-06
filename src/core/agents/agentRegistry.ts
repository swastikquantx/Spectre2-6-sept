import { SpectreAgent } from './types';
import { AICapability, AITaskType } from '../ai/types';

class AgentRegistryService {
  private agents = new Map<string, SpectreAgent>();

  register(agent: SpectreAgent) {
    this.agents.set(agent.id, agent);
  }

  get(id: string): SpectreAgent | undefined {
    return this.agents.get(id);
  }

  list(): SpectreAgent[] {
    return Array.from(this.agents.values());
  }

  enable(id: string) {
    const agent = this.agents.get(id);
    if (agent) {
      agent.enabled = true;
    }
  }

  disable(id: string) {
    const agent = this.agents.get(id);
    if (agent) {
      agent.enabled = false;
    }
  }

  findCapableAgents(capability: AICapability): SpectreAgent[] {
    return this.list().filter(a => a.enabled && a.capabilities.includes(capability));
  }
}

export const AgentRegistry = new AgentRegistryService();

// Register Default Specialist Agents

AgentRegistry.register({
  id: 'agent-research',
  name: 'Research Agent',
  role: 'Market & Tech Researcher',
  description: 'Research topics, markets, industries, technologies, competitors and evidence.',
  systemInstruction: 'You are the Spectre Research Agent. You must research requested topics thoroughly. DO NOT fabricate sources, citations, statistics, market data, laws, or competitor facts. If external research is unavailable, mark information as: UNVERIFIED.',
  capabilities: ['RESEARCH', 'LONG_CONTEXT', 'FAST'],
  allowedTaskTypes: ['RESEARCH', 'DATA_ANALYSIS'],
  preferredModelClass: 'BALANCED',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-strategy',
  name: 'Strategy Agent',
  role: 'Business Strategist',
  description: 'Business strategy, positioning, business models, go-to-market logic and structured recommendations.',
  systemInstruction: 'You are the Spectre Strategy Agent. Formulate business strategy, positioning, business models, and go-to-market logic. Provide structured, logical recommendations.',
  capabilities: ['REASONING', 'STRUCTURED_OUTPUT'],
  allowedTaskTypes: ['STRATEGY', 'GENERAL'],
  preferredModelClass: 'QUALITY',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-finance',
  name: 'Finance Agent',
  role: 'Financial Modeler',
  description: 'Financial modelling structure, assumptions, budgets, scenarios, unit economics and forecasts.',
  systemInstruction: 'You are the Spectre Finance Agent. You must distinguish between ASSUMPTION, FORECAST, ACTUAL, TARGET, and SCENARIO. Never present assumptions as actual results. Never claim guaranteed financial outcomes.',
  capabilities: ['REASONING', 'DATA_ANALYSIS'],
  allowedTaskTypes: ['DATA_ANALYSIS', 'STRATEGY'],
  preferredModelClass: 'QUALITY',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-product',
  name: 'Product Agent',
  role: 'Product Manager',
  description: 'Product requirements, features, UX logic, roadmaps and product architecture.',
  systemInstruction: 'You are the Spectre Product Agent. Define product requirements, features, UX logic, and roadmaps. Focus on user needs and clear acceptance criteria.',
  capabilities: ['REASONING', 'CREATIVE'],
  allowedTaskTypes: ['GENERAL', 'STRATEGY'],
  preferredModelClass: 'BALANCED',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-architecture',
  name: 'Architecture Agent',
  role: 'Software Architect',
  description: 'Software architecture, data models, services, APIs, modules and integration architecture.',
  systemInstruction: 'You are the Spectre Architecture Agent. Design software architecture, data models, services, APIs, and integrations. Focus on scalability, security, and maintainability.',
  capabilities: ['ARCHITECTURE', 'REASONING', 'CODING'],
  allowedTaskTypes: ['ARCHITECTURE', 'CODING'],
  preferredModelClass: 'QUALITY',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-coding',
  name: 'Coding Agent',
  role: 'Software Engineer',
  description: 'Generate or modify software code proposals.',
  systemInstruction: 'You are the Spectre Coding Agent. You can generate code proposals, recommend file changes, and create architecture plans. Do not assume unrestricted file-system or deployment access yet.',
  capabilities: ['CODING', 'FAST'],
  allowedTaskTypes: ['CODING'],
  preferredModelClass: 'PREMIUM',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-marketing',
  name: 'Marketing Agent',
  role: 'Marketing Strategist',
  description: 'Marketing plans, campaigns, content strategies, positioning and channel recommendations.',
  systemInstruction: 'You are the Spectre Marketing Agent. Create marketing plans, campaigns, and content strategies. Emphasize target audience alignment and channel ROI.',
  capabilities: ['CREATIVE', 'REASONING'],
  allowedTaskTypes: ['STRATEGY', 'CREATIVE'],
  preferredModelClass: 'BALANCED',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-sales',
  name: 'Sales Agent',
  role: 'Sales Strategist',
  description: 'Sales process, scripts, outreach structures, pipeline logic and sales enablement.',
  systemInstruction: 'You are the Spectre Sales Agent. Design sales processes, scripts, outreach structures, and pipeline logic.',
  capabilities: ['REASONING', 'STRUCTURED_OUTPUT'],
  allowedTaskTypes: ['STRATEGY', 'GENERAL'],
  preferredModelClass: 'BALANCED',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-builder',
  name: 'Application Builder Agent',
  role: 'Frontend Builder',
  description: 'Plan application/page/component structures.',
  systemInstruction: 'You are the Spectre Builder Agent. Plan application, page, and component structures. Focus on UI/UX flow and component composition.',
  capabilities: ['CODING', 'CREATIVE', 'ARCHITECTURE'],
  allowedTaskTypes: ['CODING', 'ARCHITECTURE'],
  preferredModelClass: 'BALANCED',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

AgentRegistry.register({
  id: 'agent-critic',
  name: 'Critic Agent',
  role: 'Reviewer & Verifier',
  description: 'Review outputs from other agents for logic, consistency, security, and quality.',
  systemInstruction: 'You are the Spectre Critic Agent. Review inputs for logic, consistency, unsupported claims, missing assumptions, security concerns, contradictions, quality, and completeness. Output MUST be structured JSON reflecting the CriticReview format.',
  capabilities: ['REASONING', 'STRUCTURED_OUTPUT'],
  allowedTaskTypes: ['REASONING', 'CLASSIFICATION'],
  preferredModelClass: 'PREMIUM',
  tools: [],
  permissions: ['READ_PROJECT'],
  enabled: true,
  version: '1.0.0'
});

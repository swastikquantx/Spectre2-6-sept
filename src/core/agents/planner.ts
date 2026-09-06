import { OrchestrationPlan, OrchestrationStep } from './types';
import { spectreAI } from '../ai/spectreAI';
import { AgentRegistry } from './agentRegistry';
import { AgentGuardrails } from './guardrails';

export class AgentPlanner {
  
  async createPlan(objective: string, projectId?: string): Promise<OrchestrationPlan> {
    
    const availableAgents = AgentRegistry.list().filter(a => a.enabled && a.id !== 'agent-critic').map(a => ({
      id: a.id,
      role: a.role,
      description: a.description
    }));

    const prompt = `Objective: ${objective}
    
Available Agents:
${JSON.stringify(availableAgents, null, 2)}

Create an orchestration plan to achieve this objective. Break it down into steps.
You MUST assign a valid available Agent ID to each step.
Max steps allowed: ${AgentGuardrails.MAX_ORCHESTRATION_STEPS}.

Return ONLY a valid JSON object matching this structure:
{
  "steps": [
    {
      "stepNumber": 1,
      "objective": "What to do in this step",
      "assignedAgent": "agent-id-from-available-agents",
      "expectedOutput": "What this step must produce",
      "requiresCritic": true|false,
      "requiresApproval": true|false,
      "dependencies": [] // stepNumbers this depends on
    }
  ]
}
`;

    try {
      const response = await spectreAI.run({
        taskType: 'STRATEGY',
        prompt,
        systemPrompt: "You are the Spectre Orchestration Planner. You create structured JSON plans mapping objectives to specific agent steps.",
        preferredModelClass: 'QUALITY',
        requiredCapabilities: ['STRUCTURED_OUTPUT', 'REASONING'],
        projectId
      });

      if (!response.success) throw new Error('Planner failed to execute');

      let resultStr = response.content;
      resultStr = resultStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsed = JSON.parse(resultStr);
      
      const planId = `plan-${Date.now()}`;
      
      const steps: OrchestrationStep[] = (parsed.steps || []).slice(0, AgentGuardrails.MAX_ORCHESTRATION_STEPS).map((s: any) => ({
        id: `step-${Date.now()}-${s.stepNumber}`,
        stepNumber: s.stepNumber,
        objective: s.objective,
        assignedAgent: s.assignedAgent,
        expectedOutput: s.expectedOutput,
        requiresCritic: s.requiresCritic || false,
        requiresApproval: s.requiresApproval || false,
        dependencies: (s.dependencies || []).map((depNum: number) => `step-${Date.now()}-${depNum}`), // Simplified dependency mapping for now
        status: 'QUEUED'
      }));

      return {
        id: planId,
        objective,
        projectId,
        steps,
        status: 'QUEUED',
        startedAt: new Date().toISOString()
      };

    } catch (error: any) {
      console.error('[Planner Error]', error);
      // Fallback simple plan if JSON parsing or AI fails
      return {
        id: `plan-${Date.now()}`,
        objective,
        projectId,
        steps: [{
          id: `step-${Date.now()}-1`,
          stepNumber: 1,
          objective: objective,
          assignedAgent: 'agent-strategy',
          expectedOutput: 'Strategy and analysis',
          requiresCritic: true,
          requiresApproval: false,
          dependencies: [],
          status: 'QUEUED'
        }],
        status: 'QUEUED',
        startedAt: new Date().toISOString()
      };
    }
  }
}

export const planner = new AgentPlanner();

import { AgentRegistry } from './agentRegistry';
import { AgentRunMetadata, ExecutionStatus } from './types';
import { spectreAI } from '../ai/spectreAI';
import { AgentError } from './errors';
import { telemetry } from '../ai/telemetry';

export class AgentRunner {
  
  async run(
    agentId: string, 
    task: string, 
    context?: any, 
    projectId?: string
  ): Promise<AgentRunMetadata> {
    
    const agent = AgentRegistry.get(agentId);
    if (!agent) {
      throw new AgentError('AGENT_NOT_FOUND', `Agent ${agentId} not found.`);
    }
    if (!agent.enabled) {
      throw new AgentError('AGENT_DISABLED', `Agent ${agentId} is disabled.`);
    }

    const runId = `run-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const startedAt = new Date().toISOString();
    
    let status: ExecutionStatus = 'RUNNING';
    let result: string | undefined;
    let errorStr: string | undefined;

    try {
      // Call spectreAI.run()
      const response = await spectreAI.run({
        taskType: agent.allowedTaskTypes[0] || 'GENERAL',
        prompt: task,
        systemPrompt: agent.systemInstruction,
        projectId: projectId,
        context: context,
        preferredModelClass: agent.preferredModelClass,
        metadata: { agentId, runId }
      });

      if (response.success) {
        result = response.content;
        status = 'COMPLETE';
      } else {
        status = 'FAILED';
        errorStr = response.error?.message || 'Unknown error';
      }
    } catch (error: any) {
      status = 'FAILED';
      errorStr = error.message;
    }

    const completedAt = new Date().toISOString();

    const metadata: AgentRunMetadata = {
      runId,
      agentId,
      task,
      projectId,
      status,
      startedAt,
      completedAt,
      result,
      error: errorStr
    };

    // Telemetry
    telemetry.record({
      taskType: agent.allowedTaskTypes[0] || 'GENERAL',
      provider: 'MOCK', // Replaced in true spectreAI layer, but here for tracking agent invocation
      model: 'agent-run',
      modelClass: agent.preferredModelClass,
      latencyMs: new Date(completedAt).getTime() - new Date(startedAt).getTime(),
      success: status === 'COMPLETE',
      fallbackCount: 0,
      projectId,
      timestamp: completedAt,
      cost: 'UNKNOWN',
      error: errorStr
    });

    return metadata;
  }
}

export const runner = new AgentRunner();

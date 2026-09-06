import { OrchestrationPlan } from './types';
import { planner } from './planner';
import { runner } from './agentRunner';
import { critic } from './critic';
import { AgentGuardrails } from './guardrails';

export class SpectreOrchestrator {
  
  async execute(objective: string, projectId?: string): Promise<OrchestrationPlan> {
    const plan = await planner.createPlan(objective, projectId);
    
    plan.status = 'RUNNING';
    console.log(`[Orchestrator] Starting plan ${plan.id} with ${plan.steps.length} steps.`);

    const contextStore: any = {
      objective
    };

    for (const step of plan.steps) {
      if (plan.status === 'CANCELLED' || plan.status === 'FAILED') break;

      step.status = 'RUNNING';
      console.log(`[Orchestrator] Step ${step.stepNumber}: ${step.objective} -> ${step.assignedAgent}`);

      try {
        const runContext = {
          ...contextStore,
          currentStepObjective: step.objective,
          expectedOutput: step.expectedOutput
        };
        
        // Execute the agent
        let agentOutput = "";
        let retryCount = 0;
        let success = false;

        while (retryCount <= AgentGuardrails.MAX_RETRIES_PER_STEP && !success) {
          const runResult = await runner.run(step.assignedAgent, step.objective, runContext, projectId);
          
          if (runResult.status === 'COMPLETE' && runResult.result) {
            agentOutput = runResult.result;
            success = true;
          } else {
            retryCount++;
            console.warn(`[Orchestrator] Step ${step.stepNumber} failed, retrying... (${retryCount}/${AgentGuardrails.MAX_RETRIES_PER_STEP})`);
          }
        }

        if (!success) {
          step.status = 'FAILED';
          plan.status = 'FAILED';
          break;
        }

        // Critic Review if required
        if (step.requiresCritic) {
          let criticRevisions = 0;
          let criticPassed = false;
          
          while (criticRevisions <= AgentGuardrails.MAX_CRITIC_REVISIONS && !criticPassed) {
            const review = await critic.review(agentOutput, runContext);
            step.criticStatus = review.status;
            
            if (review.status === 'APPROVED' || review.status === 'APPROVED_WITH_NOTES') {
              criticPassed = true;
              if (review.status === 'APPROVED_WITH_NOTES') {
                agentOutput += '\n\n[Critic Notes]\n' + review.issues.join('\n');
              }
            } else {
               criticRevisions++;
               console.log(`[Orchestrator] Critic requested revision for step ${step.stepNumber}. Revision ${criticRevisions}.`);
               // Tell agent to revise
               const revisionContext = {
                 ...runContext,
                 previousOutput: agentOutput,
                 criticFeedback: review
               };
               const reviseResult = await runner.run(step.assignedAgent, `Revise based on critic feedback: ${review.issues.join(', ')}`, revisionContext, projectId);
               if (reviseResult.status === 'COMPLETE' && reviseResult.result) {
                  agentOutput = reviseResult.result;
               } else {
                  break; // Revise failed
               }
            }
          }

          if (!criticPassed) {
            console.warn(`[Orchestrator] Critic rejected step ${step.stepNumber} after max revisions.`);
            // Accept degraded output for now in prototype, but could mark FAILED
          }
        }

        step.result = agentOutput;
        step.status = 'COMPLETE';
        
        // Add to context for next steps
        contextStore[`step_${step.stepNumber}_output`] = agentOutput;

      } catch (error: any) {
        console.error(`[Orchestrator] Step ${step.stepNumber} error:`, error);
        step.status = 'FAILED';
        plan.status = 'FAILED';
        break;
      }
    }

    if (plan.status !== 'FAILED' && plan.status !== 'CANCELLED') {
      plan.status = 'COMPLETE';
    }
    
    plan.completedAt = new Date().toISOString();
    return plan;
  }
}

export const orchestrator = new SpectreOrchestrator();

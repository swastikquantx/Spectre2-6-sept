import { SpectreAIRequest, SpectreAIResponse } from './types';
import { router } from './router';
import { getProvider, registerProvider } from './providerRegistry';
import { telemetry } from './telemetry';
import { SpectreError } from './errors';
import { GeminiProvider } from './providers/geminiProvider';
import { MockProvider } from './providers/mockProvider';
import { OpenAICompatibleProvider } from './providers/openAICompatibleProvider';

// Initialize built-in providers (Server-side context primarily)
registerProvider(new GeminiProvider());
registerProvider(new OpenAICompatibleProvider());
registerProvider(new MockProvider());

export class SpectreAICore {
  private static instance: SpectreAICore;

  private constructor() {}

  static getInstance(): SpectreAICore {
    if (!SpectreAICore.instance) {
      SpectreAICore.instance = new SpectreAICore();
    }
    return SpectreAICore.instance;
  }

  async run(request: SpectreAIRequest): Promise<SpectreAIResponse> {
    const routePlan = router.route(request);
    let fallbackCount = 0;
    const maxAttempts = Math.min(3, routePlan.length);
    
    for (let i = 0; i < maxAttempts; i++) {
      const model = routePlan[i];
      const provider = getProvider(model.provider);
      
      if (!provider) continue;

      try {
        const response = await provider.execute(request, model.id);
        
        telemetry.record({
          taskType: request.taskType,
          provider: model.provider,
          model: model.id,
          modelClass: model.modelClass,
          latencyMs: response.latencyMs,
          success: true,
          fallbackCount,
          projectId: request.projectId,
          timestamp: new Date().toISOString(),
          cost: model.cost
        });

        return response;
      } catch (error: any) {
        fallbackCount++;
        
        console.warn(`[SpectreAI] Attempt ${i + 1} failed with model ${model.id} via ${model.provider}:`, error.message);
        
        if (i === maxAttempts - 1) {
          telemetry.record({
            taskType: request.taskType,
            provider: model.provider,
            model: model.id,
            modelClass: model.modelClass,
            latencyMs: 0,
            success: false,
            fallbackCount,
            projectId: request.projectId,
            timestamp: new Date().toISOString(),
            cost: model.cost,
            error: error.message
          });
          
          if (error instanceof SpectreError) {
            throw error;
          }
          throw new SpectreError('UNKNOWN_ERROR', `All ${maxAttempts} execution attempts failed. Last error: ${error.message}`, error);
        }
      }
    }
    
    throw new SpectreError('UNKNOWN_ERROR', 'SpectreAI execution failed unexpectedly without throwing inside loop.');
  }
}

export const spectreAI = SpectreAICore.getInstance();

import { AIModel, SpectreAIRequest } from './types';
import { getEnabledModels } from './modelRegistry';
import { getProvider } from './providerRegistry';
import { SpectreError } from './errors';

export class SpectreRouter {
  
  route(request: SpectreAIRequest): AIModel[] {
    const models = getEnabledModels();
    
    // Filter by capability
    let capableModels = models;
    if (request.requiredCapabilities && request.requiredCapabilities.length > 0) {
      capableModels = models.filter(m => 
        request.requiredCapabilities!.every(cap => m.capabilities.includes(cap))
      );
    }

    // Filter out unavailable providers
    capableModels = capableModels.filter(m => {
      const provider = getProvider(m.provider);
      return provider && provider.getStatus().status === 'AVAILABLE';
    });

    if (capableModels.length === 0) {
      throw new SpectreError('CAPABILITY_NOT_SUPPORTED', 'No enabled and available models support the requested capabilities.');
    }

    // Sort by policy: Prefer requested class, then FREE, ECONOMY, BALANCED, QUALITY, PREMIUM
    const preferredClass = request.preferredModelClass;
    
    capableModels.sort((a, b) => {
      if (preferredClass) {
        if (a.modelClass === preferredClass && b.modelClass !== preferredClass) return -1;
        if (a.modelClass !== preferredClass && b.modelClass === preferredClass) return 1;
      }
      
      const classWeights: Record<string, number> = {
        'FREE': 1,
        'ECONOMY': 2,
        'BALANCED': 3,
        'QUALITY': 4,
        'PREMIUM': 5
      };

      const wA = classWeights[a.modelClass] || 99;
      const wB = classWeights[b.modelClass] || 99;

      if (wA !== wB) return wA - wB;
      
      return b.priority - a.priority; // higher priority first if tie
    });

    return capableModels;
  }
}

export const router = new SpectreRouter();

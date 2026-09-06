import { AIProviderId, AIProviderStatus, SpectreAIRequest, SpectreAIResponse } from './types';

export interface AIProvider {
  id: AIProviderId;
  getStatus(): AIProviderStatus;
  execute(request: SpectreAIRequest, modelId: string): Promise<SpectreAIResponse>;
}

const providers = new Map<AIProviderId, AIProvider>();

export function registerProvider(provider: AIProvider) {
  providers.set(provider.id, provider);
}

export function getProvider(id: AIProviderId): AIProvider | undefined {
  return providers.get(id);
}

export function getAllProviders(): AIProvider[] {
  return Array.from(providers.values());
}

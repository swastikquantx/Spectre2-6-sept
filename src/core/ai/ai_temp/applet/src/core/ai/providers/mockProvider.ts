import { AIProvider } from '../providerRegistry';
import { AIProviderStatus, SpectreAIRequest, SpectreAIResponse } from '../types';

export class MockProvider implements AIProvider {
  id = 'MOCK' as const;

  getStatus(): AIProviderStatus {
    return {
      id: this.id,
      status: 'AVAILABLE'
    };
  }

  async execute(request: SpectreAIRequest, modelId: string): Promise<SpectreAIResponse> {
    const start = Date.now();
    
    await new Promise(r => setTimeout(r, 800));

    let content = "I am a mock response. Please configure a real provider.";
    
    // Simulate JSON output for structured output tests
    if (request.prompt.includes('{') || request.systemPrompt?.includes('structured')) {
      content = JSON.stringify({
        intentType: request.prompt.toLowerCase().includes('build') || request.prompt.toLowerCase().includes('create') ? "CREATE" : "RESEARCH",
        summary: "Mock analysis of: " + request.prompt.substring(0, 50) + "...",
        projectType: request.prompt.toLowerCase().includes('crm') ? "BUSINESS_SYSTEM" : undefined,
        recommendedNextAction: "Review mock response and configure a real model."
      });
    }

    return {
      success: true,
      content,
      provider: this.id,
      model: modelId,
      latencyMs: Date.now() - start,
      metadata: { mock: true }
    };
  }
}

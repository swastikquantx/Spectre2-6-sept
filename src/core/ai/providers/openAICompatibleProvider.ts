import { AIProvider } from '../providerRegistry';
import { AIProviderStatus, SpectreAIRequest, SpectreAIResponse } from '../types';
import { SpectreError } from '../errors';

export class OpenAICompatibleProvider implements AIProvider {
  id = 'OPENAI_COMPATIBLE' as const;
  private endpoint: string | null = null;
  private apiKey: string | null = null;

  constructor() {
    if (typeof process !== 'undefined' && process.env) {
      this.endpoint = process.env.OPENAI_COMPATIBLE_ENDPOINT || null;
      this.apiKey = process.env.OPENAI_COMPATIBLE_API_KEY || null;
    }
  }

  getStatus(): AIProviderStatus {
    return {
      id: this.id,
      status: (this.endpoint && this.apiKey) ? 'AVAILABLE' : 'NOT_CONFIGURED'
    };
  }

  async execute(request: SpectreAIRequest, modelId: string): Promise<SpectreAIResponse> {
    if (!this.endpoint || !this.apiKey) {
      throw new SpectreError('PROVIDER_UNAVAILABLE', 'OpenAI Compatible provider is not configured.');
    }

    const start = Date.now();
    try {
      const messages = [];
      if (request.systemPrompt) {
        messages.push({ role: 'system', content: request.systemPrompt });
      }
      
      let finalPrompt = request.prompt;
      if (request.context) {
         finalPrompt = `Context:\n${JSON.stringify(request.context)}\n\nRequest:\n${request.prompt}`;
      }
      
      messages.push({ role: 'user', content: finalPrompt });

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: modelId,
          messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          response_format: request.systemPrompt?.toLowerCase().includes('json') ? { type: "json_object" } : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        content: data.choices[0]?.message?.content || "",
        provider: this.id,
        model: modelId,
        latencyMs: Date.now() - start,
        finishReason: data.choices[0]?.finish_reason,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        }
      };
    } catch (error: any) {
      throw new SpectreError('UNKNOWN_ERROR', error.message || 'Error calling OpenAI Compatible API', error);
    }
  }
}

import { GoogleGenAI } from "@google/genai";
import { AIProvider } from '../providerRegistry';
import { AIProviderStatus, SpectreAIRequest, SpectreAIResponse } from '../types';
import { SpectreError } from '../errors';

export class GeminiProvider implements AIProvider {
  id = 'GEMINI' as const;
  private ai: GoogleGenAI | null = null;

  constructor() {
    // Only initialize if we have the env var available
    if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  }

  getStatus(): AIProviderStatus {
    return {
      id: this.id,
      status: this.ai ? 'AVAILABLE' : 'NOT_CONFIGURED'
    };
  }

  async execute(request: SpectreAIRequest, modelId: string): Promise<SpectreAIResponse> {
    if (!this.ai) {
      throw new SpectreError('PROVIDER_UNAVAILABLE', 'Gemini provider is not configured. Missing GEMINI_API_KEY.');
    }

    const start = Date.now();
    try {
      // Create chat instead of generateContent if we need memory in future, 
      // but instruction specifically mentions a stateless generateContent request for now
      
      let finalPrompt = request.prompt;
      if (request.context) {
         finalPrompt = `Context:\n${JSON.stringify(request.context)}\n\nRequest:\n${request.prompt}`;
      }

      const response = await this.ai.models.generateContent({
        model: modelId,
        contents: finalPrompt,
        config: {
          systemInstruction: request.systemPrompt,
          temperature: request.temperature,
          maxOutputTokens: request.maxTokens,
          // Support for JSON output if requested
          responseMimeType: request.systemPrompt?.toLowerCase().includes('json') ? 'application/json' : 'text/plain',
        }
      });

      return {
        success: true,
        content: response.text || "",
        provider: this.id,
        model: modelId,
        latencyMs: Date.now() - start,
        finishReason: response.candidates?.[0]?.finishReason,
      };
    } catch (error: any) {
      throw new SpectreError('UNKNOWN_ERROR', error.message || 'Error calling Gemini API', error);
    }
  }
}

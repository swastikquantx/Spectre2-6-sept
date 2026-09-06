import { AIModel } from './types';

export const modelRegistry: AIModel[] = [
  {
    id: 'gemini-2.5-flash',
    provider: 'GEMINI',
    displayName: 'Gemini 2.5 Flash',
    capabilities: ['FAST', 'REASONING', 'CODING', 'CREATIVE', 'LONG_CONTEXT', 'STRUCTURED_OUTPUT'],
    modelClass: 'FREE', 
    enabled: true,
    priority: 10,
    maxContext: 1000000,
    cost: 'UNKNOWN',
    latencyCategory: 'FAST'
  },
  {
    id: 'gemini-2.5-pro',
    provider: 'GEMINI',
    displayName: 'Gemini 2.5 Pro',
    capabilities: ['REASONING', 'CODING', 'CREATIVE', 'LONG_CONTEXT', 'STRUCTURED_OUTPUT'],
    modelClass: 'PREMIUM',
    enabled: true,
    priority: 5,
    maxContext: 2000000,
    cost: 'UNKNOWN',
    latencyCategory: 'MEDIUM'
  },
  {
    id: 'mock-model',
    provider: 'MOCK',
    displayName: 'Spectre Mock Model',
    capabilities: ['FAST', 'REASONING', 'CODING', 'CREATIVE', 'RESEARCH', 'STRUCTURED_OUTPUT'],
    modelClass: 'FREE',
    enabled: true,
    priority: 1,
    maxContext: 'UNKNOWN',
    cost: 'UNKNOWN',
    latencyCategory: 'FAST'
  }
];

export function getEnabledModels(): AIModel[] {
  return modelRegistry.filter(m => m.enabled);
}

export function getModelById(id: string): AIModel | undefined {
  return modelRegistry.find(m => m.id === id);
}

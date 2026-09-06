export type AIProviderId = 'GEMINI' | 'OPENAI_COMPATIBLE' | 'MOCK';
export type AIModelClass = 'FREE' | 'ECONOMY' | 'BALANCED' | 'QUALITY' | 'PREMIUM';
export type AITaskType = 'GENERAL' | 'RESEARCH' | 'STRATEGY' | 'REASONING' | 'CODING' | 'ARCHITECTURE' | 'CREATIVE' | 'SUMMARIZATION' | 'CLASSIFICATION' | 'DATA_ANALYSIS' | 'VISION' | 'FAST_RESPONSE';
export type AICapability = 'FAST' | 'REASONING' | 'CODING' | 'CREATIVE' | 'RESEARCH' | 'VISION' | 'LONG_CONTEXT' | 'STRUCTURED_OUTPUT' | 'DATA_ANALYSIS' | 'ARCHITECTURE';

export interface AIProviderStatus {
  id: AIProviderId;
  status: 'AVAILABLE' | 'DEGRADED' | 'UNAVAILABLE' | 'NOT_CONFIGURED';
}

export interface AIModel {
  id: string;
  provider: AIProviderId;
  displayName: string;
  capabilities: AICapability[];
  modelClass: AIModelClass;
  enabled: boolean;
  priority: number;
  maxContext?: number | 'UNKNOWN';
  cost?: any | 'UNKNOWN';
  latencyCategory?: 'FAST' | 'MEDIUM' | 'SLOW' | 'UNKNOWN';
}

export interface SpectreAIRequest {
  taskType: AITaskType;
  prompt: string;
  systemPrompt?: string;
  projectId?: string;
  organizationId?: string;
  context?: any;
  requiredCapabilities?: AICapability[];
  preferredModelClass?: AIModelClass;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
  metadata?: any;
}

export interface SpectreAIResponse {
  success: boolean;
  content: string;
  provider: AIProviderId;
  model: string;
  latencyMs: number;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
  error?: SpectreAIError;
  metadata?: any;
}

export type AIErrorCode = 'PROVIDER_UNAVAILABLE' | 'MODEL_UNAVAILABLE' | 'CAPABILITY_NOT_SUPPORTED' | 'AUTH_ERROR' | 'RATE_LIMIT' | 'TIMEOUT' | 'INVALID_REQUEST' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';

export interface SpectreAIError {
  code: AIErrorCode;
  message: string;
  details?: any;
}

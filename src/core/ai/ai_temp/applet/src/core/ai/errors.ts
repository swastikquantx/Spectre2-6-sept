import { AIErrorCode, SpectreAIError } from './types';

export class SpectreError extends Error {
  public code: AIErrorCode;
  public details?: any;

  constructor(code: AIErrorCode, message: string, details?: any) {
    super(message);
    this.name = 'SpectreError';
    this.code = code;
    this.details = details;
  }

  toNormalError(): SpectreAIError {
    return {
      code: this.code,
      message: this.message,
      details: this.details
    };
  }
}

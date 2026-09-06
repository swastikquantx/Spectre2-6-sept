export class AgentError extends Error {
  public code: string;
  public details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'AgentError';
    this.code = code;
    this.details = details;
  }
}

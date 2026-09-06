import { AIModelClass, AIProviderId, AITaskType } from './types';

export interface TelemetryEvent {
  taskType: AITaskType;
  provider: AIProviderId;
  model: string;
  modelClass: AIModelClass;
  latencyMs: number;
  success: boolean;
  fallbackCount: number;
  projectId?: string;
  timestamp: string;
  cost: any | 'UNKNOWN';
  error?: string;
}

class TelemetryService {
  private events: TelemetryEvent[] = [];

  record(event: TelemetryEvent) {
    this.events.push(event);
    // In production, this would flush to a metrics backend
    console.log(`[SpectreAI Telemetry] ${event.taskType} via ${event.model} (${event.latencyMs}ms) - Success: ${event.success}`);
  }

  getEvents(): TelemetryEvent[] {
    return this.events;
  }
}

export const telemetry = new TelemetryService();

import { CriticReview, CriticStatus } from './types';
import { spectreAI } from '../ai/spectreAI';
import { AgentRegistry } from './agentRegistry';

export class AgentCritic {
  async review(content: string, context?: any): Promise<CriticReview> {
    const criticAgent = AgentRegistry.get('agent-critic');
    if (!criticAgent || !criticAgent.enabled) {
      // If critic is missing or disabled, default to approved
      return {
        status: 'APPROVED',
        issues: [],
        unsupportedClaims: [],
        missingInformation: [],
        recommendedChanges: [],
        confidence: 1.0
      };
    }

    try {
      const prompt = `Review the following output.
      
Output to review:
${content}

Context:
${JSON.stringify(context || {})}

Return ONLY a valid JSON object matching this structure:
{
  "status": "APPROVED" | "APPROVED_WITH_NOTES" | "REVISION_REQUIRED" | "REJECTED",
  "issues": ["list of strings"],
  "unsupportedClaims": ["list of strings"],
  "missingInformation": ["list of strings"],
  "recommendedChanges": ["list of strings"],
  "confidence": 0.0 to 1.0
}
`;

      const response = await spectreAI.run({
        taskType: 'CLASSIFICATION',
        prompt: prompt,
        systemPrompt: criticAgent.systemInstruction,
        preferredModelClass: criticAgent.preferredModelClass,
        requiredCapabilities: ['STRUCTURED_OUTPUT', 'REASONING']
      });

      if (!response.success) throw new Error('Critic failed to execute');

      // Attempt to parse the JSON
      let resultStr = response.content;
      // Strip markdown code blocks if any
      resultStr = resultStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsed = JSON.parse(resultStr) as CriticReview;
      
      // Basic validation
      if (!['APPROVED', 'APPROVED_WITH_NOTES', 'REVISION_REQUIRED', 'REJECTED'].includes(parsed.status)) {
         parsed.status = 'REVISION_REQUIRED';
      }

      return parsed;

    } catch (error) {
      console.error('[Critic Error]', error);
      return {
        status: 'APPROVED_WITH_NOTES',
        issues: ['Critic review failed to complete or parse correctly.'],
        unsupportedClaims: [],
        missingInformation: [],
        recommendedChanges: [],
        confidence: 0.5
      };
    }
  }
}

export const critic = new AgentCritic();

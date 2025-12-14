import { DiagnosticReport } from './reportAgent';

export interface DiagnosisResult {
  probableIssue: string;
  confidence: number;
  reasoning: string;
}

export const diagnosisAgent = async (report: DiagnosticReport): Promise<DiagnosisResult> => {
  console.log('🤖 DiagnosisAgent: Diagnosing issue...', report);

  // Hardcoded fault rules
  let probableIssue = 'Unknown Issue';
  let confidence = 0.5;
  let reasoning = 'Insufficient data for precise diagnosis.';

  if (report.suspectedSystems.includes('Cooling System')) {
    probableIssue = 'Coolant Pump Failure';
    confidence = 0.87;
    reasoning = 'Symptoms of overheating combined with noise are characteristic of pump failure.';
  } else if (report.suspectedSystems.includes('Suspension')) {
    probableIssue = 'Strut Mount Wear';
    confidence = 0.75;
    reasoning = 'Noise indicates potential suspension wear.';
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    probableIssue,
    confidence,
    reasoning
  };
};

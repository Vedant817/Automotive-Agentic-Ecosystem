import { DiagnosisResult } from './diagnosisAgent';
import { HistoryCorrelation } from './historyAgent';

export interface NotificationResult {
  appointmentSuggested: boolean;
  message: string;
  generatedAt: string;
}

export const notificationAgent = async (
  diagnosis: DiagnosisResult,
  history: HistoryCorrelation
): Promise<NotificationResult> => {
  console.log('🤖 NotificationAgent: Generating notification...');

  let message = 'We have received your report. A technician will review it shortly.';
  let appointmentSuggested = false;

  if (diagnosis.confidence > 0.8 || history.riskLevel === 'High') {
    appointmentSuggested = true;
    message = `We detected a potential ${diagnosis.probableIssue}. Given the urgency, we recommend scheduling a service visit immediately.`;
  } else if (diagnosis.confidence > 0.5) {
    appointmentSuggested = true;
    message = `There might be an issue with your ${diagnosis.probableIssue}. We suggest a check-up at your convenience.`;
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 600));

  return {
    appointmentSuggested,
    message,
    generatedAt: new Date().toISOString()
  };
};

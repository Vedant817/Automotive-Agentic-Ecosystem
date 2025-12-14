import { customerDataAgent, CustomerInput } from './customerDataAgent';
import { reportAgent } from './reportAgent';
import { diagnosisAgent } from './diagnosisAgent';
import { historyAgent } from './historyAgent';
import { notificationAgent } from './notificationAgent';

export interface AgentStep {
  agentName: string;
  action: string;
  timestamp: string;
  data: any;
}

export interface CaseState {
  caseId: string;
  status: 'Open' | 'Resolved';
  steps: AgentStep[];
  finalResult?: any;
}

export const masterAgent = async (input: CustomerInput): Promise<CaseState> => {
  const steps: AgentStep[] = [];
  const caseId = `CASE-${Date.now()}`;

  // Helper to log steps
  const logStep = (agentName: string, action: string, data: any) => {
    steps.push({
      agentName,
      action,
      timestamp: new Date().toISOString(),
      data
    });
  };

  try {
    logStep('MasterAgent', 'Started orchestration', { input });

    // 1. Customer Data
    const rawData = await customerDataAgent(input);
    logStep('CustomerDataAgent', 'Collected raw data', rawData);

    // 2. Report Generation
    const report = await reportAgent(rawData);
    logStep('ReportAgent', 'Generated diagnostic report', report);

    // 3. Diagnosis
    const diagnosis = await diagnosisAgent(report);
    logStep('DiagnosisAgent', 'Performed diagnosis', diagnosis);

    // 4. History Correlation
    const history = await historyAgent(input.vehicleId, diagnosis);
    logStep('HistoryAgent', 'Correlated with history', history);

    // 5. Notification
    const notification = await notificationAgent(diagnosis, history);
    logStep('NotificationAgent', 'Generated customer notification', notification);

    logStep('MasterAgent', 'Orchestration complete', { success: true });

    return {
      caseId,
      status: 'Resolved',
      steps,
      finalResult: {
        report,
        diagnosis,
        history,
        notification
      }
    };

  } catch (error) {
    console.error('MasterAgent Error:', error);
    logStep('MasterAgent', 'Error during orchestration', { error: String(error) });
    return {
      caseId,
      status: 'Resolved', // or Error
      steps
    };
  }
};

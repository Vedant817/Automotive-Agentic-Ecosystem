"use client";

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusCard } from '@/components/StatusCard';
import { AgentTimeline } from '@/components/AgentTimeline';
import { Activity, AlertTriangle, CheckCircle, Clock, Search, Filter, Calendar } from 'lucide-react';
import { AgentStep } from '@/agents/masterAgent';
import { Appointment } from '@/mockData/appointments';

// Helper to generate mock details for any case ID
const getCaseDetails = (caseId: string) => {
  const baseTime = Date.now();
  
  // Specific data for our main demo case
  if (caseId === 'CASE-101') {
    return {
      title: 'Cooling System Failure',
      vehicle: 'Tesla Model 3 2022',
      status: 'Analysis Complete',
      timeline: [
        { agentName: 'MasterAgent', action: 'Received new case ticket', timestamp: new Date(baseTime - 600000).toISOString(), data: { ticketId: 'TKT-888', source: 'CustomerApp' } },
        { agentName: 'CustomerDataAgent', action: 'Structured raw complaint data', timestamp: new Date(baseTime - 550000).toISOString(), data: { symptoms: ['Overheating', 'Loud Fan Noise'], vehicle: 'Tesla Model 3 2022' } },
        { agentName: 'ReportAgent', action: 'Identified critical system', timestamp: new Date(baseTime - 500000).toISOString(), data: { system: 'Cooling', urgency: 'High' } },
        { agentName: 'DiagnosisAgent', action: 'Matched symptoms to fault rules', timestamp: new Date(baseTime - 450000).toISOString(), data: { probableIssue: 'Coolant Pump Failure', confidence: 0.92 } },
        { agentName: 'HistoryAgent', action: 'Detected Batch Pattern', timestamp: new Date(baseTime - 400000).toISOString(), data: { match: 'Batch-X', insight: 'Multiple pump failures recorded for 2022 Model 3s.', recommendation: 'Flag for potential recall analysis' } },
        { agentName: 'NotificationAgent', action: 'Sent urgent appointment request', timestamp: new Date(baseTime - 350000).toISOString(), data: { priority: 'Immediate', message: 'Stop vehicle safely if temp rises.' } }
      ],
      recommendation: {
        text: 'Based on the History Correlation Agent findings, this vehicle belongs to Batch-X which has a known defect rate of 15% for coolant pumps.',
        action: 'Next Action: Pre-order Coolant Pump Part #CP-2022-X and schedule Level 2 diagnostics.'
      }
    };
  }

  // Generic generator for other cases
  return {
    title: `Diagnostic Analysis for ${caseId}`,
    vehicle: 'Vehicle Info Loading...',
    status: 'In Progress',
    timeline: [
        { agentName: 'MasterAgent', action: 'Initialized case workflow', timestamp: new Date(baseTime - 300000).toISOString(), data: { caseId } },
        { agentName: 'CustomerDataAgent', action: 'Pulling telemetry logs', timestamp: new Date(baseTime - 250000).toISOString(), data: { logs: '34MB downloaded' } },
        { agentName: 'DiagnosisAgent', action: 'Running heuristic models', timestamp: new Date(baseTime - 200000).toISOString(), data: { models: ['Vibration', 'Thermal', 'Electrical'] } },
    ],
    recommendation: {
        text: 'Automated analysis is currently in progress. Preliminary results suggest a non-critical sensor calibration issue.',
        action: 'Next Action: Wait for full diagnostic report (ETA: 2 mins).'
    }
  };
};

export default function CompanyDashboard() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('CASE-101');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch appointments on load
  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error(err));
  }, []);

  // Mock Active Cases - Expanded
  const cases = [
    { id: 'CASE-101', vehicleId: 'VN12345', issue: 'Cooling System Failure', status: 'Analysis Complete', risk: 'High', time: '10 mins ago' },
    { id: 'CASE-102', vehicleId: 'VN67890', issue: 'Tire Pressure Warning', status: 'Pending Review', risk: 'Low', time: '25 mins ago' },
    { id: 'CASE-103', vehicleId: 'VN55555', issue: 'Battery Degradation', status: 'In Progress', risk: 'Medium', time: '1 hour ago' },
    { id: 'CASE-104', vehicleId: 'VN99901', issue: 'Brake Pad Wear', status: 'Waiting for Parts', risk: 'Medium', time: '2 hours ago' },
    { id: 'CASE-105', vehicleId: 'VN88123', issue: 'Software Update Stuck', status: 'Resolved', risk: 'Low', time: 'Yesterday' },
    { id: 'CASE-106', vehicleId: 'VN77234', issue: 'Suspension Noise', status: 'In Progress', risk: 'Medium', time: 'Yesterday' },
  ];

  const selectedCaseData = selectedCaseId ? getCaseDetails(selectedCaseId) : null;

  return (
    <DashboardLayout type="company">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
           <div>
              <h1 className="text-2xl font-bold text-gray-800">Service Center Ops</h1>
              <p className="text-gray-500">Real-time Agent Orchestration View</p>
           </div>
           <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
               <Filter className="w-4 h-4" /> Filter
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
               <Activity className="w-4 h-4" /> Live Monitor
             </button>
           </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusCard title="Active Cases" value={cases.length.toString()} icon={Activity} color="orange" />
          <StatusCard title="Critical Risks" value="3" icon={AlertTriangle} color="red" subtitle="Requires immediate attention" />
          <StatusCard title="Avg Resolution" value="1.2m" icon={Clock} color="blue" />
          <StatusCard title="Today's Appts" value={appointments.length.toString()} icon={Calendar} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Left Column: Queue & Appointments */}
           <div className="space-y-6">
             {/* Case List */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-h-[400px] overflow-y-auto">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center sticky top-0">
                  <h3 className="font-bold text-gray-700">Incoming Queue</h3>
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <div className="divide-y divide-gray-100">
                  {cases.map(c => (
                    <div 
                      key={c.id} 
                      onClick={() => setSelectedCaseId(c.id)}
                      className={`p-4 cursor-pointer hover:bg-orange-50 transition-colors ${selectedCaseId === c.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-800">{c.vehicleId}</span>
                        <span className="text-xs text-gray-400">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{c.issue}</p>
                      <div className="mt-2 flex gap-2">
                         <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                           c.risk === 'High' ? 'bg-red-100 text-red-700' : 
                           c.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                         }`}>
                           {c.risk} Risk
                         </span>
                         <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Upcoming Appointments */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-700">Upcoming Appointments</h3>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <div className="divide-y divide-gray-100">
                  {appointments.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-sm">No appointments scheduled</div>
                  ) : (
                    appointments.map(apt => (
                      <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-800">{apt.vehicleId}</span>
                          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{apt.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{apt.reason}</p>
                        <p className="text-xs text-gray-400 mt-1">{apt.date}</p>
                      </div>
                    ))
                  )}
                </div>
             </div>
           </div>

           {/* Detail View / Agent Timeline */}
           <div className="lg:col-span-2 space-y-6">
              {selectedCaseData ? (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex justify-between items-center mb-6">
                     <div>
                       <h2 className="text-xl font-bold text-gray-800">{selectedCaseData.title}</h2>
                       <p className="text-sm text-gray-500">Case ID: {selectedCaseId} • {selectedCaseData.vehicle}</p>
                     </div>
                     <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                       {selectedCaseData.status}
                     </span>
                   </div>
                   
                   <AgentTimeline steps={selectedCaseData.timeline as AgentStep[]} />

                   <div className="mt-6 pt-6 border-t border-gray-100">
                     <h4 className="font-bold text-gray-800 mb-2">Technician Recommendation</h4>
                     <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                       <p className="font-medium">{selectedCaseData.recommendation.text}</p>
                       <p className="mt-2 text-gray-600 font-bold">{selectedCaseData.recommendation.action}</p>
                     </div>
                   </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center text-gray-400">
                   <p>Select a case to view agent details.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

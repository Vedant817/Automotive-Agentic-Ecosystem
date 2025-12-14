"use client";

import React from 'react';
import { AgentStep } from '@/agents/masterAgent';
import { Bot, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface AgentTimelineProps {
  steps: AgentStep[];
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({ steps }) => {
  if (steps.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-500">
        Waiting for agent activity...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Bot className="w-5 h-5 text-purple-600" />
        Agent Activity Log
      </h3>
      <div className="relative border-l-2 border-purple-200 ml-3 space-y-6 pl-6 py-2">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <span className="absolute -left-[33px] top-1 h-6 w-6 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-purple-600"></span>
            </span>
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {step.agentName}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(step.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-700 font-medium text-sm">{step.action}</p>
              {step.data && (
                <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono text-gray-600 overflow-x-auto max-h-32 border border-gray-200">
                  <pre>{JSON.stringify(step.data, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusCard } from '@/components/StatusCard';
import { AgentTimeline } from '@/components/AgentTimeline';
import { Car, AlertCircle, Calendar, ShieldCheck, Activity, Wifi, CheckCircle2 } from 'lucide-react';
import { vehicles } from '@/mockData/vehicles';
import { AgentStep } from '@/agents/masterAgent';

export default function CustomerDashboard() {
  const vehicle = vehicles[0]; 
  const [monitoringState, setMonitoringState] = useState<'Initializing' | 'Scanning' | 'Analysis' | 'Complete' | 'Monitoring'>('Initializing');
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [result, setResult] = useState<any>(null);
  const [appointmentStatus, setAppointmentStatus] = useState<'idle' | 'booking' | 'booked'>('idle');

  // Ref to track if we are currently running a cycle to prevent overlaps
  const isRunningRef = useRef(false);

  // Helper to add steps locally
  const addLocalStep = (name: string, action: string, data: any) => {
    setSteps(prev => {
      // Keep only last 10 steps to prevent overflow in continuous mode
      const newSteps = [...prev, {
        agentName: name,
        action,
        timestamp: new Date().toISOString(),
        data
      }];
      return newSteps.slice(-10);
    });
  };

  const runMonitoringCycle = async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    try {
      // Phase 1: Scan
      setMonitoringState('Scanning');
      // addLocalStep('SystemMonitor', 'Routine telemetry scan started...', { systems: 'All' });
      await new Promise(r => setTimeout(r, 2000));

      // Phase 2: Analysis (Mock detection every time for demo purposes, or could be random)
      setMonitoringState('Analysis');
      
      // Call API
      const res = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          symptoms: ['Engine Overheating', 'Strange Noise'], 
          complaint: 'Automated Telemetry Stream'
        })
      });
      
      const data = await res.json();
      
      // Update result with latest data
      setResult(data.finalResult);
      
      // Add a summary step instead of all server steps to keep timeline clean
      addLocalStep('MasterAgent', 'Cycle complete. Issues validated.', { 
        diagnosis: data.finalResult.diagnosis.probableIssue,
        confidence: data.finalResult.diagnosis.confidence 
      });

      setMonitoringState('Complete');
      
    } catch (err) {
      console.error(err);
      addLocalStep('SystemMonitor', 'Connection lost', { error: String(err) });
    } finally {
      isRunningRef.current = false;
      // Schedule next run
      setTimeout(() => {
        setMonitoringState('Monitoring');
        runMonitoringCycle();
      }, 10000); // Run every 10 seconds
    }
  };

  // Initial Start
  useEffect(() => {
    addLocalStep('SystemMonitor', 'Initializing continuous monitoring agent...', { connection: 'Secure' });
    runMonitoringCycle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmAppointment = async () => {
    if (!result) return;
    setAppointmentStatus('booking');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
          time: '10:00 AM',
          reason: result.diagnosis.probableIssue
        })
      });

      if (res.ok) {
        setAppointmentStatus('booked');
        addLocalStep('SchedulingAgent', 'Appointment confirmed by user', { status: 'Confirmed' });
      }
    } catch (err) {
      console.error(err);
      setAppointmentStatus('idle');
    }
  };

  return (
    <DashboardLayout type="customer">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Vehicle Dashboard</h1>
            <p className="text-gray-500">Welcome back, {vehicle.ownerName}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm transition-all">
             <div className={`w-3 h-3 rounded-full ${monitoringState === 'Scanning' ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`}></div>
             <span className="text-sm font-medium text-gray-600">
               {monitoringState === 'Scanning' ? 'Scanning Vehicle...' : 
                monitoringState === 'Analysis' ? 'Analyzing Telemetry...' :
                'Monitoring Active'}
             </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusCard 
            title="Vehicle Status" 
            value={result ? "Attention Needed" : "Scanning..."} 
            icon={result ? AlertCircle : Activity} 
            color={result ? "red" : "blue"} 
          />
          <StatusCard 
            title="Telemetry Link" 
            value="Connected" 
            icon={Wifi} 
            color="green" 
            subtitle="Live Stream"
          />
          <StatusCard 
            title="Next Service" 
            value="Oct 12, 2025" 
            icon={Calendar} 
            color="orange" 
            subtitle="Estimated"
          />
          <StatusCard 
            title="Agent Status" 
            value="Continuous" 
            icon={ShieldCheck} 
            color="purple"
            subtitle="Auto-Pilot"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Result & Manual Override */}
          <div className="space-y-6">
            
            {/* Live Status View */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
               {monitoringState === 'Scanning' && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-100">
                   <div className="h-full bg-blue-500 animate-progress"></div>
                 </div>
               )}
               
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-blue-600" />
                   Live Diagnostics
                 </h2>
                 {monitoringState === 'Analysis' && <span className="text-xs text-blue-600 font-medium animate-pulse">Updating...</span>}
               </div>

               {!result && (
                 <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="relative">
                       <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                         <Car className="w-6 h-6 text-blue-400" />
                       </div>
                    </div>
                    <p className="text-gray-500 font-medium">Establishing baseline...</p>
                 </div>
               )}

               {result && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100 flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                      <div>
                        <h3 className="font-bold text-red-800">Issue Detected</h3>
                        <p className="text-red-700 text-sm mt-1">{result.diagnosis.probableIssue}</p>
                        <p className="text-xs text-red-500 mt-1">Confidence: {(result.diagnosis.confidence * 100).toFixed(0)}%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Analysis Summary</p>
                      <p className="text-sm text-gray-700">{result.diagnosis.reasoning}</p>
                    </div>

                    {result.notification.appointmentSuggested && (
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 transition-all">
                         <p className="text-sm font-bold text-orange-800 mb-1">Agent Recommendation</p>
                         <p className="text-sm text-orange-700 mb-3">{result.notification.message}</p>
                         
                         {appointmentStatus === 'idle' && (
                           <button 
                             onClick={handleConfirmAppointment}
                             className="w-full py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                           >
                             <Calendar className="w-4 h-4" />
                             Schedule Service Visit
                           </button>
                         )}

                         {appointmentStatus === 'booking' && (
                           <button disabled className="w-full py-2 bg-orange-400 text-white rounded-lg font-medium cursor-wait">
                             Booking...
                           </button>
                         )}

                         {appointmentStatus === 'booked' && (
                           <button disabled className="w-full py-2 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                             <CheckCircle2 className="w-4 h-4" />
                             Appointment Confirmed
                           </button>
                         )}
                      </div>
                    )}
                 </div>
               )}
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-400 text-center">
                    System auto-refreshes every 10 seconds. Last update: {new Date().toLocaleTimeString()}
                </p>
            </div>

          </div>

          {/* Right Column: Agent Timeline */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[600px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 shrink-0">
               <Activity className="w-5 h-5 text-purple-600" />
               Live Agent Activity
            </h3>
            <div className="overflow-y-auto flex-1 pr-2">
               <AgentTimeline steps={steps} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

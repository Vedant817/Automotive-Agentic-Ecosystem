"use client";

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { serviceHistory, ServiceRecord } from '@/mockData/serviceHistory';
import { vehicles } from '@/mockData/vehicles';
import { FileText, Calendar, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ServiceHistoryPage() {
  const vehicle = vehicles[0]; // Mock current user
  const history = serviceHistory.filter(r => r.vehicleId === vehicle.id);

  const getIcon = (type: ServiceRecord['type']) => {
    switch (type) {
      case 'Maintenance': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'Repair': return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'Recall': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout type="customer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service History</h1>
          <p className="text-gray-500">Maintenance records for {vehicle.model} ({vehicle.vin})</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {history.length === 0 ? (
             <div className="p-8 text-center text-gray-500">No service history available.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      {getIcon(record.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{record.description}</h3>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {record.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                         <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                           record.type === 'Maintenance' ? 'bg-green-100 text-green-700' :
                           record.type === 'Recall' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                         }`}>
                           {record.type}
                         </span>
                         {record.batchId && (
                           <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono">
                             {record.batchId}
                           </span>
                         )}
                      </div>
                      {record.technicianNotes && (
                        <div className="mt-3 bg-gray-50 p-3 rounded text-sm text-gray-600 italic border border-gray-100">
                          "{record.technicianNotes}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

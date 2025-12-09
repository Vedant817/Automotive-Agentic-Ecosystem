"use client";

import { useStore } from "@/lib/store";
import TelemetryChart from "../ui/TelemetryChart";
import { Activity, Gauge, Thermometer, Zap } from "lucide-react";

export default function TelemetryPanel() {
  const telemetryData = useStore((state) => state.telemetryData);

  const metrics = [
    {
      label: "Temperature",
      value: telemetryData ? `${telemetryData.engine_temp_c}°C` : "N/A",
      icon: Thermometer,
      color: "text-red-400",
    },
    { 
      label: "RPM", 
      value: telemetryData ? `${telemetryData.rpm}` : "N/A", 
      icon: Gauge, 
      color: "text-blue-400" 
    },
    { 
      label: "Speed", 
      value: telemetryData ? `${telemetryData.speed_kmh} km/h` : "N/A", 
      icon: Activity, 
      color: "text-green-400" 
    },
    { 
      label: "Battery", 
      value: telemetryData ? `${telemetryData.battery_voltage}V` : "N/A", 
      icon: Zap, 
      color: "text-yellow-400" 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Telematics Stream</h1>
        <p className="mt-2 text-slate-400">
          Real-time vehicle sensor data and diagnostics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {metric.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <TelemetryChart />

      {/* Anomalies */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Detected Anomalies
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-red-800 bg-red-900/20 p-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-red-500"></div>
            <div>
              <p className="font-medium text-white">High Engine Temperature</p>
              <p className="text-sm text-slate-400">
                Engine temperature exceeds safe operating range
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-yellow-800 bg-yellow-900/20 p-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500"></div>
            <div>
              <p className="font-medium text-white">Low Fuel Level</p>
              <p className="text-sm text-slate-400">
                Fuel level below 25% capacity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

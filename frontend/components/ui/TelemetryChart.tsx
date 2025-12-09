"use client";

import { useStore } from "@/lib/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TelemetryChart() {
  const telemetryData = useStore((state) => state.telemetryData);

  // Mock data for demonstration
  const chartData = [
    { time: "00:00", temp: 85, rpm: 2000, speed: 60 },
    { time: "01:00", temp: 88, rpm: 2200, speed: 65 },
    { time: "02:00", temp: 92, rpm: 2500, speed: 70 },
    { time: "03:00", temp: 95, rpm: 2800, speed: 75 },
    { time: "04:00", temp: 98, rpm: 3000, speed: 80 },
    { time: "05:00", temp: 102, rpm: 3200, speed: 85 },
  ];

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Telemetry Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#f1f5f9" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#ef4444"
            name="Temperature (°C)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="rpm"
            stroke="#3b82f6"
            name="RPM"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#10b981"
            name="Speed (km/h)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

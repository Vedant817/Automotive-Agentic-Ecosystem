"use client";

import { useStore } from "@/lib/store";
import { Lightbulb, AlertTriangle, Info, AlertCircle } from "lucide-react";

export default function InsightsPanel() {
  const insights = useStore((state) => state.insights);

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 3600000);
  const twoHoursAgo = new Date(now.getTime() - 7200000);

  const mockInsights = [
    {
      id: "1",
      vehicleId: "VN12345",
      title: "Engine Overheating Detected",
      description:
        "Engine temperature has exceeded safe operating range. Recommend immediate service inspection.",
      severity: "critical" as const,
      timestamp: now.toISOString(),
      source: "Diagnosis Agent",
    },
    {
      id: "2",
      vehicleId: "VN12345",
      title: "Scheduled Maintenance Due",
      description:
        "Your vehicle is due for its 50,000 km service. Schedule an appointment with your service center.",
      severity: "warning" as const,
      timestamp: oneHourAgo.toISOString(),
      source: "Insights Agent",
    },
    {
      id: "3",
      vehicleId: "VN67890",
      title: "Fuel Efficiency Improved",
      description:
        "Recent driving patterns show 12% improvement in fuel efficiency compared to last month.",
      severity: "info" as const,
      timestamp: twoHoursAgo.toISOString(),
      source: "Analytics Agent",
    },
  ];

  const displayInsights = insights?.length > 0 ? insights : mockInsights;

  const getIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-800 bg-red-900/20";
      case "warning":
        return "border-yellow-800 bg-yellow-900/20";
      default:
        return "border-blue-800 bg-blue-900/20";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Manufacturing Insights</h1>
        <p className="mt-2 text-slate-400">
          AI-generated insights from your vehicle data and diagnostics
        </p>
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        {displayInsights.map((insight) => (
          <div
            key={insight.id}
            className={`rounded-lg border p-6 ${getSeverityColor(
              insight.severity
            )}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getIcon(insight.severity)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {insight.title}
                    </h3>
                    <p className="mt-2 text-slate-300">
                      {insight.description}
                    </p>
                  </div>
                  <span
                    className={`ml-2 inline-block rounded px-3 py-1 text-xs font-medium ${
                      insight.severity === "critical"
                        ? "bg-red-900 text-red-200"
                        : insight.severity === "warning"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-blue-900 text-blue-200"
                    }`}
                  >
                    {insight.severity.charAt(0).toUpperCase() +
                      insight.severity.slice(1)}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>Vehicle: {insight.vehicleId}</span>
                  <span>Source: {insight.source}</span>
                  <span>
                    {new Date(insight.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-white">
            Recommended Actions
          </h2>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            <span>Schedule immediate service for engine overheating issue</span>
          </li>
          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            <span>Book 50,000 km maintenance appointment</span>
          </li>
          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            <span>Continue current driving patterns for optimal fuel efficiency</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

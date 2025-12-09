"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: "blue" | "green" | "yellow" | "red";
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-900/20 text-blue-400 border-blue-800",
    green: "bg-green-900/20 text-green-400 border-green-800",
    yellow: "bg-yellow-900/20 text-yellow-400 border-yellow-800",
    red: "bg-red-900/20 text-red-400 border-red-800",
  };

  return (
    <div
      className={clsx(
        "rounded-lg border p-6",
        colorClasses[color]
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
}

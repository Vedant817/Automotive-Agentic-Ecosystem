/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import { useStore } from "@/lib/store";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const initializeStore = useStore((state) => state.initialize);

  useEffect(() => {
    initializeStore();
    setIsLoading(false);
  }, [initializeStore]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>
          </div>
          <p className="text-slate-400">Loading Automotive Agentic Ecosystem...</p>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

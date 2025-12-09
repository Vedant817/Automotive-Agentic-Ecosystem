"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { checkHealth } from "@/lib/api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const setIsConnected = useStore((state) => state.setIsConnected);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await checkHealth();
        setIsConnected(true);
      } catch {
        setIsConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, [setIsConnected]);

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}

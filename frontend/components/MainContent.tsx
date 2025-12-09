"use client";
import ChatPanel from "./panels/ChatPanel";
import AppointmentsPanel from "./panels/AppointmentsPanel";
import InsightsPanel from "./panels/InsightsPanel";
import VehiclesPanel from "./panels/VehiclesPanel";
import DashboardPanel from "./panels/DashboardPanel";

interface MainContentProps {
  activeTab: string;
}

export default function MainContent({ activeTab }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto bg-slate-950">
      <div className="p-6">
        {activeTab === "dashboard" && <DashboardPanel />}
        {activeTab === "vehicles" && <VehiclesPanel />}
        {activeTab === "chat" && <ChatPanel />}
        {activeTab === "appointments" && <AppointmentsPanel />}
        {activeTab === "insights" && <InsightsPanel />}
      </div>
    </main>
  );
}

"use client";
import { Menu} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 h-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">
              Automotive Agentic Ecosystem
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

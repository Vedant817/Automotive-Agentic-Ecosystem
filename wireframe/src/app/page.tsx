import Link from 'next/link';
import { Car, Building2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Agentic Automotive
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the future of service orchestration. A multi-agent system coordinating vehicle diagnostics, history correlation, and customer engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Customer Portal Card */}
          <Link 
            href="/customer/dashboard"
            className="group relative overflow-hidden bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-2xl p-8 transition-all hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Car className="w-32 h-32" />
            </div>
            <div className="flex flex-col items-start text-left space-y-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Car className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Customer Portal</h2>
                <p className="text-gray-400 text-sm">
                  Report issues, view vehicle health, and receive agent-driven diagnostic insights in real-time.
                </p>
              </div>
              <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Enter Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Company Portal Card */}
          <Link 
            href="/company/dashboard"
            className="group relative overflow-hidden bg-gray-800 border border-gray-700 hover:border-orange-500 rounded-2xl p-8 transition-all hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Building2 className="w-32 h-32" />
            </div>
            <div className="flex flex-col items-start text-left space-y-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Building2 className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Service Center Ops</h2>
                <p className="text-gray-400 text-sm">
                  Monitor the Master Agent orchestrator, visualize decision trees, and manage high-risk cases.
                </p>
              </div>
              <div className="flex items-center text-orange-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Enter Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        </div>
        
        <div className="pt-12">
           <p className="text-xs text-gray-600 font-mono">
             Powered by Next.js 14 • Tailwind CSS • TypeScript • No-DB Architecture
           </p>
        </div>
      </div>
    </main>
  );
}
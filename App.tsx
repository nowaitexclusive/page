
import React, { useState } from 'react';
import CampaignWizard from './views/CampaignWizard';
import { ClientData, PipelineStage, SendingStatus } from './types';
import { Zap } from 'lucide-react';

function App() {
  const [clients, setClients] = useState<ClientData[]>([]);
  
  // Handlers for global state
  const handleDataLoaded = (newClients: ClientData[]) => {
    setClients(prev => {
        const uniqueNew = newClients.filter(n => !prev.some(p => p.phone === n.phone));
        return [...prev, ...uniqueNew];
    });
  };

  const updateClientStatus = (id: string, status: SendingStatus, stage?: PipelineStage, error?: string) => {
    setClients(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          errorMessage: error,
          pipelineStage: stage || c.pipelineStage,
          lastInteractionAt: new Date().toISOString()
        };
      }
      return c;
    }));
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden text-zinc-200 font-sans selection:bg-emerald-500/20 selection:text-emerald-200 bg-[#09090b]">
      
      {/* Background Ambient Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]"></div>
      </div>

      {/* TOP BAR / HEADER */}
      <header className="h-16 flex items-center px-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-md z-50 shrink-0 justify-between">
        <div className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap size={18} className="text-white fill-white/20" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Lovable
            </h1>
            <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase text-left">Growth Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            System Online
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10 shadow-lg"></div>
        </div>
      </header>

      {/* Main Content Area - Single View Mode */}
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 overflow-hidden relative z-10 bg-black/20 w-full">
            <CampaignWizard 
              clients={clients}
              onImport={(data) => handleDataLoaded(data)}
              onUpdateStatus={updateClientStatus}
              onComplete={() => {}} 
            />
        </main>
      </div>
    </div>
  );
}

export default App;

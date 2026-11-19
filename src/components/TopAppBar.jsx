import React from 'react';
import { ShieldCheck, Sparkles, Wrench, MessageSquareText } from 'lucide-react';
import { useHaptic } from '../hooks/useHaptic';

export default function TopAppBar({ onOpenHardwareTest, onOpenAssistant, healthScore }) {
  const haptic = useHaptic();

  const getStatusColor = (score) => {
    if (score >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 65) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <header className="sticky top-0 z-30 bg-device-bg/85 backdrop-blur-md border-b border-device-border/60 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight text-white">Device Care</h1>
              <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" /> AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Resource & Performance</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Hardware Diagnostics Button */}
          <button
            onClick={() => {
              haptic.light();
              onOpenHardwareTest();
            }}
            title="Hardware Diagnostics"
            className="p-2 rounded-xl bg-device-surface hover:bg-device-card border border-device-border/80 text-slate-300 active:scale-95 transition"
          >
            <Wrench className="w-4 h-4 text-cyan-400" />
          </button>

          {/* AI Advisor Chat Button */}
          <button
            onClick={() => {
              haptic.light();
              onOpenAssistant();
            }}
            title="AI Health Assistant"
            className="p-2 rounded-xl bg-device-surface hover:bg-device-card border border-device-border/80 text-slate-300 active:scale-95 transition relative"
          >
            <MessageSquareText className="w-4 h-4 text-indigo-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
          </button>
        </div>
      </div>
    </header>
  );
}

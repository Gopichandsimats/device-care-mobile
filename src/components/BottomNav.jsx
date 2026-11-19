import React from 'react';
import { LayoutDashboard, BatteryCharging, HardDrive, Cpu, BrainCircuit } from 'lucide-react';
import { useHaptic } from '../hooks/useHaptic';

export default function BottomNav({ activeTab, onSelectTab }) {
  const haptic = useHaptic();

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'battery', label: 'Battery', icon: BatteryCharging },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'memory', label: 'Memory', icon: Cpu },
    { id: 'ai_lab', label: 'AI Intel', icon: BrainCircuit, badge: 'ML' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-device-surface/90 backdrop-blur-lg border-t border-device-border/70 safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                haptic.light();
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-cyan-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              {tab.badge && (
                <span className="absolute -top-1 right-2 text-[9px] font-bold px-1 rounded bg-indigo-500 text-white shadow-sm">
                  {tab.badge}
                </span>
              )}
              <div className={`p-1 rounded-xl transition ${isActive ? 'bg-cyan-500/15 text-cyan-400' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-0.5 shadow-sm shadow-cyan-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

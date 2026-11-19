import React, { useState, useEffect } from 'react';
import TopAppBar from './components/TopAppBar';
import BottomNav from './components/BottomNav';
import OptimizeModal from './components/OptimizeModal';
import HardwareTestModal from './components/HardwareTestModal';
import AIAssistantSheet from './components/AIAssistantSheet';

import DashboardScreen from './screens/DashboardScreen';
import BatteryScreen from './screens/BatteryScreen';
import StorageScreen from './screens/StorageScreen';
import MemoryScreen from './screens/MemoryScreen';
import AIDiagnosticsScreen from './screens/AIDiagnosticsScreen';

import { useDeviceTelemetry } from './hooks/useDeviceTelemetry';
import { Download, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOptimizeOpen, setIsOptimizeOpen] = useState(false);
  const [isHardwareTestOpen, setIsHardwareTestOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const {
    telemetry,
    aiPrediction,
    optimizeDevice,
    boostRam,
    cleanJunkStorage,
    setPowerMode,
    updateFeature
  } = useDeviceTelemetry();

  // Capture PWA beforeinstallprompt event for 1-click home screen install
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        setInstallPrompt(null);
        setShowInstallBanner(false);
      });
    }
  };

  return (
    <div className="min-h-screen bg-device-bg text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30">
      {/* Top Header */}
      <TopAppBar
        onOpenHardwareTest={() => setIsHardwareTestOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        healthScore={aiPrediction.predictedHealthScore}
      />

      {/* PWA Home Screen Install Banner */}
      {showInstallBanner && (
        <div className="bg-gradient-to-r from-indigo-900 to-cyan-950 px-4 py-2 border-b border-indigo-500/40 flex items-center justify-between text-xs max-w-md mx-auto w-full">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span className="font-medium text-slate-200">Install as Full Mobile App</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-2.5 py-1 rounded-lg bg-cyan-500 text-white font-bold text-[10px] active:scale-95 transition"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Screen Router */}
      <main className="flex-1 w-full overflow-y-auto">
        {activeTab === 'dashboard' && (
          <DashboardScreen
            telemetry={telemetry}
            aiPrediction={aiPrediction}
            onOpenOptimize={() => setIsOptimizeOpen(true)}
            onNavigateTab={setActiveTab}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        )}

        {activeTab === 'battery' && (
          <BatteryScreen
            telemetry={telemetry}
            aiPrediction={aiPrediction}
            setPowerMode={setPowerMode}
          />
        )}

        {activeTab === 'storage' && (
          <StorageScreen
            telemetry={telemetry}
            cleanJunkStorage={cleanJunkStorage}
          />
        )}

        {activeTab === 'memory' && (
          <MemoryScreen
            telemetry={telemetry}
            boostRam={boostRam}
          />
        )}

        {activeTab === 'ai_lab' && (
          <AIDiagnosticsScreen
            telemetry={telemetry}
            aiPrediction={aiPrediction}
            updateFeature={updateFeature}
          />
        )}
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Modals & Bottom Sheets */}
      <OptimizeModal
        isOpen={isOptimizeOpen}
        onClose={() => setIsOptimizeOpen(false)}
        onOptimizeComplete={optimizeDevice}
      />

      <HardwareTestModal
        isOpen={isHardwareTestOpen}
        onClose={() => setIsHardwareTestOpen(false)}
        telemetry={telemetry}
      />

      <AIAssistantSheet
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        telemetry={telemetry}
        aiPrediction={aiPrediction}
        onQuickOptimize={() => setIsOptimizeOpen(true)}
      />
    </div>
  );
}

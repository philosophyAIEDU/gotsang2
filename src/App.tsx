import React, { useState } from 'react';
import { AppProvider } from './store';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { RoutinePage } from './pages/RoutinePage';
import { InsightsPage } from './pages/InsightsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('routine');

  return (
    <div className="bg-stone-200 min-h-screen flex items-center justify-center">
      <AppProvider>
        <div className="w-full max-w-[430px] bg-[#FAFAF7] min-h-screen relative flex flex-col shadow-2xl mx-auto overflow-hidden">
          <Header />
          
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'routine' && <RoutinePage />}
            {activeTab === 'insights' && <InsightsPage />}
            
            {(activeTab === 'journey' || activeTab === 'profile') && (
               <main className="flex-1 mt-24 px-4 flex flex-col items-center justify-center pb-32 h-full min-h-[60vh]">
                 <div className="text-stone-400 font-body flex flex-col items-center gap-4">
                   <span className="text-4xl text-stone-300">🚧</span>
                   <span>개발 중인 기능입니다.</span>
                 </div>
               </main>
            )}
          </div>
          
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </AppProvider>
    </div>
  );
}

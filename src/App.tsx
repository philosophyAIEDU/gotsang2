import React, { useState } from 'react';
import { AppProvider } from './store';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { RoutinePage } from './pages/RoutinePage';
import { InsightsPage } from './pages/InsightsPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('routine');

  return (
    <div className="bg-[#E2E8F0] min-h-screen flex items-center justify-center font-body">
      <AppProvider>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[430px] bg-background min-h-screen relative flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] mx-auto overflow-hidden sm:min-h-[90vh] sm:rounded-[40px] sm:my-8"
        >
          <Header />
          
          <div className="flex-1 overflow-y-auto scrollbar-hide pt-24">
            <AnimatePresence mode="wait">
              {activeTab === 'routine' && (
                <motion.div
                  key="routine"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoutinePage />
                </motion.div>
              )}
              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <InsightsPage />
                </motion.div>
              )}
              
              {(activeTab === 'journey' || activeTab === 'profile') && (
                <motion.main 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 px-4 flex flex-col items-center justify-center pb-32 h-full min-h-[60vh]"
                >
                  <div className="text-slate-400 font-body flex flex-col items-center gap-4">
                    <span className="text-4xl filter grayscale">🚧</span>
                    <span className="font-medium">개발 중인 기능입니다.</span>
                  </div>
                </motion.main>
              )}
            </AnimatePresence>
          </div>
          
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>
      </AppProvider>
    </div>
  );
}

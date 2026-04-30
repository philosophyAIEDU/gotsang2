import React, { useState } from 'react';
import { ProgressCard } from '../components/ProgressCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { RoutineList } from '../components/RoutineList';
import { FabAdd } from '../components/FabAdd';
import { RoutineModal } from '../components/RoutineModal';

export function RoutinePage() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main className="flex-1 mt-24 px-4 flex flex-col gap-8 scroll-smooth items-center w-full max-w-[430px] mx-auto pb-32">
      <div className="w-full flex flex-col gap-8 relative z-10 w-full overflow-visible">
        <ProgressCard />
        <CategoryFilter />
        <RoutineList />
      </div>
      <FabAdd onClick={() => setModalOpen(true)} />
      {modalOpen && <RoutineModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}

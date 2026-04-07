/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckSquare, FileText, Beaker } from 'lucide-react';
import { TasksView } from './views/TasksView';
import { TestingView } from './views/TestingView';
import { DocsView } from './views/DocsView';
import { cn } from './lib/utils';

type Tab = 'tasks' | 'testing' | 'docs';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen font-sans">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-slate-50 h-screen flex flex-col shadow-2xl relative overflow-hidden sm:rounded-3xl sm:h-[90vh] sm:my-auto sm:border sm:border-slate-200">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden bg-slate-50">
          {activeTab === 'tasks' && <TasksView />}
          {activeTab === 'testing' && <TestingView />}
          {activeTab === 'docs' && <DocsView />}
        </main>

        {/* Bottom Navigation - Glassmorphism */}
        <nav className="bg-white/80 backdrop-blur-md border-t border-slate-200/50 flex justify-around items-center pb-safe absolute bottom-0 w-full shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-10">
          <button
            onClick={() => setActiveTab('tasks')}
            className={cn(
              "flex flex-col items-center p-3 flex-1 transition-all duration-300 ease-in-out",
              activeTab === 'tasks' ? "text-indigo-600 scale-110" : "text-slate-400 hover:text-indigo-400"
            )}
          >
            <CheckSquare size={22} className="mb-1" strokeWidth={activeTab === 'tasks' ? 2.5 : 2} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Задачи</span>
          </button>
          
          <button
            onClick={() => setActiveTab('testing')}
            className={cn(
              "flex flex-col items-center p-3 flex-1 transition-all duration-300 ease-in-out",
              activeTab === 'testing' ? "text-indigo-600 scale-110" : "text-slate-400 hover:text-indigo-400"
            )}
          >
            <Beaker size={22} className="mb-1" strokeWidth={activeTab === 'testing' ? 2.5 : 2} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Тесты</span>
          </button>
          
          <button
            onClick={() => setActiveTab('docs')}
            className={cn(
              "flex flex-col items-center p-3 flex-1 transition-all duration-300 ease-in-out",
              activeTab === 'docs' ? "text-indigo-600 scale-110" : "text-slate-400 hover:text-indigo-400"
            )}
          >
            <FileText size={22} className="mb-1" strokeWidth={activeTab === 'docs' ? 2.5 : 2} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Доки</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

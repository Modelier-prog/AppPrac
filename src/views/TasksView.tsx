import React from 'react';
import { CheckCircle2, Circle, Trash2, Plus, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTodosViewModel } from '../viewmodels/useTodosViewModel';
import { cn } from '../lib/utils';

export const TasksView: React.FC = () => {
  const {
    todos,
    isLoading,
    error,
    newTaskTitle,
    setNewTaskTitle,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos
  } = useTodosViewModel();

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-5 shadow-lg flex justify-between items-center rounded-b-3xl mb-2 z-10 relative">
        <h1 className="text-2xl font-bold tracking-tight">Мои задачи</h1>
        <button onClick={refreshTodos} className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm" aria-label="Обновить">
          <RefreshCw size={20} className={cn(isLoading && "animate-spin")} />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Add Task Input */}
        <div className="flex gap-3 mb-6 relative">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Что нужно сделать?"
            className="flex-1 px-5 py-4 rounded-2xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700 placeholder:text-slate-400 transition-all"
          />
          <button
            onClick={addTodo}
            disabled={!newTaskTitle.trim()}
            className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Error State */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4 text-sm border border-red-100">
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && todos.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-3 pb-24">
          <AnimatePresence mode="popLayout">
            {todos.map(todo => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                key={todo.id}
                className={cn(
                  "group flex items-center justify-between p-4 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 transition-all",
                  todo.completed && "opacity-60 bg-slate-50/50 shadow-none"
                )}
              >
                <div className="flex items-center gap-4 flex-1 overflow-hidden cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                  <button
                    className={cn(
                      "transition-colors flex-shrink-0",
                      todo.completed ? "text-emerald-500" : "text-slate-300 group-hover:text-indigo-400"
                    )}
                  >
                    {todo.completed ? (
                      <CheckCircle2 size={26} strokeWidth={2.5} />
                    ) : (
                      <Circle size={26} strokeWidth={2.5} />
                    )}
                  </button>
                  <span
                    className={cn(
                      "text-slate-700 text-base font-medium truncate transition-all duration-300",
                      todo.completed && "line-through text-slate-400"
                    )}
                  >
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-300 hover:text-rose-500 p-2 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 sm:opacity-100"
                  aria-label="Удалить задачу"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {!isLoading && todos.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-slate-400 py-12 flex flex-col items-center gap-3">
              <CheckCircle2 size={48} className="text-slate-200" strokeWidth={1.5} />
              <p>Задач пока нет. Добавьте первую!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

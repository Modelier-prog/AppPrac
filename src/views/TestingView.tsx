import React from 'react';
import { TestResult } from '../models/types';
import { CheckCircle, XCircle, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const testResults: TestResult[] = [
  {
    id: 'TR-01',
    feature: 'Подключение к API (Задание 4)',
    expected: 'Приложение загружает 5-10 записей из JSONPlaceholder.',
    actual: 'Успешно загружено 7 записей при старте.',
    status: 'Pass',
    notes: 'Использован эндпоинт /todos?_limit=7'
  },
  {
    id: 'TR-02',
    feature: 'Добавление задачи (Задание 5)',
    expected: 'Пользователь может ввести текст и добавить задачу.',
    actual: 'Задача добавляется в начало списка с локальным ID.',
    status: 'Pass',
    notes: 'Поле ввода очищается после добавления.'
  },
  {
    id: 'TR-03',
    feature: 'Удаление задачи (Задание 5)',
    expected: 'Пользователь может нажать на иконку корзины для удаления.',
    actual: 'Задача мгновенно удаляется из состояния UI.',
    status: 'Pass',
    notes: 'Работает как для API-задач, так и для локальных.'
  },
  {
    id: 'TR-04',
    feature: 'Изменение статуса',
    expected: 'Нажатие на кружок меняет статус выполнения.',
    actual: 'UI обновляется: появляется галочка и зачеркивание.',
    status: 'Pass',
    notes: 'Визуальный отклик работает корректно.'
  },
  {
    id: 'TR-05',
    feature: 'Отображение данных',
    expected: 'Длинные названия задач корректно обрезаются.',
    actual: 'Длинные тексты обрезаются многоточием. Верстка не ломается.',
    status: 'Pass',
    notes: 'Протестировано с очень длинными строками.'
  }
];

export const TestingView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 shadow-lg flex items-center gap-3 rounded-b-3xl mb-2 z-10 relative">
        <ShieldCheck size={28} />
        <h1 className="text-2xl font-bold tracking-tight">Тестирование</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto pb-28">
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={result.id} 
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-800">{result.feature}</h3>
                  <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md mt-1 inline-block">{result.id}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  result.status === 'Pass' ? 'bg-emerald-50 text-emerald-600' : 
                  result.status === 'Fail' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {result.status === 'Pass' && <CheckCircle size={16} />}
                  {result.status === 'Fail' && <XCircle size={16} />}
                  {result.status === 'Pending' && <Clock size={16} />}
                  {result.status === 'Pass' ? 'Успешно' : result.status === 'Fail' ? 'Ошибка' : 'Ожидание'}
                </div>
              </div>
              
              <div className="space-y-2 text-sm mt-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold block mb-1">Ожидание</span>
                  <span className="text-slate-700">{result.expected}</span>
                </div>
                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-50">
                  <span className="text-indigo-400 text-xs uppercase tracking-wider font-semibold block mb-1">Фактически</span>
                  <span className="text-slate-700">{result.actual}</span>
                </div>
                {result.notes && (
                  <p className="text-xs text-slate-400 italic mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-slate-300 inline-block"></span>
                    {result.notes}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

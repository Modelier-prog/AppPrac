import React from 'react';
import { Mermaid } from '../components/Mermaid';
import { BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

const mvcDiagram = `
classDiagram
    class Представление {
        +render()
        +handleUserInput()
    }
    class МодельПредставления {
        +todos: Todo[]
        +fetchTodos()
        +addTodo()
        +deleteTodo()
    }
    class Модель {
        +id: number
        +title: string
        +completed: boolean
    }
    class REST_API {
        +GET /todos
    }
    
    Представление --> МодельПредставления : Привязка данных / Действия
    МодельПредставления --> Модель : Обновление / Чтение
    МодельПредставления --> REST_API : Запрос данных
`;

const dataFlowDiagram = `
sequenceDiagram
    participant Пользователь
    participant UI as Представление
    participant VM as МодельПредставления
    participant API as JSONPlaceholder API
    
    Пользователь->>UI: Открывает приложение
    UI->>VM: fetchTodos()
    VM->>API: GET /todos?_limit=7
    API-->>VM: Массив JSON
    VM-->>UI: Обновление состояния (todos)
    UI-->>Пользователь: Отображает список
    
    Пользователь->>UI: Вводит текст и жмет "+"
    UI->>VM: addTodo(title)
    VM-->>VM: Обновляет локальное состояние
    VM-->>UI: Обновление состояния (todos)
    UI-->>Пользователь: Отображает новую задачу
`;

export const DocsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-5 shadow-lg flex items-center gap-3 rounded-b-3xl mb-2 z-10 relative">
        <BookOpen size={28} />
        <h1 className="text-2xl font-bold tracking-tight">Документация</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto pb-28 space-y-6">
        
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-violet-100 text-violet-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Архитектура (MVVM)
          </h2>
          <p className="text-slate-600 mb-5 leading-relaxed">
            Приложение использует паттерн <strong>Model-View-ViewModel (MVVM)</strong>. В React это реализовано через кастомные хуки (ViewModel), которые отделяют бизнес-логику и управление состоянием от UI-компонентов (View).
          </p>
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 overflow-hidden">
            <Mermaid chart={mvcDiagram} />
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-violet-100 text-violet-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Потоки данных
          </h2>
          <p className="text-slate-600 mb-5 leading-relaxed">
            Данные текут в одном направлении. ViewModel запрашивает начальные данные из внешнего REST API и управляет локальным состоянием для последующих добавлений и удалений.
          </p>
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 overflow-hidden">
            <Mermaid chart={dataFlowDiagram} />
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-violet-100 text-violet-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
            Интеграция с API
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-2">
              <div className="bg-slate-100 px-2 py-1 rounded text-xs font-mono text-slate-500 mt-0.5">Эндпоинт</div>
              <code className="text-sm text-indigo-600 break-all">https://jsonplaceholder.typicode.com/todos</code>
            </li>
            <li className="flex items-center gap-2">
              <div className="bg-slate-100 px-2 py-1 rounded text-xs font-mono text-slate-500">Метод</div>
              <span className="font-semibold text-emerald-600">GET</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="bg-slate-100 px-2 py-1 rounded text-xs font-mono text-slate-500">Параметры</div>
              <code className="text-sm bg-slate-50 px-1 rounded">_limit=7</code>
            </li>
            <li className="text-sm mt-2 p-3 bg-indigo-50 rounded-xl text-indigo-800 border border-indigo-100">
              Используется для заполнения начального списка задач, демонстрируя получение внешних данных (Задание 4).
            </li>
          </ul>
        </motion.section>

      </div>
    </div>
  );
};

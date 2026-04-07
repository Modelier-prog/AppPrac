import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../models/types';

export function useTodosViewModel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  // Fetch initial data from REST API
  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=7');
      if (!response.ok) throw new Error('Не удалось загрузить задачи');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(() => {
    if (!newTaskTitle.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now(), // Generate a local ID
      title: newTaskTitle.trim(),
      completed: false,
      userId: 1,
    };

    setTodos(prev => [newTodo, ...prev]);
    setNewTaskTitle('');
  }, [newTaskTitle]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    isLoading,
    error,
    newTaskTitle,
    setNewTaskTitle,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos
  };
}

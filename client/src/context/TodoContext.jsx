import { createContext, useContext, useEffect, useState } from 'react';

// Create Context
export const TodoContext = createContext();

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Provider Component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Expose state and updater functions
  return (
    <TodoContext.Provider value={{ todos, setTodos, fetchTodos, loading,BASE_URL }}>
      {children}
    </TodoContext.Provider>
  );
};

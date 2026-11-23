import { createContext, useCallback, useContext, useState } from "react";
import { dummyTodos } from "../data/dummyTodos.js";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const addTodo = (data) => {
    setTodos((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return [...prev, { id: nextId, ...data }];
    });
    notify("Tugas baru berhasil ditambahkan.");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data, id } : t)));
    notify("Tugas berhasil diperbarui.");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    notify("Tugas berhasil dihapus.", "danger");
  };

  const getTodo = (id) => todos.find((t) => t.id === Number(id));

  return (
    <TodoContext.Provider
      value={{ todos, getTodo, addTodo, updateTodo, deleteTodo, toast, dismissToast }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos harus dipakai di dalam TodoProvider");
  return ctx;
}

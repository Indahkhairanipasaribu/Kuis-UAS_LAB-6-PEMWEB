import { Routes, Route } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage.jsx";
import TodoDetailPage from "./pages/TodoDetailPage.jsx";
import Toast from "./components/Toast.jsx";

export default function App() {
  return (
    <div className="relative z-1">
      <main className="mx-auto max-w-[980px] px-5 pt-9 pb-16">
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="*" element={<TodoListPage />} />
        </Routes>
      </main>
      <Toast />
    </div>
  );
}

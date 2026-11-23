import { useEffect } from "react";
import { useTodos } from "../context/TodoContext.jsx";

const TONE = {
  success: "bg-mint",
  danger: "bg-coral",
};

export default function Toast() {
  const { toast, dismissToast } = useTodos();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 3000);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-7 left-1/2 z-60 animate-rise rounded-full px-[22px] py-3 text-[0.9rem] font-extrabold text-white shadow-[0_12px_28px_rgba(74,44,70,0.3)] [transform:translateX(-50%)] ${TONE[toast.type] ?? ""}`}
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  );
}

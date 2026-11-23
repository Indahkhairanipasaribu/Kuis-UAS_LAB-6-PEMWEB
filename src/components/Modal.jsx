import { useEffect } from "react";

const SIZE = {
  md: "max-w-[460px]",
  sm: "max-w-[400px]",
};

export default function Modal({ title, onClose, children, size = "md" }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid animate-fade place-items-center bg-ink/50 p-4 backdrop-blur-[3px]"
      onMouseDown={onClose}
    >
      <div
        className={`max-h-[92vh] w-full animate-pop overflow-y-auto rounded-[26px] bg-white p-[26px] shadow-[0_24px_60px_rgba(74,44,70,0.35)] ${SIZE[size] ?? ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="mb-[18px] text-center text-[1.2rem] font-extrabold text-pink-shadow">{title}</h2>
        {children}
      </div>
    </div>
  );
}

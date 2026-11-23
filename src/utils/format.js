export const STATUS_OPTIONS = [
  { value: "to-do", label: "To-do" },
  { value: "in progress", label: "Sedang dikerjakan" },
  { value: "done", label: "Selesai" },
];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Rendah" },
  { value: "medium", label: "Sedang" },
  { value: "high", label: "Tinggi" },
];

export const statusLabel = (v) =>
  STATUS_OPTIONS.find((o) => o.value === v)?.label ?? v;

export const priorityLabel = (v) =>
  PRIORITY_OPTIONS.find((o) => o.value === v)?.label ?? v;

// "2026-10-11" -> "11 Okt 2026" (tanpa masalah zona waktu)
export function formatDeadline(iso) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

export function isOverdue(todo) {
  if (!todo.deadline || todo.status === "done") return false;
  const [y, m, d] = todo.deadline.split("-").map(Number);
  const end = new Date(y, m - 1, d, 23, 59, 59);
  return end < new Date();
}

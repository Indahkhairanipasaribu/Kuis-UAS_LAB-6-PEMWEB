import { priorityLabel, statusLabel } from "../utils/format.js";

const slug = (s) => s.replace(/\s+/g, "-");

const base =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.78rem] font-bold whitespace-nowrap before:size-[7px] before:rounded-full before:bg-current before:content-['']";

const STATUS_COLOR = {
  "to-do": "bg-[#ffe9a8] text-[#96640a]",
  "in-progress": "bg-[#e5d9ff] text-[#6a43c7]",
  done: "bg-[#bff2e0] text-[#0d7a5a]",
};

const PRIORITY_COLOR = {
  low: "bg-[#bff2e0] text-[#0d7a5a]",
  medium: "bg-[#ffe9a8] text-[#96640a]",
  high: "bg-[#ffd0dd] text-[#d6245f]",
};

export function StatusBadge({ value }) {
  return <span className={`${base} ${STATUS_COLOR[slug(value)] ?? ""}`}>{statusLabel(value)}</span>;
}

export function PriorityBadge({ value }) {
  return <span className={`${base} ${PRIORITY_COLOR[value] ?? ""}`}>{priorityLabel(value)}</span>;
}

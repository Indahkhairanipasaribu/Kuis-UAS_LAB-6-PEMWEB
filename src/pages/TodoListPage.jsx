import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoFormModal from "../components/TodoFormModal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { PriorityBadge, StatusBadge } from "../components/Badge.jsx";
import { EyeIcon, PlusIcon, TrashIcon } from "../components/Icons.jsx";
import { formatDeadline, isOverdue } from "../utils/format.js";

const STAT = "min-w-28 rounded-[18px] px-[18px] py-2.5 text-ink max-[680px]:min-w-0 max-[680px]:flex-1 max-[680px]:px-3";
const TH = "px-4 py-1.5 text-[0.74rem] font-bold tracking-[0.06em] text-muted uppercase";
const TD =
  "bg-blush px-4 py-[13px] text-[0.9rem] font-medium transition-colors duration-150 group-hover:bg-blush-2";
const TD_FIRST = "rounded-l-[18px] shadow-[inset_5px_0_0_var(--color-pink)]";
const TD_LAST = "rounded-r-[18px]";
const LATE =
  "ml-2 rounded-full bg-coral px-2 py-0.5 text-[0.68rem] font-extrabold text-white";
const ICON_BTN =
  "grid size-9 cursor-pointer place-items-center rounded-xl text-white transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5";

export default function TodoListPage() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const count = (s) => todos.filter((t) => t.status === s).length;

  return (
    <>
      <section className="relative mb-[22px] overflow-hidden rounded-[30px] bg-[linear-gradient(120deg,#ff5c9a_0%,#ff86b6_50%,#c49bff_100%)] px-8 pt-9 pb-[30px] text-white shadow-[0_18px_40px_rgba(255,92,154,0.3)] before:absolute before:-top-20 before:-right-[50px] before:size-[220px] before:rounded-full before:bg-white/16 before:content-[''] after:absolute after:right-[130px] after:-bottom-[60px] after:size-[120px] after:rounded-full after:bg-white/12 after:content-[''] max-[680px]:px-[22px] max-[680px]:pt-7 max-[680px]:pb-6">
        <h1 className="relative mb-1.5 text-[clamp(1.9rem,5vw,2.6rem)] font-extrabold tracking-[-0.02em]">Todo List</h1>
        <p className="relative mb-[22px] font-medium opacity-95">Catat pekerjaan sehari-harimu supaya hari terasa lebih ringan.</p>
        <div className="relative flex flex-wrap gap-3">
          <div className={`${STAT} bg-white`}>
            <strong className="block text-[1.5rem] leading-[1.1] font-extrabold">{todos.length}</strong>
            <span className="text-[0.78rem] font-bold opacity-80">Total tugas</span>
          </div>
          <div className={`${STAT} bg-[#ffe9a8]`}>
            <strong className="block text-[1.5rem] leading-[1.1] font-extrabold">{count("in progress")}</strong>
            <span className="text-[0.78rem] font-bold opacity-80">Dikerjakan</span>
          </div>
          <div className={`${STAT} bg-[#bff2e0]`}>
            <strong className="block text-[1.5rem] leading-[1.1] font-extrabold">{count("done")}</strong>
            <span className="text-[0.78rem] font-bold opacity-80">Selesai</span>
          </div>
        </div>
      </section>

      <section className="rounded-card bg-white p-6 shadow-card max-[680px]:p-[18px]">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[1.25rem] font-extrabold">Daftar Tugas</h2>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[14px] bg-pink px-5 py-2.5 text-[0.9rem] font-extrabold text-white shadow-[0_4px_0_var(--color-pink-shadow)] transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_var(--color-pink-shadow)]"
            onClick={() => setShowAdd(true)}
          >
            <PlusIcon /> Tambah Todo
          </button>
        </div>

        <div className="overflow-x-auto pb-1">
          <table className="w-full min-w-[660px] border-separate border-spacing-x-0 border-spacing-y-2">
            <thead>
              <tr>
                <th className={`${TH} text-left`}>Judul</th>
                <th className={`${TH} text-left`}>Status</th>
                <th className={`${TH} text-left`}>Prioritas</th>
                <th className={`${TH} text-left`}>Deadline</th>
                <th className={`${TH} w-[110px] text-center`}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 && (
                <tr className="group">
                  <td
                    colSpan={5}
                    className="rounded-[18px] bg-blush px-4 py-8 text-center text-[0.9rem] font-medium text-muted transition-colors duration-150 group-hover:bg-blush-2"
                  >
                    Belum ada tugas. Klik “Tambah Todo” untuk membuat tugas baru.
                  </td>
                </tr>
              )}
              {todos.map((todo) => (
                <tr key={todo.id} className="group">
                  <td className={`${TD} ${TD_FIRST} max-w-[260px]`} title={todo.title}>
                    <span className="block truncate font-bold">{todo.title}</span>
                  </td>
                  <td className={TD}>
                    <StatusBadge value={todo.status} />
                  </td>
                  <td className={TD}>
                    <PriorityBadge value={todo.priority} />
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>
                    {formatDeadline(todo.deadline)}
                    {isOverdue(todo) && <span className={LATE}>Terlambat</span>}
                  </td>
                  <td className={`${TD} ${TD_LAST} w-[110px] text-center`}>
                    <div className="flex justify-center gap-2">
                      <button
                        className={`${ICON_BTN} bg-sky shadow-[0_3px_0_var(--color-sky-shadow)]`}
                        aria-label={`Lihat detail ${todo.title}`}
                        title="Lihat detail"
                        onClick={() => navigate(`/todo/${todo.id}`)}
                      >
                        <EyeIcon />
                      </button>
                      <button
                        className={`${ICON_BTN} bg-coral shadow-[0_3px_0_var(--color-coral-shadow)]`}
                        aria-label={`Hapus ${todo.title}`}
                        title="Hapus"
                        onClick={() => setToDelete(todo)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showAdd && (
        <TodoFormModal
          mode="add"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            addTodo(data);
            setShowAdd(false);
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          todo={toDelete}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            deleteTodo(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </>
  );
}

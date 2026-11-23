import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoFormModal from "../components/TodoFormModal.jsx";
import { PriorityBadge, StatusBadge } from "../components/Badge.jsx";
import { ArrowLeftIcon, PencilIcon } from "../components/Icons.jsx";
import { formatDeadline, isOverdue } from "../utils/format.js";

const CARD =
  "relative mx-auto mt-7 max-w-[760px] overflow-hidden rounded-card bg-white px-[30px] pt-[34px] pb-7 shadow-card before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-[linear-gradient(90deg,#ff5c9a,#ffb86b,#9b72e6)] max-[680px]:p-[18px]";
const LABEL =
  "mt-4 mb-1.5 text-[0.74rem] font-extrabold tracking-[0.06em] text-muted uppercase first:mt-0";
const SIDE_P = "text-[0.92rem] font-semibold";
const LATE =
  "ml-2 rounded-full bg-coral px-2 py-0.5 text-[0.68rem] font-extrabold text-white";
const BTN =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[14px] px-5 py-2.5 text-[0.9rem] font-extrabold text-white transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5";
const BTN_PRIMARY =
  "bg-pink shadow-[0_4px_0_var(--color-pink-shadow)] active:shadow-[0_1px_0_var(--color-pink-shadow)]";
const BTN_SECONDARY =
  "bg-lilac shadow-[0_4px_0_var(--color-lilac-shadow)] active:shadow-[0_1px_0_var(--color-lilac-shadow)]";

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, updateTodo } = useTodos();
  const [showEdit, setShowEdit] = useState(false);
  const todo = getTodo(id);

  if (!todo) {
    return (
      <section className={`${CARD} text-center text-muted`}>
        <p className="my-4">Tugas tidak ditemukan. Mungkin sudah dihapus.</p>
        <button className={`${BTN} ${BTN_SECONDARY} mt-2.5`} onClick={() => navigate("/")}>
          Kembali
        </button>
      </section>
    );
  }

  return (
    <>
      <section className={CARD}>
        <div className="grid grid-cols-[1.6fr_1fr] gap-7 max-[680px]:grid-cols-1">
          <div>
            <h3 className={LABEL}>Judul</h3>
            <p className="text-[1.35rem] leading-[1.3] font-extrabold">{todo.title}</p>

            <h3 className={LABEL}>Deskripsi</h3>
            <div className="min-h-[120px] rounded-[18px] bg-blush px-4 py-3.5 text-[0.92rem] leading-[1.6] font-medium">
              {todo.description || <span className="text-muted">Tidak ada deskripsi.</span>}
            </div>
          </div>

          <div>
            <h3 className={LABEL}>Status</h3>
            <p className={SIDE_P}>
              <StatusBadge value={todo.status} />
            </p>
            <h3 className={LABEL}>Prioritas</h3>
            <p className={SIDE_P}>
              <PriorityBadge value={todo.priority} />
            </p>
            <h3 className={LABEL}>Deadline</h3>
            <p className={SIDE_P}>
              {formatDeadline(todo.deadline)}
              {isOverdue(todo) && <span className={LATE}>Terlambat</span>}
            </p>

            <div className="mt-[26px] flex gap-3">
              <button className={`${BTN} ${BTN_SECONDARY} flex-1`} onClick={() => navigate("/")}>
                <ArrowLeftIcon /> Kembali
              </button>
              <button className={`${BTN} ${BTN_PRIMARY} flex-1`} onClick={() => setShowEdit(true)}>
                <PencilIcon /> Perbarui
              </button>
            </div>
          </div>
        </div>
      </section>

      {showEdit && (
        <TodoFormModal
          mode="edit"
          initial={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            updateTodo(todo.id, data);
            setShowEdit(false);
          }}
        />
      )}
    </>
  );
}

import { useState } from "react";
import Modal from "./Modal.jsx";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/format.js";

const INPUT =
  "w-full rounded-[14px] border-2 border-blush-2 bg-white px-3 py-2.5 text-[0.9rem] font-medium text-ink focus:border-pink focus:shadow-[0_0_0_4px_rgba(255,92,154,0.15)] focus:outline-none";

const EMPTY = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

/**
 * Formulir untuk menambah (mode "add") atau memperbarui (mode "edit") tugas.
 * onSubmit menerima data { title, description, status, priority, deadline }.
 */
export default function TodoFormModal({ mode = "add", initial, onSubmit, onClose }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          status: initial.status,
          priority: initial.priority,
          deadline: initial.deadline,
        }
      : EMPTY
  );
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.title.trim()) next.title = "Judul wajib diisi.";
    if (!form.deadline) next.deadline = "Deadline wajib diisi.";
    if (Object.keys(next).length) return setErrors(next);
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <Modal title={isEdit ? "Perbarui Todo" : "Tambah Todo"} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <label className="mb-3.5 flex flex-1 flex-col gap-[5px]">
          <span className="text-[0.82rem] font-bold">Judul</span>
          <input
            className={INPUT}
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Contoh: Belajar React Router"
            autoFocus
          />
          {errors.title && <em className="text-[0.78rem] font-bold text-coral-shadow not-italic">{errors.title}</em>}
        </label>

        <label className="mb-3.5 flex flex-1 flex-col gap-[5px]">
          <span className="text-[0.82rem] font-bold">Deskripsi</span>
          <textarea
            className={`${INPUT} resize-y`}
            name="description"
            rows={3}
            value={form.description}
            onChange={change}
            placeholder="Tulis detail tugas di sini…"
          />
        </label>

        <div className="flex gap-3 max-[680px]:flex-col max-[680px]:gap-0">
          <label className="mb-3.5 flex flex-1 flex-col gap-[5px]">
            <span className="text-[0.82rem] font-bold">Status</span>
            <select className={INPUT} name="status" value={form.status} onChange={change}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-3.5 flex flex-1 flex-col gap-[5px]">
            <span className="text-[0.82rem] font-bold">Prioritas</span>
            <select className={INPUT} name="priority" value={form.priority} onChange={change}>
              {PRIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mb-3.5 flex flex-1 flex-col gap-[5px]">
          <span className="text-[0.82rem] font-bold">Deadline</span>
          <input className={INPUT} type="date" name="deadline" value={form.deadline} onChange={change} />
          {errors.deadline && <em className="text-[0.78rem] font-bold text-coral-shadow not-italic">{errors.deadline}</em>}
        </label>

        <div className="flex gap-3">
          <button type="button" className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[14px] px-5 py-2.5 text-[0.9rem] font-extrabold text-white transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5 bg-lilac shadow-[0_4px_0_var(--color-lilac-shadow)] active:shadow-[0_1px_0_var(--color-lilac-shadow)]" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[14px] px-5 py-2.5 text-[0.9rem] font-extrabold text-white transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5 bg-pink shadow-[0_4px_0_var(--color-pink-shadow)] active:shadow-[0_1px_0_var(--color-pink-shadow)]">
            {isEdit ? "Perbarui" : "Tambah"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

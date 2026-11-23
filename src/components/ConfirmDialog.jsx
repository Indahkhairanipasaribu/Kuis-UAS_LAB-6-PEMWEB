import Modal from "./Modal.jsx";

export default function ConfirmDialog({ todo, onConfirm, onCancel }) {
  return (
    <Modal title="Hapus Todo?" onClose={onCancel} size="sm">
      <p className="mb-5 text-center text-[0.92rem] leading-[1.6] text-muted">
        Apakah kamu yakin ingin menghapus tugas <strong className="text-ink">“{todo.title}”</strong>?
        Tindakan ini tidak dapat dibatalkan.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[14px] bg-lilac px-5 py-2.5 text-[0.9rem] font-extrabold text-white shadow-[0_4px_0_var(--color-lilac-shadow)] transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_var(--color-lilac-shadow)]"
          onClick={onCancel}
        >
          Batal
        </button>
        <button
          type="button"
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[14px] bg-coral px-5 py-2.5 text-[0.9rem] font-extrabold text-white shadow-[0_4px_0_var(--color-coral-shadow)] transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_var(--color-coral-shadow)]"
          onClick={onConfirm}
        >
          Ya, Hapus
        </button>
      </div>
    </Modal>
  );
}

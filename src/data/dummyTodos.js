// Data dummy: pekerjaan sehari-hari.
// Struktur mengikuti atribut pada ketentuan kuis (dan siap dipakai ulang
// dengan REST API /api/todos): id, title, description, priority, deadline, status
export const dummyTodos = [
  {
    id: 1,
    title: "Belanja kebutuhan dapur",
    description:
      "Beli sayur, telur, beras, dan minyak goreng di pasar. Jangan lupa bawa tas belanja sendiri.",
    priority: "high",
    deadline: "2026-11-24",
    status: "in progress",
  },
  {
    id: 2,
    title: "Mencuci pakaian dan sprei",
    description: "Cuci baju kotor minggu ini beserta sprei, lalu jemur sebelum siang.",
    priority: "medium",
    deadline: "2026-11-25",
    status: "to-do",
  },
  {
    id: 3,
    title: "Membersihkan dan merapikan kamar",
    description: "Menyapu, mengepel lantai, dan merapikan meja belajar.",
    priority: "low",
    deadline: "2026-11-26",
    status: "in progress",
  },
  {
    id: 4,
    title: "Membayar tagihan listrik",
    description:
      "Bayar tagihan listrik bulan ini lewat aplikasi mobile banking sebelum jatuh tempo.",
    priority: "high",
    deadline: "2026-11-28",
    status: "to-do",
  },
  {
    id: 5,
    title: "Olahraga pagi",
    description: "Jogging santai selama 30 menit di sekitar kompleks.",
    priority: "low",
    deadline: "2026-11-22",
    status: "done",
  },
  {
    id: 6,
    title: "Menyetrika baju kerja",
    description: "Setrika kemeja dan celana untuk dipakai minggu depan.",
    priority: "medium",
    deadline: "2026-11-21",
    status: "to-do",
  },
];

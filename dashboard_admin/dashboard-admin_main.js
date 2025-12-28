// Data Chart
const data = {
  labels: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"],
  datasets: [
    {
      label: "Hari Kerja",
      data: [48, 72, 89, 11, 36],
      backgroundColor: "#1f2937",
      borderRadius: 6,
      barThickness: 16,
    },
    {
      label: "Hari Libur",
      data: [217, 105],
      backgroundColor: "#14b8a6",
      borderRadius: 6,
      barThickness: 16,
    },
  ],
};

// Config Chart
const config = {
  type: "chart",
  data: data,
  options: {},
};

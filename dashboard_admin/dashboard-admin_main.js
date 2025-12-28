// Data Chart
const data = {
  labels: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"],
  datasets: [
    {
      label: "Hari Kerja",
      data: [48, 72, 89, 61, 36, 103],
      backgroundColor: "#1f2937",
      borderRadius: 6,
      barThickness: 20,
    },
    {
      label: "Hari Libur",
      data: [217, 105, 98, 140, 90, 341],
      backgroundColor: "#14b8a6",
      borderRadius: 6,
      barThickness: 20,
    },
  ],
};

// Config Chart
const config = { 
  type: "bar",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 13,
          },
          color: "#6b7280",
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",
        padding: 16,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: function (context) {
            return (
              context.dataset.label + ": " + context.parsed.y + " Pemesanan"
            );
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 13,
          },
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          stepSize: 25,
        },
      },
    },

    interaction: {
      mode: "index",
      intersect: false,
    },
  },
};

// Render Chart
const chartContext = document.getElementById("revenueChart");
const revenueChart = new Chart(chartContext, config);

function updateTotal() {
  const weekDayData = data.datasets[1].data;
  const total = weekDayData.reduce((sum, val) => sum + val, 0);
  document.getElementById("totalValue").textContent = total;
}

function calculateChange() {
  const weekEndTotal = data.datasets[0].data.reduce((sum, val) => sum + val, 0);
  const weekDayTotal = data.datasets[1].data.reduce((sum, val) => sum + val, 0);
  const change = (((weekDayTotal - weekEndTotal) / weekEndTotal) * 100).toFixed(
    1
  );

  document.getElementById("changePercent").textContent =
    (change > 0 ? "+" : "") + change + "%";
}

updateTotal();
calculateChange();

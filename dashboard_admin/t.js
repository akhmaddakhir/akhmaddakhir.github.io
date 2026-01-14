// Chart Data with Realistic Values
const rawData = {
  allTime: {
    popularCity: {
      labels: ["Bali", "Yogyakarta", "Lombok", "Jakarta", "Bandung"],
      datasets: [
        {
          label: "Total Pemesanan",
          data: [15420, 12850, 9730, 8640, 7890],
          backgroundColor: "#14b8a6",
          borderRadius: 5,
          barThickness: 60,
        },
      ],
    },

    bookingStatus: {
      labels: [
        "Pemesanan Selesai",
        "Pemesanan Ditunda",
        "Pemesanan Dibatalkan",
      ],
      data: [38250, 9870, 6410],
      backgroundColor: ["#059669", "#d97706", "#dc2626"],
    },

    revenueTrend: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      datasets: [
        {
          label: "Revenue",
          data: [
            125000000, 138000000, 145000000, 167000000, 182000000, 195000000,
            210000000, 198000000, 225000000, 245000000, 268000000, 290000000,
          ],
          borderColor: "#14b8a6",
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#14b8a6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
  },

  yearly: {
    popularCity: {
      labels: ["Bali", "Yogyakarta", "Lombok", "Jakarta", "Bandung"],
      datasets: [
        {
          label: "Total Pemesanan",
          data: [15420, 12850, 9730, 8640, 7890],
          backgroundColor: "#14b8a6",
          borderRadius: 5,
          barThickness: 60,
        },
      ],
    },

    bookingStatus: {
      labels: [
        "Pemesanan Selesai",
        "Pemesanan Ditunda",
        "Pemesanan Dibatalkan",
      ],
      data: [38250, 9870, 6410],
      backgroundColor: ["#059669", "#d97706", "#dc2626"],
    },

    revenueTrend: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      datasets: [
        {
          label: "Revenue",
          data: [
            125000000, 138000000, 145000000, 167000000, 182000000, 195000000,
            210000000, 198000000, 225000000, 245000000, 268000000, 290000000,
          ],
          borderColor: "#14b8a6",
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#14b8a6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
  },

  monthly: {
    popularCity: {
      labels: ["Bali", "Yogyakarta", "Lombok", "Jakarta", "Bandung"],
      datasets: [
        {
          label: "Total Pemesanan",
          data: [1840, 1520, 1180, 980, 860],
          backgroundColor: "#14b8a6",
          borderRadius: 5,
          barThickness: 60,
        },
      ],
    },

    bookingStatus: {
      labels: [
        "Pemesanan Selesai",
        "Pemesanan Ditunda",
        "Pemesanan Dibatalkan",
      ],
      data: [4250, 980, 650],
      backgroundColor: ["#059669", "#d97706", "#dc2626"],
    },

    revenueTrend: {
      labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
      datasets: [
        {
          label: "Revenue",
          data: [58000000, 62000000, 68000000, 72000000],
          borderColor: "#14b8a6",
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: "#14b8a6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
  },

  weekly: {
    popularCity: {
      labels: ["Bali", "Yogyakarta", "Lombok", "Jakarta", "Bandung"],
      datasets: [
        {
          label: "Total Pemesanan",
          data: [420, 350, 270, 225, 198],
          backgroundColor: "#14b8a6",
          borderRadius: 5,
          barThickness: 60,
        },
      ],
    },

    bookingStatus: {
      labels: [
        "Pemesanan Selesai",
        "Pemesanan Ditunda",
        "Pemesanan Dibatalkan",
      ],
      data: [1050, 240, 173],
      backgroundColor: ["#059669", "#d97706", "#dc2626"],
    },

    revenueTrend: {
      labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      datasets: [
        {
          label: "Revenue",
          data: [
            14000000, 15500000, 16200000, 17800000, 18500000, 21000000,
            19500000,
          ],
          borderColor: "#14b8a6",
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: "#14b8a6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
  },
};

// Current period state
let currentPeriod = "allTime";

// Popular City Chart Configuration
const popularCityConfig = {
  type: "bar",
  data: rawData.allTime.popularCity,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    font: {
      family: "'Inter', sans-serif",
      weight: "500",
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        onClick: null,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
          color: "#6b7280",
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",
        padding: 16,
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: "600",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: "400",
        },
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 6,
        usePointStyle: false,
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function (context) {
            return ` ${
              context.dataset.label
            }: ${context.parsed.y.toLocaleString("id-ID")} Pemesanan`;
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
            family: "'Inter', sans-serif",
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
            family: "'Inter', sans-serif",
          },
          callback: (value) => value.toLocaleString("id-ID"),
        },
      },
    },

    interaction: {
      mode: "nearest",
      intersect: true,
    },
  },
};

// Initialize Popular City Chart
const popularCityContext = document.getElementById("popularCityChart");
let popularCityChart;
if (popularCityContext) {
  popularCityChart = new Chart(popularCityContext, popularCityConfig);
} else {
  console.error("Element with ID 'popularCityChart' not found");
}

// Booking Status Chart Configuration
const bookingStatusConfig = {
  type: "doughnut",
  data: {
    labels: rawData.allTime.bookingStatus.labels,
    datasets: [
      {
        data: rawData.allTime.bookingStatus.data,
        backgroundColor: rawData.allTime.bookingStatus.backgroundColor,
        borderColor: "#fff",
        borderWidth: 10,
        hoverOffset: 20,
        hoverBorderColor: "#fff",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    font: {
      family: "'Inter', sans-serif",
      weight: "500",
    },

    plugins: {
      legend: {
        position: "right",
        onClick(e, legendItem, legend) {
          const chart = legend.chart;
          const index = legendItem.index;
          const meta = chart.getDatasetMeta(0);

          meta.data[index].hidden = !meta.data[index].hidden;

          chart.update();
        },
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 14,
            weight: "500",
            family: "'Inter', sans-serif",
          },
          color: "#1f2937",

          generateLabels(chart) {
            const data = chart.data;
            const dataset = data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            const meta = chart.getDatasetMeta(0);

            return data.labels.map((label, i) => {
              const value = dataset.data[i];
              const percentage = ((value / total) * 100).toFixed(0);
              const hidden = meta.data[i]?.hidden ?? false;

              return {
                text: `${label}: ${percentage}%`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.backgroundColor[i],
                lineWidth: 0,
                hidden: hidden,
                index: i,
                fontColor: hidden ? "#9ca3af" : "#1f2937",
              };
            });
          },
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",
        padding: 16,
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: "600",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: "400",
        },
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 6,
        callbacks: {
          title() {
            return "";
          },
          label(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${context.label}: ${value.toLocaleString(
              "id-ID"
            )} (${percentage}%)`;
          },
        },
      },
    },
  },
};

// Initialize Booking Status Chart
const bookingStatusContext = document.getElementById("bookingStatusChart");
let bookingStatusChart;
if (bookingStatusContext) {
  bookingStatusChart = new Chart(bookingStatusContext, bookingStatusConfig);
} else {
  console.error("Element with ID 'bookingStatusChart' not found");
}

// Revenue Trend Chart Configuration
const revenueTrendConfig = {
  type: "line",
  data: rawData.allTime.revenueTrend,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    font: {
      family: "'Inter', sans-serif",
      weight: "500",
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        onClick: null,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
          color: "#6b7280",
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",
        padding: 16,
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: "600",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: "400",
        },
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function (context) {
            const value = context.parsed.y;
            const formatted = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
            return ` ${context.dataset.label}: ${formatted}`;
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
            family: "'Inter', sans-serif",
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
            family: "'Inter', sans-serif",
          },
          callback: (value) => {
            if (value >= 1000000) {
              return `Rp ${(value / 1000000).toFixed(0)}Jt`;
            }
            return `Rp ${(value / 1000).toFixed(0)}K`;
          },
        },
      },
    },

    interaction: {
      mode: "index",
      intersect: false,
    },
  },
};

// Initialize Revenue Trend Chart
const revenueTrendContext = document.getElementById("revenueTrendChart");
let revenueTrendChart;
if (revenueTrendContext) {
  revenueTrendChart = new Chart(revenueTrendContext, revenueTrendConfig);
} else {
  console.error("Element with ID 'revenueTrendChart' not found");
}

// Function to update all charts based on period
function updateCharts(period) {
  currentPeriod = period;

  // Update Popular City Chart
  if (popularCityChart && rawData[period]) {
    popularCityChart.data = rawData[period].popularCity;
    popularCityChart.update();
  }

  // Update Booking Status Chart
  if (bookingStatusChart && rawData[period]) {
    bookingStatusChart.data.labels = rawData[period].bookingStatus.labels;
    bookingStatusChart.data.datasets[0].data =
      rawData[period].bookingStatus.data;
    bookingStatusChart.data.datasets[0].backgroundColor =
      rawData[period].bookingStatus.backgroundColor;
    bookingStatusChart.update();
  }

  // Update Revenue Trend Chart
  if (revenueTrendChart && rawData[period]) {
    revenueTrendChart.data = rawData[period].revenueTrend;
    revenueTrendChart.update();
  }
}

// Custom Select Dropdown
const selectTrigger = document.getElementById("selectTrigger");
const selectDropdown = document.getElementById("selectDropdown");
const selectedText = document.getElementById("selectedText");
const selectOptions = document.querySelectorAll(".select-option");
const nativeSelect = document.getElementById("nativeSelect");

// Check if elements exist before adding event listeners
if (selectTrigger && selectDropdown && selectedText && nativeSelect) {
  selectTrigger.setAttribute("tabindex", "0");

  selectTrigger.addEventListener("click", () => {
    selectTrigger.classList.toggle("active");
    selectDropdown.classList.toggle("active");
  });

  selectOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      const text = option.textContent;

      selectedText.textContent = text;
      nativeSelect.value = value;

      selectOptions.forEach((o) => o.classList.remove("selected"));
      option.classList.add("selected");

      selectTrigger.classList.remove("active");
      selectDropdown.classList.remove("active");

      // Update charts when period changes
      updateCharts(value);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) {
      selectTrigger.classList.remove("active");
      selectDropdown.classList.remove("active");
    }
  });

  // Enhanced keyboard navigation
  selectTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectTrigger.click();
    } else if (e.key === "Escape") {
      selectTrigger.classList.remove("active");
      selectDropdown.classList.remove("active");
    }
  });
} else {
  console.error("One or more custom select elements not found");
}

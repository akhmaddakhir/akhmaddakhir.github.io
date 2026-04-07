let currentPeriod = "allTime";

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { family: cssRoot.font },
        color: cssRoot.labelColor,
      },
    },
    tooltip: {
      backgroundColor: cssRoot.mainBackground,
      padding: 16,
      titleFont: {
        size: 13,
        family: cssRoot.font,
        weight: "600",
      },
      bodyFont: {
        size: 13,
        family: cssRoot.font,
        weight: "400",
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: cssRoot.labelColor,
        font: {
          size: 13,
          family: cssRoot.font,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: { color: cssRoot.axisTextColor, drawBorder: false },
      ticks: {
        color: cssRoot.labelColor,
        font: {
          size: 12,
          family: cssRoot.font,
        },
      },
    },
  },
};

const legendStrikethrough = {
  id: "legendStrikethrough",
  afterDraw(chart) {
    if (chart.config.type !== "doughnut") return;

    const ctx = chart.ctx;
    const legend = chart.legend;
    if (!legend || !legend.legendItems) return;

    ctx.save();

    legend.legendItems.forEach((item, i) => {
      const hidden = !chart.getDataVisibility(i);

      if (hidden && item.text) {
        ctx.strokeStyle = cssRoot.disabledColor;
        ctx.lineWidth = 1.5;

        const textX = item.left;
        const textY = item.top + item.height / 2;
        const textWidth = ctx.measureText(item.text).width;

        ctx.beginPath();
        ctx.moveTo(textX, textY);
        ctx.lineTo(textX + textWidth, textY);
        ctx.stroke();
      }
    });

    ctx.restore();
  },
};

Chart.register(legendStrikethrough);

const charts = {};

charts.popularCity = new Chart(document.getElementById("popularCityChart"), {
  type: "bar",
  data: rawData.allTime.popularCity,
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
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
            family: cssRoot.font,
          },
          color: cssRoot.labelColor,
        },
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: (ctx) =>
            ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString(
              "id-ID"
            )} Pemesanan`,
        },
      },
    },
  },
});

charts.bookingStatus = new Chart(
  document.getElementById("bookingStatusChart"),
  {
    type: "doughnut",
    data: {
      labels: rawData.allTime.bookingStatus.labels,
      datasets: [
        {
          data: rawData.allTime.bookingStatus.data,
          backgroundColor: rawData.allTime.bookingStatus.backgroundColor,
          borderColor: cssRoot.lightColor,
          borderWidth: 10,
          hoverOffset: 20,
          hoverBorderColor: cssRoot.lightColor,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: "easeInOutQuart",
      },
      plugins: {
        legend: {
          position: "right",
          onClick(e, legendItem, legend) {
            const chart = legend.chart;
            const index = legendItem.index;

            chart.toggleDataVisibility(index);
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
              family: cssRoot.font,
            },
            generateLabels(chart) {
              const data = chart.data;
              const datasets = data.datasets[0];
              const total = datasets.data.reduce((a, b) => a + b, 0);
              return data.labels.map((label, i) => {
                const hidden = !chart.getDataVisibility(i);
                return {
                  text: `${label}: ${((datasets.data[i] / total) * 100).toFixed(
                    0
                  )}%`,
                  fillStyle: datasets.backgroundColor[i],
                  hidden: hidden,
                  index: i,
                  fontColor: hidden
                    ? cssRoot.disabledColor
                    : cssRoot.labelColor,
                };
              });
            },
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: cssRoot.mainBackground,
          padding: 16,
          filter: function (tooltipItem) {
            const chart = tooltipItem.chart;
            return chart.getDataVisibility(tooltipItem.dataIndex);
          },
          callbacks: {
            label(ctx) {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.parsed / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${ctx.parsed.toLocaleString(
                "id-ID"
              )} (${pct}%)`;
            },
          },
        },
      },
    },
  }
);

charts.revenueTrend = new Chart(document.getElementById("revenueTrendChart"), {
  type: "line",
  data: rawData.allTime.revenueTrend,
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
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
            family: cssRoot.font,
          },
          color: cssRoot.labelColor,
        },
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: (ctx) => {
            const formatted = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(ctx.parsed.y);
            return ` ${ctx.dataset.label}: ${formatted}`;
          },
        },
      },
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        ticks: {
          ...commonOptions.scales.y.ticks,
          callback: (v) =>
            v >= 1000000
              ? `Rp ${(v / 1000000).toFixed(0)}Jt`
              : `Rp ${(v / 1000).toFixed(0)}K`,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  },
});

charts.growth = new Chart(document.getElementById("userGrowthChart"), {
  type: "line",
  data: rawData.allTime.growthChart,
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
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
            family: cssRoot.font,
          },
          color: cssRoot.labelColor,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  },
});

charts.conversion = new Chart(document.getElementById("conversionChart"), {
  type: "bar",
  data: rawData.allTime.conversionFunnel,
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: cssRoot.mainBackground,
        padding: 16,
        callbacks: {
          label: (ctx) =>
            ` ${ctx.dataset.label}: ${ctx.parsed.x.toLocaleString("id-ID")}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: cssRoot.axisTextColor,
          drawBorder: false,
        },
        ticks: {
          color: cssRoot.labelColor,
          stepSize:10000,
          font: {
            size: 12,
            family: cssRoot.font,
          },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: cssRoot.labelColor,
          font: {
            size: 13,
            family: cssRoot.font,
          },
        },
      },
    },
  },
});

charts.paymentMethod = new Chart(
  document.getElementById("paymentMethodChart"),
  {
    type: "doughnut",
    data: {
      labels: rawData.allTime.paymentMethod.labels,
      datasets: [
        {
          data: rawData.allTime.paymentMethod.data,
          backgroundColor: rawData.allTime.paymentMethod.backgroundColor,
          borderColor: cssRoot.lightColor,
          borderWidth: 10,
          hoverOffset: 20,
          hoverBorderColor: cssRoot.lightColor,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: "easeInOutQuart",
      },
      plugins: {
        legend: {
          position: "right",
          onClick(e, legendItem, legend) {
            const chart = legend.chart;
            const index = legendItem.index;

            chart.toggleDataVisibility(index);
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
              family: cssRoot.font,
            },
            generateLabels(chart) {
              const data = chart.data;
              const datasets = data.datasets[0];
              const total = datasets.data.reduce((a, b) => a + b, 0);
              return data.labels.map((label, i) => {
                const hidden = !chart.getDataVisibility(i);
                return {
                  text: `${label}: ${((datasets.data[i] / total) * 100).toFixed(
                    0
                  )}%`,
                  fillStyle: datasets.backgroundColor[i],
                  hidden: hidden,
                  index: i,
                  fontColor: hidden
                    ? cssRoot.disabledColor
                    : cssRoot.labelColor,
                };
              });
            },
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: cssRoot.mainBackground,
          padding: 16,
          filter: function (tooltipItem) {
            const chart = tooltipItem.chart;
            return chart.getDataVisibility(tooltipItem.dataIndex);
          },
          callbacks: {
            label(ctx) {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.parsed / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${ctx.parsed.toLocaleString(
                "id-ID"
              )} (${pct}%)`;
            },
          },
        },
      },
    },
  }
);

charts.feeComparison = new Chart(
  document.getElementById("feeComparisonChart"),
  {
    type: "line",
    data: rawData.allTime.feeComparison,
    options: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
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
              family: cssRoot.font,
            },
            color: cssRoot.labelColor,
          },
        },
        tooltip: {
          ...commonOptions.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(ctx.parsed.y);
              return ` ${ctx.dataset.label}: ${formatted}`;
            },
          },
        },
      },
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales.y,
          ticks: {
            stepSize:100000000,
            ...commonOptions.scales.y.ticks,
            callback: (v) =>
              v >= 1000000
                ? `Rp ${(v / 1000000).toFixed(0)}Jt`
                : `Rp ${(v / 1000).toFixed(0)}K`,
          },
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
    },
  }
);

charts.propertyType = new Chart(document.getElementById("propertyTypeChart"), {
  type: "bar",
  data: {
    labels: rawData.allTime.propertyType.labels,
    datasets: [
      {
        label: "Total Properti",
        data: rawData.allTime.propertyType.data,
        backgroundColor: rawData.allTime.propertyType.backgroundColor,
        borderRadius: 5,
        barThickness: 60,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: cssRoot.mainBackground,
        padding: 16,
        callbacks: {
          label: (ctx) =>
            ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString(
              "id-ID"
            )} Properti`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: cssRoot.labelColor,
          font: {
            size: 13,
            family: cssRoot.font,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: cssRoot.axisTextColor, drawBorder: false },
        ticks: {
          color: cssRoot.labelColor,
          font: {
            size: 12,
            family: cssRoot.font,
          },
        },
      },
    },
  },
});

function updateStats(period) {
  const stats = rawData[period].stats;
  document.getElementById("totalRevenue").textContent = stats.revenue;
  document.getElementById("revenueChange").textContent = stats.revenueChange;
  document.getElementById("totalBooking").textContent = stats.bookings;
  document.getElementById("bookingChange").textContent = stats.bookingsChange;
  document.getElementById("activeUser").textContent = stats.users;
  document.getElementById("userChange").textContent = stats.usersChange;
  document.getElementById("totalHost").textContent = stats.hosts;
  document.getElementById("hostChange").textContent = stats.hostsChange;
}

function updateCharts(period) {
  currentPeriod = period;
  updateStats(period);

  charts.popularCity.data = rawData[period].popularCity;
  charts.popularCity.update();

  charts.bookingStatus.data.labels = rawData[period].bookingStatus.labels;
  charts.bookingStatus.data.datasets[0].data =
    rawData[period].bookingStatus.data;
  charts.bookingStatus.data.datasets[0].backgroundColor =
    rawData[period].bookingStatus.backgroundColor;
  charts.bookingStatus.update();

  charts.revenueTrend.data = rawData[period].revenueTrend;
  charts.revenueTrend.update();

  charts.growth.data = rawData[period].growthChart;
  charts.growth.update();

  charts.conversion.data = rawData[period].conversionFunnel;
  charts.conversion.update();

  charts.paymentMethod.data.labels = rawData[period].paymentMethod.labels;
  charts.paymentMethod.data.datasets[0].data =
    rawData[period].paymentMethod.data;
  charts.paymentMethod.data.datasets[0].backgroundColor =
    rawData[period].paymentMethod.backgroundColor;
  charts.paymentMethod.update();

  charts.feeComparison.data = rawData[period].feeComparison;
  charts.feeComparison.update();

  charts.propertyType.data.labels = rawData[period].propertyType.labels;
  charts.propertyType.data.datasets[0].data = rawData[period].propertyType.data;
  charts.propertyType.data.datasets[0].backgroundColor =
    rawData[period].propertyType.backgroundColor;
  charts.propertyType.update();
}

const selectTrigger = document.getElementById("selectTrigger");
const selectDropdown = document.getElementById("selectDropdown");
const selectedText = document.getElementById("selectedText");
const selectOptions = document.querySelectorAll(".select-option");

selectTrigger.addEventListener("click", () => {
  selectTrigger.classList.toggle("active");
  selectDropdown.classList.toggle("active");
});

selectOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedText.textContent = option.textContent;
    selectOptions.forEach((o) => o.classList.remove("selected"));
    option.classList.add("selected");
    selectTrigger.classList.remove("active");
    selectDropdown.classList.remove("active");
    updateCharts(option.dataset.value);
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
    selectTrigger.classList.remove("active");
    selectDropdown.classList.remove("active");
  }
});

selectTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    selectTrigger.click();
  } else if (e.key === "Escape") {
    selectTrigger.classList.remove("active");
    selectDropdown.classList.remove("active");
  }
});

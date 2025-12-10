// Custom Price Range Slider
const sliderWrapper = document.getElementById("sliderWrapper");
const sliderTrack = document.getElementById("sliderTrack");
const handleMin = document.getElementById("handleMin");
const handleMax = document.getElementById("handleMax");
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");

let minValue = 0;
let maxValue = 100;
let activeHandle = null;

function updateSliderUI() {
  handleMin.style.left = minValue + "%";
  handleMax.style.left = maxValue + "%";
  sliderTrack.style.left = minValue + "%";
  sliderTrack.style.width = maxValue - minValue + "%";
  priceMin.textContent = minValue === 0 ? "$0" : `$${minValue}`;
  priceMax.textContent = maxValue === 100 ? "$95+" : `$${maxValue}`;
}

function getValueFromPosition(clientX) {
  const rect = sliderWrapper.getBoundingClientRect();
  const percentage = ((clientX - rect.left) / rect.width) * 100;
  return Math.max(0, Math.min(100, Math.round(percentage)));
}

function handleMouseDown(e) {
  activeHandle = e.target.dataset.handle;
  e.target.classList.add("dragging");
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(e) {
  if (!activeHandle) return;
  const newValue = getValueFromPosition(e.clientX);

  if (activeHandle === "min") {
    if (newValue <= maxValue - 5) {
      minValue = newValue;
    } else {
      minValue = maxValue - 5;
    }
  } else if (activeHandle === "max") {
    if (newValue >= minValue + 5) {
      maxValue = newValue;
    } else {
      maxValue = minValue + 5;
    }
  }
  updateSliderUI();
}

function handleMouseUp() {
  if (activeHandle === "min") {
    handleMin.classList.remove("dragging");
  } else if (activeHandle === "max") {
    handleMax.classList.remove("dragging");
  }
  activeHandle = null;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

handleMin.addEventListener("mousedown", handleMouseDown);
handleMax.addEventListener("mousedown", handleMouseDown);

sliderWrapper.addEventListener("click", function (e) {
  if (e.target === sliderWrapper || e.target === sliderTrack) {
    const newValue = getValueFromPosition(e.clientX);
    const distToMin = Math.abs(newValue - minValue);
    const distToMax = Math.abs(newValue - maxValue);

    if (distToMin < distToMax) {
      if (newValue <= maxValue - 5) {
        minValue = newValue;
      }
    } else {
      if (newValue >= minValue + 5) {
        maxValue = newValue;
      }
    }
    updateSliderUI();
  }
});

// Budaya Options - Single Selection
const budayaOptions = document.querySelectorAll(
  "#budayaOptions .filter-option"
);
budayaOptions.forEach((option) => {
  option.addEventListener("click", function () {
    budayaOptions.forEach((opt) => opt.classList.remove("active"));
    this.classList.add("active");
  });
});

// Jenis Options - Single Selection
const jenisOptions = document.querySelectorAll("#jenisOptions .filter-option");
jenisOptions.forEach((option) => {
  option.addEventListener("click", function () {
    jenisOptions.forEach((opt) => opt.classList.remove("active"));
    this.classList.add("active");
  });
});

// Rating Options Toggle
const ratingOptions = document.querySelectorAll(".rating-option");
ratingOptions.forEach((option) => {
  option.addEventListener("click", function () {
    ratingOptions.forEach((opt) => opt.classList.remove("active"));
    this.classList.add("active");
  });
});

// Reset Button
document.getElementById("resetBtn").addEventListener("click", function () {
  minValue = 0;
  maxValue = 100;
  updateSliderUI();
  budayaOptions.forEach((option) => option.classList.remove("active"));
  jenisOptions.forEach((option) => option.classList.remove("active"));
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((cb) => (cb.checked = false));
  ratingOptions.forEach((option) => option.classList.remove("active"));
});

// Confirm Button
document.getElementById("confirmBtn").addEventListener("click", function () {
  const selectedBudaya = document.querySelector(
    "#budayaOptions .filter-option.active"
  );
  const selectedJenis = document.querySelector(
    "#jenisOptions .filter-option.active"
  );
  const selectedRating = document.querySelector(".rating-option.active");

  const selectedFilters = {
    priceRange: {
      min: minValue,
      max: maxValue,
    },
    budaya: selectedBudaya ? selectedBudaya.textContent : null,
    jenis: selectedJenis ? selectedJenis.textContent : null,
    facilities: Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((el) => el.nextElementSibling.textContent),
    rating: selectedRating
      ? selectedRating.querySelectorAll("span").length
      : null,
  };

  console.log("Selected Filters:", selectedFilters);
  alert("Filter diterapkan! Lihat console untuk detail.");
});

updateSliderUI();

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

// Budaya Options - Multiple Selection
const budayaOptions = document.querySelectorAll(
  "#budayaOptions .filter-option"
);
budayaOptions.forEach((option) => {
  option.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// Jenis Options - Multiple Selection
const jenisOptions = document.querySelectorAll("#jenisOptions .filter-option");
jenisOptions.forEach((option) => {
  option.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// Rating Options - Multiple Selection
const ratingOptions = document.querySelectorAll(".rating-option");
ratingOptions.forEach((option) => {
  option.addEventListener("click", function () {
    this.classList.toggle("active");
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
  const selectedBudaya = Array.from(
    document.querySelectorAll("#budayaOptions .filter-option.active")
  ).map((el) => el.textContent);

  const selectedJenis = Array.from(
    document.querySelectorAll("#jenisOptions .filter-option.active")
  ).map((el) => el.textContent);

  const selectedRatings = Array.from(
    document.querySelectorAll(".rating-option.active")
  ).map((el) => el.querySelectorAll("img").length);

  const selectedFilters = {
    priceRange: {
      min: minValue,
      max: maxValue,
    },
    budaya: selectedBudaya,
    jenis: selectedJenis,
    facilities: Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((el) => el.nextElementSibling.textContent),
    rating: selectedRatings,
  };

  console.log("Selected Filters:", selectedFilters);

  // Close popup if it exists
  const filterPopup = document.getElementById("filterPopup");
  if (filterPopup) {
    filterPopup.classList.remove("active");
    // Re-enable page scrolling after closing
    document.body.style.overflow = "";
  }
});

updateSliderUI();

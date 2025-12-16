// ==================== SHARE BUTTON - Connect to Share Popup ====================
// Load the share popup HTML and scripts, then attach click handler
function loadShareDescriptionPopup() {
  if (document.getElementById("sharePopup")) return Promise.resolve();
  return fetch("share-description_popup.html")
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Append any <style> from the popup into document head
      const styles = doc.querySelectorAll("style");
      styles.forEach((s) => {
        document.head.appendChild(s.cloneNode(true));
      });

      // Append popup container (id=sharePopup) into body
      const popup = doc.getElementById("sharePopup");
      if (popup) {
        document.body.appendChild(popup);
      }

      // Execute scripts found in fetched HTML
      const scripts = doc.querySelectorAll("script");
      scripts.forEach((s) => {
        const newScript = document.createElement("script");
        if (s.src) {
          newScript.src = s.src;
        } else {
          newScript.textContent = s.textContent;
        }
        document.body.appendChild(newScript);
      });
    })
    .catch((err) => console.error("Failed to load share popup:", err));
}

// Attach handler after ensuring popup is loaded
const shareButton = document.getElementById("share-button");
if (shareButton) {
  loadShareDescriptionPopup().then(() => {
    // Popup elements
    const sp = document.getElementById("sharePopup");
    const closeBtn = document.getElementById("closeSharePopup");
    const shareFriendBtn = document.getElementById("shareFriendBtn");
    const copyLinkBtn = document.getElementById("copyLinkBtn");
    const copyLinkText = document.getElementById("copyLinkText");

    function openModal() {
      if (sp) {
        sp.classList.add("active");
        document.body.style.overflow = "hidden";
        if (copyLinkText) copyLinkText.textContent = "Salin Link";
        if (copyLinkBtn) copyLinkBtn.classList.remove("copied");
      }
    }

    function closeModal() {
      if (sp) {
        sp.classList.remove("active");
        document.body.style.overflow = "";
      }
    }

    // Open when main share button clicked
    shareButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof openSharePopup === "function") {
        // prefer popup's own open function if available
        try {
          openSharePopup();
        } catch (err) {
          openModal();
        }
      } else {
        openModal();
      }
    });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (shareFriendBtn) shareFriendBtn.addEventListener("click", closeModal);

    // Overlay click closes popup
    if (sp) {
      sp.addEventListener("click", function (e) {
        if (e.target === sp) closeModal();
      });
    }

    // Copy link behavior
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener("click", function () {
        const url = window.location.href;
        navigator.clipboard
          .writeText(url)
          .then(() => {
            if (copyLinkText) copyLinkText.textContent = "Link tersalin!";
            copyLinkBtn.classList.add("copied");
            setTimeout(() => {
              if (copyLinkText) copyLinkText.textContent = "Salin Link";
              copyLinkBtn.classList.remove("copied");
            }, 2000);
          })
          .catch(() => {
            // fallback
            const ta = document.createElement("textarea");
            ta.value = url;
            document.body.appendChild(ta);
            ta.select();
            try {
              document.execCommand("copy");
              if (copyLinkText) copyLinkText.textContent = "Link tersalin!";
              copyLinkBtn.classList.add("copied");
              setTimeout(() => {
                if (copyLinkText) copyLinkText.textContent = "Salin Link";
                copyLinkBtn.classList.remove("copied");
              }, 2000);
            } catch (err) {
              console.error("Copy failed", err);
            }
            document.body.removeChild(ta);
          });
      });
    }
  });
}

// ==================== REVIEWS MODAL (load from reviews_popup.html) ====================
const seeMoreButton = document.getElementById("see-more-button");

function loadReviewsPopup() {
  if (document.getElementById("reviewsPopup")) return Promise.resolve();
  return fetch("reviews_popup.html")
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // move styles into head
      doc.querySelectorAll("style").forEach((s) => {
        document.head.appendChild(s.cloneNode(true));
      });

      // append popup container
      const popup = doc.getElementById("reviewsPopup");
      if (popup) document.body.appendChild(popup);

      // No external scripts in reviews_popup.html, but attach behaviors now
      attachReviewsHandlers();
    })
    .catch((err) => console.error("Failed to load reviews popup:", err));
}

function attachReviewsHandlers() {
  const rp = document.getElementById("reviewsPopup");
  if (!rp) return;

  const closeBtn = document.getElementById("close-button");
  const ratingOptions = rp.querySelectorAll(".rating-option");
  const reviewInput = rp.querySelector(".review-input");
  const likeBtn = rp.querySelector("#likeButton");
  const dislikeBtn = rp.querySelector("#dislikeButton");

  function openReviews() {
    rp.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeReviews() {
    rp.classList.remove("active");
    document.body.style.overflow = "";
  }

  // rating option behavior: mimic filter popup (hover + toggle active)
  ratingOptions.forEach((opt) => {
    opt.addEventListener("click", function () {
      opt.classList.toggle("active");
    });
    opt.addEventListener("mouseover", function () {
      opt.classList.add("hover");
    });
    opt.addEventListener("mouseout", function () {
      opt.classList.remove("hover");
    });
  });

  // overlay click closes
  rp.addEventListener("click", function (e) {
    if (e.target === rp) closeReviews();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeReviews);

  // wire like/dislike in popup (if present)
  if (likeBtn) {
    likeBtn.addEventListener("click", function () {
      const img = likeBtn.querySelector("img");
      if (!img) return;
      const isOn = img.getAttribute("src").includes("icon_like-on.svg");
      img.setAttribute(
        "src",
        isOn
          ? "/website_materials/icon_like.svg"
          : "/website_materials/icon_like-on.svg"
      );
      // ensure dislike off
      const disImg = rp.querySelector("#dislikeImage");
      if (disImg)
        disImg.setAttribute("src", "/website_materials/icon_dislike.svg");
    });
  }
  if (dislikeBtn) {
    dislikeBtn.addEventListener("click", function () {
      const img = dislikeBtn.querySelector("img");
      if (!img) return;
      const isOn = img.getAttribute("src").includes("icon_dislike-on.svg");
      img.setAttribute(
        "src",
        isOn
          ? "/website_materials/icon_dislike.svg"
          : "/website_materials/icon_dislike-on.svg"
      );
      const likeImg = rp.querySelector("#likeImage");
      if (likeImg)
        likeImg.setAttribute("src", "/website_materials/icon_like.svg");
    });
  }

  // ensure comment input styling exists — focus behavior
  if (reviewInput) {
    reviewInput.addEventListener("focus", function () {
      reviewInput.classList.add("focused");
    });
    reviewInput.addEventListener("blur", function () {
      reviewInput.classList.remove("focused");
    });
  }

  // expose open/close helpers in case other code calls them
  window.openReviewsPopup = openReviews;
  window.closeReviewsPopup = closeReviews;
}

if (seeMoreButton) {
  seeMoreButton.addEventListener("click", function () {
    loadReviewsPopup().then(() => {
      // open the popup after loaded
      const rp = document.getElementById("reviewsPopup");
      if (rp) {
        rp.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });
}

// ==================== SAVE BUTTON ====================
const saveButton = document.getElementById("saveButton");
const saveImage = document.getElementById("saveImage");

saveButton.addEventListener("click", function () {
  const currentSrc = saveImage.getAttribute("src");
  if (currentSrc.includes("icon_save-nobg-on.svg")) {
    saveImage.setAttribute("src", "/website_materials/icon_save-nobg.svg");
  } else {
    saveImage.setAttribute("src", "/website_materials/icon_save-nobg-on.svg");
  }
});

// ==================== LIKE/DISLIKE BUTTONS ====================
const likeButton = document.getElementById("likeButton");
const likeImage = document.getElementById("likeImage");
const dislikeButton = document.getElementById("dislikeButton");
const dislikeImage = document.getElementById("dislikeImage");

likeButton.addEventListener("click", function () {
  const likeActive = likeImage.getAttribute("src").includes("icon_like-on.svg");
  if (!likeActive) {
    likeImage.setAttribute("src", "/website_materials/icon_like-on.svg");
    dislikeImage.setAttribute("src", "/website_materials/icon_dislike.svg");
  } else {
    likeImage.setAttribute("src", "/website_materials/icon_like.svg");
  }
});

dislikeButton.addEventListener("click", function () {
  const dislikeActive = dislikeImage
    .getAttribute("src")
    .includes("icon_dislike-on.svg");
  if (!dislikeActive) {
    dislikeImage.setAttribute("src", "/website_materials/icon_dislike-on.svg");
    likeImage.setAttribute("src", "/website_materials/icon_like.svg");
  } else {
    dislikeImage.setAttribute("src", "/website_materials/icon_dislike.svg");
  }
});

// ==================== MAP ====================
const map = L.map("map", {
  scrollWheelZoom: false,
  dragging: true,
  touchZoom: true,
  zoomControl: false,
}).setView([-7.7956, 110.3695], 13);

const customMarker = L.icon({
  iconUrl: "/website_materials/icon_map-pin.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution: "",
  }
).addTo(map);

L.marker([-7.7956, 110.3695], { icon: customMarker }).addTo(map);

document.getElementById("zoom-in").onclick = () => map.zoomIn();
document.getElementById("zoom-out").onclick = () => map.zoomOut();

// ==================== CALENDAR POPUP ====================
var monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

var today = new Date();
var startDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
var endDate = new Date(today.getFullYear(), today.getMonth() + 11, 1);

var currentYear = today.getFullYear();
var currentMonth = today.getMonth();

var checkInDate = null;
var checkOutDate = null;
var activeInputType = "checkin";

// DOM Elements - Calendar
var popupOverlay = document.getElementById("popupOverlay");
var calendarPopup = document.getElementById("calendarPopup");
var panelDateSection = document.getElementById("panelDateSection");
var checkinInput = document.getElementById("checkin-input");
var checkoutInput = document.getElementById("checkout-input");
var checkinDisplay = document.getElementById("checkinDisplay");
var checkoutDisplay = document.getElementById("checkoutDisplay");
var clearCheckinBtn = document.getElementById("clearCheckinBtn");
var clearCheckoutBtn = document.getElementById("clearCheckoutBtn");

var calendarContainer = document.getElementById("calendarContainer");
var month1Label = document.getElementById("month1Label");
var month2Label = document.getElementById("month2Label");
var prevMonthBtn = document.getElementById("prevMonth");
var nextMonthBtn = document.getElementById("nextMonth");
var resetDatesBtn = document.getElementById("resetDatesBtn");
var calendarConfirmBtn = document.getElementById("calendarConfirmBtn");

var nightsCount = document.getElementById("nightsCount");
var dateRange = document.getElementById("dateRange");

function openCalendarPopup(inputType) {
  closeGuestPopup();
  activeInputType = inputType;

  panelDateSection.classList.add("popup-active");
  calendarPopup.classList.add("active");
  popupOverlay.classList.add("active");

  updatePanelActiveState();
  updatePanelDisplays();
  renderCalendars();
}

function closeCalendarPopup() {
  calendarPopup.classList.remove("active");
  panelDateSection.classList.remove("popup-active");
  checkinInput.classList.remove("active");
  checkoutInput.classList.remove("active");
  popupOverlay.classList.remove("active");

  updatePanelDisplays();
}

function updatePanelActiveState() {
  if (activeInputType === "checkin") {
    checkinInput.classList.add("active");
    checkoutInput.classList.remove("active");
  } else {
    checkinInput.classList.remove("active");
    checkoutInput.classList.add("active");
  }
}

function updatePanelDisplays() {
  var isPopupActive = panelDateSection.classList.contains("popup-active");

  if (checkInDate) {
    checkinDisplay.textContent = formatDateShort(checkInDate);
    checkinDisplay.classList.add("filled");
    if (isPopupActive) {
      clearCheckinBtn.classList.remove("hidden");
    } else {
      clearCheckinBtn.classList.add("hidden");
    }
  } else {
    checkinDisplay.textContent = "Tambahkan Tanggal";
    checkinDisplay.classList.remove("filled");
    clearCheckinBtn.classList.add("hidden");
  }

  if (checkOutDate) {
    checkoutDisplay.textContent = formatDateShort(checkOutDate);
    checkoutDisplay.classList.add("filled");
    if (isPopupActive) {
      clearCheckoutBtn.classList.remove("hidden");
    } else {
      clearCheckoutBtn.classList.add("hidden");
    }
  } else {
    checkoutDisplay.textContent = "Tambahkan Tanggal";
    checkoutDisplay.classList.remove("filled");
    clearCheckoutBtn.classList.add("hidden");
  }

  updateCalendarInfo();
}

function updateCalendarInfo() {
  if (checkInDate && checkOutDate) {
    var nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    nightsCount.textContent = nights + " malam";
    dateRange.textContent =
      formatDateLong(checkInDate) + " – " + formatDateLong(checkOutDate);
  } else if (checkInDate) {
    nightsCount.textContent = "Pilih tanggal check-out";
    dateRange.textContent = formatDateLong(checkInDate) + " – ...";
  } else {
    nightsCount.textContent = "Pilih tanggal";
    dateRange.textContent = "Tambahkan tanggal check-in dan check-out";
  }
}

function renderCalendars() {
  calendarContainer.innerHTML = "";

  var cal1 = createCalendarMonth(currentYear, currentMonth);
  var nextMonth = (currentMonth + 1) % 12;
  var nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  var cal2 = createCalendarMonth(nextYear, nextMonth);

  calendarContainer.appendChild(cal1);
  calendarContainer.appendChild(cal2);

  updateCalendarHeader();
}

function updateCalendarHeader() {
  month1Label.textContent = monthNames[currentMonth] + " " + currentYear;

  var nextMonth = (currentMonth + 1) % 12;
  var nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  month2Label.textContent = monthNames[nextMonth] + " " + nextYear;

  if (
    currentYear === startDate.getFullYear() &&
    currentMonth === startDate.getMonth()
  ) {
    prevMonthBtn.classList.add("disabled");
  } else {
    prevMonthBtn.classList.remove("disabled");
  }

  if (
    currentYear === endDate.getFullYear() &&
    currentMonth === endDate.getMonth()
  ) {
    nextMonthBtn.classList.add("disabled");
  } else {
    nextMonthBtn.classList.remove("disabled");
  }
}

function createCalendarMonth(year, month) {
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var offset = (firstDay + 6) % 7;

  var wrapper = document.createElement("div");
  wrapper.classList.add("cal-month-grid-wrapper");
  wrapper.innerHTML = '<div class="cal-grid"></div>';

  var grid = wrapper.querySelector(".cal-grid");
  var dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  for (var i = 0; i < dayNames.length; i++) {
    var dayEl = document.createElement("div");
    dayEl.classList.add("cal-day-name");
    dayEl.textContent = dayNames[i];
    grid.appendChild(dayEl);
  }

  for (var i = 0; i < offset; i++) {
    var emptyEl = document.createElement("div");
    emptyEl.classList.add("cal-date-cell", "cal-empty");
    grid.appendChild(emptyEl);
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var dateEl = document.createElement("div");
    dateEl.classList.add("cal-date-cell");
    dateEl.textContent = d;

    var thisDate = new Date(year, month, d);

    if (thisDate < startDate) {
      dateEl.classList.add("cal-disabled");
    } else {
      (function (currentDate) {
        dateEl.addEventListener("click", function () {
          handleDateClick(currentDate);
        });
      })(thisDate);

      if (checkInDate && isSameDate(thisDate, checkInDate)) {
        dateEl.classList.add("cal-active");
      }
      if (checkOutDate && isSameDate(thisDate, checkOutDate)) {
        dateEl.classList.add("cal-active");
      }

      if (
        checkInDate &&
        checkOutDate &&
        thisDate > checkInDate &&
        thisDate < checkOutDate
      ) {
        dateEl.classList.add("cal-in-range");
      }
    }

    grid.appendChild(dateEl);
  }

  return wrapper;
}

function handleDateClick(date) {
  if (activeInputType === "checkin") {
    if (checkOutDate && date >= checkOutDate) {
      checkInDate = date;
      checkOutDate = null;
    } else {
      checkInDate = date;
    }
    activeInputType = "checkout";
  } else {
    if (checkInDate && date > checkInDate) {
      checkOutDate = date;
    } else if (checkInDate && date <= checkInDate) {
      checkInDate = date;
      checkOutDate = null;
    } else {
      checkInDate = date;
      activeInputType = "checkout";
    }
  }

  updatePanelActiveState();
  updatePanelDisplays();
  renderCalendars();
}

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDateShort(date) {
  var d = date.getDate();
  var monthName = monthNames[date.getMonth()].substring(0, 3);
  var y = date.getFullYear();
  return d + " " + monthName + " " + y;
}

function formatDateLong(date) {
  var d = date.getDate();
  var monthName = monthNames[date.getMonth()];
  var y = date.getFullYear();
  return d + " " + monthName + " " + y;
}

function resetDates() {
  checkInDate = null;
  checkOutDate = null;
  activeInputType = "checkin";
  updatePanelActiveState();
  updatePanelDisplays();
  renderCalendars();
}

// Calendar Event Listeners
checkinInput.addEventListener("click", function (e) {
  e.stopPropagation();
  if (panelDateSection.classList.contains("popup-active")) {
    activeInputType = "checkin";
    updatePanelActiveState();
  } else {
    openCalendarPopup("checkin");
  }
});

checkoutInput.addEventListener("click", function (e) {
  e.stopPropagation();
  if (panelDateSection.classList.contains("popup-active")) {
    activeInputType = "checkout";
    updatePanelActiveState();
  } else {
    openCalendarPopup("checkout");
  }
});

prevMonthBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (prevMonthBtn.classList.contains("disabled")) return;
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendars();
});

nextMonthBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (nextMonthBtn.classList.contains("disabled")) return;
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendars();
});

resetDatesBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  resetDates();
});

clearCheckinBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  checkInDate = null;
  checkOutDate = null;
  activeInputType = "checkin";
  updatePanelActiveState();
  updatePanelDisplays();
  renderCalendars();
});

clearCheckoutBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  checkOutDate = null;
  updatePanelDisplays();
  renderCalendars();
});

calendarConfirmBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  closeCalendarPopup();
});

calendarPopup.addEventListener("click", function (e) {
  e.stopPropagation();
});

// ==================== GUEST POPUP ====================
var totalAdult = 1;
var totalChild = 0;
var totalPet = 0;

var guestInput = document.getElementById("guest-input");
var guestPopup = document.getElementById("guestPopup");
var guestDisplay = document.getElementById("guestDisplay");
var adultCount = document.getElementById("adultCount");
var childCount = document.getElementById("childCount");
var petCount = document.getElementById("petCount");

function openGuestPopup() {
  closeCalendarPopup();
  guestPopup.classList.add("active");
  guestInput.classList.add("active");
  popupOverlay.classList.add("active");
}

function closeGuestPopup() {
  guestPopup.classList.remove("active");
  guestInput.classList.remove("active");
  popupOverlay.classList.remove("active");
}

function updateGuestDisplay() {
  var totalGuest = totalAdult + totalChild;
  var text = "";

  if (totalGuest === 0) {
    text = "Tambahkan Pengunjung";
    guestDisplay.classList.remove("filled");
  } else {
    text = totalGuest + " Tamu";
    if (totalPet > 0) {
      text = text + ", " + totalPet + " Hewan Peliharaan";
    }
    guestDisplay.classList.add("filled");
  }

  guestDisplay.textContent = text;
}

function updateGuestCounts() {
  adultCount.textContent = totalAdult;
  childCount.textContent = totalChild;
  petCount.textContent = totalPet;
}

function updateGuestButtons() {
  var allButtons = document.querySelectorAll(".guest-popup-btn");
  var totalGuest = totalAdult + totalChild;

  allButtons.forEach(function (btn) {
    var type = btn.getAttribute("data-type");
    var action = btn.getAttribute("data-action");

    if (action === "minus") {
      if (type === "adult") {
        btn.disabled = totalAdult <= 1;
      } else if (type === "child") {
        btn.disabled = totalChild <= 0;
      } else if (type === "pet") {
        btn.disabled = totalPet <= 0;
      }
    } else if (action === "plus") {
      if (type === "adult" || type === "child") {
        if (totalGuest >= 10) {
          btn.disabled = true;
        } else {
          if (type === "adult") {
            btn.disabled = totalAdult >= 16;
          } else if (type === "child") {
            btn.disabled = totalChild >= 16;
          }
        }
      } else if (type === "pet") {
        btn.disabled = totalPet >= 4;
      }
    }
  });
}

function handleGuestButtonClick(type, action) {
  if (type === "adult") {
    if (action === "plus" && totalAdult < 16 && totalAdult + totalChild < 10) {
      totalAdult++;
    } else if (action === "minus" && totalAdult > 1) {
      totalAdult--;
    }
  } else if (type === "child") {
    if (action === "plus" && totalChild < 16 && totalAdult + totalChild < 10) {
      totalChild++;
    } else if (action === "minus" && totalChild > 0) {
      totalChild--;
    }
  } else if (type === "pet") {
    if (action === "plus" && totalPet < 4) {
      totalPet++;
    } else if (action === "minus" && totalPet > 0) {
      totalPet--;
    }
  }

  updateGuestCounts();
  updateGuestDisplay();
  updateGuestButtons();
}

// Guest Event Listeners
guestInput.addEventListener("click", function (e) {
  e.stopPropagation();
  openGuestPopup();
});

guestPopup.addEventListener("click", function (e) {
  e.stopPropagation();
});

var guestButtons = document.querySelectorAll(".guest-popup-btn");
guestButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var type = this.getAttribute("data-type");
    var action = this.getAttribute("data-action");
    handleGuestButtonClick(type, action);
  });
});

popupOverlay.addEventListener("click", function () {
  closeCalendarPopup();
  closeGuestPopup();
});

// ==================== KEYBOARD EVENT ====================
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const rm = document.getElementById("reviewsPopup");
    if (rm) rm.classList.remove("active");
    closeCalendarPopup();
    closeGuestPopup();
    // Share popup escape is handled in share_popup.js
  }
});

// ==================== INITIALIZE ====================
updateGuestButtons();
updatePanelDisplays();
updateGuestDisplay();

console.log("Description page loaded successfully!");

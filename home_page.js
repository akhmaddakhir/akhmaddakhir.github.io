document.addEventListener("DOMContentLoaded", function () {
  const searchBarContent = document.querySelector(".search-bar-content");
  const location = document.querySelector(".search-bar-loc");
  const dateBtn = document.querySelector(".search-bar-date");
  const guest = document.querySelector(".guest-container");
  const searchBarSection = document.querySelector(".search-bar");

  let calendarPopup = null;
  let guestPopup = null;
  let searchPopup = null;

  // Function untuk set active
  function setActive(element, type) {
    // Remove semua active class
    location.classList.remove("active");
    dateBtn.classList.remove("active");
    guest.classList.remove("active");

    // Remove semua type class
    searchBarContent.classList.remove("date-active", "guest-active", "location-active");

    // Add active ke element yang diklik
    element.classList.add("active");
    searchBarContent.classList.add("has-active");

    // Add type class untuk styling spesifik
    if (type === "location") {
      searchBarContent.classList.add("location-active");
    } else if (type === "date") {
      searchBarContent.classList.add("date-active");
    } else if (type === "guest") {
      searchBarContent.classList.add("guest-active");
    }
  }

  // Function untuk close popup
  function closeCalendarPopup() {
    if (calendarPopup) {
      calendarPopup.classList.remove("active");
    }
  }

  function closeGuestPopup() {
    if (guestPopup) {
      guestPopup.classList.remove("active");
    }
  }

  function closeSearchPopup() {
    if (searchPopup) {
      searchPopup.classList.remove("active");
    }
  }

  // Function untuk cek visibility search bar
  function isSearchBarVisible() {
    const rect = searchBarSection.getBoundingClientRect();
    return rect.bottom > 0;
  }

  // Event listeners untuk search bar items
  location.addEventListener("click", function (e) {
    e.stopPropagation();
    setActive(location, "location");
    closeCalendarPopup();
    closeGuestPopup();

    if (searchPopup) {
      const isActive = searchPopup.classList.contains("active");
      if (isActive) {
        closeSearchPopup();
      } else {
        searchPopup.classList.add("active");
      }
    }
  });

  dateBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setActive(dateBtn, "date");
    closeGuestPopup();
    closeSearchPopup();

    if (calendarPopup) {
      const isActive = calendarPopup.classList.contains("active");

      if (isActive) {
        closeCalendarPopup();
      } else {
        calendarPopup.classList.add("active");
      }
    }
  });

  guest.addEventListener("click", function (e) {
    e.stopPropagation();
    setActive(guest, "guest");
    closeCalendarPopup();
    closeSearchPopup();

    if (guestPopup) {
      const isActive = guestPopup.classList.contains("active");

      if (isActive) {
        closeGuestPopup();
      } else {
        guestPopup.classList.add("active");
      }
    }
  });

  // Close active state dan popup ketika klik di luar
  document.addEventListener("click", function (e) {
    if (!searchBarContent.contains(e.target)) {
      location.classList.remove("active");
      dateBtn.classList.remove("active");
      guest.classList.remove("active");
      searchBarContent.classList.remove(
        "has-active",
        "location-active",
        "date-active",
        "guest-active"
      );
      closeCalendarPopup();
      closeGuestPopup();
      closeSearchPopup();
    }
  });

  // Scroll listener untuk auto-hide popup
  window.addEventListener("scroll", function () {
    if (!isSearchBarVisible()) {
      closeCalendarPopup();
      closeGuestPopup();
      closeSearchPopup();
      location.classList.remove("active");
      dateBtn.classList.remove("active");
      guest.classList.remove("active");
      searchBarContent.classList.remove(
        "has-active",
        "location-active",
        "date-active",
        "guest-active"
      );
    }
  });

  // Load calendar popup
  fetch("calendar_popup.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("calendar-popup").innerHTML = html;
      calendarPopup = document.getElementById("calendarPopup");

      const script = document.createElement("script");
      script.src = "calendar_popup.js";
      document.body.appendChild(script);

      if (calendarPopup) {
        calendarPopup.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }
    })
    .catch((error) => {
      console.error("Error loading calendar:", error);
    });

  // Load guest popup
  fetch("guest_popup.html")
    .then((res) => res.text())
    .then((html) => {
      const guestContainer = document.querySelector(".guest-container");
      if (guestContainer) {
        // Buat wrapper untuk guest popup
        const guestPopupWrapper = document.createElement("div");
        guestPopupWrapper.style.position = "relative";
        guestPopupWrapper.innerHTML = html;

        // Insert setelah guest container
        guestContainer.parentNode.insertBefore(
          guestPopupWrapper,
          guestContainer.nextSibling
        );

        // Set reference ke popup element
        guestPopup = document.getElementById("guestPopup");

        // Load guest script setelah HTML dimuat
        const script = document.createElement("script");
        script.src = "guest_popup.js";
        document.body.appendChild(script);

        if (guestPopup) {
          guestPopup.addEventListener("click", function (e) {
            e.stopPropagation();
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error loading guest popup:", error);
    });

  // Load search popup
  fetch("search_popup.html")
    .then((res) => res.text())
    .then((html) => {
      const locationContainer = document.querySelector(".search-bar-loc");
      if (locationContainer) {
        // Buat wrapper untuk search popup
        const searchPopupWrapper = document.createElement("div");
        searchPopupWrapper.id = "search-popup-wrapper";
        searchPopupWrapper.style.position = "relative";
        searchPopupWrapper.innerHTML = html;

        // Insert setelah location container
        locationContainer.parentNode.insertBefore(
          searchPopupWrapper,
          locationContainer.nextSibling
        );

        // Set reference ke popup element
        searchPopup = document.getElementById("searchPopup");

        // Load search script setelah HTML dimuat
        const script = document.createElement("script");
        script.src = "search_popup.js";
        document.body.appendChild(script);

        if (searchPopup) {
          searchPopup.addEventListener("click", function (e) {
            e.stopPropagation();
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error loading search popup:", error);
    });

  // Save buttons
  const saveButtons = document.querySelectorAll(
    ".save-button, .save-button-notag"
  );

  saveButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const img = button.querySelector("img");
      const currentSrc = img.getAttribute("src");

      if (currentSrc.includes("icon_save-on.svg")) {
        img.setAttribute("src", "/website_materials/icon_save.svg");
      } else {
        img.setAttribute("src", "/website_materials/icon_save-on.svg");
      }
    });
  });
});
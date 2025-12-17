const saveButtons = document.querySelectorAll(
  ".save-button, .save-button-notag"
);

saveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    const currentSrc = img.getAttribute("src");

    if (currentSrc.includes("icon_save-on.svg")) {
      img.setAttribute("src", "/website_materials/icon_save.svg");
    } else {
      img.setAttribute("src", "/website_materials/icon_save-on.svg");
    }
  });
});

// BAGIAN 1: Setup Awal
// =====================
let currentPage = 1; // Halaman yang sedang aktif (mulai dari 1)
const totalPages = 10; // Total ada 10 halaman

// Ambil elemen-elemen HTML
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const paginationNumbers = document.getElementById("paginationNumbers");

// BAGIAN 2: Fungsi Render Pagination
// ====================================
// Fungsi ini menggambar tombol-tombol angka halaman
function renderPagination() {
  // Kosongkan dulu isi pagination
  paginationNumbers.innerHTML = "";

  // LOGIKA TAMPILAN PAGINATION:
  // - Halaman 1-3: tampilkan "1, 2, 3, ..., 10"
  // - Halaman 4-8: tampilkan "1, ..., [current-1], [current], [current+1], ..., 10"
  // - Halaman 9-10: tampilkan "1, ..., 8, 9, 10"

  // Buat array berisi angka halaman yang mau ditampilkan
  let pagesToShow = [];

  if (currentPage <= 3) {
    // Kalau di halaman 1, 2, atau 3
    // Tampilkan: 1, 2, 3, ..., 10
    pagesToShow = [1, 2, 3, "dots", 10];
  } else if (currentPage >= totalPages - 2) {
    // Kalau di halaman 8, 9, atau 10
    // Tampilkan: 1, ..., 8, 9, 10
    pagesToShow = [1, "dots", 8, 9, 10];
  } else {
    // Kalau di halaman tengah (4-7)
    // Tampilkan: 1, ..., [sebelumnya], [sekarang], [sesudahnya], ..., 10
    pagesToShow = [
      1,
      "dots",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "dots",
      10,
    ];
  }

  // Loop setiap item di array pagesToShow
  pagesToShow.forEach((page) => {
    if (page === "dots") {
      // Kalau item-nya 'dots', buat titik-titik (...)
      const dots = document.createElement("span");
      dots.className = "page-dots";
      dots.textContent = "...";
      paginationNumbers.appendChild(dots);
    } else {
      // Kalau item-nya angka, buat tombol halaman
      const pageBtn = document.createElement("button");
      pageBtn.className = "page-number";
      pageBtn.textContent = page;

      // Kalau halaman ini yang sedang aktif, kasih class 'active'
      if (page === currentPage) {
        pageBtn.classList.add("active");
      }

      // Kalau tombol diklik, pindah ke halaman tersebut
      pageBtn.addEventListener("click", () => goToPage(page));

      paginationNumbers.appendChild(pageBtn);
    }
  });

  // Update status tombol Prev dan Next
  updateNavigationButtons();
}

// BAGIAN 3: Fungsi Update Tombol Navigasi
// =========================================
// Fungsi ini mengatur tombol Prev dan Next (disabled atau tidak)
function updateNavigationButtons() {
  // Kalau di halaman 1, tombol Prev jadi disabled
  if (currentPage === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  // Kalau di halaman terakhir (10), tombol Next jadi disabled
  if (currentPage === totalPages) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

// BAGIAN 4: Fungsi Pindah ke Halaman Tertentu
// =============================================
function goToPage(page) {
  // Pastikan halaman yang diminta valid (antara 1-10)
  if (page < 1 || page > totalPages) return;

  // Update halaman aktif
  currentPage = page;

  // Gambar ulang pagination
  renderPagination();

  // Scroll ke atas (opsional, biar user lihat hasil dari atas)
  window.scrollTo({ top: 0, behavior: "smooth" });

  // DI SINI NANTI KAMU BISA LOAD DATA BARU
  // Misalnya: loadCardsForPage(currentPage);
  console.log("Pindah ke halaman:", currentPage);
}

// BAGIAN 5: Event Listener untuk Tombol Prev dan Next
// =====================================================
prevBtn.addEventListener("click", () => {
  // Kalau tombol Prev diklik, mundur 1 halaman
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  // Kalau tombol Next diklik, maju 1 halaman
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
});

// BAGIAN 6: Inisialisasi
// =======================
// Jalankan pertama kali saat page load
renderPagination();

const mapSearch = L.map("mapSearch", {
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
).addTo(mapSearch);

L.marker([-7.7956, 110.3695], { icon: customMarker }).addTo(mapSearch);

// Zoom buttons
document.getElementById("zoom-in").onclick = () => mapSearch.zoomIn();
document.getElementById("zoom-out").onclick = () => mapSearch.zoomOut();

// Load language / currency popup (same pattern as filter)
let languagePopup = null;
const langToggle = document.getElementById("lang-currency-toggle");
const berandaLink = document.querySelector(
  'nav ul li a[href="home_page.html"]'
);

fetch("language-currency_popup.html")
  .then((res) => res.text())
  .then((html) => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    languagePopup =
      document.getElementById("languageCurrencyPopup") ||
      document.getElementById("language-popup") ||
      document.querySelector(".language-currency-popup");

    const script = document.createElement("script");
    script.src = "language-currency_popup.js";
    document.body.appendChild(script);

    if (languagePopup) {
      // Fungsi untuk close popup dan kembalikan ke Beranda
      function closeLanguagePopup() {
        languagePopup.classList.remove("active");
        document.body.style.overflow = "";
        if (langToggle) {
          langToggle.classList.remove("nav-active");
          langToggle.setAttribute("aria-expanded", "false");
        }
        // Kembalikan active ke Beranda
        if (berandaLink) {
          berandaLink.classList.add("nav-active");
        }
      }

      // Observer untuk mendeteksi perubahan pada popup (ketika option dipilih dan popup tertutup)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const isActive = languagePopup.classList.contains("active");
            // Jika popup tidak active lagi, kembalikan ke Beranda
            if (!isActive && langToggle.classList.contains("nav-active")) {
              langToggle.classList.remove("nav-active");
              if (berandaLink) {
                berandaLink.classList.add("nav-active");
              }
            }
          }
        });
      });

      observer.observe(languagePopup, { attributes: true });

      // Close when clicking overlay
      languagePopup.addEventListener("click", function (e) {
        if (e.target === languagePopup) {
          closeLanguagePopup();
        }
      });

      // Tunggu script language-currency_popup.js selesai load, lalu attach event ke options
      setTimeout(() => {
        // Close ketika tombol X diklik
        const closeButton = languagePopup.querySelector(
          ".close-button, .close-btn, button[class*='close'], .lc-close"
        );
        if (closeButton) {
          closeButton.addEventListener("click", function (e) {
            e.stopPropagation();
            closeLanguagePopup();
          });
        }

        // Close ketika memilih option (language atau currency)
        const allOptions = languagePopup.querySelectorAll(
          ".language-option, .currency-option, .lc-option, [data-lang], [data-currency]"
        );
        allOptions.forEach((option) => {
          option.addEventListener("click", function () {
            // Tunggu sebentar agar popup tertutup oleh script aslinya
            setTimeout(() => {
              closeLanguagePopup();
            }, 100);
          });
        });
      }, 500);

      // Prevent closing when clicking inside the content area
      const inner = languagePopup.querySelector(
        ".language-section, .lc-section, .popup-section, .filter-section"
      );
      if (inner) {
        inner.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }

      // Toggle popup when clicking the navbar language/currency toggle
      if (langToggle) {
        langToggle.addEventListener("click", function (e) {
          e.stopPropagation();
          const isActive = languagePopup.classList.contains("active");
          if (isActive) {
            closeLanguagePopup();
          } else {
            languagePopup.classList.add("active");
            document.body.style.overflow = "hidden";
            langToggle.classList.add("nav-active");
            langToggle.setAttribute("aria-expanded", "true");
            // Remove active dari Beranda
            if (berandaLink) {
              berandaLink.classList.remove("nav-active");
            }
          }
        });
      }
    }
  })
  .catch((error) => {
    console.error("Error loading language/currency popup:", error);
  });

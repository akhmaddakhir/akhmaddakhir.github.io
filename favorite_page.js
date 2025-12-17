 // Load language / currency popup (same pattern as filter)
  let languagePopup = null;
  const langToggle = document.getElementById("lang-currency-toggle");
  const berandaLink = document.querySelector('nav ul li a[href="home_page.html"]');

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
            if (mutation.attributeName === 'class') {
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
          const closeButton = languagePopup.querySelector(".close-button, .close-btn, button[class*='close'], .lc-close");
          if (closeButton) {
            closeButton.addEventListener("click", function (e) {
              e.stopPropagation();
              closeLanguagePopup();
            });
          }

          // Close ketika memilih option (language atau currency)
          const allOptions = languagePopup.querySelectorAll(".language-option, .currency-option, .lc-option, [data-lang], [data-currency]");
          allOptions.forEach(option => {
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

  // Save buttons
  const saveButtons = document.querySelectorAll(
    ".save-button, .save-button-notag"
  );
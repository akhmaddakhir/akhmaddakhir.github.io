const langTab = document.getElementById("langTab");
const currencyTab = document.getElementById("currencyTab");
const languageContent = document.getElementById("languageContent");
const currencyContent = document.getElementById("currencyContent");
const languageList = document.getElementById("languageList");
const currencyList = document.getElementById("currencyList");
const langRecommendedList = document.getElementById("langRecommendedList");
const currRecommendedList = document.getElementById("currRecommendedList");
const langRecommendedSection = document.getElementById(
  "langRecommendedSection"
);
const currRecommendedSection = document.getElementById(
  "currRecommendedSection"
);

// Overlay and close controls (may be present when injected into main page)
const overlay = document.getElementById("languageCurrencyPopup");
const closeBtn = document.querySelector(".close-button");
const pageToggle = document.getElementById("lang-currency-toggle");

function closePopup() {
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
  if (pageToggle) pageToggle.setAttribute("aria-expanded", "false");
}

if (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closePopup();
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closePopup();
  });
}

// TAB SWITCHING
currencyTab.addEventListener("click", () => {
  langTab.classList.remove("header-selected");
  langTab.classList.add("header-item");
  currencyTab.classList.remove("header-item");
  currencyTab.classList.add("header-selected");

  languageContent.classList.add("hidden");
  currencyContent.classList.remove("hidden");

  updateHeader("currency");
});

langTab.addEventListener("click", () => {
  langTab.classList.remove("header-item");
  langTab.classList.add("header-selected");
  currencyTab.classList.remove("header-selected");
  currencyTab.classList.add("header-item");

  languageContent.classList.remove("hidden");
  currencyContent.classList.add("hidden");

  updateHeader("language");
});

// UPDATE HEADER
function updateHeader(type) {
  const header = document.getElementById("mainHeader");
  if (type === "language") {
    header.innerHTML = `
            <div class="header-selected" id="langTab">
              <p>Bahasa dan Wilayah</p>
              <hr class="header-underline" />
            </div>
            <a class="header-item" id="currencyTab" style="cursor: pointer;">Mata Uang</a>
          `;
  } else {
    header.innerHTML = `
            <a class="header-item" id="langTab" style="cursor: pointer;">Bahasa dan Wilayah</a>
            <div class="header-selected" id="currencyTab">
              <p>Mata Uang</p>
              <hr class="header-underline" />
            </div>
          `;
  }
  attachTabListeners();
}

function attachTabListeners() {
  const langTab = document.getElementById("langTab");
  const currencyTab = document.getElementById("currencyTab");

  currencyTab.addEventListener("click", () => {
    langTab.classList.remove("header-selected");
    langTab.classList.add("header-item");
    currencyTab.classList.remove("header-item");
    currencyTab.classList.add("header-selected");

    languageContent.classList.add("hidden");
    currencyContent.classList.remove("hidden");

    updateHeader("currency");
  });

  langTab.addEventListener("click", () => {
    langTab.classList.remove("header-item");
    langTab.classList.add("header-selected");
    currencyTab.classList.remove("header-selected");
    currencyTab.classList.add("header-item");

    languageContent.classList.remove("hidden");
    currencyContent.classList.add("hidden");

    updateHeader("language");
  });
}

// LANGUAGE SELECTION
function setupLanguageListeners() {
  const languageItems = languageList.querySelectorAll(".item, .item-selected");
  languageItems.forEach((item) => {
    item.removeEventListener("click", handleLanguageClick);
    item.addEventListener("click", handleLanguageClick);
  });
}

function handleLanguageClick(e) {
  const item = e.currentTarget;
  const language = item.dataset.language;
  const country = item.dataset.country;

  const selected = languageList.querySelector(".item-selected");
  if (selected && selected !== item) {
    selected.classList.remove("item-selected");
    selected.classList.add("item");
  }

  item.classList.remove("item");
  item.classList.add("item-selected");

  const selectedElement = item.cloneNode(true);
  languageList.insertBefore(selectedElement, languageList.firstChild);

  selectedElement.addEventListener("click", handleLanguageClick);
  item.remove();
  // close popup after selection
  closePopup();
}

// RECOMMENDED LANGUAGE SELECTION
const langRecommendedItems = langRecommendedList.querySelectorAll(".item");
langRecommendedItems.forEach((item) => {
  item.addEventListener("click", function () {
    const language = this.dataset.language;
    const country = this.dataset.country;

    // Find matching item in main list
    const mainListItems = languageList.querySelectorAll(
      ".item, .item-selected"
    );
    let matchingItem = null;
    for (let i = 0; i < mainListItems.length; i++) {
      if (
        mainListItems[i].dataset.language === language &&
        mainListItems[i].dataset.country === country
      ) {
        matchingItem = mainListItems[i];
        break;
      }
    }

    if (matchingItem) {
      matchingItem.click();
    }

    // Clear all items from recommended list
    langRecommendedList.innerHTML = "";
    langRecommendedSection.classList.add("hidden");
  });
});

// CURRENCY SELECTION
function setupCurrencyListeners() {
  const currencyItems = currencyList.querySelectorAll(".item, .item-selected");
  currencyItems.forEach((item) => {
    item.removeEventListener("click", handleCurrencyClick);
    item.addEventListener("click", handleCurrencyClick);
  });
}

function handleCurrencyClick(e) {
  const item = e.currentTarget;
  const selected = currencyList.querySelector(".item-selected");
  if (selected && selected !== item) {
    selected.classList.remove("item-selected");
    selected.classList.add("item");
  }

  item.classList.remove("item");
  item.classList.add("item-selected");

  const selectedElement = item.cloneNode(true);
  currencyList.insertBefore(selectedElement, currencyList.firstChild);

  selectedElement.addEventListener("click", handleCurrencyClick);
  item.remove();
  // close popup after selection
  closePopup();
}

// RECOMMENDED CURRENCY SELECTION
const currRecommendedItems = currRecommendedList.querySelectorAll(".item");
currRecommendedItems.forEach((item) => {
  item.addEventListener("click", function () {
    const currency = this.dataset.currency;
    const symbol = this.dataset.symbol;

    // Find matching item in main list
    const mainListItems = currencyList.querySelectorAll(
      ".item, .item-selected"
    );
    let matchingItem = null;
    for (let i = 0; i < mainListItems.length; i++) {
      if (
        mainListItems[i].dataset.currency === currency &&
        mainListItems[i].dataset.symbol === symbol
      ) {
        matchingItem = mainListItems[i];
        break;
      }
    }

    if (matchingItem) {
      matchingItem.click();
    }

    // Clear all items from recommended list
    currRecommendedList.innerHTML = "";
    currRecommendedSection.classList.add("hidden");
  });
});

setupLanguageListeners();
setupCurrencyListeners();

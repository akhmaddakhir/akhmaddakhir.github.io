const openShareBtn = document.getElementById("share-button");
const sharePopup = document.getElementById("sharePopup");
const closeShareBtn = sharePopup
  ? sharePopup.querySelector(".close-button")
  : null;
const shareFriendBtn = sharePopup
  ? sharePopup.querySelector(".share-friend-button")
  : null;
const copyLinkBtn = sharePopup
  ? sharePopup.querySelector(".copy-link-button")
  : null;

// Ensure popup hidden initially
if (sharePopup) {
  sharePopup.style.display = sharePopup.classList.contains("active")
    ? "flex"
    : "none";
}

function openPopup() {
  if (!sharePopup) return;
  sharePopup.style.display = "flex";
  sharePopup.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePopup() {
  if (!sharePopup) return;
  sharePopup.classList.remove("active");
  sharePopup.style.display = "none";
  document.body.style.overflow = "";
}

if (openShareBtn) openShareBtn.addEventListener("click", openPopup);
if (closeShareBtn) closeShareBtn.addEventListener("click", closePopup);
if (shareFriendBtn) shareFriendBtn.addEventListener("click", closePopup);

// Close when clicking overlay
window.addEventListener("click", (event) => {
  if (!sharePopup) return;
  if (event.target === sharePopup) closePopup();
});

// Copy link functionality (change BG to green and text)
if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", function () {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        // Ensure a single span holds the button text to avoid duplicates
        let textSpan = copyLinkBtn.querySelector("span.copy-text");
        if (!textSpan) {
          // collect existing text nodes and remove them
          let existingText = "";
          Array.from(copyLinkBtn.childNodes).forEach((n) => {
            if (n.nodeType === Node.TEXT_NODE) {
              existingText += n.textContent.trim();
              copyLinkBtn.removeChild(n);
            }
          });
          textSpan = document.createElement("span");
          textSpan.className = "copy-text";
          textSpan.textContent = existingText || "Salin Link";
          copyLinkBtn.appendChild(textSpan);
        }

        // visual feedback
        textSpan.textContent = "Link tersalin!";
        copyLinkBtn.classList.add("copied");
        copyLinkBtn.style.backgroundColor = "#e8f5e9";
        copyLinkBtn.style.color = "#000";

        setTimeout(() => {
          textSpan.textContent = "Salin Link";
          copyLinkBtn.classList.remove("copied");
          copyLinkBtn.style.backgroundColor = "";
          copyLinkBtn.style.color = "";
        }, 2000);
      })
      .catch(() => {
        // fallback copy
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (e) {
          console.error("Copy failed", e);
        }
        document.body.removeChild(ta);
      });
  });
}

const saveButton = document.querySelectorAll(".save-on-button");

saveButton.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    if (!img) return;

    const currentSrc = img.getAttribute("src") || "";

    if (
      currentSrc.includes("icon_save-on.svg") ||
      currentSrc.includes("icon_save_on.svg")
    ) {
      img.setAttribute("src", "/website_materials/icon_save.svg");
    } else {
      img.setAttribute("src", "/website_materials/icon_save-on.svg");
    }
  });
});

// Like / Dislike buttons (per-card) - robust handlers to avoid uncaught errors
const likeBtns = document.querySelectorAll(".like-button");
const dislikeBtns = document.querySelectorAll(".dislike-button");

likeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const img = btn.querySelector("img");
    if (!img) return;
    const src = img.getAttribute("src") || "";
    const isOn = src.includes("icon_like-on.svg");
    img.setAttribute(
      "src",
      isOn
        ? "/website_materials/icon_like.svg"
        : "/website_materials/icon_like-on.svg"
    );

    // turn off dislike in same card
    const card = btn.closest(".card");
    if (card) {
      const disImg = card.querySelector(".dislike-button img");
      if (disImg)
        disImg.setAttribute("src", "/website_materials/icon_dislike.svg");
    }
  });
});

dislikeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const img = btn.querySelector("img");
    if (!img) return;
    const src = img.getAttribute("src") || "";
    const isOn = src.includes("icon_dislike-on.svg");
    img.setAttribute(
      "src",
      isOn
        ? "/website_materials/icon_dislike.svg"
        : "/website_materials/icon_dislike-on.svg"
    );

    // turn off like in same card
    const card = btn.closest(".card");
    if (card) {
      const likeImg = card.querySelector(".like-button img");
      if (likeImg)
        likeImg.setAttribute("src", "/website_materials/icon_like.svg");
    }
  });
});

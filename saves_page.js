const openSharePopup = document.getElementById("share-button");
const closeSharePopup = document.querySelector(".close-button");
const sharePopup = document.getElementById("sharePopup");

function openPopup() {
  sharePopup.classList.add("active");
}

function closePopup() {
  sharePopup.classList.remove("active");
}

openSharePopup.addEventListener("click", openPopup);

closeSharePopup.addEventListener("click", closePopup);

window.addEventListener("click", (event) => {
  if (event.target === sharePopup) {
    closePopup();
  }
});

const saveButton = document.querySelectorAll(".save-on-button");

saveButton.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");

    const currentSrc = img.getAttribute("src");

    if (currentSrc.includes("icon_save_fill.svg")) {
      img.setAttribute("src", "/website_materials/icon_save.svg");
    } else {
      img.setAttribute("src", "/website_materials/icon_save_fill.svg");
    }
  });
});

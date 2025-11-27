fetch("filter_popup.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("filter-popup").innerHTML = html;

    const openFilterPopup = document.getElementById("filter-button");
    const closeFilterPopup = document.querySelector(".confirmBtn");
    const filterPopup = document.getElementById("filterPopup");

    function openPopup() {
      filterPopup.classList.add("active");
    }

    function closePopup() {
     filterPopup.classList.remove("active");
    }

    openfilterPopup.addEventListener("click", openPopup);

    closefilterPopup.addEventListener("click", closePopup);

    window.addEventListener("click", (event) => {
      if (event.target === filterPopup) {
        closePopup();
      }
    });
  });

const saveButtons = document.querySelectorAll(".save-button, .save-button-notag");

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
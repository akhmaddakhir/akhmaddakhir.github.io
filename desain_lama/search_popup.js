var searchInput = document.querySelector(".search-bar-loc .item-input");
var destinationItems = document.querySelectorAll(".destination-content");
var searchPopup = document.getElementById("searchPopup");

// Handle klik pada setiap destinasi
destinationItems.forEach(function (item) {
  item.addEventListener("click", function () {
    var location = this.getAttribute("data-location");

    if (searchInput) {
      searchInput.value = location;
      searchInput.classList.add("filled");
    }

    // Tutup popup setelah memilih
    if (searchPopup) {
      searchPopup.classList.remove("active");
    }

    // Remove active states
    var locationContainer = document.querySelector(".search-bar-loc");
    if (locationContainer) {
      locationContainer.classList.remove("active");
    }

    var searchBarContent = document.querySelector(".search-bar-content");
    if (searchBarContent) {
      searchBarContent.classList.remove("has-active", "location-active");
    }
  });
});

// Make input text bold when user types or when value present
if (searchInput) {
  // toggle class on input events
  searchInput.addEventListener("input", function () {
    if (this.value && this.value.trim().length > 0) {
      this.classList.add("filled");
    } else {
      this.classList.remove("filled");
    }
  });
}

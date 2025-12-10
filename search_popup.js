var searchInput = document.querySelector(".search-bar-loc .item-input");
var destinationItems = document.querySelectorAll(".destination-content");
var searchPopup = document.getElementById("searchPopup");

// Handle klik pada setiap destinasi
destinationItems.forEach(function(item) {
  item.addEventListener("click", function () {
    var location = this.getAttribute("data-location");
    
    if (searchInput) {
      searchInput.value = location;
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
var totalAdult = 1;
var totalChild = 0;
var totalPet = 0;

var guestPopup = document.getElementById("guestPopup");
var guestDisplay = document.querySelector(".guest-container .item-content");
var adultCount = document.getElementById("adultCount");
var childCount = document.getElementById("childCount");
var petCount = document.getElementById("petCount");

function openGuestPopup() {
  if (guestPopup) {
    guestPopup.classList.add("active");
  }
}

function closeGuestPopup() {
  if (guestPopup) {
    guestPopup.classList.remove("active");
  }
}

function updateGuestDisplay() {
  if (!guestDisplay) return;
  
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
  if (adultCount) adultCount.textContent = totalAdult;
  if (childCount) childCount.textContent = totalChild;
  if (petCount) petCount.textContent = totalPet;
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

// Event listeners
if (guestPopup) {
  guestPopup.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

var guestButtons = document.querySelectorAll(".guest-popup-btn");
guestButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var type = this.getAttribute("data-type");
    var action = this.getAttribute("data-action");
    handleGuestButtonClick(type, action);
  });
});

// Initialize
updateGuestButtons();
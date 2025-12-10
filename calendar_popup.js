const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// Start dari hari ini
const start = new Date();
start.setHours(0, 0, 0, 0);

// End adalah tepat 1 tahun dari hari ini (365 hari)
const end = new Date(start);
end.setDate(end.getDate() + 365);

let currentYear = start.getFullYear();
let currentMonth = start.getMonth();

let checkInDate = null;
let checkOutDate = null;

const container = document.getElementById("calendar-container");
const m1Label = document.getElementById("m1Label");
const m2Label = document.getElementById("m2Label");
const btnPrev = document.getElementById("prevGlobal");
const btnNext = document.getElementById("nextGlobal");

renderCalendars();
updateHeader();

function renderCalendars() {
  container.innerHTML = "";

  const cal1 = createCalendar(currentYear, currentMonth);

  const nextMonth = (currentMonth + 1) % 12;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const cal2 = createCalendar(nextYear, nextMonth);

  container.appendChild(cal1);
  container.appendChild(cal2);

  updateHeader();
}

function updateHeader() {
  const m1 = `${monthNames[currentMonth]} ${currentYear}`;

  let nm = (currentMonth + 1) % 12;
  let ny = currentMonth === 11 ? currentYear + 1 : currentYear;

  const m2 = `${monthNames[nm]} ${ny}`;

  m1Label.textContent = m1;
  m2Label.textContent = m2;

  if (
    currentYear === start.getFullYear() &&
    currentMonth === start.getMonth()
  ) {
    btnPrev.classList.add("month-arrow-disabled");
  } else {
    btnPrev.classList.remove("month-arrow-disabled");
  }

  if (currentYear === end.getFullYear() && currentMonth === end.getMonth()) {
    btnNext.classList.add("month-arrow-disabled");
  } else {
    btnNext.classList.remove("month-arrow-disabled");
  }
}

function createCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const offset = (firstDay + 6) % 7;

  const div = document.createElement("div");
  div.classList.add("calendar-content");

  div.innerHTML = `<div class="calendar-grid"></div>`;

  const grid = div.querySelector(".calendar-grid");

  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  days.forEach((d) => {
    const el = document.createElement("div");
    el.classList.add("calendar-day");
    el.textContent = d;
    grid.appendChild(el);
  });

  for (let i = 0; i < offset; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = document.createElement("div");
    date.classList.add("calendar-date");
    date.textContent = d;

    const thisDate = new Date(year, month, d);
    thisDate.setHours(0, 0, 0, 0);

    // Disable jika sebelum hari ini atau lebih dari 1 tahun
    if (thisDate < start || thisDate > end) {
      date.classList.add("date-disabled");
    } else {
      date.addEventListener("click", () => handleDateClick(thisDate, date));

      // Check if this date is selected
      if (checkInDate && isSameDate(thisDate, checkInDate)) {
        date.classList.add("active");
      }
      if (checkOutDate && isSameDate(thisDate, checkOutDate)) {
        date.classList.add("active");
      }

      // Check if this date is in range
      if (
        checkInDate &&
        checkOutDate &&
        thisDate > checkInDate &&
        thisDate < checkOutDate
      ) {
        date.classList.add("in-range");

        // Cek posisi di grid (hari dalam seminggu)
        const dayOfWeek = thisDate.getDay();
        const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Senin = 0, Minggu = 6

        // Tambah class untuk corner radius
        if (adjustedDay === 0) {
          // Senin (awal baris)
          date.classList.add("start-of-week");
        }
        if (adjustedDay === 6) {
          // Minggu (akhir baris)
          date.classList.add("end-of-week");
        }

        // Check jika ini tanggal pertama atau terakhir dalam range
        const nextDay = new Date(thisDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const prevDay = new Date(thisDate);
        prevDay.setDate(prevDay.getDate() - 1);

        if (prevDay.getTime() === checkInDate.getTime()) {
          date.classList.add("range-start");
        }
        if (nextDay.getTime() === checkOutDate.getTime()) {
          date.classList.add("range-end");
        }
      }
    }

    grid.appendChild(date);
  }

  return div;
}

function handleDateClick(date) {
  if (!checkInDate || (checkInDate && checkOutDate)) {
    // Set check-in
    checkInDate = date;
    checkOutDate = null;
  } else if (date > checkInDate) {
    // Set check-out
    checkOutDate = date;
  } else {
    // Reset and set new check-in
    checkInDate = date;
    checkOutDate = null;
  }

  renderCalendars();
}

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

btnPrev.addEventListener("click", () => {
  if (btnPrev.classList.contains("month-arrow-disabled")) return;

  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendars();
});

btnNext.addEventListener("click", () => {
  if (btnNext.classList.contains("month-arrow-disabled")) return;

  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendars();
});
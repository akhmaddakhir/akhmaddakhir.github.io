  const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      // batas 12 bulan dari sekarang
      const start = new Date();
      const end = new Date(start.getFullYear(), start.getMonth() + 11, 1);

      let currentYear = start.getFullYear();
      let currentMonth = start.getMonth(); // bulan awal

      const container = document.getElementById("calendar-container");
      const m1Label = document.getElementById("m1Label");
      const m2Label = document.getElementById("m2Label");
      const btnPrev = document.getElementById("prevGlobal");
      const btnNext = document.getElementById("nextGlobal");

      renderCalendars();
      updateHeader();

      /* =====================================================
           RENDER 2 BULAN
      =====================================================*/
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

      /* =====================================================
           HEADER GLOBAL (2 BULAN)
      =====================================================*/
      function updateHeader() {
        const m1 = `${monthNames[currentMonth]} ${currentYear}`;

        let nm = (currentMonth + 1) % 12;
        let ny = currentMonth === 11 ? currentYear + 1 : currentYear;

        const m2 = `${monthNames[nm]} ${ny}`;

        m1Label.textContent = m1;
        m2Label.textContent = m2;

        // disable prev jika sudah mentok bulan awal
        if (currentYear === start.getFullYear() && currentMonth === start.getMonth()) {
          btnPrev.classList.add("month-arrow-disabled");
        } else {
          btnPrev.classList.remove("month-arrow-disabled");
        }

        // disable next jika sudah 12 bulan ke depan
        if (currentYear === end.getFullYear() && currentMonth === end.getMonth()) {
          btnNext.classList.add("month-arrow-disabled");
        } else {
          btnNext.classList.remove("month-arrow-disabled");
        }
      }

      /* =====================================================
           BUAT 1 KALENDER
      =====================================================*/
      function createCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        const offset = (firstDay + 6) % 7;

        const div = document.createElement("div");
        div.classList.add("calendar-content");

        div.innerHTML = `
          <div class="calendar-grid"></div>
        `;

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

          // disable tanggal lewat
          if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            date.classList.add("date-disabled");
          }

          grid.appendChild(date);
        }

        return div;
      }

      /* =====================================================
           NAVIGASI GLOBAL
      =====================================================*/
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
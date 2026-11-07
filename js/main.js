(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var mount2026 = document.getElementById("contact-calendar-2026");
  var mount2027 = document.getElementById("contact-calendar-2027");
  if (!mount2026 && !mount2027) return;

  var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  if (mount2026) {
    // November and December 2026 beside Contact
    mount2026.appendChild(buildMonth(2026, 10));
    mount2026.appendChild(buildMonth(2026, 11));
  }

  if (mount2027) {
    var year = parseInt(mount2027.getAttribute("data-year") || "2027", 10);
    var frag = document.createDocumentFragment();
    var monthIndex;
    for (monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      frag.appendChild(buildMonth(year, monthIndex));
    }
    mount2027.appendChild(frag);
  }

  function buildMonth(year, monthIndex) {
    var article = document.createElement("article");
    article.className = "calendar-month";
    article.setAttribute("aria-label", MONTHS[monthIndex] + " " + year);

    var title = document.createElement("h3");
    title.className = "calendar-month-title";
    title.textContent = MONTHS[monthIndex] + " " + year;
    article.appendChild(title);

    var weekdays = document.createElement("div");
    weekdays.className = "calendar-weekdays";
    weekdays.setAttribute("aria-hidden", "true");
    WEEKDAYS.forEach(function (label) {
      var span = document.createElement("span");
      span.textContent = label;
      weekdays.appendChild(span);
    });
    article.appendChild(weekdays);

    var days = document.createElement("div");
    days.className = "calendar-days";

    var firstDow = new Date(year, monthIndex, 1).getDay();
    var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    var i;

    for (i = 0; i < firstDow; i += 1) {
      var empty = document.createElement("span");
      empty.className = "is-empty";
      empty.textContent = "·";
      days.appendChild(empty);
    }

    for (i = 1; i <= daysInMonth; i += 1) {
      var cell = document.createElement("span");
      var date = new Date(year, monthIndex, i);
      var dow = date.getDay();
      cell.textContent = String(i);

      if (date.getTime() === today.getTime()) {
        cell.className = "is-today";
        cell.setAttribute("aria-current", "date");
        cell.setAttribute("title", "Today");
      } else if (date < today) {
        cell.className = "is-past";
      } else if (dow === 0 || dow === 6) {
        cell.className = "is-weekend";
      }

      days.appendChild(cell);
    }

    article.appendChild(days);
    return article;
  }
})();

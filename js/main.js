(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var mount = document.getElementById("contact-calendar");
  if (!mount) return;

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
  var endYear = parseInt(mount.getAttribute("data-end-year") || "2027", 10);

  var cursor = new Date(today.getFullYear(), today.getMonth(), 1);
  var end = new Date(endYear, 11, 1);
  var frag = document.createDocumentFragment();

  while (cursor <= end) {
    frag.appendChild(buildMonth(cursor.getFullYear(), cursor.getMonth()));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  mount.appendChild(frag);

  function buildMonth(year, monthIndex) {
    var article = document.createElement("article");
    article.className = "calendar-month";
    article.setAttribute(
      "aria-label",
      MONTHS[monthIndex] + " " + year
    );

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

/* GM Energy – site scripts (no libraries required) */
(function () {
  "use strict";

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  function closeNav() {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });

  /* ---------- Header shadow, back-to-top, active link ---------- */
  var header = document.getElementById("header");
  var toTop = document.getElementById("toTop");
  var links = Array.prototype.slice.call(nav.querySelectorAll("a:not(.btn)"));
  var sections = links.map(function (l) { return document.querySelector(l.getAttribute("href")); });

  function onScroll() {
    var sc = window.scrollY;
    header.classList.toggle("scrolled", sc > 10);
    toTop.classList.toggle("show", sc > 600);
    var pos = sc + 140, current = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= pos) current = i; });
    links.forEach(function (l, i) { l.classList.toggle("active", i === current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Hero slider ---------- */
  var slides = document.querySelectorAll(".slide");
  var dotsWrap = document.querySelector(".slider-dots");
  var idx = 0, timer = null, DELAY = 6000;

  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "Go to slide " + (i + 1));
    b.addEventListener("click", function () { go(i); restart(); });
    dotsWrap.appendChild(b);
  });
  var dots = dotsWrap.querySelectorAll("button");

  function go(n) {
    slides[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add("active");
    dots[idx].classList.add("active");
  }
  function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, DELAY); }
  dots[0].classList.add("active");
  document.querySelector(".slider-arrow.next").addEventListener("click", function () { go(idx + 1); restart(); });
  document.querySelector(".slider-arrow.prev").addEventListener("click", function () { go(idx - 1); restart(); });
  restart();

  // swipe on touch devices
  var hero = document.querySelector(".hero"), sx = 0;
  hero.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { go(idx + (dx < 0 ? 1 : -1)); restart(); }
  });
  document.addEventListener("visibilitychange", function () { document.hidden ? clearInterval(timer) : restart(); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Enquiry form (opens email app; no server needed) ---------- */
  var form = document.getElementById("enquiryForm");
  var note = document.getElementById("formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (f) {
      var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) {
      note.textContent = "Please fill in the required fields marked *.";
      note.className = "form-note err";
      return;
    }
    var d = new FormData(form);
    var subject = "Website Enquiry: " + d.get("type") + " – " + d.get("name");
    var body =
      "Name: " + d.get("name") + "\n" +
      "Company: " + (d.get("company") || "-") + "\n" +
      "Email: " + d.get("email") + "\n" +
      "Phone: " + d.get("phone") + "\n" +
      "Requirement: " + d.get("type") + "\n\n" +
      d.get("message");
    window.location.href = "mailto:info@gmenergy.in?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    note.textContent = "Thank you! Your email app has opened — just press Send. You can also call +91 99749 88864.";
    note.className = "form-note ok";
  });
})();

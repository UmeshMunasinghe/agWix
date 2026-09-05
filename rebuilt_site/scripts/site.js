"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (window.location.hash === "#contact") {
  document.getElementById("contact")?.scrollIntoView({ block: "start" });
}

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  }),
  { threshold: 0.12 },
);
document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

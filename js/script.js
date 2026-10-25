/* =========================================================
   script.js — navbar, highlight menu, lightbox sertifikat
   ========================================================= */

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
  navMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navMenu.classList.remove("active"))
  );
}

/* ---------- Highlight menu sesuai posisi scroll (index.html) ---------- */
const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sections = [...navLinks]
  .map((l) => document.getElementById(l.dataset.section))
  .filter(Boolean);

if (sections.length) {
  const setActive = () => {
    const y = window.scrollY + 140;
    let current = sections[0].id;
    sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    navLinks.forEach((l) => l.classList.toggle("active", l.dataset.section === current));
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

/* ---------- Lightbox (halaman certificates-member-N.html) ---------- */
const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const close = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      if (!img) return; // gambar belum ada
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  lightbox.addEventListener("click", (e) => { if (e.target !== lightboxImg) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

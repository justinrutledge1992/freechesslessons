console.log("main.js loaded");

async function loadPartial(id, url, callback) {
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`No element with id="${id}" found.`);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to load ${url}:`, response.status);
      return;
    }

    const html = await response.text();
    container.innerHTML = html;
    if (typeof callback === "function") callback();
    console.log(`${url} loaded into #${id}`);

  } catch (err) {
    console.error(`Error loading ${url}:`, err);
  }
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("is-open");
  });
}

function setActiveNavLink() {
  const links = document.querySelectorAll(".nav-links a");
  if (!links.length) return;

  let path = window.location.pathname.split("/").pop();
  if (!path) path = "index.html";

  const pageKey = path.replace(".html", "") || "index";

  links.forEach((link) => {
    if (link.dataset.page === pageKey) {
      link.classList.add("is-active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("site-header", "partials/header.html", () => {
    setupNav();
    setActiveNavLink();
  });

  loadPartial("site-footer", "partials/footer.html", () => {
    // update year after footer loads
    const yearSpan = document.querySelector("#site-footer #year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });
});

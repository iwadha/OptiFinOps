// Create this as src/scripts/smoothScroll.js
export function initSmoothScroll() {
  document.addEventListener("DOMContentLoaded", () => {
    // Get all links that have hash fragments
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL without jumping
        window.history.pushState(null, "", targetId);
      });
    });
  });
}

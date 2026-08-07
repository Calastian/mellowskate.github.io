// Home page scroll functionality
(function () {
  "use strict";

  // Easing function for smooth animation
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  // Smooth scroll animation function
  function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  function initializeScrollIndicator() {
    // Only run on home page - check for company-brand or hero-section
    if (
      !document.querySelector(".company-brand") &&
      !document.querySelector(".company-header")
    )
      return;

    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (!scrollIndicator) return;

    // Clean setup - remove existing listeners
    const newIndicator = scrollIndicator.cloneNode(true);
    scrollIndicator.parentNode.replaceChild(newIndicator, scrollIndicator);

    // Click handler
    newIndicator.addEventListener("click", function (e) {
      e.preventDefault();

      // Try to find the services section first, then fallback to other sections
      const servicesSection =
        document.querySelector("#services") ||
        document.querySelector(".services-section");
      const heroSection = document.querySelector(".hero-section");
      let targetPosition;

      if (servicesSection) {
        // Scroll to services section, accounting for any fixed header
        targetPosition = servicesSection.offsetTop - 70;
      } else if (heroSection) {
        // Fallback to hero section
        targetPosition = heroSection.offsetTop - 70;
      } else {
        // Last fallback: scroll one viewport height
        targetPosition = window.innerHeight - 70;
      }

      smoothScrollTo(Math.max(0, targetPosition));
    });

    // Interactive styles
    newIndicator.style.cursor = "pointer";
    newIndicator.style.userSelect = "none";

    // Hover effects
    newIndicator.addEventListener("mouseenter", () => {
      newIndicator.style.transform = "translateX(-50%) scale(1.1)";
    });

    newIndicator.addEventListener("mouseleave", () => {
      newIndicator.style.transform = "translateX(-50%) scale(1)";
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeScrollIndicator);
  } else {
    initializeScrollIndicator();
  }
})();

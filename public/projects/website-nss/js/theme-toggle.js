document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const themeToggleButton = document.querySelector(
    ".theme-toggle-button-modern"
  );
  if (themeToggleButton) {
    // Set initial theme state
    if (localStorage.getItem("darkMode") === "enabled") {
      // Ensure both html and body have the class
      document.body.classList.add("dark-theme");
      document.documentElement.classList.add("dark-theme");
    }

    themeToggleButton.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-theme");

      if (isDarkMode) {
        document.body.classList.remove("dark-theme");
        document.documentElement.classList.remove("dark-theme");
        localStorage.setItem("darkMode", "disabled");
      } else {
        document.body.classList.add("dark-theme");
        document.documentElement.classList.add("dark-theme");
        localStorage.setItem("darkMode", "enabled");
      }
    });
  }

  // Mobile Menu Toggle Functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !mobileMenuToggle.contains(e.target) &&
        !mobileNav.contains(e.target)
      ) {
        mobileNav.classList.remove("active");
      }
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
      }
    });
  }
});

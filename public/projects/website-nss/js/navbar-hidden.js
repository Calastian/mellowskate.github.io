// Modern Navbar Auto-Hide Script
document.addEventListener("DOMContentLoaded", () => {
  const topNavbar = document.querySelector(".top-navbar");
  if (!topNavbar) return;

  let lastScrollY = window.scrollY;
  let isMouseNearTop = false;

  function handleNavbar() {
    const currentScrollY = window.scrollY;
    const atTop = currentScrollY === 0;
    const scrollingUp = currentScrollY < lastScrollY;

    if (atTop || scrollingUp || isMouseNearTop) {
      topNavbar.classList.remove("hidden");
    } else {
      topNavbar.classList.add("hidden");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleNavbar);

  document.addEventListener("mousemove", (e) => {
    isMouseNearTop = e.clientY < 80; // Updated for new navbar height
    if (isMouseNearTop) {
      topNavbar.classList.remove("hidden");
    }
  });
});

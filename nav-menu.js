export function initNavMenus() {
  const navMenus = document.querySelectorAll(".nav-menu");

  navMenus.forEach((menu) => {
    const links = menu.querySelectorAll(".nav-menu-link");

    links.forEach((link) => {
      link.addEventListener("click", () => {
        menu.removeAttribute("open");
      });
    });
  });
}

let hamburger  = document.getElementById("hamburger");
let closeMenu = document.querySelector("#mobile-menu .close")

hamburger.addEventListener("click", () => {
  toggleOpenMenu();
  hamburger.style.display = "none"
  closeMenu.style.display = "block"
})

closeMenu.addEventListener("click", () => {
  toggleOpenMenu();
  hamburger.style.display = "block"
  closeMenu.style.display = "none"
})


function toggleOpenMenu() {
  document.querySelector("header .toolbar").classList.toggle("show-mobile-menu");
}
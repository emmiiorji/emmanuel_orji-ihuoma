function toggleOpenMenu() {
  document.querySelector('header .toolbar').classList.toggle('show-mobile-menu');
}

const hamburger = document.getElementById('hamburger');
const closeMenu = document.querySelector('#mobile-menu .close');

hamburger.addEventListener('click', () => {
  toggleOpenMenu();
  hamburger.style.display = 'none';
  closeMenu.style.display = 'block';
});

closeMenu.addEventListener('click', () => {
  toggleOpenMenu();
  hamburger.style.display = 'block';
  closeMenu.style.display = 'none';
});
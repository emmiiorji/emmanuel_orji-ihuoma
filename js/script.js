const hamburger = document.getElementById('hamburger');
const closeMenu = document.querySelector('#mobile-menu .close');
const menuNavs = Array.from(document.querySelectorAll('.toolbar #nav-menu li'));

function toggleOpenMenu() {
  document.querySelector('header .toolbar').classList.toggle('show-mobile-menu');
  if (window.getComputedStyle(hamburger).display === 'none') {
    hamburger.style.display = 'inline';
  } else {
    hamburger.style.display = 'none';
  }
  if (window.getComputedStyle(closeMenu).display === 'none') {
    closeMenu.style.display = 'block';
  } else {
    closeMenu.style.display = 'none';
  }
}

hamburger.addEventListener('click', toggleOpenMenu);

closeMenu.addEventListener('click', toggleOpenMenu);

menuNavs.forEach((nav) => {
  nav.addEventListener('click', toggleOpenMenu);
});
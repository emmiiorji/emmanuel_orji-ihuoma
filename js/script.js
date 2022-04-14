import projectsData from './projectsData.js';

const projects = projectsData();
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

function createLanguagesUlElement(languages) {
  let markup = '<ul>';
  languages.forEach((language) => {
    markup += `<li>${language}</li>`;
  });
  markup += '</ul>';
  return markup;
}

const markupModal = (projectId) => {
  const project = projects[projectId];
  return `<div class="project-margin">
            <div class="project-modal-container">
              <div class="modal-header">
                <h2>${project.name}</h2>
                <img src="./assets/img/close-icon.png" class="close" alt="Close Modal">
              </div>
              ${createLanguagesUlElement(project.languages)}
              <div class="project-modal-body">
                <img src="${project.imageURL}" class="project-img" alt="Project Image">
                <div class="project-describe">
                  <p class="description">
                    ${project.description}
                  </p>
                  <div class="points-of-action">
                    <button type="button">See Live<i class="fa-solid fa-power-off"></i></button>
                    <button type="button">See Source<i class="fa-brands fa-github"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
};

hamburger.addEventListener('click', toggleOpenMenu);

closeMenu.addEventListener('click', toggleOpenMenu);

menuNavs.forEach((nav) => nav.addEventListener('click', toggleOpenMenu));
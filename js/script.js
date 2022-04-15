import projectsData from './projectsData.js';

const projects = projectsData();
const hamburger = document.getElementById('hamburger');
const closeMenu = document.querySelector('#mobile-menu .close');
const menuNavs = Array.from(document.querySelectorAll('.toolbar #nav-menu li'));
const projectsSection = document.getElementById('my-works');

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

function toggleOpenModal(e) {
  const modalElement = document.querySelector('#my-works .project-modal');
  if (window.getComputedStyle(modalElement).display === 'none') {
    const projectId = e.target.id.split('_')[1] - 1;
    modalElement.innerHTML = markupModal(projectId);
    modalElement.style.display = 'block';
  } else {
    modalElement.style.display = 'none';
  }
  if (window.getComputedStyle(closeMenu).display === 'none') {
    closeMenu.style.display = 'block';
  } else {
    closeMenu.style.display = 'none';
  }
}

//  The leading project is the last entered project
const markupLeadingProject = () => {
  if (projects.length < 1) {
    return '';
  }
  const leadingProject = projects[projects.length - 1];
  const projectId = `project_${projects.length}`;
  return `<div class="card">
            <div class="card-img">
              <img src="${leadingProject.imageURL}" alt="${leadingProject.name}">
            </div>
            <div id="leading-card">
              <h2>${leadingProject.name}</h2>
              <p>${leadingProject.description}</p>
              ${createLanguagesUlElement(leadingProject.languages)}
              <button type="button" class="see-leading-project" id="${projectId}">
                See Project
              </button>

            </div>
          </div>`;
};

const markupOtherProjects = (projectIndex) => {
  if (projects.length < 2) {
    return '';
  }
  const project = projects[projectIndex];
  const projectId = `project_${projectIndex + 1}`;
  return `<div class="card card-with-bgimage active">
            <div class="overlay">
              <div class="shown">
                <h2>${project.name}</h2>
                <p>
                  ${project.description}
                </p>
                ${createLanguagesUlElement(project.languages)}
              </div>
            </div>
              <button type="button" class="hidden" id="${projectId}">
                See Project
              </button>
          </div>`;
};

function markupAllProjects() {
  let works = '';

  for (let index = projects.length - 1; index >= 0; index -= 1) {
    let project = '';
    try {
      //  Reverse projects. Most recent comes first
      if ((index === projects.length - 1) && (projects.length > 0)) {
        project = markupLeadingProject();
      } else if (projects.length > 1) {
        project = markupOtherProjects(index);
      }
      works += project;
    } catch (error) {
      //  Skip the project and do not render it
    }
  }
  //  Returns all project cards
  return works;
}

function renderProjects() {
  let projectsMarkup = '';
  const projectCards = markupAllProjects();
  if (projectCards) {
    projectsMarkup = `<div id="works-header">
                          <h2>My Recent Works</h2>
                          <hr>
                      </div>
                      <div class="cards-container">
                        ${projectCards}
                        <div class="project-modal"></>
                      </div>`;
  }
  projectsSection.innerHTML = projectsMarkup;
  document.querySelectorAll('#my-works .card-with-bgimage').forEach((card) => {
    const projectId = Array.from(card.childNodes).filter((childNode) => childNode.nodeName === 'BUTTON')[0].id.split('_')[1] - 1;
    card.style.background = `url("${projects[projectId].imageURL}") no-repeat`;
  });
}
renderProjects();

hamburger.addEventListener('click', toggleOpenMenu);
closeMenu.addEventListener('click', toggleOpenMenu);
menuNavs.forEach((nav) => nav.addEventListener('click', toggleOpenMenu));

const projectButtons = document.querySelectorAll('.works-section .card button');

const modalBlock = document.querySelector('.project-modal');
modalBlock.addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) { // From the modal close button
    toggleOpenModal(e);
  }
});

//  Listener for closing the modal is added in HTML
projectButtons.forEach((button) => {
  button.addEventListener('click', toggleOpenModal);
});
import projectsData from './projectsData.js';
import populateInputFields from './utility.js';

populateInputFields();

const projects = projectsData();
const hamburger = document.getElementById('hamburger');
const closeMenu = document.querySelector('#mobile-menu .close');
const menuNavs = Array.from(document.querySelectorAll('.toolbar #nav-menu li'));
const projectsSection = document.getElementById('my-works');

function toggleOpenMenu() {
  const toolbar = document.querySelector('header .toolbar');
  toolbar.classList.toggle('show-mobile-menu');
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
                    <a href="${project.hostedURL || '#'}" target='_blank'>
                      <button type="button">
                        See Live<i class="fa-solid fa-power-off"></i>
                      </button>
                    </a>
                    <a href="${project.githubURL || '#'}" target='_blank'>
                      <button type="button">
                        See Source<i class="fa-brands fa-github"></i>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
};

function toggleOpenModal(e) {
  const modalElement = document.querySelector('#my-works .project-modal');
  if (window.getComputedStyle(modalElement).display === 'none') {
    const projectId = e.target.id.split('_')[1];
    modalElement.innerHTML = markupModal(projectId);
    modalElement.style.display = 'block';
    const projectMainContainer = document.querySelector('.project-margin');
    modalElement.querySelector('.close').addEventListener('click', () => { modalElement.style.display = 'none'; });
    projectMainContainer.addEventListener('click', (e) => {
      if (e.target === projectMainContainer) modalElement.style.display = 'none';
    });
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
  const projectId = `project_${projects.length - 1}`;
  return `<div class="card">
            <img src="${leadingProject.imageURL}" class="card-img" alt="${leadingProject.name}">
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
  const projectId = `project_${projectIndex}`;
  return `<div class="card card-with-bgimage active">
            <div class="overlay">
              <div class="shown">
                <h2>${project.name}</h2>
                <p>
                  ${project.description}
                </p>
                ${createLanguagesUlElement(project.languages)}
              </div>
              <button type="button" class="hidden" id="${projectId}">
                See Project
              </button>
            </div>
          </div>`;
};

function markupAllProjects() {
  let works = '';

  //  Reverse projects. Most recent comes first
  for (let index = projects.length - 1; index >= 0; index -= 1) {
    let project = '';
    try {
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
    const projectId = card.querySelector('button').id.split('_')[1];
    card.style.background = `url("${projects[projectId].imgMobile || projects[projectId].imageURL}") no-repeat center`;
  });
}
renderProjects();

hamburger.addEventListener('click', toggleOpenMenu);
closeMenu.addEventListener('click', toggleOpenMenu);
menuNavs.forEach((nav) => nav.addEventListener('click', toggleOpenMenu));

const projectButtons = document.querySelectorAll('.works-section .card button');

//  Listener for closing the modal is added in HTML
projectButtons.forEach((button) => {
  button.addEventListener('click', toggleOpenModal);
});

// Listen to the get resume button
const getResume = document.getElementById('get-resume');
getResume.addEventListener('click', () => {
  window.open('https://drive.google.com/file/d/1dikTluvofOOc_qCwNsj3aU0W5sAYJtuF/view?usp=sharing', '_blank');
});
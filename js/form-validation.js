const contactForm = document.getElementById('contact-me');

const displayMessage = (field, message, status) => {
  const displayElement = field.parentNode.querySelector('small');
  displayElement.innerText = message;

  field.classList.add(status ? 'success' : 'error');
  displayElement.style.color = 'red';
  setTimeout(() => {
    field.classList.remove('error');
    field.classList.remove('success');
    displayElement.innerText = '';
  }, 3000);

  return status;
};

const displayError = (field, message) => displayMessage(field, message, false);

const displaySuccess = (field, message = '') => displayMessage(field, message, true);

const isEmpty = (field, message) => {
  const fieldIsEmpty = field.value.trim() === '';
  return fieldIsEmpty ? displayError(field, message) : displaySuccess(field);
};

const isValidEmail = (field, messageOnRequired, messageOnInvalid) => {
  if (!isEmpty(field, messageOnRequired)) {
    return false;
  }

  const email = field.value.trim();
  const isLowerCase = email === email.toLowerCase();

  if (!isLowerCase) {
    return displayError(field, messageOnInvalid);
  }
  return true;
};

const handleContactForm = (e) => {
  e.preventDefault();

  const NAME_REQUIRED = 'Kindly, enter your name';
  const EMAIL_REQUIRED = 'Please, enter your email';
  const EMAIL_INVALID = 'Please, enter your email address in lowercase';
  const NOTE_REQUIRED = 'Please, enter a message';

  const validName = isEmpty(contactForm.elements.full_name, NAME_REQUIRED);
  const validEmail = isValidEmail(contactForm.elements.email, EMAIL_REQUIRED, EMAIL_INVALID);
  const validNote = isEmpty(contactForm.elements.textarea, NOTE_REQUIRED);

  if (validName && validEmail && validNote) {
    contactForm.submit();
  }
};

contactForm.addEventListener('submit', handleContactForm);

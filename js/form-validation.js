const contactForm = document.getElementById('contact-me');

const isEmpty = (field, message) => {

};

const isValidEmail = (field, messageOnRequired, messageOnInvalid) => {

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
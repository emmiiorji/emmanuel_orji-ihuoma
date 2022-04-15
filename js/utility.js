const contactForm = document.getElementById('contact-me');

/* Save and restore changes to and from local storage */
const getDataObject = () => {
  const formData = contactForm.elements;

  return {
    fullName: formData.full_name.value,
    email: formData.email.value,
    note: formData.textarea.value,
  };
};

const saveData = () => {
  const formData = getDataObject();
  localStorage.setItem('contactForm', JSON.stringify(formData));
};

const populateInputFields = () => {
  const savedData = JSON.parse(localStorage.getItem('contactForm'));
  const form = contactForm.elements;

  if (savedData) {
    form.full_name.value = savedData.fullName;
    form.email.value = savedData.email;
    form.textarea.value = savedData.note;
  }
};

const inputFields = Array.from(document.querySelectorAll('#contact-me input, #contact-me textarea'));
inputFields.forEach((inputField) => {
  inputField.addEventListener('input', saveData);
});

export default populateInputFields; // Will be called each time the page loads
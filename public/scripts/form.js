const scriptURL = 'https://hook.eu2.make.com/2q7bpqd2ewkr92fzbjndlghocl14ngjr';
const form = document.forms['contact-form'];
const infobox = document.getElementById("infobox");

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  formData.append("date", new Date().toLocaleString());

  e.preventDefault();
  fetch(scriptURL, {
    method: 'POST', body: formData
  })
    .then(response => infobox.classList.remove("hidden"))
    .catch(error => console.error('Error!', error.message));
});
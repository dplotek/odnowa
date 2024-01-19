const scriptURL = 'https://script.google.com/macros/s/AKfycbyFaeOzAhju-p1qs2Ny2MAGZNkfg9wqoDkaIpHbURyfhkV6nmE0VNmmgIa_exQ05RSs/exec'
const form = document.forms['contact-form']
const infobox = document.getElementById("infobox")

form.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(form)
  formData.append("Data", new Date().toLocaleString())

  e.preventDefault()
  fetch(scriptURL, {
    method: 'POST', body: formData
  })
    .then(response => infobox.classList.remove("hidden"))
    .catch(error => console.error('Error!', error.message))
})
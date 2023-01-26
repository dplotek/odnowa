const htmlBody = document.querySelector("body")

const cookiesKey = "COOKIES"
const cookiesValue = localStorage.getItem(cookiesKey)

const removeCookiesContainer = () => {
  const cookiesContainer = document.getElementById("cookiesContainer")
  htmlBody.removeChild(cookiesContainer)
  localStorage.setItem(cookiesKey, true)
}

if(!cookiesValue) {
  const container = document.createElement("div")
  container.classList.add('fixed', 'h-screen', 'w-screen', "bg-black/[.7]", "top-0", "left-0", "z-100", "flex", "items-end")
  container.id = "cookiesContainer"

  const wrapper = document.createElement("div")
  wrapper.classList.add("bg-white", "max-w-screen-xl", "my-12", 'p-8', "rounded-lg", "mx-auto")

  const cookiesText = document.createElement("p")
  cookiesText.classList.add("mb-4", "text-black")
  cookiesText.textContent = "W naszym Serwisie używamy plików cookies. Korzystając dalej z Serwisu, wyrażasz zgodę na stosowanie plików cookies zgodnie z Polityką prywatności. Wyrażenie zgody jest dobrowolne, w każdej chwili można ją cofnąć poprzez zmianę ustawień dotyczących plików „cookies” w używanej przeglądarce internetowej. Kliknij „Akceptuję”, aby ta informacja nie wyświetlała się więcej"
  
  const removeCookiesContainerButton = document.createElement("button")
  removeCookiesContainerButton.addEventListener("click", removeCookiesContainer)
  removeCookiesContainerButton.textContent = "Akceptuje"
  removeCookiesContainerButton.classList.add("bg-secondary", "px-6", "py-2", "rounded-lg", "text-black")

  const moreInfoButton = document.createElement("a")
  moreInfoButton.classList.add("bg-transparent", "px-6", "py-2", "rounded-lg", "text-black", "ml-2", "border-2", "border-secondary")
  moreInfoButton.textContent = "Dowiedz się więcej"
  moreInfoButton.setAttribute("href", "polityka-prywatnosci")

  wrapper.appendChild(cookiesText)
  wrapper.appendChild(removeCookiesContainerButton)
  wrapper.appendChild(moreInfoButton)
  container.appendChild(wrapper)
  htmlBody.appendChild(container)
}




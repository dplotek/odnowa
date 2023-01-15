const body = document.querySelector("body")
const galleries = [...document.querySelectorAll('.splide__list')].map(item => [...item.querySelectorAll("img")])
galleries.forEach(item => {
  item.forEach(nestedItem => {
    nestedItem.addEventListener("click", () => {
      const src = nestedItem.getAttribute("src")
      createGallery(src, item)
    })
  })
})

let currentImage 
let currentGallery

const createGallery = (src, gallery) => {
  currentImage = src
  currentGallery = gallery

  const galleryWrapper = document.createElement("div")
  galleryWrapper.classList.add("fixed", "top-0", "left-0", "bg-black/[0.6]", "w-screen", "h-screen", "z-10", "flex", "items-center", "justify-center", "p-24") 

  const galleryContainer = document.createElement("div")
  galleryContainer.classList.add("relative")

  const imageTag = document.createElement("img")
  imageTag.src = currentImage
  imageTag.classList.add("relative")

  const removeGalleryButton = document.createElement("button")
  removeGalleryButton.textContent = "x"
  removeGalleryButton.classList.add("absolute", "-top-8", "-right-8", "text-2xl", "text-secondary")
  removeGalleryButton.addEventListener("click", () => {
    body.removeChild(galleryWrapper)
  })

  const setNextImage = () => {
    const currentIndex = currentGallery.findIndex(item => item.getAttribute("src") === currentImage)
    currentImage = currentIndex >= currentGallery.length -1 
      ? currentGallery[0].getAttribute("src") 
      : currentGallery[currentIndex + 1].getAttribute("src")

    imageTag.src = currentImage
  }

  const nextButton = document.createElement("button")
  nextButton.classList.add("absolute", "top-1/2", "translate", "-transform-1/2", "-right-12")
  nextButton.addEventListener("click", setNextImage)

  const nextButtonImage = document.createElement("img")
  nextButtonImage.src = "./assets/left-arrow.svg"
  nextButtonImage.classList.add("rotate-180")

  const setPrevImage = () => {
    const currentIndex = currentGallery.findIndex(item => item.getAttribute("src") === currentImage)
    currentImage = currentIndex === 0
      ? currentGallery[currentGallery.length -1].getAttribute("src") 
      : currentGallery[currentIndex - 1].getAttribute("src")

    imageTag.src = currentImage
  }

  const prevButton = document.createElement("button")
  prevButton.classList.add("absolute", "top-1/2", "translate", "-transform-1/2", "-left-12")
  prevButton.addEventListener("click", setPrevImage)

  const prevButtonImage = document.createElement("img")
  prevButtonImage.src = "./assets/left-arrow.svg"
  

  prevButton.appendChild(prevButtonImage)
  nextButton.appendChild(nextButtonImage)
  galleryContainer.appendChild(prevButton)
  galleryContainer.appendChild(nextButton)
  galleryContainer.appendChild(removeGalleryButton)
  galleryContainer.appendChild(imageTag)
  galleryWrapper.appendChild(galleryContainer)
  body.appendChild(galleryWrapper)
}
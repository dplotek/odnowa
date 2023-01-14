const body = document.querySelector("body")
const slides = [...document.querySelector('.splide__list').querySelectorAll("img")]
slides.forEach(item => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("src")
    createGallery(src)
    console.log(src)
  })
})

document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '.splide', {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    autoplay: true,
    gap: '2rem',
    breakpoints: {
      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1
      }
    },
    classes: {
      pagination: 'hidden'
    }
  } );
  splide.mount();
} );

let currentImage 

const createGallery = (src) => {
  currentImage = src
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
    const currentIndex = slides.findIndex(item => item.getAttribute("src") === currentImage)
    currentImage = currentIndex >= slides.length -1 
      ? slides[0].getAttribute("src") 
      : slides[currentIndex + 1].getAttribute("src")

    imageTag.src = currentImage
  }

  const nextButton = document.createElement("button")
  nextButton.classList.add("absolute", "top-1/2", "translate", "-transform-1/2", "-right-12")
  nextButton.addEventListener("click", setNextImage)

  const nextButtonImage = document.createElement("img")
  nextButtonImage.src = "./assets/left-arrow.svg"
  nextButtonImage.classList.add("rotate-180")

  const setPrevImage = () => {
    const currentIndex = slides.findIndex(item => item.getAttribute("src") === currentImage)
    currentImage = currentIndex === 0
      ? slides[slides.length -1].getAttribute("src") 
      : slides[currentIndex - 1].getAttribute("src")

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
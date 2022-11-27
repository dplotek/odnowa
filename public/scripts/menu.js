const hamburger1 = document.querySelector("#hamburger1")
const hamburger2 = document.querySelector("#hamburger2")
const hamburger3 = document.querySelector("#hamburger3")
const navToggler = document.querySelector("#nav-toggler")
const mobileMenu = document.querySelector("#mobile-menu")
const menuBackdrop = document.querySelector("#menu-backdrop")

let open = false

const handleCloseMenu = () => {
  hamburger1.classList.add("-translate-y-2")
  hamburger1.classList.remove("translate-y-0", "rotate-45")
  
  hamburger2.classList.remove("opacity-0")
    
  hamburger3.classList.add("translate-y-2")
  hamburger3.classList.remove("translate-y-0", "-rotate-45")
  mobileMenu.classList.remove("translate-x-0")
  mobileMenu.classList.add("-translate-x-full")
}

const handleOpenMenu = () => {
  hamburger1.classList.remove("-translate-y-2")
  hamburger1.classList.add("translate-y-0", "rotate-45")

  hamburger2.classList.add("opacity-0")

  hamburger3.classList.remove("translate-y-2")
  hamburger3.classList.add("translate-y-0", "-rotate-45")
  mobileMenu.classList.remove("-translate-x-full")
  mobileMenu.classList.add("translate-x-0")
}

const rotateHamburger = () => {
  open = !open
  open ? handleOpenMenu() : handleCloseMenu()
}

menuBackdrop.addEventListener("click", handleCloseMenu)
navToggler.addEventListener("click", rotateHamburger)
let menuToggleButton = document.querySelector('#menu-toggle')
let bodyMenu = document.querySelector('.sidebar')
const toggleMenu = menu => menu.classList.toggle('visible')

menuToggleButton.addEventListener("click", e => {
    e.preventDefault()
    toggleMenu(bodyMenu)
})

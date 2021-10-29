const navBtn = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav__mobile')
const navLinks = document.querySelectorAll('.nav__link-item-mobile')
const footerYear = document.querySelector('.footer__year')

function navLinksHandler() {
	navBtn.classList.remove('is-active')
	navMenu.classList.remove('nav__active')
	navBtn.setAttribute('aria-expanded', 'false')
	navLinksAnimationHandler()
	enableScroll()
}

function navLinksAnimationHandler() {
	let animationDelay = 0.1

	navLinks.forEach(element => {
		element.classList.toggle('nav__links-animation')
		element.style.animationDelay = animationDelay + 's'
		animationDelay += 0.05
	})
}

function navHandler() {
	navBtn.classList.toggle('is-active')
	navMenu.classList.toggle('nav__active')

	navLinksAnimationHandler()

	if (navMenu.classList.contains('nav__active')) {
		navLinks.forEach(elemen => {
			elemen.addEventListener('click', navLinksHandler)
		})

		disableScroll()
		navBtn.setAttribute('aria-expanded', 'true')
	} else {
		enableScroll()
		navBtn.setAttribute('aria-expanded', 'false')
	}
}

function disableScroll() {
	document.body.classList.add('stop-scrolling')
}

function enableScroll() {
	document.body.classList.remove('stop-scrolling')
}

const currentFooteryear = () => {
	const year = new Date().getFullYear()
	footerYear.textContent = year
}

currentFooteryear()
navBtn.addEventListener('click', navHandler)

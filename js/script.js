let navBtn // Button to uncollapse/collapse mobile navigation
let navMenu // Mobile navigation
let navLinks // Mobile navigation links
let footerYear // Current Year displaying in footer

const main = () => {
	DOMQuerySelectors()
	DOMEventListeners()
	setCurrentFooterYear()
}

const DOMQuerySelectors = () => {
	navBtn = document.querySelector('.hamburger')
	navMenu = document.querySelector('.nav__mobile')
	navLinks = document.querySelectorAll('.nav__link-item-mobile')
	footerYear = document.querySelector('.footer__year')
}

const DOMEventListeners = () => {
	navBtn.addEventListener('click', handleNav)

	for (const link of navLinks) {
		link.addEventListener('click', handleNav)
	}
}

const handleNav = () => {
	navBtn.classList.toggle('is-active')
	navMenu.classList.toggle('nav__active')
	document.body.classList.toggle('stop-scrolling')
	navLinksAnimation()
	setAriaExpanded()
}

const navLinksAnimation = () => {
	let delayTime = 0.05

	navLinks.forEach(link => {
		link.classList.toggle('nav__links-animation')
		link.style.animationDelay = delayTime + 's'
		delayTime += 0.05
	})
}

const setCurrentFooterYear = () => {
	const year = new Date().getFullYear()
	footerYear.textContent = year
}

const setAriaExpanded = () => {
	const navBtnExpandedValue = navBtn.getAttribute('aria-expanded')

	if (navBtnExpandedValue === 'false') {
		navBtn.setAttribute('aria-expanded', 'true')
	} else {
		navBtn.setAttribute('aria-expanded', 'false')
	}
}

document.addEventListener('DOMContentLoaded', main)

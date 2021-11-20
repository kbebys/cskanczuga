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

new Glide('.gallery-wrapper', {
	//desktop-first
	type: 'carousel',
	startAt: 0,
	perView: 2,
	peek: 15,
	gap: 30,
	autoplay: 3000,
	breakpoints: {
		992: {
			perView: 1,
			peek: 120,
			gap: 40,
		},
		768: {
			perView: 1,
			peek: 60,
			gap: 20,
		},
		576: {
			perView: 1,
			gap: 10,
			peek: 30,
		},
	},
}).mount()

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

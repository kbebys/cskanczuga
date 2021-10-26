$('.gallery__carousel').slick({
	slidesToShow: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	mobileFirst: true,
	arrows: false,
	prevArrow: $('.gallery__prev'),
	nextArrow: $('.gallery__next'),
	centerMode: true,
	centerPadding: '1em',
	responsive: [
		{
			breakpoint: 576,
			settings: {
				centerPadding: '2em',
			},
		},
		{
			breakpoint: 768,
			settings: {
				centerPadding: '3em',
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				centerMode: false,
				arrows: true,
			},
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				centerMode: false,
				arrows: true,
			},
		},
	],
})

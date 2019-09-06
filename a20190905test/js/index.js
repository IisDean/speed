$(function(){
	//令狐现世
	var mySwiper = new Swiper('.abg1-swiper', {
		autoplay: true,//可选选项，自动滑动
		loop: true,
		initialSlide: 2,
		grabCursor : true,
		pagination: {
		    el: '.swiper-pagination.abg1-pagination',
			clickable :true,
		},
	});

	//山海新篇
	var mySwiper3 = new Swiper('.abg3-swiper', {
		autoplay: true,//可选选项，自动滑动
		loop: true,
		initialSlide: 2,
		grabCursor : true,
		navigation: {
	      nextEl: '.abg3 .swiper-navigation-next',
	      prevEl: '.abg3 .swiper-navigation-prev',
	    },
	});
});
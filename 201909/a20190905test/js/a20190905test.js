$(function(){

	//人物跟随鼠标小幅度移动
    $('.layer').each(function(i, e) {
        $(this).data('left', parseInt($(this).css('left')));
        $(this).data('top', parseInt($(this).css('top')));
    });
    document.onmousemove = function (ev) {
        var oEvent = ev || event;
        var siteX = oEvent.clientX;
        var siteY = oEvent.clientY;
        $('.layer').each(function(i, e) {
            $(this).css("left",siteX/$(this).data("sum") + parseInt($(this).data('left')));
            $(this).css("top",siteY/$(this).data("sum") + parseInt($(this).data('top')));
        });
    };

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

	//星星飘落
    $('.snowfall-wrap').snowfall({ image: "./ossweb-img/light1.png", minSize: 10, maxSize: 30 });


	//返回顶部
	$(".btn-backtop-down").on("click", function(){
		$("html,body").animate({"scrollTop": "0px"}, 300);
	});
});
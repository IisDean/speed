$(function(){
    //巴雷特手办
    var barrett = new Swiper('.swiper-1 .swiper-container', {
        effect: 'fade',
        autoplay: true,//可选选项，自动滑动
        loop: true,
        navigation: {
            nextEl: '.swiper-1 .navigation-next',
            prevEl: '.swiper-1 .navigation-prev',
        },
        on: {
            slideChange: function(){
                var index = this.realIndex;
                $(".swiper-1 .swiper-description span:eq("+ index +")").addClass('active')
                    .siblings('span').removeClass('active');;
            }
        }
    });
    //点击名称切换巴雷特手办
    $(".swiper-1 .swiper-description span").on("click", function(){
        var index = parseInt($(this).index()+1);
        barrett.slideTo(index);
    });

    //灵狐者手办
    var lh = new Swiper('.lh-left .swiper-container', {
        effect: 'fade',
        autoplay: true,//可选选项，自动滑动
        loop: true
    });
    //灵狐者手办
    var lh = new Swiper('.lh-right .swiper-container', {
        autoplay: true,//可选选项，自动滑动
        loop: true,
        pagination: {
            el: '.lh-right .swiper-pagination',
        }
    });

    //切换端游&手游礼包
    $(".mobile-game-icon").on("click", function(){
        $(".dy-state,.sy-state").toggle();
    });
});
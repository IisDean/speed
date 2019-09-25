$(".tab-menu-list li").on("click", function(){
    var $this = $(this),
        index = $this.index();
    $this.addClass('active').siblings('li').removeClass('active');
    $(".tab-content-con .tab-content").eq(index).show().siblings(".tab-content").hide();
});

// 全新版本
var newsSwiper = new Swiper('.swiper-box .swiper-container', {
    autoplay: true,//可选选项，自动滑动
    loop: true,
    navigation: {
        nextEl: '.swiper-box .next-btn',
        prevEl: '.swiper-box .prev-btn',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },
});

// 页面动效
$(window).on('load scroll', function() {
    var sTop = $(window).scrollTop();
    $.each($('.part'), function() {
        if(sTop >= $(this).offset().top - $(window).height() / 1.2) {
            $(this).addClass('show');
        }
    })
});

//视频播放
$(".video-start").on("click", function(){
    showDia("pop1");
    $("#videoWrap").attr('src', 'https://www.bilibili.com/video/av56867438?zw');
});
$(".video-close").on("click", function(){
    $("#videoWrap").attr('src', ' ');
    $("body").css('overflow', ' auto');
});
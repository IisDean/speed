//新剧情 七星隐龙知真身
var mySwiper1 = new Swiper('.swiper-p1 .swiper-container', {
    effect: 'fade',
    autoplay: 4000,
    loop: true,
    pagination: '.p1-container .pagination',
    paginationClickable: true,
});
//切换
$(".swiper-p1 .prev-btn").on("click", function () {
    mySwiper1.swipePrev();
});
$(".swiper-p1 .next-btn").on("click", function () {
    mySwiper1.swipeNext();
});

// 新联赛 风云联赛改版
var mySwiper2 = new Swiper('.swiper-p3 .swiper-container', {
    autoplay: 3000,
    loop: true,
    pagination: '.p3-container .pagination',
    paginationClickable: true,
});
//切换
$(".swiper-p3 .prev-btn").on("click", function () {
    mySwiper2.swipePrev();
});
$(".swiper-p3 .next-btn").on("click", function () {
    mySwiper2.swipeNext();
});

// 新活动 · 竹马蹦蹦
var mySwiper3 = new Swiper('.swiper-p6 .swiper-container', {
    autoplay: 3000,
    loop: true,
    pagination: '.p6-container .pagination',
    paginationClickable: true,
});
//切换
$(".swiper-p6 .prev-btn").on("click", function () {
    mySwiper3.swipePrev();
});
$(".swiper-p6 .next-btn").on("click", function () {
    mySwiper3.swipeNext();
});

// 关闭弹窗
$(".close-btn").on("click", function () {
    closeDialog();
});

//查看详情 成女
var mySwiper4 = null;
$(".J-more-cn").on("click", function () {
    TGDialogS('pop1');
    if (mySwiper4 == null) {
        setTimeout(function () {
            mySwiper4 = new Swiper('.pop-1 .swiper-container', {
                autoplay: 3000,
                loop: true
            });
            $("#pop1").css("opacity", 1);
            //切换
            $(".pop-1 .prev-btn").on("click", function () {
                mySwiper4.swipePrev();
            });
            $(".pop-1 .next-btn").on("click", function () {
                mySwiper4.swipeNext();
            });
        }, 300);
    }
});

//查看大图
$(".J-ls-img").on("click", function () {
    TGDialogS('pop2');
    var src = $(this).find("img").attr("src");
    $("#pop2 .pop-con img").attr('src', src);
});

//查看详情 新玩法
var mySwiper5 = null;
$(".swiper-p3 .swiper-slide").on("click", function () {
    var idx = mySwiper2.activeLoopIndex;
    TGDialogS('pop3');
    if (mySwiper5 == null) {
        setTimeout(function () {
            mySwiper5 = new Swiper('.pop-3 .swiper-container', {
                loop: true,
                initialSlide: idx
            });
            $("#pop3").css("opacity", 1);
            //切换
            $(".pop-3 .prev-btn").on("click", function () {
                mySwiper5.swipePrev();
            });
            $(".pop-3 .next-btn").on("click", function () {
                mySwiper5.swipeNext();
            });
        }, 100);
    } else {
        mySwiper5.swipeTo(idx);
    }
});
//锚点跳转
$('a[href*=#],area[href*=#]').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
        if ($target.length) {
            var targetOffset = $target.offset().top;
            $('html,body').stop().animate({
                scrollTop: targetOffset
            }, 1000);
            return false;
        }
    }
});


var player = null;
//视频播放
function playVideo(vid) {
    TGDialogS('popVideo');
    player = new Txplayer({
        containerId: 'videoWrap',
        vid: vid,
        width: '848',
        height: '494',
        autoplay: true
    });
}

//关闭视频播放
$(".J-close-video").on("click", function () {
    $("#videoWrap").empty();
});

//首屏视频播放
$(".head-play-btn").on("click", function () {
    playVideo('v30239vcjlu');
});

//全新牵手动作
$(".xw-play-btn").on("click", function () {
    playVideo('v30239vcjlu');
});

//入场动画
var $wrap = $(".wrap-ani"),
    kjH = $(window).height(),
    hArr = [];

for (var i = 1; i <= 7; i++) {
    hArr[i - 1] = $("a[name=p" + i + "]").offset().top;
}

var minH,
    maxH;

function scrollPage() {
    var scrollH = $(document).scrollTop();
    var he = scrollH + kjH;
    var top = 0;
    $wrap.each(function (idx, ev) {
        top = $(ev).offset().top;
        if ((top - he) < -200) {
            $(ev).addClass('animated');
        } else {
            $(ev).removeClass('animated');
        }
    });
    hArr.forEach(function (ev, idx) {
        minH = ev;
        maxH = hArr[idx + 1] || 10000;
        if (he < hArr[0]) return $(".ce-menu-list li").removeClass('active');
        if (he - 600 > minH && he - 600 < maxH) {
            $(".ce-menu-list li").removeClass('active').eq(idx).addClass('active');
        }
    });
}
$(document).scroll(function () {
    scrollPage();
});
scrollPage();
setTimeout(function () {
    $(".ce-menu-list").addClass('animated');
}, 500);
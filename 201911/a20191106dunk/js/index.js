//播放视频
$(".play-btn").on("click", function () {
    $(this).fadeOut(300);
    document.getElementById("video").play();
});
//切换人物
$(".tab-list li").on("click", function () {
    var $this = $(this),
        index = $this.index();
    $this.addClass("active").siblings().removeClass("active");
    $this.parent().next(".tab-plank").find(".tab-plank-item").eq(index).addClass("active").siblings().removeClass("active");
    //加载技能Gif图
    $this.parent().next(".tab-plank").find(".tab-plank-item").eq(index).find(".skill-plank .skill-plank-item").each(function (index, ev) {
        loadGif($(ev).find('.skill-img img'));
    });
});

$(function () {
    setTimeout(function () {
        $(".tab-list li").eq(0).click();
    }, 3000);
});

function loadGif(ev) {
    var src = $(ev).attr('data-src');
    $(ev).attr('src', src);
    return src;
}

//切换技能
$(".skill-tab .skill-tab-item").on("click", function () {
    var $this = $(this),
        index = $this.index();
    $this.addClass("active").siblings().removeClass("active");
    $this.parent().next().find("li").eq(index).addClass("active").siblings().removeClass("active");
});

//游戏展示
var mySwiper2 = new Swiper('.swiper2', {
    loop: true,
    effect: 'coverflow',
    slidesPerView: 1.8,
    centeredSlides: true,
    autoplay: 3000,
    coverflow: {
        rotate: 0,
        stretch: 100,
        depth: 50,
    },
});
window.RAF = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

(function () {
    var maxWidth = 0;
    var $newsUl = $(".news-ul");
    var firstW = $newsUl.find(".news-item").width();
    $newsUl.find(".news-item").each(function (index, ev) {
        maxWidth += $(ev).width();
    });

    var moveLeft = 0;
    var firstClone = $newsUl.find(".news-item").eq(0).clone();
    $newsUl.append(firstClone).width(maxWidth + firstW + 20 + 'px');

    function dropInteval() {
        RAF(function () {
            $newsUl.css("transform", "translateX(" + moveLeft-- + "px)");
            if (moveLeft < -maxWidth) moveLeft = 0;
            //这里调用需要执行的方法
            dropInteval();
        });
    };
    dropInteval();
})();

// 页面动效
$(window).on('load scroll', function () {
    var sTop = $(window).scrollTop();
    $.each($('.part'), function () {
        if (sTop >= $(this).offset().top - $(window).height() / 1.2) {
            $(this).addClass('show');
        }
    })
});
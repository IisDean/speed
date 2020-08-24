
    //导航事件
    $("#header").find(".pack-nav-slide").on("touchstart", function() {
        if ($(".pack-nav-list-open").length) {
            $(".pack-nav-list").removeClass("pack-nav-list-open");
            $(".pack-nav-slide").removeClass("pack-nav-slide-close");
            $("body").unbind("touchmove", false);
            $(".pack-nav-after").removeClass("pack-nav-big");
        } else {
            $(".pack-nav-list").addClass("pack-nav-list-open");
            $(".pack-nav-slide").addClass("pack-nav-slide-close");
            $("body").bind("touchmove", false);
            $(".pack-nav-after").addClass("pack-nav-big");
        }
    });

    //群侠势力
    var index;
    var indexTop;
    var galleryTop1 = new Swiper('#swiper-role-nav', {
        observer:true,
        observeParents:true,
        slidesPerView: 4,
        navigation: {
            nextEl: '#next1',
            prevEl: '#prev1',
        },
        on: {
            slideChangeTransitionStart: function(){
                indexTop=galleryTop1.activeIndex;
            }
        }
    });

    $('.gallery-top1 .swiper-slide').on('click',function(){
        galleryThumbs1.slideTo($(this).index());
        $(this).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
    });
    $('.gallery-top1 .swiper-slide').eq(11).on('click',function(){
        alert('请敬请期待~~~');
    });
    $('.gallery-top-box #next1').on('click',function(){
        galleryThumbs1.slideTo(indexTop+3);
    });
    $('.gallery-top-box #prev1').on('click',function(){
        galleryThumbs1.slideTo(indexTop-3);
    });
    //群侠势力内容图
    var galleryThumbs1 = new Swiper('#swiper-role-con', {
        observer:true,
        observeParents:true,
        effect : 'fade',
        fadeEffect: {
            crossFade: true,
        },
        on: {
            slideChangeTransitionStart: function(){
                index=galleryThumbs1.activeIndex;
                galleryTop1.slideTo(index);
                $('.gallery-top1 .swiper-slide').removeClass('swiper-slide-active').eq(index).addClass('swiper-slide-active');


            },
        }
    });


    //新闻资讯banner
    var swiper1 = new Swiper('.swiper-new-banner', {
        pagination: {
            el: '.s-pag1'
        },
        autoplay:true
    });

    //新闻资讯列表
    var tabsSwiper1 = new Swiper('.swiper-new-list',{
        speed:500,
        on:{
            slideChangeTransitionStart: function(){
                $(".new-tabs .active").removeClass('active');
                $(".new-tabs a").eq(this.activeIndex).addClass('active');
            }
        }
    });
    $(".new-tabs a").on('click',function(e){
        e.preventDefault();
        $(".new-tabs .active").removeClass('active');
        $(this).addClass('active');
        tabsSwiper1.slideTo($(this).index());
    });

    //游戏攻略列表
    var tabsSwiper2 = new Swiper('.swiper-gl-list',{
        speed:500,
        direction : 'vertical',
        on:{
            slideChangeTransitionStart: function(){
                $(".gl-tabs .active").removeClass('active');
                $(".gl-tabs a").eq(this.activeIndex).addClass('active');
            }
        }
    });
    $(".gl-tabs a").on('click',function(e){
        e.preventDefault();
        $(".gl-tabs .active").removeClass('active');
        $(this).addClass('active');
        tabsSwiper2.slideTo($(this).index());
    });

    //游戏特色
    var swiper2 = new Swiper('.swiper-game-banner', {
        pagination: {
            el: '.s-pag2'
        },
        autoplay:true
    });
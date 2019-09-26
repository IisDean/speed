jQuery.extend(jQuery.easing, {
    def: 'easeOutExpo',
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});
var _modh = $(window).height() - 42;
$('.page,.part').height(_modh);
$('.part').css('top',_modh);
$('.show').css('top',0);
var $pageBtn = $(".page-btn-wrap");
wheel = {
    h: _modh,
    mods: $('.part'),
    fnav: $('.float-menu-list li'),
    se: 0,
    max: 4,
    loaded: [false, false, false, false],
    turn: false,
    len: $('.part-n').length,
    roll: function (e) {
        if (wheel.turn || e == wheel.se) return;
        wheel.turn = true;
        wheel.fnav.eq(e).siblings().removeClass('active').end().addClass('active');
        if(e==wheel.max){
            setTimeout(function(){
                $('#footer_ieg').show();
            },1000);
            $pageBtn.find(".next-btn").addClass('off');
        }else{
            $('#footer_ieg').hide();
            $pageBtn.find(".next-btn").removeClass('off');
        }
        if(e==0){
            $pageBtn.find(".prev-btn").addClass('off');
        }else {
            $pageBtn.find(".prev-btn").removeClass('off');
        }
        wheel.mods.eq(e).css({ top: (e < wheel.se ? -1 : 1) * wheel.h, zIndex: 3 }).stop(true, true).animate({ top: 0 }, 300, 'easeInOutExpo', function () {
            $(this).css({ zIndex: 2 });
            wheel.mods.eq(wheel.se).css({ zIndex: 1 });
            $(this).addClass('show');
            wheel.mods.eq(wheel.se).removeClass('show');
            wheel.se = e;
            wheel.turn = false;
        });
    },
    init: function () {
        $(document).on('mousewheel', function (event, delta) {
            var sc = $(window).scrollTop();
            var max = document.body.clientHeight - $(window).height();
            if (!wheel.turn && sc >= max && delta == -1 || !wheel.turn && sc <= 0 && delta == 1) {
                var n = 0;
                if (delta > 0 && wheel.se > 0) { n = wheel.se - 1; wheel.roll(n); }
                if (delta < 0 && wheel.se < wheel.len) { n = wheel.se + 1; wheel.roll(n); }
                console.log(wheel.se);
            }
        });
    }
};
//下一页
$('.page-btn-wrap .next-btn').on('click',function(){
    wheel.se<wheel.len&&wheel.roll(wheel.se+1);
});
//上一页
$('.page-btn-wrap .prev-btn').on('click',function(){
    wheel.se<wheel.len&&wheel.roll(wheel.se-1);
});
//侧导航
$(document).ready(wheel.init);
$('.float-menu-list li[date-page]').on('click',function(){
    var pa = parseInt($(this).attr('date-page') - 1);
    $(this).addClass('active').siblings("li").removeClass('active');
    wheel.roll(eval(pa));
});

//内容整体自适应
var pageSize = {
    setStyle : function(){
        var w = $(document).width();
        if(w<1610 ){
            $('.container').css({'zoom': '0.78'});
            $('.part1 .container').css({'zoom': '0.78'});
            $('.part2 .container').css({'zoom': '0.78'});
            $('.part3 .container').css({'zoom': '0.78'});
            $('.part4 .container').css({'zoom': '0.78'});
            $('.part5 .container').css({'zoom': '0.78'});
            $('.head .arrow').css({'bottom': '20px'});
            $('.tit0').css({'top': '30px'});
            $('.head .container').css({'zoom': '1'});
        }else {
            $('.container').css({'zoom': '1'});
            $('.part1 .container').css({'zoom': '1'});
            $('.part2 .container').css({'zoom': '1'});
            $('.part3 .container').css({'zoom': '1'});
            $('.part4 .container').css({'zoom': '1'});
            $('.part5 .container').css({'zoom': '1'});
            $('.head .arrow').css({'bottom': '-10px'});
            $('.tit0').css({'top': '0'});
        }
    },
    reSize : function(){
        var _this=this;
        window.onresize =function(){
            _this.setStyle();
        }
    },
    init: function(){
        this.setStyle();
        this.reSize();
    }
};
pageSize.init();


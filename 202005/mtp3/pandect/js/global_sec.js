//ÂÖ²¥
    function fade(obj,con,btns){
        var banner = $(obj),
            slides = banner.find(con),
            dotContainer = banner.find('.controller'),
            dotTpl = '',
            dots,
            total = slides.length,
            index = -1,
            duration = 500,
            interval = 5000,
            timer = null;
        if(total == 1) {
            next();
            $('.carousel-btn').hide();
            return;
        }
        dotTpl = '<span></span>';
        $.each(slides, function(i, el){
            dotContainer.append(dotTpl);
        });
        dots = dotContainer.find('span');
        function show(i){
            var cur = slides.filter('.active');
            slides.stop(true, true);
            cur.removeClass('active').fadeOut(600);
            slides.eq(i).addClass('active').fadeIn(800);
            dots && dots.removeClass('active').eq(i).addClass('active');
        }
        function prev(){
            index--;
            index = index < 0 ? total - 1 : index;
            show(index);
        }
        function next(){
            index++;
            index = index > total - 1 ? 0 : index;
            show(index);
        }
        function autoPlay(){
            if(timer) clearInterval(timer);
            timer = setInterval(function(){
                next();
            }, interval);
        }
        banner.find(btns).removeAttr('style');
        banner.on('click', '.btn-prev', function(e){
            prev();
        }).on('click', '.btn-next', function(e){
            next();
        }).on('click', '.controller span', function(e){
            if($(this).hasClass('active')) return;
            var i = $(this).index();
            index = i;
            show(i);
        });
        banner.on('mouseenter', function(e){
            if(timer) clearInterval(timer);
        }).on('mouseleave', function(e){
            autoPlay();
        });
        next();
        autoPlay();

		
    }
    
    fade('.carousel-show','.carousel-wrapper li','.carousel-btn');
//µ¯´°
function showDialog(o) {
    var target = $('#' + o);
    console.log(target.length);
    if (target.length > 0) {
        $('body').append('<div role="popover" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:1001;background:#000;opacity:.7;filter:alpha(opacity=70);"></div>');
        var w = target.width(),
            h = target.height(),
            l = ($(window).width() - w) / 2,
            t = ($(window).height() - h) / 2;
        target.css({
            position: 'fixed',
            top: t,
            left: l,
            zIndex:1002
        });
        target.attr('role', 'pop');
        target.fadeIn(200);
    }
}
function closeDialog() {
    $('[role="pop"]').fadeOut(200);
    $('[role="popover"]').remove();
}


//topnav ÓÃ»§ÐÅÏ¢
function selectToggle(toggleBtn,toggleList,btnArr,arrDown){
    $(toggleBtn).bind('click',function(){
        $(this).siblings(toggleList).slideToggle(200,function(){
            if($(this).css('display')=='block'){
                $(this).siblings(toggleBtn).find(btnArr).addClass(arrDown);
            }
            else{
                $(this).siblings(toggleBtn).find(btnArr).removeClass(arrDown);
            }
            $(this).find('li').each(function(){
                $(this).bind('click',function(){
                    $(this).parents(toggleList).siblings(toggleBtn).find('.text-box').text($(this).text());
                    $(this).parents(toggleList).fadeOut(200);
                    $(this).parents(toggleList).siblings(toggleBtn).find(btnArr).removeClass(arrDown);
                });
            });
        });
    });
}
function selectToggle2(toggleBtn,toggleList,btnArr,arrDown){
    $(toggleBtn).bind('mouseenter',function(){
        $(this).siblings(toggleList).slideDown(200,function(){
            $(this).siblings(toggleBtn).find(btnArr).addClass(arrDown);
            $(this).find('li').each(function(){
                $(this).bind('click',function(){
                    $(this).parents(toggleList).siblings(toggleBtn).find('.text-box').text($(this).text());
                    $(this).parents(toggleList).fadeOut(200);
                    $(this).parents(toggleList).siblings(toggleBtn).find(btnArr).removeClass(arrDown);
                });
            });
        });
    });
    $("#top-login-select").bind('mouseleave',function(){
        $(this).find(toggleList).slideUp(200,function(){
        //$(this).siblings(toggleList).slideUp(200,function(){
            $(this).siblings(toggleBtn).find(btnArr).removeClass(arrDown);

            $(this).find('li').each(function(){
                $(this).bind('click',function(){
                    $(this).parents(toggleList).siblings(toggleBtn).find('.text-box').text($(this).text());
                    $(this).parents(toggleList).fadeOut(200);
                    $(this).parents(toggleList).siblings(toggleBtn).find(btnArr).removeClass(arrDown);
                });
            });
        });
    });
}
selectToggle2('.logined-btn','.login-info','.ico-arr','ico-arr-down');


$('.topnav-link li,.topnav-tips').hover(function(){
    $(this).find('.topnav-tips').show();
},function(){
    $(this).find('.topnav-tips').hide();
});

//topnav background
$('.top-nav').hover(function(){
	$(this).addClass('hovbg');
},function(){
    var that = $(this);
    //that.removeClass('hovbg');
    /*setTimeout(function(){
        that.removeClass('hovbg');
    }, 300);*/
});

//topnav line
(function(){
var $navcur = $(".line");
var $nav = $(".topnav-link");
//hover
$nav.find("li").mouseover(function(){
    var index = $(this).index();    
    var leftW = $(this).position().left;
    var currentW = $nav.find("li").eq(index).innerWidth();
    $navcur.stop().animate({
        left: leftW,
    },200,function(){
        $navcur.stop().animate({width:currentW},200);
    });
    if(index==1||index==2||index==4){
        index--;
        var anhi=$('.dhcont').eq(index).height();
        //重复进入li不重复展开
        $('.topnav-tips').stop().animate({height:anhi});
        if($('.topnav-tips .dhcont').eq(index).css('display')=='block')return;
        $('.topnav-tips .dhcont').hide().eq(index).show();
    }else{
        $('.topnav-tips').stop().animate({height:0},200,function(){
            $('.topnav-tips .dhcont').hide().eq(index).hide();
        });
    };
});
/*$nav.find("li").mouseleave(function(){
    var cpindex = $(this).index();
    if(cpindex==1||cpindex==2||cpindex==4){return false;}else{
        $navcur.stop().animate({
        width: 0
        },0,function(){
            $('.top-nav').removeClass('hovbg');
        });
    };
});*/
$('.top-nav').mouseleave(function(){
    $navcur.stop().animate({
    width: 0
    },300,function(){
        $('.top-nav').removeClass('hovbg');
    });
    $('.topnav-tips').stop().animate({height:0},300,function(){
        $('.topnav-tips .dhcont').hide();
        $('.top-nav').removeClass('hovbg');
        $navcur.stop().animate({
            width: 0
        },0);
    });
});

/*$('.topnav-tips').hover(function(){
    $(this).show();
},function(){
    $(this).stop().animate({height:0},0,function(){
        $('.top-nav').removeClass('hovbg');
        $navcur.stop().animate({
            width: 0
        },0);
    });
    $('.topnav-tips .dhcont').hide();
});*/
})();

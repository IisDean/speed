/*弹框*/
var popIsShow = false;
var popDom = null;
function OpenDialog(id) {
    var p = $('#'+id);
    setTimeout(function () {
        p.find('.loading').hide();
        p.find('.loading_hou').fadeIn();
    },2000);
    $('body').css("overflow","hidden");
    popDom = p;
    if (p) {
        p.show(100).css({
            position: 'fixed',
            top: '55px',
            right: '0',
            zIndex: 998
        });
        p.attr('for', 'pop');
        popIsShow = true;
        if ($('[for="' + id + '"]').length >= 1) return;
        $('body').append('<div name="overlay" onclick="closeDialog()" for='
+ id
+ ' style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:997;background:rgba(194,194,194,0.4);"></div>');
    }
}


function closeDialog() {
    setTimeout(function () {
        $('.loading').show();
        $('.loading_hou').hide();
    },300);
    var w=$('[for="pop"]').width();
    $('[for="pop"]').hide(500).stop().css({
        right: -(w+50),
    });
    $('[name="overlay"]').remove();
    $('body').css("overflow","scroll");
}





$('.l_body img').click(function (event) {
    event.stopPropagation();
    var src=$(this).attr('src');

    //parent获取iframe父元素的方法
    parent.showLayer(src)
});



$('.spr_gun').height($(window).height()-130);

//input hover
function ipt(el){
    el.hover(function () {
        $(this).css({
            'border':'1px solid #4264f8',
        });
    },function () {
        $(this).css({
            'border':'1px solid #d1d7e9',
        });
    });
}
ipt($('.page_li input'));



$('.page_li select').hover(function () {
    $(this).css({
        'border':'1px solid #4264f8',
        'background': 'url(images/jt_xl.jpg) no-repeat calc(100% - 10px) center'
    });
},function () {
    $(this).css({
        'border':'1px solid #d1d7e9',
        'background': 'url(images/jt_xl1.jpg) no-repeat calc(100% - 10px) center'
    });
});


function bor(el){
    el.hover(function () {
        $(this).css({
            'border':'1px solid #8a9099',
        });
    },function () {
        $(this).css({
            'border':'1px solid #ccc',
        });
    })
}
bor($('.form_b li input'));
bor($('.form_b li select'));
bor($('.root_li li select'));

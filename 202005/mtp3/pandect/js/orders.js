// 支付跳转
function zhifu(){
    if(!$('.order-btn .zhifu .btn-blue').hasClass('btn-gray')){
        $('.orderBuy').hide();
        $('.kaitong').show();
    }
};
//select2
var initdata = ["[19368]MTP Demo", "[19368]MTP Demo", "[19368]MTP Demo", "[19368]MTP Demo", "[19368]MTP Demo", "[19368]MTP Demo", "[19368]MTP Demo", "[19368]MTP Demo"];
$(document).ready(function (){
    initSelect2WithSearch1();
    function initSelect2WithSearch1() {
        $("#area").select2({
            width: '231px',
            height: '36px',
            tags: true,
            placeholder: '请选择游戏',
            data: initdata,
            allowClear: true
        });
        $("#area").on("change", function(e){
            $('.tips2').show();
            $('.zhifu .btn-blue').removeClass('btn-gray');
            $('.tips3').hide();
        });
        // tab
        $('.tab a').on('click',function(){
            var n = $(this).index();
            $(this).parent().children('a').removeClass('on');
            $(this).addClass('on');
            if($(this).parent().hasClass('tab1')){
                if(n==1){
                    $('.tips1').hide();
                }else{
                    $('.tips1').show();
                };
                $("#area").select2("val", "");
                $('.desc').first().html('选购产品：'+ $(this).html());
            };
            if($(this).parent().hasClass('tab2')){
                if(n==0){
                    $('.desc').last().html('购买时长：6个月 （186天）');
                    $('p.price b').html('48,000.00');
                    $('span.price').html('原价：60,000.00');
                }else{
                    $('.desc').last().html('购买时长：1年 （372天）');
                    $('p.price b').html('84,000.00');
                    $('span.price').html('原价：120,000.00');
                }
            };
            $('.zhifu .btn-blue').addClass('btn-gray');
        });
    };
    // agree
    $('.agree p').on('click',function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
    });
});
//弹窗
var popIsShow = false;
var popDom = null;
function popShow(id) {
    popHide();
    var p = $('#'+id);
    popDom = p;
    if (p) {
        p.show().css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: -popDom.height() / 2 + 'px',
            marginLeft: -popDom.width() / 2 + 'px',
            zIndex: 998
        });
        p.attr('for', 'pop');
        popIsShow = true;
        if ($('[for="' + id + '"]').length >= 1) return;
        $('body').append('<div name="overlay" for=' + id + ' style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:997;background:rgba(227,227,227,0.5);"></div>');
    }
}
function popHide() {
    $('[for="pop"]').hide().attr('style', '');
    $('[name="overlay"]').remove();
}
window.addEventListener("resize", function () {
    if (!popIsShow)
        return;
    setTimeout(function () {
        popDom.css({
            marginTop: -popDom.height() / 2 + 'px',
            marginLeft: -popDom.width() / 2 + 'px',
            zIndex: 998
        });
    }, 400)
});
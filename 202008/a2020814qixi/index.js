
// 时装切换
var mySwiper = new Swiper('.swiper-container', {
    effect : 'fade',
});

$(".part-2 .btn-container a").on("click", function(){
    var $this = $(this),
        idx = $this.index();
    mySwiper.slideTo(idx);
});

// 心王·长生殿 切换
$(".sz1-btn-list a").on("click", function(){
    var $this = $(this),
        idx = $this.index();
    if( idx < 3 ){
        $this.addClass("active").siblings("a").removeClass('active');
        $(".sz1-list div").eq(idx).show().siblings("div").hide();
    }
});

$("#searchHy").on("focus", function(){
    $(".J-select-hy").slideDown(300);
}).on("blur", function(){
    $(".J-select-hy").slideUp(300);
});
// 选择好友
$(".J-select-hy li").on("click", function(){
    var $this = $(this),
        val = $this.text();
    $("#searchHy").val(val);
    $(".J-name-text").text(val);
});

// 选择祝福语
$("#zfyWrap").on("click", function(){
    $(".J-select-zfy").slideDown(300);
    console.log('1');
});
// 选择祝福语
$(".J-select-zfy li").on("click", function(){
    var $this = $(this),
        val = $this.text();
    $("#zfyWrap").text(val);
    $(".J-select-zfy").slideUp(300);
});
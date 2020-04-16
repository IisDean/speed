 
 

 //返回微社区
 $('.back-sq-btn').on('click', function() {
    window.location.href = "https://cfm.qq.com/ingame/web201809/detail.shtml"+location.search+"&nid=9678452";
});

//宝箱
$('.gift-icon').on('click',function(){
    window.location.href = "//cfm.qq.com/lbact/a20200220bbyr/neiqian.html"+location.search;
});

//主swiper
var swiper1 = new Swiper('#swiper1',{
    initialSlide: 0,
    mode: 'vertical',
    mousewheelControl: true,
    simulateTouch: false,
    onSlideChangeEnd: function(swiper){
        $('.nav-list li').removeClass('active').eq(swiper1.activeIndex).addClass('active');
        if(swiper1.activeIndex == 6){
            swiper1.disableMousewheelControl();
        }
    }
});
$('.nav-list li').on("click", function(){
    var idx = $(this).index();
    if(idx < 7)swiper1.swipeTo(idx);
});
$(document).on("mousewheel DOMMouseScroll", function (e) {
	if( $(document).scrollTop() == 0 ){
		swiper1.enableMousewheelControl();
	};
});

// 新模式切换
var swiper4 = new Swiper('#swiper4',{
    loop: true,
});
$('.xms-slide .page-wrap .next-btn-xms').click(function(){
    swiper4.swipeNext();
});
$('.xms-slide .page-wrap .prev-btn-xms').click(function(){
    swiper4.swipePrev();
});

// 新赛季
var swiper2 = new Swiper('#swiper2',{
    loop: true,
});
// 新地图
var swiper3 = new Swiper('#swiper3',{
    loop: true,
    autoplay: 3000,
    onSlideChangeEnd: function(swiper){
        var idx = swiper.activeLoopIndex;
        $(".map-title-list i").hide().eq(idx).css('display', 'block');
        $(".map-img-list li").removeClass('active').eq(idx).addClass('active');
    }
});
// 点击滑至指定slide
$(".map-img-list li").on("click", function(){
    var idx = $(this).index();
    swiper3.swipeTo(idx);
});

// 新武器
var swiper5 = new Swiper('#swiper5',{
    loop: true,
});

// 新系统
$(".tab-list li").on("click", function(){
    var $this = $(this),
        idx = $this.index();
    $this.addClass("active").siblings('li').removeClass('active');
    $(".tab-content .tab-img").hide().eq(idx).show();
});


// 视频
function playVideo(vid) {
    var w = $("#videoPlayer").width(),
        h = $("#videoPlayer").height();
    var player = new Txplayer({
        containerId: 'popVideo',
        vid: vid,
        width: w,
        height: h,
        autoplay: true
    });
}
function popVideo(vid) {
    TGDialogS('videoPlayer');
    playVideo(vid);
}
function hideVideo() {
    $('#popVideo').html("");
    closeDialog();
};

function TGDialogS(e){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:50 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog(){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.hide();
    });
}
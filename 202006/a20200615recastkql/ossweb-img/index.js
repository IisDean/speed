var ctrlJs = {
    data: {
        pageSwiper: null,// 页面Swiper
        pageIdx: 0,//当前页面序号
        navLeft: ['12.8%', '37%', '61%', '85%'],//游标状态
    },
    methods: {
        cutPage: function(idx){//切换页面
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//移动导航游标
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        }
    },
    init: function(){
        var that = this;
        // 页面Swiper
        that.data.pageSwiper = new Swiper('.swiper-container', {
            effect : 'fade',
            loop: false,
            initialSlide: 2,
            onSlideChangeStart: function(swiper){
                that.methods.moveCursor(swiper.activeIndex+1);
            }
        });
        // 点击导航栏
        $(".nav-list li").on("click", function(){
            var $this = $(this),
                idx = $this.index();
            if(idx > 0){
                that.methods.cutPage(idx);
            }else {

            }
        });
    }
}
ctrlJs.init();
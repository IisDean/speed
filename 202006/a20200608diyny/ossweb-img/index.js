var ctrlJs = {
    data: {
        //图片预加载列表
        loadImgList: [],
        pageIdx: 1,//当前页面，默认首页
    },
    methods: {
        //图片预加载
        loadImg: function(){
            var that = this,
                imgLoad = 0,
                pro = 0,
                $loadText = $(".J-pro-text"),
                $progress = $(".J-pro-wrap");
            imgList.forEach(function (ev, index) {
                var img = new Image();
                img.src = ev;
                img.style.position = 'absolute';
                img.idx = index;
                img.onload = function () {
                    imgList[this.idx].obj = this;
                    imgLoad++;
                    pro = parseInt((imgLoad / imgList.length) *.95 * 100);
                    $loadText.text(pro + '%');
                    $progress.css('width', pro+'%');
                    if (imgLoad >= imgList.length) {
                        console.log('加载完成');
                        document.fonts.ready.then(function() {
                            // 字体加载完成
                            $(".stage").css("font-family", 'hyzy');
                            $loadText.text('100%');
                            $progress.css('width', '100%');
                            //图片显示
                            showImg();
                            setTimeout(function(){
                                // 直接进入徽章选择
                                $(".part-1").removeClass('load-status');
                                nextPageRead(1);
                            }, 500);
                        });
                    }
                }
            });
        },
        // 显示图片
        showImg: function(){
            var $imgList = $("img");
            $imgList.each(function(idx, ev){
                var $ev = $(ev),
                    src = $ev.attr('data-src');
                if(src != null){
                    $ev.attr('src', src);
                }
            });
        },
        // 下一页准备
        nextPageRead: function(idx){
            var that = this;
            if(idx && idx < 5){
                setTimeout(function(){
                    $(".part-" + idx).addClass("part-show").show();
                }, 100);
            }
        },
    },
    //初始化
    init: function(){
        console.log('123');
    }
}
ctrlJs.init();
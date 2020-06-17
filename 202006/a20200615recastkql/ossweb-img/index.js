var ctrlJs = {
    data: {
        pageSwiper: null,// 页面Swiper
        pageIdx: 0,//当前页面序号
        navLeft: ['12.8%', '37%', '61%', '85%'],//游标状态
        client: $(document.body)[0].clientWidth
    },
    methods: {
        cutPage: function(idx){//切换页面
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//移动导航游标
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function(){//刮奖初始化
            var gjImg = new Image();
            gjImg.src = './ossweb-img/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function(){
                $(gjImg).eraser({
                    size: 20, //设置橡皮擦大小
                    completeRatio: .6, //设置擦除面积比例
                    completeFunction: ctrlJs.methods.showResetButton   //大于擦除面积比例触发函数
                });
            }
        },
		showResetButton: function(){//刮奖结果
            alert('获得');
            ctrlJs.data.pageSwiper.unlockSwipes();
        },
        initSwiper: function(){// 页面Swiper
            ctrlJs.data.pageSwiper = new Swiper('.swiper-container', {
                effect : 'fade',
                initialSlide: 0,
                onSlideChangeStart: function(swiper){
                    ctrlJs.methods.moveCursor(swiper.activeIndex+1);
                },
                onTouchEnd: function(swiper){
                    var dis = 70;
                    TR = swiper.translate;
                    if(TR > dis){
                        swiper.setWrapperTranslate(TR);
                        ctrlJs.methods.backHome();
                    }
                }
            })
        },
        backHome: function(){//回到首页
            $(".swiper-container .wrap").fadeOut(300);
            setTimeout(function(){
                $(".part-1 .wrap").show();
                $(".part-1").show();
            }, 600);
        }
    },
    init: function(){
        var that = this;
        // 点击导航栏
        $(".nav-list li").on("click", function(){
            var $this = $(this),
                idx = $this.index();
            idx > 0 ? that.methods.cutPage(idx) : that.methods.backHome();
        });
        // 重铸孔雀翎
        $(".part-1 .start-btn").on("click", function(){
            // 初始化swiper start
            $(".swiper-container").show();
            that.methods.initSwiper();
            // 初始化swiper end
            $(".part-1 .wrap").fadeOut(600);
            $(".swiper-container .wrap").show();
            setTimeout(function(){
                $(".part-1").fadeOut(300);
            }, 600);
        });
        // 合成孔雀翎
        $(".part-2 .hckql-btn").on("click", function(){
            $(".part-2 .bw-wrap").addClass('active');
            $(".part-2 .btn-container").animate({
                "margin-top": '.5rem',
                "opacity": 0
            }, 600, function(){
                
            });
        });
        // 搜寻宝物
        $(".sxbw-btn").on("click", function(){
            that.methods.cutPage(2);
        });
        //刮奖
        that.methods.initEraser();
        var $redux = $(".gj-wrap");
        $redux.on("touchstart", function(){
            that.data.pageSwiper.lockSwipes();
        }).on("touchend", function(){
            that.data.pageSwiper.unlockSwipes();
        });
    }
}
ctrlJs.init();
var ctrlJs = {
    data: {
        pageSwiper: null,// 页面Swiper
        pageIdx: 0,//当前页面序号
        navLeft: ['25%', '49%', '73%'],//游标状态
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
        gjStatus: false,//默认为false， 等于true时表示当前可以刮奖
        prizeResult: '',//中奖结果
        prizeList: [
            {
                name: '灵殊·幽帘疏芳（7天）',
                imgSrc: './ossweb-img/gj_1.png'
            }, {
                name: '紫色心法残页×1',
                imgSrc: './ossweb-img/gj_2.png'
            }, {
                name: '泉沏龙井×1',
                imgSrc: './ossweb-img/gj_3.png'
            }, {
                name: '私藏特产×1',
                imgSrc: './ossweb-img/gj_4.png'
            }, {
                name: '帮派功勋令×2',
                imgSrc: './ossweb-img/gj_5.png'
            }, {
                name: '天刀人物印象挂画×1',
                imgSrc: './ossweb-img/gj_6.png'
            }, {
                name: '五周年大礼盒×1',
                imgSrc: './ossweb-img/gj_7.png'
            }, {
                name: '天下盟会手账本×1',
                imgSrc: './ossweb-img/gj_8.png'
            }, {
                name: '侠影研习录·三×1',
                imgSrc: './ossweb-img/gj_9.png'
            }, {
                name: '侠影研习录·二×2',
                imgSrc: './ossweb-img/gj_10.png'
            }, {
                name: '一级霜铁×5',
                imgSrc: './ossweb-img/gj_11.png'
            }, {
                name: '一级金丝×5',
                imgSrc: './ossweb-img/gj_12.png'
            }, {
                name: '侠影研习录·一×5',
                imgSrc: './ossweb-img/gj_13.png'
            }, {
                name: '铸神令×2',
                imgSrc: './ossweb-img/gj_14.png'
            }, {
                name: '红尘宝匣×1',
                imgSrc: './ossweb-img/gj_15.png'
            }, {
                name: '绑点×20',
                imgSrc: './ossweb-img/gj_16.png'
            }, {
                name: '碎银×20000',
                imgSrc: './ossweb-img/gj_17.png'
            }
        ]
    },
    methods: {
        cutPage: function(idx){//切换页面
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//移动导航游标
            $(".nav-list li").removeClass("active").eq(idx).addClass('active');
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function(){//刮奖初始化
            if(ctrlJs.data.gjStatus)return false;
            ctrlJs.data.gjStatus = true;
            var idx = ctrlJs.methods.getRandom(0, ctrlJs.data.prizeList.length);
            $(".cxgj-btn").hide();
            var gjImg = new Image();
            gjImg.src = './ossweb-img/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function(){
                $(gjImg).eraser({
                    size: 20, //设置橡皮擦大小
                    completeRatio: .6, //设置擦除面积比例
                    completeFunction: ctrlJs.methods.showResetButton   //大于擦除面积比例触发函数
                });
                $(".prize-img img").attr('src', ctrlJs.data.prizeList[idx].imgSrc);
                $(".prize-msg").html(ctrlJs.data.prizeList[idx].name);
                ctrlJs.data.prizeResult = ctrlJs.data.prizeList[idx].name;
            }
        },
		showResetButton: function(){//刮奖结果
            TGDialogS('popGj');
            ctrlJs.data.gjStatus = false;
            $(".cxgj-btn").show();
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
        },
        playVideo: function(vid){//播放视频
            TGDialogS("popVideo");
            ctrlJs.data.video = new Txplayer({
                containerId: 'videoWrap',
                vid: vid,
                width: ctrlJs.data.videoWidth,
                height: ctrlJs.data.videoHeight,
                autoplay: true
            });
        },
        pauseVideo: function(){//关闭视频
            closeDialog();
            $("#videoWrap").empty();
        },
        getRandom: function(min, max){//获取随机数
            return Math.floor( Math.random() * (max- min) + min );
        }
    },
    init: function(callback){
        var that = this;
        //点击弹窗空白处关闭
        $("body").on("touchstart", "#_overlay_", function(){
            if(!$("#popVideo").is(":hidden"))ctrlJs.methods.pauseVideo();
            setTimeout(function(){
                closeDialog();
            }, 100);
        });
        if(callback)callback(that);
    }
}
ctrlJs.init();
var ctrlJs = {
    data: {
        pageSwiper: null,// 页面Swiper
        pageIdx: 0,//当前页面序号
        navLeft: ['12.8%', '37%', '61%', '85%'],//游标状态
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
        gjStatus: false,//默认为false， 等于true时表示当前可以刮奖
    },
    methods: {
        initShare: function(type){//配置分享参数
            if( type == 1 ){//分享一次任务时和默认分享，调用此分享参数
                TGMobileShare({
                    shareTitle:'天下第一暗器即将面世！',
                    shareDesc:'重铸天下第一暗器<孔雀翎>，即可百分百领取奖励',
                    shareImgUrl:'https:./ossweb-img/share_bw.jpg', //分享图片尺寸200*200，且填写绝对路径
                    shareLink:'',
                    actName:'a20200615recastkql'
                });
            }else if( type == 2 ) {//立即邀请时调用此分享参数
                TGMobileShare({
                    shareTitle:'腾讯旗舰手游开预约啦',
                    shareDesc:'国风大世界手游《天涯明月刀》预约已开启，邀你预约立领专属礼包，抢先进驻大江湖。',
                    shareImgUrl:'https:./ossweb-img/share_yuyue.jpg', //分享图片尺寸200*200，且填写绝对路径
                    shareLink:'',
                    actName:'a20200615recastkql'
                });
            }
        },
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
            }
        },
		showResetButton: function(){//刮奖结果
            alert('获得');
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
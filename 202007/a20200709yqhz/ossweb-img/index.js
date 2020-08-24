var ctrlJs = {
    data: {
        //图片预加载列表
        loadImgList: [],
        lookSwiper: null,//查看口号卡swiper
        fxSwiper: null,//发现口号卡swiper
        mxList: ['hmh', 'whd', 'wyl'],
        mxNameList: ['黄明昊', '王鹤棣', '王彦霖'],
        cardIdx: 0,//元气卡编号
        cardType: 0,//获得卡片类型 0~3
        $video: null,//视频容器
        videoList: [//视频地址  0 = 王鹤棣 1 = 王彦霖 2 = 黄明昊     
            'b3126ar50lo',
            'e31267ywmo1',
            'u3126au65ge',
        ]
    },
    methods: {
        load: function(t){
            var shade = $('<div class="pop-shade"></div>').css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'z-index': '9998',
                'background-color': 'rgba(0, 0, 0, .5)',
                }),
                text = $('<div class="pop-load"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1rem" height="1rem" fill="#000" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path><path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(42.1171 20 20)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg></div>').css({
                    'position':'fixed',
                    'top': '50%',
                    'left': '50%',
                    'z-index': '9999',
                    'width': '1rem',
                    'height': '1rem',
                    'transform': 'translate(-50%, -50%)',
                    '-webkit-transform': 'translate(-50%, -50%)',
                    'background-color': 'rgba(0, 0, 0, .5)',
                    'border-radius': '4px'
                });
            $("body").append(shade).append(text);
        },
        close: function(){
            $(".pop-shade").hide();
            $(".pop-load").hide();
        },    
        //将远程图片转化为base64
        getBase64: function(img){
            function getBase64Image(img,width,height) {
                //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
                var canvas = document.createElement("canvas");
                canvas.width = width ? width : img.width;
                canvas.height = height ? height : img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                var dataURL = canvas.toDataURL();
                return dataURL;
            }
            var image = new Image();
            image.crossOrigin = '';
            image.src = img;
            return new Promise((resolve,reject)=>{
                image.onload =function (){
                    resolve(getBase64Image(image));//将base64传给done上传处理
                }
            });
        },
        //图片预加载
        loadImg: function(callback){
            var that = this,
                imgLoad = 0,
                pro = 0,
                imgList = ctrlJs.data.loadImgList;
            imgList.forEach(function (ev, index) {
                var img = new Image();
                img.src = ev;
                img.style.position = 'absolute';
                img.idx = index;
                img.onload = function () {
                    imgList[this.idx].obj = this;
                    imgLoad++;
                    pro = parseInt((imgLoad / imgList.length) *.95 * 100);
                    if (imgLoad >= imgList.length) {
                        // console.log('加载完成');
                        ctrlJs.data.isImgLoading = true;
                        if(callback)callback();
                    }
                }
            });
        },
        //切换页面状态
        cutStatus: function(){
            $(".stage").removeClass('status-1').addClass('status-2');
        },
        //生成海报
        createPoster: function(id, callback){
            setTimeout(function(){
                dom2img(id, {
                    ondone: function () {
                        if(callback)callback();
                    }
                });
            }, 600);
        },
        // 获取随机数
        getRandom: function(min, max){
            return Math.floor( Math.random() * (max - min) + min);
        },
        //实例化swiper
        initSwiper: function(str, idx, callback){
            var idx = idx;
            if( idx && idx < 0) idx = 1;
            var mySwiper = new Swiper(str, {
                initialSlide: idx,
                effect : 'coverflow',
                slidesPerView: 'auto',
                centeredSlides: true,
                observer: true,
                observeParents: true,
                speed: 300,
                coverflow: {
                    rotate: 60,
                    stretch: 30,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                },
                prevButton: str+' .swiper-button-prev',
                nextButton: str+' .swiper-button-next',
                onProgress: function(a) {
                    var b, c, d;
                    for (b = 0; b < a.slides.length; b++) c = a.slides[b],
                    d = c.progress,
                    scale = 1 - Math.min(Math.abs(.2 * d), 1),
                    es = c.style,
                    es.opacity = 1 - Math.min(Math.abs(d / 2), 1),
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)"
                },
                onSetTransition: function(a, b) {
                    for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style,
                    es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
                },
                onSlideChangeEnd: function(swiper){
                    if(callback)callback(swiper.activeIndex);
                }
            });
            return mySwiper;
        },
        //查看元气口号卡
        lookYqCard: function(obj){
            if(ctrlJs.data.lookSwiper != null)ctrlJs.data.lookSwiper.destroy();
            ctrlJs.data.lookSwiper = null;
            var str = '',
                arr = [0, 1, 2],//默认卡片顺序，会随机打乱
                src = [],//存储base64地址
                activeFm = 1,//当前封面序号
                wcIdx = 0;//转base64进度 
            arr.sort(function(){return Math.random() > 0.5 ? -1 : 1;});//随机卡片排序
            for(var i=0;i<3;i++){
                if(obj.status != null && obj.status-1 == arr[i])activeFm = i;
                src[i] = './ossweb-img/poster_kh'+ (obj.idx+1) +'_'+ ctrlJs.data.mxList[arr[i]] +'.jpg';
                createImg(i, src[i]);
            }
            function createImg(idx, val){
                ctrlJs.methods.load();
                ctrlJs.methods.getBase64(val).then(base64 => {
                    wcIdx+=1;
                    src[idx] = base64;
                    if(wcIdx >= 3){
                        for(var i=0;i<3;i++){
                            str += '<div class="full-img swiper-slide"><img src="'+ src[i] +'" alt="'+ ctrlJs.data.mxNameList[arr[i]] +'-'+ obj.name +'" data-id="'+ (arr[i]+1) +'"></div>';
                        }
                        $("#popCkKh").find('.J-pop-kh').text('元气口号卡 - '+obj.name)
                            .end().find(".swiper-wrapper").html(str);
                        $(".J-fm-name span").text(obj.name);
                        $("#cardTicket").text('剩余'+ obj.cardNum + '张');
                        globalInfo.shareNormal.imgBase64 = src[activeFm].replace("data:image/png;base64,","");
                        console.log(src[activeFm]);
                        TGDialogS('popCkKh');
                        setTimeout(function(){
                            ctrlJs.methods.close();
                            ctrlJs.data.lookSwiper = ctrlJs.methods.initSwiper('.J-ck-khk', activeFm, function(idx){
                                globalInfo.shareNormal.imgBase64 = src[idx].replace("data:image/png;base64,","");
                                $(".sss-img").attr('src', src[idx]);
                            });
                        }, 500);
                    }
                }, err => {
                    console.log(err);
                });
            }
        },
        //发现元气口号卡
        fxYqCard: function(obj){
            if(ctrlJs.data.fxSwiper != null)ctrlJs.data.fxSwiper.destroy();
            ctrlJs.data.fxSwiper = null;
            var str = '',
                arr = [0, 1, 2],//默认卡片顺序，会随机打乱
                src = [],//存储base64地址
                activeFm = 1,//当前封面序号
                wcIdx = 0;//转base64进度 
            arr.sort(function(){return Math.random() > 0.5 ? -1 : 1;});//随机卡片排序
            for(var i=0;i<3;i++){
                if(obj.status != null && obj.status-1 == arr[i])activeFm = i;
                src[i] = './ossweb-img/poster_kh'+ (obj.idx) +'_'+ ctrlJs.data.mxList[arr[i]] +'.jpg';
                createImg(i, src[i]);
            }
            function createImg(idx, val){
                ctrlJs.methods.load();
                ctrlJs.methods.getBase64(val).then(base64 => {
                    wcIdx+=1;
                    src[idx] = base64;
                    if(wcIdx >= 3){
                        for(var i=0;i<3;i++){
                            str += '<div class="full-img swiper-slide"><img src="'+ src[i] +'" alt="'+ ctrlJs.data.mxNameList[arr[i]] +'-'+ obj.name +'" data-id="'+ (arr[i]+1) +'"></div>';
                        }
                        $("#pop22").find('.J-pop-kh').text('元气口号卡 - '+obj.name)
                            .end().find(".swiper-wrapper").html(str);
                        $(".J-fm-name span").text(obj.name);
                        $("#cardTicket").text('剩余'+ obj.cardNum + '张');
                        globalInfo.shareNormal.imgBase64 = src[activeFm].replace("data:image/png;base64,","");
                        TGDialogS('pop22');
                        setTimeout(function(){
                            ctrlJs.methods.close();
                            // 选中封面变化
                            ctrlJs.data.fxSwiper = ctrlJs.methods.initSwiper('.J-fx-khk', 1, function(idx){
                                globalInfo.shareNormal.imgBase64 = src[idx].replace("data:image/png;base64,","");
                            });
                        }, 500);
                    }
                }, err => {
                    console.log(err);
                });
            }
        },
        //发现元气明星卡
        fxMxcard:function(obj){
            var img = './ossweb-img/poster_mx_'+ ctrlJs.data.mxList[obj.id]+'.jpg';
            ctrlJs.methods.load();
            ctrlJs.methods.getBase64(img).then(base64 => {
                ctrlJs.methods.close();
                $("#pop23").find('.J-pop-mx').text('元气明星卡 - '+ obj.name)
                    .end().find(".J-mx-img img").attr('src', base64);
                globalInfo.shareNormal.imgBase64 = base64.replace("data:image/png;base64,","");
                TGDialogS('pop23');
            }, err => {
                console.log(err);
            });
        },
        //播放视频
        playVideo: function(idx){
            var vid = ctrlJs.data.videoList[idx];
            //第一次实例化
            console.log(idx,vid);
            if(ctrlJs.data.$video == null){
                ctrlJs.data.$video = new Txplayer({
                    containerId: 'videoRq',
                    vid: vid,
                    width: '750',
                    height: '500',
                    autoplay: true
                });
                ctrlJs.data.$video.on('playStateChange', function(){
                    var status = ctrlJs.data.$video.getPlayerState();
                    //当视频播放列表还未播放完成时，继续播放下一个视频
                    if( status == 0 && idx < ctrlJs.data.videoList.length-1 ){
                        idx+=1;
                        ctrlJs.methods.playVideo(idx);
                    }else if(status == 0 && idx >= ctrlJs.data.videoList.length-1){
                        ctrlJs.data.$video.pause();
                        closeDialog();
                    }
                });
            }else {
                ctrlJs.data.$video.play(vid);
            }
            console.log(vid);
        },
    },
    handlers: {
        
    },
    //初始化，页面加载后执行
    init: function (callback) {
        var that = this;
        var bg = ctrlJs.methods.getRandom(1, 4);
        $(".part-1").css('background-image', 'url(./ossweb-img/p1_bg_'+ bg +'.jpg)');
        
        if(callback)callback(this);
    }
};

ctrlJs.init(function(that){});

$(function () {

    // 发现元气明星卡 id = 明星编号  0 = 黄明昊 1 = 王鹤棣 2 = 王彦霖
    // function fxMxcard(obj){
    //     var img = './ossweb-img/poster_mx_'+ ctrlJs.data.mxList[obj.id]+'.jpg';
    //     ctrlJs.methods.load();
    //     ctrlJs.methods.getBase64(img).then(base64 => {
    //         ctrlJs.methods.close();
    //         $("#pop23").find('.J-pop-mx').text('元气明星卡 - '+ obj.name)
    //             .end().find(".J-mx-img img").attr('src', base64);
    //         globalInfo.shareNormal.imgBase64 = base64.replace("data:image/png;base64,","");
    //         TGDialogS('pop23');
    //     }, err => {
    //         console.log(err);
    //     });
    // }

    // TGDialogS('pop31_sy');

    //播放视频
    $(".J-video-play").on("click", function(){
        TGDialogS('popVideo');
        ctrlJs.data.videoList = ctrlJs.data.videoList.sort(function(){return Math.random() > 0.5 ? -1 : 1;});//随机卡片排序
        ctrlJs.methods.playVideo(0);
    });
    //关闭视频弹窗
    $(".close-video").on("click", function(){
        ctrlJs.data.$video.pause();
    });
    
    // 发现元气口号卡
    var obj = {
        idx: 1, //元气卡编号 总共8张
        name: '元', //元气卡名称
        src: './ossweb-img/card_kh_1.png',//默认元气卡图片地址
    };
    // setTimeout(function(){
    //     ctrlJs.methods.fxYqCard(obj);
    // }, 500);

    //领取奖励
    $(".J-start-yy1").on("click", function(){
        TGDialogS('pop36');
    });

    //领取并开启应援 长按图片分享
    $(".J-start-yy2").on("click", function(){
        TGDialogS('pop25');
        ctrlJs.methods.createPoster('#poster2', function(){
            console.log('1');
        });
    });

    // 搜集卡片
    // $(".btn-zjdy").on("click", function(){
    //     var title = "发现口号卡 - 元",
    //         imgSrc = "./ossweb-img/card_kh_1.png";
    //     $("#pop26").find('.J-pop-kh').text(title)
    //         .end().find(".J-kh-img img").attr('src', imgSrc);;
    //     TGDialogS('pop23');
    // });
    // 查看元气口号卡
    $(".part-2 .card-kh-list li").on("click", function(){
        var $this = $(this).find('img'),
            cardIdx = $(this).index(),
            status = globalInfo.user.starId.split("_")[cardIdx],
            obj = {
                idx: cardIdx, //元气卡编号 总共8张
                status: status, //当前元气卡的状态 0 ~ 3
                name: $this.attr('alt'), //元气卡名称
                src: $this.eq(status).attr('src'),//默认元气卡图片地址
                cardNum: $this.next().text(),//元气卡数量
            };

        //globalInfo.shareNormal.imgBase64 = src[activeFm].replace("data:image/png;base64,","");
        var mxnName = {1:'黄明昊', 2:'王鹤棣', 3:'王彦霖'};
        globalInfo.user.cardNum = $this.next().text();
        globalInfo.user.cardId = parseInt(parseInt(cardIdx)+parseInt(1));//卡片id
        globalInfo.user.thisStarId =  $(".card-kh-list li").eq(cardIdx).attr("thisStarId");//当前卡片封面id
        ctrlJs.data.cardIdx = cardIdx;
        ctrlJs.methods.lookYqCard(obj);
        $(".J-fm-name span").text(mxnName[globalInfo.user.thisStarId]);
        // 上报
        PTTSendClick('btn', 'btn-ckkhk-'+cardIdx+'-'+(status+1), $(this).find("img:visible").attr('alt'));
    });
    //使用封面 取得卡片id
    $(".btn-syfm").on("click", function(){
        var $this = $("#popCkKh .swiper-slide-active img"),
                name = $this.attr('alt');
        ctrlJs.data.cardType = $this.attr('data-id');//更新当前索要或者共享的卡片id
        $(".J-fm-name span").text(name);
        var $cardItem = $(".card-kh-list li:eq("+ ctrlJs.data.cardIdx +")");
        $cardItem[0].className = 'p-r full-img card-item';
        $cardItem.addClass('card-'+ctrlJs.data.cardType);
        //明星封面id处理
        var starIdArray = globalInfo.user.starId.split("_");
        starIdArray[ctrlJs.data.cardIdx] = ctrlJs.data.cardType;

        $(".card-kh-list li").eq(ctrlJs.data.cardIdx).attr("thisstarid",ctrlJs.data.cardType);
        globalInfo.user.starId = '';
        $.each(starIdArray,function(k,v){
            if(k<7){
                globalInfo.user.starId += v + '_';
            }else{
                globalInfo.user.starId += v;
            }
        });
        gpSubmit(316510,686475);
    });

    // 查看元气明星卡
    $(".part-2 .card-mx-list li").on("click", function(){
        var $this = $(this).find('img'),
            name = $this.attr('alt'),
            id = $this.parent().attr('data-id'),
            img = './ossweb-img/poster_mx_'+ ctrlJs.data.mxList[id]+'.jpg';
        ctrlJs.methods.load();
        ctrlJs.methods.getBase64(img).then(base64 => {
            ctrlJs.methods.close();
            $("#popCkMx").find('.J-pop-mx').text('元气明星卡 - '+ name)
                .end().find(".J-mx-img img").attr('src', base64);
            $("#mxCardticket").text('剩余'+ $this.next().text() +'张');
            var cardId = $this.attr("cardVal");
            globalInfo.user.cardId = cardId;
            globalInfo.user.cardNum  = $this.next().text();//剩余张数
            globalInfo.shareNormal.imgBase64 = base64.replace("data:image/png;base64,","");
            TGDialogS('popCkMx');
        }, err => {
            console.log(err);
        })
        // 上报
        PTTSendClick('btn', 'btn-ckmxk-'+id, $(this).find("img:visible").attr('alt'));
    });

    // fxMxcard({
    //     id: 1,
    //     name: '王鹤棣'
    // });

    //选择索要的卡片
    $(".J-sy-card").on("click", '.card-item', function(){
        var $this = $(this);
        $(".J-sy-card .card-item").removeClass('active');
        $this.addClass('active');
        var cardId = $this.attr("cardVal");
        globalInfo.user.cardId = cardId;
    });

    //选择共享的卡片
    $(".J-gx-card").on("click", '.card-item', function(){
        var $this = $(this);
        $(".J-gx-card .card-item").removeClass('active');
        $this.addClass('active');
        var cardId = $this.attr("cardVal");
        //var starId = $this.attr();
        globalInfo.user.cardNum = $("#"+'card_pop_gx'+cardId).text();//卡片数量
        globalInfo.user.cardId = cardId;//卡片id
    });

    // 领同款套装
    $(".btn-toDown").on("click", function(){
        $("html,body").animate({
            'scrollTop': $(".stage").height() + 'px'
        }, 500);
    });

    //点击弹窗空白处关闭
    $("body").on("touchstart", "#_overlay_", function(){
        if($("#pop3").is(":hidden"))return false;
        setTimeout(function(){
            closeDialog();
        }, 100);
    });

    //明星卡顺序随机
    (function(){
        var num = $(".card-mx-list").length;
        for(var i=0;i<num;i++){
            var idx1 = ctrlJs.methods.getRandom(0,3),
                idx2 = ctrlJs.methods.getRandom(0,3),
                idx3 = ctrlJs.methods.getRandom(0,3);
            $(".card-mx-list").eq(i).prepend($(".card-mx-list:eq("+ i +") li").eq(idx1));
            $(".card-mx-list").eq(i).prepend($(".card-mx-list:eq("+ i +") li").eq(idx2));
            $(".card-mx-list").eq(i).prepend($(".card-mx-list:eq("+ i +") li").eq(idx3));
        }
    })();

    var part3H = $(".part-3").offset().top;
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
       if (part3H - scrollTop < 500) {
           $(".btn-toDown").fadeOut(300);
       }else {
        $(".btn-toDown").fadeIn(300);
       }
    }

});
/* #t6Hl8#C8F46285E57675204E01439B19B6E0FF */
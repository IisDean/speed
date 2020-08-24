var ctrlJs = {
    data: {
        pageSwiper: null,//页面swiper
        //图片预加载列表
        loadImgList: [
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/content_bg2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/aload_icon.gif',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/badge_icon1.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/badge_icon2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/bullet1.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/bullet2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/data_border.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/default_avatar.jpg',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/icons.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p1_inset.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p2_inset1.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p2_inset2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p2_inset3.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p3_inset1.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p3_inset2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p3_inset3.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p4_inset1.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p4_inset2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p4_inset3.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p4_inset4.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p5_inset1.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p5_inset2.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/p5_inset3.png',
            '//game.gtimg.cn/images/cf/cp/a20200722ndsj/prize_icon1.png',
        ],
        isXy: false,//是否同意掌火使用游戏数据
    },
    methods: {
        load: function(t){
            var shade = $('<div class="pop-shade"></div>').css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'z-index': '9998'
                }),
                text = $('<div class="pop-load"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1rem" height="1rem" fill="#000" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path><path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(42.1171 20 20)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg></div>').css({
                    'position':'absolute',
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
                        console.log('加载完成');
                        ctrlJs.data.isImgLoading = true;
                        if(callback)callback();
                    }
                }
            });
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
        initSwiper: function(str){
            var mySwiper = new Swiper(str, {
                direction: 'vertical',
                initialSlide: 0,
                onSlideChangeStart: function(swiper){
                    audioFy.play();
                }
            });
            return mySwiper;
        },
        //海报二维码地址
        createQrcode: function(){
            var url = window.location.href;
            var qrcode = new QRCode('qrcode', {
                text: url,
                render: 'table',
                width: 210,
                height: 210,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            var canvas = $('#qrcode canvas').get(0);  
            $('#qrcode img').attr('src', canvas.toDataURL('image/jpg')).show().prev().hide();
        },
    },
    handlers: {
        
    },
    //初始化，页面加载后执行
    init: function (callback) {
        var that = this;
        //生成海报二维码
        that.methods.createQrcode();
        if(callback)callback(that);
    }
};


$(function () {
    ctrlJs.init(function(that){
        // $(".swiper-container").addClass('show');
        // that.data.pageSwiper = that.methods.initSwiper('#pageSwiper');
        
        //监测用户是否同意掌火使用游戏数据
        $("#isXy").on("change", function(){
            var isXy = $(this).is(":checked");
            that.data.isXy = isXy;
        });

        //开启我的火线生涯
        $(".part-1 .btn-start").on("click", function(){
            if(!that.data.isXy)return alert('需要同意掌火使用您的游戏数据哦');
            $(this).parent().addClass('moveDownOut').delay(600).hide();
            $(".part-1 .load-content").show();
            that.methods.loadImg(function(){
                //图片预加载完成，进入第2屏
                setTimeout(function(){
                    //实例化页面swiper
                    $(".swiper-container").addClass('show');
                    that.data.pageSwiper = that.methods.initSwiper('#pageSwiper');
                    $(".part-1").hide();
                    audioFy.play();
                }, 2000);
            });
        });

        //生成我的生涯截图
        $(".btn-create-poster").on("click", function(){
            if($(".hb-container img").attr('src')) return TGDialogS('popHb');
            that.methods.load();
            that.methods.createPoster('#poster', function(){
                that.methods.close();
                var hbSrc = $(".dom2img-result").attr('src');
                $(".hb-container img").attr('src', hbSrc);
                TGDialogS('popHb');
            });
        });

        //点击弹窗空白处关闭
        $("body").on("touchstart", "#_overlay_", function(){
            // if($("#pop3").is(":hidden"))return false;
            setTimeout(function(){
                closeDialog();
            }, 100);
        });
        
    });
});
/* #t6Hl8#C8F46285E57675204E01439B19B6E0FF */
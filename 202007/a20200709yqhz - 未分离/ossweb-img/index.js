var ctrlJs = {
    data: {
        //图片预加载列表
        loadImgList: [
            
        ],
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
        }
    },
    handlers: {
        
    },
    //初始化，页面加载后执行
    init: function (callback) {
        var that = this;
        
        
        if(callback)callback(this);
    }
};

ctrlJs.init(function(that){});

$(function () {
    
    TGDialogS('pop31');

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
    $(".btn-zjdy").on("click", function(){
        var title = "发现口号卡 - 元",
            imgSrc = "./ossweb-img/card_kh_1.png";
        $("#pop26").find('.J-pop-kh').text(title)
            .end().find(".J-kh-img img").attr('src', imgSrc);;
        TGDialogS('pop23');
    });

    // 查看元气口号卡
    $(".part-2 .card-kh-list li").on("click", function(){
        var $this = $(this).find('img'),
            name = $this.attr('alt'),
            img = $this.attr('src');
        $("#popFxKh").find('.J-pop-kh').text('元气口号卡 - '+name)
            .end().find(".J-kh-img img").attr('src', img);;
        TGDialogS('popFxKh');
    });
    // 查看元气明星卡
    $(".part-2 .card-mx-list li").on("click", function(){
        var $this = $(this).find('img'),
            name = $this.attr('alt'),
            img = $this.attr('src');
        // $("#popFxMx").find('.J-pop-mx').text('元气明星卡 - '+name)
        //     .end().find(".J-mx-img img").attr('src', img);;
        TGDialogS('popFxMx');
    });
    

    //选择索要的卡片
    $(".J-sy-card").on("click", '.card-item', function(){
        var $this = $(this);
        $(".J-sy-card .card-item").removeClass('active');
        $this.addClass('active');
    });
    //选择共享的卡片
    $(".J-gx-card").on("click", '.card-item', function(){
        var $this = $(this);
        $(".J-gx-card .card-item").removeClass('active');
        $this.addClass('active');
    });
    
    //页面选择套装
    $(".tz-dh-list .tz-dh-item").on("click", function(){
        var $this = $(this),
            idx = $this.index(),
            result = $this.find(".tz-name-wrap").text();
        $this.addClass('active').siblings('li').removeClass('active');
        $(".select-tips-text").text('已选择-'+result);
    });

    // 选择套装
    $(".tz-container .tz-wrap").on("click", function(){
        var $this = $(this),
            result = $this.find(".tz-name-wrap").text();
        $this.addClass('active').siblings('.tz-wrap').removeClass('active');
        $(".J-select-result").text('已选择-'+result);
    });
    //选择套装-性别切换
    $(".tz-container .cut-sex-btn").on("click", function(event){
        event.stopPropagation();
        var $this = $(this),
            idx = null;
        if($this.hasClass('cut-1')){
            $this.removeClass('cut-1').addClass('cut-2');
            idx = 1;
        }else {
            $this.removeClass('cut-2').addClass('cut-1');
            idx = 0;
        }
        // $(".get-dh-container .person-list .person-icon").hide().eq(idx).show();
    });

    setInterval(function(){
        $(".tz-container .cut-sex-btn").click();
    }, 5000);

    //点击弹窗空白处关闭
    $("body").on("touchstart", "#_overlay_", function(){
        if($("#pop3").is(":hidden"))return false;
        setTimeout(function(){
            closeDialog();
        }, 100);
    });
    
});

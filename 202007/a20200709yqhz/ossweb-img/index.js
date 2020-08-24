var ctrlJs = {
    data: {
        //ͼƬԤ�����б�
        loadImgList: [],
        lookSwiper: null,//�鿴�ںſ�swiper
        fxSwiper: null,//���ֿںſ�swiper
        mxList: ['hmh', 'whd', 'wyl'],
        mxNameList: ['�����', '�����', '������'],
        cardIdx: 0,//Ԫ�������
        cardType: 0,//��ÿ�Ƭ���� 0~3
        $video: null,//��Ƶ����
        videoList: [//��Ƶ��ַ  0 = ����� 1 = ������ 2 = �����     
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
        //��Զ��ͼƬת��Ϊbase64
        getBase64: function(img){
            function getBase64Image(img,width,height) {
                //width��height����ʱ�����������ֵ�����ƴ�С ,������Ĭ��ͼ���С
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
                    resolve(getBase64Image(image));//��base64����done�ϴ�����
                }
            });
        },
        //ͼƬԤ����
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
                        // console.log('�������');
                        ctrlJs.data.isImgLoading = true;
                        if(callback)callback();
                    }
                }
            });
        },
        //�л�ҳ��״̬
        cutStatus: function(){
            $(".stage").removeClass('status-1').addClass('status-2');
        },
        //���ɺ���
        createPoster: function(id, callback){
            setTimeout(function(){
                dom2img(id, {
                    ondone: function () {
                        if(callback)callback();
                    }
                });
            }, 600);
        },
        // ��ȡ�����
        getRandom: function(min, max){
            return Math.floor( Math.random() * (max - min) + min);
        },
        //ʵ����swiper
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
        //�鿴Ԫ���ںſ�
        lookYqCard: function(obj){
            if(ctrlJs.data.lookSwiper != null)ctrlJs.data.lookSwiper.destroy();
            ctrlJs.data.lookSwiper = null;
            var str = '',
                arr = [0, 1, 2],//Ĭ�Ͽ�Ƭ˳�򣬻��������
                src = [],//�洢base64��ַ
                activeFm = 1,//��ǰ�������
                wcIdx = 0;//תbase64���� 
            arr.sort(function(){return Math.random() > 0.5 ? -1 : 1;});//�����Ƭ����
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
                        $("#popCkKh").find('.J-pop-kh').text('Ԫ���ںſ� - '+obj.name)
                            .end().find(".swiper-wrapper").html(str);
                        $(".J-fm-name span").text(obj.name);
                        $("#cardTicket").text('ʣ��'+ obj.cardNum + '��');
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
        //����Ԫ���ںſ�
        fxYqCard: function(obj){
            if(ctrlJs.data.fxSwiper != null)ctrlJs.data.fxSwiper.destroy();
            ctrlJs.data.fxSwiper = null;
            var str = '',
                arr = [0, 1, 2],//Ĭ�Ͽ�Ƭ˳�򣬻��������
                src = [],//�洢base64��ַ
                activeFm = 1,//��ǰ�������
                wcIdx = 0;//תbase64���� 
            arr.sort(function(){return Math.random() > 0.5 ? -1 : 1;});//�����Ƭ����
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
                        $("#pop22").find('.J-pop-kh').text('Ԫ���ںſ� - '+obj.name)
                            .end().find(".swiper-wrapper").html(str);
                        $(".J-fm-name span").text(obj.name);
                        $("#cardTicket").text('ʣ��'+ obj.cardNum + '��');
                        globalInfo.shareNormal.imgBase64 = src[activeFm].replace("data:image/png;base64,","");
                        TGDialogS('pop22');
                        setTimeout(function(){
                            ctrlJs.methods.close();
                            // ѡ�з���仯
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
        //����Ԫ�����ǿ�
        fxMxcard:function(obj){
            var img = './ossweb-img/poster_mx_'+ ctrlJs.data.mxList[obj.id]+'.jpg';
            ctrlJs.methods.load();
            ctrlJs.methods.getBase64(img).then(base64 => {
                ctrlJs.methods.close();
                $("#pop23").find('.J-pop-mx').text('Ԫ�����ǿ� - '+ obj.name)
                    .end().find(".J-mx-img img").attr('src', base64);
                globalInfo.shareNormal.imgBase64 = base64.replace("data:image/png;base64,","");
                TGDialogS('pop23');
            }, err => {
                console.log(err);
            });
        },
        //������Ƶ
        playVideo: function(idx){
            var vid = ctrlJs.data.videoList[idx];
            //��һ��ʵ����
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
                    //����Ƶ�����б�δ�������ʱ������������һ����Ƶ
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
    //��ʼ����ҳ����غ�ִ��
    init: function (callback) {
        var that = this;
        var bg = ctrlJs.methods.getRandom(1, 4);
        $(".part-1").css('background-image', 'url(./ossweb-img/p1_bg_'+ bg +'.jpg)');
        
        if(callback)callback(this);
    }
};

ctrlJs.init(function(that){});

$(function () {

    // ����Ԫ�����ǿ� id = ���Ǳ��  0 = ����� 1 = ����� 2 = ������
    // function fxMxcard(obj){
    //     var img = './ossweb-img/poster_mx_'+ ctrlJs.data.mxList[obj.id]+'.jpg';
    //     ctrlJs.methods.load();
    //     ctrlJs.methods.getBase64(img).then(base64 => {
    //         ctrlJs.methods.close();
    //         $("#pop23").find('.J-pop-mx').text('Ԫ�����ǿ� - '+ obj.name)
    //             .end().find(".J-mx-img img").attr('src', base64);
    //         globalInfo.shareNormal.imgBase64 = base64.replace("data:image/png;base64,","");
    //         TGDialogS('pop23');
    //     }, err => {
    //         console.log(err);
    //     });
    // }

    // TGDialogS('pop31_sy');

    //������Ƶ
    $(".J-video-play").on("click", function(){
        TGDialogS('popVideo');
        ctrlJs.data.videoList = ctrlJs.data.videoList.sort(function(){return Math.random() > 0.5 ? -1 : 1;});//�����Ƭ����
        ctrlJs.methods.playVideo(0);
    });
    //�ر���Ƶ����
    $(".close-video").on("click", function(){
        ctrlJs.data.$video.pause();
    });
    
    // ����Ԫ���ںſ�
    var obj = {
        idx: 1, //Ԫ������� �ܹ�8��
        name: 'Ԫ', //Ԫ��������
        src: './ossweb-img/card_kh_1.png',//Ĭ��Ԫ����ͼƬ��ַ
    };
    // setTimeout(function(){
    //     ctrlJs.methods.fxYqCard(obj);
    // }, 500);

    //��ȡ����
    $(".J-start-yy1").on("click", function(){
        TGDialogS('pop36');
    });

    //��ȡ������ӦԮ ����ͼƬ����
    $(".J-start-yy2").on("click", function(){
        TGDialogS('pop25');
        ctrlJs.methods.createPoster('#poster2', function(){
            console.log('1');
        });
    });

    // �Ѽ���Ƭ
    // $(".btn-zjdy").on("click", function(){
    //     var title = "���ֿںſ� - Ԫ",
    //         imgSrc = "./ossweb-img/card_kh_1.png";
    //     $("#pop26").find('.J-pop-kh').text(title)
    //         .end().find(".J-kh-img img").attr('src', imgSrc);;
    //     TGDialogS('pop23');
    // });
    // �鿴Ԫ���ںſ�
    $(".part-2 .card-kh-list li").on("click", function(){
        var $this = $(this).find('img'),
            cardIdx = $(this).index(),
            status = globalInfo.user.starId.split("_")[cardIdx],
            obj = {
                idx: cardIdx, //Ԫ������� �ܹ�8��
                status: status, //��ǰԪ������״̬ 0 ~ 3
                name: $this.attr('alt'), //Ԫ��������
                src: $this.eq(status).attr('src'),//Ĭ��Ԫ����ͼƬ��ַ
                cardNum: $this.next().text(),//Ԫ��������
            };

        //globalInfo.shareNormal.imgBase64 = src[activeFm].replace("data:image/png;base64,","");
        var mxnName = {1:'�����', 2:'�����', 3:'������'};
        globalInfo.user.cardNum = $this.next().text();
        globalInfo.user.cardId = parseInt(parseInt(cardIdx)+parseInt(1));//��Ƭid
        globalInfo.user.thisStarId =  $(".card-kh-list li").eq(cardIdx).attr("thisStarId");//��ǰ��Ƭ����id
        ctrlJs.data.cardIdx = cardIdx;
        ctrlJs.methods.lookYqCard(obj);
        $(".J-fm-name span").text(mxnName[globalInfo.user.thisStarId]);
        // �ϱ�
        PTTSendClick('btn', 'btn-ckkhk-'+cardIdx+'-'+(status+1), $(this).find("img:visible").attr('alt'));
    });
    //ʹ�÷��� ȡ�ÿ�Ƭid
    $(".btn-syfm").on("click", function(){
        var $this = $("#popCkKh .swiper-slide-active img"),
                name = $this.attr('alt');
        ctrlJs.data.cardType = $this.attr('data-id');//���µ�ǰ��Ҫ���߹���Ŀ�Ƭid
        $(".J-fm-name span").text(name);
        var $cardItem = $(".card-kh-list li:eq("+ ctrlJs.data.cardIdx +")");
        $cardItem[0].className = 'p-r full-img card-item';
        $cardItem.addClass('card-'+ctrlJs.data.cardType);
        //���Ƿ���id����
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

    // �鿴Ԫ�����ǿ�
    $(".part-2 .card-mx-list li").on("click", function(){
        var $this = $(this).find('img'),
            name = $this.attr('alt'),
            id = $this.parent().attr('data-id'),
            img = './ossweb-img/poster_mx_'+ ctrlJs.data.mxList[id]+'.jpg';
        ctrlJs.methods.load();
        ctrlJs.methods.getBase64(img).then(base64 => {
            ctrlJs.methods.close();
            $("#popCkMx").find('.J-pop-mx').text('Ԫ�����ǿ� - '+ name)
                .end().find(".J-mx-img img").attr('src', base64);
            $("#mxCardticket").text('ʣ��'+ $this.next().text() +'��');
            var cardId = $this.attr("cardVal");
            globalInfo.user.cardId = cardId;
            globalInfo.user.cardNum  = $this.next().text();//ʣ������
            globalInfo.shareNormal.imgBase64 = base64.replace("data:image/png;base64,","");
            TGDialogS('popCkMx');
        }, err => {
            console.log(err);
        })
        // �ϱ�
        PTTSendClick('btn', 'btn-ckmxk-'+id, $(this).find("img:visible").attr('alt'));
    });

    // fxMxcard({
    //     id: 1,
    //     name: '�����'
    // });

    //ѡ����Ҫ�Ŀ�Ƭ
    $(".J-sy-card").on("click", '.card-item', function(){
        var $this = $(this);
        $(".J-sy-card .card-item").removeClass('active');
        $this.addClass('active');
        var cardId = $this.attr("cardVal");
        globalInfo.user.cardId = cardId;
    });

    //ѡ����Ŀ�Ƭ
    $(".J-gx-card").on("click", '.card-item', function(){
        var $this = $(this);
        $(".J-gx-card .card-item").removeClass('active');
        $this.addClass('active');
        var cardId = $this.attr("cardVal");
        //var starId = $this.attr();
        globalInfo.user.cardNum = $("#"+'card_pop_gx'+cardId).text();//��Ƭ����
        globalInfo.user.cardId = cardId;//��Ƭid
    });

    // ��ͬ����װ
    $(".btn-toDown").on("click", function(){
        $("html,body").animate({
            'scrollTop': $(".stage").height() + 'px'
        }, 500);
    });

    //��������հ״��ر�
    $("body").on("touchstart", "#_overlay_", function(){
        if($("#pop3").is(":hidden"))return false;
        setTimeout(function(){
            closeDialog();
        }, 100);
    });

    //���ǿ�˳�����
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
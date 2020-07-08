var ctrlJs = {
    data: {
        pageSwiper: null,// ҳ��Swiper
        pageIdx: 0,//��ǰҳ�����
        navLeft: ['25%', '49%', '73%'],//�α�״̬
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
        gjStatus: false,//Ĭ��Ϊfalse�� ����trueʱ��ʾ��ǰ���Թν�
        prizeResult: '',//�н����
        prizeList: [
            {
                name: '���⡤�����跼��7�죩',
                imgSrc: './ossweb-img/gj_1.png'
            }, {
                name: '��ɫ�ķ���ҳ��1',
                imgSrc: './ossweb-img/gj_2.png'
            }, {
                name: 'Ȫ��������1',
                imgSrc: './ossweb-img/gj_3.png'
            }, {
                name: '˽���ز���1',
                imgSrc: './ossweb-img/gj_4.png'
            }, {
                name: '���ɹ�ѫ���2',
                imgSrc: './ossweb-img/gj_5.png'
            }, {
                name: '�쵶����ӡ��һ���1',
                imgSrc: './ossweb-img/gj_6.png'
            }, {
                name: '���������С�1',
                imgSrc: './ossweb-img/gj_7.png'
            }, {
                name: '�����˻����˱���1',
                imgSrc: './ossweb-img/gj_8.png'
            }, {
                name: '��Ӱ��ϰ¼������1',
                imgSrc: './ossweb-img/gj_9.png'
            }, {
                name: '��Ӱ��ϰ¼������2',
                imgSrc: './ossweb-img/gj_10.png'
            }, {
                name: 'һ��˪����5',
                imgSrc: './ossweb-img/gj_11.png'
            }, {
                name: 'һ����˿��5',
                imgSrc: './ossweb-img/gj_12.png'
            }, {
                name: '��Ӱ��ϰ¼��һ��5',
                imgSrc: './ossweb-img/gj_13.png'
            }, {
                name: '�������2',
                imgSrc: './ossweb-img/gj_14.png'
            }, {
                name: '�쳾��ϻ��1',
                imgSrc: './ossweb-img/gj_15.png'
            }, {
                name: '����20',
                imgSrc: './ossweb-img/gj_16.png'
            }, {
                name: '������20000',
                imgSrc: './ossweb-img/gj_17.png'
            }
        ]
    },
    methods: {
        cutPage: function(idx){//�л�ҳ��
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//�ƶ������α�
            $(".nav-list li").removeClass("active").eq(idx).addClass('active');
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function(){//�ν���ʼ��
            if(ctrlJs.data.gjStatus)return false;
            ctrlJs.data.gjStatus = true;
            var idx = ctrlJs.methods.getRandom(0, ctrlJs.data.prizeList.length);
            $(".cxgj-btn").hide();
            var gjImg = new Image();
            gjImg.src = './ossweb-img/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function(){
                $(gjImg).eraser({
                    size: 20, //������Ƥ����С
                    completeRatio: .6, //���ò����������
                    completeFunction: ctrlJs.methods.showResetButton   //���ڲ������������������
                });
                $(".prize-img img").attr('src', ctrlJs.data.prizeList[idx].imgSrc);
                $(".prize-msg").html(ctrlJs.data.prizeList[idx].name);
                ctrlJs.data.prizeResult = ctrlJs.data.prizeList[idx].name;
            }
        },
		showResetButton: function(){//�ν����
            TGDialogS('popGj');
            ctrlJs.data.gjStatus = false;
            $(".cxgj-btn").show();
            ctrlJs.data.pageSwiper.unlockSwipes();
        },
        initSwiper: function(){// ҳ��Swiper
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
        backHome: function(){//�ص���ҳ
            $(".swiper-container .wrap").fadeOut(300);
            setTimeout(function(){
                $(".part-1 .wrap").show();
                $(".part-1").show();
            }, 600);
        },
        playVideo: function(vid){//������Ƶ
            TGDialogS("popVideo");
            ctrlJs.data.video = new Txplayer({
                containerId: 'videoWrap',
                vid: vid,
                width: ctrlJs.data.videoWidth,
                height: ctrlJs.data.videoHeight,
                autoplay: true
            });
        },
        pauseVideo: function(){//�ر���Ƶ
            closeDialog();
            $("#videoWrap").empty();
        },
        getRandom: function(min, max){//��ȡ�����
            return Math.floor( Math.random() * (max- min) + min );
        }
    },
    init: function(callback){
        var that = this;
        //��������հ״��ر�
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
var ctrlJs = {
    data: {
        pageSwiper: null,// ҳ��Swiper
        pageIdx: 0,//��ǰҳ�����
        navLeft: ['12.8%', '37%', '61%', '85%'],//�α�״̬
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
        gjStatus: false,//Ĭ��Ϊfalse�� ����trueʱ��ʾ��ǰ���Թν�
        prizeResult: '',//�н����
        prizeList: [
            {
                name: '���⡤�����跼��7�죩',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_1.png'
            }, {
                name: '��ɫ�ķ���ҳ��1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_2.png'
            }, {
                name: 'Ȫ��������1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_3.png'
            }, {
                name: '˽���ز���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_4.png'
            }, {
                name: '���ɹ�ѫ���2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_5.png'
            }, {
                name: '�쵶����ӡ��һ���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_6.png'
            }, {
                name: '���������С�1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_7.png'
            }, {
                name: '�����˻����˱���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_8.png'
            }, {
                name: '��Ӱ��ϰ¼������1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_9.png'
            }, {
                name: '��Ӱ��ϰ¼������2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_10.png'
            }, {
                name: 'һ��˪����5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_11.png'
            }, {
                name: 'һ����˿��5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_12.png'
            }, {
                name: '��Ӱ��ϰ¼��һ��5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_13.png'
            }, {
                name: '�������2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_14.png'
            }, {
                name: '�쳾��ϻ��1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_15.png'
            }, {
                name: '����20',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_16.png'
            }, {
                name: '������20000',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_17.png'
            }
        ]
    },
    methods: {
        initShare: function(type){//���÷�������
            if( type == 1 ){//����һ������ʱ��Ĭ�Ϸ��������ô˷�������
                TGMobileShare({
                    shareTitle:'���µ�һ��������������',
                    shareDesc:'�������µ�һ����<��ȸ��>�����ɰٷְ���ȡ����',
                    shareImgUrl:'https://game.gtimg.cn/images/ty/cp/a20200707czkql/share_bw.jpg', //����ͼƬ�ߴ�200*200������д����·��
                    shareLink:'',
                    actName:'a20200615recastkql'
                });
            }else if( type == 2 ) {//��������ʱ���ô˷�������
                TGMobileShare({
                    shareTitle:'��Ѷ�콢���ο�ԤԼ��',
                    shareDesc:'������������Ρ��������µ���ԤԼ�ѿ���������ԤԼ����ר����������Ƚ�פ�󽭺���',
                    shareImgUrl:'https://game.gtimg.cn/images/ty/cp/a20200707czkql/share_yuyue.jpg', //����ͼƬ�ߴ�200*200������д����·��
                    shareLink:'',
                    actName:'a20200615recastkql'
                });
            }
        },
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
            gjImg.src = '//game.gtimg.cn/images/ty/cp/a20200707czkql/p4_gj.jpg';
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
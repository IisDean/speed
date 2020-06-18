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
    },
    methods: {
        initShare: function(type){//���÷������
            if( type == 1 ){//����һ������ʱ��Ĭ�Ϸ������ô˷������
                TGMobileShare({
                    shareTitle:'���µ�һ��������������',
                    shareDesc:'�������µ�һ����<��ȸ��>�����ɰٷְ���ȡ����',
                    shareImgUrl:'https:./ossweb-img/share_bw.jpg', //����ͼƬ�ߴ�200*200������д����·��
                    shareLink:'',
                    actName:'a20200615recastkql'
                });
            }else if( type == 2 ) {//��������ʱ���ô˷������
                TGMobileShare({
                    shareTitle:'��Ѷ�콢���ο�ԤԼ��',
                    shareDesc:'������������Ρ��������µ���ԤԼ�ѿ���������ԤԼ����ר����������Ƚ�פ�󽭺���',
                    shareImgUrl:'https:./ossweb-img/share_yuyue.jpg', //����ͼƬ�ߴ�200*200������д����·��
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
            }
        },
		showResetButton: function(){//�ν����
            alert('���');
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
var ctrlJs = {
    data: {
        pageSwiper: null,// ҳ��Swiper
        pageIdx: 0,//��ǰҳ�����
        navLeft: ['12.8%', '37%', '61%', '85%'],//�α�״̬
        client: $(document.body)[0].clientWidth
    },
    methods: {
        cutPage: function(idx){//�л�ҳ��
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//�ƶ������α�
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function(){//�ν���ʼ��
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
        }
    },
    init: function(){
        var that = this;
        // ���������
        $(".nav-list li").on("click", function(){
            var $this = $(this),
                idx = $this.index();
            idx > 0 ? that.methods.cutPage(idx) : that.methods.backHome();
        });
        // ������ȸ��
        $(".part-1 .start-btn").on("click", function(){
            // ��ʼ��swiper start
            $(".swiper-container").show();
            that.methods.initSwiper();
            // ��ʼ��swiper end
            $(".part-1 .wrap").fadeOut(600);
            $(".swiper-container .wrap").show();
            setTimeout(function(){
                $(".part-1").fadeOut(300);
            }, 600);
        });
        // �ϳɿ�ȸ��
        $(".part-2 .hckql-btn").on("click", function(){
            $(".part-2 .bw-wrap").addClass('active');
            $(".part-2 .btn-container").animate({
                "margin-top": '.5rem',
                "opacity": 0
            }, 600, function(){
                
            });
        });
        // ��Ѱ����
        $(".sxbw-btn").on("click", function(){
            that.methods.cutPage(2);
        });
        //�ν�
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
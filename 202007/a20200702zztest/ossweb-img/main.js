var ctrlJs = {
    data: {
        // �����б�
        mpList: {
            mp_sd: {
                name: '��',
                posterSrc: './ossweb-img/result_shendao.png'
            },
            mp_sl: {
                name: '����',
                posterSrc: './ossweb-img/result_shaolin.png'
            },
            mp_tb: {
                name: '̫��',
                posterSrc: './ossweb-img/result_taibai.png'
            },
            mp_sw: {
                name: '����',
                posterSrc: './ossweb-img/result_shenwei.png'
            },
            mp_tm: {
                name: '����',
                posterSrc: './ossweb-img/result_tangmen.png'
            },
            mp_tx: {
                name: '����',
                posterSrc: './ossweb-img/result_tianxiang.png'
            },
            mp_wd: {
                name: '�嶾',
                posterSrc: './ossweb-img/result_wudu.png'
            },
            mp_yh: {
                name: '�ƻ�',
                posterSrc: './ossweb-img/result_yihua.png'
            },
            mp_gb: {
                name: 'ؤ��',
                posterSrc: './ossweb-img/result_gaibang.png'
            },
            mp_zw: {
                name: '����',
                posterSrc: './ossweb-img/result_zhenwu.png'
            }
        },
        //�����б�
        questionList: {
            q_1: {
                title: '���뽭�����ڿ�������һ��ؤ��·Ҫ���������',
                options: [
                    {
                        val: '�����򷢵�',
                        next: 'q_1_1'
                    }, {
                        val: '����һ��',
                        next: 'q_1_2'
                    }, {
                        val: '����һ��Ҫ',
                        next: 'q_1_3'
                    }, {
                        val: '����',
                        next: 'q_1_4_1'
                    }
                ]
            },
            q_1_1: {
                title: '�����ǰ���Ҫ���ĸ��̣��������˲���������ȥ��������',
                options: [
                    {
                        val: '��Ȼǰ��',
                        next: 'q_1_1_1'
                    }, {
                        val: '���ǲ��ú��⣬�ܾ���',
                        next: 'q_1_1_2'
                    }
                ]
            },
            q_1_2: {
                title: '�����������ֲ������£����������峤������һ������һֱ�������е�������',
                options: [
                    {
                        val: '�ǣ��ٱ�֮�ף�������֮',
                        next: 'q_1_2_1'
                    }, {
                        val: '���ǣ�װ��һ��',
                        next: 'q_1_2_2'
                    }
                ]
            },
            q_1_3: {
                title: '��Ҫ���Ĳ����ǣ�',
                options: [
                    {
                        val: '��֮���飬��֮����',
                        result: 'mp_sl'
                    }, {
                        val: '��Ŷ��գ����ݽ�Ŀ',
                        result: 'mp_yh'
                    }, {
                        val: '���˾��ܣ���������',
                        result: 'mp_gb'
                    }
                ]
            },
            q_1_4_1: {
                title: '�ٲ�󣬴������ɿڳ�����ʮ�������㷢�ִ����������ˣ���·ʵ���Ȳ����ѡ�',
                options: [
                    {
                        val: '�����ҩҽ��',
                        result: 'mp_tx'
                    }, {
                        val: '�ٿؿ��ܽ�������ȥҽ��',
                        result: 'mp_tm'
                    }
                ]
            },
            q_1_4_2: {
                title: '�ٲ�󣬴������ɿڳ�����ʮ�������㷢�ֵ�Ʀ�����ٰ���ؤ���κδ����书��ǿ���ٱ�Ҳ�ް취',
                options: [
                    {
                        val: '�ٸ���ƶ����ʰ�������Ӽ�����',
                        result: 'mp_sd'
                    }, {
                        val: '���Ĵ��䣬��С֮ͽ�������Һ�',
                        result: 'mp_sw'
                    }
                ]
            },
            q_1_1_1: {
                title: '���̼���ֲ������ݣ��ղ������ֻ�������Ǹ�������Ȥ',
                options: [
                    {
                        val: '�������',
                        result: 'mp_tx'
                    }, {
                        val: '�����ֻ�',
                        result: 'mp_tm'
                    }
                ]
            },
            q_1_1_2: {
                title: '�����ȥ��������һ������������׳�����ƺ�ʢ���������',
                options: [
                    {
                        val: '����ͦ�ã�������סһ��',
                        result: 'mp_zw'
                    }, {
                        val: '�𴦻��и��õķ羰',
                        next: 'q_1_1_2_1'
                    }
                ]
            },
            q_1_2_1: {
                title: '��ϲ��ʲô���Ĺ�����ʽ',
                options: [
                    {
                        val: '�������ȣ��콣�޺�',
                        result: 'mp_tb'
                    }, {
                        val: '��ת�ػأ�����˸�',
                        result: 'mp_zw'
                    }
                ]
            },
            q_1_2_2: {
                title: '·������ʦ�������벻�볢��һ��',
                options: [
                    {
                        val: '���Կ�',
                        result: 'mp_wd'
                    }, {
                        val: '��������',
                        next: 'q_1_2_2_1'
                    }
                ]
            },
            q_1_1_2_1: {
                title: '�����캣������һֻ��ӥ����ʮ���׽��㣬�����',
                options: [
                    {
                        val: '���𵽵ף���������',
                        result: 'mp_sd'
                    }, {
                        val: '�����������Ե���������ع�ɽ��',
                        result: 'mp_sl'
                    }
                ]
            },
            q_1_2_2_1: {
                title: '��ǰ��������������˵����ɳĮ�ľ�ͷ��һƬ���֣�Ҫȥ̽һ̽������',
                options: [
                    {
                        val: '�ҹ��ǻ�������������Դ',
                        result: 'mp_sw'
                    }, {
                        val: 'ȥ����',
                        result: 'mp_yh'
                    }
                ]
            }                
        },
        loadImgList: [
            './ossweb-img/p2_options_active.png',
        ],//ͼƬԤ�����б�
        optionsNum: ['A', 'B', 'C', 'D'],//ѡ�����
        activeKey: 'q_1',//��ǰ�����ֵ��
        activeQuestion: null,
        result: '',//�������������쵶���ʺϵ�������
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
        //������ά���ַ
        createQrcode: function(){
            var url = window.location.href;
            var qrcode = new QRCode('qrcode', {
                text: url,
                render: 'table',
                width: 138,
                height: 138,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        // ��һҳ׼��
        nextPageRead: function(idx){
            if(idx && idx < 7){
                setTimeout(function(){
                    ctrlJs.data.pageIdx = idx;
                    $(".part-" + idx).addClass("part-show").show();
                }, 100);
            }
        },
        //�ص���һҳ
        prevPage: function(){
            var idx = ctrlJs.data.pageIdx;
            ctrlJs.data.pageIdx--;
            $(".part-" + idx).removeClass("part-show").css("display", "none");
        },
        //�л���Ŀ
        cutQuestion: function(){
            ctrlJs.data.activeQuestion = ctrlJs.data.questionList[ ctrlJs.data.activeKey ];
            ctrlJs.handlers.renders_topic_list( ctrlJs.data.activeQuestion );
        },
        //�����������ʼ�����ҳ
        initResult: function(){
            ctrlJs.methods.load();
            var src = ctrlJs.data.mpList[ ctrlJs.data.result ].posterSrc;
            ctrlJs.data.loadImgList.push(src);
            ctrlJs.methods.loadImg(function(){
                $(".result-container img").attr('src', src);
                ctrlJs.methods.nextPageRead(3);
                // ���ɺ���
                // console.log('���ɺ���');
                ctrlJs.methods.createPoster();
            });
        },
        // ���ɺ���
        createPoster: function(){
            setTimeout(function(){
                dom2img('#poster', {
                    ondone: function () {
                        ctrlJs.methods.close();
                        var posterSrc = $(".dom2img-result").attr('src');
                        $(".poster-img").attr('src', posterSrc);
                    }
                });
            }, 600);
        },
        // ��ȡ�����
        getRandom: function(min, max){
            return Math.floor( Math.random() * (max - min) + min);
        }
    },
    handlers: {
        //��Ⱦ��Ŀ�б�
        renders_topic_list: function(data){
            console.log(data);
            if(typeof data !== 'object')return false;
            var topic_str = '<li class="p-a bg">'
                    +'<div class="question-title-wrap">'
                    +    '<p class="question-title">'+ data.title +'</p>'
                    +'</div>';
            data.options.forEach(function(ev, idx){
                topic_str += '<a href="javascript: ;" class="bg options-item btn-hover" data-idx="'+ idx +'"><span>'+ ctrlJs.data.optionsNum[idx] +'</span>'+ ev.val +'</a>';
            });
            topic_str += '</li>';
            $(".question-list").append(topic_str);
        }
    },
    //��ʼ����ҳ����غ�ִ��
    init: function (callback) {
        var that = this;
        // ���ɺ�����ά��
        that.methods.createQrcode();
        //ͼƬԤ����
        that.methods.loadImg();
        
        if(callback)callback(this);
    }
};

ctrlJs.init(function(that){});

$(function () {
    // var vConsole = new VConsole();
    
    //��ҳ��������
    var src='./ossweb-img/interlude.mp4';    
    var videoPlayer = new MMD.VideoPlayer({             
        videoElement: document.getElementById('video'),//[����],videoԪ��;
        src: src,//[����],video src;
        loop: false,//[��ѡ],�Ƿ�ѭ��,Ĭ��false,trueΪѭ��;
        muted: false,//[��ѡ],�Ƿ���,Ĭ��false,IOS��ֻ��IOS10��Ч,��׿��Ч;
        poster:'',//[��ѡ],videoĬ��ͼƬ;
        tryMultipleVideoPlayAtTheSameTime: false,//[��ѡ],����ͬʱ���Ŷ����Ƶ,Ĭ��false;
        timesParam: [
            {name: 'firstPoint',time: 11.48}
        ],//[��ѡ],video currenttimeʱ���;
        onTimes: function(name){             
            switch (name) {                    
                case 'firstPoint':                                    
                    break;
            }
        },//[��ѡ],video currenttime�ص�;
        onStart: function(){                
            // console.log('video start');
            ctrlJs.methods.close();
            setTimeout(function(){
                ctrlJs.methods.nextPageRead(2);
            }, 1500);
        },//[��ѡ],video��һ��������ֻص�;
        onEnd: function(){                
            // console.log('video end');
            $(".interlude-wrap").hide();
        }//[��ѡ],video������ɻص�;
    });
    //��isVideoCanAutoPlay����Ϊtrueʱ,����������Զ�����;
    //falseʱ,����Ҫͨ���û�������ܲ�����Ƶ;
    if(videoPlayer.isVideoCanAutoPlay) {
        // videoPlayer.play();
    }else {        
        //click to play;
    }   
    
    //��ʼ����
    $(".part-1 .btn-start").on("click", function(){
        ctrlJs.methods.load();
        //��ʼ����Ŀ
        ctrlJs.methods.cutQuestion( ctrlJs.data.activeKey );
        videoPlayer.play();
    });

    //ѡ���
    $(".question-list").on("click", "a", function(){
        var $this= $(this),
            idx = $this.attr('data-idx');
        $this.addClass("active").siblings('a').removeClass('active');
        var obj = ctrlJs.data.activeQuestion;
        setTimeout(function(){
            if(obj.options[idx].result){
                //�������
                ctrlJs.data.result = obj.options[idx].result;
                ctrlJs.methods.initResult();
            }else {
                //������һ��
                ctrlJs.data.activeKey = obj.options[idx].next;
                ctrlJs.methods.cutQuestion();
            }
        }, 500);
    });

    //��������հ״��ر�
    $("body").on("touchstart", "#_overlay_", function(){
        setTimeout(function(){
            closeDialog();
        }, 100);
    });

});

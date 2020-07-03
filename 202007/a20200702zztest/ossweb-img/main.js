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
        optionsNum: ['A', 'B', 'C', 'D'],//ѡ�����
        activeKey: 'q_1',//��ǰ�����ֵ��
        activeQuestion: null,
        result: '',//�������������쵶���ʺϵ�������
    },
    methods: {
        //ͼƬԤ����
        loadImg: function(){
            var that = this,
                imgLoad = 0,
                pro = 0,
                imgList = g.data.loadImgList;
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
                        console.log('�������');
                        ctrlJs.data.isImgLoading = true;
                    }
                }
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
            $(".result-container img").attr('src', ctrlJs.data.mpList[ ctrlJs.data.result ].posterSrc);
            ctrlJs.methods.nextPageRead(3);
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
        //��ʼ����Ŀ
        that.methods.cutQuestion( that.data.activeKey );
        
        if(callback)callback(this);
    }
};

ctrlJs.init(function(that){});

$(function () {
    var vConsole = new VConsole();
    
    //��ҳ��������
    var video = document.getElementById('video');
        video.load();
        video.onload = function(){
            console.log('12344');
        }
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
                console.log('video start');
                setTimeout(function(){
                    ctrlJs.methods.nextPageRead(2);
                }, 1500);
            },//[��ѡ],video��һ��������ֻص�;
            onEnd: function(){                
                console.log('video end');
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
                console.log(ctrlJs.data.activeKey);
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

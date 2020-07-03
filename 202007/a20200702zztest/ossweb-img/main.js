var ctrlJs = {
    data: {
        // 门派列表
        mpList: {
            mp_sd: {
                name: '神刀',
                posterSrc: './ossweb-img/result_shendao.png'
            },
            mp_sl: {
                name: '少林',
                posterSrc: './ossweb-img/result_shaolin.png'
            },
            mp_tb: {
                name: '太白',
                posterSrc: './ossweb-img/result_taibai.png'
            },
            mp_sw: {
                name: '神威',
                posterSrc: './ossweb-img/result_shenwei.png'
            },
            mp_tm: {
                name: '唐门',
                posterSrc: './ossweb-img/result_tangmen.png'
            },
            mp_tx: {
                name: '天香',
                posterSrc: './ossweb-img/result_tianxiang.png'
            },
            mp_wd: {
                name: '五毒',
                posterSrc: './ossweb-img/result_wudu.png'
            },
            mp_yh: {
                name: '移花',
                posterSrc: './ossweb-img/result_yihua.png'
            },
            mp_gb: {
                name: '丐帮',
                posterSrc: './ossweb-img/result_gaibang.png'
            },
            mp_zw: {
                name: '真武',
                posterSrc: './ossweb-img/result_zhenwu.png'
            }
        },
        //问题列表
        questionList: {
            q_1: {
                title: '初入江湖，在开封南门一乞丐拦路要饭，你决定',
                options: [
                    {
                        val: '给他打发点',
                        next: 'q_1_1'
                    }, {
                        val: '打他一顿',
                        next: 'q_1_2'
                    }, {
                        val: '跟他一起要',
                        next: 'q_1_3'
                    }, {
                        val: '报官',
                        next: 'q_1_4_1'
                    }
                ]
            },
            q_1_1: {
                title: '他竟是爱好要饭的富商，觉得你人不错想邀你去府上坐坐',
                options: [
                    {
                        val: '欣然前往',
                        next: 'q_1_1_1'
                    }, {
                        val: '定是不好好意，拒绝他',
                        next: 'q_1_1_2'
                    }
                ]
            },
            q_1_2: {
                title: '他竟与你身手不相上下，他见你身佩长剑，成一名剑客一直是你心中的梦想吗？',
                options: [
                    {
                        val: '是，百兵之首，君子佩之',
                        next: 'q_1_2_1'
                    }, {
                        val: '不是，装饰一下',
                        next: 'q_1_2_2'
                    }
                ]
            },
            q_1_3: {
                title: '你要饭的策略是？',
                options: [
                    {
                        val: '动之以情，晓之以理',
                        result: 'mp_sl'
                    }, {
                        val: '多才多艺，表演节目',
                        result: 'mp_yh'
                    }, {
                        val: '抢了就跑，绝不纠缠',
                        result: 'mp_gb'
                    }
                ]
            },
            q_1_4_1: {
                title: '官差到后，此人依旧口出狂言十分无礼，你发现此人身上有伤，拦路实属迫不得已。',
                options: [
                    {
                        val: '赠予草药医治',
                        result: 'mp_tx'
                    }, {
                        val: '操控傀儡将此人送去医馆',
                        result: 'mp_tm'
                    }
                ]
            },
            q_1_4_2: {
                title: '官差到后，此人依旧口出狂言十分无礼，你发现地痞无赖假扮乞丐，奈何此人武功高强，官兵也无办法',
                options: [
                    {
                        val: '劫富济贫，收拾无赖，接济穷人',
                        result: 'mp_sd'
                    }, {
                        val: '弃文从武，宵小之徒，能耐我何',
                        result: 'mp_sw'
                    }
                ]
            },
            q_1_1_1: {
                title: '富商家种植奇珍异草，收藏名人字画，你对那个更感兴趣',
                options: [
                    {
                        val: '奇珍异果',
                        result: 'mp_tx'
                    }, {
                        val: '名人字画',
                        result: 'mp_tm'
                    }
                ]
            },
            q_1_1_2: {
                title: '你决定去襄州云游一番，看到波澜壮阔的云海盛景，你觉得',
                options: [
                    {
                        val: '这里挺好，留下来住一阵',
                        result: 'mp_zw'
                    }, {
                        val: '别处会有更好的风景',
                        next: 'q_1_1_2_1'
                    }
                ]
            },
            q_1_2_1: {
                title: '你喜欢什么样的攻击方式',
                options: [
                    {
                        val: '剑在意先，快剑无痕',
                        result: 'mp_tb'
                    }, {
                        val: '婉转迂回，以柔克刚',
                        result: 'mp_zw'
                    }
                ]
            },
            q_1_2_2: {
                title: '路遇纹身师傅，你想不想尝试一下',
                options: [
                    {
                        val: '试试看',
                        result: 'mp_wd'
                    }, {
                        val: '还是算了',
                        next: 'q_1_2_2_1'
                    }
                ]
            },
            q_1_1_2_1: {
                title: '你在徐海救助了一只雏鹰，它十分亲近你，你决定',
                options: [
                    {
                        val: '负责到底，把他养大',
                        result: 'mp_sd'
                    }, {
                        val: '万事万物皆有缘法，放他回归山林',
                        result: 'mp_sl'
                    }
                ]
            },
            q_1_2_2_1: {
                title: '你前往燕云游历，传说燕云沙漠的尽头有一片桃林，要去探一探究竟吗？',
                options: [
                    {
                        val: '家国忧患，怎可留恋桃源',
                        result: 'mp_sw'
                    }, {
                        val: '去看看',
                        result: 'mp_yh'
                    }
                ]
            }                
        },
        optionsNum: ['A', 'B', 'C', 'D'],//选项序号
        activeKey: 'q_1',//当前问题键值名
        activeQuestion: null,
        result: '',//答题结果，你在天刀最适合的门派是
    },
    methods: {
        //图片预加载
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
                        console.log('加载完成');
                        ctrlJs.data.isImgLoading = true;
                    }
                }
            });
        },
        // 下一页准备
        nextPageRead: function(idx){
            if(idx && idx < 7){
                setTimeout(function(){
                    ctrlJs.data.pageIdx = idx;
                    $(".part-" + idx).addClass("part-show").show();
                }, 100);
            }
        },
        //回到上一页
        prevPage: function(){
            var idx = ctrlJs.data.pageIdx;
            ctrlJs.data.pageIdx--;
            $(".part-" + idx).removeClass("part-show").css("display", "none");
        },
        //切换题目
        cutQuestion: function(){
            ctrlJs.data.activeQuestion = ctrlJs.data.questionList[ ctrlJs.data.activeKey ];
            ctrlJs.handlers.renders_topic_list( ctrlJs.data.activeQuestion );
        },
        //答题结束，初始化结果页
        initResult: function(){
            $(".result-container img").attr('src', ctrlJs.data.mpList[ ctrlJs.data.result ].posterSrc);
            ctrlJs.methods.nextPageRead(3);
        },
        // 获取随机数
        getRandom: function(min, max){
            return Math.floor( Math.random() * (max - min) + min);
        }
    },
    handlers: {
        //渲染题目列表
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
    //初始化，页面加载后执行
    init: function (callback) {
        var that = this;
        //初始化题目
        that.methods.cutQuestion( that.data.activeKey );
        
        if(callback)callback(this);
    }
};

ctrlJs.init(function(that){});

$(function () {
    var vConsole = new VConsole();
    
    //首页过场动画
    var video = document.getElementById('video');
        video.load();
        video.onload = function(){
            console.log('12344');
        }
        var src='./ossweb-img/interlude.mp4';    
        var videoPlayer = new MMD.VideoPlayer({             
            videoElement: document.getElementById('video'),//[必填],video元素;
            src: src,//[必填],video src;
            loop: false,//[可选],是否循环,默认false,true为循环;
            muted: false,//[可选],是否静音,默认false,IOS下只有IOS10生效,安卓生效;
            poster:'',//[可选],video默认图片;
            tryMultipleVideoPlayAtTheSameTime: false,//[可选],尝试同时播放多个视频,默认false;
            timesParam: [
                {name: 'firstPoint',time: 11.48}
            ],//[可选],video currenttime时间点;
            onTimes: function(name){             
                switch (name) {                    
                    case 'firstPoint':                                    
                        break;
                }
            },//[可选],video currenttime回调;
            onStart: function(){                
                console.log('video start');
                setTimeout(function(){
                    ctrlJs.methods.nextPageRead(2);
                }, 1500);
            },//[可选],video第一个画面出现回调;
            onEnd: function(){                
                console.log('video end');
                $(".interlude-wrap").hide();
            }//[可选],video播放完成回调;
        });
        //当isVideoCanAutoPlay属性为true时,则代表允许自动播放;
        //false时,则需要通过用户点击才能播放视频;
        if(videoPlayer.isVideoCanAutoPlay) {
            // videoPlayer.play();
        }else {        
            //click to play;
        }   
    
    //开始测试
    $(".part-1 .btn-start").on("click", function(){
        videoPlayer.play();
    });

    //选择答案
    $(".question-list").on("click", "a", function(){
        var $this= $(this),
            idx = $this.attr('data-idx');
        $this.addClass("active").siblings('a').removeClass('active');
        var obj = ctrlJs.data.activeQuestion;
        setTimeout(function(){
            if(obj.options[idx].result){
                //答题结束
                ctrlJs.data.result = obj.options[idx].result;
                ctrlJs.methods.initResult();
            }else {
                //进入下一题
                ctrlJs.data.activeKey = obj.options[idx].next;
                console.log(ctrlJs.data.activeKey);
                ctrlJs.methods.cutQuestion();
            }
        }, 500);
    });

    //点击弹窗空白处关闭
    $("body").on("touchstart", "#_overlay_", function(){
        setTimeout(function(){
            closeDialog();
        }, 100);
    });

});

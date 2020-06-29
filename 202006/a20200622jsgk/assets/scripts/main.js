var isMaster = false;
var g = {
    dateOpen: '2020/6/22 00:00:00',
    passportApi: isMaster ? '//pf-api.xoyo.com/' : '//my-api-dev.xoyo.com/',
    domain: isMaster ? '//ws.xoyo.com' : '//test-ws.xoyo.com',
    isApp: window.THIRD_PARTY_AUTH && window.THIRD_PARTY_AUTH.ua === 'daily' ? true : false,// 判断是否处于推栏app的环境
    apis: {
        get_qjpz: '/jxsj/gkh5200628/get_config',  //获取全局配置
        get_topic_list: '/jxsj/gkh5200628/get_question_list',//获取题目列表
        submit_answer: '/jxsj/gkh5200628/submit_answer',//提交答案
        get_cdkey: '/jxsj/gkh5200628/get_code',//获取激活码
    },
    data: {
        pageIdx: 1, //当前页
        userName: '', // 用户姓名
        sex: '', //性别
        game_token: '',//本局token
        topicList: [],//题目列表
        topicNum: 1,//当前题号
        resultList: [],//选择答案
        is_code1: 0,//以往是否获取激活码  0-否 1-是
        is_code2: 0,//答完题是否获得激活码资格  0-否 1-是
        code: '',//激活码
        score: 0,//答题分数
        //图片预加载列表
        isImgLoading: false,//是否加载完成
        loadImgList: [
            './assets/images/p1_bg.jpg',
            './assets/images/p2_bg.jpg',
            './assets/images/p3_bg.jpg',
            './assets/images/p4_bg.jpg',
            './assets/images/result_inset_1.png',
            './assets/images/result_inset_2.png',
            './assets/images/result_inset_3.png',
            './assets/images/result_inset_4.png',
        ],
    },
    ajax: function (o, callback) {
        var t = {
            method: o.method || 'get',
            url: g.domain + o.url,
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded',
        };
        // console.log(t);
        $.ajax({
            type: t.method,
            url: t.url,
            data: t.data,
            dataType: t.dataType,
            contentType: t.contentType,
            xhrFields: {withCredentials: true},  //跨域需要携带cookie是需要设置
            success: function (data) {
                console.log(data)
                if (callback) {
                    callback(data);
                }
            },
            error: function (xhr, type) {
                if (callback) {
                    callback({
                        code: -505,
                        msg: '系统错误，请稍后再试！',
                        message: '系统错误，请稍后再试！',
                        data: {
                            phone: ''
                        }
                    });
                }
            }
        });
    },
    methods: {
        //获取微信授权
        getWxSq: function(url){
            window.location.href = url;
        },
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
                        // console.log('加载完成');
                        g.data.isImgLoading = true;
                    }
                }
            });
        },
        // 下一页准备
        nextPageRead: function(idx){
            var that = this;
            if(idx && idx < 7){
                setTimeout(function(){
                    g.data.pageIdx = idx;
                    $(".part-" + idx).addClass("part-show").show();
                }, 100);
            }
        },
        //回到上一页
        prevPage: function(){
            var idx = ctrlJs.data.pageIdx;
            g.data.pageIdx--;
            $(".part-" + idx).removeClass("part-show").css("display", "none");
        },
        //下一题
        nextQuestion: function(){
            if(!g.data.resultList[ g.data.topicNum-1 ])return $.lay.msg('请先选择此题答案哦~', {time: 600});
            g.data.topicNum++;
            g.methods.cutQuestion();
        },
        // 上一题
        prevQuestion: function(){
            if(g.data.topicNum <= 1)return false;
            g.data.topicNum--;
            g.methods.cutQuestion();
        },
        //切换题目
        cutQuestion: function(){
            $(".part-3 .answer-list li").hide().eq(g.data.topicNum-1).show();
            if(g.data.topicNum <= 1){
                $(".part-3 .btn-container a").hide().eq(1).show();
            }else if(g.data.topicNum >= g.data.topicList.length){
                $(".part-3 .btn-container a").show().eq(1).hide();
            }else {
                $(".part-3 .btn-container a").show().eq(2).hide();
            }
        },
        //交卷
        submitResult: function(){
            if(!g.data.resultList[ g.data.topicNum-1 ])return $.lay.msg('请先选择此题答案哦~', {time: 600});
            var result = '',
                key = ['A', 'B', 'C', 'D'];
            g.data.resultList.forEach(function(ev, idx){
                result += '&answer['+ev.id+']='+key[ev.result];
            });
            g.getData.get_submit_result(result, function(data){
                //返回分数&是否可以获取激活码
                g.data.is_code2 = data.data.reply.can_get_code;
                g.data.score = data.data.reply.score;
                //进入页面4
                g.methods.nextPageRead(4);
                // 生成海报
                g.methods.createPoster();
            });
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
            $('#qrcode img').attr('src',canvas.toDataURL('image/jpg')).show().prev().hide();
        },
        //生成海报
        createPoster: function(){
            var codeSrc = $("#qrcode img").attr('src'),
                score = g.data.score,
                $inset = $(".J-inset-wrap img");
            $(".part-4 .code-wrap img").attr("src", codeSrc);
            $(".part-4 .J-score-text").text(score);
            if(score < 10){
                $inset.attr('src', './assets/images/result_inset_1.png');
            }else if(score >= 0 && score <= 50){
                $inset.attr('src', './assets/images/result_inset_2.png');
            }else if(score >= 60 && score <= 70){
                $inset.attr('src', './assets/images/result_inset_3.png');
            }else if(score >= 80 && score <= 100){
                $inset.attr('src', './assets/images/result_inset_4.png');
            }
            $.lay.load();
            setTimeout(function(){
                dom2img('#poster', {
                    ondone: function () {
                        $.lay.close();
                        var posterSrc = $(".dom2img-result").attr('src');
                        $(".poster-img").attr('src', posterSrc);
                    }
                });
            }, 600);
        }
    },
    getData: {
        /**
         * 获取全局配置
         * */
        get_qjpz: function(callback){
            var options = {
                url: g.apis.get_qjpz,
                type: 'get',
                data: { },
            };
            g.ajax(options, function(data) {
                if(data.code == 1) {
                    // console.log(data);
                    if(callback)callback(data);
                }else if(data.code == -10801){
                    // 微信授权
                    g.methods.getWxSq(data.data.auth_url);
                    console.log('微信授权');
                }else {
                    console.log(data);
                }
            });
        },
        /**
         * 获取题目列表
         * */
        getTopicList: function(callback){
            var options = {
                url: g.apis.get_topic_list,
                type: 'get',
                data: {}
            };
            $.lay.load();
            g.ajax(options, function(data){
                $.lay.close();
                if(data.code == 1) {
                    // 取得本局题目
                    g.data.topicList = data.data.reply.question_list;
                    g.data.game_token = data.data.reply.game_token;
                    if(callback)callback(data);
                }else if(data.code == -10801){
                    // 微信授权
                    g.methods.getWxSq(data.data.auth_url);
                }else {
                    console.log(data);
                }
            });
        },
        /**
         * 提交答案
         * */ 
        get_submit_result: function(result, callback){
            var options = {
                url: g.apis.submit_answer+'?'+'game_token=' + g.data.game_token + result,
                type: 'get',
                data: {}
            };
            $.lay.load();
            g.ajax(options, function(data){
                $.lay.close();
                if(data.code == 1) {
                    if(callback)callback(data);
                }else if(ret.code == -10801){
                    // 微信授权
                    g.methods.getWxSq(data.data.auth_url);
                }else {
                    console.log(data);
                }
            });
        },
        /**
         * 获取激活码
         * */ 
        getCDkey: function(callback){
            var url;
            g.data.isCdKey ? url = g.apis.get_cdkey : url = 0;
            var options = {
                url: g.apis.get_cdkey,
                type: 'get',
                data: {}
            };
            $.lay.load();
            g.ajax(options, function(data){
                $.lay.close();
                setTimeout(function(){
                    if(data.code == 1) {
                        if(callback)callback(data);
                    }else if(data.code == -10801){
                        // 微信授权
                        g.methods.getWxSq(data.data.auth_url);
                    }else {
                        console.log(data);
                    }
                }, 500);
            });
        }
    },
    handlers: {
        //渲染题目列表
        renders_topic_list: function(data){
            var topic_str = '',
                topic_num = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            data.forEach(function(ev, idx){
                topic_str += '<li data-id="'+ ev.id +'">'
                +'<p class="answer-title-test">'+ topic_num[idx]+ '、' + ev.ask +'</p>'
                +'<a href="javascript: ;" class="p-r answer-option btn-hover" data-idx="0"><i class="icons"></i>[ A ] '+ ev.options.A +'</a>'
                +'<a href="javascript: ;" class="p-r answer-option btn-hover" data-idx="1"><i class="icons"></i>[ B ] '+ ev.options.B +'</a>'
                +'<a href="javascript: ;" class="p-r answer-option btn-hover" data-idx="2"><i class="icons"></i>[ C ] '+ ev.options.C +'</a>'
                +'<a href="javascript: ;" class="p-r answer-option btn-hover" data-idx="3"><i class="icons"></i>[ D ] '+ ev.options.D +'</a>'
                +'</li>';
            });
            
            console.log(g.data.topicList);
            $(".answer-list").html(topic_str).find("li").eq(0).show();
        }
    },
    init: function (callback) {
        //图片预加载
        g.methods.loadImg();
        // 生成海报二维码
        g.methods.createQrcode();
        //修复 IOS12，微信 6.7.4+ 键盘不回弹的问题
        $('body').on('blur',"input,select,textarea",function(){
            if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                setTimeout(() => {
                    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            }
        })
        if(callback)callback(this);
    }
};


$(function () {

    var vConsole = new VConsole();
    // g.methods.nextPageRead(2);
    
    // 核对准考证
    $(".part-1 .btn-start").on("click", function(){
        //获取全局配置
        $.lay.load();
        g.getData.get_qjpz(function(data){
            $.lay.close();
            g.data.userName = $("#userName").val();
            g.data.sex = $("input[name='sex']:checked").val();
            if(g.data.userName == '') return $.lay.msg('请填写姓名', {time: 600});
            var avatarSrc,sexText;
            if(g.data.sex == 1){
                avatarSrc = './assets/images/avatar_boy.png';
                sexText = '男';
            }else if( g.data.sex == 2) {
                avatarSrc = './assets/images/avatar_girl.png';
                sexText = '女';
            }
            $(".J-user-name").text(g.data.userName);
            $(".J-sex-text").text(sexText);
            $(".J-sex-avatar").attr('src', avatarSrc);
            //更新激活码信息
            g.data.is_code1 = data.data.reply.can_get_code;
            g.data.code = data.data.reply.code;
            console.log(g.data);
            //进入页面2
            g.methods.nextPageRead(2);
        });
    });

    //开始答题
    $(".part-2 .btn-answer").on("click", function(){
        g.getData.getTopicList(function(){
            //渲染题目列表
            g.handlers.renders_topic_list(g.data.topicList);
            g.methods.nextPageRead(3);
        });
    });

    //选择答案
    $(".part-3 .answer-list").on("click", "li a", function(){
        var $this = $(this),
            idx,
            topic_num = g.data.topicNum-1;
        $this.addClass('active').siblings('a').removeClass('active');
        idx = $this.attr("data-idx");
        g.data.resultList[ topic_num ] = {
            id: g.data.topicList[ topic_num ].id,
            result: idx
        };
    });

    //获取奖励
    $(".btn-lqjl").on("click", function(){
        if(!g.data.is_code1 && !g.data.is_code2 && g.data.code == ''){
            return $.lay.msg("暂未获得领取资格", {time: 600});
        }else if(g.data.is_code1 || g.data.is_code2){
            //答题完成，获得领取激活码资格
            g.getData.getCDkey(function(data){
                $(".J-cd-key").text(data.data.reply.code);
                $.lay.open($("#popTicket"));
                //初始化复制激活码
                var clipboard = new ClipboardJS('#copyBtn');
                clipboard.on('success', function(e) {
                    $.lay.msg("复制成功", {time: 600});
                });
                g.data.is_code1 = g.data.is_code2 = 0;
            });
        }else if(g.data.code != ''){
            console.log('123');
            $(".J-cd-key").text(g.data.code);
            $.lay.open($("#popTicket"));
            //初始化复制激活码
            var clipboard = new ClipboardJS('#copyBtn');
            clipboard.on('success', function(e) {
                $.lay.msg("复制成功", {time: 600});
            });
        }
    });
});

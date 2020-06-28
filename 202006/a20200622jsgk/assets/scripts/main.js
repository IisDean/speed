var isMaster = false;
var g = {
    dateOpen: '2020/4/24 00:00:00',
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
    },
    ajax: function (o, callback) {
        var t = {
            method: o.method || 'get',
            url: g.domain + o.url,
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded',
        };
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
        //海报二维码地址
        createQrcode: function(){
            var url = window.location.href;
            var qrcode = new QRCode('qrcode', {
                text: url,
                width: 210,
                height: 210,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        //生成海报
        createPoster: function(){
            var codeSrc = $("#qrcode img").attr('src');
            $(".part-4 .code-wrap img").attr("src", codeSrc);
            dom2img('#poster', {
                ondone: function () {
                    var posterSrc = $(".dom2img-result").attr('src');
                    $(".poster-img").attr('src', posterSrc);
                }
            });
        }
    },
    getData: {
        /**
         * 获取全局配置
         * */
        get_qjpz: function(){
            var options = {
                url: g.apis.get_qjpz,
                type: 'get',
                data: { },
            };
            g.ajax(options, function(data) {
                if(data.code == 1) {
                    console.log(data);
                }else if(ret.code == -10801){
                    // 微信授权
                    g.methods.getWxSq(data.data.auth_url);
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
                    if(callback)callback(data);
                }else if(ret.code == -10801){
                    // 微信授权
                    g.methods.getWxSq(data.data.auth_url);
                }else {
                    console.log(data);
                }
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
                +'<a href="javascript: ;" class="p-r answer-option"><i class="icons"></i>[ A ] '+ ev.options.A +'</a>'
                +'<a href="javascript: ;" class="p-r answer-option"><i class="icons"></i>[ B ] '+ ev.options.B +'</a>'
                +'<a href="javascript: ;" class="p-r answer-option"><i class="icons"></i>[ C ] '+ ev.options.C +'</a>'
                +'<a href="javascript: ;" class="p-r answer-option"><i class="icons"></i>[ D ] '+ ev.options.D +'</a>'
                +'</li>';
            });
            $(".answer-list").html(topic_str).find("li").eq(0).show();
        }
    },
    init: function (callback) {
        // g.loginInfo = window.THIRD_PARTY_AUTH.data.account;

        //获取全局配置
        g.getData.get_qjpz();
        
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

    // 核对准考证
    $(".part-1 .btn-start").on("click", function(){
        g.data.userName = $("#userName").val();
        g.data.sex = $("input[name='sex']:checked").val();
        if(g.data.userName == '') return $.lay.msg('请填写姓名', {time: 600});
        $(".J-user-name").text(g.data.userName);
        var avatarSrc,sexText;
        if(g.data.sex == 1){
            avatarSrc = './assets/images/avatar_boy.png';
            sexText = '男';
        }else if( g.data.sex == 2) {
            avatarSrc = './assets/images/avatar_girl.png';
            sexText = '女';
        }
        $(".J-sex-avatar").attr('src', avatarSrc);
        $(".J-sex-text").attr('src', sexText);
        //进入页面2
        g.methods.nextPageRead(2);
    });

    //开始答题
    $(".part-2 .btn-answer").on("click", function(){
        g.getData.getTopicList(function(){
            //渲染题目列表
            g.handlers.renders_topic_list(g.data.topicList);
            g.methods.nextPageRead(3);
        });
    });

});

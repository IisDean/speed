var isMaster = false;
var g = {
    dateOpen: '2020/4/24 00:00:00',
    passportApi: isMaster ? '//pf-api.xoyo.com/' : '//my-api-dev.xoyo.com/',
    domain: isMaster ? '//ws.xoyo.com' : '//test-ws.xoyo.com',
    apis: {
        get_explain_list: '/jx3/submitpic200518/get_list',  //作品列表
        get_explain_detail: '/jx3/submitpic200518/get_detail_by_id',//作品详情
        get_explain_like: '/jx3/submitpic200518/like',//点赞
    },
    room_type: ['全部', '积木', '家园5级', '家园10级', '无等级限制'],
    ajax: function (o, callback) {
        var t = {
            method: o.method || 'get',
            url: g.domain + o.url,
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded',
        };
        console.log(t)
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
    getData: {
        /**
         * 获取作品列表
         * page_num = 当前页
         * page_size = 当前页数据条数
         * room_type = 房间类型 0全部 1积木 2家园5级 3家园10级 4无等级限制
         * */ 
        get_explain_list: function(page_num, page_size, room_type, is_random, callback) {
            var options = {
                url: g.apis.get_explain_list,
                type: 'get',
                data: {
                    page_num: page_num,
                    page_size: page_size,
                    room_type: room_type,
                    is_random: is_random || 0
                },
            }
            g.ajax(options, function(data){
                if( data.status == 1 ){
                    g.handlers.set_explain_list(data, callback);
                }else {
                    alert(data.message);
                    // if(callback)callback();
                }
            });
        },
        /**
         * 获取作品详情
         * id = 作品id
         * */ 
        get_explain_detail: function(explain_id, callback) {
            var options = {
                url: g.apis.get_explain_detail,
                type: 'get',
                data: {
                    id: explain_id,
                },
            }
            g.ajax(options, function(data){
                if( data.status == 1 ){
                    g.handlers.set_explain_detail(data, callback);
                }else {
                    alert(data.message);
                }
            });
        },
        /**
         * 点赞
         * id = 作品id
         * */ 
        get_explain_like: function(explain_id, callback) {
            var options = {
                url: g.apis.get_explain_like,
                type: 'get',
                data: {
                    id: explain_id,
                },
            }
            g.ajax(options, function(data){
                if(callback)callback(data);
            });
        },
        /**
         * 时间戳转日期格式
         * */ 
        formatTime: function(timestamp) {  
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes() + ':';
            s = date.getSeconds();
            return Y+M+D+h+m+s;
        }
    },
    handlers: {
        //渲染作品列表
        set_explain_list: function(data, callback) {
            var str = '';
            var data = data.data.list;
            // console.log(data);
            var link = $.tools.getUrl+window.location.pathname.replace('index.html','');
            link = link.replace('detail.html','');
            // console.log(link);
            for(var i = 0;i < data.length; i++){
                var val = data[i];
                str += '<li class="bg fx-item" data-id="'+ val.id +'">'+
                    '<a href="'+ link + 'detail.html' +'?explainId='+ val.id +'">'+
                    '<div class="full-img fx-cover">'+
                    '<img src="'+ val.upload_file_info.image[0].file_link +'" alt="房型">'+
                    '</div>'+
                    '<p class="fx-title-text t-hide">'+ val.title +'</p>'+
                    '</a>'+
                    '<div class="flex author-wrap">'+
                    '<div class="bg avatar-wrap flex flex-center flex-middle">'+
                    '<div class="full-img avatar-content">'+
                    '<img src="'+ val.avatar +'" alt="头像">'+
                    '</div>'+
                    '</div>'+
                    '<div class="flex-1 t-hide">'+
                    '<p class="author-name-text t-hide">'+ val.nick_name +'</p>'+
                    '<div class="flex live-wrap J-like-btn" data-id="'+ val.id +'">'+
                    '<i class="icons heart-icon"></i>'+
                    '<p class="like-text"><span>'+ val.like +'</span>想要</p>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</li>';
            }
            if( callback )callback(str, data.length);
        },
        // 渲染作品详情
        set_explain_detail: function(data, callback){
            console.log(data);
            var val = data.data.detail;
            $(".J-explain-title").text(val.title);//更新作品标题
            $(".J-avatar img").attr('src', val.avatar);//更新头像
            $(".author-name-text").text(val.nick_name);//更新用户名
            $(".tl-id-text span").text(val.id);//更新推栏id
            var imgListStr = "";
            for(var i = 0;i < val.upload_file_info.image.length;i++){
                imgListStr += '<div class="full-img swiper-slide">'+
                           '<img src="'+ val.upload_file_info.image[i].file_link +'" alt="详情图">'+
                           '</div>';
                if( i<3 ){
                    //更新长图前3张详情图
                    $(".poster-container .explain-list li").eq(i).find("img").attr('src', val.upload_file_info.image[i].file_link);
                }
            }
            $(".swiper-banner .swiper-wrapper").html(imgListStr);//作品图列表
            var fxStr = '<li class="fx-explain-item flex">房型：'+ g.room_type[val.room_type] +'</li>'+
                        '<li class="fx-explain-item flex">房屋面积：'+ val.room_area +'㎡</li>'+
                        '<li class="fx-explain-item flex"><div>房屋地址：</div><div class="flex-1">'+ val.room_server_name + ' ' + val.room_zone_name +' <br/> '+ val.room_community + ' ' + val.room_line + val.room_number +'号</div></li>';
            $(".fx-explain-list").html(fxStr);//更新房屋信息
            var addTime = g.getData.formatTime(val.created);
            $(".J-explain-time").text(addTime);//更新作品发布时间
            $(".live-wrap2").attr('data-id', val.id).find('.like-text2 span').text(val.like);//更新点赞数量
            if( callback )callback();
        },
        //一进入页面就判断用户是否登录 如果登录就执行此方法 并返回用户名
        cbLoginModelSuccess: function ($loginOkuser) {
            console.log('已登录')
            g.loginInfo = $loginOkuser;
            $.lay.close('#popLogin');
            setTimeout(function () {
                $.lay.msg('登录成功！',{time:800});
            }, 500);
        },
        //点击登录并登录成功就执行此方法 并返回用户名
        cbLoginSuccess: function ($loginOkuser) {
            g.loginInfo = $loginOkuser;
            g.loginInfo = $loginOkuser;
        },
    },
    init: function () {
        
    }
};


$(function(){
    
    // var vConsole = new VConsole();
    //点赞
    $("body").on("click", ".J-like-btn", function(){
        var $this = $(this),
            id = $this.attr('data-id');
        if( $this.hasClass("active") )return alert('你已经点过赞了哦,明天再来吧~');
        console.log(g.loginInfo);
        // 未登录
        if (!g.loginInfo) {
            $.lay.open('#popLogin');
            return;
        }
        g.getData.get_explain_like(id, function(data) {
            if( data.status == 1 ){
                //点赞成功
                var likeNum = $this.find("span").text();
                $this.addClass('active');
                console.log(parseInt(likeNum) + 1);
                $this.find("span").text(parseInt(likeNum) + 1);
            }else {
                //点赞失败 & 重复点赞 & 达到点赞次数上限
                alert(data.message);
            }
        });
    });

    //埋点DEMO start
    $('.J_tongjiBtn').on('click', function () {
        window.stReportGlobal023MultiProps({eventName: $(this).attr('eventName'), eventDescription: $(this).attr("eventDescription")});
    });
    //埋点DEMO end
    
    // 判断是否处于推栏app的环境
    if(window.THIRD_PARTY_AUTH && window.THIRD_PARTY_AUTH.ua === 'daily'){
        // 推栏分享
        var shareData = {
            shareChannel: "wechat",
            shareUrl: location.href,
            shareIcon: "",
            shareTitle: "家园作品 pick你最爱的设计",
            shareDesc: "剑网3家园设计师作品精选，你最想要哪一套房？",
            shareToAppConfig: {
                imageUrl: "",
                shareUrlParam: ""
            }
        };
        window.wv.web.init(window);
        window.wv.web.postMessage(wv.EventNames.APP_SHARE_WEBPAGE_DIRECTLY, shareData);
    }

    //微信自定义分享 start
    var eventData = {
        title: '家园作品 pick你最爱的设计',
        link: location.href,
        imgUrl: $.tools.getUrl+'/'+window.location.pathname.replace('/index.html','') + '/assests/images/share.jpg',
        desc: '剑网3家园设计师作品精选，你最想要哪一套房？'
    }
    usewxapi.getSignature(eventData);
    //微信自定义分享 end

    //登录框 初始化 start
    $('.xsj_register_dom_nine').registerPublic({
        ajaxUrl: g.passportApi, //用于测试接口
        domName:'.xsj_register_dom_nine',
        regTag:9,
        isLogin: true,
        loginModel:true,
        client:'jx3',
        isWegameLogin: true, //wegame login
        jiyanBind:true,
        isLogOutCallback: true, //开启退出回调
        cbLogOut:function () {
            $.lay.alert('退出成功');
        },
        cbLoginSuccess: function ($loginOkuser) { //一进入页面就判断用户是否登录 如果登录就执行此方法 并返回用户名
            // alert($loginOkuser);
            g.handlers.cbLoginSuccess($loginOkuser);
        },
        cbLoginModelSuccess: function ($user) { //用户未登录时，显示登录框，点击登录按钮，例如成功后执行的回调
            //登录成功回调
            // alert($user)
            g.handlers.cbLoginModelSuccess($user);
        }
    });
    //登录框 初始化 end

    //统计点案例
    $(document).on('click', '.ClickTrackWithWorkName', function () {
        var trackName = $(this).attr('data-tongji-name');
        var trackDesc = $(this).attr('data-tongji-desc');
        var workName = $(this).attr('data-work-name');
        window.stReportWithName(trackName, trackDesc, workName);
    });
});

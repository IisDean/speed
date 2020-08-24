var ctrlJs = {
    data: {
        pageSwiper: null,// 页面Swiper
        pageIdx: 0,//当前页面序号
        navLeft: ['12.8%', '37%', '61%', '85%'],//游标状态
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
    },
    methods: {
        initShare: function(type){//配置分享参数
        },
        cutPage: function(idx){//切换页面
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//移动导航游标
            $(".nav-list li").removeClass("active").eq(idx).addClass('active');
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function(){//刮奖初始化
            if(ctrlJs.data.gjStatus)return false;
            ctrlJs.data.gjStatus = true;
            //var idx = ctrlJs.methods.getRandom(0, ctrlJs.data.prizeList.length);
            $(".cxgj-btn").hide();
            var gjImg = new Image();
            gjImg.src = '//game.gtimg.cn/images/ty/cp/a20200707czkql/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function(){
                $(gjImg).eraser({
                    size: 20, //设置橡皮擦大小
                    completeRatio: .6, //设置擦除面积比例
                    completeFunction: ctrlJs.methods.showResetButton   //大于擦除面积比例触发函数
                });
                // 设置奖品信息
                // 奖品图片地址 共计17个奖品,奖品列表在ctrlJs.data.prizeList
                // $(".prize-img img").attr('src', ctrlJs.data.prizeList[idx].imgSrc); //奖品图片
                // $(".prize-msg").html(ctrlJs.data.prizeList[idx].name); //奖品名称
                // ctrlJs.data.prizeResult = ctrlJs.data.prizeList[idx].name;
            }
        },
		showResetButton: function(){//刮奖结果
            TGDialogS('popGj');
            ctrlJs.data.gjStatus = false;
            $(".cxgj-btn").show();
            ctrlJs.data.pageSwiper.unlockSwipes();
        },
        initSwiper: function(){// 页面Swiper
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
        backHome: function(){//回到首页
            $(".swiper-container .wrap").fadeOut(300);
            setTimeout(function(){
                $(".part-1 .wrap").show();
                $(".part-1").show();
            }, 600);
        },
        playVideo: function(vid){//播放视频
            TGDialogS("popVideo");
            ctrlJs.data.video = new Txplayer({
                containerId: 'videoWrap',
                vid: vid,
                width: ctrlJs.data.videoWidth,
                height: ctrlJs.data.videoHeight,
                autoplay: true
            });
        },
        pauseVideo: function(){//关闭视频
            closeDialog();
            $("#videoWrap").empty();
        },
        getRandom: function(min, max){//获取随机数
            return Math.floor( Math.random() * (max- min) + min );
        }
    },
    init: function(callback){
        var that = this;
        //点击弹窗空白处关闭
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

//////////////////////////////////////////////////////////////

var ua = window.navigator.userAgent.toLowerCase();
var homePage = location.protocol + '//ty.qq.com/cp/a20200707czkql/index_wq.html';
var WXactivityUrl = location.protocol + '//ty.qq.com/cp/a20200707czkql/page_wq.html?acctype=wx&appid=wx1cd4fbe9335888fe';
var pageUrl = location.protocol + "//ty.qq.com/cp/a20200707czkql/page_wq.html";
var shareURL = '';
var sPlatId = isIos() ? '0' : (isAndroid() ? '1' : '1');//系统
var sArea = isQQ() ? '2' : (isWeiXin() ? '1' : '2');//平台
window.ams_login_avoid_conflict = true;		//防止串号的全局变量
var appid = "1105636778";//游戏-QQ的appid
var player = {isBind: false,inviteCode:'',shareType:1,orderStatus:2}; //玩家基础信息
var initData = {friendUsed:0,sOutValue2:''};//初始化信息
var sData = {};

function isWeiXin() {
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function isQQ() {
    var sUserAgent = navigator.userAgent;
    var REGEXP_IOS_QQ = new RegExp("(iPad|iPhone|iPod).*? (IPad)?QQ\\/([\\d\\.]+)");
    var REGEXP_ANDROID_QQ = new RegExp("\\bV1_AND_SQI?_([\\d\\.]+)(.*? QQ\\/([\\d\\.]+))?", "ig");
    // 判断是否是IOSQQ 或者 AndroidQQ打开
    var isIphoneOs_QQ = REGEXP_IOS_QQ.test(sUserAgent);
    var isAndroid_QQ = REGEXP_ANDROID_QQ.test(sUserAgent);

    if (isIphoneOs_QQ || isAndroid_QQ) {
        return true;
    } else {
        return false;
    }
}

function isIos() {
    return /iphone|ipod|ipad|itouch/i.test(ua);
}

function isAndroid() {
    return /android/i.test(ua);
}

function initPage() {
    //card Num
}
//记录分享
function oneShare(){
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            amsCfg_691298.sData = sData;
            amsCfg_691298.sData.typeName = 'page2';
            amsSubmit(321796, 691298);
        }, function () {
            TGDialogS('popLogin');
        });
    });

}

function goHome() {
    window.location.href = homePage;
}
function shareFun(shareType) {
    var actName = "a20200628lightm";

    var title = '天下第一暗器即将面世！';
    var desc = '重铸天下第一暗器<孔雀翎>，百分百领取奖励，快来挑战。';
    var desc2 = '天下第一暗器即将面世！你可知？';
    var img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_bw.jpg";

    title = '真香，腾讯旗舰手游开预约！';
    desc = '国风大世界手游《天涯明月刀》预约已开启，邀你预约立领专属礼包，抢先进驻大江湖。';
    desc2 = '真香，腾讯旗舰手游开预约！';
    img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_yuyue.jpg";

    if (isQQ()) {
        shareURL = pageUrl+'?shareCode='+milo.request('shareCode')+'&shareToken='+milo.request('shareToken');
    } else if (isWeiXin()) {
        shareURL = pageUrl+'?shareCode='+milo.request('shareCode')+'&shareToken='+milo.request('shareToken');
    }


    console.log(shareURL);

    if (isWeiXin()) {
        //微信分享
        need("biz.wxclient", function(WXClient){
            //微信客户初始化成功后，返回wx对象
            WXClient.init({"sAppId":"wx36896ec6df7cd95e"},function(wx){
                //分享用的信息对象
                var shareObj={
                    title:title,
                    desc: desc,
                    link: shareURL,
                    imgUrl: img,
                    actName:actName,//点击流命名
                    success: function (sres) {
                        oneShare();
                    },
                    cancel: function (sres) {}
                }
                //为发送给好友、分享到朋友圈、分享到QQ、分享到微博同时绑定分享事件
                WXClient.shareAll(shareObj);
            });
        });
    } else {
        var shareObjTM = {
            img_url: img,
            img_width: "120",
            img_height: "120",
            qqShareLink: shareURL,
            wxShareLink: shareURL,
            desc: desc,
            title: title
        };
        mqq.ui.setOnShareHandler(function(type){
            if(type == 0){
                oneShare();
            }
            switch(type+''){
                case '0': /*QQ好友*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.qqShareLink,
                        image_url: shareObjTM.img_url
                    }, function(result) {
                        //好友不会调
                        //oneShare();
                    });
                    break;
                case '1': /*QQ空间*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.qqShareLink,
                        image_url: shareObjTM.img_url
                    }, function(result) {
                        oneShare();
                    });
                    break;
                case '2':	/*微信好友*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,	//链接一般都是可以拉去微信登录态的链接
                        image_url: shareObjTM.img_url
                    }, function(result) {
                        oneShare();
                    });
                    break;
                case '3': /*微信朋友圈*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,   //链接一般都是可以拉去微信登录态的链接
                        image_url: shareObjTM.img_url
                    }, function(result) {
                        oneShare();
                    });
                    break;
            }
        });
    }

}

function orderGameCenter(args) {
    var cb = args.callback;
    //预约游戏的appid
    var appid = args.appid;
    //项目ID，区分来源
    var jsonid = args.jsonid;
    //平台ID，区分安卓和IOS
    var platid = sPlatId;
    var g_tk = getToken();
    //拼接请求串，注意：tt字段的值必须整数不能用双引号括起来
    var orderUrl = location.protocol + '//info.gamecenter.qq.com/cgi-bin/gc_gameinfo_v2_fcgi?param={"key":{"param":{"tt":' + platid + ',"appid":"' + appid + '","source":"' + jsonid + '"},"module":"gc_gameinfo_v2","method":"subscribeUpcomingGameV2"}}&g_tk=' + g_tk;
    //发起请求
    requestAjax({
        url: orderUrl,
        callback: function (json) {
            cb && cb(json);//请求回调
        }
    });

    //获取Token
    function getToken() {
        for (var t = 5381, e = getCookie("skey") || "", i = 0, n = e.length; i < n; ++i)
            t += (t << 5) + e.charCodeAt(i);
        return 2147483647 & t
    }

    //获取cookie
    function getCookie(t) {
        if (document.cookie && "" !== document.cookie) {
            var e = document.cookie.split("; ");
            t = encodeURIComponent(t);
            for (var i, n = 0, o = e.length; n < o; n++)
                if (i = e[n].split("="),
                t == i[0])
                    return decodeURIComponent(i[1] || "")
        }
        return null
    }

    //AJAX请求
    function requestAjax(data) {
        var url = data.url, cache = data.cache || false, dataType = data.dataType || 'json',
            timeout = data.timeout || 5000, callback = data.callback;
        if (!data.token_diseabled && (url.indexOf('&g_tk=') < 0 && url.indexOf('?g_tk=') < 0)) {
            url += (url.indexOf('?') > -1 ? '&g_tk=' : '?g_tk=') + getToken();
        }
        $.ajax({
            url: url,
            cache: cache,
            dataType: dataType,
            timeout: timeout,
            xhrFields: {
                withCredentials: true
            },
            success: function (json) {
                /*jshint expr:true*/
                callback && callback(json);
            },
            error: function () {
                /*jshint expr:true*/
                callback && callback({
                    result: 5,
                    ret: 5,
                    msg: "网络异常，请稍后再试！"
                });
            }
        });
    }
}

milo.ready(function () {
    shareFun();

    // 拉起微信
    $('.wxlogin').on('click', function () {
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            window.location.href = WXactivityUrl;
        } else {
            // openlinkhttps://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90233233&appid=wx7fa53c237760c335&url=https%3A%2F%2Fxylz.qq.com%2Fcp%2Fa20190929dema%2Findex_wq.html
            location.href = location.protocol + "//game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90247131&appid=wx39bde50a0857a5af&url=https%3A%2F%2Fd.qq.com%2Fcp%2Fa20200605answer%2Findex_wq.html";
        }
    });

    // 拉起手Q
    $('.qqlogin').on('click', function () {
        var UA = navigator.userAgent;
        var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? QQ\/([\d\.]+)/;
        var REGEXP_ANDROID_QQ = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
        if (!REGEXP_IOS_QQ.test(UA) && !REGEXP_ANDROID_QQ.test(UA)) {
            setTimeout(function () {
                window.location.href = 'mqqapi://forward/url?url_prefix=' + btoa(homePage) + "&version=1&src_type=web";
            }, 200);
        } else {
            window.location.href = homePage;
        }
    });

    //预约BTN
    $(".yuyue-btn").on('click', function () {
        need("biz.login", function(LoginManager){
            LoginManager.checkLogin(function(userinfo){
                amsCfg_690215.sData = sData;
                amsSubmit(321796, 690215);
            },function(){
                TGDialogS('popLogin');
            });
        });
    });

    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            var acctype = milo.cookie.get('acctype');
            //判断客户端与当前登录方式是否一致，不一致注销登录态信息，刷新页面
            if ((isWeiXin() && acctype != 'wx') || (isQQ() && acctype == 'wx')) {
                LoginManager.logout({
                    logoutCallback: function () {
                        location.reload(true);
                    }
                });
                return;
            } else {
                //如果登录态没有异常，走正常业务逻辑
                if (isWeiXin()) {
                    appid = 'wx1cd4fbe9335888fe';//腾讯游戏活动号appid
                    sData = {
                        "sArea": '1',
                        "sPlatId": sPlatId,
                        "ams_targetappid": 'wxd9e0d500b5fb209f'//游戏appid
                    };
                    LoginManager.getUserInfoByWxOpenId({
                        "openid": milo.cookie.get("openid"),
                        "access_token": milo.cookie.get("access_token")
                    }, function (wxuser) {
                        //获取登登录头像
                        player.nickName = milo.xss.filterWxNickName(wxuser.nickname);
                        player.nickName = player.nickName.replace(/<span.*?><\/span>/g, '');
                        if (player.nickName == ''){
                            player.nickName = '匿名'
                        }

                        if (wxuser.headimgurl != ''){
                            player.selfPic = decodeURIComponent(wxuser.headimgurl) + '/96';
                        }else{
                            player.selfPic = decodeURIComponent('https://game.gtimg.cn/images/mxdl/cp/a20200605answer/wxIcon.png'); //
                        }

                        sData.nickName = encodeURI(player.nickName);
                        sData.sHeadImg = player.selfPic;
                        $(".wx-prize").show();
                    }, function () {
                        LoginManager.logout(
                            {
                                logoutCallback: function () {
                                    location.reload(true);
                                }
                            }
                        );
                        return;
                    });
                } else {
                    sData = {
                        "appid": "1105636778",
                        "sPlatId": sPlatId,
                        "sArea": '2'
                    };
                    player.nickName = LoginManager.getNickName();
                    player.nickName = player.nickName.replace(/<span.*?><\/span>/g, '');
                    if (player.nickName == '') {
                        player.nickName = LoginManager.getUserUin();
                    }
                    player.selfPic = "https://q.qlogo.cn/g?b=qq&nk=" + LoginManager.getUserUin() + "&s=100";
                    sData.nickName = encodeURI(player.nickName);
                    sData.sHeadImg = player.selfPic;

                    $(".qq-prize").show();
                }
                if (milo.request('shareCode') != '' && milo.request('shareToken') != '') {
                    amsCfg_691083.sData = sData;
                    amsCfg_691083.sData.page = 'page'
                    amsCfg_691083.sData.sInviteCode = milo.request('shareCode');
                    amsCfg_691083.sData.sInviteCodeToken = milo.request('shareToken');
                    amsSubmit(321796,691083);
                }else{
                    window.location.href = homePage;
                }
            }
        }, function () {
            if (isWeiXin()) {
                if (milo.request('shareCode') != '' && milo.request('shareToken') != ''){
                    LoginManager.loginByWX({
                        redirect_wx_url: window.location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(WXactivityUrl+'&shareCode='+milo.request('shareCode')+'&shareToken='+milo.request('shareToken'))//回调url
                    });
                }else{
                    window.location.href = homePage;
                }
            } else if (isQQ()) {
                LoginManager.login();
            } else {
                TGDialogS('popLogin');
            }
            // $("#logined").hide();
            // $("#unlogin").show();
        }, {
            appConfig: {
                avoidConflict: true,
                WxAppId: 'wx1cd4fbe9335888fe',
                scope: 'snsapi_userinfo'
            }
        });
    });
});

//根据token查询信息 init
amsCfg_691083 = {
    'iActivityId' : '321796',  // AMS活动号
    'activityId' : '10695', 			// 模块实例号
    'iFlowId':'691083',
    'sNeedSubmitPopDiv': true,
    'sData':{
        'sArea':'', 	//手机号码
        'sPlatId':''	//平台
    },
    "fFlowSubmitEnd": function(res){
        //ame返回等于0是后走到这里
        if (res.iRet == 0 && res.jData.ret == 0) {
            var name = res.jData.extend3;
            name = milo.xss.filterWxNickName(name);
            name = name.replace(/<span.*?><\/span>/g, '');
            if (name == ''){
                name = '匿名'
            }
            $(".user-msg-text p").text(name+' 邀请你预约');
            $(".avatar-head img").attr('src',res.jData.extend2);
        } else {
            alert(res.sMsg);
            window.location.href = homePage;
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        $("#popTips .pop-msg-text").text(res.sMsg);
        TGDialogS('popTips');
    }
};

//分享埋点 no show
amsCfg_691298 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId":    691298, //流程id
    "fFlowSubmitEnd": function(res){},
    "fFlowSubmitFailed":function(res){}
};

//wx平台预约 && 发礼包 no show
amsCfg_690280 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId":    690280, //流程id
    'sNeedSubmitPopDiv': true,
    'sData':{
        'sArea':'', 	//手机号码
        'sPlatId':''	//平台
    },
    "fFlowSubmitEnd": function(res){},
    "fFlowSubmitFailed":function(res){}
};


//预约流程 sure
amsCfg_690215 = {
    'iActivityId': '321796',  // AMS活动号
    'activityId': '10695', 			// 模块实例号
    'iFlowId': '690215',
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//手机号码
        'sPlatId': ''	//平台
    },
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            $("#popTips .pop-msg-text").text('预约成功');
            TGDialogS('popTips');
            //////////////////////////////预约开始
            if (isQQ()) {
                // 查询平台预约
                orderGameCenter({
                    appid: "1105636778", //预约游戏的appid
                    jsonid: '888888',    //项目ID，区分来源（不同业务ID不同，来源的jsonid如何创建？请参阅第4部分）295725
                    callback: function (json) {
                        var ret = json.data.key.retBody.result;//更多返回码含义请参阅第3部分
                        if (ret == '0') {
                            player.orderStatus = 1
                        } else if (ret == '1995001') {
                            player.orderStatus = 2
                        }
                        amsCfg_690213.sData = sData; //order search For ams
                        amsSubmit(321796, 690213);
                    }
                });
            } else {
                amsCfg_690280.sData = sData;
                amsCfg_690280.sData.device = isIos() ? '1' : (isAndroid() ? '2' : '2');
                amsCfg_690280.sData.appid = 'wxd9e0d500b5fb209f';
                amsCfg_690280.sData.sServiceType = 'ty';
                amsCfg_690280.sData.access_token = milo.cookie.get("access_token");
                amsSubmit(321796, 690280);//wxOrder

                player.orderStatus = 3;// 3看礼包发放记录
                amsCfg_690213.sData = sData; //order For ams
                amsSubmit(321796, 690213);
            }
            //////////////////////////////预约结束
        } else {
            $("#popTips .pop-msg-text").text(res.sMsg);
            TGDialogS('popTips');
        }
        return;
    },
    "fFlowSubmitFailed": function (res) {
        $("#popTips .pop-msg-text").text(res.sMsg);
        TGDialogS('popTips');
    }
};
//查询ams预约信息
amsCfg_690213 = {
    'iActivityId' : '321796',  // AMS活动号
    'activityId' : '10695', 			// 模块实例号
    'iFlowId':'690213',
    'sNeedSubmitPopDiv': false,
    'sData':{
        'sArea':'', 	//手机号码
        'sPlatId':''	//平台
    },
    "fFlowSubmitEnd": function(res){
        //ame返回等于0是后走到这里
        if (res.iRet == 0) {
            if (res.jData.rsvtStatus != '1' || res.jData.usedCode == ''){
                //1是已记录预约信息 未预约 or 白号
                if (milo.request('shareCode') != '') {
                    amsCfg_690214.sData = sData;
                    amsCfg_690214.sData.sArea =sArea;
                    amsCfg_690214.sData.sPlatId =sPlatId;
                    amsCfg_690214.sData.iDevice ="1";
                    amsCfg_690214.sData.iChanel =player.orderStatus;
                    amsCfg_690214.sData.sInviteCode=milo.request('shareCode')
                    amsCfg_690214.sData.extend1 = player.orderStatus;
                    amsCfg_690214.sData.extend2 = player.selfPic;
                    amsCfg_690214.sData.extend3 = encodeURI(player.nickName);
                    amsSubmit(321796,690214);
                }
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){}
};
//ams预约 no show
amsCfg_690214 = {
    '_everyRead': true,
    'iActivityId' : '321796',  // AMS活动号
    'activityId' : '10695', 			// 模块实例号
    'iFlowId':'690214',
    'sNeedSubmitPopDiv': false,
    /*'sData':{
        'sArea':'', 	//手机号码
        'sPlatId':''	//平台
    },*/
    "fFlowSubmitEnd": function(res){},
    "fFlowSubmitFailed":function(res){}
};





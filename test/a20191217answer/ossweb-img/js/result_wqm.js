var appid = 'wx1cd4fbe9335888fe';//X8助手微信appid
var wx_appid = 'wx7fa53c237760c335';//微信appid
var qq_appid = '1106396765';//QQ appid
var gzh_appid = 'wx36896ec6df7cd95e';//微信公众号业务服务号appid  //
var sArea = '';//用于存储平台，微信为1，手Q为2，默认为手Q:2
var sPlatId = '1';//用于存储手机系统  默认1
var sTerminal = 1;//用于存储当前页面为PC端或移动端，PC端为0，移动端为1，默认为PC端
var nickName = '';//昵称
var nickNum = '' //qq或微信账号
var headPic = '';//头像URL
var pcUrl = location.protocol + '//hyrz.qq.com/cp/a20191023orderm/index_p.html';//PC端
var mUrl = location.protocol + '//xylz.qq.com/cp/a20191217answer/index_wqm.html';//手机端
var _server_url = location.protocol + '//xylz.qq.com/comm-htdocs/js/game_area/xylz_server_select.js';
var chanel = milo.request('adtag');
var perNum = '';
var buttonStep = 1
var shareStatue = ''
var sData = {};
var isBind = 0;
var sPartition = '';
var sRoleId = ""
var giftChance = '';
var idx = '';
var giftId = '';
var writeChance = '';
var isLogin = false;//是否登录
var authUrl = mUrl;//跳转链接
var ua = navigator.userAgent.toLowerCase();

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
    //判断是否是IOSQQ 或者 AndroidQQ打开
    var isIphoneOs_QQ = REGEXP_IOS_QQ.test(sUserAgent);
    var isAndroid_QQ = REGEXP_ANDROID_QQ.test(sUserAgent);

    if (isIphoneOs_QQ || isAndroid_QQ) {
        return true;
    } else {
        return false;
    }
}

function isIos() {
    return /iphone|ipod|ipad/i.test(ua);
}

//判断安卓
function isAndroid() {
    return /android/i.test(ua);
}

if (isIos()) {
    sPlatId = 0;
}
if (isAndroid()) {
    sPlatId = 1;
}

if (isWeiXin()) {
    authUrl = mUrl + '?acctype=wx&appid=' + appid;
}


$("#ptLoginBtn").on('click', function () {
    PTTSendClick('btn','diaIconQq','QQ登录')
    var UA = navigator.userAgent;
    var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? QQ\/([\d\.]+)/;
    var REGEXP_ANDROID_QQ = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
    if (!REGEXP_IOS_QQ.test(UA) && !REGEXP_ANDROID_QQ.test(UA)) {
        //兼容UC等浏览器
        setTimeout(function () {
            window.location.href = 'mqqapi://forward/url?url_prefix=' + btoa(mUrl + "?_wv=49957") + "&version=1&src_type=web";
        }, 200);
    } else {
        window.location.href = authUrl + '?_wv=49957&type=qq';
    }
});

$('#wxloginBtn').on('click', function () {
    PTTSendClick('btn','diaIconWx','微信登录')
    if (isWeiXin()) {
        window.location.href = authUrl;
    } else {
        window.location.href = location.protocol + "//game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90236428&appid=wxd4dcf1b3730a2fb7&url=http%3A%2F%2Fqyn.qq.com%2Fcp%2Fa20191211jcy%2Findex_wqm.html";
    }
})

$('.cj-btn').on('click',function(){
    if (isLogin == false) {
        popShow('loginPop');
        return;
    }
    if(giftChance == 0){
        popShow('pop8')
    }else{
        if (giftId == '1717048' || giftId == '1717049' || giftId == '1717050') {
            if (writeChance == 0) {
                popShow('pop7')
            } else {
                alert('您已经填写过领奖信息了~');
            }
        } else{
            alert('您已经抽过奖励了~');
        }
    }
})

$('.lottery-btn').on('click',function(){
    if (isLogin == false) {
        popShow('loginPop');
        return;
    }

    if(isBind == 0){
        popShow('pop6');
        return;
    }

    if(isBind == 1){
        if(giftChance == 0){
            amsCfg_638429.sData = sData;
            amsSubmit(282311, 638429);
        }else{
            alert('您已经抽过奖励了~');
        }
    }else{
        alert('请先绑定大区~');
    }

})

$('.things').on('click',function(){
    sData.sName = $("#userName").val();
    sData.sMobile = $("#userMobile").val();
    //实物信息填写
    amsCfg_638431.sData = sData;
    amsSubmit(282311, 638431);
})

milo.ready(function () {
    //优化长时间打开页面后，登录态过期的问题
    need('ams.flowengine', function (FlowEngine) {
        FlowEngine.setLoginErrorCallback(function () {
            need('biz.login', function (LoginManager) {
                LoginManager.logout({
                    logoutCallback: function () {
                        location.href = ptmUrl;
                    }
                });
            })
        });
    });
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            var acctype = milo.cookie.get("acctype");
            if (isWeiXin() && acctype != 'wx' || (isQQ() && acctype == 'wx')) {
                LoginManager.logout({
                    logoutCallback: function () {
                        location.reload(true);
                    }
                })
                return;
            } else {
                if (isWeiXin()) {
                    sData = {
                        "appid": appid,
                        "sServiceType": "xylz",
                        "ams_targetappid": wx_appid,
                        "sArea": 1
                    }
                    sArea = 1;
                    _server_url = location.protocol + '//xylz.qq.com/comm-htdocs/js/game_area/xylz_WX_server_select.js';

                    LoginManager.getUserInfoByWxOpenId({
                        "openid": milo.cookie.get("openid"),
                        "access_token": milo.cookie.get("access_token")
                    }, function (wxuser) {

                        nickName = wxuser.nickname.replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '*');
                        nickName = milo.xss.filterWxNickName(nickName).replace(/^[0o]*/, '');

                        if (wxuser.headimgurl != "") {
                            headPic = wxuser.headimgurl + "/0";
                            headPic = headPic.replace("https:", "");
                            headPic = headPic.replace("http:", "");
                            headPic = location.protocol + headPic;
                        }
                        userInfo()
                    }, function () {
                        //errCallback
                        LoginManager.logout({
                            logoutCallback: function () {
                                location.reload(true);
                            }
                        });
                    });
                } else if (isQQ()) {
                    sData = {
                        "appid": qq_appid,
                        "sArea": 2,
                        "sServiceType": 'xylz'
                    }
                    sArea = 2;
                    _server_url = location.protocol + '//xylz.qq.com/comm-htdocs/js/game_area/xylz_SQ_server_select.js';
                    var nickname = LoginManager.getNickName();
                    nickNum = LoginManager.getUserUin();

                    if (nickname == '') {
                        nickname = LoginManager.getUserUin();
                    }

                    nickName = milo.xss.filterWxNickName(nickname).replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '*');
                    nickName = nickName.replace(/^[0o]*!/, '');
                    // nickName = decodeURIComponent(userinfo.nickName)
                    nickNum = userinfo.userUin
                    headPic = location.protocol + "//q.qlogo.cn/g?b=qq&nk=" + userinfo.userUin + "&s=100";

                    userInfo()
                } else {
                    // 非微信和手Q授权登录，一律视为登录失败。避免一些腾讯其他相关客户端，内出现登录态验证通过的情况
                    return;
                }
                isLogin = true;	//登录状态

                amsCfg_637692.sData = sData;
                amsSubmit(282311, 637692);

                amsCfg_637694.sData = sData;
                amsSubmit(282311, 637694);

                setSharedata()

                include(_server_url + "?_rand=" + Math.random(), function () {
                    need(["biz.roleselector"], function (RoleSelector) {
                        // if (isQQ()){
                        //     $('#channelContentId').html('<option value="2">手Q</option>')
                        // }else{
                        //     $('#channelContentId').html('<option value="1">微信</option>')
                        // }
                        var roleobj = cloneClass(RoleSelector);
                        roleobj.init({
                            openToOpen: {
                                "sAMSTrusteeship": 1,
                                "ams_targetappid": wx_appid
                            },
                            'type': 'html',
                            'gameId': 'xylz',//游戏的业务码
                            'isQueryRole': true,
                            'channelContentId': 'channelContentId',//平台
                            'areaContentId': 'areaContentId',//区服
                            'systemContentId': 'systemContentId',//ios android
                            'roleContentId': 'roleContentId',//角色
                            'confirmButtonId': 'bind',
                            'submitEvent': function (roleObj) {
                                {
                                    console.log(roleObj)
                                    sData.sArea = roleObj.submitData.areaid;
                                    sData.sPlatId = roleObj.submitData.sPlatId;
                                    sData.sPartition = roleObj.submitData.sPartition;
                                    sData.sServiceType = roleObj.gameId;
                                    sData.sExtra = roleObj.submitData.roleid;
                                    sData.sRoleId = roleObj.submitData.roleid;
                                    sData.charac_no = roleObj.submitData.roleid;
                                    sData.sRoleName = encodeURIComponent(roleObj.submitData.rolename);
                                    sData.md5str = roleObj.submitData.md5str;
                                    sData.ams_checkparam = roleObj.submitData.checkparam;
                                    sData.checkparam = roleObj.submitData.checkparam;
                                    // console.log(sData);

                                    amsCfg_637693.sData = sData;
                                    amsSubmit(282311, 637693);
                                }
                            }
                        });
                        roleobj.show();
                    });
                });

            }
        }, function () {
            if (isWeiXin()) {
                LoginManager.loginByWX({
                    redirect_wx_url: location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(authUrl)
                });
            } else if (isQQ()) {
                LoginManager.login();
            } else {
                // $('.pop-scroll').css('display','block');
                return;
            }
        }, {
            appConfig: {
                avoidConflict: true,		//默认值为空，判断是否需要校验微信登录态串号，设为true，为必须校验，设为false，为不校验，默认值""表示在微信环境下校验，其它app环境下不校验
                WxAppId: appid,
                scope: 'snsapi_userinfo'
            }
        })
    });


});

amsCfg_637692 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 282311, //活动id
    "iFlowId":    637692, //流程id
    "fFlowSubmitEnd": function(res){
        console.log(res)
        giftChance = res.sOutValue1;
        writeChance = res.sOutValue2;
        giftId = res.sOutValue3;
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};

amsCfg_637694={
    type : "query",
    iQueryFlowID:637693,
    success : function(bindedInfo){
        //已绑定时的扩展处理
        console.log(bindedInfo)
        isBind = 1
    },
    failure : function(){
        //未绑定时的扩展处理
        isBind = 0;
    }
};

//提交绑定的配置
amsCfg_637693={
    type : "comit",
    needPopupRole:false,//是否弹默认角色框选角色
    roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID:637694,
    service:"xylz",
    success : function(bindedInfo){
        //已绑定时的扩展处理
        isBind = 1;
        amsCfg_638429.sData = sData;
        amsSubmit(282311, 638429);
    },
    failure : function(){
        //未绑定时的扩展处理
    }
};


// 抽奖领取主功能初始化
amsCfg_638429 = {
    'iAMSActivityId' : '282311', // AMS活动号
    'activityId' : '327224', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件

        giftId = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if (giftId && giftId.length > 1) {
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        if(giftId == '1717051'){    //道具礼包
            idx = 3;
        }else if(giftId == '1717048'){   //200元礼包
            idx = 9;
        }else if(giftId == '1717049'){   //100元礼包
            idx = 1;
        }else if(giftId == '1717050'){   //50元礼包
            idx = 11;
        }
        giftChance = 1;
        lotteryPrize(idx);

    }
};


amsCfg_638431 = {
    'iActivityId' : '282311', // AMS活动号
    'iFlowId' : '638431', // 流程号
    '_everyRead' : true,
    'success': function(res){ //提交成功的回调
        console.log(res)
        if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
            need(["biz.provincecityselector", "util.form"], function(pcs, FormManager) {
                console.log(FormManager)
                //提交按钮事件
                g('btn_sure_add').onclick = function(){
                    var name = $("#userName").val(),
                        mobile = $("#userMobile").val();
                    if (name == '') {
                        alert('请输入姓名');
                        return;
                    }
                    if (name.length > 30) {
                        alert('姓名的长度不能大于20');
                        return;
                    }
                    if (mobile == '') {
                        alert('请输入手机号');
                        return;
                    }
                    if (!milo.isMobile(mobile)) {
                        alert('您输入的手机号码有误');
                        return;
                    }

                    amsCfg_638431.sData = sData;
                    amsCfg_638431.sData.sName = name;
                    amsCfg_638431.sData.sMobile = mobile;
                    amsSubmit(282311,638431);
                }

            });

        } else {
            need(["biz.widget.dialog"],function(Dialog){
                if (res.iRet == 0) {
                    //提交成功
                    writeChance = 1;
                    alert("恭喜您，成功提交个人信息！");
                } else {
                    Dialog.alert(res.sMsg);
                }
            });
        }
    }
};

function setSharedata() {
    var shareUrl = mUrl ;    //分享链接

    var shareInfo = {
        'title': '过山龙遇下山虎，方言鬼才我做主', //分享标题
        'desc': '来测测你是否就是传说中的方言王中王~参与即抽JD卡、珍稀道具哦~', //分享描述
        'url': shareUrl,    //分享链接
        'imgUrl': location.protocol + '//game.gtimg.cn/images/xylz/cp/a20191217answer/logo_2.png'   //分享icon
    };

    //方式二（首选）
    need("biz.mobileclient", function(mClient){
        var obj = {
            wx_appid : gzh_appid, //微信公众号的appid
            title: shareInfo.title,// 分享标题，默认为活动页面标题（可手动调整）
            desc: shareInfo.desc, //分享活动简介
            link: shareInfo.url, //分享链接
            imgUrl: shareInfo.imgUrl, //分享后朋友看到的图标
            /*微信分享回调【不需要可不写】*/
            WXtrigger: function (res) { //微信点击事件回调
                console.log(JSON.stringify(res));
            },
            WXsuccess: function (res) { //微信分享成功回调
                console.log(JSON.stringify(res));
            },
            WXcancel: function (res) { //微信分享取消回调
                console.log(JSON.stringify(res));
            },
            WXfail: function (res) { //微信分享失败回调
                console.log(JSON.stringify(res));
            },
            /*手Q分享回调【不需要可不写】*/
            QQcallback:function(res){//qq成功、失败、或取消的回调
                console.log(JSON.stringify(res));
            },
            QQtrigger:function(res){//qq触发事件的回调
                console.log(JSON.stringify(res));
            },
            /* QQ浏览器分享回调【不需要可不写】*/
            qqBrowserCallback: function(data){
                //data.code ==1 表示能分享
                //data.code ==-1 表示不能分享
                //data.code == 0 表示未知
            }
        };
        mClient.shareAll(obj);
    });
}

function userInfo(){
    drawPoster.init({
        imgList: [{
            src: headPic, //微信头像,需传入
            x: 44,
            y: 26,
            w: 75,
            h: 75
        }, {
            src: '//game.gtimg.cn/images/xylz/cp/a20191217answer/poster_' + grade + '.png', //海报背景,需传入答题分数
            x: 0,
            y: 0,
            w: 673,
            h: 1164
        }],
        textList: [{
            name: nickName, //需要在上面传入微信昵称,此处不用修改
            nameTextColor: nameTextColor,
            font: 'bold 30px Arial',
            textAlign: 'left',
            textBaseline: 'top',
            x: 135,
            y: 55
        }]
    });
}



/* #t6Hl8#8F0494603B3E34E94C2B8221B4583604 */





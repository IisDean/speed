var appid = 'wx1cd4fbe9335888fe'; //X8助手微信appid
var wx_appid = 'wx7fa53c237760c335'; //微信appid
var qq_appid = '1106396765'; //QQ appid
var gzh_appid = 'wx36896ec6df7cd95e'; //微信公众号业务服务号appid  //
var temp_appid = milo.xss.filter(milo.request('appid'));
var sTerminal = 1; //用于存储当前页面为PC端或移动端，PC端为0，移动端为1，默认为PC端
var nickNum = '' //qq或微信账号
var headPic = ''; //头像URL
var pcUrl = location.protocol + '//hyrz.qq.com/cp/a20191023orderm/index_p.html'; //PC端
var mUrl = location.protocol + '//xylz.qq.com/cp/a20191217answer/index_wqm.html'; //手机端
var chanel = milo.request('adtag');
var perNum = '';
var buttonStep = 1
var shareStatue = ''
var sData = {};
var isBind = 0;
var sPlatId = milo.xss.filter(milo.request('platid')); //用于存储手机系统  默认1
var sArea = milo.xss.filter(milo.request('areaid')); //用于存储平台，微信为1，手Q为2，默认为手Q:2
var sPartition = milo.xss.filter(milo.request('partition'));
var sRoleId = milo.xss.filter(milo.request('roleid'));
var nickName = ''; //昵称
var giftChance = '';
var idx = '';
var giftId = '';
var writeChance = '';
var isLogin = false; //是否登录
var authUrl = mUrl; //跳转链接
var ua = navigator.userAgent.toLowerCase();

var isMsdk = true;
var msdk = milo.xss.filter(milo.request('itopencodeparam'));

if (msdk == '' || msdk == undefined || msdk == 'undefined' || temp_appid == '' || sPlatId == '' || sArea == '' || sPartition == '' || sRoleId == '') {
    isMsdk = false;
}

function ismsdk() {
    if (ua.match(/msdk/i) || milo.request('itopencodeparam') != '') {
        return true;
    } else {
        return false;
    }
}

sData.sArea = sArea;
sData.sPlatId = sPlatId;
sData.sPartition = sPartition;
sData.sRoleId = sRoleId;

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


$('.cj-btn').on('click', function () {
    if (isLogin == false) {
        popShow('loginPop');
        return;
    }
    if (giftChance == 0) {
        popShow('pop8')
    } else {
        if (giftId == '1717048' || giftId == '1717049' || giftId == '1717050') {
            if (writeChance == 0) {
                popShow('pop7')
            } else {
                alert('您已经填写过领奖信息了~');
            }
        } else {
            alert('您已经抽过奖励了~');
        }
    }
})

$('.lottery-btn').on('click', function () {
    if (isLogin == false) {
        popShow('loginPop');
        return;
    }

    if (giftChance == 0) {
        amsCfg_638429.sData = sData;
        amsSubmit(282311, 638429);
    } else {
        alert('您已经抽过奖励了~');
    }

})

$('.things').on('click', function () {
    sData.sName = $("#userName").val();
    sData.sMobile = $("#userMobile").val();
    //实物信息填写
    amsCfg_638431.sData = sData;
    amsSubmit(282311, 638431);
})

$('#QQKJ,#QQHY,#WXHY,#WXKJ').on('click', function () {
    shareID = $(this).attr('id');
    setTimeout(function () {
        shareInGame(shareID);
    }, 400)
})

if (!isMsdk || !ismsdk()) {
    alert('登录超时，请重新从游戏内进入！');
} else {
    milo.ready(function () {
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function (userinfo) {
                if (temp_appid == wx_appid) {
                    sData.sArea = 1;
                    sData.appid = wx_appid;
                } else if (temp_appid == qq_appid) {
                    sData.sArea = 2;
                    sData.appid = qq_appid;
                } else {
                    alert('登录超时，请重新从游戏内进入！');
                    return;
                }

                isLogin = true; //登录状态
                amsCfg_637692.sData = sData;
                amsSubmit(282311, 637692);

                amsCfg_639873.sData = sData;
                amsSubmit(282311, 639873);

            }, function () {
                alert('登录超时，请重新从游戏内进入！');
                return;
            })
        });


    });
}

amsCfg_637692 = {
    '_everyRead': true, //_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 282311, //活动id
    "iFlowId": 637692, //流程id
    "fFlowSubmitEnd": function (res) {
        console.log(res)
        giftChance = res.sOutValue1;
        writeChance = res.sOutValue2;
        giftId = res.sOutValue3;

        return;
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};

amsCfg_639873 = {
    '_everyRead': true, //_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 282311, //活动id
    "iFlowId": 639873, //流程id
    "fFlowSubmitEnd": function (res) {
        nickName = decodeURIComponent(res.sOutValue1);
        userInfo(nickName)
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};


// 抽奖领取主功能初始化
amsCfg_638429 = {
    'iAMSActivityId': '282311', // AMS活动号
    'activityId': '327224', // 模块实例号
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) { // 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) { // 抽奖成功事件

        var giftId = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if (giftId && giftId.length > 1) {
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        if (giftId == '1717051') { //道具礼包
            idx = 3;
        } else if (giftId == '1717048') { //200元礼包
            idx = 9;
        } else if (giftId == '1717049') { //100元礼包
            idx = 1;
        } else if (giftId == '1717050') { //50元礼包
            idx = 11;
        }
        giftChance = 1;
        lotteryPrize(idx);

    }
};


amsCfg_638431 = {
    'iActivityId': '282311', // AMS活动号
    'iFlowId': '638431', // 流程号
    '_everyRead': true,
    'success': function (res) { //提交成功的回调
        console.log(res)
        if (typeof res.jData == "object") { //返回已经提交的数据，填充页面
            need(["biz.provincecityselector", "util.form"], function (pcs, FormManager) {
                console.log(FormManager)
                //提交按钮事件
                g('btn_sure_add').onclick = function () {
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
                    amsSubmit(282311, 638431);
                }

            });

        } else {
            need(["biz.widget.dialog"], function (Dialog) {
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

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}
// 初始化msdkiOSHandler，iOS方法
connectWebViewJavascriptBridge(function (bridge) {
    bridge.init(function (message, responseCallback) {
        log('JS got a message', message)
        var data = {
            'Javascript Responds': 'Wee!'
        }
        log('JS responding with', data)
        responseCallback(data)
    })
    msdkiOSHandler = bridge.callHandler
})

// msdkCall调用原生功能，data传递到Native的JSON参数
function msdkCall(data) {
    if (isiOS()) {
        msdkiOSHandler('MSDKCall', data, null)
    } else {
        prompt(data)
    }
}

function shareInGame(k) {
    var JSON_BEGIN = '{';
    var JSON_END = '}';
    var JSON_DOT = ',';
    var METHOD_SHARE = '"MsdkMethod":"shareWebView"';
    var METHOD_SEND = '"MsdkMethod":"sendMsgWebView"';
    var CHANNEL_QQ = '"channel":"QQ"';
    var CHANNEL_WECHAT = '"channel":"WeChat"';
    var imgUrl = 'https://game.gtimg.cn/images/xylz/cp/a20191217answer/logo_2.png';
    var desc = '来测测你是否就是传说中的方言王中王~参与即抽JD卡、珍稀道具哦~';
    var title = '过山龙遇下山虎，方言鬼才我做主';
    var mUrlN = 'https://xylz.qq.com/cp/a20191217answer/index_wqm.html';

    var DATA_SHARE_TEXT = '"actionReport":"MSG_INVITE","desc":"' + desc + '","link":"' + mUrlN + '","thumbPath":"' + imgUrl + '","title":"' + title + '","type":10001,"user":""';
    var QQKJ = JSON_BEGIN + CHANNEL_QQ + JSON_DOT + METHOD_SHARE + JSON_DOT + DATA_SHARE_TEXT + JSON_END;

    var local_data_send_qq_link = '"actionReport":"MSG_INVITE","desc":"' + desc + '", "link":"' + mUrlN + '","thumbPath":"' + imgUrl + '","title":"' + title + '","type":10001,"user":""';
    var QQHY = JSON_BEGIN + CHANNEL_QQ + JSON_DOT + METHOD_SEND + JSON_DOT + local_data_send_qq_link + JSON_END;

    var DATA_SHARE_TEXT_WX = '"actionReport":"MSG_INVITE","desc":"' + desc + '","link":"' + mUrlN + '","thumbPath":"' + imgUrl + '","title":"' + title + '","type":10001,"user":""';
    var WXKJ = JSON_BEGIN + CHANNEL_WECHAT + JSON_DOT + METHOD_SHARE + JSON_DOT + DATA_SHARE_TEXT_WX + JSON_END;

    var local_data_send_wx_link = '"actionReport":"MSG_INVITE","desc":"' + desc + '", "link":"' + mUrlN + '","thumbPath":"' + imgUrl + '","title":"' + title + '","type":10001,"user":""';
    var WXHY = JSON_BEGIN + CHANNEL_WECHAT + JSON_DOT + METHOD_SEND + JSON_DOT + local_data_send_wx_link + JSON_END;

    if (k == 'QQKJ') {
        msdkCall(QQKJ);
    } else if (k == 'QQHY') {
        msdkCall(QQHY);
    } else if (k == 'WXKJ') {
        msdkCall(WXKJ);
    } else if (k == 'WXHY') {
        msdkCall(WXHY);
    }
}

function userInfo(GameName) {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 111,
        height: 111
    });
    qrcode.makeCode("https://xylz.qq.com/cp/a20191217answer/index_wqm.html"); //海报二维码地址
    var grade = milo.request('grade') * 10, //答题所得分数
        nickName = GameName,
        nameTextColor = '#494e46', //微信昵称颜色
        $state = $(".stage");

    //微信名称过长截断
    if (nickName.length > 4) nickName = nickName.substring(0, 4) + '... 荣获';
    //海报姓名颜色判断
    if (grade == 0) {
        nameTextColor = '#494e46';
    } else if (grade >= 10 && grade <= 30) {
        nameTextColor = '#2e2341';
        $state.css("background-image", 'url(//game.gtimg.cn/images/xylz/cp/a20191217answer/p_bg_10.jpg)');
    } else if (grade >= 40 && grade <= 60) {
        nameTextColor = '#2e2341';
        $state.css("background-image", 'url(//game.gtimg.cn/images/xylz/cp/a20191217answer/p_bg_60.jpg)');
    } else if (grade >= 70 && grade <= 90) {
        nameTextColor = '#622405';
        $state.css("background-image", 'url(//game.gtimg.cn/images/xylz/cp/a20191217answer/p_bg_90.jpg)');
    } else if (grade >= 100) {
        nameTextColor = '#622405';
        $state.css("background-image", 'url(//game.gtimg.cn/images/xylz/cp/a20191217answer/p_bg_100.jpg)');
    }

    var $posterWrap = $(".poster-wrap");
    drawPoster.init({
        canvas: document.querySelector('canvas'),
        cWidth: $posterWrap.width(), //海报宽度
        cHeight: $posterWrap.height(), //海报高度
        imgList: [{
            src: '//game.gtimg.cn/images/xylz/cp/a20191217answer/poster_avatar.png', //微信头像,需传入
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
        }, {
            src: '//game.gtimg.cn/images/xylz/cp/a20191217answer/poster_code.png', //海报背景,需传入答题分数
            x: 67,
            y: 1038,
            w: 111,
            h: 111
        }],
        // qrcode: {
        //     obj: $("#qrcode img")[0], //需要在上面代码生成二维码，此处不用修改
        //     x: 67,
        //     y: 1038,
        //     w: 111,
        //     h: 111
        // },
        textList: [{
            name: nickName, //需要在上面传入微信昵称,此处不用修改
            nameTextColor: nameTextColor,
            font: 'bold 30px Arial',
            textAlign: 'left',
            textBaseline: 'top',
            x: 135,
            y: 55
        }],
        callback: function (ref) {
            //ref为海报img对象
            $(".poster-wrap").empty().append(ref);
        }
    });
}



/* #t6Hl8#8F0494603B3E34E94C2B8221B4583604 */
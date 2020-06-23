var loginInfo = {};
loginInfo.isLogin = false;
var login_type = milo.cookie.get('acctype') ? milo.cookie.get('acctype') : (milo.cookie.get('xyapp_login_type') ? milo.cookie.get('xyapp_login_type') : false);
//alert(login_type);
window.iUseQQConnect = 0;
if (login_type && login_type == 'qc') {
    window.iUseQQConnect = 1;
}
milo.ready(function () {
    milo.cookie.clear("IED_LOG_INFO2", '.qq.com', '/');
    milo.cookie.clear("IED_LOG_INFO2_QC", '.qq.com', '/');
    milo.cookie.clear("wxnickname", '.qq.com', '/');
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userInfo) {
            if (milo.cookie.get('acctype') == 'qc') {
                loginInfo = milo.cookie.get('IED_LOG_INFO2_QC') ? milo.unSerialize(milo.cookie.get('IED_LOG_INFO2_QC')) : '';
            } else {
                loginInfo = milo.cookie.get('IED_LOG_INFO2') ? milo.unSerialize(milo.cookie.get('IED_LOG_INFO2')) : '';
            }
            loginInfo.isLogin = true;
            if (loginInfo.loginType == 'wx') {
                loginInfo.loginType = 'wx';

            } else {
                loginInfo.loginType = 'qq';

            }
        }, function () {
            loginInfo.isLogin = false;
            Tgclub.showLogin();
        });
    });
});
function doQuery(activityid) {
    if (!is_app) {
        alertMsg1("前往心悦App参与活动！");
        return false;
    }
    if (!loginInfo.isLogin) {
        window.Tgclub && Tgclub.showLogin(); //未登陆，当Tgclub对象存在时，强制拉起登陆界面
        return false;
    }
    if (typeof arguments[1] == "object") {
        extend(window["amsCfg_" + activityid].sData, arguments[1]);
    }
    amsSubmit(312933, activityid);
}
amsCfg_676865 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 312933, //活动id
    "iFlowId": 676865, //流程id
    "sNeedSubmitPopDiv": false, // 是否开启loading层
    "fFlowSubmitEnd": function (res) {
        console.log("success");
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        console.log("fail");
    }
};
function app_share_data() {
    var data = {
        'title': "DIY你的夏日男友",
        'summary': "光启盛夏，DIY你的专属夏日男友！",
        'icon': "https://game.gtimg.cn/images/tgclub/act/a20200608diynyxy/icon.png",
        'url': "https://xinyue.qq.com/act/a20200608diynyxy/index.html"
    };
    var jsonStr = JSON.stringify(data);
    Tgclub.shareWebPage(jsonStr, function (ret) {
        var jsonArr = navigator.userAgent.match(/(iphone|ipad|ipod)/i) != null ? ret : JSON.parse(ret);
        if (jsonArr.result == 1) {
        }
//        TGDialogS("popFxcg");
    });
}
//判断客户是否为微信
var ua = navigator.userAgent.toLowerCase();
function isWeiXin() {
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
//判断QQ客户端
function isQQ() {
    var chkRes = false;
    mqq.device.isMobileQQ(function (result) {
        chkRes = result;
    });
    return chkRes;
}
//分享
function sharefriend() {   //分享--执行这个函数就好了
    var a20200519xymp = "a20200519xymp"; //任务编号，便于分享统计
    //分享信息自定义
    var qq_url = "https://xinyue.qq.com/act/a20200608diynyxy/index.html";
    var wx_url = "https://xinyue.qq.com/act/a20200608diynyxy/index.html";
    window.shareData = {  //
        "imgUrl": "https://game.gtimg.cn/images/tgclub/act/a20200608diynyxy/icon.png",//尺寸是240x240的图片,且要存放到qq.com服务器,并填写完整的链接，分享的icon
        "tTitle": 'DIY你的夏日男友',//分享标题
        "tContent": '光启盛夏，DIY你的专属夏日男友！',//分享描述
        "QQtimeLineLink": qq_url,
        "WXtimeLineLink": wx_url
    };
    if (isWeiXin()) {
        var shareAppMessageData = {
            title: shareData.tTitle,
            desc: shareData.tContent,
            link: shareData.QQtimeLineLink,
            imgUrl: shareData.imgUrl,
            success: function () {
            },
            cancel: function () {
            }
        };

        var shareTimelineData = {
            title: shareData.tContent,
            link: shareData.WXtimeLineLink,
            imgUrl: shareData.imgUrl,
            success: function () {
            },
            cancel: function () {
            }
        };
        var qqShareData = {
            title: shareData.tTitle,
            desc: shareData.tContent,
            link: shareData.QQtimeLineLink,
            imgUrl: shareData.imgUrl,
            success: function () {
            },
            cancel: function () {
            }
        };
//朋友圈及好友分享
        need("biz.wxclient", function (WXClient) {
            //微信客户初始化成功后，返回wx对象
            WXClient.init({sAppId: "wxfeb5a65212da517c"}, function (wx) {
                //分享到朋友
                wx.onMenuShareAppMessage(shareAppMessageData);
                //分享到朋友圈
                wx.onMenuShareTimeline(shareTimelineData);
                //分享到手Q
                wx.onMenuShareQQ(qqShareData);
                //分享到QZone
                wx.onMenuShareQZone(qqShareData);
                //分享到微博（默认是不需要的，可根据情况使用）
                wx.onMenuShareWeibo(qqShareData);
            });
        });
    }
    if (isQQ()) {
        mqq.ui.setOnShareHandler(function (type) {
            switch (type + '') {
                case '0': /*QQ好友*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.QQtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('分享成功！');
                        }
                    });
                    break;
                case '1': /*QQ空间*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.QQtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('分享成功！');
                        }
                    });
                    break;
                case '2':    /*微信好友*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.WXtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('分享成功！');
                        }
                    });
                    break;
                case '3': /*微信朋友圈*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.QQtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('分享成功！');
                        }
                    });
                    break;
            }
        });
    }
}
;
sharefriend();
var jumpDownApp = function (delay_time, confirm_txt, callback) {
    setTimeout(function () {
        if (confirmTxt !== false) {
            goHelpHimLock = "unlock";
            need(["biz.widget.dialog"], function (Dialog) {
                Dialog.confirm(confirmTxt, function () {
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        var appDownUrl =
                            "https://itunes.apple.com/cn/app/%E5%BF%83%E6%82%A6%E4%BF%B1%E4%B9%90%E9%83%A8-%E8%85%BE%E8%AE%AF%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E7%A6%8F%E5%88%A9%E5%B9%B3%E5%8F%B0/id1156439976?mt=8";
                        window.location.href = appDownUrl;
                    } else {
                        var appDownUrl =
                            "http://sj.qq.com/myapp/detail.htm?apkName=com.tencent.tgclub";
                        window.location.href = appDownUrl;
                    }
                    if (typeof callback !== "undefined") {
                        callback();
                    }
                });
            });
        }
    }, delayTime);
};
// 根据当前手机类型，给下载app按钮绑定事件
if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    // ios
    $('.click-down-xy-app').on('tap', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var app_down_url = "https://itunes.apple.com/cn/app/%E5%BF%83%E6%82%A6%E4%BF%B1%E4%B9%90%E9%83%A8-%E8%85%BE%E8%AE%AF%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E7%A6%8F%E5%88%A9%E5%B9%B3%E5%8F%B0/id1156439976?mt=8";
        console.log(app_down_url);
        window.location.href = app_down_url;
//            window.location.href = app_down_url;
    });
} else {
    // 安卓
    $('.click-down-xy-app').on('tap', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var app_down_url = "http://sj.qq.com/myapp/detail.htm?apkName=com.tencent.tgclub";
        console.log(app_down_url);
        window.location.href = app_down_url;
    });
}


var go_help_him_lock = 'unlock';
var goToApp = function () {
    event.preventDefault();
    event.stopPropagation();
    if ('lock' == go_help_him_lock) {
        return;
    }
    go_help_him_lock = 'lock';
    var url = 'https://xinyue.qq.com/act/a20200608diynyxy/index.html';
    var schemaUrl = "tgclub://redirect?url=" + encodeURIComponent(url);
    var g_sUA = navigator.userAgent.toLowerCase();
    var android = g_sUA.match(/(android)\s+([\d.]+)/);
    var ios = g_sUA.match(/(ipad|iphone|ipod).*os\s([\d_]+)/);
    var isWeixin = g_sUA.match(/micromessenger/);
    var confirmTxt = '下载心悦俱乐部App，珍心好礼限时兑';
    if (g_sUA.indexOf('tgclub') == -1) {
        // 非App环境下执行
        switch (true) {
            case (null != ios && null != isWeixin): // ios微信
                // IOS的微信，使用JSAPI唤起
                setTimeout(function () {
                    WeixinJSBridge.invoke('launchApplication', {
                        "schemeUrl": schemaUrl
                    }, function (res) {
                    });
                }, 500);
// 手Q直接跳转
                jumpDownApp(3000, false, function () {
                    go_help_him_lock = 'unlock';
                });
                return;
                break;
            case (null != ios && null == isWeixin): // ios 手Q
                window.location.href = schemaUrl;
                var loadDateTime = Date.now();
                setTimeout(function () {
                    var timeOutDateTime = Date.now();
                    if (timeOutDateTime - loadDateTime < 1000) {
                        //if(confirm(confirmTxt)){
                        var app_down_url = "https://itunes.apple.com/cn/app/%E5%BF%83%E6%82%A6%E4%BF%B1%E4%B9%90%E9%83%A8-%E8%85%BE%E8%AE%AF%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E7%A6%8F%E5%88%A9%E5%B9%B3%E5%8F%B0/id1156439976?mt=8";
                        console.log(app_down_url);
                        window.location.href = app_down_url;
                        // }
                    }
                }, 25);
                go_help_him_lock = 'unlock';
                return;
                break;
            case (null != android && null != isWeixin):// 安卓 微信
// IOS的1微信，使用JSAPI唤起
                setTimeout(function () {
                    WeixinJSBridge.invoke('launchApplication', {
                        "schemeUrl": schemaUrl
                    }, function (res) {
                        if (res.err_msg != 'launchApplication:ok') {
                            jumpDownApp(1000, confirmTxt, function () {
                                go_help_him_lock = 'unlock';
                            });
                        }
                    });
                }, 500);
// 手Q直接跳转
//jumpDownApp(1500, confirmTxt, function(){
                go_help_him_lock = 'unlock';
                //});
                return;
                break;
            case (null != android && null == isWeixin): // 安卓 手Q
                var iframe = document.createElement('iframe');
                iframe.src = schemaUrl;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
// 手Q直接跳转
//jumpDownApp(1500, confirmTxt, function(){
                go_help_him_lock = 'unlock';
                //});
                return;
                break;
            default:
                alert('仅适用IOS或Android');
                go_help_him_lock = 'unlock';
                return;
                break;
        }
    }
};
var a = function () {
    goToApp()
};
function alertMsg1(msg) {
    //closeDialog();
    var opt = {};
    opt = msg;
    need(["biz.widget.dialog"], function (Dialog) {
        Dialog.confirm(opt, a);
    });

}

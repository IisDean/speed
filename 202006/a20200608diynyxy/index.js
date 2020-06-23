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
        alertMsg1("ǰ������App������");
        return false;
    }
    if (!loginInfo.isLogin) {
        window.Tgclub && Tgclub.showLogin(); //δ��½����Tgclub�������ʱ��ǿ�������½����
        return false;
    }
    if (typeof arguments[1] == "object") {
        extend(window["amsCfg_" + activityid].sData, arguments[1]);
    }
    amsSubmit(312933, activityid);
}
amsCfg_676865 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 312933, //�id
    "iFlowId": 676865, //����id
    "sNeedSubmitPopDiv": false, // �Ƿ���loading��
    "fFlowSubmitEnd": function (res) {
        console.log("success");
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        console.log("fail");
    }
};
function app_share_data() {
    var data = {
        'title': "DIY�����������",
        'summary': "����ʢ�ģ�DIY���ר���������ѣ�",
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
//�жϿͻ��Ƿ�Ϊ΢��
var ua = navigator.userAgent.toLowerCase();
function isWeiXin() {
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
//�ж�QQ�ͻ���
function isQQ() {
    var chkRes = false;
    mqq.device.isMobileQQ(function (result) {
        chkRes = result;
    });
    return chkRes;
}
//����
function sharefriend() {   //����--ִ����������ͺ���
    var a20200519xymp = "a20200519xymp"; //�����ţ����ڷ���ͳ��
    //������Ϣ�Զ���
    var qq_url = "https://xinyue.qq.com/act/a20200608diynyxy/index.html";
    var wx_url = "https://xinyue.qq.com/act/a20200608diynyxy/index.html";
    window.shareData = {  //
        "imgUrl": "https://game.gtimg.cn/images/tgclub/act/a20200608diynyxy/icon.png",//�ߴ���240x240��ͼƬ,��Ҫ��ŵ�qq.com������,����д���������ӣ������icon
        "tTitle": 'DIY�����������',//�������
        "tContent": '����ʢ�ģ�DIY���ר���������ѣ�',//��������
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
//����Ȧ�����ѷ���
        need("biz.wxclient", function (WXClient) {
            //΢�ſͻ���ʼ���ɹ��󣬷���wx����
            WXClient.init({sAppId: "wxfeb5a65212da517c"}, function (wx) {
                //��������
                wx.onMenuShareAppMessage(shareAppMessageData);
                //��������Ȧ
                wx.onMenuShareTimeline(shareTimelineData);
                //������Q
                wx.onMenuShareQQ(qqShareData);
                //����QZone
                wx.onMenuShareQZone(qqShareData);
                //����΢����Ĭ���ǲ���Ҫ�ģ��ɸ������ʹ�ã�
                wx.onMenuShareWeibo(qqShareData);
            });
        });
    }
    if (isQQ()) {
        mqq.ui.setOnShareHandler(function (type) {
            switch (type + '') {
                case '0': /*QQ����*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.QQtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('����ɹ���');
                        }
                    });
                    break;
                case '1': /*QQ�ռ�*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.QQtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('����ɹ���');
                        }
                    });
                    break;
                case '2':    /*΢�ź���*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.WXtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('����ɹ���');
                        }
                    });
                    break;
                case '3': /*΢������Ȧ*/
                    mqq.ui.shareMessage({
                        title: shareData.tTitle,
                        desc: shareData.tContent,
                        share_type: type,
                        back: true,
                        share_url: shareData.QQtimeLineLink,
                        image_url: shareData.imgUrl
                    }, function (result) {
                        if (result.retCode == "0") {
                            alert('����ɹ���');
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
// ���ݵ�ǰ�ֻ����ͣ�������app��ť���¼�
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
    // ��׿
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
    var confirmTxt = '�������þ��ֲ�App�����ĺ�����ʱ��';
    if (g_sUA.indexOf('tgclub') == -1) {
        // ��App������ִ��
        switch (true) {
            case (null != ios && null != isWeixin): // ios΢��
                // IOS��΢�ţ�ʹ��JSAPI����
                setTimeout(function () {
                    WeixinJSBridge.invoke('launchApplication', {
                        "schemeUrl": schemaUrl
                    }, function (res) {
                    });
                }, 500);
// ��Qֱ����ת
                jumpDownApp(3000, false, function () {
                    go_help_him_lock = 'unlock';
                });
                return;
                break;
            case (null != ios && null == isWeixin): // ios ��Q
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
            case (null != android && null != isWeixin):// ��׿ ΢��
// IOS��1΢�ţ�ʹ��JSAPI����
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
// ��Qֱ����ת
//jumpDownApp(1500, confirmTxt, function(){
                go_help_him_lock = 'unlock';
                //});
                return;
                break;
            case (null != android && null == isWeixin): // ��׿ ��Q
                var iframe = document.createElement('iframe');
                iframe.src = schemaUrl;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
// ��Qֱ����ת
//jumpDownApp(1500, confirmTxt, function(){
                go_help_him_lock = 'unlock';
                //});
                return;
                break;
            default:
                alert('������IOS��Android');
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

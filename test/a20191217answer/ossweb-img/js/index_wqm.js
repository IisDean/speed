var appid = 'wx1cd4fbe9335888fe';//X8����΢��appid
var wx_appid = 'wx7fa53c237760c335';//΢��appid
var qq_appid = '1106396765';//QQ appid
var gzh_appid = 'wx36896ec6df7cd95e';//΢�Ź��ں�ҵ������appid  //
var sArea = '';//���ڴ洢ƽ̨��΢��Ϊ1����QΪ2��Ĭ��Ϊ��Q:2
var sPlatId = '1';//���ڴ洢�ֻ�ϵͳ  Ĭ��1
var sTerminal = 1;//���ڴ洢��ǰҳ��ΪPC�˻��ƶ��ˣ�PC��Ϊ0���ƶ���Ϊ1��Ĭ��ΪPC��
var nickName = '';//�ǳ�
var nickNum = '' //qq��΢���˺�
var headPic = '';//ͷ��URL
var pcUrl = location.protocol + '//hyrz.qq.com/cp/a20191023orderm/index_p.html';//PC��
var mUrl = location.protocol + '//xylz.qq.com/cp/a20191217answer/index_wqm.html';//�ֻ���
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
var isLogin = false;//�Ƿ��¼
var authUrl = mUrl;//��ת����
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
    //�ж��Ƿ���IOSQQ ���� AndroidQQ��
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

//�жϰ�׿
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
    // PTTSendClick('btn','diaIconQq','QQ��¼')
    var UA = navigator.userAgent;
    var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? QQ\/([\d\.]+)/;
    var REGEXP_ANDROID_QQ = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
    if (!REGEXP_IOS_QQ.test(UA) && !REGEXP_ANDROID_QQ.test(UA)) {
        //����UC�������
        setTimeout(function () {
            window.location.href = 'mqqapi://forward/url?url_prefix=' + btoa(mUrl + "?_wv=49957") + "&version=1&src_type=web";
        }, 200);
    } else {
        window.location.href = authUrl + '?_wv=49957&type=qq';
    }
});

$('#wxloginBtn').on('click', function () {
    // PTTSendClick('btn','diaIconWx','΢�ŵ�¼')
    if (isWeiXin()) {
        window.location.href = authUrl;
    } else {
        window.location.href = location.protocol + "//game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90238026&appid=wx7fa53c237760c335&url=https%3A%2F%2Fxylz.qq.com%2Fcp%2Fa20191217answer%2Findex_wqm.html";
    }
})

$('.idx-btn').on('click',function(){
    if (isLogin == false) {
        popShow('loginPop');
        return;
    }
   $('.idx-btn').attr('href','answer.html');
})

milo.ready(function () {
    //�Ż���ʱ���ҳ��󣬵�¼̬���ڵ�����
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
                        isLogin = true;	//��¼״̬

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
                    isLogin = true;	//��¼״̬
                    nickName = milo.xss.filterWxNickName(nickname).replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '*');
                    nickName = nickName.replace(/^[0o]*!/, '');
                    // nickName = decodeURIComponent(userinfo.nickName)
                    nickNum = userinfo.userUin
                    headPic = location.protocol + "//q.qlogo.cn/g?b=qq&nk=" + userinfo.userUin + "&s=100";

                } else {
                    // ��΢�ź���Q��Ȩ��¼��һ����Ϊ��¼ʧ�ܡ�����һЩ��Ѷ������ؿͻ��ˣ��ڳ��ֵ�¼̬��֤ͨ�������
                    return;
                }
                isLogin = true;	//��¼״̬

                setSharedata()
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
                avoidConflict: true,		//Ĭ��ֵΪ�գ��ж��Ƿ���ҪУ��΢�ŵ�¼̬���ţ���Ϊtrue��Ϊ����У�飬��Ϊfalse��Ϊ��У�飬Ĭ��ֵ""��ʾ��΢�Ż�����У�飬����app�����²�У��
                WxAppId: appid,
                scope: 'snsapi_userinfo'
            }
        })
    });


});

function setSharedata() {
    var shareUrl = mUrl ;    //��������

    var shareInfo = {
        'title': '��ɽ������ɽ�������Թ��������', //�������
        'desc': '��������Ƿ���Ǵ�˵�еķ���������~���뼴��JD������ϡ����Ŷ~', //��������
        'url': shareUrl,    //��������
        'imgUrl': location.protocol + '//game.gtimg.cn/images/xylz/cp/a20191217answer/logo_2.png'   //����icon
    };

    //��ʽ������ѡ��
    need("biz.mobileclient", function(mClient){
        var obj = {
            wx_appid : gzh_appid, //΢�Ź��ںŵ�appid
            title: shareInfo.title,// ������⣬Ĭ��Ϊ�ҳ����⣨���ֶ�������
            desc: shareInfo.desc, //�������
            link: shareInfo.url, //��������
            imgUrl: shareInfo.imgUrl, //��������ѿ�����ͼ��
            /*΢�ŷ���ص�������Ҫ�ɲ�д��*/
            WXtrigger: function (res) { //΢�ŵ���¼��ص�
                console.log(JSON.stringify(res));
            },
            WXsuccess: function (res) { //΢�ŷ���ɹ��ص�
                console.log(JSON.stringify(res));
            },
            WXcancel: function (res) { //΢�ŷ���ȡ���ص�
                console.log(JSON.stringify(res));
            },
            WXfail: function (res) { //΢�ŷ���ʧ�ܻص�
                console.log(JSON.stringify(res));
            },
            /*��Q����ص�������Ҫ�ɲ�д��*/
            QQcallback:function(res){//qq�ɹ���ʧ�ܡ���ȡ���Ļص�
                console.log(JSON.stringify(res));
            },
            QQtrigger:function(res){//qq�����¼��Ļص�
                console.log(JSON.stringify(res));
            },
            /* QQ���������ص�������Ҫ�ɲ�д��*/
            qqBrowserCallback: function(data){
                //data.code ==1 ��ʾ�ܷ���
                //data.code ==-1 ��ʾ���ܷ���
                //data.code == 0 ��ʾδ֪
            }
        };
        mClient.shareAll(obj);
    });
}




/* #t6Hl8#8F0494603B3E34E94C2B8221B4583604 */





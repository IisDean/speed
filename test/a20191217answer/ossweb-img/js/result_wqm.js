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
    PTTSendClick('btn','diaIconQq','QQ��¼')
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
    PTTSendClick('btn','diaIconWx','΢�ŵ�¼')
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
                alert('���Ѿ���д���콱��Ϣ��~');
            }
        } else{
            alert('���Ѿ����������~');
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
            alert('���Ѿ����������~');
        }
    }else{
        alert('���Ȱ󶨴���~');
    }

})

$('.things').on('click',function(){
    sData.sName = $("#userName").val();
    sData.sMobile = $("#userMobile").val();
    //ʵ����Ϣ��д
    amsCfg_638431.sData = sData;
    amsSubmit(282311, 638431);
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
                    // ��΢�ź���Q��Ȩ��¼��һ����Ϊ��¼ʧ�ܡ�����һЩ��Ѷ������ؿͻ��ˣ��ڳ��ֵ�¼̬��֤ͨ�������
                    return;
                }
                isLogin = true;	//��¼״̬

                amsCfg_637692.sData = sData;
                amsSubmit(282311, 637692);

                amsCfg_637694.sData = sData;
                amsSubmit(282311, 637694);

                setSharedata()

                include(_server_url + "?_rand=" + Math.random(), function () {
                    need(["biz.roleselector"], function (RoleSelector) {
                        // if (isQQ()){
                        //     $('#channelContentId').html('<option value="2">��Q</option>')
                        // }else{
                        //     $('#channelContentId').html('<option value="1">΢��</option>')
                        // }
                        var roleobj = cloneClass(RoleSelector);
                        roleobj.init({
                            openToOpen: {
                                "sAMSTrusteeship": 1,
                                "ams_targetappid": wx_appid
                            },
                            'type': 'html',
                            'gameId': 'xylz',//��Ϸ��ҵ����
                            'isQueryRole': true,
                            'channelContentId': 'channelContentId',//ƽ̨
                            'areaContentId': 'areaContentId',//����
                            'systemContentId': 'systemContentId',//ios android
                            'roleContentId': 'roleContentId',//��ɫ
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
                avoidConflict: true,		//Ĭ��ֵΪ�գ��ж��Ƿ���ҪУ��΢�ŵ�¼̬���ţ���Ϊtrue��Ϊ����У�飬��Ϊfalse��Ϊ��У�飬Ĭ��ֵ""��ʾ��΢�Ż�����У�飬����app�����²�У��
                WxAppId: appid,
                scope: 'snsapi_userinfo'
            }
        })
    });


});

amsCfg_637692 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 282311, //�id
    "iFlowId":    637692, //����id
    "fFlowSubmitEnd": function(res){
        console.log(res)
        giftChance = res.sOutValue1;
        writeChance = res.sOutValue2;
        giftId = res.sOutValue3;
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

amsCfg_637694={
    type : "query",
    iQueryFlowID:637693,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����
        console.log(bindedInfo)
        isBind = 1
    },
    failure : function(){
        //δ��ʱ����չ����
        isBind = 0;
    }
};

//�ύ�󶨵�����
amsCfg_637693={
    type : "comit",
    needPopupRole:false,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID:637694,
    service:"xylz",
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����
        isBind = 1;
        amsCfg_638429.sData = sData;
        amsSubmit(282311, 638429);
    },
    failure : function(){
        //δ��ʱ����չ����
    }
};


// �齱��ȡ�����ܳ�ʼ��
amsCfg_638429 = {
    'iAMSActivityId' : '282311', // AMS���
    'activityId' : '327224', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�

        giftId = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if (giftId && giftId.length > 1) {
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        if(giftId == '1717051'){    //�������
            idx = 3;
        }else if(giftId == '1717048'){   //200Ԫ���
            idx = 9;
        }else if(giftId == '1717049'){   //100Ԫ���
            idx = 1;
        }else if(giftId == '1717050'){   //50Ԫ���
            idx = 11;
        }
        giftChance = 1;
        lotteryPrize(idx);

    }
};


amsCfg_638431 = {
    'iActivityId' : '282311', // AMS���
    'iFlowId' : '638431', // ���̺�
    '_everyRead' : true,
    'success': function(res){ //�ύ�ɹ��Ļص�
        console.log(res)
        if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector", "util.form"], function(pcs, FormManager) {
                console.log(FormManager)
                //�ύ��ť�¼�
                g('btn_sure_add').onclick = function(){
                    var name = $("#userName").val(),
                        mobile = $("#userMobile").val();
                    if (name == '') {
                        alert('����������');
                        return;
                    }
                    if (name.length > 30) {
                        alert('�����ĳ��Ȳ��ܴ���20');
                        return;
                    }
                    if (mobile == '') {
                        alert('�������ֻ���');
                        return;
                    }
                    if (!milo.isMobile(mobile)) {
                        alert('��������ֻ���������');
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
                    //�ύ�ɹ�
                    writeChance = 1;
                    alert("��ϲ�����ɹ��ύ������Ϣ��");
                } else {
                    Dialog.alert(res.sMsg);
                }
            });
        }
    }
};

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

function userInfo(){
    drawPoster.init({
        imgList: [{
            src: headPic, //΢��ͷ��,�贫��
            x: 44,
            y: 26,
            w: 75,
            h: 75
        }, {
            src: '//game.gtimg.cn/images/xylz/cp/a20191217answer/poster_' + grade + '.png', //��������,�贫��������
            x: 0,
            y: 0,
            w: 673,
            h: 1164
        }],
        textList: [{
            name: nickName, //��Ҫ�����洫��΢���ǳ�,�˴������޸�
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





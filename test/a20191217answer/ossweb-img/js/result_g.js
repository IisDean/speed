var appid = 'wx1cd4fbe9335888fe'; //X8����΢��appid
var wx_appid = 'wx7fa53c237760c335'; //΢��appid
var qq_appid = '1106396765'; //QQ appid
var gzh_appid = 'wx36896ec6df7cd95e'; //΢�Ź��ں�ҵ������appid  //
var temp_appid = milo.xss.filter(milo.request('appid'));
var sTerminal = 1; //���ڴ洢��ǰҳ��ΪPC�˻��ƶ��ˣ�PC��Ϊ0���ƶ���Ϊ1��Ĭ��ΪPC��
var nickNum = '' //qq��΢���˺�
var headPic = ''; //ͷ��URL
var pcUrl = location.protocol + '//hyrz.qq.com/cp/a20191023orderm/index_p.html'; //PC��
var mUrl = location.protocol + '//xylz.qq.com/cp/a20191217answer/index_wqm.html'; //�ֻ���
var chanel = milo.request('adtag');
var perNum = '';
var buttonStep = 1
var shareStatue = ''
var sData = {};
var isBind = 0;
var sPlatId = milo.xss.filter(milo.request('platid')); //���ڴ洢�ֻ�ϵͳ  Ĭ��1
var sArea = milo.xss.filter(milo.request('areaid')); //���ڴ洢ƽ̨��΢��Ϊ1����QΪ2��Ĭ��Ϊ��Q:2
var sPartition = milo.xss.filter(milo.request('partition'));
var sRoleId = milo.xss.filter(milo.request('roleid'));
var nickName = ''; //�ǳ�
var giftChance = '';
var idx = '';
var giftId = '';
var writeChance = '';
var isLogin = false; //�Ƿ��¼
var authUrl = mUrl; //��ת����
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
                alert('���Ѿ���д���콱��Ϣ��~');
            }
        } else {
            alert('���Ѿ����������~');
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
        alert('���Ѿ����������~');
    }

})

$('.things').on('click', function () {
    sData.sName = $("#userName").val();
    sData.sMobile = $("#userMobile").val();
    //ʵ����Ϣ��д
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
    alert('��¼��ʱ�������´���Ϸ�ڽ��룡');
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
                    alert('��¼��ʱ�������´���Ϸ�ڽ��룡');
                    return;
                }

                isLogin = true; //��¼״̬
                amsCfg_637692.sData = sData;
                amsSubmit(282311, 637692);

                amsCfg_639873.sData = sData;
                amsSubmit(282311, 639873);

            }, function () {
                alert('��¼��ʱ�������´���Ϸ�ڽ��룡');
                return;
            })
        });


    });
}

amsCfg_637692 = {
    '_everyRead': true, //_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 282311, //�id
    "iFlowId": 637692, //����id
    "fFlowSubmitEnd": function (res) {
        console.log(res)
        giftChance = res.sOutValue1;
        writeChance = res.sOutValue2;
        giftId = res.sOutValue3;

        return;
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

amsCfg_639873 = {
    '_everyRead': true, //_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 282311, //�id
    "iFlowId": 639873, //����id
    "fFlowSubmitEnd": function (res) {
        nickName = decodeURIComponent(res.sOutValue1);
        userInfo(nickName)
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};


// �齱��ȡ�����ܳ�ʼ��
amsCfg_638429 = {
    'iAMSActivityId': '282311', // AMS���
    'activityId': '327224', // ģ��ʵ����
    'onBeginGetGiftEvent': function () {
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent': function (callbackObj) { // �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) { // �齱�ɹ��¼�

        var giftId = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if (giftId && giftId.length > 1) {
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        if (giftId == '1717051') { //�������
            idx = 3;
        } else if (giftId == '1717048') { //200Ԫ���
            idx = 9;
        } else if (giftId == '1717049') { //100Ԫ���
            idx = 1;
        } else if (giftId == '1717050') { //50Ԫ���
            idx = 11;
        }
        giftChance = 1;
        lotteryPrize(idx);

    }
};


amsCfg_638431 = {
    'iActivityId': '282311', // AMS���
    'iFlowId': '638431', // ���̺�
    '_everyRead': true,
    'success': function (res) { //�ύ�ɹ��Ļص�
        console.log(res)
        if (typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector", "util.form"], function (pcs, FormManager) {
                console.log(FormManager)
                //�ύ��ť�¼�
                g('btn_sure_add').onclick = function () {
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
                    amsSubmit(282311, 638431);
                }

            });

        } else {
            need(["biz.widget.dialog"], function (Dialog) {
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

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}
// ��ʼ��msdkiOSHandler��iOS����
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

// msdkCall����ԭ�����ܣ�data���ݵ�Native��JSON����
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
    var desc = '��������Ƿ���Ǵ�˵�еķ���������~���뼴��JD������ϡ����Ŷ~';
    var title = '��ɽ������ɽ�������Թ��������';
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
    qrcode.makeCode("https://xylz.qq.com/cp/a20191217answer/index_wqm.html"); //������ά���ַ
    var grade = milo.request('grade') * 10, //�������÷���
        nickName = GameName,
        nameTextColor = '#494e46', //΢���ǳ���ɫ
        $state = $(".stage");

    //΢�����ƹ����ض�
    if (nickName.length > 4) nickName = nickName.substring(0, 4) + '... �ٻ�';
    //����������ɫ�ж�
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
        cWidth: $posterWrap.width(), //�������
        cHeight: $posterWrap.height(), //�����߶�
        imgList: [{
            src: '//game.gtimg.cn/images/xylz/cp/a20191217answer/poster_avatar.png', //΢��ͷ��,�贫��
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
        }, {
            src: '//game.gtimg.cn/images/xylz/cp/a20191217answer/poster_code.png', //��������,�贫��������
            x: 67,
            y: 1038,
            w: 111,
            h: 111
        }],
        // qrcode: {
        //     obj: $("#qrcode img")[0], //��Ҫ������������ɶ�ά�룬�˴������޸�
        //     x: 67,
        //     y: 1038,
        //     w: 111,
        //     h: 111
        // },
        textList: [{
            name: nickName, //��Ҫ�����洫��΢���ǳ�,�˴������޸�
            nameTextColor: nameTextColor,
            font: 'bold 30px Arial',
            textAlign: 'left',
            textBaseline: 'top',
            x: 135,
            y: 55
        }],
        callback: function (ref) {
            //refΪ����img����
            $(".poster-wrap").empty().append(ref);
        }
    });
}



/* #t6Hl8#8F0494603B3E34E94C2B8221B4583604 */
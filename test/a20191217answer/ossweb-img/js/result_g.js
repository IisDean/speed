var appid = 'wx1cd4fbe9335888fe';//X8����΢��appid
var wx_appid = 'wx7fa53c237760c335';//΢��appid
var qq_appid = '1106396765';//QQ appid
var gzh_appid = 'wx36896ec6df7cd95e';//΢�Ź��ں�ҵ������appid  //
var temp_appid = milo.xss.filter(milo.request('appid'));
var sTerminal = 1;//���ڴ洢��ǰҳ��ΪPC�˻��ƶ��ˣ�PC��Ϊ0���ƶ���Ϊ1��Ĭ��ΪPC��
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
var sPlatId = milo.xss.filter(milo.request('platid'));  //���ڴ洢�ֻ�ϵͳ  Ĭ��1
var sArea = milo.xss.filter(milo.request('areaid'));  //���ڴ洢ƽ̨��΢��Ϊ1����QΪ2��Ĭ��Ϊ��Q:2
var sPartition = milo.xss.filter(milo.request('partition'));
var sRoleId = milo.xss.filter(milo.request('roleid'));
var nickName = milo.xss.filter(milo.request('name'));  //�ǳ�
var giftChance = '';
var idx = '';
var giftId = '';
var writeChance = '';
var isLogin = false;//�Ƿ��¼
var authUrl = mUrl;//��ת����
var ua = navigator.userAgent.toLowerCase();

var isMsdk = true;
var msdk = milo.xss.filter(milo.request('msdkEncodeParam'));
if(msdk == '' || msdk == undefined || msdk == 'undefined' || temp_appid == '' || sPlatId == '' || sArea == '' || sPartition == '' || sRoleId == ''){
    isMsdk = false;
}

function ismsdk() {
    if (ua.match(/msdk/i) || milo.request('msdkEncodeParam') != '') {
        return true;
    } else {
        return false;
    }
}


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
            amsCfg_679001.sData = sData;
            amsSubmit(282311, 679001);
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

if (!isMsdk || !ismsdk()) {
    alert('��¼��ʱ�������´���Ϸ�ڽ��룡');
} else {
    milo.ready(function () {
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function (userinfo) {
                if (temp_appid == wx_appid) {
                    sData.sArea = 1;
                    sData.appid = wx_appid;
                    _server_url = location.protocol + '//xylz.qq.com/comm-htdocs/js/game_area/xylz_WX_server_select.js';
                } else if (temp_appid == qq_appid) {
                    sData.sArea = 2;
                    sData.appid = qq_appid;
                    _server_url = location.protocol + '//xylz.qq.com/comm-htdocs/js/game_area/xylz_SQ_server_select.js';
                } else {
                    alert('��¼��ʱ�������´���Ϸ�ڽ��룡');
                    return;
                }


                isLogin = true;	//��¼״̬

                amsCfg_637692.sData = sData;
                amsSubmit(282311, 637692);

                amsCfg_637694.sData = sData;
                amsSubmit(282311, 637694);

                shareInGame()

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
            }, function () {
                alert('��¼��ʱ�������´���Ϸ�ڽ��룡');
                return;
            })
        });


    });
}

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
        amsCfg_679001.sData = sData;
        amsSubmit(282311, 679001);
    },
    failure : function(){
        //δ��ʱ����չ����
    }
};


// �齱��ȡ�����ܳ�ʼ��
amsCfg_679001 = {
    'iAMSActivityId' : '282311', // AMS���
    'activityId' : '327224', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�

        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if (packageLen && packageLen.length > 1) {
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        if(packageLen == '1717051'){    //�������
            idx = 3;
        }else if(packageLen == '1717048'){   //200Ԫ���
            idx = 9;
        }else if(packageLen == '1717049'){   //100Ԫ���
            idx = 1;
        }else if(packageLen == '1717050'){   //50Ԫ���
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

function shareInGame(k) {
    var sTitle = "��ɽ������ɽ�������Թ��������";
    var sDesc = "��������Ƿ���Ǵ�˵�еķ���������~���뼴��JD������ϡ����Ŷ~";
    var sUrl = shareUrl;
    var QQKJ = '{"MsdkMethod":"WGSendToQQ","scene":"1","title":"' + sTitle + '","desc":"' + sDesc + '","url":"' + sUrl + '"}';
    var QQHY = '{"MsdkMethod":"WGSendToQQ","scene":"2","title":"' + sTitle + '","desc":"' + sDesc + '","url":"' + sUrl + '"}';
    var WXKJ = '{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"' + sTitle + '","desc":"' + sDesc + '","url":"' + sUrl + '","mediaTagName":"MSG_INVITE","messageExt":"js �Զ���"}';
    var WXHY = '{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"' + sTitle + '","desc":"' + sDesc + '","url":"' + sUrl + '","mediaTagName":"MSG_INVITE","messageExt":"js �Զ���"}';
    if (k == 'QQKJ') {
        msdkShare(QQKJ);
    } else if (k == 'QQHY') {
        msdkShare(QQHY);
    } else if (k == 'WXKJ') {
        msdkShare(WXKJ);
    } else if (k == 'WXHY') {
        msdkShare(WXHY);
    }
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





var ctrlJs = {
    data: {
        pageSwiper: null,// ҳ��Swiper
        pageIdx: 0,//��ǰҳ�����
        navLeft: ['12.8%', '37%', '61%', '85%'],//�α�״̬
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
    },
    methods: {
        initShare: function(type){//���÷������
        },
        cutPage: function(idx){//�л�ҳ��
            ctrlJs.data.pageSwiper.slideTo(idx-1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function(idx){//�ƶ������α�
            $(".nav-list li").removeClass("active").eq(idx).addClass('active');
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function(){//�ν���ʼ��
            if(ctrlJs.data.gjStatus)return false;
            ctrlJs.data.gjStatus = true;
            //var idx = ctrlJs.methods.getRandom(0, ctrlJs.data.prizeList.length);
            $(".cxgj-btn").hide();
            var gjImg = new Image();
            gjImg.src = '//game.gtimg.cn/images/ty/cp/a20200707czkql/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function(){
                $(gjImg).eraser({
                    size: 20, //������Ƥ����С
                    completeRatio: .6, //���ò����������
                    completeFunction: ctrlJs.methods.showResetButton   //���ڲ������������������
                });
                // ���ý�Ʒ��Ϣ
                // ��ƷͼƬ��ַ ����17����Ʒ,��Ʒ�б���ctrlJs.data.prizeList
                // $(".prize-img img").attr('src', ctrlJs.data.prizeList[idx].imgSrc); //��ƷͼƬ
                // $(".prize-msg").html(ctrlJs.data.prizeList[idx].name); //��Ʒ����
                // ctrlJs.data.prizeResult = ctrlJs.data.prizeList[idx].name;
            }
        },
		showResetButton: function(){//�ν����
            TGDialogS('popGj');
            ctrlJs.data.gjStatus = false;
            $(".cxgj-btn").show();
            ctrlJs.data.pageSwiper.unlockSwipes();
        },
        initSwiper: function(){// ҳ��Swiper
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
        backHome: function(){//�ص���ҳ
            $(".swiper-container .wrap").fadeOut(300);
            setTimeout(function(){
                $(".part-1 .wrap").show();
                $(".part-1").show();
            }, 600);
        },
        playVideo: function(vid){//������Ƶ
            TGDialogS("popVideo");
            ctrlJs.data.video = new Txplayer({
                containerId: 'videoWrap',
                vid: vid,
                width: ctrlJs.data.videoWidth,
                height: ctrlJs.data.videoHeight,
                autoplay: true
            });
        },
        pauseVideo: function(){//�ر���Ƶ
            closeDialog();
            $("#videoWrap").empty();
        },
        getRandom: function(min, max){//��ȡ�����
            return Math.floor( Math.random() * (max- min) + min );
        }
    },
    init: function(callback){
        var that = this;
        //��������հ״��ر�
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
var sPlatId = isIos() ? '0' : (isAndroid() ? '1' : '1');//ϵͳ
var sArea = isQQ() ? '2' : (isWeiXin() ? '1' : '2');//ƽ̨
window.ams_login_avoid_conflict = true;		//��ֹ���ŵ�ȫ�ֱ���
var appid = "1105636778";//��Ϸ-QQ��appid
var player = {isBind: false,inviteCode:'',shareType:1,orderStatus:2}; //��һ�����Ϣ
var initData = {friendUsed:0,sOutValue2:''};//��ʼ����Ϣ
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
    // �ж��Ƿ���IOSQQ ���� AndroidQQ��
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
//��¼����
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

    var title = '���µ�һ��������������';
    var desc = '�������µ�һ����<��ȸ��>���ٷְ���ȡ������������ս��';
    var desc2 = '���µ�һ�����������������֪��';
    var img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_bw.jpg";

    title = '���㣬��Ѷ�콢���ο�ԤԼ��';
    desc = '������������Ρ��������µ���ԤԼ�ѿ���������ԤԼ����ר����������Ƚ�פ�󽭺���';
    desc2 = '���㣬��Ѷ�콢���ο�ԤԼ��';
    img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_yuyue.jpg";

    if (isQQ()) {
        shareURL = pageUrl+'?shareCode='+milo.request('shareCode')+'&shareToken='+milo.request('shareToken');
    } else if (isWeiXin()) {
        shareURL = pageUrl+'?shareCode='+milo.request('shareCode')+'&shareToken='+milo.request('shareToken');
    }


    console.log(shareURL);

    if (isWeiXin()) {
        //΢�ŷ���
        need("biz.wxclient", function(WXClient){
            //΢�ſͻ���ʼ���ɹ��󣬷���wx����
            WXClient.init({"sAppId":"wx36896ec6df7cd95e"},function(wx){
                //�����õ���Ϣ����
                var shareObj={
                    title:title,
                    desc: desc,
                    link: shareURL,
                    imgUrl: img,
                    actName:actName,//���������
                    success: function (sres) {
                        oneShare();
                    },
                    cancel: function (sres) {}
                }
                //Ϊ���͸����ѡ���������Ȧ������QQ������΢��ͬʱ�󶨷����¼�
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
                case '0': /*QQ����*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.qqShareLink,
                        image_url: shareObjTM.img_url
                    }, function(result) {
                        //���Ѳ����
                        //oneShare();
                    });
                    break;
                case '1': /*QQ�ռ�*/
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
                case '2':	/*΢�ź���*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,	//����һ�㶼�ǿ�����ȥ΢�ŵ�¼̬������
                        image_url: shareObjTM.img_url
                    }, function(result) {
                        oneShare();
                    });
                    break;
                case '3': /*΢������Ȧ*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,   //����һ�㶼�ǿ�����ȥ΢�ŵ�¼̬������
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
    //ԤԼ��Ϸ��appid
    var appid = args.appid;
    //��ĿID��������Դ
    var jsonid = args.jsonid;
    //ƽ̨ID�����ְ�׿��IOS
    var platid = sPlatId;
    var g_tk = getToken();
    //ƴ�����󴮣�ע�⣺tt�ֶε�ֵ��������������˫����������
    var orderUrl = location.protocol + '//info.gamecenter.qq.com/cgi-bin/gc_gameinfo_v2_fcgi?param={"key":{"param":{"tt":' + platid + ',"appid":"' + appid + '","source":"' + jsonid + '"},"module":"gc_gameinfo_v2","method":"subscribeUpcomingGameV2"}}&g_tk=' + g_tk;
    //��������
    requestAjax({
        url: orderUrl,
        callback: function (json) {
            cb && cb(json);//����ص�
        }
    });

    //��ȡToken
    function getToken() {
        for (var t = 5381, e = getCookie("skey") || "", i = 0, n = e.length; i < n; ++i)
            t += (t << 5) + e.charCodeAt(i);
        return 2147483647 & t
    }

    //��ȡcookie
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

    //AJAX����
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
                    msg: "�����쳣�����Ժ����ԣ�"
                });
            }
        });
    }
}

milo.ready(function () {
    shareFun();

    // ����΢��
    $('.wxlogin').on('click', function () {
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            window.location.href = WXactivityUrl;
        } else {
            // openlinkhttps://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90233233&appid=wx7fa53c237760c335&url=https%3A%2F%2Fxylz.qq.com%2Fcp%2Fa20190929dema%2Findex_wq.html
            location.href = location.protocol + "//game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90247131&appid=wx39bde50a0857a5af&url=https%3A%2F%2Fd.qq.com%2Fcp%2Fa20200605answer%2Findex_wq.html";
        }
    });

    // ������Q
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

    //ԤԼBTN
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
            //�жϿͻ����뵱ǰ��¼��ʽ�Ƿ�һ�£���һ��ע����¼̬��Ϣ��ˢ��ҳ��
            if ((isWeiXin() && acctype != 'wx') || (isQQ() && acctype == 'wx')) {
                LoginManager.logout({
                    logoutCallback: function () {
                        location.reload(true);
                    }
                });
                return;
            } else {
                //�����¼̬û���쳣��������ҵ���߼�
                if (isWeiXin()) {
                    appid = 'wx1cd4fbe9335888fe';//��Ѷ��Ϸ���appid
                    sData = {
                        "sArea": '1',
                        "sPlatId": sPlatId,
                        "ams_targetappid": 'wxd9e0d500b5fb209f'//��Ϸappid
                    };
                    LoginManager.getUserInfoByWxOpenId({
                        "openid": milo.cookie.get("openid"),
                        "access_token": milo.cookie.get("access_token")
                    }, function (wxuser) {
                        //��ȡ�ǵ�¼ͷ��
                        player.nickName = milo.xss.filterWxNickName(wxuser.nickname);
                        player.nickName = player.nickName.replace(/<span.*?><\/span>/g, '');
                        if (player.nickName == ''){
                            player.nickName = '����'
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
                        redirect_wx_url: window.location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(WXactivityUrl+'&shareCode='+milo.request('shareCode')+'&shareToken='+milo.request('shareToken'))//�ص�url
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

//����token��ѯ��Ϣ init
amsCfg_691083 = {
    'iActivityId' : '321796',  // AMS���
    'activityId' : '10695', 			// ģ��ʵ����
    'iFlowId':'691083',
    'sNeedSubmitPopDiv': true,
    'sData':{
        'sArea':'', 	//�ֻ�����
        'sPlatId':''	//ƽ̨
    },
    "fFlowSubmitEnd": function(res){
        //ame���ص���0�Ǻ��ߵ�����
        if (res.iRet == 0 && res.jData.ret == 0) {
            var name = res.jData.extend3;
            name = milo.xss.filterWxNickName(name);
            name = name.replace(/<span.*?><\/span>/g, '');
            if (name == ''){
                name = '����'
            }
            $(".user-msg-text p").text(name+' ������ԤԼ');
            $(".avatar-head img").attr('src',res.jData.extend2);
        } else {
            alert(res.sMsg);
            window.location.href = homePage;
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        $("#popTips .pop-msg-text").text(res.sMsg);
        TGDialogS('popTips');
    }
};

//������� no show
amsCfg_691298 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId":    691298, //����id
    "fFlowSubmitEnd": function(res){},
    "fFlowSubmitFailed":function(res){}
};

//wxƽ̨ԤԼ && ����� no show
amsCfg_690280 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId":    690280, //����id
    'sNeedSubmitPopDiv': true,
    'sData':{
        'sArea':'', 	//�ֻ�����
        'sPlatId':''	//ƽ̨
    },
    "fFlowSubmitEnd": function(res){},
    "fFlowSubmitFailed":function(res){}
};


//ԤԼ���� sure
amsCfg_690215 = {
    'iActivityId': '321796',  // AMS���
    'activityId': '10695', 			// ģ��ʵ����
    'iFlowId': '690215',
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//�ֻ�����
        'sPlatId': ''	//ƽ̨
    },
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            $("#popTips .pop-msg-text").text('ԤԼ�ɹ�');
            TGDialogS('popTips');
            //////////////////////////////ԤԼ��ʼ
            if (isQQ()) {
                // ��ѯƽ̨ԤԼ
                orderGameCenter({
                    appid: "1105636778", //ԤԼ��Ϸ��appid
                    jsonid: '888888',    //��ĿID��������Դ����ͬҵ��ID��ͬ����Դ��jsonid��δ���������ĵ�4���֣�295725
                    callback: function (json) {
                        var ret = json.data.key.retBody.result;//���෵���뺬������ĵ�3����
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

                player.orderStatus = 3;// 3��������ż�¼
                amsCfg_690213.sData = sData; //order For ams
                amsSubmit(321796, 690213);
            }
            //////////////////////////////ԤԼ����
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
//��ѯamsԤԼ��Ϣ
amsCfg_690213 = {
    'iActivityId' : '321796',  // AMS���
    'activityId' : '10695', 			// ģ��ʵ����
    'iFlowId':'690213',
    'sNeedSubmitPopDiv': false,
    'sData':{
        'sArea':'', 	//�ֻ�����
        'sPlatId':''	//ƽ̨
    },
    "fFlowSubmitEnd": function(res){
        //ame���ص���0�Ǻ��ߵ�����
        if (res.iRet == 0) {
            if (res.jData.rsvtStatus != '1' || res.jData.usedCode == ''){
                //1���Ѽ�¼ԤԼ��Ϣ δԤԼ or �׺�
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
//amsԤԼ no show
amsCfg_690214 = {
    '_everyRead': true,
    'iActivityId' : '321796',  // AMS���
    'activityId' : '10695', 			// ģ��ʵ����
    'iFlowId':'690214',
    'sNeedSubmitPopDiv': false,
    /*'sData':{
        'sArea':'', 	//�ֻ�����
        'sPlatId':''	//ƽ̨
    },*/
    "fFlowSubmitEnd": function(res){},
    "fFlowSubmitFailed":function(res){}
};





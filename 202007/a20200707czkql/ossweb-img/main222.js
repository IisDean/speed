var ctrlJs = {
    data: {
        pageSwiper: null,// ҳ��Swiper
        pageIdx: 0,//��ǰҳ�����
        navLeft: ['12.8%', '37%', '61%', '85%'],//�α�״̬
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
        gjStatus: false,//Ĭ��Ϊfalse�� ����trueʱ��ʾ��ǰ���Թν�
        prizeResult: '',//�н����
        prizeListQQ: [
            {
                pid: '2001431',
                name: '���⡤�����跼��7�죩',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_1.png'
            }, {
                pid: '2001428',
                name: '��ɫ�ķ���ҳ��1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_2.png'
            }, {
                pid: '2001427',
                name: 'Ȫ��������1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_3.png'
            }, {
                pid: '2001426',
                name: '˽���ز���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_4.png'
            }, {
                pid: '2001424',
                name: '���ɹ�ѫ���2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_5.png'
            }, {
                pid: '2001436',
                name: '�쵶����ӡ��һ���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_6.png'
            }, {
                pid: '2001433',
                name: '���������С�1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_7.png'
            }, {
                pid: '2001435',
                name: '�����˻����˱���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_8.png'
            }, {
                pid: '2001430',
                name: '��Ӱ��ϰ¼������1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_9.png'
            }, {
                pid: '2001429',
                name: '��Ӱ��ϰ¼������2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_10.png'
            }, {
                pid: '2001423',
                name: 'һ��˪����5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_11.png'
            }, {
                pid: '2001422',
                name: 'һ����˿��5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_12.png'
            }, {
                pid: '2001420',
                name: '��Ӱ��ϰ¼��һ��5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_13.png'
            }, {
                pid: '2001419',
                name: '�������2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_14.png'
            }, {
                pid: '2001409',
                name: '�쳾��ϻ��1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_15.png'
            }, {
                pid: '2001418',
                name: '����20',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_16.png'
            }, {
                pid: '2001432',
                name: '������20000',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_17.png'
            }
        ],
        prizeListWX: [
            {
                pid: '1999914',
                name: '���⡤�����跼��7�죩',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_1.png'
            }, {
                pid: '1999911',
                name: '��ɫ�ķ���ҳ��1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_2.png'
            }, {
                pid: '1999910',
                name: 'Ȫ��������1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_3.png'
            }, {
                pid: '1999909',
                name: '˽���ز���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_4.png'
            }, {
                pid: '1999908',
                name: '���ɹ�ѫ���2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_5.png'
            }, {
                pid: '1999918',
                name: '�쵶����ӡ��һ���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_6.png'
            }, {
                pid: '1999916',
                name: '���������С�1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_7.png'
            }, {
                pid: '1999917',
                name: '�����˻����˱���1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_8.png'
            }, {
                pid: '1999913',
                name: '��Ӱ��ϰ¼������1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_9.png'
            }, {
                pid: '1999912',
                name: '��Ӱ��ϰ¼������2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_10.png'
            }, {
                pid: '1999906',
                name: 'һ��˪����5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_11.png'
            }, {
                pid: '1999905',
                name: 'һ����˿��5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_12.png'
            }, {
                pid: '1999904',
                name: '��Ӱ��ϰ¼��һ��5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_13.png'
            }, {
                pid: '1999903',
                name: '�������2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_14.png'
            }, {
                pid: '1999901',
                name: '�쳾��ϻ��1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_15.png'
            }, {
                pid: '1999902',
                name: '����20',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_16.png'
            }, {
                pid: '1999915',
                name: '������20000',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_17.png'
            }
        ]
    },
    methods: {
        initShare: function (type) {//���÷������
        },
        cutPage: function (idx) {//�л�ҳ��
            ctrlJs.data.pageSwiper.slideTo(idx - 1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function (idx) {//�ƶ������α�
            $(".nav-list li").removeClass("active").eq(idx).addClass('active');
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function () {//�ν���ʼ��
            if (ctrlJs.data.gjStatus) return false;
            ctrlJs.data.gjStatus = true;
            //var idx = ctrlJs.methods.getRandom(0, ctrlJs.data.prizeList.length);
            $(".cxgj-btn").hide();
            var gjImg = new Image();
            gjImg.src = '//game.gtimg.cn/images/ty/cp/a20200707czkql/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function () {
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
        showResetButton: function () {//�ν����
            TGDialogS('popGj');
            ctrlJs.data.gjStatus = false;
            $(".cxgj-btn").show();
            ctrlJs.data.pageSwiper.unlockSwipes();
        },
        initSwiper: function () {// ҳ��Swiper
            ctrlJs.data.pageSwiper = new Swiper('.swiper-container', {
                effect: 'fade',
                initialSlide: 0,
                onSlideChangeStart: function (swiper) {
                    ctrlJs.methods.moveCursor(swiper.activeIndex + 1);
                },
                onTouchEnd: function (swiper) {
                    var dis = 70;
                    TR = swiper.translate;
                    if (TR > dis) {
                        swiper.setWrapperTranslate(TR);
                        ctrlJs.methods.backHome();
                    }
                }
            })
        },
        backHome: function () {//�ص���ҳ
            $(".swiper-container .wrap").fadeOut(300);
            setTimeout(function () {
                $(".part-1 .wrap").show();
                $(".part-1").show();
            }, 600);
        },
        playVideo: function (vid) {//������Ƶ
            TGDialogS("popVideo");
            ctrlJs.data.video = new Txplayer({
                containerId: 'videoWrap',
                vid: vid,
                width: ctrlJs.data.videoWidth,
                height: ctrlJs.data.videoHeight,
                autoplay: true
            });
        },
        pauseVideo: function () {//�ر���Ƶ
            closeDialog();
            $("#videoWrap").empty();
        },
        getRandom: function (min, max) {//��ȡ�����
            return Math.floor(Math.random() * (max - min) + min);
        }
    },
    init: function (callback) {
        var that = this;
        //��������հ״��ر�
        $("body").on("touchstart", "#_overlay_", function () {
            if (!$("#popVideo").is(":hidden")) ctrlJs.methods.pauseVideo();
            setTimeout(function () {
                closeDialog();
            }, 100);
        });
        if (callback) callback(that);
    }
}
ctrlJs.init();

//////////////////////////////////////////////////////////////

var ua = window.navigator.userAgent.toLowerCase();
var homePage = location.protocol + '//ty.qq.com/cp/a20200707czkql/index_wq.html';
var WXactivityUrl = location.protocol + '//ty.qq.com/cp/a20200707czkql/index_wq.html?acctype=wx&appid=wx1cd4fbe9335888fe';
var pageUrl = location.protocol + "//ty.qq.com/cp/a20200707czkql/page_wq.html";
var shareURL = '';
var sPlatId = isIos() ? '0' : (isAndroid() ? '1' : '');//ϵͳ
var sArea = isQQ() ? '2' : (isWeiXin() ? '1' : '');//ƽ̨
window.ams_login_avoid_conflict = true;		//��ֹ���ŵ�ȫ�ֱ���
var appid = "1105636778";//��Ϸ-QQ��appid
var player = {isBind: false, inviteCode: '', inviteCodeToken: '', shareType: 1}; //��һ�����Ϣ
var initData = {friendUsed: 0, sOutValue2: ''};//��ʼ����Ϣ
var sData = {};
var giftInfo = ['', '��ȸ��ͼ����', '��ȸ��ͼ����', '��������', '�����ƪ'];
var giftNum = [0, 0, 0, 0, 0, 0];
var orderStatus = [0, 0];//����ʹ��
var shareStatus = [0, 0];//����ʹ��
var cjStatus = [0, 0];//qq,wx
var friendStatus = [0, 0]; //���� ʹ��
var realPrize = ['2001433', '2001435', '2001436', '1999916', '1999917', '1999918'];
var typeName = 1; //��������
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

//ԤԼ���
function orderFun() {
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            amsCfg_690215.sData = sData;
            amsSubmit(321796, 690215);
        }, function () {
            TGDialogS('popLogin');
        });
    });
}

//�齱
function getGift(i) {
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            if (i == 'share') {
                amsCfg_689934.sData = sData;
                amsSubmit(321796, 689934);
            } else if (i == 'order') {
                amsCfg_689938.sData = sData;
                amsSubmit(321796, 689938);
            } else if (i == 'invit') {
                amsCfg_689937.sData = sData;
                amsSubmit(321796, 689937);
            } else if (i == 'card5') {
                amsCfg_689932.sData = sData;
                amsSubmit(321796, 689932);
            }
        }, function () {
            TGDialogS('popLogin');
        });
    });
}

//��ť����
function listBtnStatus(list) {
    $(".btn_get").each(function (index) {
        if (list.includes(Number(index + 1) + '')) {
            $(this).addClass("end");
        }
    })

    $(".place_pic").each(function (index) {
        if (list.includes(Number(index + 1) + '')) {
            $(this).removeClass("gray");
        }
    })
}

//�����õ����ַ
function writeAddress() {
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            addMyinfo(ctrlJs.data.prizeResult);
        }, function () {
            TGDialogS('popLogin');
        });
    });
}

//��Ⱦҳ��״̬
function initPage() {
    //card Num
    var meg = true;
    for (var i = 1; i <= 4; i++) {
        if (parseInt(giftNum[i]) <= 0) {
            $("#card" + i + 'p').addClass("filter");
            meg = false;
        } else {
            $("#card" + i + 'p').removeClass("filter");
        }
        $("#card" + i).text(giftNum[i]);
    }

    if (!meg){
        $(".hckql-btn").addClass("filter");
    }else{
        $(".hckql-btn").removeClass("filter");
    }

    //orderStatus
    if (orderStatus[0] >= 1) {
        $(".yuyue-btn").hide();
        $(".yuyue-btn2").show();
        $(".task-list a").eq(2).addClass("filter");

        $(".yuyue-gift1").removeClass("filter");
    }else{
        $(".yuyue-gift1").addClass("filter");
    }
    if (orderStatus[1] >= 1) {
        $(".yuyue-gift1").hide();
        $(".yuyue-gift2").show();
    }
    //shareStatus
    if (shareStatus[0] >= 1) {
        $(".task-list a").eq(0).addClass("filter");
        $(".ljfx-gift1").removeClass("filter"); //�콱��ť
    }else{
        $(".ljfx-gift1").addClass("filter");//�콱��ť
    }
    if (shareStatus[1] >= 1) {
        $(".ljfx-gift1").hide();
        $(".ljfx-gift2").show();
    }

    //gift
    if (isQQ()) {
        //qq
        if (cjStatus[0] >= 0) {
            $(".gj-msg-text span").eq(0).text(giftNum[5]);
            $(".gj-msg-text span").eq(1).text(Number(giftNum[5]) - Number(cjStatus[0]));
        }
        $(".qqcard").show();
    }
    if (isWeiXin()) {
        //wx
        if (cjStatus[1] >= 0) {
            $(".gj-msg-text span").eq(0).text(giftNum[5]);
            $(".gj-msg-text span").eq(1).text(Number(giftNum[5]) - Number(cjStatus[1]));
        }
        $(".wxcard").show();
    }

    //invit
    $(".fc").text(friendStatus[0]);
    $(".fu").text(friendStatus[1]);
    $(".fh").text((friendStatus[0] - friendStatus[1]) > 0 ? (friendStatus[0] - friendStatus[1]) : 0);

    if ((friendStatus[0] - friendStatus[1]) > 0){
        $(".get-invit-btn").removeClass("filter");
    }else{
        $(".get-invit-btn").addClass("filter");
    }

}

//��¼����
function oneShare(typename) {
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            amsCfg_689931.sData = sData;
            amsCfg_689931.sData.typeName = (typename == 1) ? 'index' : 'page';
            amsSubmit(321796, 689931);
        }, function () {
            TGDialogS('popLogin');
        });
    });
}

function shareFun(shareType) {
    var actName = "a20200628lightm";

    var title = '���µ�һ��������������';
    var desc = '�������µ�һ����<��ȸ��>���ٷְ���ȡ������������ս��';
    var desc2 = '���µ�һ�����������������֪��';
    var img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_bw.jpg";

    //1share
    //2invit

    if (shareType == 1) {
        //Ĭ�ϣ���̬��ȥ
        shareURL = homePage;
    } else if (shareType == 2) {
        typeName = 2;
        if (player.inviteCodeToken == '' || player.inviteCode == '') {
            $("#popTips .pop-msg-text").text('������Ϣ�쳣����ˢ��ҳ��');
            TGDialogS('popTips');
            return;
        }
        //��������
        title = '���㣬��Ѷ�콢���ο�ԤԼ��';
        desc = '������������Ρ��������µ���ԤԼ�ѿ���������ԤԼ����ר����������Ƚ�פ�󽭺���';
        desc2 = '���㣬��Ѷ�콢���ο�ԤԼ��';
        img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_yuyue.jpg";

        if (isQQ()) {
            shareURL = pageUrl + '?shareCode=' + player.inviteCode + '&shareToken=' + player.inviteCodeToken;
        } else if (isWeiXin()) {
            shareURL = pageUrl + '?shareCode=' + player.inviteCode + '&shareToken=' + player.inviteCodeToken;
        }
    }

    if (shareType !== undefined) {
        TGDialogS('popShare');
    }

    console.log(shareURL);

    if (isWeiXin()) {
        //΢�ŷ���
        need("biz.wxclient", function (WXClient) {
            //΢�ſͻ���ʼ���ɹ��󣬷���wx����
            WXClient.init({"sAppId": "wx36896ec6df7cd95e"}, function (wx) {
                //�����õ���Ϣ����
                var shareObj = {
                    title: title,
                    desc: desc,
                    link: shareURL,
                    imgUrl: img,
                    actName: actName,//���������
                    success: function (sres) {
                        oneShare(typeName);
                    },
                    cancel: function (sres) {
                    }
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
        mqq.ui.setOnShareHandler(function (type) {
            if (type == 0) {
                oneShare(typeName);
            }
            switch (type + '') {
                case '0': /*QQ����*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.qqShareLink,
                        image_url: shareObjTM.img_url
                    }, function (result) {
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
                    }, function (result) {
                        oneShare(typeName);
                    });
                    break;
                case '2':	/*΢�ź���*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,	//����һ�㶼�ǿ�����ȥ΢�ŵ�¼̬������
                        image_url: shareObjTM.img_url
                    }, function (result) {
                        oneShare(typeName);
                    });
                    break;
                case '3': /*΢������Ȧ*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,   //����һ�㶼�ǿ�����ȥ΢�ŵ�¼̬������
                        image_url: shareObjTM.img_url
                    }, function (result) {
                        oneShare(typeName);
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

    //���
    $(".btn-start-gj,.cxgj-btn").on("click", function () {
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function (userinfo) {
                if (isQQ()) {
                    amsCfg_689261.sData = sData;
                    amsSubmit(321796, 689261);
                } else {
                    amsCfg_689946.sData = sData;
                    amsSubmit(321796, 689946);
                }
            }, function () {
                TGDialogS('popLogin');
            });
        });
    });

    //�н��б�
    $(".look-zjmsg-btn").on('click', function () {
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function (userinfo) {
                if (isQQ()) {
                    amsCfg_690758.sData = sData;
                    amsSubmit(321796, 690758);
                } else {
                    amsCfg_690759.sData = sData;
                    amsSubmit(321796, 690759);
                }
            }, function () {
                TGDialogS('popLogin');
            });
        });
    });


    //��¼
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
                        if (player.nickName == '') {
                            player.nickName = '����'
                        }

                        if (wxuser.headimgurl != '') {
                            player.selfPic = decodeURIComponent(wxuser.headimgurl) + '/96';
                        } else {
                            player.selfPic = decodeURIComponent('https://game.gtimg.cn/images/mxdl/cp/a20200605answer/wxIcon.png'); //
                        }

                        sData.nickName = player.nickName;
                        sData.sHeadImg = player.selfPic;
                        $("#unlogin").hide();
                        $("#logined").show();
                        $("#userinfo").text(player.nickName);
                        $(".pt_logo").addClass('wxlogo')
                        $(".banner-wrap").hide();
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
                    sData.nickName = player.nickName;
                    sData.sHeadImg = player.selfPic;
                    $("#unlogin").hide();
                    $("#logined").show();
                    $("#userinfo").text(player.nickName);
                    $(".pt_logo").addClass('qqlogo')
                }

                amsCfg_690213.sData = sData; //order For ams
                amsCfg_689267.sData = sData;
                amsCfg_689267.sData.page = "index";
                amsSubmit(321796, 689267);//init
            }
        }, function () {
            if (isWeiXin()) {
                LoginManager.loginByWX({
                    redirect_wx_url: window.location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(WXactivityUrl)//�ص�url
                });
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

//initM
amsCfg_689267 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 689267, //����id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            initData = res
            friendStatus[1] = parseInt(res.sOutValue7);//���뽱��ʹ�ô���
            giftNum = res.sOutValue8.split('|'); //card
            orderStatus = res.sOutValue6.split('|'); //order
            shareStatus = res.sOutValue5.split('|'); //share
            cjStatus = res.sOutValue4.split('|'); //share
            initPage();
        } else {
            alert('ϵͳ��æ����ˢ��ҳ��');
        }
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

//wxƽ̨ԤԼ
amsCfg_690280 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 690280, //����id
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//�ֻ�����
        'sPlatId': ''	//ƽ̨
    },
    "fFlowSubmitEnd": function (res) {
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//�����б���ʾ
function _orderFriends(friendList) {
    friendStatus[0] = friendList['cnt'];
    initPage();
    var fh = '';
    for (var i in friendList['list']) {
        fh += '<li class="friends-item">\n' +
            '                <img src="' + friendList['list'][i].imgUrl + '" alt="ͷ��">\n' +
            '            </li>'
    }
    fh += '<li class="friends-item" onclick="shareFun(2)">\n' +
        '                <img src="//game.gtimg.cn/images/ty/cp/a20200707czkql/avatar_add.png" alt="ͷ��">\n' +
        '            </li>'
    $(".friends-list").html(fh);
}

//��ѯamsԤԼ��Ϣ
amsCfg_690213 = {
    'iActivityId': '321796',  // AMS���
    'activityId': '10695', 			// ģ��ʵ����
    'iFlowId': '690213',
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//�ֻ�����
        'sPlatId': ''	//ƽ̨
    },
    "fFlowSubmitEnd": function (res) {
        //ame���ص���0�Ǻ��ߵ�����
        if (res.iRet == 0) {

            if (res.jData.rsvtStatus != '1') {
                //1���Ѽ�¼ԤԼ��Ϣ

                amsCfg_690214.sData = sData;
                amsCfg_690214.sData.sArea = sArea;
                amsCfg_690214.sData.sPlatId = sPlatId;
                amsCfg_690214.sData.iDevice = "1";
                amsCfg_690214.sData.iChanel = "1";

                var name = player.nickName;
                name = milo.xss.filterWxNickName(name);
                name = name.replace(/<span.*?><\/span>/g, '');
                amsCfg_690214.sData.extend3 = name;
                var alertUrls = ['qq.com','qlogo.cn','qpic.cn','gtimg.cn'];
                if(String(player.selfPic).indexOf(alertUrls[0]) >= 0 || String(player.selfPic).indexOf(alertUrls[1]) >= 0 || String(player.selfPic).indexOf(alertUrls[2]) >= 0 || String(player.selfPic).indexOf(alertUrls[3]) >= 0){
                    amsCfg_690214.sData.extend2 = player.selfPic;
                }
                //amsCfg_690214.sData.extend2 = player.selfPic;
                //amsCfg_690214.sData.extend3 = player.nickName;
                //amsCfg_690214.sData.sInviteCode="hMgDEN"
                amsSubmit(321796, 690214);

            } else {
                //��ԤԼ
                player.inviteCode = res.jData.invtCode;
                player.inviteCodeToken = res.jData.invtCodeToken;
                nextPage = true;
                $(".part-1 .start-btn").trigger("click");
                if (res.jData.friends.cnt > 0) {
                    _orderFriends(res.jData.friends);
                }
            }
        }
        return;
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//amsԤԼ
amsCfg_690214 = {
    'iActivityId': '321796',  // AMS���
    'activityId': '10695', 			// ģ��ʵ����
    'iFlowId': '690214',
    'sNeedSubmitPopDiv': true,
    /*'sData':{
        'sArea':'', 	//�ֻ�����
        'sPlatId':''	//ƽ̨
    },*/
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            if (res.jData.inviteCode != '') {
                player.inviteCode = res.jData.inviteCode
                player.inviteCodeToken = res.jData.inviteCodeToken
                nextPage = true;
                $(".part-1 .start-btn").trigger("click");
            }
            console.log(res);
        }
    },
    "fFlowSubmitFailed": function (res) {
        alert(res.sMsg);
    }
};

//��ɷ�������
amsCfg_689931 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 689931, //����id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            shareStatus[0] = 1;
            initPage();
        }
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//ԤԼ���
amsCfg_689938 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 689938, //����id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            var html = '��ϲ����:';
            for (var i in res.jData.data) {
                html += giftInfo[res.jData.data[i].card] + 'x' + res.jData.data[i].num + '<br/>';
                giftNum[res.jData.data[i].card] = parseInt(giftNum[res.jData.data[i].card]) + parseInt(res.jData.data[i].num);
            }
            orderStatus[1] = 1;
            initPage();
            $("#popTips .pop-msg-text").html(html);
            TGDialogS('popTips');
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

//�������
amsCfg_689934 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 689934, //����id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            var html = '��ϲ����:';
            for (var i in res.jData.data) {
                html += giftInfo[res.jData.data[i].card] + 'x' + res.jData.data[i].num + '<br/>';
                giftNum[res.jData.data[i].card] = parseInt(giftNum[res.jData.data[i].card]) + parseInt(res.jData.data[i].num);
            }
            shareStatus = [1, 1];
            initPage();
            $("#popTips .pop-msg-text").html(html);
            TGDialogS('popTips');
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

//�������
amsCfg_689937 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 689937, //����id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            var html = '��ϲ����:';
            for (var i in res.jData.data) {
                html += giftInfo[res.jData.data[i].card] + 'x' + res.jData.data[i].num + '<br/>';
                giftNum[res.jData.data[i].card] = parseInt(giftNum[res.jData.data[i].card]) + parseInt(res.jData.data[i].num);
            }
            friendStatus[1] += 1;
            initPage();
            $("#popTips .pop-msg-text").html(html);
            TGDialogS('popTips');
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

//�ϳɿ�Ƭ
amsCfg_689932 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 689932, //����id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {

            $(".part-2 .bw-wrap").addClass('active');
            var $btn = $(".part-2 .btn-container");
            $btn.animate({
                "margin-top": '.5rem',
                "opacity": 0
            }, 800, function () {
                $btn.addClass("hc");
                $(".hccg-tips-text").delay(1000).fadeIn();
                $btn.delay(1500).animate({
                    "margin-top": 0,
                    "opacity": 1
                }, 400);
            });

            giftNum[5] = parseInt(giftNum[5]) + 1;
            giftNum[4] = parseInt(giftNum[4]) - 1;
            giftNum[3] = parseInt(giftNum[3]) - 1;
            giftNum[2] = parseInt(giftNum[2]) - 1;
            giftNum[1] = parseInt(giftNum[1]) - 1;
            initPage();
        } else {
            $("#popTips .pop-msg-text").text(res.sMsg);
            TGDialogS('popTips');
        }
    },
    "fFlowSubmitFailed": function (res) {
        $("#popTips .pop-msg-text").text(res.sMsg);
        TGDialogS('popTips');
    }
};

//ԤԼ����
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
        //ame���ص���0�Ǻ��ߵ�����
        if (res.iRet == 0) {
            $("#popTips .pop-msg-text").text('ԤԼ�ɹ�');
            TGDialogS('popTips');
            orderStatus[0] = 1;
            initPage();
            //////////////////////////////ԤԼ��ʼ
            if (isQQ()) {
                // ��ѯƽ̨ԤԼ
                orderGameCenter({
                    appid: "1105636778", //ԤԼ��Ϸ��appid
                    jsonid: '888888',    //��ĿID��������Դ����ͬҵ��ID��ͬ����Դ��jsonid��δ���������ĵ�4���֣�295725
                    callback: function (json) {
                        var ret = json.data.key.retBody.result;//���෵���뺬������ĵ�3����
                        if (ret == '0') {
                            amsCfg_691287.sData = sData;
                            amsSubmit(321796, 691287);
                        } else if (ret == '1995001') {
                        }
                    }
                });
            } else {
                amsCfg_690280.sData = sData;
                amsCfg_690280.sData.device = isIos() ? '1' : (isAndroid() ? '2' : '');
                amsCfg_690280.sData.appid = 'wxd9e0d500b5fb209f';
                amsCfg_690280.sData.sServiceType = 'ty';
                amsCfg_690280.sData.access_token = milo.cookie.get("access_token");
                amsSubmit(321796, 690280);//wxOrder
            }
            //////////////////////////////ԤԼ����

        } else {
            $("#popTips .pop-msg-text").text(res.sMsg);
            TGDialogS('popTips');
        }
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

// qq�齱
amsCfg_689261 = {
    'iAMSActivityId': '321796', // AMS���
    'activityId': '356541', // ģ��ʵ����
    'sNeedSubmitPopDiv': true,

    //��ѡ��չ����sData��
    /**
     "sData":{
			"sPlatId":1,
			"sArea":4,
			"appid":"100584625",
			"sServiceType":"pao"
			},
     **/

    'onBeginGetGiftEvent': function () {
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
        $("#popTips .pop-msg-text").text(callbackObj.sMsg);
        TGDialogS('popTips');
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
        if (!callbackObj.sPackageName) {
            $("#popTips .pop-msg-text").text(callbackObj.sMsg);
            TGDialogS('popTips');
            return;
        }
        //���ؿ�
        $(".btn-start-gj").parent().hide();
        cjStatus[0] = Number(cjStatus[0]) + 1;
        cjStatus[1] = Number(cjStatus[1]) + 1;
        initPage();


        ctrlJs.methods.initEraser(); //�ҶȲ�
        $(".prize-img img").attr('src', ""); //��ƷͼƬ
        $(".prize-msg").html(""); //��Ʒ����
        ctrlJs.data.prizeResult = "";

        if (callbackObj.iPackageId > 0 && callbackObj.sPackageName != '') {

            if (realPrize.indexOf(callbackObj.iPackageId) >= 0) {
                //ȷ������д��ַ
                $("#popGj a").eq(0).hide();
                $("#popGj a").eq(1).show();
            } else {
                $("#popGj a").eq(0).show();
                $("#popGj a").eq(1).hide();
            }

            for (var i in ctrlJs.data.prizeListQQ) {
                var _prize = ctrlJs.data.prizeListQQ[i];
                if (_prize.pid == callbackObj.iPackageId) {
                    $(".prize-img img").attr('src', _prize.imgSrc); //��ƷͼƬ
                    $(".prize-msg").html(callbackObj.sPackageName); //��Ʒ����
                    ctrlJs.data.prizeResult = callbackObj.iPackageId + '|' + callbackObj.sPackageName;
                }
            }
        }
        return;

        //1��ʵ��
        var str = "��ϲ������� " + callbackObj.sPackageName + " !";
        if (false && (callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1) {
            str += "����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����";
            LotteryManager.alert(str);
            return;
        }
        //2��cdkey
        if (false && callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey) {
        }
        str += "����ע����գ�";

    }
};

// wx�齱
amsCfg_689946 = {
    'iAMSActivityId': '321796', // AMS���
    'activityId': '356316', // ģ��ʵ����

    //��ѡ��չ����sData��
    /**
     "sData":{
			"sPlatId":1,
			"sArea":4,
			"appid":"100584625",
			"sServiceType":"pao"
			},
     **/

    'onBeginGetGiftEvent': function () {
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
        $("#popTips .pop-msg-text").text(callbackObj.sMsg);
        TGDialogS('popTips');
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
        if (!callbackObj.sPackageName) {
            $("#popTips .pop-msg-text").text(callbackObj.sMsg);
            TGDialogS('popTips');
            return;
        }
        //���ؿ�
        $(".btn-start-gj").parent().hide();
        cjStatus[0] = Number(cjStatus[0]) + 1;
        cjStatus[1] = Number(cjStatus[1]) + 1;
        initPage();
        ctrlJs.methods.initEraser(); //�ҶȲ�
        $(".prize-img img").attr('src', ""); //��ƷͼƬ
        $(".prize-msg").html(""); //��Ʒ����
        ctrlJs.data.prizeResult = "";
        if (callbackObj.iPackageId > 0 && callbackObj.sPackageName != '') {

            if (realPrize.indexOf(callbackObj.iPackageId) >= 0) {
                //ȷ������д��ַ
                $("#popGj a").eq(0).hide();
                $("#popGj a").eq(1).show();
            } else {
                $("#popGj a").eq(0).show();
                $("#popGj a").eq(1).hide();
            }

            for (var i in ctrlJs.data.prizeListWX) {
                var _prize = ctrlJs.data.prizeListWX[i];
                if (_prize.pid == callbackObj.iPackageId) {
                    $(".prize-img img").attr('src', _prize.imgSrc); //��ƷͼƬ
                    $(".prize-msg").html(callbackObj.sPackageName); //��Ʒ����
                    ctrlJs.data.prizeResult = callbackObj.iPackageId + '|' + callbackObj.sPackageName;
                }
            }
        }
        return;

        //1��ʵ��
        var str = "��ϲ������� " + callbackObj.sPackageName + " !";
        if ((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1) {
            /*
             * 0��������Ϸ��Ʒ
             * 1��ʵ����Ʒ����Ҫ��д�����ջ���Ϣ
             * 2��cdkey
             */
            str += "����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����";
            LotteryManager.alert(str);
            return;
        }
        //2��cdkey
        if (callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey) {

            LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
            //LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
            return;
        }
        str += "����ע����գ�";
        LotteryManager.alert(str);
        return;
    }
};

//�н�Q
amsCfg_690758 = {
    'iAMSActivityId': '321796', // AMS���
    'iLotteryFlowId': '690758', //  ��ѯ���ֲ������̺�
    'activityId': '356541', // ģ��ʵ����
    'isForce': true, //false Ĭ��ǰ���л����¼�������Ҫÿ�ζ�ȥ��̨��ѯ�����Ϊtrue,
    'pageSize': 20,
    'getData': function (list, allData) {
        var html = ''
        for (var i in list) {
            var prize = list[i];
            var status = '�ѵ���';

            if (realPrize.indexOf(prize.iPackageId) >= 0) {
                status = '<a href="javascript: addMyinfo(\'' + prize.iPackageId + '|' + prize.sPackageName + '\');">��д�ռ���Ϣ</a>';
            }
            html += '<tr>\n' +
                '                    <td>' + (Number(i) + 1) + '</td>\n' +
                '                    <td>' + (prize.dtGetPackageTime.substr(0, 10)) + '</td>\n' +
                '                    <td>' + prize.sPackageName + '</td>\n' +
                '                    <td>' + status + '</td>\n' +
                '                </tr>';
        }
        $(".prize-table").html(html);
        TGDialogS('popPrizeMsg');
        //list����������
        //allData����������������������ݺ͵�ǰ�ڼ�ҳ�ܹ�ҳ��
        // getData���Զ��崦�����������getData��������������ݽ���������ֱ�ӷ��ظ��˺���
        // ������Լ��Է�����������������Ҫ��getData�������

    }
};

//�н�wx
amsCfg_690759 = {
    'iAMSActivityId': '321796', // AMS���
    'iLotteryFlowId': '690759', //  ��ѯ���ֲ������̺�
    'activityId': '356316', // ģ��ʵ����
    'isForce': true, //false Ĭ��ǰ���л����¼�������Ҫÿ�ζ�ȥ��̨��ѯ�����Ϊtrue,
    'pageSize': 20,
    'getData': function (list, allData) {
        var html = ''
        for (var i in list) {
            var prize = list[i];
            var status = '�ѵ���';

            if (realPrize.indexOf(prize.iPackageId) >= 0) {
                status = '<a href="javascript: addMyinfo(\'' + prize.iPackageId + '|' + prize.sPackageName + '\');">��д�ռ���Ϣ</a>';
            }
            html += '<tr>\n' +
                '                    <td>' + (Number(i) + 1) + '</td>\n' +
                '                    <td>' + (prize.dtGetPackageTime.substr(0, 10)) + '</td>\n' +
                '                    <td>' + prize.sPackageName + '</td>\n' +
                '                    <td>' + status + '</td>\n' +
                '                </tr>';
        }
        $(".prize-table").html(html);
        TGDialogS('popPrizeMsg');
        //list����������
        //allData����������������������ݺ͵�ǰ�ڼ�ҳ�ܹ�ҳ��
        // getData���Զ��崦�����������getData��������������ݽ���������ֱ�ӷ��ظ��˺���
        // ������Լ��Է�����������������Ҫ��getData�������

    }
};

//��д�н���Ϣ
function addMyinfo(info) {
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            if (isQQ()) {
                amsCfg_690764.sData = sData;
                amsCfg_690764.sData.iShow = 1;
                amsSubmit(321796, 690764);
                TGDialogS('popSite')
            } else {
                amsCfg_691146.sData = sData;
                amsCfg_691146.sData.iShow = 1;
                amsSubmit(321796, 691146);
                TGDialogS('popSite')
            }
        }, function () {
            TGDialogS('popLogin');
        });
    });
}

//��д�н���Ϣqq
amsCfg_i = {
    'iActivityId': '321796', // AMS���
    'iFlowId': '690764', // ���̺�
    '_everyRead': true,
    "sData": {},
    'success': function (res) { //�ύ�ɹ��Ļص�
        if (typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            //�ύ��ť�¼�
            g('personInfoContentBtn_690764').onclick = function () {
                var fillData = FormManager.getAllInputValue('form_personInfo_690764');
                console.log(fillData);
                var telNum = $("#telNum").val();
                var addname = $("#addname").val();
                var address = $("#address").val();
                var giftInfo = $("#package_690764").val();
                if (!telNum || isNaN(telNum) || telNum.indexOf('.') >= 0 || telNum.length > 11) {
                    alert("��������ȷ���ֻ�����");
                    return false;
                }
                if (!addname || milo.getByteLength(addname) > 30) {
                    alert("��������ȷ������");
                    return false;
                }
                if (!address || milo.getByteLength(address) > 100) {
                    alert("��ϸ��ַ����Ϊ�ջ��߳���100����");
                    return false;
                }
                amsCfg_690764.sData = sData;
                amsCfg_690764.sData.sPackageInfo = giftInfo;
                amsCfg_690764.sData.iShow = 0;
                amsCfg_690764.sData.sName = addname;
                amsCfg_690764.sData.sMobile = telNum;
                amsCfg_690764.sData.sAddress = address;
                amsSubmit(321796, 690764);
            }

            FormManager.setAllInputValue(res.jData, 'form_personInfo_690764');

            if (typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
                for (var i = 0; i < res.jData.arrPackageInfo.length; ++i) {
                    var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                    var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                    g('package_690764').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
                }
            }

        } else {
            $("#popTips .pop-msg-text").text(res.sMsg);
            TGDialogS('popTips');
        }
    },
    'fail': function (res) {
        alert(res.sMsg);
    }, //ʧ�ܵĻص�,
};

//��д�н���Ϣwx
amsCfg_691146 = {
    'iActivityId': '321796', // AMS���
    'iFlowId': '691146', // ���̺�
    '_everyRead': true,
    "sData": {},
    'success': function (res) { //�ύ�ɹ��Ļص�
        if (typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            //�ύ��ť�¼�
            g('personInfoContentBtn_690764').onclick = function () {
                var fillData = FormManager.getAllInputValue('form_personInfo_690764');
                console.log(fillData);
                var telNum = $("#telNum").val();
                var addname = $("#addname").val();
                var address = $("#address").val();
                var giftInfo = $("#package_690764").val();
                if (!telNum || isNaN(telNum) || telNum.indexOf('.') >= 0 || telNum.length > 11) {
                    alert("��������ȷ���ֻ�����");
                    return false;
                }
                if (!addname || milo.getByteLength(addname) > 30) {
                    alert("��������ȷ������");
                    return false;
                }
                if (!address || milo.getByteLength(address) > 100) {
                    alert("��ϸ��ַ����Ϊ�ջ��߳���100����");
                    return false;
                }
                amsCfg_691146.sData = sData;
                amsCfg_691146.sData.sPackageInfo = giftInfo;
                amsCfg_691146.sData.iShow = 0;
                amsCfg_691146.sData.sName = addname;
                amsCfg_691146.sData.sMobile = telNum;
                amsCfg_691146.sData.sAddress = address;
                amsSubmit(321796, 691146);
            }

            FormManager.setAllInputValue(res.jData, 'form_personInfo_690764');
            if (typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
                for (var i = 0; i < res.jData.arrPackageInfo.length; ++i) {
                    var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                    var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                    g('package_690764').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
                }
            }
        } else {
            $("#popTips .pop-msg-text").text(res.sMsg);
            TGDialogS('popTips');
        }
    },
    'fail': function (res) {
        alert(res.sMsg);
    }, //ʧ�ܵĻص�,
};

//ƽ̨ԤԼ���
amsCfg_691287 = {
    '_everyRead': true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 321796, //�id
    "iFlowId": 691287, //����id
    "fFlowSubmitEnd": function (res) {
    },
    "fFlowSubmitFailed": function (res) {
    }
};
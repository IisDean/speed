var ctrlJs = {
    data: {
        pageSwiper: null,// 页面Swiper
        pageIdx: 0,//当前页面序号
        navLeft: ['12.8%', '37%', '61%', '85%'],//游标状态
        client: $(document.body)[0].clientWidth,
        video: null,
        videoWidth: $("#videoWrap").width(),
        videoHeight: $("#videoWrap").height(),
        gjStatus: false,//默认为false， 等于true时表示当前可以刮奖
        prizeResult: '',//中奖结果
        prizeListQQ: [
            {
                pid: '2001431',
                name: '灵殊·幽帘疏芳（7天）',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_1.png'
            }, {
                pid: '2001428',
                name: '蓝色心法残页×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_2.png'
            }, {
                pid: '2001427',
                name: '泉沏龙井×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_3.png'
            }, {
                pid: '2001426',
                name: '私藏特产×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_4.png'
            }, {
                pid: '2001424',
                name: '帮派功勋令×2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_5.png'
            }, {
                pid: '2001436',
                name: '天刀人物印象挂画×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_6.png'
            }, {
                pid: '2001433',
                name: '五周年大礼盒×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_7.png'
            }, {
                pid: '2001435',
                name: '天下盟会手账本×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_8.png'
            }, {
                pid: '2001430',
                name: '侠影研习录·三×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_9.png'
            }, {
                pid: '2001429',
                name: '侠影研习录·二×2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_10.png'
            }, {
                pid: '2001423',
                name: '一级霜铁×5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_11.png'
            }, {
                pid: '2001422',
                name: '一级金丝×5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_12.png'
            }, {
                pid: '2001420',
                name: '侠影研习录·一×5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_13.png'
            }, {
                pid: '2001419',
                name: '铸神令×2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_14.png'
            }, {
                pid: '2001409',
                name: '红尘宝匣×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_15.png'
            }, {
                pid: '2001418',
                name: '绑点×20',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_16.png'
            }, {
                pid: '2001432',
                name: '碎银×20000',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_17.png'
            }
        ],
        prizeListWX: [
            {
                pid: '1999914',
                name: '灵殊·幽帘疏芳（7天）',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_1.png'
            }, {
                pid: '1999911',
                name: '蓝色心法残页×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_2.png'
            }, {
                pid: '1999910',
                name: '泉沏龙井×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_3.png'
            }, {
                pid: '1999909',
                name: '私藏特产×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_4.png'
            }, {
                pid: '1999908',
                name: '帮派功勋令×2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_5.png'
            }, {
                pid: '1999918',
                name: '天刀人物印象挂画×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_6.png'
            }, {
                pid: '1999916',
                name: '五周年大礼盒×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_7.png'
            }, {
                pid: '1999917',
                name: '天下盟会手账本×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_8.png'
            }, {
                pid: '1999913',
                name: '侠影研习录·三×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_9.png'
            }, {
                pid: '1999912',
                name: '侠影研习录·二×2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_10.png'
            }, {
                pid: '1999906',
                name: '一级霜铁×5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_11.png'
            }, {
                pid: '1999905',
                name: '一级金丝×5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_12.png'
            }, {
                pid: '1999904',
                name: '侠影研习录·一×5',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_13.png'
            }, {
                pid: '1999903',
                name: '铸神令×2',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_14.png'
            }, {
                pid: '1999901',
                name: '红尘宝匣×1',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_15.png'
            }, {
                pid: '1999902',
                name: '绑点×20',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_16.png'
            }, {
                pid: '1999915',
                name: '碎银×20000',
                imgSrc: '//game.gtimg.cn/images/ty/cp/a20200707czkql/gj_17.png'
            }
        ]
    },
    methods: {
        initShare: function (type) {//配置分享参数
        },
        cutPage: function (idx) {//切换页面
            ctrlJs.data.pageSwiper.slideTo(idx - 1);
            ctrlJs.methods.moveCursor(idx);
        },
        moveCursor: function (idx) {//移动导航游标
            $(".nav-list li").removeClass("active").eq(idx).addClass('active');
            $(".nav-cursor").animate({"left": ctrlJs.data.navLeft[idx]}, 300);
        },
        initEraser: function () {//刮奖初始化
            if (ctrlJs.data.gjStatus) return false;
            ctrlJs.data.gjStatus = true;
            //var idx = ctrlJs.methods.getRandom(0, ctrlJs.data.prizeList.length);
            $(".cxgj-btn").hide();
            var gjImg = new Image();
            gjImg.src = '//game.gtimg.cn/images/ty/cp/a20200707czkql/p4_gj.jpg';
            $(".gj-wrap").html(gjImg);
            gjImg.onload = function () {
                $(gjImg).eraser({
                    size: 20, //设置橡皮擦大小
                    completeRatio: .6, //设置擦除面积比例
                    completeFunction: ctrlJs.methods.showResetButton   //大于擦除面积比例触发函数
                });
                // 设置奖品信息
                // 奖品图片地址 共计17个奖品,奖品列表在ctrlJs.data.prizeList
                // $(".prize-img img").attr('src', ctrlJs.data.prizeList[idx].imgSrc); //奖品图片
                // $(".prize-msg").html(ctrlJs.data.prizeList[idx].name); //奖品名称
                // ctrlJs.data.prizeResult = ctrlJs.data.prizeList[idx].name;


            }
        },
        showResetButton: function () {//刮奖结果
            TGDialogS('popGj');
            ctrlJs.data.gjStatus = false;
            $(".cxgj-btn").show();
            ctrlJs.data.pageSwiper.unlockSwipes();
        },
        initSwiper: function () {// 页面Swiper
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
        backHome: function () {//回到首页
            $(".swiper-container .wrap").fadeOut(300);
            setTimeout(function () {
                $(".part-1 .wrap").show();
                $(".part-1").show();
            }, 600);
        },
        playVideo: function (vid) {//播放视频
            TGDialogS("popVideo");
            ctrlJs.data.video = new Txplayer({
                containerId: 'videoWrap',
                vid: vid,
                width: ctrlJs.data.videoWidth,
                height: ctrlJs.data.videoHeight,
                autoplay: true
            });
        },
        pauseVideo: function () {//关闭视频
            closeDialog();
            $("#videoWrap").empty();
        },
        getRandom: function (min, max) {//获取随机数
            return Math.floor(Math.random() * (max - min) + min);
        }
    },
    init: function (callback) {
        var that = this;
        //点击弹窗空白处关闭
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
var sPlatId = isIos() ? '0' : (isAndroid() ? '1' : '');//系统
var sArea = isQQ() ? '2' : (isWeiXin() ? '1' : '');//平台
window.ams_login_avoid_conflict = true;		//防止串号的全局变量
var appid = "1105636778";//游戏-QQ的appid
var player = {isBind: false, inviteCode: '', inviteCodeToken: '', shareType: 1}; //玩家基础信息
var initData = {friendUsed: 0, sOutValue2: ''};//初始化信息
var sData = {};
var giftInfo = ['', '孔雀翎图谱上', '孔雀翎图谱下', '天外陨铁', '铸神残篇'];
var giftNum = [0, 0, 0, 0, 0, 0];
var orderStatus = [0, 0];//任务，使用
var shareStatus = [0, 0];//任务，使用
var cjStatus = [0, 0];//qq,wx
var friendStatus = [0, 0]; //总数 使用
var realPrize = ['2001433', '2001435', '2001436', '1999916', '1999917', '1999918'];
var typeName = 1; //分享类型
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
    // 判断是否是IOSQQ 或者 AndroidQQ打开
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

//预约标记
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

//抽奖
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

//按钮处理
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

//弹窗用的填地址
function writeAddress() {
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            addMyinfo(ctrlJs.data.prizeResult);
        }, function () {
            TGDialogS('popLogin');
        });
    });
}

//渲染页面状态
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
        $(".ljfx-gift1").removeClass("filter"); //领奖按钮
    }else{
        $(".ljfx-gift1").addClass("filter");//领奖按钮
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

//记录分享
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

    var title = '天下第一暗器即将面世！';
    var desc = '重铸天下第一暗器<孔雀翎>，百分百领取奖励，快来挑战。';
    var desc2 = '天下第一暗器即将面世！你可知？';
    var img = location.protocol + "//game.gtimg.cn/images/ty/cp/a20200707czkql/share_bw.jpg";

    //1share
    //2invit

    if (shareType == 1) {
        //默认，主态出去
        shareURL = homePage;
    } else if (shareType == 2) {
        typeName = 2;
        if (player.inviteCodeToken == '' || player.inviteCode == '') {
            $("#popTips .pop-msg-text").text('配置信息异常，请刷新页面');
            TGDialogS('popTips');
            return;
        }
        //邀请任务
        title = '真香，腾讯旗舰手游开预约！';
        desc = '国风大世界手游《天涯明月刀》预约已开启，邀你预约立领专属礼包，抢先进驻大江湖。';
        desc2 = '真香，腾讯旗舰手游开预约！';
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
        //微信分享
        need("biz.wxclient", function (WXClient) {
            //微信客户初始化成功后，返回wx对象
            WXClient.init({"sAppId": "wx36896ec6df7cd95e"}, function (wx) {
                //分享用的信息对象
                var shareObj = {
                    title: title,
                    desc: desc,
                    link: shareURL,
                    imgUrl: img,
                    actName: actName,//点击流命名
                    success: function (sres) {
                        oneShare(typeName);
                    },
                    cancel: function (sres) {
                    }
                }
                //为发送给好友、分享到朋友圈、分享到QQ、分享到微博同时绑定分享事件
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
                case '0': /*QQ好友*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.qqShareLink,
                        image_url: shareObjTM.img_url
                    }, function (result) {
                        //好友不会调
                        //oneShare();
                    });
                    break;
                case '1': /*QQ空间*/
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
                case '2':	/*微信好友*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,	//链接一般都是可以拉去微信登录态的链接
                        image_url: shareObjTM.img_url
                    }, function (result) {
                        oneShare(typeName);
                    });
                    break;
                case '3': /*微信朋友圈*/
                    mqq.ui.shareMessage({
                        title: shareObjTM.title,
                        desc: shareObjTM.desc,
                        share_type: type,
                        share_url: shareObjTM.wxShareLink,   //链接一般都是可以拉去微信登录态的链接
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
    //预约游戏的appid
    var appid = args.appid;
    //项目ID，区分来源
    var jsonid = args.jsonid;
    //平台ID，区分安卓和IOS
    var platid = sPlatId;
    var g_tk = getToken();
    //拼接请求串，注意：tt字段的值必须整数不能用双引号括起来
    var orderUrl = location.protocol + '//info.gamecenter.qq.com/cgi-bin/gc_gameinfo_v2_fcgi?param={"key":{"param":{"tt":' + platid + ',"appid":"' + appid + '","source":"' + jsonid + '"},"module":"gc_gameinfo_v2","method":"subscribeUpcomingGameV2"}}&g_tk=' + g_tk;
    //发起请求
    requestAjax({
        url: orderUrl,
        callback: function (json) {
            cb && cb(json);//请求回调
        }
    });

    //获取Token
    function getToken() {
        for (var t = 5381, e = getCookie("skey") || "", i = 0, n = e.length; i < n; ++i)
            t += (t << 5) + e.charCodeAt(i);
        return 2147483647 & t
    }

    //获取cookie
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

    //AJAX请求
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
                    msg: "网络异常，请稍后再试！"
                });
            }
        });
    }
}

milo.ready(function () {
    shareFun();
    // 拉起微信
    $('.wxlogin').on('click', function () {
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            window.location.href = WXactivityUrl;
        } else {
            // openlinkhttps://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90233233&appid=wx7fa53c237760c335&url=https%3A%2F%2Fxylz.qq.com%2Fcp%2Fa20190929dema%2Findex_wq.html
            location.href = location.protocol + "//game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90247131&appid=wx39bde50a0857a5af&url=https%3A%2F%2Fd.qq.com%2Fcp%2Fa20200605answer%2Findex_wq.html";
        }
    });

    // 拉起手Q
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

    //抽大奖
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

    //中奖列表
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


    //登录
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userinfo) {
            var acctype = milo.cookie.get('acctype');
            //判断客户端与当前登录方式是否一致，不一致注销登录态信息，刷新页面
            if ((isWeiXin() && acctype != 'wx') || (isQQ() && acctype == 'wx')) {
                LoginManager.logout({
                    logoutCallback: function () {
                        location.reload(true);
                    }
                });
                return;
            } else {
                //如果登录态没有异常，走正常业务逻辑
                if (isWeiXin()) {
                    appid = 'wx1cd4fbe9335888fe';//腾讯游戏活动号appid
                    sData = {
                        "sArea": '1',
                        "sPlatId": sPlatId,
                        "ams_targetappid": 'wxd9e0d500b5fb209f'//游戏appid
                    };
                    LoginManager.getUserInfoByWxOpenId({
                        "openid": milo.cookie.get("openid"),
                        "access_token": milo.cookie.get("access_token")
                    }, function (wxuser) {
                        //获取登登录头像
                        player.nickName = milo.xss.filterWxNickName(wxuser.nickname);
                        player.nickName = player.nickName.replace(/<span.*?><\/span>/g, '');
                        if (player.nickName == '') {
                            player.nickName = '匿名'
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
                    redirect_wx_url: window.location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(WXactivityUrl)//回调url
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
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 689267, //流程id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            initData = res
            friendStatus[1] = parseInt(res.sOutValue7);//邀请奖励使用次数
            giftNum = res.sOutValue8.split('|'); //card
            orderStatus = res.sOutValue6.split('|'); //order
            shareStatus = res.sOutValue5.split('|'); //share
            cjStatus = res.sOutValue4.split('|'); //share
            initPage();
        } else {
            alert('系统繁忙，请刷新页面');
        }
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};

//wx平台预约
amsCfg_690280 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 690280, //流程id
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//手机号码
        'sPlatId': ''	//平台
    },
    "fFlowSubmitEnd": function (res) {
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//好友列表显示
function _orderFriends(friendList) {
    friendStatus[0] = friendList['cnt'];
    initPage();
    var fh = '';
    for (var i in friendList['list']) {
        fh += '<li class="friends-item">\n' +
            '                <img src="' + friendList['list'][i].imgUrl + '" alt="头像">\n' +
            '            </li>'
    }
    fh += '<li class="friends-item" onclick="shareFun(2)">\n' +
        '                <img src="//game.gtimg.cn/images/ty/cp/a20200707czkql/avatar_add.png" alt="头像">\n' +
        '            </li>'
    $(".friends-list").html(fh);
}

//查询ams预约信息
amsCfg_690213 = {
    'iActivityId': '321796',  // AMS活动号
    'activityId': '10695', 			// 模块实例号
    'iFlowId': '690213',
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//手机号码
        'sPlatId': ''	//平台
    },
    "fFlowSubmitEnd": function (res) {
        //ame返回等于0是后走到这里
        if (res.iRet == 0) {

            if (res.jData.rsvtStatus != '1') {
                //1是已记录预约信息

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
                //已预约
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

//ams预约
amsCfg_690214 = {
    'iActivityId': '321796',  // AMS活动号
    'activityId': '10695', 			// 模块实例号
    'iFlowId': '690214',
    'sNeedSubmitPopDiv': true,
    /*'sData':{
        'sArea':'', 	//手机号码
        'sPlatId':''	//平台
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

//完成分享任务
amsCfg_689931 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 689931, //流程id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            shareStatus[0] = 1;
            initPage();
        }
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//预约礼包
amsCfg_689938 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 689938, //流程id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            var html = '恭喜你获得:';
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

//分享礼包
amsCfg_689934 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 689934, //流程id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            var html = '恭喜你获得:';
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

//邀请礼包
amsCfg_689937 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 689937, //流程id
    "fFlowSubmitEnd": function (res) {
        if (res.iRet == 0) {
            var html = '恭喜你获得:';
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

//合成卡片
amsCfg_689932 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 689932, //流程id
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

//预约流程
amsCfg_690215 = {
    'iActivityId': '321796',  // AMS活动号
    'activityId': '10695', 			// 模块实例号
    'iFlowId': '690215',
    'sNeedSubmitPopDiv': true,
    'sData': {
        'sArea': '', 	//手机号码
        'sPlatId': ''	//平台
    },
    "fFlowSubmitEnd": function (res) {
        //ame返回等于0是后走到这里
        if (res.iRet == 0) {
            $("#popTips .pop-msg-text").text('预约成功');
            TGDialogS('popTips');
            orderStatus[0] = 1;
            initPage();
            //////////////////////////////预约开始
            if (isQQ()) {
                // 查询平台预约
                orderGameCenter({
                    appid: "1105636778", //预约游戏的appid
                    jsonid: '888888',    //项目ID，区分来源（不同业务ID不同，来源的jsonid如何创建？请参阅第4部分）295725
                    callback: function (json) {
                        var ret = json.data.key.retBody.result;//更多返回码含义请参阅第3部分
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
            //////////////////////////////预约结束

        } else {
            $("#popTips .pop-msg-text").text(res.sMsg);
            TGDialogS('popTips');
        }
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};

// qq抽奖
amsCfg_689261 = {
    'iAMSActivityId': '321796', // AMS活动号
    'activityId': '356541', // 模块实例号
    'sNeedSubmitPopDiv': true,

    //可选扩展参数sData，
    /**
     "sData":{
			"sPlatId":1,
			"sArea":4,
			"appid":"100584625",
			"sServiceType":"pao"
			},
     **/

    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        $("#popTips .pop-msg-text").text(callbackObj.sMsg);
        TGDialogS('popTips');
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        if (!callbackObj.sPackageName) {
            $("#popTips .pop-msg-text").text(callbackObj.sMsg);
            TGDialogS('popTips');
            return;
        }
        //隐藏框
        $(".btn-start-gj").parent().hide();
        cjStatus[0] = Number(cjStatus[0]) + 1;
        cjStatus[1] = Number(cjStatus[1]) + 1;
        initPage();


        ctrlJs.methods.initEraser(); //灰度层
        $(".prize-img img").attr('src', ""); //奖品图片
        $(".prize-msg").html(""); //奖品名称
        ctrlJs.data.prizeResult = "";

        if (callbackObj.iPackageId > 0 && callbackObj.sPackageName != '') {

            if (realPrize.indexOf(callbackObj.iPackageId) >= 0) {
                //确定还是写地址
                $("#popGj a").eq(0).hide();
                $("#popGj a").eq(1).show();
            } else {
                $("#popGj a").eq(0).show();
                $("#popGj a").eq(1).hide();
            }

            for (var i in ctrlJs.data.prizeListQQ) {
                var _prize = ctrlJs.data.prizeListQQ[i];
                if (_prize.pid == callbackObj.iPackageId) {
                    $(".prize-img img").attr('src', _prize.imgSrc); //奖品图片
                    $(".prize-msg").html(callbackObj.sPackageName); //奖品名称
                    ctrlJs.data.prizeResult = callbackObj.iPackageId + '|' + callbackObj.sPackageName;
                }
            }
        }
        return;

        //1：实物
        var str = "恭喜您获得了 " + callbackObj.sPackageName + " !";
        if (false && (callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1) {
            str += "请您准确填写个人信息，官方将有工作人员联系您。";
            LotteryManager.alert(str);
            return;
        }
        //2：cdkey
        if (false && callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey) {
        }
        str += "请您注意查收！";

    }
};

// wx抽奖
amsCfg_689946 = {
    'iAMSActivityId': '321796', // AMS活动号
    'activityId': '356316', // 模块实例号

    //可选扩展参数sData，
    /**
     "sData":{
			"sPlatId":1,
			"sArea":4,
			"appid":"100584625",
			"sServiceType":"pao"
			},
     **/

    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        $("#popTips .pop-msg-text").text(callbackObj.sMsg);
        TGDialogS('popTips');
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        if (!callbackObj.sPackageName) {
            $("#popTips .pop-msg-text").text(callbackObj.sMsg);
            TGDialogS('popTips');
            return;
        }
        //隐藏框
        $(".btn-start-gj").parent().hide();
        cjStatus[0] = Number(cjStatus[0]) + 1;
        cjStatus[1] = Number(cjStatus[1]) + 1;
        initPage();
        ctrlJs.methods.initEraser(); //灰度层
        $(".prize-img img").attr('src', ""); //奖品图片
        $(".prize-msg").html(""); //奖品名称
        ctrlJs.data.prizeResult = "";
        if (callbackObj.iPackageId > 0 && callbackObj.sPackageName != '') {

            if (realPrize.indexOf(callbackObj.iPackageId) >= 0) {
                //确定还是写地址
                $("#popGj a").eq(0).hide();
                $("#popGj a").eq(1).show();
            } else {
                $("#popGj a").eq(0).show();
                $("#popGj a").eq(1).hide();
            }

            for (var i in ctrlJs.data.prizeListWX) {
                var _prize = ctrlJs.data.prizeListWX[i];
                if (_prize.pid == callbackObj.iPackageId) {
                    $(".prize-img img").attr('src', _prize.imgSrc); //奖品图片
                    $(".prize-msg").html(callbackObj.sPackageName); //奖品名称
                    ctrlJs.data.prizeResult = callbackObj.iPackageId + '|' + callbackObj.sPackageName;
                }
            }
        }
        return;

        //1：实物
        var str = "恭喜您获得了 " + callbackObj.sPackageName + " !";
        if ((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1) {
            /*
             * 0：虚拟游戏物品
             * 1：实际物品，需要填写个人收货信息
             * 2：cdkey
             */
            str += "请您准确填写个人信息，官方将有工作人员联系您。";
            LotteryManager.alert(str);
            return;
        }
        //2：cdkey
        if (callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey) {

            LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
            //LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
            return;
        }
        str += "请您注意查收！";
        LotteryManager.alert(str);
        return;
    }
};

//中奖Q
amsCfg_690758 = {
    'iAMSActivityId': '321796', // AMS活动号
    'iLotteryFlowId': '690758', //  查询获奖轮播的流程号
    'activityId': '356541', // 模块实例号
    'isForce': true, //false 默认前端有缓存记录，如果需要每次都去后台查询，则改为true,
    'pageSize': 20,
    'getData': function (list, allData) {
        var html = ''
        for (var i in list) {
            var prize = list[i];
            var status = '已到账';

            if (realPrize.indexOf(prize.iPackageId) >= 0) {
                status = '<a href="javascript: addMyinfo(\'' + prize.iPackageId + '|' + prize.sPackageName + '\');">填写收件信息</a>';
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
        //list返回是数据
        //allData返回整个对象，里面包括数据和当前第几页总共页数
        // getData是自定义处理函数，如果传getData这个参数，获奖数据将不做处理，直接返回给此函数
        // 如果不自己对返回数据做处理，则不需要传getData这个参数

    }
};

//中奖wx
amsCfg_690759 = {
    'iAMSActivityId': '321796', // AMS活动号
    'iLotteryFlowId': '690759', //  查询获奖轮播的流程号
    'activityId': '356316', // 模块实例号
    'isForce': true, //false 默认前端有缓存记录，如果需要每次都去后台查询，则改为true,
    'pageSize': 20,
    'getData': function (list, allData) {
        var html = ''
        for (var i in list) {
            var prize = list[i];
            var status = '已到账';

            if (realPrize.indexOf(prize.iPackageId) >= 0) {
                status = '<a href="javascript: addMyinfo(\'' + prize.iPackageId + '|' + prize.sPackageName + '\');">填写收件信息</a>';
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
        //list返回是数据
        //allData返回整个对象，里面包括数据和当前第几页总共页数
        // getData是自定义处理函数，如果传getData这个参数，获奖数据将不做处理，直接返回给此函数
        // 如果不自己对返回数据做处理，则不需要传getData这个参数

    }
};

//填写中奖信息
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

//填写中奖信息qq
amsCfg_i = {
    'iActivityId': '321796', // AMS活动号
    'iFlowId': '690764', // 流程号
    '_everyRead': true,
    "sData": {},
    'success': function (res) { //提交成功的回调
        if (typeof res.jData == "object") { //返回已经提交的数据，填充页面
            //提交按钮事件
            g('personInfoContentBtn_690764').onclick = function () {
                var fillData = FormManager.getAllInputValue('form_personInfo_690764');
                console.log(fillData);
                var telNum = $("#telNum").val();
                var addname = $("#addname").val();
                var address = $("#address").val();
                var giftInfo = $("#package_690764").val();
                if (!telNum || isNaN(telNum) || telNum.indexOf('.') >= 0 || telNum.length > 11) {
                    alert("请输入正确的手机号码");
                    return false;
                }
                if (!addname || milo.getByteLength(addname) > 30) {
                    alert("请输入正确的姓名");
                    return false;
                }
                if (!address || milo.getByteLength(address) > 100) {
                    alert("详细地址不能为空或者超过100个字");
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

            if (typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //如果存在实物信息，则显示
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
    }, //失败的回调,
};

//填写中奖信息wx
amsCfg_691146 = {
    'iActivityId': '321796', // AMS活动号
    'iFlowId': '691146', // 流程号
    '_everyRead': true,
    "sData": {},
    'success': function (res) { //提交成功的回调
        if (typeof res.jData == "object") { //返回已经提交的数据，填充页面
            //提交按钮事件
            g('personInfoContentBtn_690764').onclick = function () {
                var fillData = FormManager.getAllInputValue('form_personInfo_690764');
                console.log(fillData);
                var telNum = $("#telNum").val();
                var addname = $("#addname").val();
                var address = $("#address").val();
                var giftInfo = $("#package_690764").val();
                if (!telNum || isNaN(telNum) || telNum.indexOf('.') >= 0 || telNum.length > 11) {
                    alert("请输入正确的手机号码");
                    return false;
                }
                if (!addname || milo.getByteLength(addname) > 30) {
                    alert("请输入正确的姓名");
                    return false;
                }
                if (!address || milo.getByteLength(address) > 100) {
                    alert("详细地址不能为空或者超过100个字");
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
            if (typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //如果存在实物信息，则显示
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
    }, //失败的回调,
};

//平台预约埋点
amsCfg_691287 = {
    '_everyRead': true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 321796, //活动id
    "iFlowId": 691287, //流程id
    "fFlowSubmitEnd": function (res) {
    },
    "fFlowSubmitFailed": function (res) {
    }
};
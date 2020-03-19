window.hasGift = 0;
milo.ready(function() {
    need("daoju.mo", function (mo) {
        window.alert = function (msg, callback) {
            mo.alert(msg, callback);
        };
        window.confirm = function (msg, callback) {
            mo.confirm(msg, callback);
        };
        mo.isH5 = location.hostname == "app.daoju.qq.com" ? true : false;
        mo({
            type: "pc,h5", //活动类型，pt登录"pc,h5"，openid登录"qq,wx"，手游内嵌活动"gamein"
            biz: "nba2kx", //业务
            iActivityId: "290791", //AMS活动号
            iQueryFlowId: "649402", //查询大区流程号632808
            iSubmitFlowId: "649401", //绑定大区流程号632807
            callback: function (bindedInfo, LoginManager) {
                //绑定大区成功
                //D.mo.bindInfo对应绑定区服信息
                //查询礼包领取情况
                enter(1);
            }
        });
        //mo.appid包含eas上报
        setTimeout(function () { //IE兼容问题
            mo.appid("nba2kx", "15034", function (_app_id) {
                if (_app_id != 1003 && _app_id != 1005) {
                    // window.alert = function(msg, callback) {
                    //     D.mo.alert(msg, callback);
                    // };
                    console.log(_app_id)
                    if (_app_id == 1101) {
                        need("daoju.ui.app", function (app) {
                            if (app.isApp()) {
                                $(".djc").show();
                            } else {
                                $(".djc").hide();
                            }
                        });
                    }
                }
            });
        });
    });
})
// 查询领取记录
function enter(a) {
    setTimeout(function () {
        //刷新积分操作
        amsSubmit(290791,649689)
    }, a || 2000);
}
//查询领取记录
amsCfg_649689 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 290791, //活动id
    "iFlowId":    649689, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        gift = res.sOutValue1.split(',')[0];
        hasBuy = parseInt(res.sOutValue3);
        if(gift != ''){
            amsCfg_648235.sData.buyId = allGoods[gift][0];
            window.hasGift = 1;
            window.giftId = gift;
            if(hasBuy == 0) {
                TGDialogS(allGoods[gift][1]);
            }

        }

        // getPackage = res.sOutValue1;
        packageNum = res.sOutValue2;//记录当时用户点了哪个箱子,设置为开启的状态
        $('.gift' + packageNum).addClass('active');
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};
//完成任务领取
amsCfg_649400 = {
    'iAMSActivityId' : '290791', // AMS活动号
    'activityId' : '333974', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        alert(callbackObj.sMsg);
    }
};
//开启幸运宝盒
amsCfg_648236 = {
    'iAMSActivityId' : '290791', // AMS活动号
    'activityId' : '333974', // 模块实例号
    'sData' : {
        'choseItem':''
    },
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        $(".gift" + this.sData.choseItem).addClass('active');
        amsCfg_648235.sData.buyId = allGoods[callbackObj.iPackageId][0];
        TGDialogS(allGoods[callbackObj.iPackageId][1]);
        //设定购买的sData.num
        // var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        // if(packageLen && packageLen.length > 1){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
        //
        // //1：实物
        // if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
        //     /*
        //      * 0：虚拟游戏物品
        //      * 1：实际物品，需要填写个人收货信息
        //      * 2：cdkey
        //      */
        //     LotteryManager.alert("恭喜您获得了 " + callbackObj.sPackageName + " ! 请您准确填写个人信息，官方将有工作人员联系您。");
        //     return;
        // }
        // //2：cdkey
        // if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
        //     // 新的处理
        //     if(callbackObj.sPackageCDkey){
        //         LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageCDkey + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'复制成功。\');">');
        //         return;
        //     }else{
        //         LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
        //         return;
        //     }
        //
        // }
        //
        // LotteryManager.alert(callbackObj.sMsg);
    }
};

amsCfg_648235 = {
    '_everyRead':true,
    'iActivityId' : '290791',
    'iFlowId' : '648235',
    'sData'	: {'buyId':0},
    'fFlowSubmitEnd': function(res) {
        need(["ams.daoju_buy_v2.daoju_buy_v2"], function(DaojuBuy) {
            var option = {
                //apptype:4	新版webpay，已默认
                //onPaySuccess:function(){},//支付成功后回调方法
                //onPayClose:function(){}//关闭支付页面回调方法
            };
            DaojuBuy.pay(res.jData,option);
        });
    },
    'fFlowSubmitFailed':function(res) {
        alert(res.sMsg);
    }
};
milo.ready(function() {
    need(["ams.daoju_buy_v2.appid"], function(autoappid) {
        autoappid.init('nba2kx', 15034, function(final_appid) {
            //final_appid为自动判断得到的道聚城渠道号
            //本段代码内自动进行道聚城全流程数据的收集，必须保留并放到milo.ready内，除非自行在页面上进行基于道聚城活动号的eas曝光上报
        });
    });
});

function openGift(num){
    if(!window.hasGift) {
        $(".pop").hide();
        // $(".gift" + num).addClass('active');
        //抽奖
        amsCfg_648236.sData.choseItem = num;
        amsSubmit(290791, 648236)
    }else {
        alert('您已经开启过幸运之盒咯~')
        // TGDialogS(allGoods[window.giftId][1]);
    }
}

allGoods= {
    "1791654": [1, 'popGift1'],
    "1791655": [2, "popGift2"],
    "1791656": [3, "popGift3"],
    "1791657": [4, "popGift4"],
    "1791658": [5, "popGift5"],
    "1791659": [6, "popGift6"],
    "1791660": [7, "popGift7"],
    "1791661": [8, "popGift8"]
};
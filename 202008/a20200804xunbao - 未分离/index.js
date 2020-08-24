// 奖品顺序 1~23 依次为  0=金球*3， 1=特训精华*2， 2=银球*15 .....  23=银球*20
//奖品坐标, 顺时针方向 0 ~ 23
var position = "0_0,126_0,253_0,379_0,506_0,632_0,759_0,885_0,885_126,885_253,885_379,885_506,885_632,759_632,632_632,506_632,379_632,253_632,126_632,0_632,0_506,0_379,0_253,0_126",
    $hover = $(".lottery-hover"),
    timer = null,//
    wz = null,//骰子目标位置,不用设定
    activeWz = 0,//骰子当前位置,需要设定默认值
    $dice = $(".dice-wrap"),
    packageName = "";

var rollDiceEnable = true;
function initTz(){
    wz = activeWz;
    position = position.split(',');
    position.forEach(function(ev, idx){
        position[idx] = ev.split('_');
    });
    $hover.css({
        "top": position[activeWz][1] + 'px',
        "left": position[activeWz][0] + 'px'
    });
}
initTz();

function reloadTz(){
    wz = activeWz;
    position.forEach(function(ev, idx){
        position[idx] = ev;
    });
    $hover.css({
        "top": position[activeWz][1] + 'px',
        "left": position[activeWz][0] + 'px'
    });
}

//掷骰子, val 为前进步数
function rollDice(val){
    wz += val;
    if( wz > position.length-1)wz = wz-position.length;
    moveDice();
}
//骰子前进
function moveDice(){
    if(activeWz > position.length-1)activeWz = 0;
    $hover.css({
        "top": position[activeWz][1] + 'px',
        "left": position[activeWz][0] + 'px'
    });
    if(activeWz == wz){
        setTimeout(function(){
            moveResult();//移动结束
        }, 500);
    }else {
        activeWz += 1;
        timer = setTimeout(function(){
            clearTimeout(timer);
            moveDice(wz);
        }, 300);
    }
}
//移动结束
function moveResult(){
    rollDiceEnable = true;
    amsCfg_690962.sNeedSubmitPopDiv=false;
    amsSubmit(322944,690962);
    alert('恭喜您获得了'+packageName);
}

amsCfg_690658={
    type : "query",
    iQueryFlowID:690658,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //已绑定时的扩展处理

    },
    failure : function(){
        //未绑定时的扩展处理
    }
};

//提交绑定的配置
amsCfg_690657={
    type : "comit",
    needPopupRole:true,//是否弹默认角色框选角色
    roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID:690658,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //已绑定时的扩展处理
    },
    failure : function(){
        //未绑定时的扩展处理
    }
};

amsCfg_690797 = {
    'iAMSActivityId' : '322944', // AMS活动号
    'iLotteryFlowId' : '690797', //  查询获奖轮播的流程号
    'activityId' : '360648', // 模块实例号
    'contentId' : 'getGiftContent_690797', //容器ID
    'templateId' : 'getGiftTemplate_690797', //模板ID
    'contentPageId' : 'getGiftPageContent_690797',	//分页容器ID
    'showContentId' : 'popPrize', //弹出层ID
    'pageSize' : 6,
};

amsCfg_690655 = {
    'iAMSActivityId' : '322944', // AMS活动号
    'activityId' : '360648', // 模块实例号
    'sData' : {'iTask':null},
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsCfg_690962.sNeedSubmitPopDiv=false;
        amsSubmit(322944,690962);
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
};

amsCfg_690962 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 322944, //活动id
    "iFlowId":    690962, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        if(res.iRet == 0){
            $("#sz_num").html(res.arrData.ticket_2);
            $("#gold_num").html(res.arrData.ticket_1);
            $("#silver_num").html(res.arrData.ticket_0);
            var dice = parseInt(res.arrData.ticket_3,10);
            activeWz = dice%24;
            reloadTz();
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};

amsCfg_690847 = amsCfg_690905= {
    'iAMSActivityId' : '322944', // AMS活动号
    'activityId' : '360648', // 模块实例号
    'sData':{'iNum':null},
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsCfg_690962.sNeedSubmitPopDiv=false;
        amsSubmit(322944,690962);
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }

        LotteryManager.alert(callbackObj.sMsg);
    }
};

var packageIndexMap = {
    2040151: "特训精华*2",
    2040152: "银球*15",
    2040190: "购物券*188",
    2040191: "银球*5",
    2040192: "金球*1",
    2040197: "球员训练卡*1",
    2040199: "银球*10",
    2040200: "金球*2",
    2040202: "特训精华*3",
    2040203: "银球*5",
    2040204: "金球*1",
    2040205: "购物券*288",
    2040207: "银球*10",
    2040208: "购物券*188",
    2040218: "特训精华*2",
    2040219: "5万合同费",
    2040295: "球员训练卡*2",
    2040296: "现役人气30人包*1 ",
    2040344: "购物券*188",
    2040345: "银球*15",
    2040348: "球员训练卡*2",
    2040349: "银球*10",
    2040350: "特训精华*2",
    2040359: "银球*5",
    2040360: "金球*1",
    2040375: "特训精华*1",
    2040377: "银球*5",
    2040378: "金球*1",
    2040380: "购物券*288",
    2040381: "银球*20",
    2040383: "金球*3"
};

function doRollDice(){
    if(rollDiceEnable){
        rollDiceEnable = false;
        amsSubmit(322944,690909);
    }
    return;
}

amsCfg_690909 = {
    'iAMSActivityId' : '322944', // AMS活动号
    'activityId' : '360648', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        var packageArr  = callbackObj.iPackageIdCnt ? callbackObj.iPackageIdCnt.split(",") : "";
        var dot;
        if(packageArr && packageArr.length > 0) {
            packageArr.forEach(function (val) {
                if (val) {
                   var packages = val.split(":");
                   if(packages[0] == 2045170){
                       dot = packages[1]?packages[1]:1
                   }else {
                       packageName =packageIndexMap[packages[0]]
                   }
                }
            });
            $dice[0].className = "p-a bg dice-wrap dice-ani";
            setTimeout(function(){
                $dice[0].className = "p-a bg dice-wrap dice-"+parseInt(dot,10);
                setTimeout(function(){
                    rollDice(parseInt(dot,10));
                }, 500);
            }, 1500);

        }
    }
};
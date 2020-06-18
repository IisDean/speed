milo.ready(function () {
    need("biz.login", function (LoginManager) {
        //QQ登录
        milo.addEvent(g('btn_qqlogin'), 'click', function (e) {
            LoginManager.login();
        });
        //注销
        milo.addEvent(g("btn_logout"), "click", function () {
            LoginManager.logout();
        });
        LoginManager.checkLogin(function () {
            g("login_qq_span").innerHTML = LoginManager.getUserUin(); //????QQ??
            amsInit(311979, 675349);
        });
    });
});

amsCfg_675349={
    type : "query",
    iQueryFlowID:675349,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //已绑定时的扩展处理

    },
    failure : function(){
        //未绑定时的扩展处理
    }
};

//提交绑定的配置
amsCfg_675348={
    type : "comit",
    needPopupRole:true,//是否弹默认角色框选角色
    roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID:675349,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //已绑定时的扩展处理
    },
    failure : function(){
        //未绑定时的扩展处理
    }
};

amsCfg_675347 = amsCfg_675441 =amsCfg_675449 =amsCfg_675454 ={
    'iAMSActivityId' : '311979', // AMS活动号
    'activityId' : '350118', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
};

amsCfg_675451 = amsCfg_675453 ={
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 311979, //活动id
    "iFlowId":    675451, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){

        return;
    },
    "fFlowSubmitFailed":function(res){

    }
};

amsCfg_675455 = {
    'iAMSActivityId' : '311979', // AMS活动号
    'activityId' : '350118', // 模块实例号
    'sData':{'iGiftIdx':null},
    '_everyRead':true,
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
};
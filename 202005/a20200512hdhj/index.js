//登录态参数
var userID = milo.request('userId');
var storyUin = milo.request('uin');
var storyToken = milo.request('token');
//角色验证参数
// var storyArea = "992";//测试环境991微信，992扣扣
var storyPlatid = milo.request('platid');//1 安卓 0 ios
//判断当前是ios还是安卓
if (!storyPlatid) {
    if (milo.android()) {
        storyPlatid = 1;//1 安卓 0 ios
    }
    if (milo.ios()) {
        storyPlatid = 0;//1 安卓 0 ios
    }
}
//判断是否是在游戏内打开
if(!userID){
    userID="";
}
var storyArea=0;
var areaId = storyUin.substring(0, 2);//23是手q,24是微信
if(parseInt(areaId,10)===24){
    storyArea=1
}else if(parseInt(areaId,10)===23){
    storyArea=2
}else{
    storyArea=3
}
var amsCommon = {
    loginData: {},
    init: function () {
        if (!storyArea || !userID || !storyUin || !storyToken) {
            alert("登录态获取错误，请重新打开页面~~");
            return;
        }
        if([1,2,3].indexOf(areaId)>-1){
            alert("角色获取失败，请重新打开页面~~");
            return;
        }
        var index = storyUin.lastIndexOf("\-");
        gopenid = storyUin.substring(index + 1, storyUin.length);
        //游戏内的登录态
        amsCommon.loginData = {
            'userID': userID,
            'storyUin': storyUin,
            'storyToken': storyToken,
            'storyArea': storyArea,
            'storyPlatid': storyPlatid,
            'gopenid': gopenid,
            'storyPartition': "",
        };
    },
    //查询奖励是否领取
    inquiryPackage:function () {
        amsCfg_665191.sData = amsCommon.loginData;
        amsSubmit(304961,665191)
    },
    //领取奖励
    receiveGift:function () {
        amsCfg_665094.sData = amsCommon.loginData;
        amsSubmit(304961,665094);
    },
    //跳转链接
    joinQuan:function (type) {
        switch (type) {
            case "look1":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15202'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=630'}")
                break;
            case "look2":
                // GameHelper.openButton({type:10005, uri:'story://bookdetail?bookId=629'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=501'}")
                break
            case "look3":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15189'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=646'}")
                break
            case "look4":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15189'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=649'}")
                break
            case "story":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15189'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=630'}")
                break
            default:
                alert("跳转类型错误");
        }
    }
};
/**
 * 查询奖励是否已领取
 * @type {{fFlowSubmitFailed: amsCfg_665191.fFlowSubmitFailed, iFlowId: number, fFlowSubmitEnd: amsCfg_665191.fFlowSubmitEnd, iActivityId: number, _everyRead: boolean}}
 */
amsCfg_665191 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 304961, //活动id
    "iFlowId":    665191, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        if(+res['sOutValue1']===1){
            alert("你已经领取过该礼包，快去为喜爱的角色打榜吧~")
            return;
        }else{
            amsCommon.receiveGift();
        }
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert("系统繁忙，请稍后再试~~");
    }
};
/**
 * 领取奖励
 * @type {{activityId: string, iAMSActivityId: string, onGetGiftSuccessEvent: amsCfg_665094.onGetGiftSuccessEvent, onGetGiftFailureEvent: amsCfg_665094.onGetGiftFailureEvent, onBeginGetGiftEvent: (function(): number)}}
 */
amsCfg_665094 = {
    '_everyRead': true,//
    'iAMSActivityId' : '304961', // AMS活动号
    'activityId' : '346602', // 模块实例号
    "sData": {//自定义传参
    },
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        if(callbackObj.sMsg=='您已领取'){
            alert("你已经领取过该礼包，快去为喜爱的角色打榜吧~")
            return;
        }
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        TGDialogS("popGet");
        // if(!callbackObj.sPackageName){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
    }
};

amsCommon.init();
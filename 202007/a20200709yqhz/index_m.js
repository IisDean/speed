var globalInfo = {
    user : {
        'isH5' : false,
        'isLogin' : false,
        'iPlatId' : 1,
        'iAreaId' : 2,
        'shareOpenId' : '',
        'nickName' : '',
        'icon' : '',
        'openid' : '',
        'shareName' : '',
        'shareCode' : '',
        'cardId' : '',
        'iType'  : '',
        'doneTask': false,
        'cardNum' : 0,
        'thisStarId':0,//默认未选择明星封面
        'starId' : '0_0_0_0_0_0_0_0',//'1_2_3_0_0_0_0_0'
        'getType' : 0,//领取奖励类型  0首次集齐 1消耗兑换
        'goodsType':0,//奖励类型      0前浪 1后浪
        'isFirst': 0,//0首次进入
        'ua' : window.navigator.userAgent.toLowerCase(),
    },
    public : {
        'iAMSActivityId' : 303361,
    },
    shareNormal : {
        'title'    : [{'titleName':'王鹤棣','desc':'满满元气就是我的武器，大吉大利，我们都是和平精英！'},{'titleName':'王彦霖','desc':'不跳皮筋就跳伞，大吉大利，我们都是和平精英！'},{'titleName':'黄明昊','desc':'不要贾走位，就要真输出，大吉大利，我们都是和平精英！'}],
        'link'      : location.protocol+'//gp.qq.com/cp/a20200709yqhz/index.html',
        'h5Img' : location.protocol + '//game.gtimg.cn/images/gp/public/share.png',
        'imgBase64' : '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',
    },
    share : {
        'nowTitle' : '',
        'descript' : '',
        'nowUrl' : location.protocol +'//gp.qq.com/cp/a20200709yqhz/index.html',
        'img' : location.protocol + '//game.gtimg.cn/images/gp/public/share.png',
    }
};
var cardName = ['元气口号卡 - 元','元气口号卡 - 气','元气口号卡 - 满','元气口号卡 - 满','元气口号卡 - 和','元气口号卡 - 平','元气口号卡 - 精','元气口号卡 - 英','元气明星卡-王鹤棣','元气明星卡-王彦霖','元气明星卡-黄明昊'];
var cardnameArray = ['元','气','满.活力','满.魅力','和','平','精','英','王鹤棣','王彦霖','黄明昊'];
var cardImg = {
    1 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_1',
    2 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_2',
    3 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_3',
    4 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_4',
    5 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_5',
    6 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_6',
    7 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_7',
    8 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_kh_8',
    9 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_mx_1',
    10 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_mx_2',
    11 : 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/card_mx_3'

}
var ipackageIdCard = {
    '2004481' : '元',
    '2004482' : '气',
    '2004483' : '满.活力',
    '2004484' : '满.魅力',
    '2004485' : '和',
    '2004486' : '平',
    '2004487' : '精',
    '2004488' : '英',
    '2004489' : '王鹤棣',
    '2004490' : '王彦霖',
    '2008903' : '黄明昊'
};
var Card_index = {
    '2004481' : '1',
    '2004482' : '2',
    '2004483' : '3',
    '2004484' : '4',
    '2004485' : '5',
    '2004486' : '6',
    '2004487' : '7',
    '2004488' : '8',
    '2004489' : '9',
    '2004490' : '10',
    '2008903' : '11'
};

milo.ready(function () {
    openDebug();
    globalInfo.share.nowUrl = window.location.href;
    clearCookies();
    if (milo.request('msdkEncodeParam') != '' && !isMSDK()) {
        window.location.href = globalInfo.public.url;
    } else {
        isLogin();
    }
});
//分享按钮
function shareBtn(){
    var shareNum = parseInt(Math.random()*3);//随机0~3
    if(isMSDK()){
        globalInfo.share.nowTitle = '元气特种兵-'+ globalInfo.shareNormal.title[shareNum]['titleName'] +'邀你领同款套装，一起元气满满！';
        globalInfo.share.descript = globalInfo.shareNormal.title[shareNum]['desc'];
        globalInfo.share.nowUrl = globalInfo.shareNormal.link;
        globalInfo.shareNormal.imgBase64 = globalInfo.shareNormal.imgBase64;
        if(milo.request('appid') == '1106467070'){TGDialogS('pop1');}else{TGDialogS('pop2');}
    }else{
        globalInfo.share.nowTitle = '元气特种兵-'+ globalInfo.shareNormal.title[shareNum]['titleName'] +'邀你领同款套装，一起元气满满！';
        globalInfo.share.descript = globalInfo.shareNormal.title[shareNum]['desc'];
        globalInfo.share.nowUrl = globalInfo.shareNormal.link;
        globalInfo.share.img = location.protocol+'//game.gtimg.cn/images/gp/cp/a20191218year/h5Icon.png';
        toShare();
        TGDialogS('pop3');
    }
}
//炫耀一下(msdk)
function xuanYao(type){
    if(isMSDK()){
        if(milo.request('appid') == '1106467070'){
            if(type == 'sk'){//搜卡

            }
            doMsdkSharePost('qqzone');
        }else{
            doMsdkSharePost('wxzone');
        }
    }
}

//其他角色
function changeRole(){
    if(isQQ()){
        $("#sel_channel option[value='2']").prop("selected", 'selected');
    }else{
        $("#sel_channel option[value='1']").prop("selected", 'selected');
    }

    $("#areaContentId option[value='0']").prop("selected", 'selected');
    TGDialogS('pop30');
}
//角色初始化
function selectRole(){
    need(["biz.roleselector"],function(Roleselector){
        Roleselector.init({
            'openToOpen': {
                "ams_targetappid": "wxc4c0253df149f02d",   //要转的游戏业务appid
                "sAMSTrusteeship": 1 // 如果为1则走微信/QQ托管，为0则不走微信/QQ托管。默认为0(不走托管)
            },
            'type' :'html',//可选值:float html
            'gameId' : 'gp',
            'isQueryRole' : true,
            'systemContentId' : 'system',// 系统android，ios
            'channelContentId' : 'sel_channel',// 渠道 手Q，微信
            'areaContentId': 'areaContentId', // 大区
            'roleContentId' : 'name',// 角色
            'confirmButtonId' : 'btn_submit',//确认按钮，会触发submitEvent
            'submitEvent' : function(roleObj){
                //{"sPlatId":"0","areaid":"2","sPartition":"","roleid":"255102279","rolename":"判断很深的",
                globalInfo.user.iPlatId = roleObj.submitData.sPlatId;
                //alert(JSON.stringify(roleObj));
                $("#name").text(roleObj.submitData.rolename);
                if(globalInfo.user.getType == 0){
                    $("#charName_first").text(roleObj.submitData.rolename);
                    TGDialogS('pop33_first');
                }else{
                    $("#charName").text(roleObj.submitData.rolename);
                    TGDialogS('pop33');
                }
            },
            'onLoginError':function(){
                //alert('登录失败的回调方法');
            },
        })
        Roleselector.show();
        $("#role_name").css("display","flex");

    })
}
//搜集卡片
function getCard(){
    gpSubmit(316510,681573);
}
//发起共享(按钮)
function doGx(){
    if(globalInfo.user.cardNum == 0){
        TGDialogS('pop8');//无卡提示
    }else{
        globalInfo.user.iType = 1;
        gpSubmit(316510,684787);
    }
}
//发起共享(卡片)
function doGx_tip(){
    if(globalInfo.user.cardNum == 0){
        TGDialogS('pop8');//无卡提示
    }else{
        globalInfo.user.iType = 1;
        gpSubmit(316510,684787);
    }
}
//使用封面
// function useCover(){
//     gpSubmit(316510,686475);
// }
//发起索要(按钮)
function doAskfor(){
    globalInfo.user.iType = 2;
    gpSubmit(316510,686116);
}
//选择兑换套装
function chooseClothes(type){
    if(globalInfo.user.isLogin == false){
        alert('请前往手Q，微信，游戏内参与活动');
        return;
    }
    if(type == 0){
        if($("#kCardNum_floor").text() == 0){
            TGDialogS('pop9'); //尚未集齐足够的卡片
            return;
        }
        $("#clothesName").text('活力前浪套装');
        globalInfo.user.getType = 1;
        globalInfo.user.goodsType = 0;
    }else if(type == 1){
        if($("#dCardNum_floor").text() == 0){
            TGDialogS('pop9'); //尚未集齐足够的卡片
            return;
        }
        $("#clothesName").text('活力后浪套装');
        globalInfo.user.getType = 1;
        globalInfo.user.goodsType = 1;
    }
    gpSubmit(316510, 685199);//查询游戏昵称
}

//兑换套装(30天)
function dhClothes(){
    if($("#charName").text() == '当前系统无角色'){
        alert('当前系统无角色，请先创建角色或者选择其他角色兑换');
    }else{
        if(globalInfo.user.goodsType == 0){
            gpSubmit(316510,686137);//兑换前浪30天
        }else{
            gpSubmit(316510,686143);//兑换后浪30天
        }
    }
}
//兑换套装(7天)
function dhClothes_first(){
    if($("#charName_first").text() == '当前系统无角色'){
        alert('当前系统无角色，请先创建角色或者选择其他角色兑换');
    }else{
        if(globalInfo.user.goodsType == 0){
            gpSubmit(316510,686110);//兑换前浪7天
        }else{
            gpSubmit(316510,686127);//兑换后浪7天
        }
    }

}
//微信特殊处理
function wxHandle(){
    $("#dayTask3_text").text('游戏内开启任务');
    $("#dayTask4_text").text('游戏内开启任务');
    $(".btn-sy,.btn-sy2").hide();//隐藏索要按钮
}
//确认分享弹窗后弹首次弹窗,关闭后重定向
function queRen_first(){
    if(globalInfo.user.isFirst == 0){
        TGDialogS('pop34');//首次
    }else{
        window.location.href = 'https://gp.qq.com/cp/a20200709yqhz/index.html';
        closeDialog();
    }
}
//规则弹窗
function ruleTip(){
    if(isWeiXin()){
        TGDialogS('popRule_wx')
    }else{
        TGDialogS('popRule')
    }
}
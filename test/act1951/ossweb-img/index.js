var getSharedTeamId = ulink.getQueryString('sharedTeamId');
var getSharedToken = ulink.getQueryString('sharedToken');

var urlPath = ulink.isWxApp()?"wx":"qq";
var iActUrl = "https://xylz.qq.com/act/1951/a20191031team/";
//var iActUrl = "//my.qq.com/";

var jumpLink = iActUrl+urlPath+"/index.html";

var roleBase = new Array("","鬼仙","人仙","地仙","神仙","天仙","金仙","太和仙");
var GHGAME = {
    options: {
        apiUrl: 'https://ulink.game.qq.com/app/1762/6dcf392d4f2547be/index.php',
        //apiUrl: '//my.qq.com:81/index.php',
        sAppId: 'ULINK-GHGAME-828541',
        iActId: 1951,
        game: 'xylz',
        isLogin: false,
        isBind: false,
        
        nickName: "",
        headUrl:"",
        sharedToken: "",
        sharedTeamId: "",
        perDayRole: 0,
        myTeamId:""
    },
    actOpt: {
        btnStatus: [],
    },
    /**
     * 返回系统类型 0-IOS 1-安卓 2-PC -1未知系统
     * @returns {number}
     */
    getOS: function () {
        if (!ulink.isMobile()) {

            return 2;
        }
        var os = ulink.detect().os;
        if (os.iphone !== undefined && os.iphone == true) {
            return 0;
        }
        if (os.android !== undefined && os.android == true) {
            return 1;
        }
        return -1;
    },
    LoginManager: ulink.LoginManager.init({
        openLinkUrl: 'https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90236369&appid=wx7fa53c237760c335&url=https%3A%2F%2Fxylz.qq.com%2Fact%2F1951%2Fa20191031team%2Fwx%2Findex.html',
    }),
    login: function () {
        if (ulink.isQQApp()) {
        	ulink.LoginManager.login();
        } else if (ulink.isWxApp()) {
        	ulink.LoginManager.loginByWx();
        }else {
            TGDialogS("pop3");
        }
    },
    logout: function () {
        GHGAME.LoginManager.logout(function () {
            window.location.reload();
        })
    },
    request: function (e) {
        if (!e.data) e.data = {};
        ulink.http.post({
            url: GHGAME.options.apiUrl,
            params: {
                iActId: GHGAME.options.iActId,
                game: GHGAME.options.game,
                route: e.route
            },
            formdata: e.data,
            success: function success(data) {
                if (data.iRet == 0) {
                    e.success(data);
                }else if (data.iRet == 3900) { //未绑定角色，直接触发绑定
                    GHGAME.bindRole();
                    return false;
                } else if (data.iRet == -111) {
                    LoginManager.logout(function () {
                        GHGAME.login();
                    });
                } else {
                	$("#pop8 h3").text(data.sMsg);
                	TGDialogS('pop8');                	
                }
            },
            error: function error() {
            }
        });
    },
    bindRole: function () {
        GHGAME.request({
            route: 'user/getRoleSelecter',
            success: function success(res) {
                var roleOptions = {
                    "sAppId": "ULINK-GHGAME-828541",
                    "iActId": GHGAME.options.iActId,   //活动ID
                    "sSign": res.jData.sSign,  //签名
                    "game": GHGAME.options.game,  //游戏id
                    "timestamp": res.jData.timestamp, //时间戳
                    "sCode": encodeURIComponent(res.jData.sCode),  //第三方渠道加密串
                    filterChannels: ["微信区"],
                    filterSystems: [],
                    "tips": {  // 自定义文案，1.0.13版本及后续版本支持
                        "noGetRole": "未查询到角色",   // “未查询到角色”的提示文案
                        "searchLater": "请稍后查询",     // “请稍后查询”的提示文案
                    },
                    custom: true,    // 自定义皮肤必须指定为true
                    UISettings: {   // 以下属性必须指定，且不能为空
                        dialog: ulink.$('#pop4'), // RoleSelector弹框
                        channelSelect: ulink.$('#chanl'), // 渠道下拉框
                        systemSelect: ulink.$('#system'),  // 系统下拉框
                        areaSelect: ulink.$('#area'),    // 大区下拉框
                        serverSelect: ulink.$('#area1'),    // 服务器下拉框
                        roleSelect: ulink.$('#role'),    // 角色下拉框
                        roleSelectParent: ulink.$('#divRole'), // 角色下拉框父节点
                        errorMsgPanel: ulink.$('#roleMessage'), // 错误信息展示面板
                        confirmButton: ulink.$('#roleSure'), // 确定按钮
                        cancelButton: ulink.$('#roleClose'), // 取消按钮
                        closeButton: ulink.$('#roleClose'), // 关闭按钮
                    }
                };
                //过滤
                if (ulink.isQQApp()) {
                    roleOptions.filterChannels.push("微信");
                } else if (ulink.isWxApp()) {
                    roleOptions.filterChannels.push("手Q");
                }
                var OS = GHGAME.getOS();
                if (OS == 1) {
                    roleOptions.filterSystems.push("苹果(iOS)");
                } else if (OS == 0) {
                    roleOptions.filterSystems.push("安卓(android)");
                }
                var roleselector = new ulink.RoleSelector(roleOptions);
                //角色查询数据返回监听事件绑定
                roleselector.on("getRoleData", function (roleData) {
                	
                	roleData.nickName = GHGAME.options.nickName;
                	roleData.headUrl = GHGAME.options.headUrl;
                	
                	console.log(roleData);
                	GHGAME.request({
                        route: 'User/saveRole',
                        data: roleData,
                        success: function success(res) {
                            GHGAME.options.isBind = true;
                        }
                    });
                });
                TGDialogS("pop4");
                roleselector.show();

            }
        });
    },
    getMyLottery: function (lotteryType) {

        if (!GHGAME.options.isLogin) {
            GHGAME.login();
            return false;
        }
        if (!GHGAME.options.isBind) {
            GHGAME.bindRole();
            return false;
        }
        GHGAME.request({
            route: 'Lottery/doLottery',
            data: {lotteryType:lotteryType},
            success: function (res) {
               if(res.iRet == 0){
            	   TGDialogS('pop5');
            	   // 奖励按钮处理                    
                   styleValue = "background:url(//game.gtimg.cn/images/ulink/act/1951/a20191031team/"+urlPath+"/get.png) no-repeat; background-size: cover; width: 2.89rem;height:1.06rem;";
                   hrefValue = "javascript:return false;";
                   $("#lottery"+lotteryType).attr("href",hrefValue);                	 
	               $("#lottery"+lotteryType).attr("style",styleValue);
               }
            }
        })
    },
    createTeam: function () {

        if (!GHGAME.options.isLogin) {
            GHGAME.login();
            return false;
        }
        if (!GHGAME.options.isBind) {
            GHGAME.bindRole();
            return false;
        }
        
        if(GHGAME.options.perDayRole == 0){
        	$("#pop8 h3").text("亲，请先结仙缘再创建队伍哟~");
        	TGDialogS('pop8');
            return false;
        }
        
        if(GHGAME.options.myTeamId != ""){
        	$("#pop8 h3").text("亲，您已有队伍，明日再来吧~");
        	TGDialogS('pop8');
            return false;
        }
        
        GHGAME.request({
            route: 'Team/createTeam',
            success: function (res) {
                if(res.iRet == 0){
                	TGDialogS('pop11');
                }
            }
        })
    },
    joinTeam: function () {

        if (!GHGAME.options.isLogin) {
            GHGAME.login();
            return false;
        }
        if (!GHGAME.options.isBind) {
            GHGAME.bindRole();
            return false;
        }
        
        if(GHGAME.options.perDayRole == 0){
        	$("#pop8 h3").text("对不起！您今日还未结仙缘哦~");
        	TGDialogS('pop8');
            return false;
        }
        
        GHGAME.request({
            route: 'Team/joinTeam',
            data:{sharedTeamId:getSharedTeamId,sharedToken:getSharedToken},
            success: function (res) {
                if(res.iRet == 0){
                	$("#pop8 h3").text("恭喜您，加入队伍成功～");
                	 
                	// 填充新的Html
                	teamList = res.jData.teamInfor.teamMember;
                    for(var item in teamList){
                    	roleId = Number(teamList[item].roleId);
                    	nickName = decodeURIComponent(teamList[item].nickName);
                    	nickName = setString(nickName,8);
                    	if(urlPath == "wx"){
                    		html = '<div class="friends-head"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                    	}else{
                    		html = '<div class="friends-head" style="background-image: url('+teamList[item].headUrl+');"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                    	}
                    	$(".team-color-"+roleId).html(html);
                    }
                    GHGAME.updateShareToken(res.jData.sharedToken,res.jData.myTeam);
                    $("#inTeam").show();
                	$("#outTeam").hide();
                	$("#pop8 h3").text("加入队伍成功，快去邀请好友组队领奖吧");
                	TGDialogS('pop8');
                }
            }
        })
    },
    changeRoleId: function () {

        if (!GHGAME.options.isLogin) {
            GHGAME.login();
            return false;
        }
        if (!GHGAME.options.isBind) {
            GHGAME.bindRole();
            return false;
        }
        
        if(GHGAME.options.perDayRole == 7){
        	$("#pop8 h3").text("亲，您已是太和仙，不能再变身咯~");
        	TGDialogS('pop8');
            return false;
        }
        
        if(GHGAME.options.perDayRole == 0){
        	$("#pop8 h3").text("对不起！您今日还未结仙缘哦~");
        	TGDialogS('pop8');
            return false;
        }
        
        GHGAME.request({
            route: 'User/changeRole',
            success: function (res) {
                if(res.iRet == 0){
                	$("#pop8 h3").text("恭喜您，变身成功～");
                	 
                	// 还原已有自己的角色Html
                	oldRoleName = roleBase[GHGAME.options.perDayRole];
                	oldHtml = '<div class="friends-head" style="background-image: url(#);"></div><p class="plank-name-text text-center">'+oldRoleName+'</p><p class="friends-name-text text-center text-hide"></p>';
                	 
                	$(".team-color-"+GHGAME.options.perDayRole).html(oldHtml);
                	// 填充新的Html
                	teamList = res.jData.teamInfor.teamMember;
                    for(var item in teamList){
                    	roleId = Number(teamList[item].roleId);
                    	nickName = decodeURIComponent(teamList[item].nickName);
                    	nickName = setString(nickName,8);
                    	if(urlPath == "wx"){
                    		html = '<div class="friends-head"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                    	}else{
                    		html = '<div class="friends-head" style="background-image: url('+teamList[item].headUrl+');"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                    	}
                        //html = '<div class="friends-head" style="background-image: url('+teamList[item].headUrl+');"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                        $(".team-color-"+roleId).html(html);
                    }
                    GHGAME.options.perDayRole = 7;
                    TGDialogS('pop8'); 
                }
            }
        })
    },
    getRoleId: function () {

        if (!GHGAME.options.isLogin) {
            GHGAME.login();
            return false;
        }
        if (!GHGAME.options.isBind) {
            GHGAME.bindRole();
            return false;
        }
        
        if(GHGAME.options.perDayRole != 0){
        	$("#pop2 h3").text("对不起，您今日已结仙缘："+roleBase[GHGAME.options.perDayRole]);
        	TGDialogS('pop2');
            return false;
        }
        
        GHGAME.request({
            route: 'User/getPerDayRole',
            success: function (res) {
                if(res.iRet == 0){
                	GHGAME.options.perDayRole = Number(res.jData);
                	
                	$("#pop2 h3").text("对不起，您今日已结仙缘："+roleBase[GHGAME.options.perDayRole]);
                	$(".sin-text").text(roleBase[GHGAME.options.perDayRole]);
                	
                	TGDialogS('pop1');
                }
            }
        })
    },
    start: function () {

        GHGAME.LoginManager.checkLogin(function (user) {
        	console.log("登录信息：",user);
            GHGAME.options.isLogin = true;
            user.nickName = decodeURIComponent(user.nickName);
            user.nickName = user.nickName.replace(/<.*?>/g, "");
            var nickName = user.nickName ? user.nickName : '雪鹰领主';
            
            GHGAME.options.nickName = user.nickName;
            GHGAME.options.headUrl = user.headimgurl;
            GHGAME.initData();

        }, function () {
            GHGAME.login();
        });
    },
    // 初始化后、创建队伍、加入队伍后，更新分享链接
    updateShareToken:function(sharedToken,sharedTeamId){
    	GHGAME.options.sharedToken = sharedToken;
        GHGAME.options.sharedTeamId = sharedTeamId;
        // 图标
        shareIcon = "https://game.gtimg.cn/images/ulink/act/1951/a20191031team/"+urlPath+"/share.png";
        // 分享链接
        shareLink = iActUrl+urlPath+"/index.html?sharedToken="+GHGAME.options.sharedToken+"&sharedTeamId="+GHGAME.options.sharedTeamId;
        
        var shareOpt = {
                iActId: GHGAME.options.iActId, // 活动号
                title: '来呀，一起来修仙啊~', // 分享标题
                desc: '《雪鹰领主》腾讯2019收官大作今日首发，邀你每日结仙缘有惊喜~',  // 分享内容简介
                link: shareLink,  // 分享链接
                imgUrl: shareIcon, // 分享后朋友看到的图标，大小不能超过32K
                WXtrigger: function (res) { // 微信分享点击事件回调
                },
                WXsuccess: function (res) { // 微信分享后回调
                },
                WXfail: function (res) { // 微信分享失败回调
                },
                QQtrigger: function (res) { // qq分享点击事件的回调
                },
                QQcallback: function (res) { // qq成功、失败、或取消的回调
                },
                defaultCallback: function () {
                    // 调用to方法后，由于qq（非ark消息分享）、微信webview环境不支持直接唤起分享，故会执行该回调、同时游戏中msdk分享失败、也会执行该回调
                    // todo，在这里做兜底处理，比如说弹一个引导分享的箭头蒙层
                }
            };
            ulink.share.init(shareOpt);
    },
    initData: function () {
        GHGAME.request({
            route: 'User/initUser',
            data:{sharedTeamId:getSharedTeamId,sharedToken:getSharedToken},
            success: function (res) {
                GHGAME.options.isBind = true;
                
                // 如果已有队伍，则更新分享链接
                if(res.jData.myTeam !="" && res.jData.sharedToken !=""){
                	GHGAME.updateShareToken(res.jData.sharedToken,res.jData.myTeam);
                }
                
                var lotteryData = res.jData.lotteryData;
                var html = '';
                
                if(res.jData.teamInfor !="" && res.jData.teamInfor.teamMember.length > 0){
                	var teamList = res.jData.teamInfor.teamMember;
                    for(var item in teamList){
                    	roleId = Number(teamList[item].roleId);
                    	nickName = decodeURIComponent(teamList[item].nickName);
                    	nickName = setString(nickName,8);
                    	if(urlPath == "wx"){
                    		html = '<div class="friends-head"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                    	}else{
                    		html = '<div class="friends-head" style="background-image: url('+teamList[item].headUrl+');"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                    	}
                        //html = '<div class="friends-head" style="background-image: url('+teamList[item].headUrl+');"></div><p class="plank-name-text text-center">'+roleBase[roleId]+'</p><p class="friends-name-text text-center text-hide">'+nickName+'</p>';
                        $(".team-color-"+roleId).html(html);
                    }
                }
                
                // 奖励按钮处理                
                styleValue = "background:url(//game.gtimg.cn/images/ulink/act/1951/a20191031team/"+urlPath+"/get.png) no-repeat; background-size: cover; width: 2.89rem;height:1.06rem;";
                hrefValue = "javascript:return false;";
                
                if(lotteryData.perDayLottery3 != 0){
                	$("#lottery3").attr("href",hrefValue);                	 
                	$("#lottery3").attr("style",styleValue);
                }
                if(lotteryData.perDayLottery5 != 0){
                	$("#lottery5").attr("href",hrefValue);
                	$("#lottery5").attr("style",styleValue);
                }
                if(lotteryData.perDayLottery7 != 0){
                	$("#lottery7").attr("href",hrefValue);
                	$("#lottery7").attr("style",styleValue);
                }
                
                // 新用户注册礼包
                if(lotteryData.registerLottery != 0){
                	$("#lottery1").attr("href",hrefValue);
                	$("#lottery1").attr("style",styleValue);
                }
                
                // 今日抽取角色
                if(res.jData.perDayRole != 0){
                	GHGAME.options.perDayRole = Number(res.jData.perDayRole);
                }
                
                // 是否组队
                if(res.jData.myTeam !=""){
                	$("#inTeam").show();
                	$("#outTeam").hide();
                }else{
                	$("#inTeam").hide();
                	$("#outTeam").show();
                }
               
            }
        })
    },
    jumpLink: function(){
        window.location.href = jumpLink;
    },
    //默认分享
    shareInit: function () {    	
        shareIcon = "https://game.gtimg.cn/images/ulink/act/1951/a20191031team/"+urlPath+"/share.png";        
        var shareOpt = {
            iActId: GHGAME.options.iActId, // 活动号
            title: '来呀，一起来修仙啊~', // 分享标题
            desc: '《雪鹰领主》腾讯2019收官大作今日首发，邀你每日结仙缘有惊喜~',  // 分享内容简介
            link: jumpLink,  // 默认分享链接
            imgUrl: shareIcon, // 分享后朋友看到的图标，大小不能超过32K
            WXtrigger: function (res) { // 微信分享点击事件回调
            },
            WXsuccess: function (res) { // 微信分享后回调
            },
            WXfail: function (res) { // 微信分享失败回调
            },
            QQtrigger: function (res) { // qq分享点击事件的回调
            },
            QQcallback: function (res) { // qq成功、失败、或取消的回调
            },
            defaultCallback: function () {
                // 调用to方法后，由于qq（非ark消息分享）、微信webview环境不支持直接唤起分享，故会执行该回调、同时游戏中msdk分享失败、也会执行该回调
                // todo，在这里做兜底处理，比如说弹一个引导分享的箭头蒙层
            }
        };
        ulink.share.init(shareOpt);
    },
};
GHGAME.shareInit();
GHGAME.start();

function setString(str, len) {  
    var strlen = 0;  
    var s = "";  
    for (var i = 0; i < str.length; i++) {  
        if (str.charCodeAt(i) > 128) {  
            strlen += 2;  
        } else {  
            strlen++;  
        }  
        s += str.charAt(i);  
        if (strlen >= len) {  
            return s+"...";  
        }  
    }  
    return s;  
}  
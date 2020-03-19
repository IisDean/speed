var isLogin = isBind = false;
var appid = 'wx1cd4fbe9335888fe';
var wx_appid = 'wx0d3cc3a6e9f20276';
var qq_appid = '1106295984';
var sData = {};
var sData = {};
var sArea = '', sPlatId = '';
var teamid = milo.request('teamid');
var homePage = window.location.protocol + '//dp.qq.com/cp/a20200110xngroup/index_wqm.html';
var strLink = homePage;
var ua = window.navigator.userAgent.toLowerCase();
var money = 0;
var isWhite= 0;

function isIos()
{
	return /iphone|ipod|ipad/i.test(ua);
}

function isAndroid()
{
	return /android/i.test(ua);
}

sPlatId = isIos() ? '0' : (isAndroid() ? '1' : '');

function isWeiXin()
{
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

function isQQ()
{
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

if (isWeiXin()) {
	$(".btn-wx").hide();
	homePage = homePage + '?appid=wx1cd4fbe9335888fe&acctype=wx';
}

var _server_url = '';
if (isWeiXin()) {
	_server_url = location.protocol + '//dp.qq.com/comm-htdocs/js/game_area/dp_WX_server_select.js';
} else {
	_server_url = location.protocol + '//dp.qq.com/comm-htdocs/js/game_area/dp_SQ_server_select.js';
}

window.ams_login_avoid_conflict = true;
milo.ready(function()
{
	include(_server_url + "?_rand=" + Math.random(), function()
	{
		need([ "biz.roleselector" ], function(RoleSelector)
		{
			var roleobj = cloneClass(RoleSelector);
			roleobj.init({
				openToOpen : {
					"sAMSTrusteeship" : 1, // 固定
					"ams_targetappid" : wx_appid
				// 要转的游戏业务appid
				},
				"type" : "html",
				"gameId" : "dp", // 待定
				"isQueryRole" : true,
				"area1ContentId" : "", // 如果为2级大区，则该值必须设置
				"areaContentId" : "areaContentId", // 小区下拉框的ID(sPartition对应的下来框)
				"channelContentId" : "channelContentId", // 选择手Q、微信下来框的ID
				"systemContentId" : "systemContentId", // 选择IOS 安卓下拉框的ID
				"roleContentId" : "roleContentId", // 角色选择框的ID
				"confirmButtonId" : "doSubmit", // 确定按钮的ID
				"submitEvent" : function(roleObj)
				{
					
					console.log(JSON.stringify(roleObj.submitData));
					
					sData.sArea = roleObj.submitData.areaid;
					sData.sPlatId = roleObj.submitData.sPlatId;
					sData.sPartition = roleObj.submitData.sPartition;
					sData.sRoleId = roleObj.submitData.roleid;
					sData.sRoleName = encodeURIComponent(roleObj.submitData.rolename);
					sData.md5str = roleObj.submitData.md5str;
					sData.checkparam = roleObj.submitData.checkparam;
					sData.ams_checkparam = roleObj.submitData.checkparam;
					
					sData.user_areaName  = encodeURIComponent(roleObj.submitData.areaname);
					
					amsCfg_643991.sData = sData;
					amsInit(287348, 643991);
				}
			});
			roleobj.show();
		});
	});
 
	need("biz.login", function(LoginManager)
	{
		LoginManager.checkLogin(function(userinfo)
		{
			var acctype = milo.cookie.get("acctype");
			if (isWeiXin() && acctype != 'wx' || (isQQ() && acctype == 'wx')) {
				LoginManager.logout({
					logoutCallback : function()
					{
						location.reload(true);
					}
				})
				return;
			} else {
				if (isWeiXin()) {
					LoginManager.getUserInfoByWxOpenId({
						"openid" : milo.cookie.get("openid"),
						"access_token" : milo.cookie.get("access_token")
					}, function(wxuser)
					{
						nickname = wxuser.nickname;
						nickname = nickname.replace(/<span.*?><\/span>/g, '');
						$("#login-txt2 span").text(milo.xss.filter(nickname));
						sData = {
								'appid' : appid,
								'sArea' : '1',
								"sPlatId" : sPlatId,
								'sServiceType' : "txsyhdh",
								"ams_targetappid" : wx_appid,
								'sHeadImg' : wxuser.headimgurl + "/96"
							};
						
						// 查询是否绑定
						amsCfg_643992.sData = sData;
						amsInit(287348, 643992);
					});
				} else {
					milo.cookie.clear("openid");
					milo.cookie.clear("access_token");
					milo.cookie.clear("acctype");
					milo.cookie.clear("appid");
					milo.cookie.clear("openid", 'qq.com', '/');
					milo.cookie.clear("access_token", 'qq.com', '/');
					milo.cookie.clear("acctype", 'qq.com', '/');
					milo.cookie.clear("appid", 'qq.com', '/');
					sData = {
						'appid' : qq_appid,
						'sArea' : '2',
						"sPlatId" : sPlatId,
						'sServiceType' : 'dp',
						'sHeadImg' : "http://q.qlogo.cn/g?b=qq&nk=" + userinfo.userUin + "&s=100"
					};
					nickname = LoginManager.getNickName();
					nickname = nickname.replace(/<span.*?><\/span>/g, '');
					$("#login-txt2 span").text(milo.xss.filter(nickname));
					
					// 查询是否绑定
					amsCfg_643992.sData = sData;
					amsInit(287348, 643992);
				}

				isLogin = true;
				$("#login-txt1").hide();
				$("#login-txt2").show();
			}
		}, function()
		{
			if (isWeiXin()) {// 未登录时微信内打开活动进行微信授权
				LoginManager.loginByWX({
					redirect_wx_url : location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(homePage)// 回调url
				});
			} else if (isQQ()) {
				LoginManager.login();
			} else {
				openDialog('pop1');
			}
		}, {
			appConfig : {
				avoidConflict : true,
				WxAppId : "wx1cd4fbe9335888fe",
				scope : "snsapi_userinfo"
			}
		})
	});
});

// 查询是否绑定的配置
amsCfg_643992={
    type : "query",
	iQueryFlowID:643991,
	success : function(bindedInfo)
	{
		// 已绑定时的扩展处理
		isBind = true;
		
		// 初始化
		sData.sArea = bindedInfo.jData.data.Farea; //服务器ID
		sData.sPlatId = bindedInfo.jData.data.FplatId; //系统ID
		sData.sRoleId = bindedInfo.jData.data.FroleId; //角色ID
		sData.sPartition = bindedInfo.jData.data.FPartition; //大区ID
		sData.sRoleName = bindedInfo.jData.data.FroleName;//角色名称
		sData.nickName = decodeURIComponent(sData.sRoleName);
		sData.areaName = decodeURIComponent(bindedInfo.jData.data.FareaName);
		
		$("#login-txt2 span").text(milo.xss.filter(decodeURIComponent(bindedInfo.jData.data.FareaName))+'，'+milo.xss.filter(decodeURIComponent(sData.sRoleName)));
		$("#login-txt2 a").text('切换绑定');
		
		amsCfg_646358.sData = sData;
		amsSubmit(287348,646358);
	},
	failure : function()
	{
		// 未绑定时的扩展处理
		isBind = false;
		TGDialogS('pop2');
	}
};

// 提交绑定的配置
amsCfg_643991={
    type : "comit",
    needPopupRole:false,//是否弹默认角色框选角色
    roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID:643992,
	service : "dp",
	sData:{},
	success : function(bindedInfo)
	{
		closeDialog();
		
		// 已绑定时的扩展处理
		isBind = true;
		
		// 初始化
		// 查询家族纷争排行榜32强
		sData.sArea = bindedInfo.jData.data.Farea; //服务器ID
		sData.sPlatId = bindedInfo.jData.data.FplatId; //系统ID
		sData.sRoleId = bindedInfo.jData.data.FroleId; //角色ID
		sData.sPartition = bindedInfo.jData.data.FPartition; //大区ID
		sData.sRoleName = bindedInfo.jData.data.FroleName;//角色名称
		sData.nickName = decodeURIComponent(sData.sRoleName);
		sData.areaName = decodeURIComponent(bindedInfo.jData.data.FareaName);
		
		$("#login-txt2 span").text(milo.xss.filter(decodeURIComponent(bindedInfo.jData.data.FareaName))+'，'+milo.xss.filter(decodeURIComponent(sData.sRoleName)));
		$("#login-txt2 a").text('切换绑定');
		
		amsCfg_646358.sData = sData;
		amsSubmit(287348,646358);

		closeDialog();
	},
	failure : function()
	{
		// 未绑定时的扩展处理
		isBind = false;
	}
};

var lotteryZG = taskZG = 0;
var myTeamId = 0;
var myScore = 0;
var memberNums = 0;
var teamScore = 0;
amsCfg_646358 = {
		'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
		"iActivityId": 287348, //活动id	
		"iFlowId":    646358, //流程id
		"sData":{},
		"fFlowSubmitEnd": function(res){
			if(res.jData.ret == '0'){
				isWhite = res.jData.isWhite;
				if(isWhite == '1'){
					$(".way-msg-text").show();
				}
				lotteryZG = res.jData.usedNums.split(',');
				taskZG = JSON.parse(res.jData.holds);
				myScore = parseInt(res.jData.score);
				$(".personage-count-text").text('个人积分:'+myScore);
				
				showLotteryStatus(lotteryZG);
				showTaskStatus(taskZG);
				
				if(res.jData.teamid != '0'){
					myTeamId = res.jData.teamid;
					//显示队友区域
					$(".create-wrap").hide();
					
					var memberList = res.jData.teamData;
					for(var i in memberList){
						memberNums ++;
						teamScore = teamScore+parseInt(memberList[i].score);
						showTeamMembersInfo(i,memberList[i].headimg, memberList[i].rolename, memberList[i].areaname, memberList[i].isWhite, memberList[i].score);
					}
					
					if(memberNums >1){
						$(".team-score").text('小队累积积分：'+teamScore);
					}
					$("#selector1,#selector2").text(myTeamId);
					$("#selector3").text('https://dp.qq.com/cp/a20200110xngroup/index_wqm.html?teamid='+myTeamId);
					$("#my-team-code").show();// 我的队伍邀请码
					$(".wrap-2").addClass("join-status");
					$(".team-list-wrap").show();
				}else{
					if(teamid){
						amsCfg_646360 = {
								'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
								"iActivityId": 287348, //活动id	
								"iFlowId":    646360, //流程id
								"sData":{},
								"fFlowSubmitEnd": function(res){
									if(res.jData.ret == '0'){
										$(".confirm-join-text").text('你正在加入'+res.jData.data[0].areaname+'，'+res.jData.data[0].rolename+'的队伍，一旦加入将不可更换队伍，请问是否加入？');
										TGDialogS('pop6');
										
										$("#pop6 .confirm-btn").unbind("click").bind("click",function(){
											amsCfg_646357.sData = sData;
											amsCfg_646357.sData.teamId = res.jData.data[0].teamid;
											amsSubmit(287348,646357);
										});
									}else{
										alert(res.jData.msg);
									}
									return;
								},
								"fFlowSubmitFailed":function(res){
									//失败会走到这个函数
									//条件不满足，ame返回大于0是后走到这里
									alert(res.sMsg);
								}
							};
						sData.teamId = teamid;
						amsCfg_646360.sData = sData;
						amsSubmit(287348,646360);
					}
				}
			}else{
				alert(res.jData.msg);
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};

function showLotteryStatus(zg){
	
}
function showTaskStatus(zg){
	
}

amsCfg_646357 = {
		'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
		"iActivityId": 287348, //活动id	
		"iFlowId":    646357, //流程id
		"sData":{},
		"fFlowSubmitEnd": function(res){
			if(res.jData.ret == '0'){
				TGDialogS('pop8');
				$("#pop8 .pop-close-btn").on("click",function(){
					location.href=homePage;
				});
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};

//创建队伍
function createTeam() {
	amsCfg_646356 = {
			'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
			"iActivityId": 287348, //活动id	
			"iFlowId":    646356, //流程id
			"sData":{},
			"fFlowSubmitEnd": function(res){
				if(res.jData.ret == '0'){
					myTeamId = res.jData.data.teamid;
					$("#selector1,#selector2").text(myTeamId);
					$("#selector3").text('https://dp.qq.com/cp/a20200110xngroup/index_wqm.html?teamid='+myTeamId);
					$("#my-team-code").show();// 我的队伍邀请码
					
					showTeamMembersInfo(0,sData.sHeadImg, sData.nickName, sData.areaName, isWhite, myScore);
					$(".wrap-2").addClass("join-status");//显示队友区域
				}else{
					alert(res.jData.msg);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//失败会走到这个函数
				//条件不满足，ame返回大于0是后走到这里
				alert(res.sMsg);
			}
		};
	amsCfg_646356.sData = sData;
	amsSubmit(287348,646356);
    
}

function showTeamMembersInfo(index, headimg, nickname, partition, iswhite, score){
	$(".team-list .team-item").eq(index).html("");
	var teammembersHTML = "";
	teammembersHTML += '<div class="pr bg avatar-wrap">';
	teammembersHTML += '<i class="pa bg avatar-cloud"></i>';
	teammembersHTML += '<div class="pr avatar-head" style="background-image: url(\''+headimg+'\');">';
	teammembersHTML += '</div>';
	if(iswhite == '1'){
		teammembersHTML += '<i class="pa icons return-icon"></i>';
	}
	teammembersHTML += '</div>';
	teammembersHTML += '<p class="user-msg-text t-c">'+nickname+'<br />'+partition+'<br />个人积分：'+score+'</p>';
	$(".team-list .team-item").eq(index).html(teammembersHTML);
}

//解散队伍
function breakRanks() {
    
	amsCfg_646359 = {
			'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
			"iActivityId": 287348, //活动id	
			"iFlowId":    646359, //流程id
			"sData":{},
			"fFlowSubmitEnd": function(res){
				if(res.jData.ret == '0'){
					myTeamId = 0;
					$(".wrap-2").removeClass("join-status");//隐藏队友区域
					$("#my-team-code").hide();// 我的队伍邀请码
					$(".team-list-wrap").hide();// 队伍列表区域
					$(".create-wrap").show();// 创建区域
				}else{
					alert(res.jData.msg);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//失败会走到这个函数
				//条件不满足，ame返回大于0是后走到这里
				alert(res.sMsg);
			}
		};
    amsCfg_646359.sData = sData;
    amsCfg_646359.sData.teamId = myTeamId;
	amsSubmit(287348,646359);
}

$(".team-item a").on("click",function(){
	if(sData.sArea == '1'){
		TGDialogS('pop4');
	}else{
		TGDialogS('pop-share');
	}
})
$(".push-team-btn").on("click",function(){
	if(sData.sArea == '1'){
		TGDialogS('pop5');
	}else{
		TGDialogS('pop9');
	}
});

//加入队伍 提交邀请码
function submitShareCode() {
    var code = $("#shareCode").val();
    if (code == '') return alert('请输入邀请码');
    amsCfg_646357.sData = sData;
	amsCfg_646357.sData.teamId = code;
	amsSubmit(287348,646357);
    
}

$("#lottery_645060,#lottery_645061,#lottery_645062,#lottery_645063,#lottery_645064,#lottery_645065,#lottery_645066,#lottery_645067,#lottery_645068,#lottery_645069,#lottery_645070").click(function(){
	var lotterydomidArr = $(this).attr("id").split('_');
	var liuchengid = lotterydomidArr[1];
	amsCfg_645060.sData = sData;
	amsCfg_645061.sData = sData;
	amsCfg_645062.sData = sData;
	amsCfg_645063.sData = sData;
	amsCfg_645064.sData = sData;
	amsCfg_645065.sData = sData;
	amsCfg_645066.sData = sData;
	amsCfg_645067.sData = sData;
	amsCfg_645068.sData = sData;
	amsCfg_645069.sData = sData;
	amsCfg_645070.sData = sData;
	amsSubmit(287348,liuchengid);
});

amsCfg_645060 = amsCfg_645061 = amsCfg_645062 = amsCfg_645063 = amsCfg_645064 = amsCfg_645065 = amsCfg_645066 = amsCfg_645067 = amsCfg_645068 = amsCfg_645069 = amsCfg_645070 = {
		'iAMSActivityId' : '287348', // AMS活动号
		'activityId' : '330193', // 模块实例号
		//可选扩展参数sData，
		"sData":{},
		'_everyRead' : true, //每次读取amsCfg_{moduleFunction_13}对象,默认是false
		'onBeginGetGiftEvent' : function(){
			return 0; // 抽奖前事件，返回0表示成功
		},
		'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
			alert(callbackObj.sMsg);
		},
		'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
			var str = "恭喜您获得了 " + callbackObj.sPackageName + " !";
			str += "请您注意查收！";
			alert(str);
			return;
		}
	};

$(".get-mission-btn,.get-akey-btn").on("click",function(){
	var taskid = $(this).attr("taskid");
	sData.taskid = taskid;
	
	amsCfg_643966 = {
			'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
			"iActivityId": 287348, //活动id	
			"iFlowId":    643966, //流程id
			"sData":{},
			"fFlowSubmitEnd": function(res){
				if(res.jData.ret == '0'){
					if(memberNums >1){
						$(".team-score").text('小队累积积分：'+teamScore);
					}
					$(".personage-count-text").text('个人积分:'+myScore);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//失败会走到这个函数
				//条件不满足，ame返回大于0是后走到这里
				if(res.sMsg == '0'){
					if(taskid == '10'){
						alert('还没有完成的任务~！');
					}else{
						alert('还未完成该任务~！');
					}
				}else{
					alert(res.sMsg);
				}
			}
		};
	amsCfg_643966.sData = sData;
	amsSubmit(287348,643966);
});

var sharedata = {
	'title' : '蛮荒古城 全新玩法',
	'desc' : '玩《斗破苍穹手游》,参与蛮荒古城 全新玩法,女魂族登场。',
	'img' : window.location.protocol + '//game.gtimg.cn/images/dp/cp/a20190221hmdlm/logo.png'
};

if (isWeiXin()) {
	// 微信分享
	need("biz.wxclient", function(WXClient)
	{
		// 微信客户初始化成功后，返回wx对象
		WXClient.init({
			"sAppId" : "wxfeb5a65212da517c"
		}, function(wx)
		{
			// 分享用的信息对象
			var shareObj = {
				title : sharedata.title,
				desc : sharedata.desc,
				link : homePage,
				imgUrl : sharedata.img,
				actName : "a20190415jzsm",// 点击流命名
				success : function(sres)
				{
				},
				cancel : function(sres)
				{
				}
			}
			// 为发送给好友、分享到朋友圈、分享到QQ、分享到微博同时绑定分享事件
			WXClient.shareAll(shareObj);
		});
	});

} else {
	// 分享
	TGMobileShare({
		shareTitle : sharedata.title, // 不设置或设置为空时，页面有title，则调取title
		shareDesc : sharedata.desc, // 不设置或设置为空时，页面有Description，则调取Description
		shareImgUrl : sharedata.img, // 分享图片尺寸200*200，且填写绝对路径
		shareLink : homePage, // 分享链接要跟当前页面同域名(手Q分享有这个要求)
		// ,不设置或设置为空时，默认调取当前URL
		actName : 'a20180914lotteryig', // 点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
		onShare : {
			WXToMessageSuccess : function()
			{
				return true;
			},
			// WXToMessageCancel:function(){alert('【取消】分享给微信好友！')},
			WXToTimelineSuccess : function()
			{
				return true;
			},
			// WXToTimelineCancel:function(){alert('【取消】分享给微信朋友圈！')},
			QQToQQSuccess : function()
			{
				return true;
			},
			// QQToQQCancel:function(){alert('【取消】分享给QQ好友！')},
			QQToQzoneSuccess : function()
			{
				return true;
			},
			QQToQzoneCancel : function()
			{
				return true;
			},
			QQToMessageSuccess : function()
			{
				return true;
			},
			// QQToMessageCancel:function(){alert('【取消】分享给微信好友！')},
			QQToTimelineSuccess : function()
			{
				return true;
			},
		}
	});
}

function qqLogin()
{
	need("biz.login", function(LoginManager)
	{
		LoginManager.checkLogin(function(userinfo)
		{

		}, function()
		{
			var UA = navigator.userAgent;
			var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? QQ\/([\d\.]+)/;
			var REGEXP_ANDROID_QQ = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
			if (!REGEXP_IOS_QQ.test(UA) && !REGEXP_ANDROID_QQ.test(UA)) {
				setTimeout(function()
				{
					window.location.href = 'mqqapi://forward/url?url_prefix=' + btoa(homePage + "?_wv=49957") + "&version=1&src_type=web";
				}, 200);
			} else {
				window.location.href = homePage + '?_wv=49957&type=qq';
			}

		});
	});
}

// 微信登录
function wxLogin()
{
	if (isWeiXin()) {
		window.location.href = homePage;
	} else {
		window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90239290&appid=wx0d3cc3a6e9f20276&url=https%3A%2F%2Fdp.qq.com%2Fcp%2Fa20190415jzsm%2Fjzz_wqm.shtml";
	}
}

var sServiceType = 'dp';
var isLogin = false;
var sData = {};
var _server_url = '';
var title, desc = '';
var actName = 'a20191225dqdlm';

var appid = 'wx1cd4fbe9335888fe';
var wx_appid = 'wx0d3cc3a6e9f20276';
var qq_appid = '1106295984';
var sData = {};
var sArea = '', sPlatId = '';
var homePage = window.location.protocol + '//dp.qq.com/cp/a20191225dqdlm/index.htm';
var strLink = homePage;
var ua = window.navigator.userAgent.toLowerCase();

function isIos() {
	return /iphone|ipod|ipad/i.test(ua);
}

function isAndroid() {
	return /android/i.test(ua);
}
sPlatId = isIos() ? '0' : (isAndroid() ? '1' : '');

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
if (isWeiXin()) {
	homePage = homePage + '?appid=wx1cd4fbe9335888fe&acctype=wx';
	$("#channelContentId").html("<option value='1' checked></option>")
} else {
	$("#channelContentId").html("<option value='2' checked></option>")
}

var _server_url = '';
if (isWeiXin()) {
	_server_url = location.protocol + '//dp.qq.com/comm-htdocs/js/game_area/dp_WX_server_select.js';
} else {
	_server_url = location.protocol + '//dp.qq.com/comm-htdocs/js/game_area/dp_SQ_server_select.js';
}
window.ams_login_avoid_conflict = true;
milo.ready(function() {
	include(_server_url + "?_rand=" + Math.random(), function() {
		need(["biz.roleselector"], function(RoleSelector) {
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
				"submitEvent" : function(roleObj) {
					// console.log(JSON.stringify(roleObj.submitData));

					sData.sArea = roleObj.submitData.areaid;
					sData.sPlatId = roleObj.submitData.sPlatId;
					sData.sPartition = roleObj.submitData.sPartition;
					sData.sRoleId = roleObj.submitData.roleid;
					sData.sRoleName = encodeURIComponent(roleObj.submitData.rolename);
					sData.user_areaName = encodeURIComponent(roleObj.submitData.areaname);
					sData.sPartitionName = sData.user_areaName;
					sData.md5str = roleObj.submitData.md5str;
					sData.checkparam = roleObj.submitData.checkparam;
					sData.ams_checkparam = roleObj.submitData.checkparam;

					closeDialog();
					
					amsCfg_634541.sData = sData;
					amsSubmit(279820,634541);
				}
			});
			roleobj.show();
		});
	});
	
	amsCfg_634541 = {
			'iAMSActivityId' : '279820', // AMS活动号
			'activityId' : '326312', // 模块实例号
			'sData':{},
			'_everyRead' : true, //每次读取amsCfg_634541对象,默认是false
			'onBeginGetGiftEvent' : function(){
				return 0; // 抽奖前事件，返回0表示成功
			},
			'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
				alert(callbackObj.sMsg);
			},
			'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
				btnFlag = 1;
				alert(callbackObj.sMsg);
			}
		};

	need("biz.login", function(LoginManager) {
		LoginManager.checkLogin(function(userinfo) {
			isLogin = true;
			var acctype = milo.cookie.get("acctype");
			if (isWeiXin() && acctype != 'wx' || (isQQ() && acctype == 'wx')) {
				LoginManager.logout({
					logoutCallback : function() {
						location.reload(true);
					}
				})
				return;
			} else {
				if (isWeiXin()) {
					console.log('isWeiXin');
					sData = {
						'appid' : appid,
						'sArea' : '1',
						"sPlatId" : sPlatId,
						'sServiceType' : "txsyhdh",
						"ams_targetappid" : wx_appid
					};

					LoginManager.getUserInfoByWxOpenId({
						"openid" : milo.cookie.get("openid"),
						"access_token" : milo.cookie.get("access_token")
					}, function(wxuser) {
						nickname = wxuser.nickname;
						nickname = nickname.replace(/<span.*?><\/span>/g, '');
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
						'sServiceType' : 'dp'
					};

				}
				amsCfg_635053.sData = sData;
				amsSubmit(279820,635053);
			}
		}, function() {
			if (isWeiXin()) {// 未登录时微信内打开活动进行微信授权
				LoginManager.loginByWX({
					redirect_wx_url : location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(homePage)// 回调url
				});
			} else if (isQQ()) {
				LoginManager.login();
			} else {
				$(".btn-xzlq").on("click",function(){
					alert('转发至微信、QQ即可参与活动，获取礼包哦~');
				})
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

var btnFlag = 0;
amsCfg_635053 = {
		'_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
		"iActivityId": 279820, //活动id	
		"iFlowId":    635053, //流程id
		"sData":{},
		"fFlowSubmitEnd": function(res){
			btnFlag = res.sOutValue1;
			return;
		},
		"fFlowSubmitFailed":function(res){
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};

$(".btn-xzlq").on("click",function(){
	if(checkIsLogin()){
		if(btnFlag!=0){
			alert('已领取过该礼包~！');
		}else{
			TGDialogS('pop5');
		}	
	}
})

function checkIsLogin() {
	if (isLogin === false) {
		TGDialogS('pop4');
		return false;
	} else {
		return true;
	}
}
function HTMLDecode(input) {
	var converter = document.createElement("DIV");
	converter.innerHTML = input;
	var output = converter.innerText;
	converter = null;
	return output;
}


function shareFun(strLink) {
	var shareImgUrl = '//game.gtimg.cn/images/dp/cp/a20191225dqdlm/m/share.jpg';
	// 分享
	console.log('title:' + title);
	console.log('desc:' + desc);
	console.log('link:' + strLink);
	if (isQQ()) {
		var shareObjTM = {
			img_url : shareImgUrl,
			img_width : "120",
			img_height : "120",
			qqShareLink : strLink,
			wxShareLink : strLink,
			desc : desc,
			title : title
		};

		TGMobileShare({
			shareTitle : shareObjTM.title,
			shareDesc : shareObjTM.desc,
			shareImgUrl : shareObjTM.img_url,
			shareLink : shareObjTM.qqShareLink,
			actName : actName,
			onInit : function(tgms) {
			},
			onShare : {
				WXToMessageSuccess : function() {
					PTTSendClick('btn', actName + '.qqshare', 'success')
					
				},
				WXToMessageCancel : function() {
				},
				WXToTimelineSuccess : function() {
					PTTSendClick('btn', actName + '.qqshare', 'success')
					
				},
				WXToTimelineCancel : function() {
				},
				QQToQQSuccess : function() {
					PTTSendClick('btn', actName + '.qqshare', 'success')
					
				},
				QQToQQCancel : function() {
				},
				QQToQzoneSuccess : function() {
					PTTSendClick('btn', actName + '.qqshare', 'success')
					
				},
				QQToQzoneCancel : function() {
				},
				QQToMessageSuccess : function() {
					PTTSendClick('btn', actName + '.qqshare', 'success')
					
				},
				QQToMessageCancel : function() {
				},
				QQToTimelineSuccess : function() {
					PTTSendClick('btn', actName + '.qqshare', 'success')
					
				},
				QQToTimelineCancel : function() {
				}
			}
		});

	} else {
		// 微信分享
		need("biz.wxclient", function(WXClient) {
			// 微信客户初始化成功后，返回wx对象
			WXClient.init({
				"sAppId" : "wxfeb5a65212da517c"
			}, function(wx) {
				// 分享用的信息对象
				var shareObj = {
					title : title,
					desc : desc,
					link : strLink,
					imgUrl : shareImgUrl,
					actName : actName,// 点击流命名
					success : function(sres) {
						PTTSendClick('btn', actName + '.wxshare', 'success');
					},
					cancel : function(sres) {
						PTTSendClick('btn', actName + '.wxshare', 'cancel');
						popHide();
					}
				}
				// 为发送给好友、分享到朋友圈、分享到QQ、分享到微博同时绑定分享事件
				WXClient.shareAll(shareObj);
			});
		});
	}
}
title = "斗气大陆燃情公测-《斗破苍穹手游》";
desc = "玩《斗破苍穹手游》，惊艳古族.灵剑登场，浪漫结婚系统开放。";
shareFun(strLink);

function qqLogin() {
	need("biz.login", function(LoginManager) {
		LoginManager.checkLogin(function(userinfo) {

		}, function() {
			var UA = navigator.userAgent;
			var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? QQ\/([\d\.]+)/;
			var REGEXP_ANDROID_QQ = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
			if (!REGEXP_IOS_QQ.test(UA) && !REGEXP_ANDROID_QQ.test(UA)) {
				setTimeout(function() {
					window.location.href = 'mqqapi://forward/url?url_prefix=' + btoa(homePage + "?_wv=49957") + "&version=1&src_type=web";
				}, 200);
			} else {
				window.location.href = homePage + '?_wv=49957&type=qq';
			}

		});
	});
}

// 微信登录
function wxLogin() {
	if (isWeiXin()) {
		window.location.href = homePage;
	} else {
		//window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90236925&appid=wx0d3cc3a6e9f20276&url=https%3A%2F%2Fdp.qq.com%2Fcp%2Fa20191212send%2Findex_wqm.html";
		alert('请斗者复制链接到微信中打开~！')
	}
}
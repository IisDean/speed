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
	// �ж��Ƿ���IOSQQ ���� AndroidQQ��
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
					"sAMSTrusteeship" : 1, // �̶�
					"ams_targetappid" : wx_appid
				// Ҫת����Ϸҵ��appid
				},
				"type" : "html",
				"gameId" : "dp", // ����
				"isQueryRole" : true,
				"area1ContentId" : "", // ���Ϊ2�����������ֵ��������
				"areaContentId" : "areaContentId", // С���������ID(sPartition��Ӧ��������)
				"channelContentId" : "channelContentId", // ѡ����Q��΢���������ID
				"systemContentId" : "systemContentId", // ѡ��IOS ��׿�������ID
				"roleContentId" : "roleContentId", // ��ɫѡ����ID
				"confirmButtonId" : "doSubmit", // ȷ����ť��ID
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
			'iAMSActivityId' : '279820', // AMS���
			'activityId' : '326312', // ģ��ʵ����
			'sData':{},
			'_everyRead' : true, //ÿ�ζ�ȡamsCfg_634541����,Ĭ����false
			'onBeginGetGiftEvent' : function(){
				return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
			},
			'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
				alert(callbackObj.sMsg);
			},
			'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
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
			if (isWeiXin()) {// δ��¼ʱ΢���ڴ򿪻����΢����Ȩ
				LoginManager.loginByWX({
					redirect_wx_url : location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(homePage)// �ص�url
				});
			} else if (isQQ()) {
				LoginManager.login();
			} else {
				$(".btn-xzlq").on("click",function(){
					alert('ת����΢�š�QQ���ɲ�������ȡ���Ŷ~');
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
		'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
		"iActivityId": 279820, //�id	
		"iFlowId":    635053, //����id
		"sData":{},
		"fFlowSubmitEnd": function(res){
			btnFlag = res.sOutValue1;
			return;
		},
		"fFlowSubmitFailed":function(res){
			//ʧ�ܻ��ߵ��������
			//���������㣬ame���ش���0�Ǻ��ߵ�����
			alert(res.sMsg);
		}
	};

$(".btn-xzlq").on("click",function(){
	if(checkIsLogin()){
		if(btnFlag!=0){
			alert('����ȡ�������~��');
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
	// ����
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
		// ΢�ŷ���
		need("biz.wxclient", function(WXClient) {
			// ΢�ſͻ���ʼ���ɹ��󣬷���wx����
			WXClient.init({
				"sAppId" : "wxfeb5a65212da517c"
			}, function(wx) {
				// �����õ���Ϣ����
				var shareObj = {
					title : title,
					desc : desc,
					link : strLink,
					imgUrl : shareImgUrl,
					actName : actName,// ���������
					success : function(sres) {
						PTTSendClick('btn', actName + '.wxshare', 'success');
					},
					cancel : function(sres) {
						PTTSendClick('btn', actName + '.wxshare', 'cancel');
						popHide();
					}
				}
				// Ϊ���͸����ѡ���������Ȧ������QQ������΢��ͬʱ�󶨷����¼�
				WXClient.shareAll(shareObj);
			});
		});
	}
}
title = "������½ȼ�鹫��-�����Ʋ�����Ρ�";
desc = "�桶���Ʋ�����Ρ������޹���.�齣�ǳ����������ϵͳ���š�";
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

// ΢�ŵ�¼
function wxLogin() {
	if (isWeiXin()) {
		window.location.href = homePage;
	} else {
		//window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90236925&appid=wx0d3cc3a6e9f20276&url=https%3A%2F%2Fdp.qq.com%2Fcp%2Fa20191212send%2Findex_wqm.html";
		alert('�붷�߸������ӵ�΢���д�~��')
	}
}
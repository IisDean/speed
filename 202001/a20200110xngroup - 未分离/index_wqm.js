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
						
						// ��ѯ�Ƿ��
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
					
					// ��ѯ�Ƿ��
					amsCfg_643992.sData = sData;
					amsInit(287348, 643992);
				}

				isLogin = true;
				$("#login-txt1").hide();
				$("#login-txt2").show();
			}
		}, function()
		{
			if (isWeiXin()) {// δ��¼ʱ΢���ڴ򿪻����΢����Ȩ
				LoginManager.loginByWX({
					redirect_wx_url : location.protocol + "//iu.qq.com/wxauth/redirect.html?url=" + encodeURIComponent(homePage)// �ص�url
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

// ��ѯ�Ƿ�󶨵�����
amsCfg_643992={
    type : "query",
	iQueryFlowID:643991,
	success : function(bindedInfo)
	{
		// �Ѱ�ʱ����չ����
		isBind = true;
		
		// ��ʼ��
		sData.sArea = bindedInfo.jData.data.Farea; //������ID
		sData.sPlatId = bindedInfo.jData.data.FplatId; //ϵͳID
		sData.sRoleId = bindedInfo.jData.data.FroleId; //��ɫID
		sData.sPartition = bindedInfo.jData.data.FPartition; //����ID
		sData.sRoleName = bindedInfo.jData.data.FroleName;//��ɫ����
		sData.nickName = decodeURIComponent(sData.sRoleName);
		sData.areaName = decodeURIComponent(bindedInfo.jData.data.FareaName);
		
		$("#login-txt2 span").text(milo.xss.filter(decodeURIComponent(bindedInfo.jData.data.FareaName))+'��'+milo.xss.filter(decodeURIComponent(sData.sRoleName)));
		$("#login-txt2 a").text('�л���');
		
		amsCfg_646358.sData = sData;
		amsSubmit(287348,646358);
	},
	failure : function()
	{
		// δ��ʱ����չ����
		isBind = false;
		TGDialogS('pop2');
	}
};

// �ύ�󶨵�����
amsCfg_643991={
    type : "comit",
    needPopupRole:false,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID:643992,
	service : "dp",
	sData:{},
	success : function(bindedInfo)
	{
		closeDialog();
		
		// �Ѱ�ʱ����չ����
		isBind = true;
		
		// ��ʼ��
		// ��ѯ����������а�32ǿ
		sData.sArea = bindedInfo.jData.data.Farea; //������ID
		sData.sPlatId = bindedInfo.jData.data.FplatId; //ϵͳID
		sData.sRoleId = bindedInfo.jData.data.FroleId; //��ɫID
		sData.sPartition = bindedInfo.jData.data.FPartition; //����ID
		sData.sRoleName = bindedInfo.jData.data.FroleName;//��ɫ����
		sData.nickName = decodeURIComponent(sData.sRoleName);
		sData.areaName = decodeURIComponent(bindedInfo.jData.data.FareaName);
		
		$("#login-txt2 span").text(milo.xss.filter(decodeURIComponent(bindedInfo.jData.data.FareaName))+'��'+milo.xss.filter(decodeURIComponent(sData.sRoleName)));
		$("#login-txt2 a").text('�л���');
		
		amsCfg_646358.sData = sData;
		amsSubmit(287348,646358);

		closeDialog();
	},
	failure : function()
	{
		// δ��ʱ����չ����
		isBind = false;
	}
};

var lotteryZG = taskZG = 0;
var myTeamId = 0;
var myScore = 0;
var memberNums = 0;
var teamScore = 0;
amsCfg_646358 = {
		'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
		"iActivityId": 287348, //�id	
		"iFlowId":    646358, //����id
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
				$(".personage-count-text").text('���˻���:'+myScore);
				
				showLotteryStatus(lotteryZG);
				showTaskStatus(taskZG);
				
				if(res.jData.teamid != '0'){
					myTeamId = res.jData.teamid;
					//��ʾ��������
					$(".create-wrap").hide();
					
					var memberList = res.jData.teamData;
					for(var i in memberList){
						memberNums ++;
						teamScore = teamScore+parseInt(memberList[i].score);
						showTeamMembersInfo(i,memberList[i].headimg, memberList[i].rolename, memberList[i].areaname, memberList[i].isWhite, memberList[i].score);
					}
					
					if(memberNums >1){
						$(".team-score").text('С���ۻ����֣�'+teamScore);
					}
					$("#selector1,#selector2").text(myTeamId);
					$("#selector3").text('https://dp.qq.com/cp/a20200110xngroup/index_wqm.html?teamid='+myTeamId);
					$("#my-team-code").show();// �ҵĶ���������
					$(".wrap-2").addClass("join-status");
					$(".team-list-wrap").show();
				}else{
					if(teamid){
						amsCfg_646360 = {
								'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
								"iActivityId": 287348, //�id	
								"iFlowId":    646360, //����id
								"sData":{},
								"fFlowSubmitEnd": function(res){
									if(res.jData.ret == '0'){
										$(".confirm-join-text").text('�����ڼ���'+res.jData.data[0].areaname+'��'+res.jData.data[0].rolename+'�Ķ��飬һ�����뽫���ɸ������飬�����Ƿ���룿');
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
									//ʧ�ܻ��ߵ��������
									//���������㣬ame���ش���0�Ǻ��ߵ�����
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
			//ʧ�ܻ��ߵ��������
			//���������㣬ame���ش���0�Ǻ��ߵ�����
			alert(res.sMsg);
		}
	};

function showLotteryStatus(zg){
	
}
function showTaskStatus(zg){
	
}

amsCfg_646357 = {
		'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
		"iActivityId": 287348, //�id	
		"iFlowId":    646357, //����id
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
			//ʧ�ܻ��ߵ��������
			//���������㣬ame���ش���0�Ǻ��ߵ�����
			alert(res.sMsg);
		}
	};

//��������
function createTeam() {
	amsCfg_646356 = {
			'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
			"iActivityId": 287348, //�id	
			"iFlowId":    646356, //����id
			"sData":{},
			"fFlowSubmitEnd": function(res){
				if(res.jData.ret == '0'){
					myTeamId = res.jData.data.teamid;
					$("#selector1,#selector2").text(myTeamId);
					$("#selector3").text('https://dp.qq.com/cp/a20200110xngroup/index_wqm.html?teamid='+myTeamId);
					$("#my-team-code").show();// �ҵĶ���������
					
					showTeamMembersInfo(0,sData.sHeadImg, sData.nickName, sData.areaName, isWhite, myScore);
					$(".wrap-2").addClass("join-status");//��ʾ��������
				}else{
					alert(res.jData.msg);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//ʧ�ܻ��ߵ��������
				//���������㣬ame���ش���0�Ǻ��ߵ�����
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
	teammembersHTML += '<p class="user-msg-text t-c">'+nickname+'<br />'+partition+'<br />���˻��֣�'+score+'</p>';
	$(".team-list .team-item").eq(index).html(teammembersHTML);
}

//��ɢ����
function breakRanks() {
    
	amsCfg_646359 = {
			'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
			"iActivityId": 287348, //�id	
			"iFlowId":    646359, //����id
			"sData":{},
			"fFlowSubmitEnd": function(res){
				if(res.jData.ret == '0'){
					myTeamId = 0;
					$(".wrap-2").removeClass("join-status");//���ض�������
					$("#my-team-code").hide();// �ҵĶ���������
					$(".team-list-wrap").hide();// �����б�����
					$(".create-wrap").show();// ��������
				}else{
					alert(res.jData.msg);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//ʧ�ܻ��ߵ��������
				//���������㣬ame���ش���0�Ǻ��ߵ�����
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

//������� �ύ������
function submitShareCode() {
    var code = $("#shareCode").val();
    if (code == '') return alert('������������');
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
		'iAMSActivityId' : '287348', // AMS���
		'activityId' : '330193', // ģ��ʵ����
		//��ѡ��չ����sData��
		"sData":{},
		'_everyRead' : true, //ÿ�ζ�ȡamsCfg_{moduleFunction_13}����,Ĭ����false
		'onBeginGetGiftEvent' : function(){
			return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
		},
		'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
			alert(callbackObj.sMsg);
		},
		'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
			var str = "��ϲ������� " + callbackObj.sPackageName + " !";
			str += "����ע����գ�";
			alert(str);
			return;
		}
	};

$(".get-mission-btn,.get-akey-btn").on("click",function(){
	var taskid = $(this).attr("taskid");
	sData.taskid = taskid;
	
	amsCfg_643966 = {
			'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
			"iActivityId": 287348, //�id	
			"iFlowId":    643966, //����id
			"sData":{},
			"fFlowSubmitEnd": function(res){
				if(res.jData.ret == '0'){
					if(memberNums >1){
						$(".team-score").text('С���ۻ����֣�'+teamScore);
					}
					$(".personage-count-text").text('���˻���:'+myScore);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//ʧ�ܻ��ߵ��������
				//���������㣬ame���ش���0�Ǻ��ߵ�����
				if(res.sMsg == '0'){
					if(taskid == '10'){
						alert('��û����ɵ�����~��');
					}else{
						alert('��δ��ɸ�����~��');
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
	'title' : '���Ĺų� ȫ���淨',
	'desc' : '�桶���Ʋ�����Ρ�,�������Ĺų� ȫ���淨,Ů����ǳ���',
	'img' : window.location.protocol + '//game.gtimg.cn/images/dp/cp/a20190221hmdlm/logo.png'
};

if (isWeiXin()) {
	// ΢�ŷ���
	need("biz.wxclient", function(WXClient)
	{
		// ΢�ſͻ���ʼ���ɹ��󣬷���wx����
		WXClient.init({
			"sAppId" : "wxfeb5a65212da517c"
		}, function(wx)
		{
			// �����õ���Ϣ����
			var shareObj = {
				title : sharedata.title,
				desc : sharedata.desc,
				link : homePage,
				imgUrl : sharedata.img,
				actName : "a20190415jzsm",// ���������
				success : function(sres)
				{
				},
				cancel : function(sres)
				{
				}
			}
			// Ϊ���͸����ѡ���������Ȧ������QQ������΢��ͬʱ�󶨷����¼�
			WXClient.shareAll(shareObj);
		});
	});

} else {
	// ����
	TGMobileShare({
		shareTitle : sharedata.title, // �����û�����Ϊ��ʱ��ҳ����title�����ȡtitle
		shareDesc : sharedata.desc, // �����û�����Ϊ��ʱ��ҳ����Description�����ȡDescription
		shareImgUrl : sharedata.img, // ����ͼƬ�ߴ�200*200������д����·��
		shareLink : homePage, // ��������Ҫ����ǰҳ��ͬ����(��Q���������Ҫ��)
		// ,�����û�����Ϊ��ʱ��Ĭ�ϵ�ȡ��ǰURL
		actName : 'a20180914lotteryig', // ���������������ͳ�Ʒ�������ר��һ�����Ŀ¼������a20151029demo
		onShare : {
			WXToMessageSuccess : function()
			{
				return true;
			},
			// WXToMessageCancel:function(){alert('��ȡ���������΢�ź��ѣ�')},
			WXToTimelineSuccess : function()
			{
				return true;
			},
			// WXToTimelineCancel:function(){alert('��ȡ���������΢������Ȧ��')},
			QQToQQSuccess : function()
			{
				return true;
			},
			// QQToQQCancel:function(){alert('��ȡ���������QQ���ѣ�')},
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
			// QQToMessageCancel:function(){alert('��ȡ���������΢�ź��ѣ�')},
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

// ΢�ŵ�¼
function wxLogin()
{
	if (isWeiXin()) {
		window.location.href = homePage;
	} else {
		window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90239290&appid=wx0d3cc3a6e9f20276&url=https%3A%2F%2Fdp.qq.com%2Fcp%2Fa20190415jzsm%2Fjzz_wqm.shtml";
	}
}

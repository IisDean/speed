var isLogin = isBind = false;
var appid = 'wx1cd4fbe9335888fe';
var wx_appid = 'wx780e9d6f0c1bbc7a';
var qq_appid = '1104680867';
var sData = {};
var sData = {};
var sArea = '', sPlatId = '';
var homePage = window.location.protocol + '//ylzt.qq.com/cp/a20200330qmjc/index_wqm.html';
var strLink = window.location.protocol + '//ylzt.qq.com/cp/a20200330qmjc/index_wqm.html';
var ua = window.navigator.userAgent.toLowerCase();
var money = 0;

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
	_server_url = location.protocol + '//gameact.qq.com/comm-htdocs/js/game_area/ylzt_WX_server_select.js';
} else {
	_server_url = location.protocol + '//gameact.qq.com/comm-htdocs/js/game_area/ylzt_SQ_server_select.js';
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
				"gameId" : "ylzt", // ����
				"isQueryRole" : true,
				"area1ContentId" : "", // ���Ϊ2�����������ֵ��������
				"areaContentId" : "areaContentId", // С���������ID(sPartition��Ӧ��������)
				"channelContentId" : "channelContentId", // ѡ����Q��΢���������ID
				"systemContentId" : "systemContentId", // ѡ��IOS ��׿�������ID
				"roleContentId" : "roleContentId", // ��ɫѡ����ID
				"confirmButtonId" : "doSubmit", // ȷ����ť��ID
				"submitEvent" : function(roleObj)
				{
					isBind = true;
					sData.sArea = roleObj.submitData.areaid;
					sData.sPlatId = roleObj.submitData.sPlatId;
					sData.sPartition = roleObj.submitData.sPartition;
					sData.sRoleId = roleObj.submitData.roleid;
					sData.sRoleName = encodeURIComponent(roleObj.submitData.rolename);
					sData.md5str = roleObj.submitData.md5str;
					sData.checkparam = roleObj.submitData.checkparam;
					sData.ams_checkparam = roleObj.submitData.checkparam;

					amsCfg_659472.sData = sData;
					amsInit(299949, 659472);
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
						$("#login-name").text(milo.xss.filter(nickname));
					});

					sData = sData = {
						'appid' : appid,
						'sArea' : '1',
						"sPlatId" : sPlatId,
						'sServiceType' : "txsyhdh",
						"ams_targetappid" : wx_appid,
					};
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
					nickname = LoginManager.getNickName();
					nickname = nickname.replace(/<span.*?><\/span>/g, '');
					$("#login-name").text(milo.xss.filter(nickname));
				}

				isLogin = true;
				$("#login-txt1").hide();
				$("#login-txt2").show();
			}

			sData.zqid = 1;

			// ��ѯ�Ƿ��
			amsCfg_659473.sData = sData;
			amsInit(299949, 659473);
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

var total = num = 0;
var taskInfo = {};
var packageGroupIdList = '';

// ��ѯ�Ƿ�󶨵�����
amsCfg_659473 = {
	type : "query",
	iQueryFlowID : 659472,
	success : function(bindedInfo)
	{
		// �Ѱ�ʱ����չ����
		isBind = true;
		
		// ��ʼ��
		// ��ѯ����������а�32ǿ
		sData.sArea = bindedInfo.jData.data.Farea; //������ID
		sData.sPlatId = bindedInfo.jData.data.FplatId; //ϵͳID
		sData.sRoleId = bindedInfo.jData.data.FroleId; //��ɫID
		sData.sPartition = bindedInfo.jData.data.FPartition; //����ID
		sData.sRoleName = bindedInfo.jData.data.FroleName;//��ɫ����
		
		amsCfg_659476.sData = sData;
		amsSubmit(299949, 659476);
	},
	failure : function()
	{
		// δ��ʱ����չ����
		isBind = false;
		openDialog('pop2');
	}
};

// �ύ�󶨵�����
amsCfg_659472 = {
	type : "comit",
	sData : {},
	needPopupRole : false,// �Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
	roleInfo : null,// ���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
	iQueryFlowID : 659473,
	service : "dp",
	success : function(bindedInfo)
	{
		// �Ѱ�ʱ����չ����
		isBind = true;

		// ��ʼ��
		// ��ѯ����������а�32ǿ
		sData.sArea = bindedInfo.jData.data.Farea; //������ID
		sData.sPlatId = bindedInfo.jData.data.FplatId; //ϵͳID
		sData.sRoleId = bindedInfo.jData.data.FroleId; //��ɫID
		sData.sPartition = bindedInfo.jData.data.FPartition; //����ID
		sData.sRoleName = bindedInfo.jData.data.FroleName;//��ɫ����
		
		location.reload();
	
		closeDialog();
	},
	failure : function()
	{
		// δ��ʱ����չ����
		isBind = false;
	}
};

Math.formatFloat = function (f, digit) {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
}

var guessData = {};

//����л�ս��
$('#swiper-container1 .swiper-slide').click(function(event)
{
	$(this).addClass('on').siblings('.swiper-slide').removeClass('on');
	if(parseInt($(this).index())>=0){
		amsCfg_659476.sData.zqid = parseInt($(this).index())+1;
		if(guessData[amsCfg_659476.sData.zqid] != '1'){
			amsSubmit(299949, 659476);
		}else{
			$('.list .content').eq(parseInt($(this).index())).addClass('current').siblings('.content').removeClass('current');
		}
	}
});

// ����
amsCfg_659732 = {
		'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
		"iActivityId": 299949, //�id	
		"iFlowId":    659732, //����id
		"sData":{},
		'_everyRead' : true, //ÿ�ζ�ȡamsCfg_{moduleFunction_13}����,Ĭ����false
		"fFlowSubmitEnd": function(res){
			if(res.jData.ret == '0'){
				money = money - parseInt(amsCfg_659732.sData.money);
				$(".ticket span").text(money);
				openDialog('pop7');
			}else{
				if(res.jData.ret == '2'){
					openDialog('pop8');
				}else{
					alert(res.jData.msg);
				}
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
			//ʧ�ܻ��ߵ��������
			//���������㣬ame���ش���0�Ǻ��ߵ�����
			alert(res.sMsg);
		}
	};

$(".history").on("click",function(){
	amsCfg_659738.sData = sData;
	amsSubmit(299949,659738);
});

// ������ʷ
amsCfg_659738 = {
		'_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
		"iActivityId": 299949, //�id	
		"iFlowId":    659738, //����id
		"sData":{},
		'_everyRead' : true, //ÿ�ζ�ȡamsCfg_{moduleFunction_13}����,Ĭ����false
		"fFlowSubmitEnd": function(res){
			if(res.jData.ret == '0'){
				if(res.jData.guessData == ''){
					$("#pop6 .head-title,#pop6 .support-history,#pop6 .page").hide();
					$("#pop6 .no-history").show();
				}else{
					$("#pop6 .support-history").html("");
					var html = "";
					console.log(res.jData.guessData.length)
					
					var zqName = {
						1:'��ޱ',
						2:'���',
						3:'̫��',
						4:'����',
						5:'��ͬ'
					};
					
					if(res.jData.winData == ''){
						for(var i in res.jData.guessData){
							html += '<li><span>'+(zqName[parseInt(milo.xss.filter(res.jData.guessData[i].zqid))])+'ս��</span> <span>'+milo.xss.filter(res.jData.guessData[i].jname)+'</span> <span>1:'+milo.xss.filter(res.jData.guessData[i].bl)+'</span> <span>-</span></li>';
						}
						$("#pop6 .support-history").html(html);
					}else{
						for(var i in res.jData.guessData){
							html += '<li><span>'+(zqName[parseInt(milo.xss.filter(res.jData.guessData[i].zqid))])+'ս��</span> <span>'+milo.xss.filter(res.jData.guessData[i].jname)+'</span> <span>1:'+milo.xss.filter(res.jData.guessData[i].bl)+'</span>';
							if(res.jData.winData[res.jData.guessData[i].zqid] == res.jData.guessData[i].jname){
								html += '<span>ʤ</span></li>';
							}else{
								html += '<span>��</span></li>';
							}
							
						}
						$("#pop6 .support-history").html(html);
					}
					
				}
				
				need("util.ajaxpage",function(jo){
					AjaxPage.StaticPage({
						'pageSize' : 4,
						style : 135,
						'contentId' : 'mul',
						'pageId' : 'listPage'
					});
				});

				
				openDialog('pop6');
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

// ��ʼ��
amsCfg_659476 = {
	"iActivityId" : 299949, // �id
	"iFlowId" : 659476, // ����id
	"sData" : {},
	"fFlowSubmitEnd" : function(res)
	{
		if (res.jData.ret == '0') {
			// �ҵĽ�Ʊ
			money = res.jData.money;
			$(".ticket span").text(money);

			var usedNums = res.jData.usedNums.split(",");
			for ( var i in usedNums) {
				if (usedNums[i] == '1') {
					$('.btn-get').eq(i).addClass("on");
				}
			}

			var used2Nums = res.jData.used2Nums.split(",");
			for ( var i in used2Nums) {
				if (used2Nums[i] != '0') {
					var xl_obj = $('.prize-box-2 .prize').eq(i).find(".nums").find("span");
					var xl_num_arr = xl_obj.text().split("/");
					if (parseInt(used2Nums[i]) >= parseInt(xl_num_arr[1])) {
						$('.btn-exchange').eq(i).addClass("on");
					}
					xl_obj.text(used2Nums[i] + '/' + xl_num_arr[1]);
				}
			}

			if(amsCfg_659476.sData.zqid == '1'){
				money = res.jData.money;
				$(".ticket span").text(money);
			}
			
			$('.list .content').eq(parseInt(amsCfg_659476.sData.zqid)-1).addClass('current').siblings('.content').removeClass('current');
			
			var obj = $('.list .content').eq(parseInt(amsCfg_659476.sData.zqid)-1);
			if(res.jData.jzzData!=''){
				obj.find(".waiting").hide();
				obj.find(".opening").html("");
				var html = ""; 
				html += '<ul>';
				html += '<li class="title-li"><span>������</span> <span>�ϴ���</span> <span>��������</span><span>����</span></li>';
					
				var jzzData = res.jData.jzzData;
				for(var i in jzzData){
					html += '<li><span>'+(jzzData[i].jname)+'</span> <span>'+(jzzData[i].zzname)+'</span> <span style="overflow: scroll">1��'+(jzzData[i].bl)+'</span><span><a href="javascript:;" jzid="'+(parseInt(i)+1)+'" class="support">֧��</a></span></li>';
				}
				
				html += '</ul>';
				obj.find(".opening").html(html).show();
				// ��ʶ��ȡ������
				guessData[amsCfg_659476.sData.zqid] = '1';
				
				// ����
				$(".support").unbind("click").bind("click",function(){
					var jzid = $(this).attr("jzid");
					var guessMoney = 0;
					
					openDialog('pop9');
					$("#pop9 .btn-certain").unbind("click").bind("click", function()
					{
						guessMoney = $("#pop9 input").val();
						var testNumReg = /^\+?[1-9][0-9]*$/;
						if (guessMoney == '') {
							alert("������Ҫ֧�ֵĽ�Ʊ������");
							return false;
						}else if(!testNumReg.test(guessMoney) || parseInt(guessMoney) <= 0){
							alert("��������ȷ�����֣�");
							return false;
						}
						amsCfg_659732.sData = sData;
						amsCfg_659732.sData.zqid = amsCfg_659476.sData.zqid;
						amsCfg_659732.sData.jid = jzid;
						amsCfg_659732.sData.money = guessMoney;
						
						amsSubmit(299949,659732);
					});
					
				});
			}
		} else {
			alert(res.sMsg);
		}
		return;
	},
	"fFlowSubmitFailed" : function(res)
	{
		// ʧ�ܻ��ߵ��������
		// ���������㣬ame���ش���0�Ǻ��ߵ�����
		alert(res.sMsg);
	}
};

var tesktype = 0;
// �����ȡ
$('.btn-get').click(function(event)
{
	if ($(this).hasClass('on')) {
		return;
	}

	if(isLogin == false){
		openDialog('pop1');
	}else if (isBind) {
		tasktype = $(this).attr("tasktype");
		amsCfg_659730.sData = sData;
		amsCfg_659730.sData.taskType = tasktype;
		amsSubmit(299949, 659730);
	} else {
		openDialog('pop2');
	}
});

amsCfg_659730 = {
	"iActivityId" : 299949, // �id
	"iFlowId" : 659730, // ����id
	"sData" : {},
	'_everyRead' : true, //ÿ�ζ�ȡamsCfg_{moduleFunction_13}����,Ĭ����false
	"fFlowSubmitEnd" : function(res)
	{
		if (res.iRet == '0') {
			openDialog('pop4');
			$(".btn-get").each(function()
			{
				if ($(this).attr("tasktype") == amsCfg_659730.sData.taskType) {
					$(this).addClass('on');
				}
			})

			if (amsCfg_659730.sData.taskType == '1') {
				money = parseInt(money) + 20;
			} else if (amsCfg_659730.sData.taskType == '2') {
				money = parseInt(money) + 40;
			} else if (amsCfg_659730.sData.taskType == '3') {
				money = parseInt(money) + 80;
			}

			$(".ticket span").text(money);
		} else {
			alert(res.jData.msg);
		}
		return;
	},
	"fFlowSubmitFailed" : function(res)
	{
		// ʧ�ܻ��ߵ��������
		// ���������㣬ame���ش���0�Ǻ��ߵ�����
		alert(res.sMsg);
	}
};

// ����һ�
$('.btn-exchange').click(function(event)
{
	if ($(this).hasClass('on')) {
		return;
	}
	var dhdata = $(this).attr("dhdata");
	if(isLogin == false){
		openDialog('pop1');
	}else if (isBind) {
		var num = 1;

		sData.dhdata = dhdata;

		if (dhdata == '7') {
			sData.num = num;
			amsCfg_659723.sData = sData;
			amsSubmit(299949, 659723);
		} else {
			openDialog('pop10');
			$("#pop10 .btn-certain").unbind("click").bind("click", function()
			{

				num = $("#pop10 input").val();
				var testNumReg = /^\+?[1-9][0-9]*$/;
				if (num == '') {
					alert("������Ҫ�һ������������");
					return false;
				}else if(!testNumReg.test(num) || parseInt(num) <= 0){
					alert("��������ȷ��������");
					return false;
				}
				sData.num = num;

				amsCfg_659691.sData = amsCfg_659706.sData = amsCfg_659707.sData = amsCfg_659708.sData = amsCfg_659709.sData = amsCfg_659710.sData = sData;

				if (dhdata == '1') {
					amsSubmit(299949, 659691);
				} else if (dhdata == '2') {
					amsSubmit(299949, 659706);
				} else if (dhdata == '3') {
					amsSubmit(299949, 659707);
				} else if (dhdata == '4') {
					amsSubmit(299949, 659708);
				} else if (dhdata == '5') {
					amsSubmit(299949, 659709);
				}
			});
		}

	} else {
		openDialog('pop2');
	}
});

amsCfg_659691 = amsCfg_659706 = amsCfg_659707 = amsCfg_659708 = amsCfg_659709 = amsCfg_659710 = amsCfg_659723 = {
	'iAMSActivityId' : '299949', // AMS���
	'activityId' : '274874', // ģ��ʵ����
	"sData" : {},
	'_everyRead' : true, //ÿ�ζ�ȡamsCfg_{moduleFunction_13}����,Ĭ����false
	'onBeginGetGiftEvent' : function()
	{
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent' : function(callbackObj)
	{// �齱ʧ���¼�
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent' : function(callbackObj)
	{// �齱�ɹ��¼�

		var exchangeIndex = parseInt(sData.dhdata) - 1;
		var xl_obj = $('.prize-box-2 .prize').eq(exchangeIndex).find(".nums").find("span");
		var xl_num_arr = xl_obj.text().split("/");
		var new_num = parseInt(xl_num_arr[0]) + parseInt(sData.num);
		if (parseInt(new_num) >= parseInt(xl_num_arr[1])) {
			$('.btn-exchange').eq(exchangeIndex).addClass("on");
		}
		xl_obj.text(new_num + '/' + xl_num_arr[1]);

		if (sData.dhdata == '1') {
			money = parseInt(money) - (100 * sData.num);
		} else if (sData.dhdata == '2') {
			money = parseInt(money) - (200 * sData.num);
		} else if (sData.dhdata == '3') {
			money = parseInt(money) - (200 * sData.num);
		} else if (sData.dhdata == '4') {
			money = parseInt(money) - (100 * sData.num);
		} else if (sData.dhdata == '5') {
			money = parseInt(money) - (250 * sData.num);
		} else if (sData.dhdata == '6') {
			money = parseInt(money) - (1280 * sData.num);
		} else if (sData.dhdata == '7') {
			money = parseInt(money) - (20000 * sData.num);
		}
		$(".ticket span").text(money);

		openDialog('pop5');
		return;
	}
};
var sharedata = {
	'title' : '�����۷� ȫ�񾺲�',
	'desc' : '�������ʻ꣡�����۷���ȫ�񾺲£�',
	'img' : window.location.protocol + '//game.gtimg.cn/images/ylzt/cp/a20200330qmjc/logo.png'
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
		actName : 'a20200330qmjc', // ���������������ͳ�Ʒ�������ר��һ�����Ŀ¼������a20151029demo
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

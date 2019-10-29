namespace('AmsActivity');

(function(Act){
	
	Act.iActivityId  = 259686;   //AMS���
	Act.iForceLogin  = false;    //ǿ�Ƶ�¼
	Act.iForceBind   = false;    //ǿ�ư�
	Act.isExistShare = false;    //���ڷ���
	Act.isExistBind  = true;     //���ڴ���
	
	Act.f = 0;//���̺�
	Act.d = {};//��������
	Act.s = {};//���̳ɹ��ص�
	Act.e = {};//����ʧ�ܻص�
	
	//�Ѿ���¼
	Act.init = function(actConfig) {
		
		Act.service        = actConfig.sServiceType;        //ҵ��
		Act.iSubmitFlowId  = parseInt(actConfig.iAreaRoleFlowId);     //�ύ�������̺�
		Act.iQueryFlowId   = parseInt(actConfig.iAreaRoleFlowId) + 1; //��ѯ�������̺�
		
		//��ʼ��ģ����Ϣ
		if (typeof(actConfig.flows) === 'object') {
			for(let key in actConfig.flows){
				var flow = actConfig.flows[key];
				switch(flow.functions[0]['method']) {
					case 'lottery2.myGiftList':
						Act.iLotteryModId  = flow.functions[0]['sExtModuleId']; //�齱ģ��ʵ����
						Act.iGetGiftFlowId = key.substring(2);                  //����������ID
						break;
					case 'daoju_buy_v2.daoju_buy_v2':
						Act.iDaojuModId = flow.functions[0]['sExtModuleId'];    //���۳�ģ��ID
						break;
					default:
						//nothing to do 
				}
			}
		}
		
		if (typeof(Act.iGetGiftFlowId) !== 'undefined') {
			window["amsCfg_"+Act.iGetGiftFlowId] = {
				'iAMSActivityId' : Act.iActivityId, // AMS���
				'iLotteryFlowId' : Act.iGetGiftFlowId, //  ��ѯ���ֲ������̺�
				'activityId' : Act.iLotteryModId, // ģ��ʵ����
				'contentId' : 'getGiftContent', //����ID
				'templateId' : 'getGiftTemplate', //ģ��ID
				'contentPageId' : 'getGiftPageContent',	//��ҳ����ID
				'showContentId' : 'showMyGiftContent', //������ID
				'pageSize' : 10, //Ĭ����10��,
				'isForce' : false
			};
			
			window.getGiftList = function() {
				Act.f = Act.iGetGiftFlowId;
				Act.sendSubmit();
			}
			
			window.giftDialogHide = function(){
				need("biz.dialog",function(Dialog){
					Dialog.hide();
				});
			}
		}
		
		//���ص��۳ǹ���
		if (typeof(Act.iDaojuModId) !== 'undefined') {
			need(["ams.daoju_buy_v2.appid"], function(autoappid) {
				autoappid.init(Act.service, Act.iDaojuModId, function(final_appid) {
					//final_appidΪ�Զ��жϵõ��ĵ��۳�������
					//���δ������Զ����е��۳�ȫ�������ݵ��ռ������뱣�����ŵ�milo.ready�ڣ�����������ҳ���Ͻ��л��ڵ��۳ǻ�ŵ�eas�ع��ϱ�
				});
			});
		}
		
		if (Act.isExistShare) {
			loadScript('./js/share.js');
		}
		
		//�󶨴�������
		if (Act.isExistBind) {
			//��ѯ�Ƿ�󶨵�����
			window["amsCfg_"+Act.iQueryFlowId]={
				type : "query",
				iQueryFlowID: Act.iQueryFlowId,
				service: Act.service,
				success : function(bindedInfo){
					//�Ѱ�ʱ����չ����
					init();
				},
				failure : function(){
					//δ��ʱ����չ����
					if (Act.iForceBind)  amsInit(Act.iActivityId, Act.iSubmitFlowId);
				}
			};
			
			//�ύ�󶨵�����
			window["amsCfg_"+Act.iSubmitFlowId]={
				type : "comit",
				needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
				roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
				iQueryFlowID:Act.iSubmitFlowId,
				service: Act.service,
				success : function(bindedInfo){
					//�Ѱ�ʱ����չ����
					window.location.reload();
				},
				failure : function(){
					//δ��ʱ����չ����
					
				}
			};
			
			amsInit(Act.iActivityId, Act.iQueryFlowId);
		
		} else {
			init();
		}
	
	};
		
	Act.setArgument = function() {
		args = arguments[0];
		//�ÿ�
		Act.d = Act.s = Act.e = {};
		
		Act.f = args[0];
		
		if ('object' == typeof args[1]) {
			Act.d = args[1];
			Act.s = ('function' == typeof args[2]) ? args[2] : {};
			Act.e = ('function' == typeof args[3]) ? args[3] : {};
		} else if ('function' == typeof args[1]) {
			Act.s = args[1];
			Act.e = ('function' == typeof args[2]) ? args[2] : {};
		}
	}
	
	Act.sendSubmit = function() {
		amsSubmit(Act.iActivityId, Act.f);
	}
	
	Act.submitLottery = function() {
		Act.setArgument(arguments);
		
		window["amsCfg_"+Act.f] = {
			'iAMSActivityId' : Act.iActivityId, // AMS���
			'activityId' : Act.iLotteryModId, // ģ��ʵ����
			"sData" : Act.d,//�Զ��崫��
			'onBeginGetGiftEvent' : function(){
				return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
			},
			'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
				if ('function' == typeof Act.e) {
					Act.e(callbackObj);
				} else {
					alert(callbackObj.sMsg);
				}
			},
			'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
				if ('function' == typeof Act.s) {
					Act.s(callbackObj);
				} else {
					alert(callbackObj.sMsg);
				}
			}
		};
		
		Act.sendSubmit();
	};
		
	Act.submitCustom = function() {	
		Act.setArgument(arguments);
		
		window["amsCfg_"+Act.f] = {
			"iActivityId": Act.iActivityId, //�id	
			"iFlowId":    Act.f, //����id
			"sData" : Act.d,//�Զ��崫��
			"fFlowSubmitEnd": function(res){
				if ('function' == typeof Act.s) {
					Act.s(res);
				} else {
					console.log(res);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//ʧ�ܻ��ߵ��������
				//���������㣬ame���ش���0�Ǻ��ߵ�����
				if ('function' == typeof Act.e) {
					Act.e(res);
				} else {
					alert(res.sMsg);
				}
			}
		};
		
		Act.sendSubmit();
	};
	
	Act.submitDaojuBuy = function() {		
		Act.setArgument(arguments);
		
		window["amsCfg_"+Act.f] = {
			'iActivityId' : Act.iActivityId,
			'iFlowId' : Act.f,
			'sData'	: Act.d,
			'fFlowSubmitEnd': function(res) {
				need(["ams.daoju_buy_v2.daoju_buy_v2"], function(DaojuBuy) {
					var option = {
						//apptype:4	�°�webpay����Ĭ��
						onPaySuccess:function(){
							if ('function' == typeof Act.s) {
								Act.s();
							}
						},//֧���ɹ���ص�����
						//onPayClose:function(){}//�ر�֧��ҳ��ص�����
					};
					DaojuBuy.pay(res.jData,option);
				});
			},
			'fFlowSubmitFailed':function(res) {
				if ('function' == typeof Act.e) {
					Act.e(res);
				} else {
					alert(res.sMsg);
				}
			}
		};
		
		Act.sendSubmit();
	};
			
	//��¼
	milo.ready(function () {
		
		need("biz.login",function(LoginManager){
			
			LoginManager.init({needReloadPage:true});
			
			//QQ��¼
			milo.addEvent(g('btn_qqlogin'),'click',function(e){
				LoginManager.login();
			});
			
			//ע��
			milo.addEvent(g("btn_logout"),"click",function(){
				LoginManager.logout();
			});
			
			LoginManager.checkLogin(function(loginedInfo){
				//�������css��ʽ
				milo.loader.loadCSS('//ossweb-img.qq.com/images/js/codinner/mybag.css');
				
				//��ȡ�����ļ� �� ��ʼ��
				getActivityConfig(Act.iActivityId, function(actConfig) {
					Act.init(actConfig);
				});
			},function(){
				if (Act.iForceLogin) LoginManager.login();
			});
		});
		
	});
	
})(window.AmsActivity);

/**
 * functions:
 * AmsActivity.submitLottery  �ύ�齱
 * AmsActivity.submitCustom   �ύ�Զ���
 * AmsActivity.submitDaojuBuy �ύ����
 *
 * �ύfunction����������JS��������һ���齱ģ�飬һ������ģ��Ļ��
 * function(flowid, [data], [sucCallback], [errCallback])
 * 
 * flowid : ����ID   ����
 * data   : ���̲��� ��ѡ
 * sucCallback : �ɹ��ص� ��ѡ
 * errCallback : ����ص� ��ѡ
 */

var huoyue=0,buyflag=0;
function init(){
	AmsActivity.submitCustom(610067, function(res){
		huoyue=parseInt(res.sOutValue2);
		buyflag=parseInt(res.sOutValue1);
		update_view()
	});
}

function update_view() {
	huoyue = huoyue > 100 ? 100 : huoyue;
	$('.progress-con').css('width', huoyue+'%');
	if (buyflag > 0) {
		for(var i=0;i<=3;i++) {
			var flag = (buyflag & Math.pow(2,i)) > 0 ? 1 : 0;
			$('.gift-tips-text:eq('+i+')').text('�޹���'+flag+'/1��');
		}
	}
}

function back_reward(index) {
	var iFlowId = 0;
	 switch(index) {
	  case 1:
	   iFlowId = 609898;
	   break;
	  case 2:
	   iFlowId = 609921;
	   break;
	  case 3:
	   iFlowId = 609922;
	   break;
	  case 4:
	   iFlowId = 609923;
	   break;
	  case 5:
	   iFlowId = 609924;
	   break;
	  default:
	   return;
	 }
	AmsActivity.submitLottery(iFlowId);
}

function get_huoyue(index){
	 var iFlowId = 0;
	 switch(index) {
	  case 1:
	   iFlowId = 609925;
	   break;
	  case 2:
	   iFlowId = 609928;
	   break;
	  case 3:
	   iFlowId = 609929;
	   break;
	  case 4:
	   iFlowId = 609930;
	   break;
	  default:
	   return;
	 }
	AmsActivity.submitLottery(iFlowId, function(callbackObj) {
		alert("��ϲ����10���Ծ��~");
		huoyue+=10;
		update_view();
	});
}

function huoyue_reward(index) {
	if (!milo.isInt(index,1,5)) {
		alert("��Ǹ����ѡ����ȡ�����");
		return;
	 }
	 AmsActivity.submitLottery(609931, {'iRewardId':index});
}

var buyid=0;
function buy(index){
	 var iFlowId = 0;
	 buyid = index;
	 switch(index) {
	  case 1:
	   iFlowId = 609901;
	   break;
	  case 2:
	   iFlowId = 609957;
	   break;
	  case 3:
	   iFlowId = 609958;
	   break;
	  case 4:
	   iFlowId = 609959;
	   break;
	  default:
	   return;
	 }
	AmsActivity.submitDaojuBuy(iFlowId, function() {
		buyflag+=Math.pow(2,buyid-1);
		update_view()
	});
}

namespace('AmsActivity');

(function(Act){
	
	Act.iActivityId  = 259686;   //AMS活动号
	Act.iForceLogin  = false;    //强制登录
	Act.iForceBind   = false;    //强制绑定
	Act.isExistShare = false;    //存在分享
	Act.isExistBind  = true;     //存在大区
	
	Act.f = 0;//流程号
	Act.d = {};//流程数据
	Act.s = {};//流程成功回调
	Act.e = {};//流程失败回调
	
	//已经登录
	Act.init = function(actConfig) {
		
		Act.service        = actConfig.sServiceType;        //业务
		Act.iSubmitFlowId  = parseInt(actConfig.iAreaRoleFlowId);     //提交大区流程号
		Act.iQueryFlowId   = parseInt(actConfig.iAreaRoleFlowId) + 1; //查询大区流程号
		
		//初始化模块信息
		if (typeof(actConfig.flows) === 'object') {
			for(let key in actConfig.flows){
				var flow = actConfig.flows[key];
				switch(flow.functions[0]['method']) {
					case 'lottery2.myGiftList':
						Act.iLotteryModId  = flow.functions[0]['sExtModuleId']; //抽奖模块实例号
						Act.iGetGiftFlowId = key.substring(2);                  //获得礼包流程ID
						break;
					case 'daoju_buy_v2.daoju_buy_v2':
						Act.iDaojuModId = flow.functions[0]['sExtModuleId'];    //道聚城模块ID
						break;
					default:
						//nothing to do 
				}
			}
		}
		
		if (typeof(Act.iGetGiftFlowId) !== 'undefined') {
			window["amsCfg_"+Act.iGetGiftFlowId] = {
				'iAMSActivityId' : Act.iActivityId, // AMS活动号
				'iLotteryFlowId' : Act.iGetGiftFlowId, //  查询获奖轮播的流程号
				'activityId' : Act.iLotteryModId, // 模块实例号
				'contentId' : 'getGiftContent', //容器ID
				'templateId' : 'getGiftTemplate', //模板ID
				'contentPageId' : 'getGiftPageContent',	//分页容器ID
				'showContentId' : 'showMyGiftContent', //弹出层ID
				'pageSize' : 10, //默认是10条,
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
		
		//加载道聚城购买
		if (typeof(Act.iDaojuModId) !== 'undefined') {
			need(["ams.daoju_buy_v2.appid"], function(autoappid) {
				autoappid.init(Act.service, Act.iDaojuModId, function(final_appid) {
					//final_appid为自动判断得到的道聚城渠道号
					//本段代码内自动进行道聚城全流程数据的收集，必须保留并放到milo.ready内，除非自行在页面上进行基于道聚城活动号的eas曝光上报
				});
			});
		}
		
		if (Act.isExistShare) {
			loadScript('./js/share.js');
		}
		
		//绑定大区配置
		if (Act.isExistBind) {
			//查询是否绑定的配置
			window["amsCfg_"+Act.iQueryFlowId]={
				type : "query",
				iQueryFlowID: Act.iQueryFlowId,
				service: Act.service,
				success : function(bindedInfo){
					//已绑定时的扩展处理
					init();
				},
				failure : function(){
					//未绑定时的扩展处理
					if (Act.iForceBind)  amsInit(Act.iActivityId, Act.iSubmitFlowId);
				}
			};
			
			//提交绑定的配置
			window["amsCfg_"+Act.iSubmitFlowId]={
				type : "comit",
				needPopupRole:true,//是否弹默认角色框选角色
				roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
				iQueryFlowID:Act.iSubmitFlowId,
				service: Act.service,
				success : function(bindedInfo){
					//已绑定时的扩展处理
					window.location.reload();
				},
				failure : function(){
					//未绑定时的扩展处理
					
				}
			};
			
			amsInit(Act.iActivityId, Act.iQueryFlowId);
		
		} else {
			init();
		}
	
	};
		
	Act.setArgument = function() {
		args = arguments[0];
		//置空
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
			'iAMSActivityId' : Act.iActivityId, // AMS活动号
			'activityId' : Act.iLotteryModId, // 模块实例号
			"sData" : Act.d,//自定义传参
			'onBeginGetGiftEvent' : function(){
				return 0; // 抽奖前事件，返回0表示成功
			},
			'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
				if ('function' == typeof Act.e) {
					Act.e(callbackObj);
				} else {
					alert(callbackObj.sMsg);
				}
			},
			'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
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
			"iActivityId": Act.iActivityId, //活动id	
			"iFlowId":    Act.f, //流程id
			"sData" : Act.d,//自定义传参
			"fFlowSubmitEnd": function(res){
				if ('function' == typeof Act.s) {
					Act.s(res);
				} else {
					console.log(res);
				}
				return;
			},
			"fFlowSubmitFailed":function(res){
				//失败会走到这个函数
				//条件不满足，ame返回大于0是后走到这里
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
						//apptype:4	新版webpay，已默认
						onPaySuccess:function(){
							if ('function' == typeof Act.s) {
								Act.s();
							}
						},//支付成功后回调方法
						//onPayClose:function(){}//关闭支付页面回调方法
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
			
	//登录
	milo.ready(function () {
		
		need("biz.login",function(LoginManager){
			
			LoginManager.init({needReloadPage:true});
			
			//QQ登录
			milo.addEvent(g('btn_qqlogin'),'click',function(e){
				LoginManager.login();
			});
			
			//注销
			milo.addEvent(g("btn_logout"),"click",function(){
				LoginManager.logout();
			});
			
			LoginManager.checkLogin(function(loginedInfo){
				//加载礼包css样式
				milo.loader.loadCSS('//ossweb-img.qq.com/images/js/codinner/mybag.css');
				
				//获取配置文件 并 初始化
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
 * AmsActivity.submitLottery  提交抽奖
 * AmsActivity.submitCustom   提交自定义
 * AmsActivity.submitDaojuBuy 提交购买
 *
 * 提交function参数描述（JS适用于有一个抽奖模块，一个购买模块的活动）
 * function(flowid, [data], [sucCallback], [errCallback])
 * 
 * flowid : 流程ID   必填
 * data   : 流程参数 可选
 * sucCallback : 成功回调 可选
 * errCallback : 错误回调 可选
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
			$('.gift-tips-text:eq('+i+')').text('限购（'+flag+'/1）');
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
		alert("恭喜你获得10点活跃度~");
		huoyue+=10;
		update_view();
	});
}

function huoyue_reward(index) {
	if (!milo.isInt(index,1,5)) {
		alert("抱歉，请选择领取礼包！");
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

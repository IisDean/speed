window['no_webtips_flag'] = true;
//获取url参数
function getUrlParam(name, url) {
    //参数：变量名，url为空则表从当前页面的url中取
    var u = arguments[1] || window.location.search,
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
}
//替换礼包提示语{sPackageName} {sPackageCDkey}
function replacePkgNamesHolder(pkgTip, callbackObj) {
    pkgTip = replaceAll(pkgTip, '{sPackageName}', callbackObj.sPackageName);
    pkgTip = replaceAll(pkgTip, '{sPackageCDkey}', callbackObj.sPackageCDkey?callbackObj.sPackageCDkey:callbackObj.sPackageOtherInfo);
    return pkgTip;
}
milo.ready(function() {
    //CP调试
    if(!getUrlParam("debug")){
        initTemplateHtml();
        initTemplateEvent();
        setTimeout(function(){
            if (typeof initLotteryEvent == 'function') {
                initLotteryEvent();        
            }            
        },0);
    }else{
        setTimeout(function(){
            initTemplateHtml();
            initTemplateEvent();
            initLotteryEvent();
        },10)
    }

    if (typeof ishareoff != 'undefined' && ishareoff == 1) {    
        var TickId = setInterval(function(){
            if (typeof mqq === 'object' && mqq !== null){
                mqq.ui.setTitleButtons({
                right:{//右上角按钮
                    // title:"我的..."，//右上角按钮标题
                    hidden:true,//是否隐藏右上角按钮
                    // iconID:0~6,
                    /*
                        @右上角按钮图片，目前有6个。其中0和6是对5的扩展。
                        @1：编辑图标；2.删除图标；3.浏览器默认图标；4分享图标；5上传图标（有动画效果）
                        @开发一般只需要用到3或4
                    */
                    callback:function(){
                        //点击后回调
                    }
                }
                });
                clearInterval(TickId);
            }        
        }, 1000) 
    }    
})

if(!getUrlParam("debug")){
    initCommonEvent();
}

function pageTypeIsGameHelper(){
	return (window.gametype == 2 && window.templatetype == 3) || (window.gametype == 1 && window.templatetype == 1)
}
var isGameHelper = function () {
	return (/GameHelper/.test(navigator.userAgent) || milo.request('token') || typeof GameHelper !== 'undefined') ? true : false;
}
//解析json
function formatJson(str,data){
    var fn = !/\W/.test(str)?
        formatJson(document.getElementById(str).innerHTML) :
        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" +str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") + "');}return p.join('');");
    return data ? fn( data ) : fn;
}

//初始化页面的弹窗的结构
function initTemplateHtml() {
}
//初始化页面的事件
function initTemplateEvent(){
    if(!popup.isMobile()) {PTTSendClick('useragent','pc','PC访问');}
    else{PTTSendClick('useragent','mobile','移动端访问');}
}
var userInfo = {
  nickName: "",
  isLogin: false,
};
//初始化公共事件
function initCommonEvent() {
    // document.domain = "qq.com";
    // 隐藏我的礼包
    if(typeof gLogCfg.iMyGiftBagSwitch != "undefined"  && gLogCfg.iMyGiftBagSwitch == 0) {
        $("#logined").find('a[href*="showMyGiftList"]').hide();
    }
    if(needAddress){
        $("#fillAddress").show();
        // 隐藏收货地址
        if(typeof gLogCfg.iMyAddressSwitch != "undefined"  && gLogCfg.iMyAddressSwitch == 0) {
            $("#fillAddress").hide();
        }
    }
    //登录
    if(g("dologin")!=null)
    milo.addEvent(g("dologin"), "click", function() {
        need("biz.login",function(LoginManager){
            LoginManager.init({
                needReloadPage:true
            });
            LoginManager.login(function(){
                g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号
                LoginManager.getNickName(function(res){ //获取昵称
                  userInfo.nickName = res.nickName;
                  userInfo.isLogin = true;//对否登录
                });
                //如果是djc活动登录后刷新头部区域的登录
                var host = window.location.host;
                if(host == 'act.daoju.qq.com'){
                    var tunlogin = document.getElementById("tunlogin");
                    var tlogined = document.getElementById("tlogined");
                    if(tunlogin != null && tlogined != null){
                        tunlogin.style.display = "none";
                        tlogined.style.display = "block";
                        document.getElementById("tlogin_qq_span").innerHTML = LoginManager.getUserUin();
                    }
                }
                //djc end 
                loginCallBack(LoginManager);
            });
        });
        return false;
    });
		if(g("dologout")!=null)
    milo.addEvent(g("dologout"), "click", function() {
        need("biz.login",function(LoginManager){
            if(popup.isMobile()){
                LoginManager.logout();
                setTimeout(function(){ window.location.reload();},1000)
            }else{
                LoginManager.logout();
            }
        });
        return false;
    });
		if(g("dologout")!=null || window.iGameType == 1)
    milo.ready(function() {
        
        if (pageTypeIsGameHelper() && !isGameHelper()) {
            alert('请下载游戏最新助手APP参与本次活动');  
            window.amsSubmit = function(iAct, iFlow) {
                alert('请下载游戏最新助手APP参与本次活动');
            }
            return;
        }

        need("biz.login",function(LoginManager){
            LoginManager.checkLogin(function(){
              LoginManager.getNickName(function(res){ //获取昵称
                userInfo.nickName = res.nickName;
                userInfo.isLogin = true;//对否登录
              });
                if(g("login_qq_span")!=null){
                    g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号
                }    
                if(document.getElementById('unlogin')!=null){
                    document.getElementById('unlogin').style.display="none";
                }
                if(document.getElementById('logined')!=null){
                    document.getElementById('logined').style.display="block";
                }

                loginCallBack(LoginManager);
            });
        });
    });

    // 弹窗
    window.TGDialogS = function(e){
        need("biz.dialog",function(Dialog){
            Dialog.show({
                id:e,
                bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
                opacity:70 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
            });
        });
    }

    window.closeDialog = function(){
        need("biz.dialog",function(Dialog){
            Dialog.hide();
        });
    }
    
    window.boxModuleSuffixTips = function(iPackageId){
        if(typeof allLubanBoxPkgIds != 'undefined' && allLubanBoxPkgIds.indexOf(parseInt(iPackageId)) != -1){
            return ",礼包已发放到暂存箱!";
        }else {
            return "";
        }
    } 
    if($('#showAlert').length > 0) {
        window.alert = function(s){
            if(s == 'undefined'){
                console.error('s is undefined!');
                return;
            }
            TGDialogS('showAlert');
        
            document.getElementById('showAlertContent').innerHTML = s;
            resetFlash()
        }
    }
    //将页面上所有的抽奖都重置
    window.resetFlash = function() {
        if (typeof allLubanFlashObj != 'undefined') {
            for (var index = 0; index < allLubanFlashObj.length; index++) {
                var aObj = window[allLubanFlashObj[index]]; 
                if (typeof aObj.enable == 'function'){
                    aObj.enable();
                }
            }
        }
    }
    //修改绑定大区ID以适应AMS
    $("#spanNotBind").attr("id","spanNotBind_"+iInitAreaId);
    $("#spanBind").attr("id","spanBind_"+iInitAreaId);
    $("#area_info").attr("id","area_info_"+iInitAreaId);
    $("#role_info").attr("id","role_info_"+iInitAreaId);
		if(iBindAreaId == 0){
    	$("span[id^=spanBind]").remove();$("span[id^=spanNotBind]").remove();
    }
		//根据iGiftArea判别我的礼包中是否显示大区列
    if(iGiftArea == 0){
        $(".showGiftArea").remove();
    }

    //给分享流程绑定的按钮绑定分享类名
    $("[href^='javascript:sharedNeiqian']").addClass("shareBtn");

    // 手游游戏内分享设置
    if(typeof window.shouyouInfo !== 'undefined') {
        if(window.shouyouInfo.iDemandId){
            $(function() {
                //设置分享文案
                var urlLink = location.href.split("?")[0];
                var sShareLink = formatUrl((shouyouInfo.sShareLink == "" || shouyouInfo.sShareLink == undefined)?(urlLink):shouyouInfo.sShareLink);
                var sShareImgUrl = formatUrl(shouyouInfo.sShareImgUrl == undefined?"":shouyouInfo.sShareImgUrl);
                var sShareDesc = shouyouInfo.sShareDesc;
                var sShareTitle = shouyouInfo.sShareTitle;
                var sharedata = {
                    title:sShareTitle
                    ,desc:sShareDesc
                    ,url:sShareLink
                    ,img:sShareImgUrl  //换成游戏LOGO
                }
                //初始化
                var isMsdk = milo.request('msdkEncodeParam') || milo.request('itopencodeparam');
                if (typeof igShare == 'undefined' || !isMsdk ) return;
                window.ingameShare = new igShare({
                    shareData:sharedata,
                    tcss:"ingame.share"
                });
            })
        }
    }

    // a标签外链target = "_blank"
    $("a[href^='http']").attr("target",'_blank');
    $("a[href^='https']").attr("target",'_blank');
    $("a[href^='//']").attr("target","_blank");

                
    // 登录后回调  查询绑定大区/查询用户数据 
    function loginCallBack(LoginManager){
        // 初始化绑定大区
        if(iBindAreaId > 0){
        amsInit(iActivityId, iInitAreaId);
      	}else if(iBindAreaId == 0){ //指定大区发货的业务
            qOnlyJF();qDsFunc();
        }
        if(typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0){
        	 amsInit(iActivityId, iSighQueryFlow);
        }
        
        if(iDecryptFlow > 0){
          inviteLoginCall();
        }
        // 自定义登录回调
        if (typeof lbCallBackAfterLogin == 'function') {
            lbCallBackAfterLogin(LoginManager)
        }
    }
    
		
    // 绑定大区动作
    window.showSelectZone = function(){
        need("biz.login",function(LoginManager){
            LoginManager.checkLogin(function(){
            		if(iBindAreaId > 0){
                	amsInit(iActivityId, iBindAreaId);
                } 
            }, function(){
                LoginManager.init({
                    needReloadPage:false
                });
                LoginManager.login(function(){
                    g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号
                     
                    loginCallBack(LoginManager);
                });        
            });
        });
    }

    //查询是否绑定的配置
    amsCfg_initArea={
        type : "query",
        iQueryFlowID:iInitAreaId,
        service:sService ,
        success : function(bindedInfo){
            // 自定义回调
            if (typeof lbCallBackOfAreaHandle == 'function') {
                lbCallBackOfAreaHandle('query_success', bindedInfo);
            }
            
            //已绑定时的扩展处理
            window.biFareaName = decodeURIComponent(bindedInfo.jData.data.FareaName);
            qOnlyJF();qDsFunc();    
            if(iDecryptFlow > 0 ){
              inviteBindCall();
            }
        },
        failure : function(){
            // 自定义回调
            if (typeof lbCallBackOfAreaHandle == 'function') {
                lbCallBackOfAreaHandle('query_failed', '');
            }
            if(typeof iQualType!= 'undefined' &&  iQualType == 1){
                qOnlyJF();    
            }
            //未绑定时的扩展处理
        }
    };

    var amsCfg_initArea_tmp = "amsCfg_"+iInitAreaId+"=amsCfg_initArea;"; // amsCfg_373024
    eval(amsCfg_initArea_tmp);

    //提交绑定的配置
    amsCfg_bindArea={
        type : "comit",
        iQueryFlowID:iInitAreaId,
        service:sService ,
        success : function(bindedInfo){
            //已绑定时的扩展处理
            window.biFareaName = decodeURIComponent(bindedInfo.jData.data.FareaName);
            qOnlyJF();qDsFunc();
            if(iDecryptFlow > 0){
              inviteBindCall();
            }
            // 自定义回调
            if (typeof lbCallBackOfAreaHandle == 'function') {
                lbCallBackOfAreaHandle('comit_success', bindedInfo);
            }
            alert("恭喜您，您已经成功绑定游戏大区！");
        },
        failure : function(){
            //未绑定时的扩展处理
            // 自定义回调
            if (typeof lbCallBackOfAreaHandle == 'function') {
                lbCallBackOfAreaHandle('comit_failed', '');
            }
        }
    };

    var amsCfg_bindArea_tmp = "amsCfg_"+iBindAreaId+"=amsCfg_bindArea;"; // amsCfg_373024
    eval(amsCfg_bindArea_tmp);

    // 我的礼包关闭动作
    window.giftDialogHide = function(){
        need("biz.dialog",function(Dialog){
            Dialog.hide();
        });
    }
     
    // 个人获奖记录初始化
    amsCfg_myList = {
        sData:{},
        _everyRead:true,
        'iAMSActivityId' : iActivityId, // AMS活动号
        'iLotteryFlowId' : iMyListId, //  查询获奖轮播的流程号
        'activityId' : iLotteryId, // 模块实例号
        'isForce' : true,
        'contentId' : 'getGiftContent', //容器ID
        'templateId' : 'getGiftTemplate', //模板ID
        'contentPageId' : 'getGiftPageContent', //分页容器ID
        'showContentId' : 'showMyGiftContent' //弹出层ID
    };

    var amsCfg_myList_tmp = "amsCfg_"+iMyListId+"=amsCfg_myList;"; // amsCfg_373024
    eval(amsCfg_myList_tmp);

    window.showMyGiftList = function(){
        doAmsAction(iActivityId,iMyListId);
    }
	//如果iMyListId = 0; 隐藏我的礼包入口 
	if(iMyListId == 0){
		$("a[href='javascript:showMyGiftList();']").hide();
	}
	//填写实体地址
	 amsCfg_myAddress = {
         sData:{},
         _everyRead:true,
	 	'iActivityId' : iActivityId, // AMS活动号
	 	'iFlowId' : iMyAddressId, // 流程号
	 	'_everyRead' : true,
	 	'fFlowSubmitEnd': function(res) {
	 		if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
	 			need(["biz.provincecityselector", "biz.dialog", "util.form"],function(pcs, Dialog, FormManager){
  
	 				Dialog.show({
	 					id: 'personInfoContent'
	 				});
  
	 				g('personInfoContentBtn').onclick = function(){
	 					var fillData = FormManager.getAllInputValue('personInfoContent');
	 					for(var i in fillData) {
	 						var _val = fillData[i];
	 						switch(i) {
	 							case 'sName': {
	 								if(!_val){alert("姓名不能为空"); return;}
	 								if(milo.getByteLength(_val) > 30){alert("姓名长度不能超过30个字节。"); return;}
	 								break;
	 							}
	 							case 'sGender':{
	 								if(!_val){alert("性别必须选择"); return;}
	 								break;
	 							}
	 							case 'sIdentity':{
	 								if(!_val){alert("身份证号码不能为空"); return;}
	 								if(!milo.isIDCard(_val)){alert("身份证号码有误。"); return;}
	 								break;
	 							}
	 							case 'sMobile':{
	 								if(!_val){alert("手机号码不能为空"); return;}
	 								if(isNaN(_val) || _val.indexOf('.') >= 0){alert("手机号码必须为数字。"); return;}
	 								if(_val.length > 11){alert("手机号码不得超过11位。"); return;}
	 								break;
	 							}
	 							case 'sAddress':{
	 								if(!_val){alert("详细地址不能为空"); return;}
	 								if(milo.getByteLength(_val) > 100){alert("详细地址不能超过100个字节。"); return;}
	 								break;
	 							}
	 							case 'sPostCode':{
	 								if(!_val){alert("邮政编码不能为空"); return;}
	 								if(milo.getByteLength(_val) > 8){alert("邮政编码不能超过8个字节。"); return;}
	 								if(isNaN(_val) || _val.indexOf('.') >= 0){alert("邮政编码必须为数字。"); return;}
	 								break;
	 							}
	 							case 'sProvince':{
	 								if(!_val){alert("请选择省份"); return;}
	 								break;
	 							}
	 							case 'sCity':{
	 								if(!_val){alert("请选择城市"); return;}
	 								break;
	 							}
	 							default : {}
	 						}
	 					}
                        amsCfg_myAddress.sData = $.extend(amsCfg_myAddress.sData,fillData);
                        amsCfg_myAddress.sData.iShow = 0;
                        doAmsAction(iActivityId,iMyAddressId);
	 				}
	 				g("colseLayer").onclick = function(){
	 					Dialog.hide();
	 				}
  
	 				if(g("province").innerHTML != '') {
	 					g("province").innerHTML = '';
	 				}
	 				if(g("city").innerHTML != '') {
	 					g("city").innerHTML = '';
	 				}
	 				pcs.show({
	 					provinceId : "province",
	 					cityId : "city"
	 				});
  
	 				if(res.jData.sProvince != undefined) {
	 					g('province').value = res.jData.sProvince;
	 				}
	 				g('province').onchange();
	 				if(res.jData.sCity != undefined){
	 					g('city').value = res.jData.sCity;
	 				}
	 				//发货订单:
	 				if(res.jData.sExtend1){
	 					g('sExtend1').innerHTML=res.jData.sExtend1;
	 				}
	 				delete res.jData.sProvince;
	 				delete res.jData.sCity;
	 				FormManager.setAllInputValue (res.jData, 'personInfoContent');
	
	 				if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) {
	 					document.getElementById('tr_package').style.display = '';
	 					var package_id = document.getElementById('package');
	 					for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
	 						var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
	 						var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
	 						package_id.options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
	 					}
	 				}
	 			});
	
	 		} else {
	 			alert(res.sMsg);
	 		}
	 	}
	 };

  amsCfg_myAddress.success =amsCfg_myAddress.fFlowSubmitEnd;
   var amsCfg_myAddress_tmp = "amsCfg_"+iMyAddressId+"=amsCfg_myAddress;";
   eval(amsCfg_myAddress_tmp);

  milo.ready(function(){
     if(g('fillAddress') != null)
     milo.addEvent(g('fillAddress'),'click',function(){
           need("biz.login",function(LoginManager){
                LoginManager.submitLogin(function(){
                    if(window.sService === 'cfm'){
                        amsCfg_myAddress.sData.iShow = 1;
                    }else{
                        amsCfg_myAddress.sData = { iShow: 1 };
                    }
                 doAmsAction(iActivityId,iMyAddressId);
             });
           })
     });
  });
}
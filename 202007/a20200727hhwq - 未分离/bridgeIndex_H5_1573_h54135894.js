amsCfg_687494 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    '_everyRead' : true,
    "sData":{
        "sPlatId":0,
        "sArea":0,
        "appid":0,
        "ams_appname":"cfm_open",
        "ams_targetappid":"wx58164a91f1821369"
    },
    'onBeginGetGiftEvent' : function(){
        if(typeof pageIsNeiqian != 'undefined' && pageIsNeiqian == 1 && milo.request('msdkEncodeParam') == '' ) {
            alert("抱歉，请登录CF手游，在游戏内【精彩活动中参与】");
            return -1;
        }
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 687494 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 687494 , callbackObj);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        if(packageLen && packageLen.length > 1){
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
            return;
        }

        //若有自定义礼包提示语则：
        if (typeof gPkgTips[callbackObj.iPackageId] != 'undefined') {
            qOnlyJF();qDsFunc();
            alert(replacePkgNamesHolder(gPkgTips[callbackObj.iPackageId], callbackObj));
            return;
        }

        //1：实物
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('谢谢') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("恭喜您获得了 " + callbackObj.sPackageName + " ! 请您准确填写个人信息，官方将有工作人员联系您。");
            }
            return;
        }
        //2：cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // 新的处理
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('您获得的cdkey为：' + callbackObj.sPackageCDkey + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'复制成功。\');">');
                return;
            }else{
                alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





var jfIdMap = {"1411":"1191","1412":"1192"};
var flowIdMap = {"12255":"687491","12256":"687493","12259":"687494","12260":"687495","12261":"687496","12262":"687497","12263":"687498","12269":"687604","12270":"687605","12271":"687606"};
var flowIdValid = ["687491","687493","687494","687495","687496","687497"];
// 查询资格流程
	amsCfg_687498 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    687498, //流程id
		"sData":{
        "sPlatId":0,
        "sArea":0,
        "appid":0,
        "ams_appname":"cfm_open",
        "ams_targetappid":"wx58164a91f1821369"
    },
    "sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
			// 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 687498 , res);
            }	
			var sOutValue1 = res.sOutValue1;
			sOutValue1 = replaceAll(sOutValue1,"#",'"');
			sOutValue1 = JSON.parse(sOutValue1);
			var flow_list = sOutValue1;
			if(typeof flow_list != 'undefined'){
				$("[id^=Hold_]").each(function(){
					var spanId = $(this).attr('id');
					var parts = spanId.split('_');
					if(parts.length == 2){
						var iFlowId = parts[1];
						if(iFlowId > 0){
							if(typeof flowIdMap[iFlowId]!='undefined'){
								iFlowId = flowIdMap[iFlowId];
							}
							if(flowIdValid.indexOf(iFlowId) == -1) {
								return;
							}
							var aFlowInfo = flow_list[iFlowId];
							if(typeof aFlowInfo == 'undefined') { 
								return;
							}
							var ruleQual = aFlowInfo['ruleQual'];
							if (typeof ruleQual == 'undefined') {
								console.log('当前流程资格不可查询，可能不在开放时间段');
								return;
							}
							var ruleCond = aFlowInfo['ruleCond'];
							var pubQualTotal = aFlowInfo['pubQualTotal']; 
							var pubQualLeftNum = aFlowInfo['pubQualLeftNum'];
							var rulesId = aFlowInfo['rules'];
							var rulesAllLeft = 0;
							var rulesAllLeftWithoutCond = 0;
							for(var m = 0; m < rulesId.length; m ++){
								var aRuleId = rulesId[m];
								var aRuleQual = ruleQual[aRuleId];
								var aRuleLeft = aRuleQual['iLeftNum'];
								if(( typeof ruleCond == 'undefined' || typeof ruleCond[aRuleId] == 'undefined') || (typeof ruleCond[aRuleId] != 'undefined' && ruleCond[aRuleId]['bRuleRet'] == 'true')){
									rulesAllLeft += parseInt(aRuleLeft);
									rulesAllLeftWithoutCond += parseInt(aRuleLeft);
								}
								if(typeof ruleCond != 'undefined' && typeof ruleCond[aRuleId] != 'undefined' && ruleCond[aRuleId]['bRuleRet'] == 'false'){
									rulesAllLeftWithoutCond += parseInt(aRuleLeft);
								}
							}
							//再与公共资格取最小值
							var targetQualleft = 0;
							var targetQualleftWithoutCond = 0;
							if(typeof pubQualLeftNum != 'undefined'){
								targetQualleft = rulesAllLeft;//Math.min(pubQualLeftNum,rulesAllLeft);
								targetQualleftWithoutCond = rulesAllLeftWithoutCond;//Math.min(pubQualLeftNum,rulesAllLeftWithoutCond);
							}else {
								targetQualleft = rulesAllLeft;
								targetQualleftWithoutCond = rulesAllLeftWithoutCond;
							}

							if($(this).is("a") ){
								if(iBtnGraySwitch == 1){
									if( targetQualleftWithoutCond == 0 ){
										$(this).addClass("btn-zhih").addClass('btn-gray');
									}else {
										$(this).removeClass("btn-zhih").removeClass('btn-gray');
									}
								}
							}else {
								$(this).text(targetQualleft);
							}
							console.log($(this),$(this).attr('id'),targetQualleft);
						}
					}
				});
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
			// 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('failed', 687498 , res);
            }	
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里			
			alert(res.sMsg);
		}
	};
// 查询积分流程
	amsCfg_687606 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    687606, //流程id
		"sData":{
        "sPlatId":0,
        "sArea":0,
        "appid":0,
        "ams_appname":"cfm_open",
        "ams_targetappid":"wx58164a91f1821369"
    },
    "sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
            // 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 687606 , res);
            }			
			//console.log(res);
			var sOutValue1 = res.sOutValue1;
			//511989:11:0|514717:11:0|515529:11:0
			var aParts = sOutValue1.split("|");
			var lng = aParts.length;
			for(i = 0 ; i < lng ;i ++){
				var bParts = aParts[i].split(":");
				if(bParts.length == 3){
					if (iMrmsBind == 2) {
						var jfId = bParts[0];
					} else {
						var jfId = jfIdMap[bParts[0]];
					}
					var tot = bParts[1];
					var ticket = bParts[2];
					$('[id=Jf_'+jfId+'_1]').text(ticket);
					$('[id=Jf_'+jfId+'_2]').text(tot);
				}
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
            // 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('failed', 687606 , res);
            }			
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};
/*资格 积分 条件数据展示 beg*/
function replaceAll(str, oldStr, newStr) {
    var retStr = '';
    if (str !== null) {
        retStr = str.replace(new RegExp(oldStr, 'gm'), newStr)
    }
    return retStr
}
window.qZigeFunc = function (){
    if(typeof window.qZigeFlow != "undefined" && window.qZigeFlow != 0 && (typeof window.iBtnGraySwitch != "undefined" && window.iBtnGraySwitch != 0||
    typeof window.willQHoldFlow != "undefined" && window.willQHoldFlow == 1)){
     amsSubmit(iActivityId, qZigeFlow,"zige");
    }
}
window.qJFFunc = function (){
        if(typeof window.qJfFlow != "undefined" && window.qJfFlow != 0){
        amsSubmit(iActivityId, qJfFlow,'jf');
    }
}
//条件值输出
window.qDsFunc = function (){
    qZigeFunc();
    if(typeof window.qDsFlow != "undefined" && window.qDsFlow != 0){
    amsSubmit(iActivityId, qDsFlow,'ds'); 
}
}
//资格与积分查询回调 若是djc购买则延迟2000ms查积分
window.qOnlyJF = function (isDjc){
        
        if(typeof isDjc != 'undefined' && isDjc == 1){
            setTimeout(function(){
                qJFFunc(); 
            }  , 2000);
        }else {
            qJFFunc();
        }
}
/*资格 积分 条件数据展示 end*/
//分享前端核心代码

// 游戏内分享到qq再到qq的三点分享图片设置
function isQQ() {
	return / qq\//i.test(navigator.userAgent);
}
if (isQQ() && milo.request('ADTAG') == '') {
	if (location.href.indexOf('?') != -1) {
		location.href = location.href + '&ADTAG=tgi.qq.share.qq';
	}
	else {
		location.href = location.href + '?ADTAG=tgi.qq.share.qq';   
	}
}

window.flagShare = true;
var g_tgms = {isWX:false,isQQ:false};
var WxQqShareInfo = {"iId":"226","iDemandId":"2241","sShareTitle":"\u9ed1\u5316\u6b66\u5668\u4e13\u9898-\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u5b98\u65b9\u7f51\u7ad9-\u817e\u8baf\u6e38\u620f","sShareDesc":"\u300a\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u300b\u9ed1\u5316\u6b66\u5668\u4e13\u9898\uff0c\u6d77\u91cf\u5927\u793c\u7b49\u4f60\u6765\u9886\u53d6\uff0c\u5343\u4e07\u522b\u9519\u8fc7\u54e6~","sShareImgUrl":"\/\/game.gtimg.cn\/images\/codo\/act\/lb_atemple\/img\/share\/gameIcon.jpg","sShareLink":"","iType":"1"};
var divShare = '<div id="share_shadow" onclick="hideShadow()"><img src="//game.gtimg.cn/images/codo/act/lb_atemple/img/share/guide.png" alt=""></div>';
//var divShare = '<div class="share-bg" style="display:none;z-index: 1000;"><img src="//game.gtimg.cn/images/cf/lbact/a20190703lbnq07d/guide.png" alt=""></div>';
window.shouyouInfo = {};

$('body').on('click','.share-bg', function(){
    $(this).hide();
});
//将// -> https://
function formatUrl(url){
	if(url.indexOf("//") == 0){
		url = "https:" +  url;
	}
	return url;
}
// 若分享图片为空，则不调用下边这段程序
if(popup.isMobile() && typeof WxQqShareInfo.sShareImgUrl !='undefined' && WxQqShareInfo.sShareImgUrl != ''){
	$('.share-bg').remove();
	$('body').append(divShare);
	$('body').on("click",".share-bg",function(){
			$('.share-bg').hide();
	})
	$('body').on("touchstart",".share-bg",function(){
			$('.share-bg').hide();
	})
	popup.loadjs("//ossweb-img.qq.com/images/js/TGMobileShare/TGMobileShare.min.js",function(){
		var shareCfgInfo = WxQqShareInfo;
		var urlLink = location.href;
		if(location.href.indexOf("?") != -1){
			urlLink = location.href.split("?")[0];
		}
		var sShareLink = shareCfgInfo.sShareLink == ""?(urlLink):shareCfgInfo.sShareLink;
		var sShareImgUrl = shareCfgInfo.sShareImgUrl;
		var sShareDesc = shareCfgInfo.sShareDesc;
		var sShareTitle = shareCfgInfo.sShareTitle;
		TGMobileShare({
	    //不设置或设置为空时，页面有title，则调取title
	    shareTitle:sShareTitle,
	    //不设置或设置为空时，页面有Description，则调取Description
	    shareDesc:sShareDesc,
	    //分享图片尺寸200*200，大小控制在10k左右，且填写绝对路径
	    shareImgUrl:formatUrl(sShareImgUrl),
	    //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
	    shareLink: formatUrl(sShareLink ),
	    //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
	    actName:'a20200727hhwq',
	    //初始化完成的回调方法，tgms参数为Object类型，有isWX，isQQ，fileName，tcssName四个属性
	    onInit:function(tgms){
	    		g_tgms = tgms;
	        //alert('分享信息设置完毕啦！\n' + '当前是否是微信访问：\n' + tgms.isWX + '\n当前是否是手Q访问：\n' + tgms.isQQ + '\n当前文件名(除去扩展名)为：\n' + tgms.fileName + '\n当前tcss点击流命名前缀为：\n' + tgms.tcssName + '\n当前手机系统为：\n' + tgms.osType);
	    },
	    //12个分享回调方法（分享成功和取消分享）,回调方法中无需再加分享tcss统计代码，组件默认已加了
	    onShare:{
	        WXToMessageSuccess:function(){milo.cookie.set("isSharedWxApp","1");$('.share-bg').hide();$("#share_shadow").hide();},
	        WXToMessageCancel:function(){},
	        WXToTimelineSuccess:function(){milo.cookie.set("isSharedWxApp","1");$('.share-bg').hide();$("#share_shadow").hide();},
	        WXToTimelineCancel:function(){},
	        QQToQQSuccess:function(){milo.cookie.set("isSharedQQApp","1");milo.cookie.set("isSharedQFrd","1");$('.share-bg').hide();$("#share_shadow").hide();},
	        QQToQQCancel:function(){},
	        QQToQzoneSuccess:function(){milo.cookie.set("isSharedQQApp","1");milo.cookie.set("isSharedQZone","1");$('.share-bg').hide();$("#share_shadow").hide();},
	        QQToQzoneCancel:function(){},
	        QQToMessageSuccess:function(){milo.cookie.set("isSharedQQApp","1");$('.share-bg').hide();$("#share_shadow").hide();},
	        QQToMessageCancel:function(){},
	        QQToTimelineSuccess:function(){milo.cookie.set("isSharedQQApp","1");$('.share-bg').hide();$("#share_shadow").hide();},
	        QQToTimelineCancel:function(){}
	    }
		});
	});
}

// 有邀请的wx/qq app分享
function invtTGMobileShare(){
	popup.loadjs("//ossweb-img.qq.com/images/js/TGMobileShare/TGMobileShare.min.js",function(){
		var shareCfgInfo = WxQqShareInfo;
		var sShareLink = shareCfgInfo.sShareLink == ""?(window.location.href):shareCfgInfo.sShareLink;
		var sShareImgUrl = shareCfgInfo.sShareImgUrl;
		var sShareDesc = shareCfgInfo.sShareDesc;
		var sShareTitle = shareCfgInfo.sShareTitle;
		//sShareLink = delUrlArs(sShareLink,'sInviteCode');
		//sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
		sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
		sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
		TGMobileShare({
			//不设置或设置为空时，页面有title，则调取title
			shareTitle:sShareTitle,
			//不设置或设置为空时，页面有Description，则调取Description
			shareDesc:sShareDesc,
			//分享图片尺寸200*200，大小控制在10k左右，且填写绝对路径
			shareImgUrl:formatUrl(sShareImgUrl),
			//分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
			shareLink: formatUrl(sShareLink ),
			//点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
			actName:'a20200727hhwq',
			//初始化完成的回调方法，tgms参数为Object类型，有isWX，isQQ，fileName，tcssName四个属性
			onInit:function(tgms){
				g_tgms = tgms;
				//alert('分享信息设置完毕啦！\n' + '当前是否是微信访问：\n' + tgms.isWX + '\n当前是否是手Q访问：\n' + tgms.isQQ + '\n当前文件名(除去扩展名)为：\n' + tgms.fileName + '\n当前tcss点击流命名前缀为：\n' + tgms.tcssName + '\n当前手机系统为：\n' + tgms.osType);
			},
			//12个分享回调方法（分享成功和取消分享）,回调方法中无需再加分享tcss统计代码，组件默认已加了
			onShare:{
				WXToMessageSuccess:function(){milo.cookie.set("isSharedWxApp","1");$("#share_shadow").hide();},
				WXToMessageCancel:function(){},
				WXToTimelineSuccess:function(){milo.cookie.set("isSharedWxApp","1");$("#share_shadow").hide();},
				WXToTimelineCancel:function(){},
				QQToQQSuccess:function(){milo.cookie.set("isSharedQQApp","1");milo.cookie.set("isSharedQFrd","1");$("#share_shadow").hide();},
				QQToQQCancel:function(){},
				QQToQzoneSuccess:function(){milo.cookie.set("isSharedQQApp","1");milo.cookie.set("isSharedQZone","1");$("#share_shadow").hide();},
				QQToQzoneCancel:function(){},
				QQToMessageSuccess:function(){milo.cookie.set("isSharedQQApp","1");$("#share_shadow").hide();},
				QQToMessageCancel:function(){},
				QQToTimelineSuccess:function(){milo.cookie.set("isSharedQQApp","1");$("#share_shadow").hide();},
				QQToTimelineCancel:function(){}
			}
		});
	});
}
// 删除url指定参数
function delUrlArs(url,name){
	var urlArr = url.split("?");
	var baseUrl = urlArr[0];
	var query = (urlArr[1] == undefined ? '' : urlArr[1]);
	if (query.indexOf(name)>-1) {
		var obj = {}
		var arr = query.split("&");
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split("=");
			obj[arr[i][0]] = arr[i][1];
		}
		delete obj[name];
		var url = baseUrl +'?'+ JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
		return url;
	}
	return window.location.href;
}

//给url添加指定参数
function addUrlArs(url,arg,val){
	var urlArr = url.split("?");
	var baseUrl = urlArr[0];
	var query = (urlArr[1] == undefined ? '' :  urlArr[1]);
	var obj = {}
	var arr = query.split("&");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split("=");
		obj[arr[i][0]] = arr[i][1];
	}
	obj[arg] = val;
	url = baseUrl +'?'+ JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
	return url;
}

function shareWxQQApp(){
	var shareCfgInfo = WxQqShareInfo;
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	if(!g_tgms.isWX && !g_tgms.isQQ ){
		//如果pc 如果移动端
		if(!popup.isMobile()){
			//出一个页面进行扫描再分享
			if(iInviteFlow > 0){ // 有邀请的分享
				if(!sInviteCode){
					amsSubmit(iActivityId,iInviteFlow); // 需要初始化邀请码
					setTimeout(function(){},3000);
				}
				sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
				sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
				milo.cookie.set("isSharedWxApp","1");
				window.open('https://game.qq.com/share/weixin.htm?url='+ encodeURIComponent(sShareLink) +'&title='+ encodeURIComponent(sShareTitle) +'&pic='+sShareImgUrl);
			}else{ // 其他分享
				milo.cookie.set("isSharedWxApp","1");
				window.open('https://game.qq.com/share/weixin.htm?url='+ encodeURIComponent(window.location.href) +'&title='+ encodeURIComponent(sShareTitle) +'&pic='+sShareImgUrl);
			}
		}else {
			//请用微信或手Q打开后再分享
			alert("请用微信或手Q打开后再分享");
		} 
	}else { 
		$('.share-bg').show();
	}
}
 
function shareQZone(){ //直接弹出一个页面进行分享 
	var shareCfgInfo = WxQqShareInfo;
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	if(iInviteFlow > 0){ // 有邀请的分享
		if(!sInviteCode){
			amsSubmit(iActivityId,iInviteFlow); // 需要初始化邀请码
			setTimeout(function(){},3000);
		}
		sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
		sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
		window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ encodeURIComponent(sShareLink) +'&summary='+encodeURIComponent(sShareDesc)+'&title='+ encodeURIComponent(sShareTitle) +'&pics='+sShareImgUrl,'','width=840, height=540');
		milo.cookie.set("isSharedQZone","1");
	}else { // 其他分享
		window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ encodeURIComponent(sShareLink) +'&summary='+encodeURIComponent(sShareDesc)+'&title='+ encodeURIComponent(sShareTitle) +'&pics='+sShareImgUrl,'','width=840, height=540');
		milo.cookie.set("isSharedQZone","1");
	}

}

function shareQFrd(){
	if(popup.isMobile()){
		alert('暂不支持在手机端进行分享好友操作，请到电脑端进行操作!');return;
	}
	var shareCfgInfo = WxQqShareInfo;
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	if(iInviteFlow > 0){ // 有邀请的分享
		if(!sInviteCode){
			amsSubmit(iActivityId,iInviteFlow); // 需要初始化邀请码
			setTimeout(function(){},3000);
		}
		sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
		sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
		window.open('https://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(sShareLink)+'&summary='+encodeURIComponent(sShareDesc)+
				'&title='+encodeURIComponent(sShareTitle)+'&pics='+sShareImgUrl);
		milo.cookie.set("isSharedQFrd","1");
	}else { // 其他分享
		window.open('https://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(sShareLink)+'&summary='+encodeURIComponent(sShareDesc)+
				'&title='+encodeURIComponent(sShareTitle)+'&pics='+sShareImgUrl);
		milo.cookie.set("isSharedQFrd","1");
	}
}

function sharedNeiqian(){
	/*var shareCfgInfo = {};
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	var shouyouInfo = '{"MsdkMethod":"WGSendToQQ","scene":"1","title":"手游内分享","desc":"shouyou share","url":"https://cfm.qq.com/lbact/a20190702lbcfnlc/neiqian_hv.html"}'
	msdkShare(shouyouInfo);
	milo.cookie.set("isSharedNeiqian","1");*/
}

function shareWxQQAppAndGet(iActivity,iFlow,func){
	shareWxQQApp();
	func(iActivity,iFlow);
	/*var isSharedWxApp = milo.cookie.get("isSharedWxApp");
	var isSharedQQApp = milo.cookie.get("isSharedQQApp");
	if(isSharedWxApp || isSharedQQApp){
		if(typeof func == 'function'){
			func(iActivity,iFlow);
		}
	}*/
} 

function shareQZoneAndGet(iActivity,iFlow,func){
	shareQZone();
	func(iActivity,iFlow);
	/*var isSharedQZone = milo.cookie.get("isSharedQZone");
	if(isSharedQZone){
		if(typeof func == 'function'){
			func(iActivity,iFlow);
		}
	}*/
}

function shareQFrdAndGet(iActivity,iFlow,func){
	shareQFrd();
	func(iActivity,iFlow);
	/*var isSharedQFrd = milo.cookie.get("isSharedQFrd");
	if(isSharedQFrd){
		if(typeof func == 'function'){
			func(iActivity,iFlow);
		}
	}*/
}

function shareNeiqianAndGet(iActivity,iFlow,func){
	func(iActivity,iFlow);
	$("#shouyou_share").trigger(igTap);
	$("#shouyou_share").addClass("shareBtn");

	// 手游游戏内分享设置
	if(window.flagShare){
		    $("#shouyou_share").addClass("shareBtn");
			//设置分享文案
		    var urlLink = location.href;
			if(location.href.indexOf("?") != -1){
				urlLink = location.href.split("?")[0];
			}
			window.flagShare = false;
			var sShareLink = formatUrl((shouyouInfo.sShareLink == "" || shouyouInfo.sShareLink == undefined)?(urlLink):shouyouInfo.sShareLink);
			var sShareImgUrl = formatUrl(shouyouInfo.sShareImgUrl == undefined?"":shouyouInfo.sShareImgUrl);
			var sShareDesc = shouyouInfo.sShareDesc;
			var sShareTitle = shouyouInfo.sShareTitle;
			var sharedata = {
				title:sShareTitle
				,desc:sShareDesc
				,url:sShareLink
				,img:sShareImgUrl   //换成游戏LOGO
			}
			//初始化
			if (typeof igShare == 'undefined') return;
			window.ingameShare = new igShare({
				shareData:sharedata,
				tcss:"ingame.share"
			});
			$("#shouyou_share").trigger(igTap);
	}
}


//显示分享遮罩
function showShareOnly(){
	// pc 有遮罩层
	if(!popup.isMobile()){
		$("#mask").css("height",$(document).height());
		$("#mask").css("width",$(document).width());
		$(".s_weixin").attr("href","javascript:shareWxQQApp();");
		$(".s_sqq").attr("href","javascript:shareQFrd();");
		$(".s_qzone").attr("href","javascript:shareQZone();");
		$(".s_wxfrd").attr("href","javascript:shareWxQQApp();");
		$("#mask").show();
	}else{
		$("#share_shadow").css("height",$(document).height());
		$("#share_shadow").css("width",$(document).width());
		$('#share_shadow').show();
		$('.share-bg').show();
	}
}

//显示分享领奖遮罩
function showShareAndGet(iActivity,iFlow,func){
	if(!popup.isMobile()){
		$("#mask").css("height",$(document).height());
		$("#mask").css("width",$(document).width());
		var func1 = 'javascript:shareWxQQAppAndGet(' + iActivity + ',' + iFlow + ',' +  'doAmsAction);';
		var func2 = 'javascript:shareQFrdAndGet(' + iActivity + ',' + iFlow + ',' +  'doAmsAction);';
		var func3 = 'javascript:shareQZoneAndGet(' + iActivity + ',' + iFlow + ',' +  'doAmsAction);';
		$(".s_weixin").attr("href",func1);
		$(".s_wxfrd").attr("href",func1);
		$(".s_sqq").attr("href",func2);
		$(".s_qzone").attr("href",func3);
		$("#mask").show();
	}else {
		if(typeof func == 'function'){
			func(iActivity,iFlow);
		}
		$("#share_shadow").css("height",$(document).height());
		$("#share_shadow").css("width",$(document).width());
		$('#share_shadow').show();
		$('.share-bg').show();
	}
}

//隐藏分享和分享领奖遮罩
function hideMask() {
	$("#mask").hide();
}

function hideShadow() {
	$("#share_shadow").hide();
	$('.share-bg').hide();
}


//判断是否是微信浏览器的函数
function isWeiXin(){
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
  return true;
  }else{
  return false;
  }
}

// 助手 app 分享 ------ start
window.AppShareInfo = {};
var isGameHelper = function () {
	return (/GameHelper/.test(navigator.userAgent) || milo.request('token') || typeof GameHelper !== 'undefined') ? true : false;
}
function shareApp () {
	if (typeof (GameHelper) != "undefined" && typeof (GameHelper.shareWebPageWithFuntion) != "undefined") {
		var title = window.AppShareInfo.sShareTitle,
			desc = window.AppShareInfo.sShareDesc,
			icon = window.AppShareInfo.sShareImgUrl,
			url = window.AppShareInfo.sShareLink || window.location.href;
		if (icon.indexOf('http') !== 0) {
			icon = window.location.protocol + icon
		}
		if (url.indexOf('http') !== 0) {
			url = window.location.protocol + url
		}
		GameHelper.shareWebPageWithFuntion(title, desc, icon, url, '1,2,3,4,5', 1);
	} else {
		alert('请下载游戏最新助手APP参与本次活动');
	}
}
// 判定该页面的类型是app助手页面 gameType(1-端游 2-手游)
function pageTypeIsGameHelper(){
	return (window.gametype == 2 && window.templatetype == 3) || (window.gametype == 1 && window.templatetype == 1)
}
function shareAppAndGet(iActivity,iFlow,func){
	func(iActivity,iFlow);
	if (pageTypeIsGameHelper() && isGameHelper()) {
		shareApp();
	}
}
$(document).ready(function(){
	console.log(window.AppShareInfo, window.templatetype, window.servicetype, window.gametype)
	if (pageTypeIsGameHelper() && !isGameHelper()) {
		window.doAmsAction = function() {
			alert('请下载游戏最新助手APP参与本次活动');
		}
		window.doBuyAmsAction = function() {
			alert('请下载游戏最新助手APP参与本次活动');
		}
	}
});
// 助手 app 分享 ------ end


//暂存箱查看
amsCfg_0 = {
  'iAMSActivityId' : iActivityId, // AMS活动号
  'iLotteryFlowId' : '0', //  查询获奖轮播的流程号
  'activityId' : iLotteryId , // 模块实例号
  'pageSize' : 8,
  '_everyRead': true,
  'isForce': true,
  'contentId' : 'getGiftContent_0', //容器ID
  'templateId' : 'getGiftTemplate_0', //模板ID
  'contentPageId' : 'getGiftPageContent_0',	//分页容器ID
  'showContentId' : 'showMyGiftContent_0' //弹出层ID
};
amsCfg_0 = {
  'iAMSActivityId' : '204987', // AMS活动号
  'activityId' : '261746', // 模块实例号
  'sData': {
      'tmpTypeId': 1,
      'tmpSeqId': 0,
      'tmpPackageId': 0,
      'xhr':true
  },
  '_everyRead': true,
  'onBeginGetGiftEvent' : function(){
      return 0; // 抽奖前事件，返回0表示成功
  },
  'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
      alert(callbackObj.sMsg);
  },
  'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件

      LotteryManager.alert(callbackObj.sMsg);
  }
};
//发送
var doBoxUserGet = function( id, iPackageId, packageName, iPackageGroupId){
  amsCfg_0.sData["tmpSeqId"] = id;
  amsCfg_0.sData["tmpPackageId"] = iPackageId;
  var targetZone = typeof window.biFareaName == 'undefined'?"游戏内":"[" +window.biFareaName +"]";  
  $("#lbConfirmDlgText").html('确认将<span >'+packageName+'</span>发放到'+ targetZone +'么？');
  setTimeout(function(){ TGDialogS('lbConfirmDlg');},300);
};

var allLubanBoxPkgIds = [];

var allLubanFlashObj = [];
// cfm h5 登录态处理
var wwv = milo.request('_wwv');
// 是否是微信内打开
function isWechat() {
	return /MicroMessenger/i.test(navigator.userAgent);
}

// 是否是手Q内打开
function isQQ() {
	return / qq\//i.test(navigator.userAgent);
}

var cfmUserInfo = {
	nickName: "",
	isLogin: false
};
function checkLoginOnly(){
	return cfmUserInfo.isLogin;
}
milo.ready(function(){
	$(function(){

		 // 屏蔽分享
		 if (typeof ishareoff != 'undefined' && ishareoff == 1) { 
			setTimeout(function () {
				need('biz.wxclient',function(WXClient){
					document.domain = 'cfm.qq.com';
					WXClient.init({
						sAppId:'wx13e246b80664feec',
						debug:false //调试环境：关闭
					},function(wx){
					//这里拿到的wx就是wxjssdk的全局对象,已经做过签名和初始化了，可以直接调用wxjssdk的方法。
					// alert(JSON.stringify(wx));
						wx.hideMenuItems({
							menuList: ["menuItem:share:qq","menuItem:share:appMessage", "menuItem:share:timeline","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook","menuItem:share:QZone","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:copyUrl","menuItem:share:brand"]
						});
					})
				})
			}, 0);
		}

		  need("biz.login",function(LoginManager){
			  var game_appid="wx58164a91f1821369";
        	  var wx_appid="wx13e246b80664feec";
        	  var sServiceType="cfmwx";   
        	  var baseurl=location.href; //是否要带后边的参数
        	  var reqCode = milo.request("code");
			  var reqAppid = milo.request("appid");
			  if ( reqAppid == game_appid && LoginManager.isWxApp() ) {
        		    var redirectUrl=baseurl+"?acctype=wx&appid="+wx_appid+"&sServiceType="+sServiceType;
        		    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wx_appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        	  }
			  else
			  {
				if ( reqCode == '' || !reqCode) {
        	      if (LoginManager.isWxApp() ){
                  var redirectUrl=baseurl+"?acctype=wx&appid="+wx_appid+"&sServiceType="+sServiceType;
        	          window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wx_appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
					}
				}
				LoginManager.init({
					appConfig:{
						"QQBrowserAppId":"106",  //在QQ浏览器端申请的APPID，联系人：Andorid：ricedeng(邓磊)  IOS：kingjlhuang(黄金龙)
						"WxAppId":"wx58164a91f1821369",  //需要在微信申请openLink权限，联系人：johnnyliu(刘南江)
						"AppName":"CFM",  //业务的中文名称
						"scope":"snsapi_userinfo",  //默认是 snsapi_base 静默授权，如果游戏无静默权限，就需要手动改成 snsapi_userinfo
					}
				});

				var QQAppId = '1104512706';
				var WeixinAppId = 'wx58164a91f1821369';
				
				LoginManager.checkLogin(function(user){
					// 自定义登录回调
					if (typeof lbCallBackAfterLogin == 'function') {
						lbCallBackAfterLogin(LoginManager)
					}
					cfmUserInfo.isLogin = true;
					//验证当前IOS/ANDROID环境
					if($.os.ios ){//IOS
						var myplatid = 0;
					}
					else {//Android
						var myplatid = 1;
						//var myplatid = 0;//浏览器测试iOS用，正式环境需屏蔽该条
					}
					//验证是否wx登录态   or qq登录态
					if (milo.cookie.get("acctype")=="wx"){//WX
						var _appid = WeixinAppId;
						var myarea = 1;
					}
					else {//QQ
						var _appid = QQAppId;
						var myarea = 2;
					}
					amsCfg_687494.sData.appid = _appid; amsCfg_687494.sData.sArea = myarea; amsCfg_687494.sData.sPlatId = myplatid; amsCfg_687498.sData.appid = _appid; amsCfg_687498.sData.sArea = myarea; amsCfg_687498.sData.sPlatId = myplatid; amsCfg_687606.sData.appid = _appid; amsCfg_687606.sData.sArea = myarea; amsCfg_687606.sData.sPlatId = myplatid; 
amsCfg_687489.sData.appid = _appid; amsCfg_687489.sData.sArea = myarea; amsCfg_687489.sData.sPlatId = myplatid; amsCfg_687489.sData.ams_appname = 'cfm_open'; amsCfg_687489.sData.ams_targetappid = 'wx58164a91f1821369';
amsCfg_687492.sData.appid = _appid; amsCfg_687492.sData.sArea = myarea; amsCfg_687492.sData.sPlatId = myplatid; amsCfg_687492.sData.ams_appname = 'cfm_open'; amsCfg_687492.sData.ams_targetappid = 'wx58164a91f1821369';
  
					
					if(typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0){
        	 window["amsCfg_"+iSighQueryFlow].sData.appid = _appid;
           window["amsCfg_"+iSighQueryFlow].sData.sArea = myarea;
           window["amsCfg_"+iSighQueryFlow].sData.sPlatId = myplatid;
           amsInit(iActivityId, iSighQueryFlow);
          }
          if(typeof iQualType!= 'undefined'){
							qOnlyJF();
				}
				qDsFunc();
				if(iDecryptFlow > 0){ // 邀请登录回调
					if (milo.cookie.get("acctype")=="wx"){ //WX
						LoginManager.getUserInfoByWxOpenId({
							openid: user.openid,
							access_token: milo.cookie.get('access_token')
						}, function(data) {
							cfmUserInfo.nickName = encodeURIComponent(data.nickname); // 获取到的微信昵称
							cfmUserInfo.isLogin = true;
							inviteLoginCall();
						});
					} else { //QQ
						cfmUserInfo.nickName = user.nickName;
						cfmUserInfo.isLogin = true;
						inviteLoginCall();
					}
				}
				setLoginBtnShow(0);
				$("#ptLogoutBtn").on("click",function(){setLoginBtnShow(1);});                 
				},function(){
					if(wwv == 2)
					{
						
						document.getElementById("ptLoginBtn").click();
					}
						setLoginBtnShow(1);
						// alert("请先登录");
				});
				}
		  });
	});
});

function setLoginBtnShow(type){
	if(type == 1){
		if(isQQ()){
			$("#ptLoginBtn").show();
			$("#wx123").hide();
			$("#ptLogoutBtn").hide();
		}else if(isWechat()){
			$("#ptLoginBtn").hide();
			$("#wx123").show();
			$("#ptLogoutBtn").hide();
		}else {
			if (gLogCfg.iLoginTypeSwitch == 3 || typeof gLogCfg.iLoginTypeSwitch == 'undefined'){
				$("#ptLoginBtn").show();
				$("#wx123").show();
			}else if(gLogCfg.iLoginTypeSwitch == 1){ // qq
				$("#ptLoginBtn").show();
				$("#wx123").hide();
			}else if(gLogCfg.iLoginTypeSwitch == 2){ // wx 
				$("#ptLoginBtn").hide();
				$("#wx123").show();
			}
			$("#ptLogoutBtn").hide();
		}
	}else if(type == 0){
		if(isQQ()){
			//$("#ptLogoutBtn").hide();
		}else if(isWechat()){
			//$("#ptLogoutBtn").hide();
		}
	}
}

function doAmsAction(iAct,iFlow)
{
	need("biz.login",function(LoginManager){
		LoginManager.checkLogin(function(user){
			window.checkAreaValue = 0;
			eval( 'window.checkAreaValue = amsCfg_'+iFlow+'.sData.sArea;' );
			if(window.checkAreaValue == 0){
				return;
			}
			if (typeof window["amsCfg_"+iFlow].sData.sArea != 'undefined'){
				var t_SArea = window["amsCfg_"+iFlow].sData.sArea;
				if(t_SArea == 2){
					window["amsCfg_"+iFlow].sData.ams_targetappid = '1104512706';
				}else {
					window["amsCfg_"+iFlow].sData.ams_targetappid = 'wx58164a91f1821369';
				}
			}
			amsSubmit(iAct,iFlow);
		},function(){
			//alert('请先登录');
			//document.getElementById("wx123").click();
			if(wwv == 2)
					{
						
						document.getElementById("ptLoginBtn").click();
					}
			setLoginBtnShow(1);
			alert("请先登录");
		});
	});
}

// 道聚城购买
function doBuyAmsAction(iAct,iFlow){
	var payType = eval( 'amsCfg_'+iFlow+'.sData.paytype;' );
	if (isIOS() && (payType == 2)) { // ios玩家暂不支持人民币购买
		alert("暂不支持iOS用户参与，敬请期待");
		return false;
	}
	if (payType != 2) {
		$('#confirmPayDlgTxt').html('您正在使用' + window['payTypeDaiBiName_' + iFlow] + '购买游戏内道具<br>请确认？');
		$('#confirmToPay').attr('href', 'javascript:doAmsAction(' + iAct + ',' + iFlow  +');');
		TGDialogS('confirmPayDlg');
	} else {
	    doAmsAction(iAct,iFlow);
    }
}

// 是否是 iOS
function isIOS() {
	return /iphone|ipod|ipad/i.test(navigator.userAgent);
}

// 是否是游戏内打开
function isMSDK() {
	var msdkEncodeParam = milo.request('msdkEncodeParam');
	return !!msdkEncodeParam;
}

milo.ready(function(){
	$("#wx123").on("click",function(){
	    var wx_appid="wx13e246b80664feec";
	    var sServiceType="cfmwx";
	    var baseurl=location.href;
	
	    $(function(){
	        need("biz.login",function(LoginManager){
	            //alert(wxapp);
	            if (LoginManager.isWxApp())
	            {
	                var redirectUrl=baseurl+"?acctype=wx&appid="+wx_appid+"&sServiceType="+sServiceType;
	                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wx_appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	            }
	            else
	            {
	                //$("#wxloginBtn").trigger("click");
					//var surl = encodeURIComponent("https://cfm.qq.com/cp/a20171117cfmhd/index.htm")
					var openLinkId = typeof gLubanOpenLinkId != 'undefined'? gLubanOpenLinkId : 0;
					if (openLinkId == 0) {
						alert('请复制当前链接，到微信客户端打开');
						return;
					} else {
						window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=" + openLinkId + "&appid=wx58164a91f1821369&url="+ encodeURIComponent(baseurl) +"#wechat_redirect";
					}
	            }
	        });
	    });

	});
})


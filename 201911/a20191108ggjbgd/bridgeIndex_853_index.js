amsCfg_615969 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615975 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615976 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615978 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615979 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615980 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615981 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615982 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615983 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




amsCfg_615984 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        //签到回调
        if(false && typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0 ){
            amsInit(iActivityId, iSighQueryFlow);
        }
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){ // 多连抽进暂存箱的不处理
            qOnlyJF();qDsFunc();
            alert(callbackObj.sMsg);
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




var jfIdMap = {"2384":"600"};
var flowIdMap = {"6311":"615969","6312":"615975","6314":"615976","6315":"615978","6316":"615979","6317":"615980","6318":"615981","6319":"615982","6320":"615983","6321":"615984","6322":"615992","6323":"615993"};
var flowIdValid = ["615969","615975","615976","615978","615979","615980","615981","615982","615983","615984"];
//提交请求至AME
	amsCfg_615992 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    615992, //流程id
		"sData":{//自定义传参
		},
		"sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
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
										$(this).addClass("btn-zhih");
									}else {
										$(this).removeClass("btn-zhih");
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
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};
//提交请求至AME
	amsCfg_615993 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    615993, //流程id
		"sData":{//自定义传参
		},
		"sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
			//console.log(res);
			var sOutValue1 = res.sOutValue1;
			//511989:11:0|514717:11:0|515529:11:0
			var aParts = sOutValue1.split("|");
			var lng = aParts.length;
			for(i = 0 ; i < lng ;i ++){
				var bParts = aParts[i].split(":");
				if(bParts.length == 3){
					var jfId = jfIdMap[bParts[0]];
					var tot = bParts[1];
					var ticket = bParts[2];
					$('[id=Jf_'+jfId+'_1]').text(ticket);
					$('[id=Jf_'+jfId+'_2]').text(tot);
				}
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};


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

//暂存箱
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

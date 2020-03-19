amsCfg_644039 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644039 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644039 , callbackObj);
        }
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




amsCfg_644042 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644042 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644042 , callbackObj);
        }
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




amsCfg_644043 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644043 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644043 , callbackObj);
        }
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




amsCfg_644044 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644044 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644044 , callbackObj);
        }
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




amsCfg_644045 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644045 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644045 , callbackObj);
        }
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




amsCfg_644046 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644046 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644046 , callbackObj);
        }
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




amsCfg_644047 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644047 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644047 , callbackObj);
        }
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




amsCfg_644048 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644048 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644048 , callbackObj);
        }
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




amsCfg_644049 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644049 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644049 , callbackObj);
        }
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




amsCfg_644050 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644050 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644050 , callbackObj);
        }
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




amsCfg_644051 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644051 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644051 , callbackObj);
        }
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




amsCfg_644052 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644052 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644052 , callbackObj);
        }
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




amsCfg_644053 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644053 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644053 , callbackObj);
        }
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




amsCfg_644054 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644054 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644054 , callbackObj);
        }
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




amsCfg_644055 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644055 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644055 , callbackObj);
        }
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




amsCfg_644056 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644056 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644056 , callbackObj);
        }
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




amsCfg_644057 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644057 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644057 , callbackObj);
        }
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




amsCfg_644058 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644058 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644058 , callbackObj);
        }
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




amsCfg_644059 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644059 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644059 , callbackObj);
        }
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




amsCfg_644060 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644060 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644060 , callbackObj);
        }
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




amsCfg_644061 = {
    'iAMSActivityId' : iActivityId, // AMS活动号
    'activityId' : iLotteryId, // 模块实例号
    
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 644061 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // 自定义回调
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 644061 , callbackObj);
        }
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




var jfIdMap = {"2496":"794"};
var flowIdMap = {"8624":"644039","8625":"644042","8626":"644043","8627":"644044","8628":"644045","8629":"644046","8630":"644047","8631":"644048","8632":"644049","8633":"644050","8634":"644051","8635":"644052","8636":"644053","8637":"644054","8638":"644055","8639":"644056","8640":"644057","8641":"644058","8642":"644059","8643":"644060","8644":"644061","8645":"644062","8646":"644063","8647":"644064"};
var flowIdValid = ["644039","644042","644043","644044","644045","644046","644047","644048","644049","644050","644051","644052","644053","644054","644055","644056","644057","644058","644059","644060","644061"];
// 查询资格流程
	amsCfg_644062 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    644062, //流程id
		"sData":{//自定义传参
		},
		"sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
			// 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 644062 , res);
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
			// 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('failed', 644062 , res);
            }	
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};
// 查询积分流程
	amsCfg_644063 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    644063, //流程id
		"sData":{//自定义传参
		},
		"sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
            // 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 644063 , res);
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
                lbCallBackOfAmsSubmit('failed', 644063 , res);
            }			
			//失败会走到这个函数
			//条件不满足，ame返回大于0是后走到这里
			alert(res.sMsg);
		}
	};
// 查询条件数据流程		
	amsCfg_644064 = {
		"iActivityId": iActivityId, //活动id	
		"iFlowId":    644064, //流程id
		"sData":{//自定义传参
		},
		"sNeedSubmitPopDiv":  false , // 是否开启loading层
		"fFlowSubmitEnd": function(res){
            // 自定义回调
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 644064 , res);
            }					
			//e0c747b4b51392caf0c99162e69125d8:iRet:0|b1ecb3ecd311175835723e484f2d8d88:iRet:0
			var sOutValue1 = res.sOutValue1;
			var aParts = sOutValue1.split("|");
			var lng = aParts.length;
			for(i = 0 ; i < lng ;i ++){
				var bParts = aParts[i].split(":");
				if(bParts.length == 3){
					var key1 = bParts[0];
					var key2 = replaceAll(bParts[1],'_','---');
					var num = bParts[2];
					$('[id=Ds_'+key1+'_'+key2+']').text(num);
				}
			}
			return;
		},
		"fFlowSubmitFailed":function(res){
			// 自定义回调
			if (typeof lbCallBackOfAmsSubmit == 'function') {
				lbCallBackOfAmsSubmit('failed', 644064 , res);
			}
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

window.pageIsNeiqian = 1;
amsCfg_647143 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647143 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647143 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





amsCfg_647144 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647144 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647144 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





amsCfg_647145 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647145 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647145 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





amsCfg_647091 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647091 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647091 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





amsCfg_647140 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647140 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647140 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





amsCfg_647141 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647141 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647141 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





amsCfg_647142 = {
    'iAMSActivityId' : iActivityId, // AMS���
    'activityId' : iLotteryId, // ģ��ʵ����
    
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
            alert("��Ǹ�����¼CF���Σ�����Ϸ�ڡ����ʻ�в��롿");
            return -1;
        }
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('failed', 647142 , callbackObj);
        }
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // �Զ���ص�
        if (typeof lbCallBackOfAmsSubmit == 'function') {
            lbCallBackOfAmsSubmit('success', 647142 , callbackObj);
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

        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var str = callbackObj.sPackageName;
            qOnlyJF();qDsFunc();
            if(str.indexOf('лл') != -1) {
                alert(callbackObj.sPackageName);
            } else {
                alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
            }
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
            // �µĴ���
            qOnlyJF();qDsFunc();
            if(callbackObj.sPackageCDkey){
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }else{
                alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
                return;
            }

        }
		qOnlyJF();qDsFunc();
		alert(callbackObj.sMsg + boxModuleSuffixTips(callbackObj.iPackageId));
    }
};





var jfIdMap = {"1060":"799","1061":"800","1062":"801","1063":"802","1064":"803","1065":"804","1066":"805","1067":"806","1068":"835","1069":"836","1070":"837","1071":"838","1072":"839","1073":"840","1074":"841","1075":"842","1076":"843","1077":"844","1078":"845","1079":"846","1080":"847","1081":"848","1082":"849","1083":"850","1084":"851","1085":"852"};
var flowIdMap = {"8926":"647091","8927":"647140","8928":"647141","8929":"647142","8931":"647143","8962":"647144","8963":"647145","8967":"647146","8968":"647147"};
var flowIdValid = ["647091","647140","647141","647142","647143","647144","647145"];
// ��ѯ�ʸ�����
	amsCfg_647146 = {
		"iActivityId": iActivityId, //�id	
		"iFlowId":    647146, //����id
		"sData":{
        "sPlatId":0,
        "sArea":0,
        "appid":0,
        "ams_appname":"cfm_open",
        "ams_targetappid":"wx58164a91f1821369"
    },
    "sNeedSubmitPopDiv":  false , // �Ƿ���loading��
		"fFlowSubmitEnd": function(res){
			// �Զ���ص�
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 647146 , res);
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
								console.log('��ǰ�����ʸ񲻿ɲ�ѯ�����ܲ��ڿ���ʱ���');
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
							//���빫���ʸ�ȡ��Сֵ
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
			// �Զ���ص�
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('failed', 647146 , res);
            }	
			//ʧ�ܻ��ߵ��������
			//���������㣬ame���ش���0�Ǻ��ߵ�����			
			alert(res.sMsg);
		}
	};
// ��ѯ��������
	amsCfg_647147 = {
		"iActivityId": iActivityId, //�id	
		"iFlowId":    647147, //����id
		"sData":{
        "sPlatId":0,
        "sArea":0,
        "appid":0,
        "ams_appname":"cfm_open",
        "ams_targetappid":"wx58164a91f1821369"
    },
    "sNeedSubmitPopDiv":  false , // �Ƿ���loading��
		"fFlowSubmitEnd": function(res){
            // �Զ���ص�
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('success', 647147 , res);
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
            // �Զ���ص�
            if (typeof lbCallBackOfAmsSubmit == 'function') {
                lbCallBackOfAmsSubmit('failed', 647147 , res);
            }			
			//ʧ�ܻ��ߵ��������
			//���������㣬ame���ش���0�Ǻ��ߵ�����
			alert(res.sMsg);
		}
	};
/*�ʸ� ���� ��������չʾ beg*/
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
//����ֵ���
window.qDsFunc = function (){
    qZigeFunc();
    if(typeof window.qDsFlow != "undefined" && window.qDsFlow != 0){
    amsSubmit(iActivityId, qDsFlow,'ds'); 
}
}
//�ʸ�����ֲ�ѯ�ص� ����djc�������ӳ�2000ms�����
window.qOnlyJF = function (isDjc){
        
        if(typeof isDjc != 'undefined' && isDjc == 1){
            setTimeout(function(){
                qJFFunc(); 
            }  , 2000);
        }else {
            qJFFunc();
        }
}
/*�ʸ� ���� ��������չʾ end*/
//����ǰ�˺��Ĵ���
window.flagShare = true;
var g_tgms = {isWX:false,isQQ:false};
var WxQqShareInfo = {"iType":1,"sShareTitle":"\u62fc\u7f8e\u56fe\u8d62\u5927\u793c-\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u5b98\u65b9\u7f51\u7ad9-\u817e\u8baf\u6e38\u620f","sShareDesc":"\u300a\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u300b\u62fc\u7f8e\u56fe\uff0c\u6d77\u91cf\u5927\u793c\u7b49\u4f60\u6765\u9886\uff01","sShareImgUrl":"https:\/\/game.gtimg.cn\/images\/codo\/act\/lb_atemple\/img\/share\/gameIcon.jpg","sShareLink":"https:\/\/cfm.qq.com\/lbact\/a20200221lb0101n\/h5.html"};
var divShare = '<div id="share_shadow" onclick="hideShadow()"><img src="//game.gtimg.cn/images/codo/act/lb_atemple/img/share/guide.png" alt=""></div>';
//var divShare = '<div class="share-bg" style="display:none;z-index: 1000;"><img src="//game.gtimg.cn/images/cf/lbact/a20190703lbnq07d/guide.png" alt=""></div>';
window.shouyouInfo = {"sShareTitle":"\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u5b98\u65b9\u7f51\u7ad9-\u817e\u8baf\u6e38\u620f","sShareDesc":"\u300a\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u300b\u4e3aCF\u539f\u73ed\u56e2\u961f\u5386\u65f63\u5e74\u7cbe\u5fc3\u6253\u9020\uff0c\u5c06\u4e09\u4ebf\u9f20\u6807\u7684\u67aa\u6218\u68a6\u60f3\u5ef6\u7eed\u5230\u624b\u673a\u4e0a\u3002CF\u6b63\u7248FPS\u624b\u6e38\uff0c\u539f\u6c41\u539f\u5473\uff0c\u4f20\u627f\u7ecf\u5178\uff0c\u706b\u7206\u5f00\u6218\uff0c\u7eaf\u6b63\u7684\u67aa\u6218\u8840\u7edf\uff01","sShareImgUrl":"","sShareLink":"","iType":2};

$('body').on('click','.share-bg', function(){
    $(this).hide();
});
//��// -> https://
function formatUrl(url){
	if(url.indexOf("//") == 0){
		url = "https:" +  url;
	}
	return url;
}
// ������ͼƬΪ�գ��򲻵����±���γ���
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
	    //�����û�����Ϊ��ʱ��ҳ����title�����ȡtitle
	    shareTitle:sShareTitle,
	    //�����û�����Ϊ��ʱ��ҳ����Description�����ȡDescription
	    shareDesc:sShareDesc,
	    //����ͼƬ�ߴ�200*200����С������10k���ң�����д����·��
	    shareImgUrl:formatUrl(sShareImgUrl),
	    //��������Ҫ����ǰҳ��ͬ����(��Q���������Ҫ��) ,�����û�����Ϊ��ʱ��Ĭ�ϵ�ȡ��ǰURL
	    shareLink: formatUrl(sShareLink ),
	    //���������������ͳ�Ʒ�������ר��һ�����Ŀ¼������a20151029demo
	    actName:'a20200221lb0101n',
	    //��ʼ����ɵĻص�������tgms����ΪObject���ͣ���isWX��isQQ��fileName��tcssName�ĸ�����
	    onInit:function(tgms){
	    		g_tgms = tgms;
	        //alert('������Ϣ�����������\n' + '��ǰ�Ƿ���΢�ŷ��ʣ�\n' + tgms.isWX + '\n��ǰ�Ƿ�����Q���ʣ�\n' + tgms.isQQ + '\n��ǰ�ļ���(��ȥ��չ��)Ϊ��\n' + tgms.fileName + '\n��ǰtcss���������ǰ׺Ϊ��\n' + tgms.tcssName + '\n��ǰ�ֻ�ϵͳΪ��\n' + tgms.osType);
	    },
	    //12������ص�����������ɹ���ȡ������,�ص������������ټӷ���tcssͳ�ƴ��룬���Ĭ���Ѽ���
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

// �������wx/qq app����
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
			//�����û�����Ϊ��ʱ��ҳ����title�����ȡtitle
			shareTitle:sShareTitle,
			//�����û�����Ϊ��ʱ��ҳ����Description�����ȡDescription
			shareDesc:sShareDesc,
			//����ͼƬ�ߴ�200*200����С������10k���ң�����д����·��
			shareImgUrl:formatUrl(sShareImgUrl),
			//��������Ҫ����ǰҳ��ͬ����(��Q���������Ҫ��) ,�����û�����Ϊ��ʱ��Ĭ�ϵ�ȡ��ǰURL
			shareLink: formatUrl(sShareLink ),
			//���������������ͳ�Ʒ�������ר��һ�����Ŀ¼������a20151029demo
			actName:'a20200221lb0101n',
			//��ʼ����ɵĻص�������tgms����ΪObject���ͣ���isWX��isQQ��fileName��tcssName�ĸ�����
			onInit:function(tgms){
				g_tgms = tgms;
				//alert('������Ϣ�����������\n' + '��ǰ�Ƿ���΢�ŷ��ʣ�\n' + tgms.isWX + '\n��ǰ�Ƿ�����Q���ʣ�\n' + tgms.isQQ + '\n��ǰ�ļ���(��ȥ��չ��)Ϊ��\n' + tgms.fileName + '\n��ǰtcss���������ǰ׺Ϊ��\n' + tgms.tcssName + '\n��ǰ�ֻ�ϵͳΪ��\n' + tgms.osType);
			},
			//12������ص�����������ɹ���ȡ������,�ص������������ټӷ���tcssͳ�ƴ��룬���Ĭ���Ѽ���
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
// ɾ��urlָ������
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

//��url���ָ������
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
		//���pc ����ƶ���
		if(!popup.isMobile()){
			//��һ��ҳ�����ɨ���ٷ���
			if(iInviteFlow > 0){ // ������ķ���
				if(!sInviteCode){
					amsSubmit(iActivityId,iInviteFlow); // ��Ҫ��ʼ��������
					setTimeout(function(){},3000);
				}
				sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
				sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
				milo.cookie.set("isSharedWxApp","1");
				window.open('https://game.qq.com/share/weixin.htm?url='+ encodeURIComponent(sShareLink) +'&title='+ encodeURIComponent(sShareTitle) +'&pic='+sShareImgUrl);
			}else{ // ��������
				milo.cookie.set("isSharedWxApp","1");
				window.open('https://game.qq.com/share/weixin.htm?url='+ encodeURIComponent(window.location.href) +'&title='+ encodeURIComponent(sShareTitle) +'&pic='+sShareImgUrl);
			}
		}else {
			//����΢�Ż���Q�򿪺��ٷ���
			alert("����΢�Ż���Q�򿪺��ٷ���");
		} 
	}else { 
		$('.share-bg').show();
	}
}
 
function shareQZone(){ //ֱ�ӵ���һ��ҳ����з��� 
	var shareCfgInfo = WxQqShareInfo;
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	if(iInviteFlow > 0){ // ������ķ���
		if(!sInviteCode){
			amsSubmit(iActivityId,iInviteFlow); // ��Ҫ��ʼ��������
			setTimeout(function(){},3000);
		}
		sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
		sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
		window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ encodeURIComponent(sShareLink) +'&summary='+encodeURIComponent(sShareDesc)+'&title='+ encodeURIComponent(sShareTitle) +'&pics='+sShareImgUrl,'','width=840, height=540');
		milo.cookie.set("isSharedQZone","1");
	}else { // ��������
		window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ encodeURIComponent(sShareLink) +'&summary='+encodeURIComponent(sShareDesc)+'&title='+ encodeURIComponent(sShareTitle) +'&pics='+sShareImgUrl,'','width=840, height=540');
		milo.cookie.set("isSharedQZone","1");
	}

}

function shareQFrd(){
	if(popup.isMobile()){
		alert('�ݲ�֧�����ֻ��˽��з�����Ѳ������뵽���Զ˽��в���!');return;
	}
	var shareCfgInfo = WxQqShareInfo;
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	if(iInviteFlow > 0){ // ������ķ���
		if(!sInviteCode){
			amsSubmit(iActivityId,iInviteFlow); // ��Ҫ��ʼ��������
			setTimeout(function(){},3000);
		}
		sShareLink = formatUrl(delUrlArs(sShareLink,'sInviteCode'));
		sShareLink = addUrlArs(sShareLink, 'sInviteCode',sInviteCode);
		window.open('https://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(sShareLink)+'&summary='+encodeURIComponent(sShareDesc)+
				'&title='+encodeURIComponent(sShareTitle)+'&pics='+sShareImgUrl);
		milo.cookie.set("isSharedQFrd","1");
	}else { // ��������
		window.open('https://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(sShareLink)+'&summary='+encodeURIComponent(sShareDesc)+
				'&title='+encodeURIComponent(sShareTitle)+'&pics='+sShareImgUrl);
		milo.cookie.set("isSharedQFrd","1");
	}
}

function sharedNeiqian(){
	/*var shareCfgInfo = {"sShareTitle":"\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u5b98\u65b9\u7f51\u7ad9-\u817e\u8baf\u6e38\u620f","sShareDesc":"\u300a\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u300b\u4e3aCF\u539f\u73ed\u56e2\u961f\u5386\u65f63\u5e74\u7cbe\u5fc3\u6253\u9020\uff0c\u5c06\u4e09\u4ebf\u9f20\u6807\u7684\u67aa\u6218\u68a6\u60f3\u5ef6\u7eed\u5230\u624b\u673a\u4e0a\u3002CF\u6b63\u7248FPS\u624b\u6e38\uff0c\u539f\u6c41\u539f\u5473\uff0c\u4f20\u627f\u7ecf\u5178\uff0c\u706b\u7206\u5f00\u6218\uff0c\u7eaf\u6b63\u7684\u67aa\u6218\u8840\u7edf\uff01","sShareImgUrl":"","sShareLink":"","iType":2};
	var sShareLink = formatUrl((shareCfgInfo.sShareLink == "" || shareCfgInfo.sShareLink == undefined)?(window.location.href):shareCfgInfo.sShareLink);
	var sShareImgUrl = formatUrl(shareCfgInfo.sShareImgUrl == undefined?"":shareCfgInfo.sShareImgUrl);
	var sShareDesc = shareCfgInfo.sShareDesc;
	var sShareTitle = shareCfgInfo.sShareTitle;
	var shouyouInfo = '{"MsdkMethod":"WGSendToQQ","scene":"1","title":"�����ڷ���","desc":"shouyou share","url":"https://cfm.qq.com/lbact/a20190702lbcfnlc/neiqian_hv.html"}'
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

	// ������Ϸ�ڷ�������
	if(window.flagShare){
		    $("#shouyou_share").addClass("shareBtn");
			//���÷����İ�
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
				,img:sShareImgUrl   //������ϷLOGO
			}
			//��ʼ��
			if (typeof igShare == 'undefined') return;
			window.ingameShare = new igShare({
				shareData:sharedata,
				tcss:"ingame.share"
			});
			$("#shouyou_share").trigger(igTap);
	}
}


//��ʾ��������
function showShareOnly(){
	// pc �����ֲ�
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

//��ʾ�����콱����
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

//���ط���ͷ����콱����
function hideMask() {
	$("#mask").hide();
}

function hideShadow() {
	$("#share_shadow").hide();
	$('.share-bg').hide();
}


//�ж��Ƿ���΢��������ĺ���
function isWeiXin(){
  //window.navigator.userAgent���԰�������������͡��汾������ϵͳ���͡�������������͵���Ϣ��������Կ��������ж����������
  var ua = window.navigator.userAgent.toLowerCase();
  //ͨ��������ʽƥ��ua���Ƿ���MicroMessenger�ַ���
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
  return true;
  }else{
  return false;
  }
}

// ���� app ���� ------ start
window.AppShareInfo = {"sShareTitle":"\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u5b98\u65b9\u7f51\u7ad9-\u817e\u8baf\u6e38\u620f","sShareDesc":"\u300a\u7a7f\u8d8a\u706b\u7ebf\u624b\u6e38\u300b\u4e3aCF\u539f\u73ed\u56e2\u961f\u5386\u65f63\u5e74\u7cbe\u5fc3\u6253\u9020\uff0c\u5c06\u4e09\u4ebf\u9f20\u6807\u7684\u67aa\u6218\u68a6\u60f3\u5ef6\u7eed\u5230\u624b\u673a\u4e0a\u3002CF\u6b63\u7248FPS\u624b\u6e38\uff0c\u539f\u6c41\u539f\u5473\uff0c\u4f20\u627f\u7ecf\u5178\uff0c\u706b\u7206\u5f00\u6218\uff0c\u7eaf\u6b63\u7684\u67aa\u6218\u8840\u7edf\uff01","sShareImgUrl":"","sShareLink":"","iType":3};
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
		alert('��������Ϸ��������APP���뱾�λ');
	}
}
// �ж���ҳ���������app����ҳ�� gameType(1-���� 2-����)
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
			alert('��������Ϸ��������APP���뱾�λ');
		}
		window.doBuyAmsAction = function() {
			alert('��������Ϸ��������APP���뱾�λ');
		}
	}
});
// ���� app ���� ------ end


//�ݴ���鿴
amsCfg_0 = {
  'iAMSActivityId' : iActivityId, // AMS���
  'iLotteryFlowId' : '0', //  ��ѯ���ֲ������̺�
  'activityId' : iLotteryId , // ģ��ʵ����
  'pageSize' : 8,
  '_everyRead': true,
  'isForce': true,
  'contentId' : 'getGiftContent_0', //����ID
  'templateId' : 'getGiftTemplate_0', //ģ��ID
  'contentPageId' : 'getGiftPageContent_0',	//��ҳ����ID
  'showContentId' : 'showMyGiftContent_0' //������ID
};
amsCfg_0 = {
  'iAMSActivityId' : '204987', // AMS���
  'activityId' : '261746', // ģ��ʵ����
  'sData': {
      'tmpTypeId': 1,
      'tmpSeqId': 0,
      'tmpPackageId': 0,
      'xhr':true
  },
  '_everyRead': true,
  'onBeginGetGiftEvent' : function(){
      return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
  },
  'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
      alert(callbackObj.sMsg);
  },
  'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�

      LotteryManager.alert(callbackObj.sMsg);
  }
};
//����
var doBoxUserGet = function( id, iPackageId, packageName, iPackageGroupId){
  amsCfg_0.sData["tmpSeqId"] = id;
  amsCfg_0.sData["tmpPackageId"] = iPackageId;
  var targetZone = typeof window.biFareaName == 'undefined'?"��Ϸ��":"[" +window.biFareaName +"]";  
  $("#lbConfirmDlgText").html('ȷ�Ͻ�<span >'+packageName+'</span>���ŵ�'+ targetZone +'ô��');
  setTimeout(function(){ TGDialogS('lbConfirmDlg');},300);
};

var allLubanBoxPkgIds = [];

var allLubanFlashObj = [];
var myopenid = milo.request('myopenid');
var myplatid = milo.request('platid');
var myarea = milo.request('areaid');

function doAmsAction(iAct,iFlow){
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
}

// ���۳ǹ���
function doBuyAmsAction(iAct,iFlow){
	var payType = eval( 'amsCfg_'+iFlow+'.sData.paytype;' );
	if (isIOS() && (payType == 2)) { // ios����ݲ�֧������ҹ���
		alert("�ݲ�֧��iOS�û����룬�����ڴ�");
		return false;
	}
	if (payType != 2) {
		$('#confirmPayDlgTxt').text('������ʹ��' + window['payTypeDaiBiName_' + iFlow] + '������Ϸ�ڵ��ߣ���ȷ�ϣ�');
		$('#confirmToPay').attr('href', 'javascript:doAmsAction(' + iAct + ',' + iFlow  +');');
		TGDialogS('confirmPayDlg');
	} else {
	    doAmsAction(iAct,iFlow);
    }
}
// �Ƿ��� iOS
function isIOS() {
	return /iphone|ipod|ipad/i.test(navigator.userAgent);
}

// �Ƿ�����Ϸ�ڴ�
function isMSDK() {
	var msdkEncodeParam = milo.request('msdkEncodeParam');
	return !!msdkEncodeParam;
}
var cfmUserInfo = {
	nickName: "",
	isLogin: false
};
function checkLoginOnly(){
	return cfmUserInfo.isLogin;
}
milo.ready(function()
{
	//�����cfm��¼��������
	var loginDiv = $('#unlogin');
	var unLoginDiv = $('#logined');
	if(loginDiv.length > 0 && unLoginDiv.length > 0){
		loginDiv.parents(".luban-template").hide();
		loginDiv.hide();unLoginDiv.hide();
	}
	
    $(function(){
        need("biz.login",function(LoginManager){
			LoginManager.init({
				appConfig:{
					"QQBrowserAppId":"106",  //��QQ������������APPID����ϵ�ˣ�Andorid��ricedeng(����)  IOS��kingjlhuang(�ƽ���)
					"WxAppId":"wx13e246b80664feec",  //��Ҫ��΢������openLinkȨ�ޣ���ϵ�ˣ�johnnyliu(���Ͻ�)
					"AppName":"CFM",  //ҵ�����������
					"scope":"snsapi_userinfo",   //Ĭ���� snsapi_base ��Ĭ��Ȩ�������Ϸ�޾�ĬȨ�ޣ�����Ҫ�ֶ��ĳ� snsapi_userinfo
				}
			});
			var QQAppId = '1104512706';
			var WeixinAppId = 'wx58164a91f1821369';
			LoginManager.checkLogin(function(user){
				// �Զ����¼�ص�
				if (typeof lbCallBackAfterLogin == 'function') {
					lbCallBackAfterLogin(LoginManager)
				}
				cfmUserInfo.isLogin = true;
				delete amsCfg_647143.sData.appid;delete amsCfg_647143.sData.ams_appname;delete amsCfg_647143.sData.ams_targetappid; amsCfg_647143.sData.sArea = myarea; amsCfg_647143.sData.sPlatId = myplatid; delete amsCfg_647144.sData.appid;delete amsCfg_647144.sData.ams_appname;delete amsCfg_647144.sData.ams_targetappid; amsCfg_647144.sData.sArea = myarea; amsCfg_647144.sData.sPlatId = myplatid; delete amsCfg_647145.sData.appid;delete amsCfg_647145.sData.ams_appname;delete amsCfg_647145.sData.ams_targetappid; amsCfg_647145.sData.sArea = myarea; amsCfg_647145.sData.sPlatId = myplatid; delete amsCfg_647091.sData.appid;delete amsCfg_647091.sData.ams_appname;delete amsCfg_647091.sData.ams_targetappid; amsCfg_647091.sData.sArea = myarea; amsCfg_647091.sData.sPlatId = myplatid; delete amsCfg_647140.sData.appid;delete amsCfg_647140.sData.ams_appname;delete amsCfg_647140.sData.ams_targetappid; amsCfg_647140.sData.sArea = myarea; amsCfg_647140.sData.sPlatId = myplatid; delete amsCfg_647141.sData.appid;delete amsCfg_647141.sData.ams_appname;delete amsCfg_647141.sData.ams_targetappid; amsCfg_647141.sData.sArea = myarea; amsCfg_647141.sData.sPlatId = myplatid; delete amsCfg_647142.sData.appid;delete amsCfg_647142.sData.ams_appname;delete amsCfg_647142.sData.ams_targetappid; amsCfg_647142.sData.sArea = myarea; amsCfg_647142.sData.sPlatId = myplatid; delete amsCfg_647146.sData.appid;delete amsCfg_647146.sData.ams_appname;delete amsCfg_647146.sData.ams_targetappid; amsCfg_647146.sData.sArea = myarea; amsCfg_647146.sData.sPlatId = myplatid; delete amsCfg_647147.sData.appid;delete amsCfg_647147.sData.ams_appname;delete amsCfg_647147.sData.ams_targetappid; amsCfg_647147.sData.sArea = myarea; amsCfg_647147.sData.sPlatId = myplatid; 
delete amsCfg_647089.sData.appid;delete amsCfg_647089.sData.ams_appname;delete amsCfg_647089.sData.ams_targetappid; amsCfg_647089.sData.sArea = myarea; amsCfg_647089.sData.sPlatId = myplatid; 
delete amsCfg_647092.sData.appid;delete amsCfg_647092.sData.ams_appname;delete amsCfg_647092.sData.ams_targetappid; amsCfg_647092.sData.sArea = myarea; amsCfg_647092.sData.sPlatId = myplatid; 

				if(iDecryptFlow > 0){ // �����¼�ص�
					if (milo.cookie.get("acctype")=="wx"){ //WX
						LoginManager.getUserInfoByWxOpenId({
							openid: user.openid,
							access_token: milo.cookie.get('access_token')
						}, function(data) {
							cfmUserInfo.nickName = encodeURIComponent(data.nickname); // ��ȡ����΢���ǳ�
							cfmUserInfo.isLogin = true;
							inviteLoginCall();
						});
					} else { //QQ
						cfmUserInfo.nickName = user.nickName;
						cfmUserInfo.isLogin = true;
						inviteLoginCall();
					}
				}
        if(typeof window.iSighQueryFlow != "undefined" && window.iSighQueryFlow != 0){
			delete  window["amsCfg_"+iSighQueryFlow].sData.appid;
			delete  window["amsCfg_"+iSighQueryFlow].sData.ams_appname;
			delete  window["amsCfg_"+iSighQueryFlow].sData.ams_targetappid;
			window["amsCfg_"+iSighQueryFlow].sData.sArea = myarea;
			window["amsCfg_"+iSighQueryFlow].sData.sPlatId = myplatid;
        	amsInit(iActivityId, iSighQueryFlow);
        } 
        if(typeof iQualType!= 'undefined'){
							qOnlyJF();
			}
			qDsFunc();
			},function(){
				alert("��Ǹ����¼̬ʧЧ�������½���ҳ��");
			});
        });
    });
});


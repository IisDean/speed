milo.ready(function () {
    need("biz.login", function (LoginManager) {
        //QQ��¼
        milo.addEvent(g('btn_qqlogin'), 'click', function (e) {
            LoginManager.login();
        });
        //ע��
        milo.addEvent(g("btn_logout"), "click", function () {
            LoginManager.logout();
        });
        LoginManager.checkLogin(function () {
            g("login_qq_span").innerHTML = LoginManager.getUserUin(); //????QQ??
            amsInit(311979, 675349);
        });
    });
});

amsCfg_675349={
    type : "query",
    iQueryFlowID:675349,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����

    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

//�ύ�󶨵�����
amsCfg_675348={
    type : "comit",
    needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID:675349,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����
    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

amsCfg_675347 = amsCfg_675441 =amsCfg_675449 =amsCfg_675454 ={
    'iAMSActivityId' : '311979', // AMS���
    'activityId' : '350118', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
};

amsCfg_675451 = amsCfg_675453 ={
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 311979, //�id
    "iFlowId":    675451, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){

        return;
    },
    "fFlowSubmitFailed":function(res){

    }
};

amsCfg_675455 = {
    'iAMSActivityId' : '311979', // AMS���
    'activityId' : '350118', // ģ��ʵ����
    'sData':{'iGiftIdx':null},
    '_everyRead':true,
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
};
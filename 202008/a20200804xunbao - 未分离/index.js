// ��Ʒ˳�� 1~23 ����Ϊ  0=����*3�� 1=��ѵ����*2�� 2=����*15 .....  23=����*20
//��Ʒ����, ˳ʱ�뷽�� 0 ~ 23
var position = "0_0,126_0,253_0,379_0,506_0,632_0,759_0,885_0,885_126,885_253,885_379,885_506,885_632,759_632,632_632,506_632,379_632,253_632,126_632,0_632,0_506,0_379,0_253,0_126",
    $hover = $(".lottery-hover"),
    timer = null,//
    wz = null,//����Ŀ��λ��,�����趨
    activeWz = 0,//���ӵ�ǰλ��,��Ҫ�趨Ĭ��ֵ
    $dice = $(".dice-wrap"),
    packageName = "";

var rollDiceEnable = true;
function initTz(){
    wz = activeWz;
    position = position.split(',');
    position.forEach(function(ev, idx){
        position[idx] = ev.split('_');
    });
    $hover.css({
        "top": position[activeWz][1] + 'px',
        "left": position[activeWz][0] + 'px'
    });
}
initTz();

function reloadTz(){
    wz = activeWz;
    position.forEach(function(ev, idx){
        position[idx] = ev;
    });
    $hover.css({
        "top": position[activeWz][1] + 'px',
        "left": position[activeWz][0] + 'px'
    });
}

//������, val Ϊǰ������
function rollDice(val){
    wz += val;
    if( wz > position.length-1)wz = wz-position.length;
    moveDice();
}
//����ǰ��
function moveDice(){
    if(activeWz > position.length-1)activeWz = 0;
    $hover.css({
        "top": position[activeWz][1] + 'px',
        "left": position[activeWz][0] + 'px'
    });
    if(activeWz == wz){
        setTimeout(function(){
            moveResult();//�ƶ�����
        }, 500);
    }else {
        activeWz += 1;
        timer = setTimeout(function(){
            clearTimeout(timer);
            moveDice(wz);
        }, 300);
    }
}
//�ƶ�����
function moveResult(){
    rollDiceEnable = true;
    amsCfg_690962.sNeedSubmitPopDiv=false;
    amsSubmit(322944,690962);
    alert('��ϲ�������'+packageName);
}

amsCfg_690658={
    type : "query",
    iQueryFlowID:690658,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����

    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

//�ύ�󶨵�����
amsCfg_690657={
    type : "comit",
    needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID:690658,
    service:"nba2kx" ,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����
    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

amsCfg_690797 = {
    'iAMSActivityId' : '322944', // AMS���
    'iLotteryFlowId' : '690797', //  ��ѯ���ֲ������̺�
    'activityId' : '360648', // ģ��ʵ����
    'contentId' : 'getGiftContent_690797', //����ID
    'templateId' : 'getGiftTemplate_690797', //ģ��ID
    'contentPageId' : 'getGiftPageContent_690797',	//��ҳ����ID
    'showContentId' : 'popPrize', //������ID
    'pageSize' : 6,
};

amsCfg_690655 = {
    'iAMSActivityId' : '322944', // AMS���
    'activityId' : '360648', // ģ��ʵ����
    'sData' : {'iTask':null},
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsCfg_690962.sNeedSubmitPopDiv=false;
        amsSubmit(322944,690962);
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
};

amsCfg_690962 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 322944, //�id
    "iFlowId":    690962, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        if(res.iRet == 0){
            $("#sz_num").html(res.arrData.ticket_2);
            $("#gold_num").html(res.arrData.ticket_1);
            $("#silver_num").html(res.arrData.ticket_0);
            var dice = parseInt(res.arrData.ticket_3,10);
            activeWz = dice%24;
            reloadTz();
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

amsCfg_690847 = amsCfg_690905= {
    'iAMSActivityId' : '322944', // AMS���
    'activityId' : '360648', // ģ��ʵ����
    'sData':{'iNum':null},
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsCfg_690962.sNeedSubmitPopDiv=false;
        amsSubmit(322944,690962);
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }

        LotteryManager.alert(callbackObj.sMsg);
    }
};

var packageIndexMap = {
    2040151: "��ѵ����*2",
    2040152: "����*15",
    2040190: "����ȯ*188",
    2040191: "����*5",
    2040192: "����*1",
    2040197: "��Աѵ����*1",
    2040199: "����*10",
    2040200: "����*2",
    2040202: "��ѵ����*3",
    2040203: "����*5",
    2040204: "����*1",
    2040205: "����ȯ*288",
    2040207: "����*10",
    2040208: "����ȯ*188",
    2040218: "��ѵ����*2",
    2040219: "5���ͬ��",
    2040295: "��Աѵ����*2",
    2040296: "��������30�˰�*1 ",
    2040344: "����ȯ*188",
    2040345: "����*15",
    2040348: "��Աѵ����*2",
    2040349: "����*10",
    2040350: "��ѵ����*2",
    2040359: "����*5",
    2040360: "����*1",
    2040375: "��ѵ����*1",
    2040377: "����*5",
    2040378: "����*1",
    2040380: "����ȯ*288",
    2040381: "����*20",
    2040383: "����*3"
};

function doRollDice(){
    if(rollDiceEnable){
        rollDiceEnable = false;
        amsSubmit(322944,690909);
    }
    return;
}

amsCfg_690909 = {
    'iAMSActivityId' : '322944', // AMS���
    'activityId' : '360648', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        var packageArr  = callbackObj.iPackageIdCnt ? callbackObj.iPackageIdCnt.split(",") : "";
        var dot;
        if(packageArr && packageArr.length > 0) {
            packageArr.forEach(function (val) {
                if (val) {
                   var packages = val.split(":");
                   if(packages[0] == 2045170){
                       dot = packages[1]?packages[1]:1
                   }else {
                       packageName =packageIndexMap[packages[0]]
                   }
                }
            });
            $dice[0].className = "p-a bg dice-wrap dice-ani";
            setTimeout(function(){
                $dice[0].className = "p-a bg dice-wrap dice-"+parseInt(dot,10);
                setTimeout(function(){
                    rollDice(parseInt(dot,10));
                }, 500);
            }, 1500);

        }
    }
};
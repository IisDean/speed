//��¼̬����
var userID = milo.request('userId');
var storyUin = milo.request('uin');
var storyToken = milo.request('token');
//��ɫ��֤����
// var storyArea = "992";//���Ի���991΢�ţ�992�ۿ�
var storyPlatid = milo.request('platid');//1 ��׿ 0 ios
//�жϵ�ǰ��ios���ǰ�׿
if (!storyPlatid) {
    if (milo.android()) {
        storyPlatid = 1;//1 ��׿ 0 ios
    }
    if (milo.ios()) {
        storyPlatid = 0;//1 ��׿ 0 ios
    }
}
//�ж��Ƿ�������Ϸ�ڴ�
if(!userID){
    userID="";
}
var storyArea=0;
var areaId = storyUin.substring(0, 2);//23����q,24��΢��
if(parseInt(areaId,10)===24){
    storyArea=1
}else if(parseInt(areaId,10)===23){
    storyArea=2
}else{
    storyArea=3
}
var amsCommon = {
    loginData: {},
    init: function () {
        if (!storyArea || !userID || !storyUin || !storyToken) {
            alert("��¼̬��ȡ���������´�ҳ��~~");
            return;
        }
        if([1,2,3].indexOf(areaId)>-1){
            alert("��ɫ��ȡʧ�ܣ������´�ҳ��~~");
            return;
        }
        var index = storyUin.lastIndexOf("\-");
        gopenid = storyUin.substring(index + 1, storyUin.length);
        //��Ϸ�ڵĵ�¼̬
        amsCommon.loginData = {
            'userID': userID,
            'storyUin': storyUin,
            'storyToken': storyToken,
            'storyArea': storyArea,
            'storyPlatid': storyPlatid,
            'gopenid': gopenid,
            'storyPartition': "",
        };
    },
    //��ѯ�����Ƿ���ȡ
    inquiryPackage:function () {
        amsCfg_665191.sData = amsCommon.loginData;
        amsSubmit(304961,665191)
    },
    //��ȡ����
    receiveGift:function () {
        amsCfg_665094.sData = amsCommon.loginData;
        amsSubmit(304961,665094);
    },
    //��ת����
    joinQuan:function (type) {
        switch (type) {
            case "look1":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15202'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=630'}")
                break;
            case "look2":
                // GameHelper.openButton({type:10005, uri:'story://bookdetail?bookId=629'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=501'}")
                break
            case "look3":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15189'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=646'}")
                break
            case "look4":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15189'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=649'}")
                break
            case "story":
                // GameHelper.openButton({type:10005, uri:'story://momentFeedDetail?momentId=15189'})
                GameHelper.openButton("{'type':10005, 'uri':'story://bookdetail?bookId=630'}")
                break
            default:
                alert("��ת���ʹ���");
        }
    }
};
/**
 * ��ѯ�����Ƿ�����ȡ
 * @type {{fFlowSubmitFailed: amsCfg_665191.fFlowSubmitFailed, iFlowId: number, fFlowSubmitEnd: amsCfg_665191.fFlowSubmitEnd, iActivityId: number, _everyRead: boolean}}
 */
amsCfg_665191 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 304961, //�id
    "iFlowId":    665191, //����id
    "sData": {//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        if(+res['sOutValue1']===1){
            alert("���Ѿ���ȡ�����������ȥΪϲ���Ľ�ɫ����~")
            return;
        }else{
            amsCommon.receiveGift();
        }
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert("ϵͳ��æ�����Ժ�����~~");
    }
};
/**
 * ��ȡ����
 * @type {{activityId: string, iAMSActivityId: string, onGetGiftSuccessEvent: amsCfg_665094.onGetGiftSuccessEvent, onGetGiftFailureEvent: amsCfg_665094.onGetGiftFailureEvent, onBeginGetGiftEvent: (function(): number)}}
 */
amsCfg_665094 = {
    '_everyRead': true,//
    'iAMSActivityId' : '304961', // AMS���
    'activityId' : '346602', // ģ��ʵ����
    "sData": {//�Զ��崫��
    },
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        if(callbackObj.sMsg=='������ȡ'){
            alert("���Ѿ���ȡ�����������ȥΪϲ���Ľ�ɫ����~")
            return;
        }
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        TGDialogS("popGet");
        // if(!callbackObj.sPackageName){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
    }
};

amsCommon.init();
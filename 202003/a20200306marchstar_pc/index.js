window.hasGift = 0;
milo.ready(function() {
    need("daoju.mo", function (mo) {
        window.alert = function (msg, callback) {
            mo.alert(msg, callback);
        };
        window.confirm = function (msg, callback) {
            mo.confirm(msg, callback);
        };
        mo.isH5 = location.hostname == "app.daoju.qq.com" ? true : false;
        mo({
            type: "pc,h5", //����ͣ�pt��¼"pc,h5"��openid��¼"qq,wx"��������Ƕ�"gamein"
            biz: "nba2kx", //ҵ��
            iActivityId: "290791", //AMS���
            iQueryFlowId: "649402", //��ѯ�������̺�632808
            iSubmitFlowId: "649401", //�󶨴������̺�632807
            callback: function (bindedInfo, LoginManager) {
                //�󶨴����ɹ�
                //D.mo.bindInfo��Ӧ��������Ϣ
                //��ѯ�����ȡ���
                enter(1);
            }
        });
        //mo.appid����eas�ϱ�
        setTimeout(function () { //IE��������
            mo.appid("nba2kx", "15034", function (_app_id) {
                if (_app_id != 1003 && _app_id != 1005) {
                    // window.alert = function(msg, callback) {
                    //     D.mo.alert(msg, callback);
                    // };
                    console.log(_app_id)
                    if (_app_id == 1101) {
                        need("daoju.ui.app", function (app) {
                            if (app.isApp()) {
                                $(".djc").show();
                            } else {
                                $(".djc").hide();
                            }
                        });
                    }
                }
            });
        });
    });
})
// ��ѯ��ȡ��¼
function enter(a) {
    setTimeout(function () {
        //ˢ�»��ֲ���
        amsSubmit(290791,649689)
    }, a || 2000);
}
//��ѯ��ȡ��¼
amsCfg_649689 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 290791, //�id
    "iFlowId":    649689, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        gift = res.sOutValue1.split(',')[0];
        hasBuy = parseInt(res.sOutValue3);
        if(gift != ''){
            amsCfg_648235.sData.buyId = allGoods[gift][0];
            window.hasGift = 1;
            window.giftId = gift;
            if(hasBuy == 0) {
                TGDialogS(allGoods[gift][1]);
            }

        }

        // getPackage = res.sOutValue1;
        packageNum = res.sOutValue2;//��¼��ʱ�û������ĸ�����,����Ϊ������״̬
        $('.gift' + packageNum).addClass('active');
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};
//���������ȡ
amsCfg_649400 = {
    'iAMSActivityId' : '290791', // AMS���
    'activityId' : '333974', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        alert(callbackObj.sMsg);
    }
};
//�������˱���
amsCfg_648236 = {
    'iAMSActivityId' : '290791', // AMS���
    'activityId' : '333974', // ģ��ʵ����
    'sData' : {
        'choseItem':''
    },
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        $(".gift" + this.sData.choseItem).addClass('active');
        amsCfg_648235.sData.buyId = allGoods[callbackObj.iPackageId][0];
        TGDialogS(allGoods[callbackObj.iPackageId][1]);
        //�趨�����sData.num
        // var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        // if(packageLen && packageLen.length > 1){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
        //
        // //1��ʵ��
        // if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
        //     /*
        //      * 0��������Ϸ��Ʒ
        //      * 1��ʵ����Ʒ����Ҫ��д�����ջ���Ϣ
        //      * 2��cdkey
        //      */
        //     LotteryManager.alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
        //     return;
        // }
        // //2��cdkey
        // if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
        //     // �µĴ���
        //     if(callbackObj.sPackageCDkey){
        //         LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
        //         return;
        //     }else{
        //         LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
        //         return;
        //     }
        //
        // }
        //
        // LotteryManager.alert(callbackObj.sMsg);
    }
};

amsCfg_648235 = {
    '_everyRead':true,
    'iActivityId' : '290791',
    'iFlowId' : '648235',
    'sData'	: {'buyId':0},
    'fFlowSubmitEnd': function(res) {
        need(["ams.daoju_buy_v2.daoju_buy_v2"], function(DaojuBuy) {
            var option = {
                //apptype:4	�°�webpay����Ĭ��
                //onPaySuccess:function(){},//֧���ɹ���ص�����
                //onPayClose:function(){}//�ر�֧��ҳ��ص�����
            };
            DaojuBuy.pay(res.jData,option);
        });
    },
    'fFlowSubmitFailed':function(res) {
        alert(res.sMsg);
    }
};
milo.ready(function() {
    need(["ams.daoju_buy_v2.appid"], function(autoappid) {
        autoappid.init('nba2kx', 15034, function(final_appid) {
            //final_appidΪ�Զ��жϵõ��ĵ��۳�������
            //���δ������Զ����е��۳�ȫ�������ݵ��ռ������뱣�����ŵ�milo.ready�ڣ�����������ҳ���Ͻ��л��ڵ��۳ǻ�ŵ�eas�ع��ϱ�
        });
    });
});

function openGift(num){
    if(!window.hasGift) {
        $(".pop").hide();
        // $(".gift" + num).addClass('active');
        //�齱
        amsCfg_648236.sData.choseItem = num;
        amsSubmit(290791, 648236)
    }else {
        alert('���Ѿ�����������֮�п�~')
        // TGDialogS(allGoods[window.giftId][1]);
    }
}

allGoods= {
    "1791654": [1, 'popGift1'],
    "1791655": [2, "popGift2"],
    "1791656": [3, "popGift3"],
    "1791657": [4, "popGift4"],
    "1791658": [5, "popGift5"],
    "1791659": [6, "popGift6"],
    "1791660": [7, "popGift7"],
    "1791661": [8, "popGift8"]
};
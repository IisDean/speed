milo.ready(function() {
    need("daoju.mo", function(mo) {
        window.alert = function(msg, callback) {
            mo.alert(msg, callback);
        };
        window.confirm = function(msg, callback) {
            mo.confirm(msg, callback);
        };
        mo({
            type: "pc,h5", //����ͣ�pt��¼"pc,h5"��openid��¼"qq,wx"��������Ƕ�"gamein"
            biz: "wuxia", //ҵ��
            iActivityId: "273783", //AMS���
            iQueryFlowId: "627451", //��ѯ�������̺�
            iSubmitFlowId: "627450", //�󶨴������̺�
            callback: function(bindedInfo, LoginManager) {
                //�󶨴����ɹ�
                //D.mo.bindInfo��Ӧ��������Ϣ
                //�����Ϊ"qq,wx"ʱ��D.mo.source��Ӧ��¼��ʽ��"mqq"/"wx"
                udateJf(1);
            }
        });
        //mo.appid����eas�ϱ�
        setTimeout(function() { //IE��������
            mo.appid("wuxia", "", function(_app_id) {});
        }, 1000);
    });
});

function udateJf(){
    D.mo.amsSubmit(273783,627495, {
        sNeedSubmitPopDiv: false, //����Ҫ������תȦ��ʽ
        success: function(res) {
            $.each(res.sOutValue1.split(","), function(k, v) {
                if(v >= 1) {
                    $(".package" + k ).addClass("filter");
                }
            });
        }
    });
}

function AmsLq(item){
    D.mo.amsSubmit(273783,627453, {
        sData:{
            item:item
        },
        success: function(res) {
            TGDialogS("test2");
        }
    });
}
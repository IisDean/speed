milo.ready(function() {
    need("daoju.mo", function(mo) {
        window.alert = function(msg, callback) {
            mo.alert(msg, callback);
        };
        window.confirm = function(msg, callback) {
            mo.confirm(msg, callback);
        };
        mo({
            type: "pc,h5", //活动类型，pt登录"pc,h5"，openid登录"qq,wx"，手游内嵌活动"gamein"
            biz: "wuxia", //业务
            iActivityId: "273783", //AMS活动号
            iQueryFlowId: "627451", //查询大区流程号
            iSubmitFlowId: "627450", //绑定大区流程号
            callback: function(bindedInfo, LoginManager) {
                //绑定大区成功
                //D.mo.bindInfo对应绑定区服信息
                //活动类型为"qq,wx"时，D.mo.source对应登录方式："mqq"/"wx"
                udateJf(1);
            }
        });
        //mo.appid包含eas上报
        setTimeout(function() { //IE兼容问题
            mo.appid("wuxia", "", function(_app_id) {});
        }, 1000);
    });
});

function udateJf(){
    D.mo.amsSubmit(273783,627495, {
        sNeedSubmitPopDiv: false, //不需要加载中转圈样式
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
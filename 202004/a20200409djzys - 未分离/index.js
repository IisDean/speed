//�����߼�

(function($, global) {
    //��ѯ������Ϣ
    global.getContests = function() {
        var def = $.Deferred();
        global.amsCfg_657777 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "iFlowId": 657777,
            "sData": {},
            "fFlowSubmitEnd": function (res) {
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData);
            },
            "fFlowProssFailed": function (res) {
                return def.reject(res.sMsg);
            },
            "fFlowSubmitFailed": function (res) {
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493,657777);
        return def;
    }

    //��ѯ����

})(jQuery, window);

// �ж��û��豸
var device = 0;
var u = navigator.userAgent;
if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
    device = 2;//android�ն�
}
if(u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1){
    device = 1; //ios�ն�
}

milo.ready(function () {
    need("biz.login", function (LoginManager) {
        if (LoginManager.isWxApp()){
            LoginManager.checkLogin(function(userInfo){
                console.log("�ѵ�¼,��¼��Ϣ��",userInfo);

                if (milo.cookie.get("acctype") == "wx"){
                    LoginManager.getUserInfoByWxOpenId({
                        openid:milo.cookie.get('openid'),
                        access_token:milo.cookie.get('access_token')
                    },function(WxUserInfo){
                        console.log('��¼�ɹ����û���ϢΪ',WxUserInfo);
                        var str = WxUserInfo.nickname;
                        var res = str.replace(/\<span\s+class\=\"emoji\s+emoji\w+\"\>\<\/span\>/g,'');
                        console.log(res);
                        $("#userinfo").html(res);
                        $("#username").html(res);
                        console.log("��¼�ɹ�333");
                    },function(err){
                        // alert('��ȡ�û���Ϣʧ��');
                        console.log('��ȡ�û���Ϣʧ��',err);
                    })
                }
                amsSubmit(303480,663104);  //ҳ���ʼ��
            },function() {
                LoginManager.loginByWX({
                    redirect_wx_url: "",
                    appConfig: {
                        "gameDomain": "iu.qq.com",//����΢�ŵ�¼redirect_uri��������뵱ǰҳ��domain��һ�µ�������Զ���ת���ݣ���ʽ��iu.qq.com,Ĭ��Ϊ�գ���ʾ��ǰҳ������appid���а󶨹�ϵ
                        "avoidConflict": "",//Ĭ��ֵΪ�գ��ж��Ƿ���ҪУ��΢�ŵ�¼̬���ţ���Ϊtrue��Ϊ����У�飬��Ϊfalse��Ϊ��У�飬Ĭ��ֵ""��ʾ��΢�Ż�����У�飬����app�����²�У��
                        'WxAppId': 'wx5d2b5a22d026d021',
                        "AppName": "�����⹤����Ⱥ",
                        "scope": "snsapi_userinfo",
                    },
                });
            });
        }else if (LoginManager.isQQApp()){
            //���������΢���У�QQ���ߵ�������������򿪣�����ת��΢��
            console.log('��QQ,wx->QQ;');
            var qqurlnew = "//love.qq.com/cp/a20200427love520qq/index.html";
            // var sStartQQ = location.protocol + "//imgcache.qq.com/club/themes/mobile/middle_page/index.html?url=" + window.location.protocol + encodeURIComponent(qqurlnew);
            window.location.href = location.protocol +qqurlnew;
        }else{
            console.log('���������liu->WX;');
            //���������΢���У�QQ���ߵ�������������򿪣�����ת��΢��
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90243170&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200427love520wx%2Findex.html"; //�����openlink
        }
    });
});

function checkAMS(id,n){
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(userInfo){

            if(id == 663243) //ԤԼ
            {
                amsCfg_663243.sData.iDevice = device;
            }

            amsSubmit(303480,id);
        },function(){
            alert("���ȵ�¼�˺�~");
        });
    });
}



// <button class="button" id="lottery_663243" >ԤԼ+�齱����[663243]</button>
// <button class="button" id="lottery_663245" >ǩ��+�齱����[663245]</button>
// <button class="button" id="lottery_663246" >�齱[663246]</button>



// �齱���� amsSubmit(303480,663243);
amsCfg_663243 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345907', // ģ��ʵ����
    "sData":{"iDevice":"",'appid': 'wx5d2b5a22d026d021', "sServiceType": "lv"},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
        nextPageRead(2);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsCfg_663642.sData.iDevice = device;
        amsSubmit(303480,663642);  //���ſ�ȯ
    }
};



// ԤԼ��ȯ amsSubmit(303480,663642);
amsCfg_663642 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345907', // ģ��ʵ����
    "sData":{"iDevice":"",'appid': 'wx5d2b5a22d026d021', "sServiceType": "lv"},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
        nextPageRead(2);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // amsSubmit(303480,663104);  //ҳ���ʼ��(lotteryҳ���ѽ��й�ˢ��)
        nextPageRead(2);
    }
};

// ǩ��+�齱����[663245] amsSubmit(303480,663245);
amsCfg_663245 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345907', // ģ��ʵ����
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�

        TGDialogS("qdzgPopTips");

        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(303480,663104);  //ҳ���ʼ��
        TGDialogS('qdPopTips');
    }
};


var aAward = {
    "1889687":"0", //iphoneSE
    "1889689":"1", //YSL-С����
    "1889685":"2", //��������
    "1889690":"3", //лл����
    "1889686":"4", //��������
    "1889688":"5", //MissDior��ˮ
};
var prizeList = [
    'iphoneSE',
    'YSL-С����',
    '��������',
    'лл����',
    '��������',
    'MissDior��ˮ',
];

// �齱[663246]  amsSubmit(303480,663246);
amsCfg_663246 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345907', // ģ��ʵ����
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(303480,663104);  //ҳ���ʼ��
        if(!callbackObj.sPackageName){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var n = parseInt(aAward[callbackObj.iPackageId]);
            panel.playto(n, function(){
                if( n == 3){//û���н�
                    TGDialogS('losingLottery');
                }else {
                    $(".edit-msg-btn").css('display','block');
                    $(".J-zj-wrap").text(prizeList[n]+' x 1');
                    TGDialogS('winPrize');
                }

            });
            return;
        }
    }
};



//�齱���� [663104]  amsSubmit(303480,663104);
amsCfg_663104 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 303480, //�id
    "iFlowId":    663104, //����id
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    "fFlowSubmitEnd": function(res){
        // alert('��������Ϊ:' + res);
        // return;
        if(res.iRet == 0)
        {
            $("#ticket").text(res.sOutValue1);
            $("#total").text(res.sOutValue2);
        }

    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};




<!-- ��д������Ϣ js -->
amsCfg_663244 = {
    'iActivityId' : '303480', // AMS���
    'iFlowId' : '663244', // ���̺�
    '_everyRead' : true,
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'success': function(res){ //�ύ�ɹ��Ļص�
        if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector", "util.form"], function(pcs, FormManager) {

                //��ʾ������
                g("personInfoContent_663244").style.display = "block";

                //�رյ�����
                g("colseLayer_663244").onclick = function(){
                    g("personInfoContent_663244").style.display = "none";
                }

                //�ύ��ť�¼�
                g('personInfoContentBtn_663244').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_663244');
                    for(var i in fillData) {
                        var _val = fillData[i];
                        switch(i) {
                            case 'sName': {
                                if(!_val){alert("��������Ϊ��"); return false;}
                                if(milo.getByteLength(_val) > 30){alert("�������Ȳ��ܳ���30���ֽڡ�"); return false;}
                                break;
                            }
                            case 'sIdentity':{
                                if(!_val){alert("���֤���벻��Ϊ��"); return false;}
                                if(!milo.isIDCard(_val)){alert("���֤��������"); return false;}
                                break;
                            }
                            case 'sMobile':{
                                if(!_val){alert("�ֻ����벻��Ϊ��"); return false;}
                                if(isNaN(_val) || _val.indexOf('.') >= 0){alert("�ֻ��������Ϊ���֡�"); return false;}
                                if(_val.length > 11){alert("�ֻ����벻�ó���11λ��"); return false;}
                                break;
                            }
                            case 'sAddress':{
                                if(!_val){alert("��ϸ��ַ����Ϊ��"); return false;}
                                if(milo.getByteLength(_val) > 100){alert("��ϸ��ַ���ܳ���100���ֽڡ�"); return false;}
                                break;
                            }
                            default : {}
                        }
                    }

                    amsCfg_663244.sData = fillData;
                    amsSubmit(303480,663244);
                }

                pcs.show({
                    provinceId : "province_"+663244,
                    cityId : "city_"+663244
                });

                //�������ֵ������undefined ����ֵ��ǰʡ
                if(res.jData.sProvince != undefined){
                    g('province_663244').value = res.jData.sProvince;
                }

                //����ʡ change�¼�
                g('province_663244').onchange();

                //�������ֵ������undefined ����ֵ��ǰ��
                if(res.jData.sCity != undefined){
                    g('city_663244').value = res.jData.sCity;
                }
                //��������:
                if(res.jData.sExtend1){
                    g('sExtend1_663244').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_663244');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
                    g('tr_package_name_663244').style.display = '';
                    g('tr_package_value_663244').style.display = '';
                    for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
                        // if( res.jData.arrPackageInfo[i].iPackageId != "1889661")
                        // {
                        //     var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                        //     var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                        //     g('package_663225').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
                        // }
                        var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                        var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                        g('package_663225').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);

                    }
                }
            });

        } else {
            need(["biz.widget.dialog"],function(Dialog){
                Dialog.alert(res.sMsg);
            });
        }
    }
};

milo.ready(function(){
    need(["biz.login"],function(LoginManager){
        //��д��ť�ĵ���¼���
        milo.addEvent(g('btn_personInfo_663244'),'click',function(){
            LoginManager.submitLogin(function(){
                amsCfg_663244.sData = { iShow: 1 };
                amsSubmit(303480,663244);
                TGDialogS('submitMsg1');
            });
        });
    });
});







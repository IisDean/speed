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
                        // $("#userinfo").html(res);
                        // $("#username").html(res);
                        console.log("��¼�ɹ�333");
                    },function(err){
                        // alert('��ȡ�û���Ϣʧ��');
                        console.log('��ȡ�û���Ϣʧ��',err);
                    })
                }
                amsSubmit(311093,674277); //ҳ���ʼ��
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
            var qqurlnew = "//love.qq.com/cp/a20200608diynyqq/index.html";
            // var sStartQQ = location.protocol + "//imgcache.qq.com/club/themes/mobile/middle_page/index.html?url=" + window.location.protocol + encodeURIComponent(qqurlnew);
            window.location.href = location.protocol +qqurlnew;
        }else{
            console.log('���������liu->WX;');
            //���������΢���У�QQ���ߵ�������������򿪣�����ת��΢��
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90245428&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200608diynywx%2Findex.html"; //�����openlink
        }
    });
});

function checkAMS(id,n){
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(userInfo){

            if(id == 674240) //ԤԼ
            {
                amsCfg_674240.sData.iDevice = device;
            }

            amsSubmit(311093,id);
        },function(){
            alert("���ȵ�¼�˺�~");
        });
    });
}

// <button class="button" id="lottery_674240" ></button>
// <button class="button" id="lottery_674242" ></button
// <button class="button" id="lottery_674243" ></button>
// <button class="button" id="lottery_674244" ></button>


// ԤԼ��ó齱����[674240]  amsSubmit(311093,674240);
amsCfg_674240 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351745', // ģ��ʵ����
    "sData":{"iDevice":"",'appid': 'wx5d2b5a22d026d021', "sServiceType": "lv"},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsCfg_674244.sData.iDevice = device;
        amsSubmit(311093,674244); //���ſ�ȯ
    }
};

// ԤԼ��ȯ[674244]  amsSubmit(311093,674244);
amsCfg_674244 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351745', // ģ��ʵ����
    "sData":{"iDevice":"",'appid': 'wx5d2b5a22d026d021', "sServiceType": "lv"},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        // if(!callbackObj.sPackageName){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
        // LotteryManager.alert(callbackObj.sMsg);
        // return;
    }
};



// ǩ��+�齱����[674242]  amsSubmit(311093,674242);
amsCfg_674242 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351745', // ģ��ʵ����
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj) {// �齱�ɹ��¼�
        amsSubmit(311093,674277); //ҳ���ʼ��
        TGDialogS('popQd'); //ǩ���ɹ���ʾ
    }
};



var aAward = {
    '1939674': '0',
    '1939681': '1',
    '1939683': '2',
    '1939678': '3',
    '1939677': '4',
    '1939676': '5'
};

var prizeList = [
    'switch',
    '�ʹ����˱����',
    'лл����',
    '��ֻ��������',
    'Ұ�������������ֺ�',
    'tiffany �� ��',
];

// �齱[674243]  amsSubmit(311093,674243);
amsCfg_674243 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351745', // ģ��ʵ����
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(311093,674277); //ҳ���ʼ��
        if(!callbackObj.sPackageName){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var n = parseInt(aAward[callbackObj.iPackageId]);
            panel.playto(n, function(){
                if( n == 2){//лл����
                    TGDialogS('popXxcy');
                }else {
                    $(".J-zj-wrap").text(prizeList[n]+' x 1');
                    TGDialogS('popZj');
                }

            });
            return;
        }
    }
};



//�������� ��ʼ�� [674277]  amsSubmit(311093,674277);
amsCfg_674277 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 311093, //�id
    "iFlowId":    674277, //����id
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    "fFlowSubmitEnd": function(res){
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
//�ύ������Ϣ
amsCfg_674241 = {
    'iActivityId' : '311093', // AMS���
    'iFlowId' : '674241', // ���̺�
    '_everyRead' : true,
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'success': function(res){ //�ύ�ɹ��Ļص�
        if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

                //��ʾ������
                g("personInfoContent_674241").style.display = "block";

                //�رյ�����
                g("colseLayer_674241").onclick = function(){
                    g("personInfoContent_674241").style.display = "none";
                }

                //�ύ��ť�¼�
                g('personInfoContentBtn_674241').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_674241');
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

                    amsCfg_674241.sData = fillData;
                    amsSubmit(311093,674241);
                }
                var pcsConfig = {
                    provinceId : "province_"+674241,
                    cityId : "city_"+674241,
                    areaId: "county_"+674241,
                };
                if (res.jData.sProvince && res.jData.sCity && res.jData.sExtend2) {
                    pcsConfig.initVal = [res.jData.sProvince,res.jData.sCity, res.jData.sExtend2]
                }
                pcs.show(pcsConfig);

                //��������:
                if(res.jData.sExtend1){
                    g('sExtend1_674241').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_674241');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
                    g('tr_package_name_674241').style.display = '';
                    g('tr_package_value_674241').style.display = '';
                    for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
                        var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                        var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                        g('package_674241').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
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
        milo.addEvent(g('btn_personInfo_674241'),'click',function(){
            LoginManager.submitLogin(function(){
                amsCfg_674241.sData = { iShow: 1 };
                // amsSubmit(311093,674241);
                checkAMS(674241,4);
            });
        });
    });
});










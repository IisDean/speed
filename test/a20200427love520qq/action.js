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
        if(LoginManager.isWxApp()){
            //�������΢���д򿪣�����ת��΢��ҳ��
            //�������΢���д򿪣���ת��QQ�д�ҳ��
            console.log('��΢�ţ�QQ->wx');
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90243170&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200427love520wx%2Findex.html"; //�����openlink
        }else {
            LoginManager.checkLogin(function (userInfo) {
                console.log("�ѵ�¼,��¼��Ϣ��", userInfo);
                // ����Ѿ��е�¼̬������΢������ת��QQ
                $("#userinfo").html(decodeURIComponent(userInfo.nickName));
                console.log('�ɹ���¼999');
                amsSubmit(303480, 663104);  //ҳ���ʼ��
            }, function () {
                LoginManager.login(
                    {
                        s_url: "",
                        logo: "",
                        sData: {
                            //��pt_no_onekey:1 ��������һ����¼
                            //pt_no_onekey:1
                        },
                        iUseQQConnect: 0,//�Ƿ�ʹ��QQ����
                    }
                );


            });
        }
    });
});

function checkAMS(id,n){
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(userInfo){
            if(id == 663224)
            {
                amsCfg_663224.sData.iPlatId = device;
            }

            amsSubmit(303480,id);
        },function(){
            alert("��ˢ��ҳ�棬��¼�˺�~");
        });
    });
}

// <button class="button" id="lottery_663224" >ԤԼ+�齱����[663224]</button> amsSubmit(303480,663224);
// <button class="button" id="lottery_663226" >����+�齱����[663226]</button> amsSubmit(303480,663226);
// <button class="button" id="lottery_663233" >�齱[663233]</button> amsSubmit(303480,663233);

// ԤԼ+�齱����[663224]
amsCfg_663224 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345905', // ģ��ʵ����
    //��ѡ��չ����sData��

     "sData":{
			"iPlatId":"",
			},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
        nextPageRead(2);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(303480,663104);  //ҳ���ʼ��
        nextPageRead(2);
        // if(!callbackObj.sPackageName){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
        // LotteryManager.alert(str);
        // return;
    }
};


// ����+�齱����[663226]
amsCfg_663226 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345905', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
        // if(callbackObj.iRet == 600){
        //     TGDialogS('posterPop');
        // }
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(303480,663104);  //ҳ���ʼ��
        // TGDialogS('posterPop');
        // if(!callbackObj.sPackageName){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
        // LotteryManager.alert(str);
        // return;
    }
};


var aAward = {
    "1889658":"0", //iphoneSE
    "1889660":"1", //YSL-С����
    "1889656":"2", //��������
    "1889661":"3", //лл����
    "1889657":"4", //��������
    "1889659":"5", //MissDior��ˮ
};
var prizeList = [
    'iphoneSE',
    'YSL-С����',
    '��������',
    'лл����',
    '��������',
    'MissDior��ˮ',
];

// �齱[663233]
amsCfg_663233 = {
    'iAMSActivityId' : '303480', // AMS���
    'activityId' : '345905', // ģ��ʵ����
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

        // //2��cdkey
        // if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
        //
        //     LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
        //     //LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
        //     return;
        // }
        // str += "����ע����գ�";
        // LotteryManager.alert(str);
        // return;
    }
};


//�齱���� [663104]  amsSubmit(303480,663104);
amsCfg_663104 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 303480, //�id
    "iFlowId":    663104, //����id
    "fFlowSubmitEnd": function(res){
        // alert('��������Ϊ:' + res);
        // return;
        if(res.iRet == 0)
        {
            if(parseInt(res.sOutValue1)>=5)
            {
                $("#ticket").text('5');
            }else{
                $("#ticket").text(res.sOutValue1);
            }

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
amsCfg_663225 = {
    'iActivityId' : '303480', // AMS���
    'iFlowId' : '663225', // ���̺�
    '_everyRead' : true,
    'success': function(res){ //�ύ�ɹ��Ļص�
        if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector", "util.form"], function(pcs, FormManager) {

                //��ʾ������
                g("personInfoContent_663225").style.display = "block";

                //�رյ�����
                g("colseLayer_663225").onclick = function(){
                    g("personInfoContent_663225").style.display = "none";
                }

                //�ύ��ť�¼�
                g('personInfoContentBtn_663225').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_663225');
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

                    amsCfg_663225.sData = fillData;
                    amsSubmit(303480,663225);
                }

                pcs.show({
                    provinceId : "province_"+663225,
                    cityId : "city_"+663225
                });

                //�������ֵ������undefined ����ֵ��ǰʡ
                if(res.jData.sProvince != undefined){
                    g('province_663225').value = res.jData.sProvince;
                }

                //����ʡ change�¼�
                g('province_663225').onchange();

                //�������ֵ������undefined ����ֵ��ǰ��
                if(res.jData.sCity != undefined){
                    g('city_663225').value = res.jData.sCity;
                }
                //��������:
                if(res.jData.sExtend1){
                    g('sExtend1_663225').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_663225');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0 ) { //�������ʵ����Ϣ������ʾ
                    g('tr_package_name_663225').style.display = '';
                    g('tr_package_value_663225').style.display = '';
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
        milo.addEvent(g('btn_personInfo_663225'),'click',function(){
            LoginManager.submitLogin(function(){
                amsCfg_663225.sData = { iShow: 1 };
                checkAMS(663225,4);
                // amsSubmit(303480,663225);
                TGDialogS('personInfoContent_663225');
            });
        });
    });
});







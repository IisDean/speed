// �ж��û��豸
var device = 0;
var iChannel = 0;
var u = navigator.userAgent;
if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
    device = 1;//android�ն�

}
if(u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1){
    device = 2; //ios�ն�

}



// milo.ready(function () {
//     need("biz.login", function (LoginManager) {
//         if(LoginManager.isWxApp()){
//             //�������΢���д򿪣�����ת��΢��ҳ��
//             //�������΢���д򿪣���ת��QQ�д�ҳ��
//             console.log('��΢�ţ�QQ->wx');
//             window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90245428&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200608diynywx%2Findex.html"; //�����openlink
//         }else if (LoginManager.isQQApp()) {
//             LoginManager.checkLogin(function (userInfo) {
//                 iChannel = 2;
//                 console.log("�ѵ�¼,��¼��Ϣ��", userInfo);
//                 // ����Ѿ��е�¼̬������΢������ת��QQ
//                 // $("#userinfo").html(decodeURIComponent(userInfo.nickName));
//                 console.log('�ɹ���¼999');
//                 amsCommon.shareInit();//�����ʼ��
//                 amsSubmit(311093,674277);  //ҳ���ʼ��
//             }, function () {
//                 LoginManager.login(
//                     {
//                         s_url: "",
//                         logo: "",
//                         sData: {
//                             //��pt_no_onekey:1 ��������һ����¼
//                             //pt_no_onekey:1
//                         },
//                         iUseQQConnect: 0,//�Ƿ�ʹ��QQ����
//                     }
//                 );
//             });
//         }else{
//             //�����������д򿪣�ֱ������QQ�ͻ���
//             iChannel = 1;
//             var qqurlnew = '//love.qq.com/cp/a20200608diynyqq/index.html';
//             var sStartQQ = location.protocol+"//imgcache.qq.com/club/themes/mobile/middle_page/index.html?url=" + window.location.protocol+ encodeURIComponent(qqurlnew);
//             window.location.href = sStartQQ;
//         }
//     });
// });


milo.ready(function () {
    need("biz.login", function (LoginManager) {
        if(LoginManager.isWxApp()){
            //�������΢���д򿪣�����ת��΢��ҳ��
            //�������΢���д򿪣���ת��QQ�д�ҳ��
            console.log('��΢�ţ�QQ->wx');
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90245428&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200608diynywx%2Findex.html"; //�����openlink
        }else{
            LoginManager.checkLogin(function (userInfo) {
                iChannel = 2;
                console.log("�ѵ�¼,��¼��Ϣ��", userInfo);
                // ����Ѿ��е�¼̬������΢������ת��QQ
                // $("#userinfo").html(decodeURIComponent(userInfo.nickName));
                console.log('�ɹ���¼999');
                amsCommon.shareInit();//�����ʼ��
                amsSubmit(311093,674277);  //ҳ���ʼ��
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



var amsCommon = {
    shareInit:function(){
        TGMobileShare({
            shareTitle:"����ҹ֮��", //�����û�����Ϊ��ʱ��ҳ����title�����ȡtitle
            shareDesc:'�Һ͹��������������', //�����û�����Ϊ��ʱ��ҳ����Description�����ȡDescription
            shareImgUrl:'https://game.gtimg.cn/images/lv/cp/a20200608diynyqq/share.jpg', //����ͼƬ�ߴ�200*200������д����·��
            shareLink:'https://love.qq.com/cp/a20200608diynyqq/index.html', //��������Ҫ����ǰҳ��ͬ����(��Q���������Ҫ��) ,�����û�����Ϊ��ʱ��Ĭ�ϵ�ȡ��ǰURL
            actName:'a20200608diynyqq', //���������������ͳ�Ʒ�������ר��һ�����Ŀ¼������a20151029demo
            onShare: {
                WXToMessageSuccess: function () {
                    console.log('WXToMessageSuccess');
                    amsCommon.shareBack();
                },
                WXToTimelineSuccess: function () {
                    console.log('WXToTimelineSuccess');
                    amsCommon.shareBack();
                },
                QQToQQSuccess: function () {
                    console.log('QQToQQSuccess');
                    amsCommon.shareBack();
                },
                QQToQzoneSuccess: function () {
                    console.log('QQToQzoneSuccess');
                    amsCommon.shareBack();
                },
                QQToMessageSuccess: function () {
                    console.log('QQToMessageSuccess');
                    amsCommon.shareBack();
                },
                QQToTimelineSuccess: function () {
                    console.log('QQToTimelineSuccess');
                    amsCommon.shareBack();
                },
            }
        });
    },
    //����
    shareBack: function () {
        //�ص���Ŷ
        checkAMS(674237,2);
    },
    shareInvite:function () {
        if(iChannel == 2){
            mqq.ui.showShareMenu();
        }else{
            alert(iChannel);
            TGDialogS('popShare');
        }

    }
};

function checkAMS(id,n){
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(userInfo){
            if(id == 674235)
            {
                amsCfg_674235.sData.iPlatId = device;
            }

            amsSubmit(311093,id);
        },function(){
            alert("��ˢ��ҳ�棬��¼�˺�~");
        });
    });
}

// <button class="button" id="lottery_674235" >ԤԼ+�齱����[674235]</button>
// <button class="button" id="lottery_674237" >����+�齱����[674237]</button>
// <button class="button" id="lottery_674238" >�齱[674238]</button>


// ԤԼ+�齱����[674235] amsSubmit(311093,674235);
amsCfg_674235 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351703', // ģ��ʵ����

    //��ѡ��չ����sData��
    "sData":{
        "iPlatId":"",
    },

    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(311093,674277);  //ҳ���ʼ��
    }
};

// ����+�齱����[674237] amsSubmit(311093,674237);
amsCfg_674237 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351703', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        amsSubmit(311093,674277);  //ҳ���ʼ��
        // TGDialogS('popFxcg');
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(311093,674277);  //ҳ���ʼ��
        // TGDialogS('popFxcg');
    }
};


var aAward = {
    '1939795': '0',
    '1939832': '1',
    '1939835': '2',
    '1939828': '3',
    '1939802': '4',
    '1939800': '5'
};
var prizeList = [
    'iPhone11',
    '�ʹ����������',
    'лл����',
    '��ֻ��������',
    'Ұ�������������ֺ�',
    'tiffany �� ��',
];

// �齱[674238] amsSubmit(311093,674238);
amsCfg_674238 = {
    'iAMSActivityId' : '311093', // AMS���
    'activityId' : '351703', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(311093,674277);  //ҳ���ʼ��
        if(!callbackObj.sPackageName){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        //1��ʵ��
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var n = parseInt(aAward[callbackObj.iPackageId]);
            panel.playto(n, function(){
                if( n == 2){//û���н�
                    TGDialogS('popXxcy');
                }else {
                    // $(".edit-msg-btn").css('display','block');//��д���˻���Ϣ
                    $(".J-zj-wrap").text(prizeList[n]+' x 1');
                    TGDialogS('popZj');
                }

            });
            return;
        }
    }
};


//�������� ��ʼ�� [674277] amsSubmit(311093,674277);
amsCfg_674277 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 311093, //�id
    "iFlowId":    674277, //����id
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
amsCfg_674236 = {
    'iActivityId' : '311093', // AMS���
    'iFlowId' : '674236', // ���̺�
    '_everyRead' : true,
    'success': function(res){ //�ύ�ɹ��Ļص�
        if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

                //��ʾ������
                g("personInfoContent_674236").style.display = "block";

                //�رյ�����
                g("colseLayer_674236").onclick = function(){
                    g("personInfoContent_674236").style.display = "none";
                }
                //�ύ��ť�¼�
                g('personInfoContentBtn_674236').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_674236');
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

                    amsCfg_674236.sData = fillData;
                    amsSubmit(311093,674236);

                };
                var pcsConfig = {
                    provinceId : "province_"+674236,
                    cityId : "city_"+674236,
                    areaId: "county_"+674236,
                };
                console.log(pcsConfig);
                if (res.jData.sProvince && res.jData.sCity && res.jData.sExtend2) {
                    pcsConfig.initVal = [res.jData.sProvince,res.jData.sCity, res.jData.sExtend2]
                }
                pcs.show(pcsConfig);
                console.log(pcs);
                //��������:
                if(res.jData.sExtend1){
                    g('sExtend1_674236').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_674236');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
                    // g('tr_package_name_674236').style.display = '';
                    // g('tr_package_value_674236').style.display = '';
                    // for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
                    //     var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                    //     var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                    //     g('package_674236').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
                    // }
                    g('tr_package_name_674236').style.display = '';
                    g('tr_package_value_674236').style.display = '';
                    for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
                        var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                        var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                        if(res.jData.arrPackageInfo[i].iPackageId == 1939835)
                        {
                            g('tr_package_name_674236').style.display = 'none';
                            g('tr_package_value_674236').style.display = 'none';
                        }else{
                            g('package_674236').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
                        }

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
        milo.addEvent(g('btn_personInfo_674236'),'click',function(){
            LoginManager.submitLogin(function(){
                amsCfg_674236.sData = { iShow: 1 };
                // amsSubmit(311093,674236);
                checkAMS(674236,4);
            });
        });
    });
});








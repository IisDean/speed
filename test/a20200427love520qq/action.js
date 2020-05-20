// 判断用户设备
var device = 0;
var u = navigator.userAgent;
if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
    device = 2;//android终端
}
if(u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1){
    device = 1; //ios终端
}
milo.ready(function () {
    need("biz.login", function (LoginManager) {
        if(LoginManager.isWxApp()){
            //如果是在微信中打开，则跳转到微信页面
            //如果是在微信中打开，跳转到QQ中打开页面
            console.log('在微信，QQ->wx');
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90243170&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200427love520wx%2Findex.html"; //这里放openlink
        }else {
            LoginManager.checkLogin(function (userInfo) {
                console.log("已登录,登录信息：", userInfo);
                // 如果已经有登录态，则由微信中跳转到QQ
                $("#userinfo").html(decodeURIComponent(userInfo.nickName));
                console.log('成功登录999');
                amsSubmit(303480, 663104);  //页面初始化
            }, function () {
                LoginManager.login(
                    {
                        s_url: "",
                        logo: "",
                        sData: {
                            //传pt_no_onekey:1 可以屏蔽一键登录
                            //pt_no_onekey:1
                        },
                        iUseQQConnect: 0,//是否使用QQ互联
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
            alert("请刷新页面，登录账号~");
        });
    });
}

// <button class="button" id="lottery_663224" >预约+抽奖积分[663224]</button> amsSubmit(303480,663224);
// <button class="button" id="lottery_663226" >分享+抽奖积分[663226]</button> amsSubmit(303480,663226);
// <button class="button" id="lottery_663233" >抽奖[663233]</button> amsSubmit(303480,663233);

// 预约+抽奖积分[663224]
amsCfg_663224 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345905', // 模块实例号
    //可选扩展参数sData，

     "sData":{
			"iPlatId":"",
			},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // alert(callbackObj.sMsg);
        nextPageRead(2);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(303480,663104);  //页面初始化
        nextPageRead(2);
        // if(!callbackObj.sPackageName){
        //     LotteryManager.alert(callbackObj.sMsg);
        //     return;
        // }
        // LotteryManager.alert(str);
        // return;
    }
};


// 分享+抽奖积分[663226]
amsCfg_663226 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345905', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // alert(callbackObj.sMsg);
        // if(callbackObj.iRet == 600){
        //     TGDialogS('posterPop');
        // }
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(303480,663104);  //页面初始化
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
    "1889660":"1", //YSL-小金条
    "1889656":"2", //男主徽章
    "1889661":"3", //谢谢参与
    "1889657":"4", //男主立牌
    "1889659":"5", //MissDior香水
};
var prizeList = [
    'iphoneSE',
    'YSL-小金条',
    '男主徽章',
    '谢谢参与',
    '男主立牌',
    'MissDior香水',
];

// 抽奖[663233]
amsCfg_663233 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345905', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(303480,663104);  //页面初始化
        if(!callbackObj.sPackageName){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        //1：实物
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var n = parseInt(aAward[callbackObj.iPackageId]);
            panel.playto(n, function(){
                if( n == 3){//没有中奖
                    TGDialogS('losingLottery');
                }else {
                    $(".edit-msg-btn").css('display','block');
                    $(".J-zj-wrap").text(prizeList[n]+' x 1');
                    TGDialogS('winPrize');
                }

            });
            return;
        }

        // //2：cdkey
        // if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
        //
        //     LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
        //     //LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
        //     return;
        // }
        // str += "请您注意查收！";
        // LotteryManager.alert(str);
        // return;
    }
};


//抽奖次数 [663104]  amsSubmit(303480,663104);
amsCfg_663104 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 303480, //活动id
    "iFlowId":    663104, //流程id
    "fFlowSubmitEnd": function(res){
        // alert('返回数据为:' + res);
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
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};




<!-- 填写个人信息 js -->
amsCfg_663225 = {
    'iActivityId' : '303480', // AMS活动号
    'iFlowId' : '663225', // 流程号
    '_everyRead' : true,
    'success': function(res){ //提交成功的回调
        if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
            need(["biz.provincecityselector", "util.form"], function(pcs, FormManager) {

                //显示弹出框
                g("personInfoContent_663225").style.display = "block";

                //关闭弹出框
                g("colseLayer_663225").onclick = function(){
                    g("personInfoContent_663225").style.display = "none";
                }

                //提交按钮事件
                g('personInfoContentBtn_663225').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_663225');
                    for(var i in fillData) {
                        var _val = fillData[i];
                        switch(i) {
                            case 'sName': {
                                if(!_val){alert("姓名不能为空"); return false;}
                                if(milo.getByteLength(_val) > 30){alert("姓名长度不能超过30个字节。"); return false;}
                                break;
                            }
                            case 'sIdentity':{
                                if(!_val){alert("身份证号码不能为空"); return false;}
                                if(!milo.isIDCard(_val)){alert("身份证号码有误。"); return false;}
                                break;
                            }
                            case 'sMobile':{
                                if(!_val){alert("手机号码不能为空"); return false;}
                                if(isNaN(_val) || _val.indexOf('.') >= 0){alert("手机号码必须为数字。"); return false;}
                                if(_val.length > 11){alert("手机号码不得超过11位。"); return false;}
                                break;
                            }
                            case 'sAddress':{
                                if(!_val){alert("详细地址不能为空"); return false;}
                                if(milo.getByteLength(_val) > 100){alert("详细地址不能超过100个字节。"); return false;}
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

                //如果返回值不等于undefined ，赋值当前省
                if(res.jData.sProvince != undefined){
                    g('province_663225').value = res.jData.sProvince;
                }

                //监听省 change事件
                g('province_663225').onchange();

                //如果返回值不等于undefined ，赋值当前市
                if(res.jData.sCity != undefined){
                    g('city_663225').value = res.jData.sCity;
                }
                //发货订单:
                if(res.jData.sExtend1){
                    g('sExtend1_663225').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_663225');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0 ) { //如果存在实物信息，则显示
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
        //填写按钮的点击事件绑定
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







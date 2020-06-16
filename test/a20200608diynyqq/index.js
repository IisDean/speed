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
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90245428&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200608diynywx%2Findex.html"; //这里放openlink
        }else {
            LoginManager.checkLogin(function (userInfo) {
                console.log("已登录,登录信息：", userInfo);
                // 如果已经有登录态，则由微信中跳转到QQ
                $("#userinfo").html(decodeURIComponent(userInfo.nickName));
                console.log('成功登录999');
                amsSubmit(311093,674277);  //页面初始化
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
            if(id == 674235)
            {
                amsCfg_674235.sData.iPlatId = device;
            }

            amsSubmit(311093,id);
        },function(){
            alert("请刷新页面，登录账号~");
        });
    });
}

// <button class="button" id="lottery_674235" >预约+抽奖积分[674235]</button>
// <button class="button" id="lottery_674237" >分享+抽奖积分[674237]</button>
// <button class="button" id="lottery_674238" >抽奖[674238]</button>


// 预约+抽奖积分[674235] amsSubmit(311093,674235);
amsCfg_674235 = {
    'iAMSActivityId' : '311093', // AMS活动号
    'activityId' : '351703', // 模块实例号

    //可选扩展参数sData，
    "sData":{
        "iPlatId":"",
    },

    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(311093,674277);  //页面初始化
    }
};

// 分享+抽奖积分[674237] amsSubmit(311093,674237);
amsCfg_674237 = {
    'iAMSActivityId' : '311093', // AMS活动号
    'activityId' : '351703', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(311093,674277);  //页面初始化
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
    '故宫博物馆手账',
    '谢谢参与',
    '三只松鼠大礼包',
    '野兽派永生花音乐盒',
    'tiffany 手 链',
];

// 抽奖[674238] amsSubmit(311093,674238);
amsCfg_674238 = {
    'iAMSActivityId' : '311093', // AMS活动号
    'activityId' : '351703', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(311093,674277);  //页面初始化
        if(!callbackObj.sPackageName){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        //1：实物
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            var n = parseInt(aAward[callbackObj.iPackageId]);
            panel.playto(n, function(){
                if( n == 2){//没有中奖
                    TGDialogS('popXxcy');
                }else {
                    // $(".edit-msg-btn").css('display','block');//填写个人获奖信息
                    $(".J-zj-wrap").text(prizeList[n]+' x 1');
                    TGDialogS('popZj');
                }

            });
            return;
        }
    }
};


//运行流程 初始化 [674277] amsSubmit(311093,674277);
amsCfg_674277 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 311093, //活动id
    "iFlowId":    674277, //流程id
    "fFlowSubmitEnd": function(res){
        if(res.iRet == 0)
        {
            $("#ticket").text(res.sOutValue1);
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
amsCfg_674236 = {
    'iActivityId' : '311093', // AMS活动号
    'iFlowId' : '674236', // 流程号
    '_everyRead' : true,
    'success': function(res){ //提交成功的回调
        if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
            need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

                //显示弹出框
                g("personInfoContent_674236").style.display = "block";

                //关闭弹出框
                g("colseLayer_674236").onclick = function(){
                    g("personInfoContent_674236").style.display = "none";
                }
                //提交按钮事件
                g('personInfoContentBtn_674236').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_674236');
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

                    amsCfg_674236.sData = fillData;
                    amsSubmit(311093,674236);

                };
                var pcsConfig = {
                    provinceId : "province_"+674236,
                    cityId : "city_"+674236,
                    areaId: "county_"+674236,
                };
                if (res.jData.sProvince && res.jData.sCity && res.jData.sExtend2) {
                    pcsConfig.initVal = [res.jData.sProvince,res.jData.sCity, res.jData.sExtend2]
                }
                pcs.show(pcsConfig);

                //发货订单:
                if(res.jData.sExtend1){
                    g('sExtend1_674236').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_674236');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //如果存在实物信息，则显示
                    g('tr_package_name_674236').style.display = '';
                    g('tr_package_value_674236').style.display = '';
                    for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
                        var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                        var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                        g('package_674236').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
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
        milo.addEvent(g('btn_personInfo_674236'),'click',function(){
            LoginManager.submitLogin(function(){
                amsCfg_674236.sData = { iShow: 1 };
                // amsSubmit(311093,674236);
                checkAMS(674236,4);
            });
        });
    });
});








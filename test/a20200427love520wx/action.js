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
        if (LoginManager.isWxApp()){
            LoginManager.checkLogin(function(userInfo){
                console.log("已登录,登录信息：",userInfo);

                if (milo.cookie.get("acctype") == "wx"){
                    LoginManager.getUserInfoByWxOpenId({
                        openid:milo.cookie.get('openid'),
                        access_token:milo.cookie.get('access_token')
                    },function(WxUserInfo){
                        console.log('登录成功，用户信息为',WxUserInfo);
                        var str = WxUserInfo.nickname;
                        var res = str.replace(/\<span\s+class\=\"emoji\s+emoji\w+\"\>\<\/span\>/g,'');
                        console.log(res);
                        $("#userinfo").html(res);
                        $("#username").html(res);
                        console.log("登录成功333");
                    },function(err){
                        // alert('获取用户信息失败');
                        console.log('获取用户信息失败',err);
                    })
                }
                amsSubmit(303480,663104);  //页面初始化
            },function() {
                LoginManager.loginByWX({
                    redirect_wx_url: "",
                    appConfig: {
                        "gameDomain": "iu.qq.com",//用于微信登录redirect_uri后端配置与当前页面domain不一致的情况下自动中转兼容，格式：iu.qq.com,默认为空，表示当前页域名和appid具有绑定关系
                        "avoidConflict": "",//默认值为空，判断是否需要校验微信登录态串号，设为true，为必须校验，设为false，为不校验，默认值""表示在微信环境下校验，其它app环境下不校验
                        'WxAppId': 'wx5d2b5a22d026d021',
                        "AppName": "北极光工作室群",
                        "scope": "snsapi_userinfo",
                    },
                });
            });
        }else if (LoginManager.isQQApp()){
            //如果不是在微信中（QQ或者第三方浏览器）打开，则跳转到微信
            console.log('在QQ,wx->QQ;');
            var qqurlnew = "//love.qq.com/cp/a20200427love520qq/index.html";
            // var sStartQQ = location.protocol + "//imgcache.qq.com/club/themes/mobile/middle_page/index.html?url=" + window.location.protocol + encodeURIComponent(qqurlnew);
            window.location.href = location.protocol +qqurlnew;
        }else{
            console.log('在浏览器，liu->WX;');
            //如果不是在微信中（QQ或者第三方浏览器）打开，则跳转到微信
            window.location.href = "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90243170&appid=wxca6215f6c23c2e90&url=https%3A%2F%2Flove.qq.com%2Fcp%2Fa20200427love520wx%2Findex.html"; //这里放openlink
        }
    });
});

function checkAMS(id,n){
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(userInfo){

            if(id == 663243) //预约
            {
                amsCfg_663243.sData.iDevice = device;
            }

            amsSubmit(303480,id);
        },function(){
            alert("请先登录账号~");
        });
    });
}



// <button class="button" id="lottery_663243" >预约+抽奖积分[663243]</button>
// <button class="button" id="lottery_663245" >签到+抽奖积分[663245]</button>
// <button class="button" id="lottery_663246" >抽奖[663246]</button>



// 抽奖积分 amsSubmit(303480,663243);
amsCfg_663243 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345907', // 模块实例号
    "sData":{"iDevice":"",'appid': 'wx5d2b5a22d026d021', "sServiceType": "lv"},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // alert(callbackObj.sMsg);
        nextPageRead(2);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsCfg_663642.sData.iDevice = device;
        amsSubmit(303480,663642);  //发放卡券
    }
};



// 预约卡券 amsSubmit(303480,663642);
amsCfg_663642 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345907', // 模块实例号
    "sData":{"iDevice":"",'appid': 'wx5d2b5a22d026d021', "sServiceType": "lv"},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        // alert(callbackObj.sMsg);
        nextPageRead(2);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        // amsSubmit(303480,663104);  //页面初始化(lottery页面已进行过刷新)
        nextPageRead(2);
    }
};

// 签到+抽奖积分[663245] amsSubmit(303480,663245);
amsCfg_663245 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345907', // 模块实例号
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件

        TGDialogS("qdzgPopTips");

        // alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(303480,663104);  //页面初始化
        TGDialogS('qdPopTips');
    }
};


var aAward = {
    "1889687":"0", //iphoneSE
    "1889689":"1", //YSL-小金条
    "1889685":"2", //男主徽章
    "1889690":"3", //谢谢参与
    "1889686":"4", //男主立牌
    "1889688":"5", //MissDior香水
};
var prizeList = [
    'iphoneSE',
    'YSL-小金条',
    '男主徽章',
    '谢谢参与',
    '男主立牌',
    'MissDior香水',
];

// 抽奖[663246]  amsSubmit(303480,663246);
amsCfg_663246 = {
    'iAMSActivityId' : '303480', // AMS活动号
    'activityId' : '345907', // 模块实例号
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
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
    }
};



//抽奖次数 [663104]  amsSubmit(303480,663104);
amsCfg_663104 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 303480, //活动id
    "iFlowId":    663104, //流程id
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    "fFlowSubmitEnd": function(res){
        // alert('返回数据为:' + res);
        // return;
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
amsCfg_663244 = {
    'iActivityId' : '303480', // AMS活动号
    'iFlowId' : '663244', // 流程号
    '_everyRead' : true,
    'sData':{'appid': 'wx5d2b5a22d026d021', 'sServiceType': 'lv'},
    'success': function(res){ //提交成功的回调
        if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
            need(["biz.provincecityselector", "util.form"], function(pcs, FormManager) {

                //显示弹出框
                g("personInfoContent_663244").style.display = "block";

                //关闭弹出框
                g("colseLayer_663244").onclick = function(){
                    g("personInfoContent_663244").style.display = "none";
                }

                //提交按钮事件
                g('personInfoContentBtn_663244').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_663244');
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

                    amsCfg_663244.sData = fillData;
                    amsSubmit(303480,663244);
                }

                pcs.show({
                    provinceId : "province_"+663244,
                    cityId : "city_"+663244
                });

                //如果返回值不等于undefined ，赋值当前省
                if(res.jData.sProvince != undefined){
                    g('province_663244').value = res.jData.sProvince;
                }

                //监听省 change事件
                g('province_663244').onchange();

                //如果返回值不等于undefined ，赋值当前市
                if(res.jData.sCity != undefined){
                    g('city_663244').value = res.jData.sCity;
                }
                //发货订单:
                if(res.jData.sExtend1){
                    g('sExtend1_663244').innerHTML=res.jData.sExtend1;
                }
                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_663244');

                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //如果存在实物信息，则显示
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
        //填写按钮的点击事件绑定
        milo.addEvent(g('btn_personInfo_663244'),'click',function(){
            LoginManager.submitLogin(function(){
                amsCfg_663244.sData = { iShow: 1 };
                amsSubmit(303480,663244);
                TGDialogS('submitMsg1');
            });
        });
    });
});







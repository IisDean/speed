//初始化
amsCfg_682955 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    682955, //流程id
    "fFlowSubmitEnd": function(res){
        globalInfo.user.isFirst = res.sOutValue1;//首次
        var holdList = res.sOutValue2;
        var jfList = res.sOutValue3;
        var completeNum = res.sOutValue4;//剩余套数
        var cardProgress = res.sOutValue5;//集卡进度
        globalInfo.user.starId = res.sOutValue7;//明星封面
        //var syRet = res.sOutValue8;//被响应索要
        var fmArray = globalInfo.user.starId.split("_");
        $.each(fmArray,function(k,v){
            $(".card-kh-list li").eq(k).removeClass('card-0').addClass('card-'+v).attr("thisStarId",v);
        });
        if(holdList.split(',')[0] > 0 && holdList.split(',')[1] > 0){
            //领取体验套装按钮
            $(".J-start-yy1").unbind().addClass('ylq');
        }

        //res.sOutValue5   mxCard,klCard
        if(res.sOutValue5.split(",")[1] ==  8){
            if(holdList.split(',')[0] == 0){
                $(".J-start-yy1").addClass('btn-scale');
            }
            $("#klCard a").removeClass().addClass("icons btn-lq2 btn-scale t");//领取
            $("#klCard a").click(function(){
                $("#clothesName_first").text('活力前浪套装(7天)');
                globalInfo.user.getType = 0;
                globalInfo.user.goodsType = 0;
                if(isMSDK()){
                    gpSubmit(316510,686110);//前浪
                }else{
                    $("#dh_first").unbind("click").click(function(){
                        gpSubmit(316510,686110);
                    });
                    gpSubmit(316510, 685199);//查询游戏昵称
                }
            });

        }
        if(res.sOutValue5.split(",")[0] ==  3) {
            if(holdList.split(',')[1] == 0){
                $(".J-start-yy1").addClass('btn-scale');
            }
            $("#mxCard a").removeClass().addClass("icons btn-lq2 btn-scale t");//领取
            $("#mxCard a").click(function () {
                globalInfo.user.getType = 0;
                globalInfo.user.goodsType = 1;
                $("#clothesName_first").text('活力后浪套装(7天)');
                if(isMSDK()){
                    gpSubmit(316510, 686127);//后浪
                }else{
                    $("#dh_first").unbind("click").click(function () {
                        gpSubmit(316510, 686127);//后浪
                    });
                    gpSubmit(316510, 685199);//查询游戏昵称
                }
            });

        }
        if(res.sOutValue5.split(",")[0] <  3){
            $("#mxCard a").removeClass().addClass("icons btn-wjq t");//未集齐
        }
        if(res.sOutValue5.split(",")[1] <  8){
            $("#klCard a").removeClass().addClass("icons btn-wjq t");//未集齐
        }
        if(holdList.split(',')[0] > 0){
            $("#klCard a").unbind("click").removeClass().addClass("icons btn-ylq2 btn-hover t");//已领取
            $("#ylq_qian").show();
        }
        if(holdList.split(',')[1] > 0){
            $("#mxCard a").unbind("click").removeClass().addClass("icons btn-ylq2 btn-hover t");//已领取
            $("#ylq_hou").show();
        }

        if(holdList.split(',')[2] > 0){
            //已获得
            $("#Obtained2").show();//前浪已获得
            $("#xh_kh_btn").removeAttr("href").hide();
            $("#btn_q_ydh").show();//已兑换
        }
        if(holdList.split(',')[3] > 0){
            //已获得
            $("#Obtained").show();//后浪已获得
            $("#xh_mx_btn").removeAttr("href").hide();
            $("#btn_h_ydh").show();//已兑换
        }
        //每日任务全部完成
        if(holdList.split(',')[4] > 0 && holdList.split(',')[5] > 0 && holdList.split(',')[6] > 0 && holdList.split(',')[7] > 0){
            globalInfo.user.doneTask = true;
        }
        if(holdList.split(',')[4] > 0){
            $("#dayTask1 a").hide();
            $("#dayTask1 i").show();
        }
        if(holdList.split(',')[5] > 0){
            $("#dayTask2 a").hide();
            $("#dayTask2 i").show();
        }
        if(holdList.split(',')[6] > 0){
            $("#dayTask3 a").hide();
            $("#dayTask3 i").show();
        }
        if(holdList.split(',')[7] > 0){
            $("#dayTask4 a").hide();
            $("#dayTask4 i").show();
        }
        if(isMSDK()){
            //登录游戏任务完成
            $("#dayTask1 a").hide();
            $("#dayTask1 i").show();
        }
        //卡片剩余数
        var jfList_1 =  jfList.split('|');
        $.each(jfList_1,function(k,v){
            if(k>0 && k<12){
                $("#"+'card'+k).text(v.split(" ")[4]);
                $("#"+'card_pop'+k).text(v.split(" ")[4]);
                $("#"+'card_pop_gx'+k).text(v.split(" ")[4]);
            }else if(k == 12){
                $("#surplus").text(v.split(" ")[4]);
            }
        });
        //res.sOutValue4 kh,mx
        $("#kCardNum").text(res.sOutValue4.split(",")[0]);
        $("#kCardNum_floor").text('已集齐口令卡'+res.sOutValue4.split(",")[0]+'套');
        $("#dCardNum").text(res.sOutValue4.split(",")[1]);
        $("#dCardNum_floor").text('已集齐明星卡'+res.sOutValue4.split(",")[1]+'套');
        $("#klCard p").text('口令卡进度：'+ res.sOutValue5.split(",")[1] + '/8');
        $("#mxCard p").text('明星卡进度：'+ res.sOutValue5.split(",")[0] + '/3');
        if(res.sOutValue4.split(",")[0] >= 4){//剩余口号卡套数
            $("#xh_kh_btn").addClass("btn-scale");
        }
        if(res.sOutValue4.split(",")[1] >= 7){//剩余明星卡套数
            $("#xh_mx_btn").addClass("btn-scale");
        }

        //弹窗
        if(milo.request('shareCode') != ""){
            globalInfo.user.shareCode = decodeURIComponent(milo.request('shareCode'));
            gpSubmit(316510,685513);//解析
        }else{
            gpSubmit(316510,689191);
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
    }
};
//查询被响应索要
amsCfg_689191 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    689191, //流程id
    "fFlowSubmitEnd": function(res){
        var syRet = res.jData.iRet;
        if(res.jData.iRet == 100001){//无被响应索要
            //首次进入
            if(globalInfo.user.isFirst == 0){
                TGDialogS('pop34');
            }
        }else{
            var i = 0;
            var iCardId,iStarId,vGnickName,imgurl;
            //var tipsNum = syRet.jData.iRet.length;
            $.each(syRet,function(key,val){
                i++;
                iCardId = val['iCardId'];
                iStarId = val['iStarId'];//1黄2鹤3彦
                vGnickName = decodeURIComponent(val['vGnickName']);
            });
            $("#tipName").text(cardName[iCardId -1]);
            // var hasNum = $("#"+'card_pop'+iCardId).text();
            // $("#hasNum").text('收到了'+ vGnickName +'共享的卡片');
            if(iStarId == 0){//未选择封面
                var random = parseInt(Math.random()*3);//随机0~2
                var mxImgList = ['//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_hmh.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_whd.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_wyl.jpg'];
                imgurl = mxImgList[random];
            }else{
                var mxImg = {1:'hmh', 2:'whd', 3:'wyl'};
                imgurl = '//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_kh'+ iCardId +'_'+ mxImg[iStarId] +'.jpg';
            }
            $("#pop31 img").attr("src", imgurl);
            $("#holdTicket").hide();
            TGDialogS('pop31');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};
//搜集卡片
amsCfg_681573 = {
    'iAMSActivityId' : '316510', // AMS活动号
    'activityId' : '356792', // 模块实例号
    //可选扩展参数sData，
    "sData":{},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        if(callbackObj.sMsg== '活动太火爆了~请稍后再试'){
            alert('活动太火爆了~请稍后再试');
        }else{
            if(globalInfo.user.doneTask == true){
                TGDialogS('pop5');
            }else{
                TGDialogS('pop4');
            }
        }
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        gpSubmit(316510,682955);//初始化
        var cardName = ipackageIdCard[callbackObj.iPackageId];
        if(callbackObj.iPackageId == '2004489' || callbackObj.iPackageId == '2004490' || callbackObj.iPackageId == '2008903'){
            // 发现元气明星卡
            //0 = 黄明昊 1 = 王鹤棣 2 = 王彦霖
            var fxMxId = {'2004489' : 1, '2004490' : 2, '2008903' : 0};
            var fxMxName = {'2004489' : '王鹤棣', '2004490' : '王彦霖', '2008903' : '黄明昊'};
            ctrlJs.methods.fxMxcard({id: fxMxId[callbackObj.iPackageId],name: fxMxName[callbackObj.iPackageId]});
        }else{
            // 发现元气口号卡
            var obj = {
                idx: Card_index[callbackObj.iPackageId], //元气卡编号 总共8张
                name: cardName, //元气卡名称
                cardNum:$("#card"+Card_index[callbackObj.iPackageId]).text(),//剩余x张
                //src:
            };
            ctrlJs.methods.fxYqCard(obj);

        }
        return;
    }
};
//解析分享码
amsCfg_685513 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    685513, //流程id
    "fFlowSubmitEnd": function(res){
        var syRet = res.sOutValue1;
        var iType = res.sOutValue2;
        var syCardId = res.sOutValue3;
        if(syRet == 0){
            if(iType == 1){
                //接受共享
                gpSubmit(316510,684788);
            }else if(iType == 2){
                //接受索要
                $("#syName").text(cardName[syCardId]);
                gpSubmit(316510,685169);
            }
        }else if(syRet == 100003){//不能领取自己的链接
            if(iType == 1){
                TGDialogS('pop12');
            }else{
                TGDialogS('pop15');
            }
        }
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        //alert(res.sMsg);
    }
};
//发起共享
amsCfg_684787 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    684787, //流程id
    "fFlowSubmitEnd": function(res){
        gpSubmit(316510,682955);//初始化
        shareCode = res.sOutValue1;
        var shareNum = parseInt(Math.random()*3);//随机0~3
        var gxDesc = {
            '王鹤棣': '满满元气就是我的武器，大吉大利，我们都是和平精英！',
            '王彦霖': '不跳皮筋就跳伞，大吉大利，我们都是和平精英！',
            '黄明昊': '不要贾走位，就要真输出，大吉大利，我们都是和平精英！',
            '好友'  : '满满元气就是我的武器，大吉大利，我们都是和平精英！',
        };
        if(globalInfo.user.cardId < 9){
            var nowStarId = globalInfo.user.starId.split('_')[globalInfo.user.cardId -1];
            var mxName; //0 = 黄明昊    1 = 王鹤棣     2 = 王彦霖
            var shareNum = parseInt(Math.random()*3);//随机0~2
            var mxArray = ['黄明昊','王鹤棣','王彦霖'];
            if(nowStarId == 0){mxName = mxArray[shareNum];}else{mxName = mxArray[nowStarId - 1];}
            var cardName = cardnameArray[globalInfo.user.cardId - 1];
            var gxShareText = [mxName+'送你一张【'+ cardName +'】卡，点击收下速领他的同款套装>>',mxName+'拍了拍你，点击收下【'+ cardName +'】卡领同款套装>>',mxName+'邀你进队，点击进队领【'+ cardName +'】卡和同款小队套装>>'];
            globalInfo.share.nowTitle = gxShareText[shareNum];
            globalInfo.share.descript = gxDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }else{
            var mxObj = {9:'王鹤棣', 10:'王彦霖', 11:'黄明昊'};
            var mxName = mxObj[globalInfo.user.cardId];
            var gxShareText = ['送你一张【'+ mxName +'】卡，点击收下速领同款套装>>','点击收下【'+ mxName +'】卡，一起穿同款套装元气满满>>','【'+ mxName +'】卡送你，一起元气满满领定制套装>>'];
            globalInfo.share.nowTitle = gxShareText[shareNum];
            globalInfo.share.descript = gxDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }
        if(isMSDK()){
            globalInfo.share.img = globalInfo.shareNormal.imgBase64;
            if(milo.request('appid') == '1106467070'){
                TGDialogS('pop1');
            }else{
                TGDialogS('pop2');
            }
        }else{
            toShare();
            TGDialogS('pop3');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        //alert(res.sMsg);
    }
};
//接受共享
amsCfg_684788 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    684788, //流程id
    "fFlowSubmitEnd": function(res){
        var iRet = res.sOutValue1;
        var cardId = res.sOutValue2;
        var holdTicket = res.sOutValue3;
        var thisStarId = res.sOutValue4;
        var posterImg;
        if(iRet == 0){
            gpSubmit(316510,682955);//初始化
            $("#tipName").text(cardName[cardId -1]);
            //var hasNum = $("#"+'card_pop'+cardId).text();
            //$("#hasNum").text('收到好友的卡片，目前拥有'+ hasNum +'张');
            //$("#holdTicket").text('今日还可以领取'+ holdTicket +'次');
            //$("#holdTicket").show();

            if(cardId < 9){
                var mx_name = {0:'whd',1:'hmh',2:'whd',3:'wyl'};
                posterImg = 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_kh'+ cardId +'_'+ mx_name[thisStarId] +'.jpg'
            }else{
                var mx_name = {9:'whd',10:'wyl',11:'hmh'};
                posterImg = 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_'+ mx_name[cardId] +'.jpg'
            }
            $("#pop31 img").attr("src",posterImg);
            TGDialogS('pop31');
        }else if(iRet == 100003){
            TGDialogS('pop12');
        }else if(iRet == 100008){
            TGDialogS('pop14');
        }else if(iRet == 100009){
            TGDialogS('pop13');
        }else if(iRet == 100010){
            TGDialogS('pop12_url');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        //alert(res.sMsg);
    }
};
//使用封面
amsCfg_686475 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    686475, //流程id
    "fFlowSubmitEnd": function(res){
        //alert('返回数据为:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        //alert(res.sMsg);
    }
};
//发起索要
amsCfg_686116 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    686116, //流程id
    "fFlowSubmitEnd": function(res){
        gpSubmit(316510,682955);//初始化
        shareCode = res.sOutValue1;
        var shareNum = parseInt(Math.random()*3);//随机0~3
        var syDesc = {
            '王鹤棣': '满满元气就是我的武器，大吉大利，我们都是和平精英！',
            '王彦霖': '不跳皮筋就跳伞，大吉大利，我们都是和平精英！',
            '黄明昊': '不要贾走位，就要真输出，大吉大利，我们都是和平精英！',
            '好友'  : '满满元气就是我的武器，大吉大利，我们都是和平精英！',
        };
        if(globalInfo.user.cardId < 9){//口令卡
            var nowStarId = globalInfo.user.starId.split('_')[globalInfo.user.cardId -1];
            var mxName;
            var shareNum = parseInt(Math.random()*3);//随机0~2
            var mxArray = ['黄明昊','王鹤棣','王彦霖'];
            if(nowStarId == 0){mxName = mxArray[shareNum];}else{mxName = mxArray[nowStarId - 1];}
            var cardName = cardnameArray[globalInfo.user.cardId - 1];
            var syShareText = ['送我【'+ cardName +'】卡，带你和'+ mxName +'一起领同款套装>>','求【'+ cardName +'】卡，我拉你进'+ mxName +'的车队上分领同款套装>>','只差【'+ cardName +'】卡，我就能穿上'+ mxName +'的同款套装带你飞啦>>'];
            globalInfo.share.nowTitle = syShareText[shareNum];
            globalInfo.share.descript = syDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }else{//mx
            var mxObj = {9:'王鹤棣', 10:'王彦霖', 11:'黄明昊'};
            var mxName = mxObj[globalInfo.user.cardId];
            var syShareText = ['送我【'+ mxName +'】卡， 带你领他的同款套装>>','【'+ mxName +'】卡来一张，元气满满领定制套装>>','仅需一张【'+ mxName +'】卡，我就和你穿情侣款元气套装>>'];
            globalInfo.share.nowTitle = syShareText[shareNum];
            globalInfo.share.descript = syDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }
        if(isMSDK()){
            globalInfo.share.img = globalInfo.shareNormal.imgBase64;
            if(milo.request('appid') == '1106467070'){
                TGDialogS('pop1');
            }else{
                TGDialogS('pop2');
            }
        }else{
            toShare();
            TGDialogS('pop3');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        //alert(res.sMsg);
    }
};
//接受索要
amsCfg_685169 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    685169, //流程id
    "fFlowSubmitEnd": function(res){
        var iRet = res.sOutValue1;
        var iCardId = res.sOutValue2;
        var iStarId = res.sOutValue3;
        var imgurl;
        if(iRet == 0){
            gpSubmit(316510,682955);//初始化
            if(iStarId == 0){//未选择封面
                var random = parseInt(Math.random()*3);//随机0~2
                var mxImgList = ['//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_hmh.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_whd.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_wyl.jpg'];
                imgurl = mxImgList[random];
            }else{
                var mxImg = {1:'hmh', 2:'whd', 3:'wyl'};
                //imgurl = cardImg[iCardId]+'_'+ mxImg[iStarId] +'.png';
                imgurl = '//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_kh'+ iCardId +'_'+ mxImg[iStarId] +'.jpg';
            }
            $("#syName").text(cardName[iCardId-1]);
            $("#pop31_sy img").attr("src",imgurl);
            TGDialogS('pop31_sy');
        }else if(iRet == 100006){
            TGDialogS('pop13_sy');//索要已被响应
        }else if(iRet == 100007){
            TGDialogS('pop14_sy');//好友领取已达上限
        }else if(iRet == 100003){
            TGDialogS('pop15');
        }else{
            alert('分享码不正确');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        if(res.sMsg == '卡片不足'){
            TGDialogS('pop16');
        }
    }
};
//查询昵称
amsCfg_685199 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316510, //活动id
    "iFlowId":    685199, //流程id
    "fFlowSubmitEnd": function(res){
        var nickName = decodeURIComponent(res.sOutValue1);
        //alert('返回数据为:' + res);
        $("#charName_first").text(nickName);
        $("#charName").text(nickName);
        if(globalInfo.user.getType == 0){
            if(globalInfo.user.goodsType == 0){//前浪
                $(".tz-title-text").text('魅力前浪套装');
                $("#pop33_first img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png")
            }else{
                $(".tz-title-text").text('活力后浪套装');
                $("#pop33_first img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png")
            }
            TGDialogS('pop33_first');
        }else{
            if(globalInfo.user.goodsType == 0){//前浪
                $(".tz-title-text").text('魅力前浪套装');
                $("#pop33_desc").text("消耗4套口号卡兑换");
                $("#pop33 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png")
            }else{
                $(".tz-title-text").text('活力后浪套装');
                $("#pop33_desc").text("消耗7套明星卡兑换");
                $("#pop33 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png")
            }
            TGDialogS('pop33');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        $("#charName_first").text('当前系统无角色');
        $("#charName").text('当前系统无角色');
        TGDialogS('pop33');
        //alert(res.sMsg);
    }
};
// 抽奖领取主功能初始化
amsCfg_686110 = amsCfg_686127 = amsCfg_686137 = amsCfg_686143 ={
    'iAMSActivityId' : '316510', // AMS活动号
    'activityId' : '357016', // 模块实例号
    //可选扩展参数sData，
    "sData":{},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        gpSubmit(316510,682955);//初始化
        if(callbackObj.iPackageId == 2017835){
            $("#clothesTime").text('7天');
            $("#prizeName").text(' 魅力前浪套装（7天）');
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png");
        }else if(callbackObj.iPackageId == 2017828){
            $("#clothesTime").text('7天');
            $("#prizeName").text(' 活力后浪套装（7天）');
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png");
        }else if(callbackObj.iPackageId == 2017843){
            $("#xh_kh_btn").removeAttr("href").hide();
            $("#btn_q_ydh").show();//已兑换
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png");
            $("#clothesTime").text('30天');
            $("#prizeName").text('魅力前浪套装（30天）');
        }else{
            $("#xh_mx_btn").removeAttr("href").hide();
            $("#btn_h_ydh").show();//已兑换
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png");
            $("#clothesTime").text('30天');
            $("#prizeName").text('活力后浪套装（30天）');
        }
        TGDialogS('pop37');
        return;
    }
};
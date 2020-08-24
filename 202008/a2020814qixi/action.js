//调用，查询是否已经绑定
milo.ready(function(){
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function (userInfo) {
                $("#userinfo").html(userInfo.uin);
                //获取当前昵称
                amsCfg_694520.sData.MynickName = userInfo.nickName;

                amsInit(325431, 694368); //查询是否已绑定

            }, function () {
                LoginManager.login();
            });
        });

    }
);


function checkAMS(id)
{
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userInfo) {




            amsSubmit(325431,id); //执行

        }, function () {
            LoginManager.login();  //登录
        });
    });
}



//查询是否绑定的配置
amsCfg_694368={
    type : "query",
    iQueryFlowID:694368,
    service:"wuxia" ,
    success : function(bindedInfo){
        //已绑定时的扩展处理

    },
    failure : function(){
        //未绑定时的扩展处理
    }
};

//提交绑定的配置
amsCfg_694367={
    type : "comit",
    needPopupRole:true,//是否弹默认角色框选角色
    roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID:694368,
    service:"wuxia" ,
    success : function(bindedInfo){
        //已绑定时的扩展处理
    },
    failure : function(){
        //未绑定时的扩展处理
    }
};

// <input onclick="amsSubmit(325431,694473)" type="button" value="许愿抽奖[694473]" />
// 抽奖领取主功能初始化
amsCfg_694473 = {
    'iAMSActivityId' : '325431', // AMS活动号
    'activityId' : '363224', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }

        LotteryManager.alert(callbackObj.sMsg);
    }
};


var wishDetail = {
    '0':'希望下个七夕我可以有师娘了。',
    '1':'希望织女给你双灵巧的手，别带我们团灭了。',
    '2':'帮主快拉召会织女，我们要做喜鹊！',
    '3':'扯下二尺红头绳，给你扎起来~',
    '4':'祈愿你找到属于自己的幸福。',
    '5':'你眼里的星光，比今夜的银河更绚烂。',
    '6':'千里鹊桥来相会，赶紧告白会不会。',
    '7':'你是我的小星星，挂在天空放光明。',
    '8':'你怎么还在打本，我在鹊桥等你好久了。',
    '9':'你是金风我是玉露，胜却人间朝暮无数。',
    '10':'鹊桥太短了，我还要跟你走完一辈子！',
    '11':'你还单着吗？来吃点狗粮，别饿着了。',
    '12':'七夕娘有72种手段，你有72种团灭方式。',
    '13':'就算是七夕，也别忘了这周联赛。',
    '14':'别人有别人的花前月下，你有你的风云联赛。',
    '15':'牛郎等织女，风里雨你，我在等你。',
    '16':'七夕没约，金酒进团。',
    '17':'想和你谈星星谈月亮，从琅纹搭配到与子偕老。',
    '18':'想成为你夏夜所捕获的萤火，在你手上发光。',
    '19':'向你学习，横眉冷对秋波，俯首愿作光棍。'
};

//许愿
function makeWish()
{
    //获取许愿的数据
    var FriNickname = encodeURIComponent($("#FriNickname").html());  //好友昵称
    var wishInfo = $("#zfyWrap").html();
    for(var i =0;i<wishDetail.length;i++)
    {
        if(wishDetail[i] == wishInfo)
        {
            var wishID = i;
        }
    }



    amsCfg_694520.sData.FriNickname = FriNickname;
    amsCfg_694520.sData.wishID = wishID;

    checkAMS(694520,0)


}

// <a href="#" onclick="javascript:amsSubmit(325431,694520);">运行流程 许愿 -按钮 [694520]</a>
//许愿 -按钮 [694520]
amsCfg_694520 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694520, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        alert('返回数据为:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};




// <a href="#" onclick="javascript:amsSubmit(325431,694370);">运行流程 初始化 - 查询我的愿望 [694370]</a>
//查询我的愿望 [694370]
amsCfg_694370 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694370, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        if(res.iRet == 0)
        {
  //待确认我的愿望如何展示：
        }

    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};



// <a href="#" onclick="javascript:amsSubmit(325431,694371);">运行流程 初始化-所有愿望 [694371]</a>
//初始化-所有愿望 [694371] checkAMS(694371,0)
amsCfg_694371 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694371, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        // alert('返回数据为:' + res);
        // return;
        if(res.iRet == 0)
        {
            var AllWish = res.jData.result;
            var Allstr = '';
            for(var i = 0;i<AllWish.length;i++)
            {
                str += '<li class="xy-'+i+1+'">' +
                    '<div class="bg xy-wrap">' +
                    '<p class="xy-title-name">'+AllWish.nickname+'<br/>@'+AllWish.frinickname+'</p>' +
                    '<p class="xy-msg-text">AllWish.wishInfo</p>' +
                    '<p class="author-msg-text">'+AllWish.area+'<br/>'+AllWish.time+'</p>' +
                    '</div>' +
                    '</li>'
            }
            $("#wish-container").html(str);
        }



    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};




// <a href="#" onclick="javascript:amsSubmit(325431,694488);">运行流程 搜索所有愿望 -按钮 [694488]</a>
//搜索所有愿望 -按钮 [694488]
amsCfg_694488 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694488, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        alert('返回数据为:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};









//根据亲密度排序
function sort(element){
    for(var i = 0;i<element.length-1;i++) {
        for(var j = 0;j<element.length-i-1;j++){
            if(element[j]>element[j+1]){
                //把大的数字放到后面
                var swap = element[j];
                element[j] = element[j+1];
                element[j+1] = swap;
            }
        }
        console.log(element);
    }
}
// var element = [3,5,1,2,7,8,4,5,3,4];



//输入信息搜索好友
function serFriend(FriendSearchArr,serkey)
{
    var vBingo = '';
    if(FriendSearchArr.length>0)
    {
        for(var i =0;i<FriendSearchArr.length;i++)
        {
            //获取当前i下的字符串并进行处理
            var listr = FriendSearchArr[i].friSer;
            if(listr.search(serkey) >=0)
            {
                //拼接字符串
                vBingo +='<li>'+ FriendSearchArr[i].friname +'</li>';
            }
        }
        
        //在列表中显示数据：
        $("#serFriend").html(vBingo);
    }

}


//数组去重
function newArr(arr){
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                //如果第一个等于第二个，splice方法删除第二个
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}





// <a href="#" onclick="javascript:amsSubmit(325431,694374);">运行流程 好友列表 -按钮 [694374]</a>
var friendListArr = new Array();
var FriendValueArr = new Array(); //亲密度排名
var FriendSearchArr = new Array(); //可搜索数组
var sortFriNameArr = new Array();  //好友昵称
var tTopFriend = [0,0,0]; //前三
var sortFriendArr = [];
var tTopFriendName = []; //前三

//好友列表 -按钮 [694374]
amsCfg_694374 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694374, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        console.log(res.jData);
        if(res.jData.result == '0')
        {
            var friendinfoList = res.jData.friendinfo_list;
            var FriendArr = friendinfoList.split('|');
            if(parseInt(FriendArr[0])>0)
            {
                for(var i=1;i<FriendArr.length-1;i++)
                {
                    friendListArr[i-1] = FriendArr[i].split(' ');  //构建一个新的数组，原始数据转为数组

                    //构建查询好友数据
                    var skey = friendListArr[i-1][2];  //好友昵称
                    var sVal = friendListArr[i-1][0] +"*"+friendListArr[i-1][2]; //QQ+昵称
                    var serObj = new Object();
                    serObj.friname = skey;
                    serObj.friSer = sVal;

                    FriendSearchArr[i-1] = serObj;


                    //一、构建亲密度数组 + 亲密度对应昵称的数组
                    sortFriendArr[i-1] = parseInt(friendListArr[i-1][6]);  //只有亲密度的数组

                    var nkey = friendListArr[i-1][2]; //好友昵称
                    var nval = friendListArr[i-1][6]; //亲密度
                    var friObj = new Object();
                    friObj.friname = nkey;
                    friObj.frivalue = nval;

                    sortFriNameArr[i-1] = friObj;


                }
                //二、找出排名前三的亲密度
                sort(sortFriendArr);
                var len = sortFriendArr.length;
                if(sortFriendArr.length >3)
                {
                    tTopFriend[0] = sortFriendArr[len-1];
                    tTopFriend[1] = sortFriendArr[len-2];
                    tTopFriend[2] = sortFriendArr[len-3];
                }else{
                    tTopFriend = sortFriendArr;
                }


                //三、根据亲密度找好友昵称

                for(var m=0;m<sortFriNameArr.length;m++)
                {
                    for(var n = 0;n<tTopFriend.length;n++)
                    {
                        if(parseInt(sortFriNameArr[m].frivalue) == tTopFriend[n] )
                        {
                            tTopFriendName[m] = sortFriNameArr[m].nkey;
                        }
                    }

                }
                tTopFriendName = newArr(tTopFriendName);//去重之后拼接字符串
                var frNamestr = '';
                for(var k=0;k<tTopFriendName.length;k++)
                {
                    frNamestr += '<li>'+tTopFriendName[k]+'</li>'
                }
                $("#FriensName").html(frNamestr);


            }else{
                console.log('抱歉，该用户没有好友');
            }



        }





    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};


// <a href="#" onclick="javascript:amsSubmit(325431,694425);">运行流程 查询大区的愿望 -按钮 [694425]</a>

//查询大区的愿望 -按钮 [694425]
amsCfg_694425 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694425, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        alert('返回数据为:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};


// <a href="#" onclick="javascript:amsSubmit(325431,694622);">运行流程 许愿进度 [694622]</a>
//提交请求至AME
amsCfg_694622 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 325431, //活动id
    "iFlowId":    694622, //流程id
    "fFlowSubmitEnd": function(res){
        // alert('返回数据为:' + res);
        // return;
        if(res.iRet == 0)
        {
            var total = parseInt(res.sOutValue1);
            if(toatal >= 50000)
            {
                $("#total5").removeClass('grey');
            }
            if(toatal >= 100000)
            {
                $("#total4").removeClass('grey');
            }
            if(toatal >= 200000)
            {
                $("#total3").removeClass('grey');

            }
            if(toatal >= 500000)
            {
                $("#total2").removeClass('grey');

            }
        }
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        alert(res.sMsg);
    }
};









//调用，查询是否已经绑定
milo.ready(function(){
        amsInit(325431, 694368);
    }
);


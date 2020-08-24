var indexPage = {
    baseUrl:"https://ulink.game.qq.com/app/2829/095e22f824ce9d28/index.php",
    iActId:"3363",
    game:"cf",
    userData:null,
    roleData:null,
    shareData:{
        shareTitle:"您的好友邀您查看《我的火线生涯》",
        shareDesc:"穿越火线12周年，《我的火线生涯》点击查看",
        shareLink:"https://cf.qq.com/act/3363/a20200727zh/ketai.html",
        shareImgUrl:"https://game.gtimg.cn/images/ulink/act/3363/a20200727zh/share.jpg",
    },
    secretData:null,
    roleselector:null,
    roleselectorData:null,
    isLogin : 0,
    isApp:1,
    init:function () {
        //验证环境
        if(ulink.getQueryString("gameId") != "10011"){
            indexPage.inApp();
            indexPage.isApp = 0
            return;
        }
        if(ulink.getQueryString("roleId") == ""){
            ulink.alert("请绑定游戏角色后参与")
            return;
        }else{
            //初始化
            indexPage.login();
        }
    },
     inApp:function(){
         if (navigator.userAgent.indexOf('iPhone') >= 0) {
             var argEx = '0';
             var action = 20002;
             var url = encodeURIComponent(`${window.location.protocol}//${window.location.host}/act/3363/a20200727zh/index.html`);
         } else {
             var argEx = '1';
             var action = 20003;
             var url = `http://mwegame.qq.com/act/jumpUrl?acturl=${encodeURIComponent(`${window.location.protocol}//${window.location.host}/act/3363/a20200727zh/index.html`)}`;
         }
         console.log(url);
         var ginfo = {
             argEx: argEx,
             gameId: 10011,
             jumpToUrl: url,
             action : action,
             winWidth: window.innerWidth || document.documentElement.clientWidth,
         }
         console.log(ginfo);
         bannerDL.setIFrame(ginfo,{page:'https://mwegame.qq.com/act/dnf/downloadBanner/index'});
     },
    //登录
    login:function(){
        console.log("login>>>>>")
        // ulink.LoginManager.login();
        ulink.LoginManager.checkLogin(function (userInfo) {
            console.log("登录信息:");
            console.log(userInfo);
            indexPage.userData = userInfo;
            indexPage.req(indexPage.baseUrl,{route:"index/initData"},function (rest) {
                indexPage.isLogin = 1
                indexPage.shareInit();
                console.log("login:req>>>>")
                console.log(rest);
                indexPage.userData.hasRole = rest.jData.hasRole
                indexPage.userData.hasLottery = rest.jData.hasLottery
                //test
                // indexPage.getSecret();
                //获取角色信息
                // indexPage.getRoleData();
            });
        }, function () {
            console.warn("未登录!")
        });
    },
    //测试用 获取选角参数
    getSecret:function(){
        indexPage.req(indexPage.baseUrl,{route: "Index/getSecret"},function (rest) {
            indexPage.secretData = rest.jData
            indexPage.initRole()
            indexPage.showRole()
        })
    },
    ////测试用 初始化选角
    initRole:function(){
        var options = {
            "sAppId": indexPage.secretData.sAppId,  //腾讯优联APPID
            "iActId": indexPage.iActId,   //活动ID
            "sSign": indexPage.secretData.sSign,  //签名
            "game": indexPage.game,  //游戏id
            "timestamp": indexPage.secretData.timestamp, //时间戳
            "sCode": encodeURIComponent(indexPage.secretData.sCode),  //第三方渠道加密串
            "acctype":indexPage.secretData.accType
        }
        indexPage.roleselector = new ulink.RoleSelector(options);
        indexPage.roleselector.on("getRoleData", function (data) {
            console.log("getRoleData->", data);
            indexPage.roleselectorData = data;
        })
    },
    //测试用 显示选角框
    showRole:function(){
        indexPage.roleselector.show();
    },
    //获取角色信息
    getRoleData:function(){
        if(indexPage.isLogin == 0){
            return;
        }
        console.log("getRoleData>>>>>")
        var postData = {};
        //test
        // postData.area = indexPage.roleselectorData.area;
        // postData.uin =indexPage.userData.userUin;

        postData.area = ulink.xssFilter(ulink.getQueryString("serverId"));
        postData.uin = ulink.xssFilter(ulink.getQueryString("uin"));
        if(postData.area == "" ||postData.uin == ''){
            ulink.alert("错误");
            return;
        }
        //获取角色信息
        indexPage.req(indexPage.baseUrl,{route:"index/roleData"},function (rest) {
            console.log("roleData>>>>>>")
            indexPage.roleData = rest.jData
            console.log(indexPage.roleData)
            indexPage.showRoleData()
        },"post",postData);
    },
    showRoleData:function(){
        if(indexPage.isLogin == 0){
            return;
        }
        console.log("showRoleData>>>>>>")
        if(indexPage.roleData == null){
            console.log("indexPage.roleData null>>>>>>")
            indexPage.getRoleData();
        }
        console.log("showRoleData>>>>>>start")
        $(".year-text2").text(indexPage.roleData.zk_reg);
        $("#days").text(indexPage.roleData.zk_days);
        var jx = ["列兵1","列兵2","三等兵","二等兵","一等兵","上等兵1","上等兵2","上等兵3","上等兵4","下士1","下士2","下士3","下士4","下士5","下士6","中士1","中士2","中士3","中士4","中士5","中士6",
            "上士1","上士2","上士3","上士4","上士5","上士6","少尉1","少尉2","少尉3","少尉4","少尉5","少尉6","少尉7","少尉8","中尉1","中尉2","中尉3","中尉4","中尉5","中尉6","中尉7","中尉8","上尉1",
            "上尉2","上尉3","上尉4","上尉5","上尉6","上尉7","上尉8","少校1","少校2","少校3","少校4","少校5","少校6","少校7","少校8","中校1","中校2","中校3","中校4","中校5","中校6","中校7","中校8",
            "上校1","上校2","上校3","上校4","上校5","上校6","上校7","上校8","大校1","大校2","大校3","大校4","大校5","大校6","少将1","少将2","少将3","少将4","少将5","少将6","中将1",
            "中将2","中将3","中将4","中将5","中将6","上将1","上将2","上将3","上将4","上将5","上将6","元帅"
        ];
        $(".jx").text(jx[indexPage.roleData.LEV]);
        $(".zd").text(indexPage.roleData.PLAY_CNT);
        $(".sl").text(indexPage.roleData.WIN_CNT);
        $(".jd").text(indexPage.roleData.ENEMY_KILL_CNT);
        $(".bt").text(indexPage.roleData.HEADSHOT_KILL_CNT)
        $(".js").text(indexPage.roleData.KNIFE_KILL)
        $(".bd").text(indexPage.roleData.DRAW_KILL);


        $(".headImg").attr("src",indexPage.userData.headimgurl)
        var roleName = ulink.xssFilter(ulink.getQueryString("roleName"));
        $(".nickName").text(roleName)
        $(".cc").text(indexPage.roleData.PLAY_CNT+"/"+indexPage.roleData.WIN_CNT);

        // T_WIN 爆破模式胜利次数
        // D_WIN 个人竞技模式胜利次数
        // TD_WIN 团队竞技模式胜利次数
        // H_WIN 幽灵模式胜利次数
        // TMD_WIN 歼灭模式胜利次数
        // ESP_WIN 突围模式胜利次数
        var val = ["爆破模式","个人竞技模","团队竞技模式","幽灵模式","歼灭模式","突围模式"];
        var vv = [indexPage.roleData.T_WIN,indexPage.roleData.D_WIN,indexPage.roleData.TD_WIN,indexPage.roleData.H_WIN,indexPage.roleData.TMD_WIN,indexPage.roleData.ESP_WIN]
        var vvv = vv;
         vv.sort( function(a,b){return a - b})
        var index = vvv.indexOf(vv[5])
        $(".ms").text(val[index]+"是我最拿手的模式");
         var jl = new Date().getFullYear() - indexPage.roleData.zk_reg
        jl = jl == 0 ?1 :jl
        $(".jl").text(jl+"年");
         if(jl > 5 && jl <8){
            var ch = "铁血老兵"
         }else if(jl >9){
             var ch = "火线名宿"
         }else{
             var ch = "火线新贵"
         }
        $(".ch").text(ch);

         var msl = vv[index];
        $(".msl").text(msl);
        var ssl = indexPage.roleData.WIN_CNT == 0 ? 0 : parseInt((msl/indexPage.roleData.WIN_CNT)*10000)/100
        $("#sll").text(ssl)
        console.log("showRoleData>>>>>>end")
    },
    //获取头像框
    headLottery:function(){
        if(indexPage.isLogin == 0){
            return;
        }
        console.log("headLottery>>>>>")
        var postData = {};
        postData.userId = ulink.xssFilter(ulink.getQueryString("userId"));
        indexPage.req(indexPage.baseUrl,{route:"index/headLottery"},function (rest) {
            console.log(rest);
            // ulink.alert(rest.sMsg)
        },"post",postData);
    },
    //获取evo奖励
    evoLottery:function(){
        if(indexPage.isLogin == 0){
            return;
        }
        console.log("evoLottery>>>>>")
        var postData = {};
        postData.area = ulink.xssFilter(ulink.getQueryString("serverId"));
        postData.roleId = ulink.xssFilter(ulink.getQueryString("roleId"));

        //test
        // postData.area = indexPage.roleselectorData.area;
        // postData.roleId = indexPage.roleselectorData.roleId;

        indexPage.req(indexPage.baseUrl,{route:"index/evoLottery"},function (rest) {
            console.log(rest);
        },"post",postData);
    },
    //分享初始化
    shareInit:function(){
        roleName = ulink.xssFilter(ulink.getQueryString("roleName"));
        headImgs = ulink.xssFilter(ulink.getQueryString("headImg"));
        indexPage.shareData.shareLink = indexPage.shareData.shareLink+"?uin="+ulink.xssFilter(ulink.getQueryString("uin"))+"&serverId="+ulink.xssFilter(ulink.getQueryString("serverId"))+"&nickName="+roleName+"&headImg="+encodeURIComponent(indexPage.userData.headimgurl)
        $('.btn-share').click(function() {
            if (typeof (GameHelper) != 'undefined') {
                console.log("share>>>>0")
                GameHelper.shareWebPageWithFuntion(indexPage.shareData.shareTitle, indexPage.shareData.shareDesc, indexPage.shareData.shareImgUrl, indexPage.shareData.shareLink, '1,2,3,4,5', 1)
                // GameHelper.shareWebPageWithFuntion(title, desc, icon, url, '1,2,3,4,5', 1)
                setTimeout(function () {
                    indexPage.evoLottery();
                },5000)
            } else {
                console.log("share>>>>1")
                indexPage.zhtc();
                setTimeout(function () {
                    indexPage.evoLottery();
                },5000)
            }
        });
    },
    zhtc: function () {
        var comment_info = indexPage.shareData.shareDesc;
        var share_url = indexPage.shareData.shareLink;
        var title = indexPage.shareData.shareTitle;
        var summary = indexPage.shareData.shareDesc;
        var icon = indexPage.shareData.shareImgUrl;
        var collect_state = 1;

        //掌上cf分享ios需要的函数
        var sendIosMessage = function (src) {
            console.log("sendIosMessage>>>>>");
            var oIFrame = document.getElementById("__MessageIframe__");
            if (!oIFrame) {
                oIFrame = document.createElement("iframe");
                oIFrame.id = "__MessageIframe__";
                oIFrame.frameborder = "0";
                oIFrame.scrolling = "no";
                oIFrame.width = "0px";
                oIFrame.height = "0px";
                oIFrame.frameBorder = "0";
                oIFrame.style.display = "none"
                oIFrame.src = src;
                document.body.appendChild(oIFrame);
            } else {
                oIFrame.src = src;
            }
        }

        //掌上cf分享安卓需要的函数
        var sendAndroidMessage = function (src) {
            console.log("sendAndroidMessage>>>>>");
            window.location.href = src;
        }

        var data = {
            "title": encodeURIComponent(title),
            "summary": encodeURIComponent(summary),
            "icon": encodeURIComponent(icon),
            "is_act": encodeURIComponent("1"),
            "url": encodeURIComponent(share_url),
            "collect_state": encodeURIComponent(collect_state)
            //"shareopen" : encodeURIComponent("1")
        };
        var src = "requestapp://sharenew?param=" + encodeURIComponent(JSON.stringify(data));
        if (new RegExp('cfapp').test(navigator.userAgent)) {
            if (new RegExp('Android').test(navigator.userAgent)) {
                sendAndroidMessage(src);
            } else {
                sendIosMessage(src);
            }
        }

    },
    //网络请求
    req:function (url, params, callback, method = "get", formdata = {}) {
        params.game = indexPage.game;
        params.iActId = indexPage.iActId;
        var option = {
            url: url,
            params: params,
            success: function (rest) {
                if (rest.iRet != 0) {
                    ulink.alert(rest.sMsg);
                    return;
                } else {
                    if (typeof(callback) == 'function') {
                        callback(rest);
                    }
                }
            },
            error: function () {
                console.error("http error!!!!!!!!!!!!!!")
            }
        }
        if (method == "post") {
            option.formdata = formdata
        }
        ulink.http[method](option);
    },
    test:function () {
        indexPage.baseUrl="https://zh.game.qq.com/index.php";
    }
}
// indexPage.test();
indexPage.init();
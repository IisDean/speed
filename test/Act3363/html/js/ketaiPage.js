KetaiPage  = function () {
    this.baseUrl="https://ulink.game.qq.com/app/2829/095e22f824ce9d28/index.php";
    this.iActId = "3363";
    this.game = "cf";
    this.opensharelink = function(){
        console.log("opensharelink>>>>>>>>");
        DBFrame.gameHelperAppBanner.open();
    },
    this.openApp = function () {
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
    this.login = function(){
        this.openApp();
        console.log("login>>>>>")
        ulink.LoginManager.checkLogin(function (userInfo) {
            console.log("登录信息:");
            console.log(userInfo);
            ketai.getRoleData();
        }, function () {
            console.warn("未登录!")
            ulink.LoginManager.loginByPT();
        });
    },
    this.getRoleData = function () {
        console.log("getRoleData>>>>>")
        var postData = {};
        postData.area = ulink.xssFilter(ulink.getQueryString("serverId"));
        postData.uin = ulink.xssFilter(ulink.getQueryString("uin"));
        var headImg = decodeURIComponent(ulink.xssFilter(ulink.getQueryString("headImg")));
        var nickName = ulink.xssFilter(ulink.getQueryString("nickName"));
        $(".headImg").attr("src",headImg)
        $(".nickName").text(nickName)
        if(postData.area == "" ||postData.uin == ''){
            ulink.alert("错误");
            return;
        }
        //获取角色信息
        this.req(this.baseUrl,{route:"index/roleData"},function (rest) {
            var roleData = rest.jData

            $(".year-text2").text(roleData.zk_reg);
            $("#days").text(roleData.zk_days);
            var jx = ["列兵1","列兵2","三等兵","二等兵","一等兵","上等兵1","上等兵2","上等兵3","上等兵4","下士1","下士2","下士3","下士4","下士5","下士6","中士1","中士2","中士3","中士4","中士5","中士6",
                "上士1","上士2","上士3","上士4","上士5","上士6","少尉1","少尉2","少尉3","少尉4","少尉5","少尉6","少尉7","少尉8","中尉1","中尉2","中尉3","中尉4","中尉5","中尉6","中尉7","中尉8","上尉1",
                "上尉2","上尉3","上尉4","上尉5","上尉6","上尉7","上尉8","少校1","少校2","少校3","少校4","少校5","少校6","少校7","少校8","中校1","中校2","中校3","中校4","中校5","中校6","中校7","中校8",
                "上校1","上校2","上校3","上校4","上校5","上校6","上校7","上校8","大校1","大校2","大校3","大校4","大校5","大校6","少将1","少将2","少将3","少将4","少将5","少将6","中将1",
                "中将2","中将3","中将4","中将5","中将6","上将1","上将2","上将3","上将4","上将5","上将6","元帅"
            ];
            $(".jx").text(jx[roleData.LEV]);
            $(".zd").text(roleData.PLAY_CNT);
            $(".sl").text(roleData.WIN_CNT);
            $(".jd").text(roleData.ENEMY_KILL_CNT);
            $(".bt").text(roleData.HEADSHOT_KILL_CNT)
            $(".js").text(roleData.KNIFE_KILL)
            $(".bd").text(roleData.DRAW_KILL);
            $("#sll").text(roleData.zk_sll)
            $(".cc").text(roleData.PLAY_CNT+"/"+roleData.WIN_CNT);

            // T_WIN 爆破模式胜利次数
            // D_WIN 个人竞技模式胜利次数
            // TD_WIN 团队竞技模式胜利次数
            // H_WIN 幽灵模式胜利次数
            // TMD_WIN 歼灭模式胜利次数
            // ESP_WIN 突围模式胜利次数

            var val = ["爆破模式","个人竞技模","团队竞技模式","幽灵模式","歼灭模式","突围模式"];
            var vv = [roleData.T_WIN,roleData.D_WIN,roleData.TD_WIN,roleData.H_WIN,roleData.TMD_WIN,roleData.ESP_WIN]
            var vvv = vv;
            vv.sort( function(a,b){return a - b})
            var index = vvv.indexOf(vv[5])
            $(".ms").text(val[index]+"是我最喜爱的模式");
            var jl = new Date().getFullYear() - roleData.zk_reg
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

        },"post",postData);
    } ,
    this.req = function (url, params, callback, method = "get", formdata = {}) {
        params.game = this.game;
        params.iActId = this.iActId;
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
    }
}
ketai  = new KetaiPage();
// ketai.baseUrl = "https://zh.game.qq.com/index.php";
ketai.login();
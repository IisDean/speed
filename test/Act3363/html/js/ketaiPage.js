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
    //��¼
    this.login = function(){
        this.openApp();
        console.log("login>>>>>")
        ulink.LoginManager.checkLogin(function (userInfo) {
            console.log("��¼��Ϣ:");
            console.log(userInfo);
            ketai.getRoleData();
        }, function () {
            console.warn("δ��¼!")
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
            ulink.alert("����");
            return;
        }
        //��ȡ��ɫ��Ϣ
        this.req(this.baseUrl,{route:"index/roleData"},function (rest) {
            var roleData = rest.jData

            $(".year-text2").text(roleData.zk_reg);
            $("#days").text(roleData.zk_days);
            var jx = ["�б�1","�б�2","���ȱ�","���ȱ�","һ�ȱ�","�ϵȱ�1","�ϵȱ�2","�ϵȱ�3","�ϵȱ�4","��ʿ1","��ʿ2","��ʿ3","��ʿ4","��ʿ5","��ʿ6","��ʿ1","��ʿ2","��ʿ3","��ʿ4","��ʿ5","��ʿ6",
                "��ʿ1","��ʿ2","��ʿ3","��ʿ4","��ʿ5","��ʿ6","��ξ1","��ξ2","��ξ3","��ξ4","��ξ5","��ξ6","��ξ7","��ξ8","��ξ1","��ξ2","��ξ3","��ξ4","��ξ5","��ξ6","��ξ7","��ξ8","��ξ1",
                "��ξ2","��ξ3","��ξ4","��ξ5","��ξ6","��ξ7","��ξ8","��У1","��У2","��У3","��У4","��У5","��У6","��У7","��У8","��У1","��У2","��У3","��У4","��У5","��У6","��У7","��У8",
                "��У1","��У2","��У3","��У4","��У5","��У6","��У7","��У8","��У1","��У2","��У3","��У4","��У5","��У6","�ٽ�1","�ٽ�2","�ٽ�3","�ٽ�4","�ٽ�5","�ٽ�6","�н�1",
                "�н�2","�н�3","�н�4","�н�5","�н�6","�Ͻ�1","�Ͻ�2","�Ͻ�3","�Ͻ�4","�Ͻ�5","�Ͻ�6","Ԫ˧"
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

            // T_WIN ����ģʽʤ������
            // D_WIN ���˾���ģʽʤ������
            // TD_WIN �ŶӾ���ģʽʤ������
            // H_WIN ����ģʽʤ������
            // TMD_WIN ����ģʽʤ������
            // ESP_WIN ͻΧģʽʤ������

            var val = ["����ģʽ","���˾���ģ","�ŶӾ���ģʽ","����ģʽ","����ģʽ","ͻΧģʽ"];
            var vv = [roleData.T_WIN,roleData.D_WIN,roleData.TD_WIN,roleData.H_WIN,roleData.TMD_WIN,roleData.ESP_WIN]
            var vvv = vv;
            vv.sort( function(a,b){return a - b})
            var index = vvv.indexOf(vv[5])
            $(".ms").text(val[index]+"������ϲ����ģʽ");
            var jl = new Date().getFullYear() - roleData.zk_reg
            jl = jl == 0 ?1 :jl
            $(".jl").text(jl+"��");
            if(jl > 5 && jl <8){
                var ch = "��Ѫ�ϱ�"
            }else if(jl >9){
                var ch = "��������"
            }else{
                var ch = "�����¹�"
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
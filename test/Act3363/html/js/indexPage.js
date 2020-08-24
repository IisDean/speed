var indexPage = {
    baseUrl:"https://ulink.game.qq.com/app/2829/095e22f824ce9d28/index.php",
    iActId:"3363",
    game:"cf",
    userData:null,
    roleData:null,
    shareData:{
        shareTitle:"���ĺ��������鿴���ҵĻ������ġ�",
        shareDesc:"��Խ����12���꣬���ҵĻ������ġ�����鿴",
        shareLink:"https://cf.qq.com/act/3363/a20200727zh/ketai.html",
        shareImgUrl:"https://game.gtimg.cn/images/ulink/act/3363/a20200727zh/share.jpg",
    },
    secretData:null,
    roleselector:null,
    roleselectorData:null,
    isLogin : 0,
    isApp:1,
    init:function () {
        //��֤����
        if(ulink.getQueryString("gameId") != "10011"){
            indexPage.inApp();
            indexPage.isApp = 0
            return;
        }
        if(ulink.getQueryString("roleId") == ""){
            ulink.alert("�����Ϸ��ɫ�����")
            return;
        }else{
            //��ʼ��
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
    //��¼
    login:function(){
        console.log("login>>>>>")
        // ulink.LoginManager.login();
        ulink.LoginManager.checkLogin(function (userInfo) {
            console.log("��¼��Ϣ:");
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
                //��ȡ��ɫ��Ϣ
                // indexPage.getRoleData();
            });
        }, function () {
            console.warn("δ��¼!")
        });
    },
    //������ ��ȡѡ�ǲ���
    getSecret:function(){
        indexPage.req(indexPage.baseUrl,{route: "Index/getSecret"},function (rest) {
            indexPage.secretData = rest.jData
            indexPage.initRole()
            indexPage.showRole()
        })
    },
    ////������ ��ʼ��ѡ��
    initRole:function(){
        var options = {
            "sAppId": indexPage.secretData.sAppId,  //��Ѷ����APPID
            "iActId": indexPage.iActId,   //�ID
            "sSign": indexPage.secretData.sSign,  //ǩ��
            "game": indexPage.game,  //��Ϸid
            "timestamp": indexPage.secretData.timestamp, //ʱ���
            "sCode": encodeURIComponent(indexPage.secretData.sCode),  //�������������ܴ�
            "acctype":indexPage.secretData.accType
        }
        indexPage.roleselector = new ulink.RoleSelector(options);
        indexPage.roleselector.on("getRoleData", function (data) {
            console.log("getRoleData->", data);
            indexPage.roleselectorData = data;
        })
    },
    //������ ��ʾѡ�ǿ�
    showRole:function(){
        indexPage.roleselector.show();
    },
    //��ȡ��ɫ��Ϣ
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
            ulink.alert("����");
            return;
        }
        //��ȡ��ɫ��Ϣ
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
        var jx = ["�б�1","�б�2","���ȱ�","���ȱ�","һ�ȱ�","�ϵȱ�1","�ϵȱ�2","�ϵȱ�3","�ϵȱ�4","��ʿ1","��ʿ2","��ʿ3","��ʿ4","��ʿ5","��ʿ6","��ʿ1","��ʿ2","��ʿ3","��ʿ4","��ʿ5","��ʿ6",
            "��ʿ1","��ʿ2","��ʿ3","��ʿ4","��ʿ5","��ʿ6","��ξ1","��ξ2","��ξ3","��ξ4","��ξ5","��ξ6","��ξ7","��ξ8","��ξ1","��ξ2","��ξ3","��ξ4","��ξ5","��ξ6","��ξ7","��ξ8","��ξ1",
            "��ξ2","��ξ3","��ξ4","��ξ5","��ξ6","��ξ7","��ξ8","��У1","��У2","��У3","��У4","��У5","��У6","��У7","��У8","��У1","��У2","��У3","��У4","��У5","��У6","��У7","��У8",
            "��У1","��У2","��У3","��У4","��У5","��У6","��У7","��У8","��У1","��У2","��У3","��У4","��У5","��У6","�ٽ�1","�ٽ�2","�ٽ�3","�ٽ�4","�ٽ�5","�ٽ�6","�н�1",
            "�н�2","�н�3","�н�4","�н�5","�н�6","�Ͻ�1","�Ͻ�2","�Ͻ�3","�Ͻ�4","�Ͻ�5","�Ͻ�6","Ԫ˧"
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

        // T_WIN ����ģʽʤ������
        // D_WIN ���˾���ģʽʤ������
        // TD_WIN �ŶӾ���ģʽʤ������
        // H_WIN ����ģʽʤ������
        // TMD_WIN ����ģʽʤ������
        // ESP_WIN ͻΧģʽʤ������
        var val = ["����ģʽ","���˾���ģ","�ŶӾ���ģʽ","����ģʽ","����ģʽ","ͻΧģʽ"];
        var vv = [indexPage.roleData.T_WIN,indexPage.roleData.D_WIN,indexPage.roleData.TD_WIN,indexPage.roleData.H_WIN,indexPage.roleData.TMD_WIN,indexPage.roleData.ESP_WIN]
        var vvv = vv;
         vv.sort( function(a,b){return a - b})
        var index = vvv.indexOf(vv[5])
        $(".ms").text(val[index]+"���������ֵ�ģʽ");
         var jl = new Date().getFullYear() - indexPage.roleData.zk_reg
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

         var msl = vv[index];
        $(".msl").text(msl);
        var ssl = indexPage.roleData.WIN_CNT == 0 ? 0 : parseInt((msl/indexPage.roleData.WIN_CNT)*10000)/100
        $("#sll").text(ssl)
        console.log("showRoleData>>>>>>end")
    },
    //��ȡͷ���
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
    //��ȡevo����
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
    //�����ʼ��
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

        //����cf����ios��Ҫ�ĺ���
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

        //����cf����׿��Ҫ�ĺ���
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
    //��������
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
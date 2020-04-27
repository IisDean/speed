//判断横屏竖屏
var orientLayer = document.getElementById("orientLayer");

function checkDirect() {
    if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
        return "portrait";
    } else {
        return "landscape";
    }
}
//显示屏幕方向提示浮层
function orientNotice() {
    var orient = checkDirect();
    if (orient == "portrait") {
        orientLayer.style.display = "none";
    } else {
        orientLayer.style.display = "block";
    }
}
//登录
milo.ready(function () {
    need("biz.login", function (LoginManager) {
        //QQ登录
        milo.addEvent(g('btn_qqlogin'), 'click', function (e) {
            LoginManager.login();
        });
        LoginManager.checkLogin(function () {
            g("login_qq_span").innerHTML = LoginManager.getUserUin(); //????QQ??
        });
        //注销
        milo.addEvent(g("btn_logout"), "click", function () {
            LoginManager.logout();
        });
    });
});
//弹窗
function TGDialogS(e) {
    // 利用milo库引入dialog组件
    need("biz.dialog", function (Dialog) {
        Dialog.show({
            id: e,
            bgcolor: '#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity: 50 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog() {
    // 利用milo库引入dialog组件
    need("biz.dialog", function (Dialog) {
        Dialog.hide();
    });
}
//分享
TGMobileShare({
    shareTitle: 'NBA电竞战役赛', //不设置或设置为空时，页面有title，则调取title
    shareDesc: '换个赛场，再战一场', //不设置或设置为空时，页面有Description，则调取Description
    shareImgUrl: './ossweb-img/share.jpg', //分享图片尺寸200*200，且填写绝对路径
    shareLink: '', //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
    actName: 'a20200409djzys' //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
});
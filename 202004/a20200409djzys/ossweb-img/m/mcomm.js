//登录
/*milo.ready(function () {
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
});*/
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
    shareTitle: '换个赛场 再战一场！', //不设置或设置为空时，页面有title，则调取title
    shareDesc: 'NBA电竞战“疫”赛，多重奖励等你来拿！', //不设置或设置为空时，页面有Description，则调取Description
    shareImgUrl: 'https://game.gtimg.cn/images/nba2kx/cp/a20200409djzys/share.jpg', //分享图片尺寸200*200，且填写绝对路径
    shareLink: '', //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
    actName: 'a20200416djzys' //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
});
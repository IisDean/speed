//�жϺ�������
var orientLayer = document.getElementById("orientLayer");

function checkDirect() {
    if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
        return "portrait";
    } else {
        return "landscape";
    }
}
//��ʾ��Ļ������ʾ����
function orientNotice() {
    var orient = checkDirect();
    if (orient == "portrait") {
        orientLayer.style.display = "none";
    } else {
        orientLayer.style.display = "block";
    }
}
//��¼
milo.ready(function () {
    need("biz.login", function (LoginManager) {
        //QQ��¼
        milo.addEvent(g('btn_qqlogin'), 'click', function (e) {
            LoginManager.login();
        });
        LoginManager.checkLogin(function () {
            g("login_qq_span").innerHTML = LoginManager.getUserUin(); //????QQ??
        });
        //ע��
        milo.addEvent(g("btn_logout"), "click", function () {
            LoginManager.logout();
        });
    });
});
//����
function TGDialogS(e) {
    // ����milo������dialog���
    need("biz.dialog", function (Dialog) {
        Dialog.show({
            id: e,
            bgcolor: '#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
            opacity: 50 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
        });
    });
}
function closeDialog() {
    // ����milo������dialog���
    need("biz.dialog", function (Dialog) {
        Dialog.hide();
    });
}
//����
TGMobileShare({
    shareTitle: 'NBA�羺ս����', //�����û�����Ϊ��ʱ��ҳ����title�����ȡtitle
    shareDesc: '������������սһ��', //�����û�����Ϊ��ʱ��ҳ����Description�����ȡDescription
    shareImgUrl: './ossweb-img/share.jpg', //����ͼƬ�ߴ�200*200������д����·��
    shareLink: '', //��������Ҫ����ǰҳ��ͬ����(��Q���������Ҫ��) ,�����û�����Ϊ��ʱ��Ĭ�ϵ�ȡ��ǰURL
    actName: 'a20200409djzys' //���������������ͳ�Ʒ�������ר��һ�����Ŀ¼������a20151029demo
});
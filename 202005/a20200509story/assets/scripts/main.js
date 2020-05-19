var isMaster = false;
var g = {
    dateOpen: '2020/4/24 00:00:00',
    domain: isMaster ? '//ws.xoyo.com' : '//test-ws.xoyo.com',
    apis: {
        get_award_info: '/webgw/dynamic/query-by-code',  //������Ʒ
    },
    ajax: function (o, callback) {
        var t = {
            method: o.method || 'get',
            url: g.domain + o.url,
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded',
        };
        console.log(t)
        $.ajax({
            type: t.method,
            url: t.url,
            data: t.data,
            dataType: t.dataType,
            contentType: t.contentType,
            xhrFields: {withCredentials: true},  //������ҪЯ��cookie����Ҫ����
            success: function (data) {
                console.log(data)
                if (callback) {
                    callback(data);
                }
            },
            error: function (xhr, type) {
                if (callback) {
                    callback({
                        code: -505,
                        msg: 'ϵͳ�������Ժ����ԣ�',
                        message: 'ϵͳ�������Ժ����ԣ�',
                        data: {
                            phone: ''
                        }
                    });
                }
            }
        });
    },
    getData: {
        get_award: function (callback) {
            var options = {
                url: '/core/jhdaily/cms_query',
                data: {
                    uri: g.apis.get_award_info,
                    params: JSON.stringify({
                        catCode: "Web_Doujin_Match_2020_Novel_Current_Articles",
                        sort: "publish_time_desc",
                        size: 8,
                        cursor: 0
                    })
                }
            }
            g.ajax(options, callback);
        },
        // ΢������&qq�ռ����
        getShareArgs: function(type){
            switch (type) {
                case 'QQ':
                  var component = '';
                  component += 'url=' + (encodeURIComponent('https://jx3.xoyo.com/zt/2019/05/27/tongren-novel/detail.html?id=') + '123');
                  component += '&title=' + encodeURIComponent('�������¼��Ž񣬡�����3��ʮһ����ͬ�˼��껪���´�����ʽ����');
                  component += '&desc=' + encodeURIComponent('�������¼��Ž񣬡�����3��ʮһ����ͬ�˼��껪���´�����ʽ������������λ�������룡ʮһ����ͬ�˼��껪������Ч�Ҽ��������ֽ�ͨ����ȫ�׹ٷ�С˵�Ƚ����������ã�');
                  component += '&summary=';
                  component += '&site=';
                  component += '&pics=http://jx3.xoyo.com/zt/2019/05/27/tongren-novel-share-pc.jpg';
                  return component;
        
                case 'WEIBO':
                  var _component = '';
                  _component += 'url=' + (encodeURIComponent('https://jx3.xoyo.com/zt/2019/05/27/tongren-novel/detail.html?id=') + '123');
                  _component += '&title=' + encodeURIComponent('#����3ʮһ����##����3�������´���#�������¼��Ž񣬡�����3��ʮһ����ͬ�˼��껪���´�����ʽ������������λ�������룡ʮһ����ͬ�˼��껪������Ч�Ҽ��������ֽ�ͨ����ȫ�׹ٷ�С˵�Ƚ����������ã�');
                  _component += '&appkey=';
                  _component += '&pic=http://jx3.xoyo.com/zt/2019/05/27/tongren-novel-share-pc.jpg';
                  _component += '&searchPic=true#_loginLayer_1556245391157';
                  return _component;
        
              }
        }
    },
    handlers: {
        
    },
    init: function () {
        // ΢������&qq�ռ����
        $('.J_shareQqLink').attr('href', 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + getShareArgs('QQ'));
        $('.J_shareWeiboLink').attr('href', 'http://service.weibo.com/share/share.php?' + getShareArgs('WEIBO'));
    }
};
g.getData.init();

$(function(){
    $(window).on('scroll', function () {
        if (window.scrollY >= 400) {
            $('.menu-right').fadeIn(500);
        } else {
            $('.menu-right').fadeOut(500);
        }
    });

    //ͳ�Ƶ㰸��
    $(document).on('click', '.ClickTrackWithWorkName', function () {
        var trackName = $(this).attr('data-tongji-name');
        var trackDesc = $(this).attr('data-tongji-desc');
        var workName = $(this).attr('data-work-name');
        window.stReportWithName(trackName, trackDesc, workName);
    });
});

// (function () {
//     XPASS.isLogin(function () {
//         $('.J_head-menuloginSuccess').show();
//     }, function () {
//         if (webLink.lastIndexOf('join') > -1 || webLink.lastIndexOf('my-work') > -1 || webLink.lastIndexOf('tougao') > -1 || webLink.lastIndexOf('report') > -1) {
//             //�������Ҫ�μ�ҳ�� �򵯳���¼����
//             XPASS.signin();
//         }
//     });
// })();
var isMaster = false;
var g = {
    dateOpen: '2020/4/24 00:00:00',
    // domain: isMaster ? '//wiki.xsjcs.cn' : '//test-wiki.xsjcs.cn',
    domain: isMaster ? '//ws.xoyo.com' : '//test-ws.xoyo.com',
    apis: {
        get_explain_list: '/jx3/submitpic200518/get_list',  //作品列表
        get_explain_detail: '/jx3/submitpic200518/get_detail_by_id',//作品详情
        get_link: '/jx3/submitpic200518/like',//点赞
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
            xhrFields: {withCredentials: true},  //跨域需要携带cookie是需要设置
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
                        msg: '系统错误，请稍后再试！',
                        message: '系统错误，请稍后再试！',
                        data: {
                            phone: ''
                        }
                    });
                }
            }
        });
    },
    getData: {
        get_explain_list: function(callback) {
            var options = {
                url: g.apis.get_explain_list,
                type: 'get',
                data: {
                    page_num: 0,
                    page_size: 6,
                    room_type: 0
                },
                // data: JSON.stringify({
                //     page_num: 0,
                //     page_size: 6,
                //     room_type: 0
                // })
            }
            g.ajax(options, callback);
        },
        get_default: function (callback) {
            var options = {
                url: g.apis.get_award_info.get_explain_list,
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
    },
    handlers: {
        
    },
    init: function () {
        g.getData.get_explain_list();
    }
};


$(function(){
    $(window).on('scroll', function () {
        if (window.scrollY >= 400) {
            $('.menu-right').fadeIn(500);
        } else {
            $('.menu-right').fadeOut(500);
        }
    });

    //统计点案例
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
//             //如果是我要参加页面 则弹出登录窗口
//             XPASS.signin();
//         }
//     });
// })();
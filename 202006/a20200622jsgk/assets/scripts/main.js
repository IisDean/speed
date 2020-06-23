var isMaster = true;
var g = {
    dateOpen: '2020/4/24 00:00:00',
    passportApi: isMaster ? '//pf-api.xoyo.com/' : '//my-api-dev.xoyo.com/',
    domain: isMaster ? '//ws.xoyo.com' : '//test-ws.xoyo.com',
    isApp: window.THIRD_PARTY_AUTH && window.THIRD_PARTY_AUTH.ua === 'daily' ? true : false,// 判断是否处于推栏app的环境
    apis: {
        get_explain_list: '/jx3/submitpic200518/get_list',  //作品列表
        get_explain_detail: '/jx3/submitpic200518/get_detail_by_id',//作品详情
        get_explain_like: '/jx3/submitpic200518/like',//点赞
    },
    ajax: function (o, callback) {
        var t = {
            method: o.method || 'get',
            url: g.domain + o.url,
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded',
        };
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
    methods: {
        // 下一页准备
        nextPageRead: function(idx){
            var that = this;
            if(idx && idx < 7){
                setTimeout(function(){
                    ctrlJs.data.pageIdx = idx;
                    $(".part-" + idx).addClass("part-show").show();
                }, 100);
            }
        },
        //回到上一页
        prevPage: function(){
            var idx = ctrlJs.data.pageIdx;
            ctrlJs.data.pageIdx--;
            $(".part-" + idx).removeClass("part-show").css("display", "none");
        },
    },
    getData: {
        /**
         * 获取作品列表
         * page_num = 当前页
         * page_size = 当前页数据条数
         * room_type = 房间类型 0全部 1积木 2家园5级 3家园10级 4无等级限制
         * */
        get_explain_list: function (page_num, page_size, room_type, is_random, callback) {
            var options = {
                url: g.apis.get_explain_list,
                type: 'get',
                data: {
                    page_num: page_num,
                    page_size: page_size,
                    room_type: room_type,
                    is_random: is_random || 0
                },
            }
            g.ajax(options, function (data) {
                if (data.status == 1) {
                    g.handlers.set_explain_list(data, callback);
                } else {
                    alert(data.message);
                    // if(callback)callback();
                }
            });
        },
        /**
         * 获取作品详情
         * id = 作品id
         * */
        get_explain_detail: function (explain_id, callback) {
            var options = {
                url: g.apis.get_explain_detail,
                type: 'get',
                data: {
                    id: explain_id,
                },
            }
            g.ajax(options, function (data) {
                if (data.status == 1) {
                    g.handlers.set_explain_detail(data, callback);
                } else {
                    alert(data.message);
                }
            });
        },
        /**
         * 点赞
         * id = 作品id
         * */
        get_explain_like: function (explain_id, callback) {
            var options = {
                url: g.apis.get_explain_like,
                type: 'get',
                data: {
                    id: explain_id,
                },
            }
            g.ajax(options, function (data) {
                if (callback) callback(data);
            });
        },
        /**
         * 时间戳转日期格式
         * */
        formatTime: function (timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes() + ':';
            s = date.getSeconds();
            return Y + M + D + h + m + s;
        }
    },
    handlers: {
        //渲染作品列表
        set_explain_list: function (data, callback) {
            var str = '';
            console.log(data.data.total);
            var data = data.data.list;
            var link = $.tools.getUrl + window.location.pathname.replace('index.html', '');
            link = link.replace('detail.html', '');
            console.log(link);
            for (var i = 0; i < data.length; i++) {
                var val = data[i];
                var postImgLink = '', postImgType = 0, imgs = val.upload_file_info.image;
                console.log(imgs)
                //[0].file_link
                for (var j = 0; j < imgs.length; j++) {
                    if (imgs[j].type == 2) {
                        postImgLink = imgs[j].file_link + '?imageView2/2/w/360';
                        postImgType = 2;
                        break;
                    }
                }

                avatar = val.avatar ? val.avatar : 'assets/images/moren3@2x.png'
                str += '<li class="bg fx-item" data-id="' + val.id + '">' +
                    '<a href="' + link + 'detail.html' + '?explainId=' + val.id + '">' +
                    '<div class="full-img fx-cover">' +
                    '<img src="' + postImgLink + '" alt="房型" data-type="' + postImgType + '">' +
                    '</div>' +
                    '<p class="fx-title-text t-hide">' + val.title + '</p>' +
                    '</a>' +
                    '<div class="flex author-wrap">' +
                    '<div class="bg avatar-wrap flex flex-center flex-middle">' +
                    '<div class="full-img avatar-content">' +
                    '<img src="' + avatar + '" alt="头像">' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-1 t-hide">' +
                    '<p class="author-name-text t-hide">' + val.nick_name + '</p>' +
                    '<div class="flex live-wrap active J-like-btn" data-id="' + val.id + '">' +
                    '<i class="icons heart-icon "></i>' +
                    '<p class="like-text"><span>' + val.like + '</span>想要</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }

            console.log(callback)
            if (callback) callback(str, data.length);
        },
        // 渲染作品详情
        set_explain_detail: function (data, callback) {
            var val = data.data.detail;
            console.log(val);
            $(".J-explain-title").text(val.title);//更新作品标题

            var avatar = val.avatar ? val.avatar : 'assets/images/moren3@2x.png'
            $(".J-avatar img").attr('src', avatar);//更新头像
            $(".author-name-text").text(val.nick_name);//更新用户名
            if (val.person_num) $(".tl-id-text span").text(val.person_num);//更新推栏id
            var imgListStr = "";
            for (var i = 0; i < val.upload_file_info.image.length; i++) {
                imgListStr += '<div class="full-img swiper-slide">' +
                    '<img src="' + val.upload_file_info.image[i].file_link + '?imageView2/2/w/1280" alt="详情图" data-type="' + val.upload_file_info.image[i]['type'] + '" />' +
                    '</div>';
                //更新长图前3张详情图
                if (i < 3) {
                    $(".poster-container .explain-list li").eq(i).find("img").attr('src', val.upload_file_info.image[i].file_link + "?imageView2/2/w/1280").attr('data-type', 1);
                }
            }
            $(".swiper-banner .swiper-wrapper").html(imgListStr);//作品图列表
            var fxStr = '<li class="fx-explain-item flex">房屋类型：' + g.room_type[val.room_type] + '</li>' +
                '<li class="fx-explain-item flex">房屋面积：' + val.room_area + '㎡</li>' +
                '<li class="fx-explain-item flex"><div>房屋地址：</div><div class="flex-1">' + val.room_server_name + ' ' + val.room_zone_name + ' <br/> ' + val.room_community + ' ' + val.room_line + val.room_number + '号</div></li>';
            $(".fx-explain-list").html(fxStr);//更新房屋信息
            var addTime = g.getData.formatTime(val.created);
            $(".J-explain-time").text(addTime);//更新作品发布时间
            $(".live-wrap2").attr('data-id', val.id).find('.like-text2 span').text(val.like);//更新点赞数量
            if (val.is_like == 1) $(".live-wrap2").addClass('active');
            if (callback) callback();
        },
        //一进入页面就判断用户是否登录 如果登录就执行此方法 并返回用户名
        cbLoginModelSuccess: function ($loginOkuser) {
            console.log('已登录')
            g.loginInfo = $loginOkuser;
            $.lay.close('#popLogin');
            setTimeout(function () {
                $.lay.msg('登录成功！', {time: 800});
            }, 500);
        },
        //点击登录并登录成功就执行此方法 并返回用户名
        cbLoginSuccess: function ($loginOkuser) {
            g.loginInfo = $loginOkuser;
            g.loginInfo = $loginOkuser;
        },
    },
    init: function (callback) {
        // g.loginInfo = window.THIRD_PARTY_AUTH.data.account;
        
        //修复 IOS12，微信 6.7.4+ 键盘不回弹的问题
        $('body').on('blur',"input,select,textarea",function(){
            if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                setTimeout(() => {
                    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            }
        })
        if(callback)callback(this);
    }
};


$(function () {

    // var vConsole = new VConsole();

    $('.rule-btn').on('click', function () {
        $.lay.open($('#popRule'));
    })
    //点赞
    $("body").on("click", ".J-like-btn", function () {
        var $this = $(this),
            id = $this.attr('data-id');
        // if( $this.hasClass("active") )return alert('你已经点过赞了哦,明天再来吧~');
        // 判断是否推栏app环境
        if (g.isApp) {
            g.getData.get_explain_like(id, function (data) {
                if (data.status == 1) {
                    //点赞成功
                    var likeNum = $this.find("span").text();
                    $this.addClass('active');
                    $this.find("span").text(parseInt(likeNum) + 1);
                } else {
                    //点赞失败 & 重复点赞 & 达到点赞次数上限
                    alert("提示：" + data.message);
                }
            });
        } else {
            // 不在推栏app环境
            window.location.href = 'https://daily.xoyo.com/mobile.html?utm_source=PChome';
        }
    });

    //埋点DEMO start
    $('.J_tongjiBtn').on('click', function () {
        window.stReportGlobal023MultiProps({
            eventName: $(this).attr('eventName'),
            eventDescription: $(this).attr("eventDescription")
        });
    });
    //埋点DEMO end


    //登录框 初始化 start
    // $('.xsj_register_dom_nine').registerPublic({
    //     ajaxUrl: g.passportApi, //用于测试接口
    //     domName:'.xsj_register_dom_nine',
    //     regTag:9,
    //     isLogin: true,
    //     loginModel:true,
    //     client:'jx3',
    //     isWegameLogin: true, //wegame login
    //     jiyanBind:true,
    //     isLogOutCallback: true, //开启退出回调
    //     cbLogOut:function () {
    //         $.lay.alert('退出成功');
    //     },
    //     cbLoginSuccess: function ($loginOkuser) { //一进入页面就判断用户是否登录 如果登录就执行此方法 并返回用户名
    //         // alert($loginOkuser);
    //         g.handlers.cbLoginSuccess($loginOkuser);
    //     },
    //     cbLoginModelSuccess: function ($user) { //用户未登录时，显示登录框，点击登录按钮，例如成功后执行的回调
    //         //登录成功回调
    //         // alert($user)
    //         g.handlers.cbLoginModelSuccess($user);
    //     }
    // });
    //登录框 初始化 end

    //统计点案例
    $(document).on('click', '.ClickTrackWithWorkName', function () {
        var trackName = $(this).attr('data-tongji-name');
        var trackDesc = $(this).attr('data-tongji-desc');
        var workName = $(this).attr('data-work-name');
        window.stReportWithName(trackName, trackDesc, workName);
    });
});

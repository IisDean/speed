var isMaster = true; //环境切换 正式是true, 测试环境是false
var g = {
    domain: isMaster ? '//dy.xoyo.com' : '//test-dy.xoyo.com',
    path : '/api.php',
    catName: {
        5533: '最新',
        5534: '新闻',
        5535: '公告',
        5536: '活动',
        5537: '游戏攻略',
        5538: '最新推荐',
        5539: '新手攻略',
        5540: '进阶攻略',
        5541: 'banner'
    },
    apis: {
        /**
         * catid 为文章分类
         *   |- 5533 -- 新闻资讯
         *        |- 5534 -- 新闻
         *        |- 5535 -- 公告
         *        |- 5536 -- 活动
         *   |- 5537 --游戏攻略
         *        |- 5538 -- 最新推荐
         *        |- 5539 -- 新手攻略
         *        |- 5540 -- 进阶攻略
         *   |- 5541 -- 首页轮播图
         * */ 
        article: 'get_article_list', //获取文章列表接口
    },
    ajax: function (o, cb) {
        var t = {
            method: o.method || 'get',
            url: g.domain + g.path + (o.url ? o.url : ''),
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded'
        };
        console.log(t);
        var load = null;

        (o.load) && ( load = $.lay.load(1,{content:'加载中，请稍后...'}));
        $.ajax({
            type: t.method,
            url: t.url,
            data: t.data,
            dataType: t.dataType,
            contentType: t.contentType,
            xhrFields: {withCredentials: true},
            success: function (d) {
                console.log(d);
                setTimeout(function () {
                    o.load && $.lay.close(load);
                },500);

                (cb) && cb(d);
            },
            error: function (xhr, type) {
                o.load && $.lay.close(load);
                var d = {
                    code: -505,
                    msg: '系统错误',
                    message: '系统错误'
                };
                (cb) && cb(d);
            }
        });
    },

    getData:{
        // 获取栏目列表名称
        getArticleList: function(o, cb){
            var def = {
                url: '',
                data: {
                    op: 'search_api',
                    action: g.apis.article,
                    catid: '',
                    page: 1,
                    num: 5,
                    sort_by: ''
                }
            }
            o = $.extend(true,def,o);
            g.ajax(o,cb);
        }
    },
    handler: {
        //渲染首页banner
        indexBanner: function(node, list){
            if(list.length < 1)return;
            var str = "";
            list.forEach(function(ev, i){
                
            });
        },
        // 渲染首页新闻数据
        indexNews: function(node, list){
            if(list.length < 1)return;
            var str = "";
            list.forEach(function(ev, i){
                str += '<p class="clearfix">' +
                            '<span class="date fr">'+ g.timeFormate(parseInt(ev.inputtime), false) +'</span>'+
                            '<a href="./details.html?catid='+ ev.catid +'&id='+ ev.id +'" class="news-item">'+
                                '<span class="news-label">'+ g.catName[ev.catid] +'</span> '+
                                ev.title +
                            '</a>'+
                        '</p>';
            });
            $(node).html(str);
        }
    },
    // 首页数据加载
    news: function(){
        // 首页新闻 -最新 数据加载
        g.getData.getArticleList({
            data: {
                catid: '5533',
                page: 1,
                num: 5
            }
        }, function(obj){
            if(obj.data.list.length > 0)g.handler.indexNews('.news-box .news-box-item:eq(0)', obj.data.list);
        });
        // 首页新闻 -新闻 数据加载
        g.getData.getArticleList({
            data: {
                catid: '5534',
                page: 1,
                num: 5
            }
        }, function(obj){
            if(obj.data.list.length > 0)g.handler.indexNews('.news-box .news-box-item:eq(1)', obj.data.list);
        });
        // 首页新闻 -公告 数据加载
        g.getData.getArticleList({
            data: {
                catid: '5535',
                page: 1,
                num: 5
            }
        }, function(obj){
            if(obj.data.list.length > 0)g.handler.indexNews('.news-box .news-box-item:eq(2)', obj.data.list);
        });
        // 首页新闻 -活动 数据加载
        g.getData.getArticleList({
            data: {
                catid: '5536',
                page: 1,
                num: 5
            }
        }, function(obj){
            if(obj.data.list.length > 0)g.handler.indexNews('.news-box .news-box-item:eq(3)', obj.data.list);
        });
    },
    timeFormate:function(timeStp,full){
        var timeObj = $.tools.stampToTime(timeStp);
        var YY = timeObj.YY,
            MM = timeObj.MM,
            DD = timeObj.DD,
            hh = timeObj.hh,
            mm = timeObj.mm,
            ss = timeObj.ss;
        YY = YY;
        MM = $.tools.fixNumer(MM,2);  //将不足两位的数字前面补0补足2位显示
        DD = $.tools.fixNumer(DD,2);
        hh = $.tools.fixNumer(MM,2);
        mm = $.tools.fixNumer(mm,2);
        ss = $.tools.fixNumer(ss,2);
        if(full) {
            return YY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm + ':' + ss;
        }else {
            return MM + '/' + DD
        }
    },
    //判断链接中是否含有/show-
    isExtraUrl:function(url){
        return url.lastIndexOf('\/show-')==-1
    },
    transUrl:function (url) {
        var m = url.match(/show-\d*?-\d*?\S*/);
        if(m){
            var a = m[0].split('-');
            var catid = a[1],aid=a[2];
            url = 'detail.html?catid='+catid+'&id='+aid;
        }
        return url;
    },
    //tab切换
    cutTab: function(op, cb){
        var nav = $(op.nav),
            panel = $(op.panel);
        function showTab(i){
            nav.removeClass('active').eq(i).addClass('active');
            panel.hide().eq(i).show();
            if(cb)cb({i: i, length: nav.length});
        }
        nav.on("click", function(){
            var i = $(this).index();
            showTab(i, cb);
        });
        showTab(op.i || 0, cb);
    },
    //  所有页面的初始化入口通过 body的page属性值去判断当前是哪个页面
    init:function () {

        // 浮窗展开 & 关闭
        $(".J-open-fc").on("click", function(){
            var side = $(".side-container");
            side.hasClass('on') ? side.removeClass("on") : side.addClass("on");
        });

        // 新闻栏目切换
        g.cutTab({
            nav: '.news-nav li',
            panel: '.news-box .news-box-item',
            i: 0
        }, function(o){
            $(".news-arrow-icon").stop().animate({"left": 70*o.i+'px'}, 'swing');
        });
        
        switch ($('body').attr('page')) {
            case 'index':{
                //广告轮播图
                var slidesNum = $("#swiperlunbo .swiper-slide").length;
                g.swiperLunbo = new Swiper('#swiperlunbo',{
                    speed: 500,
                    pagination: slidesNum > 1 ? '#palunbo' : false,
                    loop: slidesNum > 1 ? true : false,
                    autoplay : 5000,
                    noSwiping : true,
                    paginationClickable: true,
                    autoplayDisableOnInteraction : false,
                });
                // 游戏攻略切换
                g.cutTab({
                    nav: '.gl-nav-menu li',
                    panel: '.gl-box-list .gl-box-item',
                    i: 0
                });
                // 群侠势力切换
                var slPrev = $(".sl-top .sl-prev"),
                    slNext = $(".sl-top .sl-next");
                g.swiperSlNav = new Swiper('#swiperSlNav',{
                    slidesPerView: 6,
                    noSwiping : true,
                    onSlideChangeEnd: function(swiper){
                        var i = Math.floor((swiper.activeIndex+1)/ 6);
                        i = i*6;
                        cutSlNav(i);
                        slPrev.hide();
                        slNext.hide();
                        i < 1 ? slNext.show() : slPrev.show();
                    }
                });
                slPrev.on("click", function(){
                    g.swiperSlNav.swipeTo(g.swiperSlNav.activeIndex-6, 300);
                });
                slNext.on("click", function(){
                    g.swiperSlNav.swipeTo(g.swiperSlNav.activeIndex+6, 300);
                });
                $("#swiperSlNav .swiper-slide").on("click", function(){
                    var length = $("#swiperSlNav .swiper-slide").length,
                        i = $(this).index();
                    if(i >= length-1){
                        alert('敬请期待！');
                    }else {
                        cutSlNav(i);
                    }
                });
                //切换势力
                function cutSlNav(i){
                    $("#swiperSlNav .swiper-slide").eq(i).addClass("active").siblings().removeClass("active");
                    $(".sl-box .sl-box-item").hide().eq(i).show();
                }

                // 游戏特色切换
                g.swiperTs = [0,0,0,0,0];
                g.cutTab({
                    nav: '.ts-nav-menu li',
                    panel: '.ts-swiper-list .ts-swiper-item',
                    i: 0
                }, function(o){
                    if(g.swiperTs[o.i] == 0){
                        initTsSwiper(o.i);
                    }
                });
                function initTsSwiper(idx){
                    var str = ".ts-swiper-list .ts-swiper-"+(idx+1)+" .swiper-container",
                        pageStr = ".ts-swiper-list .ts-swiper-"+(idx+1)+" .pagination",
                        length = $(".ts-swiper-list .ts-swiper-"+(idx+1)+" .swiper-container .swiper-slide").length;
                    g.swiperTs[parseInt(idx)] = new Swiper(str,{
                        speed: 500,
                        pagination: length > 1 ? pageStr : false ,
                        loop: length > 1 ? true : false,
                        autoplay : 3000,
                        noSwiping : true,
                        paginationClickable: true,
                        autoplayDisableOnInteraction : false,
                    });
                }

                // 获取新闻数据
                g.news();
                break;
            }
        }

    },

}

$(function () {
    // 初始化
    g.init();
});

















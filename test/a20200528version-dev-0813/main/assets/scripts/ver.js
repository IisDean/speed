var isMaster = true; //环境切换 正式是true, 测试环境是false
var g = {
    domain: isMaster ? '//jx.xoyo.com' : '//jx.xoyo.com',
    path : '',
    apis: {
        list:'/api.php',  //查询分类下的数据
        gonggao:'/list.php'
    },
    ajax: function (o, cb) {
        var t = {
            method: o.method || 'get',
            url: g.domain + g.path + (o.url ? o.url : ''),
            data: o.data || {},
            dataType: o.dataType || 'jsonp',
            contentType: o.contentType || 'application/x-www-form-urlencoded'
        };
        // console.log(t);
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
                // console.log(d);
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
        getGonggao:function(o,cb){
            var def = {
                url:g.apis.gonggao,
                data:{
                    zq:'',
                    game:'jx',
                    max_row:1,
                    page:1,
                    order:''
                }
            }
            o = $.extend(true,def,o);
            g.ajax(o,cb);
        },
        getCms:function (o,cb) {
            var def = {
                url:g.apis.list,
                data:{
                    op:'search_api',
                    action: 'get_article_list',
                    page:1,
                    num:10,
                    order_by:'listorder',
                    sort_by:'desc'
                },
            }
            o = $.extend(true,def,o);
            // console.log(o);
            g.ajax(o,cb);
        }
    },
    handler:{
        banner:function (ret) {
            if(ret.code==1){
                var list = ret.data.list;
                g.swiperLunbo.removeAllSlides();
                list.forEach(function (it,index) {
                    // if(index>3){return ;} //如果要加上显示的条数限制，取消该条注释即可
                    var url = (it.catid!=0 && g.isExtraUrl(it.url)) ? it.url : 'detail.html?catid=' + it.catid + '&id=' + it.id;
                    var slide =
                        '<div class="swiper-slide">\n' +
                        '\t<a href="'+url+'" target="_blank">\n' +
                        '\t<img src="'+it.thumb+'" alt="">\n' +
                        '\t</a>\n' +
                        '</div>'
                    g.swiperLunbo.appendSlide(slide,'swiper-slide','div');
                })
            }
        },
        new:function () {
            var newList = [];
            //获取头条（图片+文字）
            var $topNews = $('.top-news');
            $topNews.empty()

            //头条内容
            g.getData.getCms({data:{action:'get_article_detail',catid:4461,id:1}},function (ret) {
                // console.log('头条',ret)
                if(ret.data.length>0){
                    var it = ret.data[0];
                    var catid = it.catid,
                      id = catid==0 ? it.url : it.id,
                      url = (catid!=0 && g.isExtraUrl(it.url)) ? it.url : 'detail.html?catid=' + catid + '&id=' + id;
                    // var topNews = '<div class="top-news">\n' +
                    //   '\t<a href="'+url+'" target="_blank" title="'+it.title+'" class="news-img"><img src="'+it.thumb+'" alt="" class="news-img"></a>\n' +
                    //   '\t<a href="'+url+'" target="_blank" title="'+it.title+'" class="news-tit out1">'+it.title+'</a>\n' +
                    //   '</div>'
                    var topNews = '<div class="top-news">\n' +
                      '\t<a href="'+url+'" target="_blank" title="'+it.title+'" class="news-tit out1">'+it.title+'</a>\n' +
                      '<div class="news-intro">'+it.description+'</div> '+
                      '</div>'
                    $topNews.html(topNews);
                }
            });

            //最新tab
            g.getData.getCms({data: {action:'get_customer_article_list',game:'jx', num: 2}}, function (ret) {
                if (ret.code == 1) {
                    ret.data.list.forEach(function (it) {
                        newList.push(it);
                    });

                    //获取新闻、活动
                    g.getData.getCms({ data:{action:'get_merge_article_list',merge_id:'3083|1|4,3080|1|4', order_by:'inputtime'}},function (ret) {
                        // console.log(ret);
                        if(ret.code==1){
                            var tArr = [];
                            [3083,3080].forEach(function (cartid) {
                                ret.data[cartid].list.forEach(function(it){
                                    tArr.push(it)
                                });
                            });
                            // console.log(tArr);
                            tArr = tArr.sort(function (a,b){
                                // console.log(a.inputtime,b.inputtime)
                                return b.inputtime-a.inputtime;
                            })
                            tArr.forEach(function (it) {
                                newList.push(it);
                            });
                            // console.log('最新',newList)
                            g.handler.renderNewList(newList);
                        }
                    });
                }
            });

            //新闻tab
            g.getData.getCms({ data: {catid:3083, num: 6}}, function (ret) {
                // console.log('新闻',ret);
                if (ret.code == 1) {
                    g.handler.renderNews('news', ret.data.list);
                }
            });

            //活动
            g.getData.getCms({ data: {catid:3080, num: 6}}, function (ret) {
                // console.log('活动',ret);
                if (ret.code == 1) {
                    g.handler.renderNews('act', ret.data.list);
                }
            });

            // 公告：获取
            var gg_list = [],gg_list_fee=[],gg_list_free=[];
            g.getData.getCms({data: {action:'get_customer_article_mix_list',game:'jx_sv', num: 6}}, function (ret1) {
                console.log('公告（收费区）',ret1);
                if (ret1.code == 1) {
                    gg_list_fee = ret1.data.list;
                    gg_list_fee.forEach(function (it) {
                        it.brand = 'fee';  //加收费区标识
                        gg_list.push(it);
                    })
                }
                g.getData.getCms({data: {action:'get_customer_article_mix_list',game:'jx', num: 6}}, function (ret2) {
                    console.log('公告（免费区）',ret2);
                    if (ret2.code == 1) {
                        gg_list_free = ret2.data.list;
                        //将两个数据合并
                        gg_list_free.forEach(function (it) {
                            it.brand = 'free'; //加免费区标识
                            gg_list.push(it);
                        });
                    }
                    gg_list.sort(function (a,b){
                        return b.inputtime-a.inputtime;
                    });
                    g.handler.renderNews('gonggao', gg_list);
                });
            });
        },
        renderNewList:function(list,cb){
            //渲染首页【最新】列表
            var $ul = $('[data-cat="new"] .news-list');
            $ul.empty();
            list.forEach(function (it,idx) {
                if(idx<6){
                    // console.log(it)
                    if(it.catid==0){
                        $ul.append('<li><span>公告</span><a href="detail.html?catid='+it.catid+'&id='+it.id+'" target="_blank" class="out1">'+it.title+'</a><em>'+g.timeFormate(it.inputtime*1000)+'</em></li>')
                    }
                    if(it.catid==3083){
                        $ul.append('<li><span>新闻</span><a href="detail.html?catid='+it.catid+'&id='+it.id+'" target="_blank" class="out1">'+it.title+'</a><em>'+g.timeFormate(it.inputtime*1000)+'</em></li>')
                    }
                    if(it.catid==3080){
                        $ul.append('<li><span>活动</span><a href="detail.html?catid='+it.catid+'&id='+it.id+'" target="_blank" class="out1">'+it.title+'</a><em>'+g.timeFormate(it.inputtime*1000)+'</em></li>')
                    }
                }
            })
        },
        renderNews:function (newsType,list) {
            var $ul = $('[data-cat="' + newsType + '"] .news-list');
            $ul.empty();
            var tag = '新闻';
            switch (newsType) {
                case 'news': {
                    tag = '新闻';
                    break;
                }
                case 'act' : {
                    tag = '活动';
                    break;
                }
                case 'gonggao' : {
                    tag = '公告';
                    break;
                }
                default : {
                    tag = '新闻'
                }
            }
            list.forEach(function (it, idx) {
                if(idx>5){ return false; }
                var catid = it.catid,
                  id = catid === 0 ? it.url : it.id,
                  title = it.title,
                  inputtime = it.inputtime;
                var url = (catid != 0 && g.isExtraUrl(it.url)) ?
                  it.url :
                  (catid === 0 ?
                    'detail.html?brand=' + it.brand + '&catid=' + catid + '&id=' + id :
                    'detail.html?catid=' + catid + '&id=' + id);
                  if(it.brand){
                      tag = it.brand=='free'? '免费区':'收费区'
                  }

                $ul.append('<li><span>' + tag + '</span><a href="' + url + '" target="_blank" class="out1">' + title + '</a><em>' + g.timeFormate(inputtime * 1000) + '</em></li>')
            });
        },
        renderDetail:function (ret) {
            console.log(ret)
            if(ret.code==1) {
                var detail = ret.data[0],
                  title = detail.title,
                  content = detail.content,
                  inputtime = g.timeFormate(detail.inputtime * 1000, 2);
                $('.detail-title').text(title);
                $('.detail-time').text('时间：' + inputtime);
                var brand = '<a href="news.html">新闻</a>&gt;正文';
                ($.tools.getParam('brand') == 'menpai') && (brand = '门派');
                var nav_title = '<a href="index.html" title="首页">首页</a><span>&gt;</span><span>' + brand + '</span>';
                $('.c-news-tit .c-links').html(nav_title);

                //内容部分
                var pageParam = $.tools.getParam('page')*1;
                var page = ($.tools.isPosInteger(pageParam)) ? parseInt(pageParam) : 1; //判断是否为正整数
                var arr_con = content.split('\[page\]'), page_count = arr_con.length;
                var pagenation = renderPagenation({
                    page_count : page_count,
                    page: page
                })
                console.log(pagenation)

                $('.detail-con').html(arr_con[pagenation.page_curr - 1]);
                page_count >1 && $('.detail-con').append(pagenation.pagenation);
            }

            function renderPagenation(o){
                var d = {
                    mode:'link', //link , js
                    page_num : 3, //默认为三个页码
                    pageTag : 'page'
                }
                o = $.extend(d,o);
                var cur_url = $.tools.getUrl + $.tools.getPath + $.tools.getFielname;
                //obj
                var num_page = o.page_num;
                var pageTag = o.pageTag;
                var pagenation = $('<div class="detail-pagenation"></div>'),
                    $morePrev = "<span class='page-more'>...</span>"
                page_count = o.page_count,
                    page = o.page,  //传入的当前页面的page
                    page_curr = page >= page_count ? page_count : (page<1 ? 1 : page); // 修正后的page_curr

                var getNewUrl = function (p) {
                    var url_search = $.tools.getRequest();
                    url_search[pageTag] = p;
                    return $.tools.getUrl + $.tools.getPath + $.tools.getFielname+ '?' + $.tools.parseParam(url_search) +(location.hash?location.hash:'');
                }
                var $pagePrev, $pageNext , $pageFirst, $pageOther , $pageEnd;
                // 上一页
                $pagePrev = $('<a class="page-prev '+(page_curr<=1 ? 'page-disabled':'')+'" href="javascript:;">[上一页]</a>').attr('data-page',page_curr>1? page_curr-1 : 1);
                page_curr>1 && o.mode=='link' && $pagePrev.attr('href',getNewUrl(page_curr>1? page_curr-1 : 1));
                pagenation.append($pagePrev);

                // 第一页
                $pageFirst = $('<a class="page-first '+(page_curr<=1 ? 'page-curr':'')+'" href="javascript:;">[1]</a>').attr('data-page',1);
                o.mode=='link' && page_curr!=1 && $pageFirst.attr('href',getNewUrl(1));
                pagenation.append($pageFirst);

                // 是否显示第1页后面的 ...
                (page_count>num_page+2 && page_curr-parseInt(num_page/2)>2) && (pagenation.append($morePrev));

                var  page_start = (page_count<=num_page+2) || (page_curr<=parseInt(num_page/2)+1) ? 2 :(
                    (page_count-page_curr<num_page) ? page_count-num_page : page_curr-parseInt(num_page/2) //不够num_page个页码，则补充
                ),
                 page_end = (page_curr+2>=page_count || page_count-2<=num_page) ? (page_count-1) : (
                    (page_curr<num_page+1) ? (num_page+1) : page_curr+parseInt(num_page/2)
                );
                for(var p = page_start; p<=page_end; p++){
                    $pageOther = $('<a class="page-item" href="javascript:;">[' + p + ']</a>').attr('page',p);
                    (p==page_curr) && $pageOther.addClass('page-curr') || o.mode=='link' && $pageOther.attr('href',getNewUrl(p));
                    pagenation.append($pageOther);
                }

                // 是否显示最后一页后面的 ...
                ((page_count>num_page+2) && (page_curr+parseInt(num_page/2)<page_count-1)) && pagenation.append($morePrev);

                // 最后一页  避免总页数只有1页时出现2个 第1页
                $pageEnd = $('<a class="page-end '+(page_curr>=page_count ? (page_curr==page_count?'page-curr':'page-disabled'):'')+'" href="javascript:;">['+page_count+']</a>').attr('page',page_count);
                ((page_curr<page_count && o.mode=='link') && $pageEnd.attr('href',getNewUrl(page_count)));
                (page_count>1) && pagenation.append($pageEnd);

                // 下一页按钮
                $pageNext = $('<a class="page-prev '+(page_curr>=page_count ? 'page-disabled':'')+'" href="javascript:;">[下一页]</a>').attr('data-page',page_curr<page_count? page_curr+1 : page_count);
                page_curr<page_count && o.mode=='link' && $pageNext.attr('href',getNewUrl(page_curr<page_count? page_curr+1 : page_count));
                pagenation.append($pageNext);


                return {
                    page_curr:page_curr,
                    pagenation:pagenation
                };
            }
        },

        renderDetailGonggao:function (ret) {
            if(ret.code==1){
                var detail = ret.data,
                  title = detail.title,
                  content = detail.content,
                  asktime = detail.asktime;
                $('.detail-title').text(title);
                $('.detail-time').text('时间：'+asktime);
                $('.detail-con').html(content);
                var brand = $.tools.getParam('brand');
                brand = brand=='free' ? '免费区公告' : (brand=='fee' ? '收费区公告' : '公告');
                var nav_title = '<a href="index.html" title="首页">首页</a><span>&gt;</span><span>'+brand+'</span>'
                $('.c-news-tit .c-links').html(nav_title);

            }
        }
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

    // 通用分页代码
    renderPagenation: function(opt,callback) {
        if (opt.pageTotal === 0) {
            $(opt.dom).hide();
            return;
        }
        //分页
        g.myPagination = new myPagination({
            dom: opt.dom,
            curPage: 1, //初始页码
            pageTotal: opt.pageTotal, //总页数
            pageAmount: 5,  //一次显示多少页
            dataTotal: opt.total, //总共多少条数据
            pageSize: 6, //可选,分页个数
            showFirst:false,  //是否显示首页
            showFinal:false,  //是否显示尾页
            showPageTotalFlag: true, //是否显示数据统计
            showSkipInputFlag: true, //是否支持跳转
            getPage: function (page) {
                // console.log(page)//当前点击的page
                // 获取下一页数据并展示
                // var cursor = (page-1)*size;
                // if(cursor<g.pagenation_opt.total-1){
                //     if(callback){ callback(cursor);}
                // }
                if(callback){ callback(page);}
            }
        })
    },

    // 渲染新闻页面的每个列表
    renderNewsPage: function(list,tabIndex){
        var $list = $('.c-news-panel').eq(tabIndex).find('.c-news-list');
        $list.empty();
        var tag = '';
        console.log(tabIndex,list);
        switch (tabIndex) {
            case 0: {tag = '新闻'; break;}
            case 1 : {tag = '活动'; break; }
            case 2 : {tag = '免费区'; break;}
            case 3 : {tag = '收费区'; break;}
            case 4 : {tag = '资料片'; break;}
        }
        list.forEach(function (it,i) {
            var title = it.title,
              catid = (tabIndex == 2 || tabIndex == 3) ? 0 : it.catid,
              id = it.id,
              brand = tabIndex == 2 ? 'free' : (tabIndex == 3 ? 'fee' : ''),
              href = tabIndex == 4 ? it.url : 'detail.html?brand=' + brand + '&catid=' + catid + '&id=' + id,
              inputtime = g.timeFormate(it.inputtime * 1000);
            $list.append('<li><span class="v-sp">' + tag + '</span><a href="' + href + '" target="_blank" class="out1">' + title + '</a><em>' + inputtime + '</em></li>')
        })
    },

    // 获取每个tab的ajax请求数据后的处理：渲染列表g.renderNewsPage + 分页g.renderPagenation
    getNewsList:function(tabIndex,data){
        var size = 25, page = 1;
        data.page = page;
        data.num = size;
        g.getData.getCms({data:data},function (ret) {
            var total = (tabIndex==2 || tabIndex==3) ? ret.data.count : ret.data.total,
                $pagenation = $('.c-news-panel').eq(tabIndex).children('.pagenation')[0];
            var page_opt = {
                dom: $pagenation,
                page: 1,
                total: total,
                size: size,
                pageTotal: Math.ceil(total / size)
            };
            g.renderPagenation(page_opt, function (page) {
                data.page = page;
                g.getData.getCms({load:true, data:data},function (ret) {
                    if(ret.code!=1){return;}
                    var list = ret.data.list;
                    g.renderNewsPage(list,tabIndex);
                });
            })

            var list = ret.data.list;
            g.renderNewsPage(list,tabIndex);
        });
    },
    // 初始化新闻列表页
    initList:function(tabIndex){
        switch (tabIndex) {
            case 0 : {
                var data = {catid:3083};
                g.getNewsList(tabIndex,data);
                break;
            }
            case 1 : {
                var page=1,data = {catid:3080};
                g.getNewsList(tabIndex,data);
                break;
            }
            case 2 : {
                var page=1, data = {action:'get_customer_article_list',game:'jx_sv'};
                g.getNewsList(tabIndex,data);
                break;
            }
            case 3 : {
                var page=1, data = {action:'get_customer_article_list',game:'jx'};
                g.getNewsList(tabIndex,data);
                break;
            }
            case 4 : {
                var data = {catid:5016};
                g.getNewsList(tabIndex,data);
                break;
            }
        }
    },

    //点击搜索
    goSearch:function () {
        var keyword = $('.search-form input').val();
        if(keyword==''){
            $.lay.msg('请输入关键字！');
            return;
        }else{
            location.href = 'search.html?keyword='+keyword;
        }
    },
    // 发起搜索请求
    search:function(cur_keyword){
        var size = 20;
        var data = {action:'search_by_title', modelid:286, q:cur_keyword, num: size, page:1};
        g.getData.getCms({load:true, data: data}, function (ret) {
            // console.log('搜索',ret);
            if (ret.code == 1) {
                g.renderSearchPage(ret.data.list);

                var total = ret.data.total,
                  $pagenation = $('.pagenation')[0];
                var page_opt = {
                    dom: $pagenation,
                    page: 1,
                    total: total,
                    size: size,
                    pageTotal: Math.ceil(total / size)
                };
                g.renderPagenation(page_opt, function (page) {
                    data.page = page;
                    g.getData.getCms({load:true, data:data},function (ret) {
                        if(ret.code!=1){return;}
                        var list = ret.data.list;
                        g.renderSearchPage(list);
                    });
                })
            }
        });

    },
    // 渲染搜索结果
    renderSearchPage(list){
        var $list = $('.search-con');
        $list.empty();
        list.forEach(function (it,i) {
            var title = it.title,
              catname = it.catname,
              catid = it.catid,
              id = it.id,
              description = g.isExtraUrl(it.url) ? '' : it.description,
              href = g.isExtraUrl(it.url) ? it.url : ($.tools.getUrl+$.tools.getPath+'detail.html?catid=' + catid + '&id=' + id),
              inputtime = g.timeFormate(it.inputtime * 1000);
            var html = '<div class="search-list">\n' +
              '\t<p class="ar-tit clear">\n' +
              '\t\t<a href="'+href+'" target="_blank">'+title+'</a><i class="sub">'+catname+'</i>\n' +
              '\t</p>\n' +
              '\t<p class="ar-txt">'+description+'</p>\n' +
              '\t<p class="info">\n' +
              '\t\t'+href+'\n' +
              '\t</p>\n' +
              '</div>';
            $list.append(html);
        })
        if(list.length==0){
            $list.html('<div class="no-data-box"><div class="icon-no-data">o(╥﹏╥)o </div><div class="no-data-tips">对不起，暂无相关内容~~</div></div>')
        }
    },
    //  所有页面的初始化入口通过 body的page属性值去判断当前是哪个页面
    init:function () {
        //tab-应用于首页和新闻列表页的tab切换函数
        function tab(tabObj) {
            var nav = tabObj.nav,
                panel = tabObj.panel;
            function show(i,cb) {
                nav.removeClass('cur').eq(i).addClass('cur');
                panel.hide().eq(i).show();
                if(cb){cb(i);}
            }
            nav.on('click', function () {
                var activeIndx = $(this).index();
                show(activeIndx,tabObj.change);
            });
            show(tabObj.index,tabObj.change);
        }

        switch ($('body').attr('page')) {
            case 'index':{
                //首页tab
                tab({
                    nav: $('.news-nav li'),
                    panel: $('.news-panel'),
                    index: 0
                });

                //广告轮播图
                g.swiperLunbo = new Swiper('#swiperlunbo',{
                    speed: 500,
                    pagination: '#palunbo',
                    loop:true,
                    autoplay : 5000,
                    paginationClickable: true,
                    autoplayDisableOnInteraction : false
                });

                //十二门派-swiper
                // g.swiperPer = new Swiper('#swiperper',{
                //     speed: 500,
                //     loop:false,
                //     autoplay : false,
                //     slideActiveClass : 'swiper-cur',
                //     autoplayDisableOnInteraction : false,
                //     onSlideChangeStart: function(swiper){
                //         var index = swiper.activeLoopIndex;
                //         $('.per-nav li').removeClass('cur').eq(index).addClass('cur');
                //     }
                // });
                var per = {
                    nav: $('.per-nav li'),
                    navWrap: $('.per-nav'),
                    navClass: function (i) {
                        this.nav.removeClass('cur').eq(i).addClass('cur');
                    },
                    navClick: function () {
                        var _this = this;
                        _this.nav.on('click', function () {
                            var index = $(this).index();
                            g.swiperPer.swipeTo(index, 400);
                            _this.navClass(index)
                        })
                    },
                    stopSlide: function(){
                        this.navWrap.hover(function () {
                            g.swiperPer.stopAutoplay();
                        },function () {
                            g.swiperPer.startAutoplay();
                        })
                    },
                    init: function () {
                        this.navClick();
                        this.stopSlide();
                    }
                };
                //per.init();

                var per2 =  {
                    nav: $('.per-nav li'),
                    slideBox: $('.per-wrap .swiper-slide'),
                    navClass: function (e) {
                        this.nav.removeClass('cur').eq(e).addClass('cur');
                    },
                    navFun: function () {
                        var _this = this;
                        _this.nav.on('click', function () {
                            var index = $(this).index();
                            _this.i = index;
                            _this.slideBox.stop().fadeOut().eq(index).stop().fadeIn();
                            _this.navClass(index)
                        })
                    },
                    i:0,
                    st:null,
                    play: function(){
                        var _this = this;
                        ;(_this.st==null) && (_this.st = setInterval(function () {
                            _this.i = (_this.i>=_this.slideBox.length-1) ? 0 : (_this.i+1);
                            _this.slideBox.stop().fadeOut().eq(_this.i).stop().fadeIn();
                            _this.navClass(_this.i);
                        },5000));
                    },
                    stop: function() {
                        this.st != null && (clearInterval(this.st), this.st = null);
                    },
                    init: function () {
                        var _this = this;
                        _this.navFun();
                        _this.play();

                        $(".part5").hover(function () {
                            // console.log('mouseenter hover');
                            _this.stop();
                        },function () {
                            // console.log('mouseleave');
                            _this.play();
                        });
                    }
                };
                per2.init();

                // 获取banner图的数据
                g.getData.getCms({data:{catid:4466}},g.handler.banner);
                //获取最新新闻列表
                g.handler.new();
                break;
            }
            case 'detail':{
                var catid = parseInt($.tools.getParam('catid')),id=parseInt($.tools.getParam('id'));
                // console.log(catid,id)
                if(isNaN(catid) || isNaN(id)){location.href='index.html';return;}  //参数为空
                // if(!$.tools.isPosInteger(catid) || !$.tools.isPosInteger(id)){   //参数不合法：不是正整数的catid和id
                //     location.href='index.html';
                //     return;
                // }
                if(catid==0){
                    //公告详情内容
                    // http://jx3.xoyo.com/api.php?op=search_api&action=get_customer_article_detail&kid=1323880&game=jx3
                    g.getData.getCms({data:{action:'get_customer_article_detail',kid:id,game:'jx'}},g.handler.renderDetailGonggao)
                }else{
                    //普通新闻内容
                    g.getData.getCms({data:{action:'get_article_detail',catid:catid,id:id}},g.handler.renderDetail)
                }
                break;
            }
            case 'news':{
                //新闻页中的tab
                var tabIndex = $.tools.getParam('tab');
                if(tabIndex===false){ tabIndex = 0;}
                $(document).scrollTop($('.content').offset().top-50)
                // $('html,body').animate({scrollTop: ($('.content').offset().top-50) + 'px'}, 'fast')
                // $.scrollTo('.content',500);
                tab({
                    nav: $('.c-news-nav li'),
                    panel: $('.c-news-panel'),
                    index: tabIndex,
                    change:function (i) {
                        if(i!=tabIndex){ location.href = "?tab="+i; }
                        // console.log(i);
                    }
                });

                //获取每个tab的数据
                $('.c-news-nav li').each(function(index,item){
                    g.initList(index);
                });

                break;
            }
            case 'search': {
                var cur_keyword = $.tools.getParam('keyword')===false ? '' : decodeURIComponent($.tools.getParam('keyword'));
                $('.search-item input').val(cur_keyword);
                //搜索 https://jx3.xoyo.com/api.php?op=search_api&action=search_by_title&catid=2458&q=%E9%B1%BC%E6%9C%89%E8%AF%
                // 9D%E8%AF%B4&num=2
                // modelid:286表示新闻模型的文章（不包括公告）
                g.search(cur_keyword);
                break;
            }
            case 'zl': {
                var tabIndex = $.tools.getParam('num');
                tabIndex = tabIndex===false?0:tabIndex;
                //首页tab
                tab({
                    nav: $('.tabs li'),
                    panel: $('.tabcon>div'),
                    index: tabIndex
                });

                break;
            }
        }

        renderBtnBanner(); //左侧banner图

        function renderBtnBanner() {
            g.getData.getCms({data:{action:'get_article_detail',catid:4461,id:11}},function (ret) {
                // console.log('左侧banner图',ret);
                if(ret.data.length>0){
                    var it = ret.data[0];
                    var catid = it.catid,
                      id = catid==0 ? it.url : it.id,
                      url = (catid!=0 && g.isExtraUrl(it.url)) ? it.url : 'detail.html?catid=' + catid + '&id=' + id;
                    $('.btn-banner').attr({'href':url, title:it.title});
                    $('.btn-banner img').attr('src',it.thumb);
                }
            });
        }
    },

}

$(function () {
    //顶部导航
    $(".top-nav").hover(function() {
        $(".nav-detail").stop().slideDown(400);
    }, function() {
        $(".nav-detail").stop().slideUp(200);
    });

    //按回车键搜索
    $('.search-form').on('keydown','input',function (e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13){
            g.goSearch();
        }
    });
    //点击搜索按钮搜索
    $('.search-form').on('click','.sear-ico,.btn-search',function () {
        g.goSearch();
    })


    g.init();
});

















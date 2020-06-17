var ctrlJs = {
    data: {
        //图片预加载列表
        loadImgList: [
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/loading.gif',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_1_1.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_1_2.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_2_1.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_2_2.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_3_1.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_3_2.jpg',
        ],
        isImgLoading: false,//是否加载完成
        pageIdx: 1,//当前页面，默认首页
        jd: 0,// 选择的基底
        gz: [],// 选择的果汁
        zl: [],// 选择的佐料
    },
    methods: {
        //图片预加载
        loadImg: function(){
            var that = this,
                imgLoad = 0,
                pro = 0,
                imgList = ctrlJs.data.loadImgList;
                $loadText = $(".J-pro-text"),
                $progress = $(".J-pro-wrap");
            console.log(imgList);
            imgList.forEach(function (ev, index) {
                var img = new Image();
                img.src = ev;
                img.style.position = 'absolute';
                img.idx = index;
                img.onload = function () {
                    imgList[this.idx].obj = this;
                    imgLoad++;
                    pro = parseInt((imgLoad / imgList.length) *.95 * 100);
                    // $loadText.text(pro + '%');
                    // $progress.css('width', pro+'%');
                    if (imgLoad >= imgList.length) {
                        console.log('加载完成');
                        ctrlJs.data.isImgLoading = true;
                        // document.fonts.ready.then(function() {});
                    }
                }
            });
        },
        // 显示图片
        showImg: function(){
            var $imgList = $("img");
            $imgList.each(function(idx, ev){
                var $ev = $(ev),
                    src = $ev.attr('data-src');
                if(src != null){
                    $ev.attr('src', src);
                }
            });
        },
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
            $(".part-" + idx).removeClass("part-show");
        },
        //生成结果页
        createResult: function(){
            var resultData = {};
            // 根据基底判断人物 1/2/3为萧逸，4/5/6为陆沉，7/8/9为齐司礼
            var jd = ctrlJs.data.jd;
            if( jd == 1 || jd == 2 || jd == 3 ){
                resultData.jd = 1;
            }else if(jd == 4 || jd == 5 || jd == 6){
                resultData.jd = 2;
            }else if(jd == 7 || jd == 8|| jd == 9){
                resultData.jd = 3;
            }
            // 判断果汁 1/3/5/7对应烈焰蓝调、浅草青森、绿雪芽白 2/4/6/8/9对应红泥小樽、枫丹蜜语、千岛玉叶
            var isGz = [
                [1,5,7,9],
                [2,3,4,6,8]
            ];
            var gzA = 0,
                gzB = 0;
            ctrlJs.data.gz.forEach(function(ev, idx){
                if( isGz[0].indexOf(ev) >= 0 ){
                    gzA++;
                }else if(isGz[1].indexOf(ev) >= 0) {
                    gzB++;
                }
            });
            gzA > gzB ? resultData.gz = 1 : resultData.gz = 2;
            ctrlJs.methods.nextPageRead(5);
            var resultSrc = '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_'+ resultData.jd +'_'+ resultData.gz +'.jpg';
            $(".part-6").css("background-image", "url("+ resultSrc +")");
            $(".stage").addClass('jd-'+resultData.jd);
            setTimeout(function(){
                TGDialogS('popZzcg');
                setTimeout(function(){
                    closeDialog();
                    $("#popZzcg").hide();
                    ctrlJs.methods.nextPageRead(6);
                }, 500);
            }, 3000);
        }
    },
    //初始化
    init: function(){
        var that = this;
        that.methods.loadImg();
        
        // 立即开始
        $(".part-1 .btn-start").on("click", function(){
            that.methods.nextPageRead(2);
        });

        // 选取一种基底
        $(".part-2 .select-list").on("click", "li", function(){
            var $this = $(this),
                idx = $this.index();
            that.data.jd = idx+1;
            $this.addClass("active").siblings('li').removeClass("active");
        });

        // 选取基底 下一步
        $(".part-2 .btn-next").on("click", function(){
            if(that.data.jd <= 0){
                $(".pop-tips .pop-tips-text").text('需要选择1种基底哦~');
                TGDialogS('popTips');
                return false;
            }
            that.methods.nextPageRead(3);
        });

        // 选取3种果汁
        $(".part-3 .select-list").on('click', 'li', function(){
            var $this = $(this),
                idx = $this.index(),
                isCz = that.data.gz.indexOf(idx+1);
            if(isCz >= 0){
                that.data.gz.splice(isCz, 1);
                $this.removeClass('active');
                return false;
            }
            if(that.data.gz.length >= 3){
                $(".part-3 .select-list li").eq(that.data.gz[0]-1).removeClass("active");
                that.data.gz.splice(0, 1);
            }
            that.data.gz.push(idx+1);
            $this.addClass('active');
        });

        // 选取3种果汁 下一步
        $(".part-3 .btn-next").on("click", function(){
            if(that.data.gz.length < 3){
                $(".pop-tips .pop-tips-text").text('需要选择3种果汁哦~');
                TGDialogS('popTips');
                return false;
            }
            that.methods.nextPageRead(4);
        });
        
        // 选取3种佐料
        $(".part-4 .select-list").on('click', 'li', function(){
            var $this = $(this),
                idx = $this.index(),
                isCz = that.data.zl.indexOf(idx+1);
            if(isCz >= 0){
                that.data.zl.splice(isCz, 1);
                $this.removeClass('active');
                return false;
            }
            if(that.data.zl.length >= 3){
                $(".part-4 .select-list li").eq(that.data.zl[0]-1).removeClass("active");
                that.data.zl.splice(0, 1);
            }
            that.data.zl.push(idx+1);
            $this.addClass('active');
        });

        // 选取3种佐料 下一步
        $(".part-4 .btn-next").on("click", function(){
            if(that.data.zl.length < 3){
                $(".pop-tips .pop-tips-text").text('需要选择3种佐料哦~');
                TGDialogS('popTips');
                return false;
            }
            // 生成结果
            that.methods.createResult();
        });

        //上一步
        $(".btn-prev").on("click", function(){
            that.methods.prevPage();
        });
    }
}
ctrlJs.init();/* #t6Hl8#AB043360EBDA24C091A1BD92EDDB5024 */
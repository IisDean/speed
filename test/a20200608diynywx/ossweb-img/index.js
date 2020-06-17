var ctrlJs = {
    data: {
        //ͼƬԤ�����б�
        loadImgList: [
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/loading.gif',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_1_1.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_1_2.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_2_1.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_2_2.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_3_1.jpg',
            '//game.gtimg.cn/images/lv/cp/a20200608diynywx/result_3_2.jpg',
        ],
        isImgLoading: false,//�Ƿ�������
        pageIdx: 1,//��ǰҳ�棬Ĭ����ҳ
        jd: 0,// ѡ��Ļ���
        gz: [],// ѡ��Ĺ�֭
        zl: [],// ѡ�������
    },
    methods: {
        //ͼƬԤ����
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
                        console.log('�������');
                        ctrlJs.data.isImgLoading = true;
                        // document.fonts.ready.then(function() {});
                    }
                }
            });
        },
        // ��ʾͼƬ
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
        // ��һҳ׼��
        nextPageRead: function(idx){
            var that = this;
            if(idx && idx < 7){
                setTimeout(function(){
                    ctrlJs.data.pageIdx = idx;
                    $(".part-" + idx).addClass("part-show").show();
                }, 100);
            }
        },
        //�ص���һҳ
        prevPage: function(){
            var idx = ctrlJs.data.pageIdx;
            ctrlJs.data.pageIdx--;
            $(".part-" + idx).removeClass("part-show");
        },
        //���ɽ��ҳ
        createResult: function(){
            var resultData = {};
            // ���ݻ����ж����� 1/2/3Ϊ���ݣ�4/5/6Ϊ½����7/8/9Ϊ��˾��
            var jd = ctrlJs.data.jd;
            if( jd == 1 || jd == 2 || jd == 3 ){
                resultData.jd = 1;
            }else if(jd == 4 || jd == 5 || jd == 6){
                resultData.jd = 2;
            }else if(jd == 7 || jd == 8|| jd == 9){
                resultData.jd = 3;
            }
            // �жϹ�֭ 1/3/5/7��Ӧ����������ǳ����ɭ����ѩѿ�� 2/4/6/8/9��Ӧ����С�ס��㵤���ǧ����Ҷ
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
    //��ʼ��
    init: function(){
        var that = this;
        that.methods.loadImg();
        
        // ������ʼ
        $(".part-1 .btn-start").on("click", function(){
            that.methods.nextPageRead(2);
        });

        // ѡȡһ�ֻ���
        $(".part-2 .select-list").on("click", "li", function(){
            var $this = $(this),
                idx = $this.index();
            that.data.jd = idx+1;
            $this.addClass("active").siblings('li').removeClass("active");
        });

        // ѡȡ���� ��һ��
        $(".part-2 .btn-next").on("click", function(){
            if(that.data.jd <= 0){
                $(".pop-tips .pop-tips-text").text('��Ҫѡ��1�ֻ���Ŷ~');
                TGDialogS('popTips');
                return false;
            }
            that.methods.nextPageRead(3);
        });

        // ѡȡ3�ֹ�֭
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

        // ѡȡ3�ֹ�֭ ��һ��
        $(".part-3 .btn-next").on("click", function(){
            if(that.data.gz.length < 3){
                $(".pop-tips .pop-tips-text").text('��Ҫѡ��3�ֹ�֭Ŷ~');
                TGDialogS('popTips');
                return false;
            }
            that.methods.nextPageRead(4);
        });
        
        // ѡȡ3������
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

        // ѡȡ3������ ��һ��
        $(".part-4 .btn-next").on("click", function(){
            if(that.data.zl.length < 3){
                $(".pop-tips .pop-tips-text").text('��Ҫѡ��3������Ŷ~');
                TGDialogS('popTips');
                return false;
            }
            // ���ɽ��
            that.methods.createResult();
        });

        //��һ��
        $(".btn-prev").on("click", function(){
            that.methods.prevPage();
        });
    }
}
ctrlJs.init();/* #t6Hl8#AB043360EBDA24C091A1BD92EDDB5024 */
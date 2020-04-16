$(function () {

    //播放音乐
    var music = document.getElementById('musicWrap');
    music.play();
    $(window).one('touchstart', function () {
        music.play();
    });
    // //微信下兼容处理
    document.addEventListener("WeixinJSBridgeReady", function () {
        music.play();
    }, false);
    // //音乐开关
    var switchMusic = $(".play-icon");

    switchMusic.on("click", function () {
        if (switchMusic.hasClass('off')) {
            music.play();
            switchMusic.removeClass("off");
        } else {
            music.pause();
            switchMusic.addClass("off");
        }
    });

    var Status = false; //画面是否运行
    //加载帧图
    var imgList = [
        './img/angle.gif',
        './img/load_icon.png',
        './img/music_on.png',
        './img/music_off.png',
        './img/logo.png',
        './img/music_off.png',
        './img/music_on.png',
        './img/p1_btn.png',
        './img/p1_text.png',
        './img/p1_text2.png',
        './img/p2_btn.png',
        './img/p3_btn.png',
        './img/p3_count_bg.png',
        './img/p4_btn.png',
        './img/p4_sp.png',
        './img/page_bg.jpg',
        './img/select_active_bg.png',
        './img/select_bg.png',
        './img/bi.png',
        './img/flower.png',
        './img/pingzi.png',
        './img/qzh_1.png',
        './img/qzh_2.png',
        './img/qzh_3.png',
        './img/qzh_4.png',
        './img/qzh_5.png',
        './img/star_1.png',
        './img/star_2.png',
        './img/star_3.png',
        './img/zhi.png',
        './img/xinzhi_inset.png',
        './img/zhi_qzh.png',
        './img/sava_hb_btn.png',
        './img/get_jk_btn.png',
        './img/poster_bg.jpg',
        './img/tap.png',
        './img/xin_text.png',
        './img/p3_sp.png',
    ];

    function loadImg() {
        var that = this,
            imgLoad = 0,
            pro = 0,
            $loadText = $(".load-text");
        imgList.forEach(function (ev, index) {
            var img = new Image();
            img.src = ev;
            img.style.position = 'absolute';
            img.idx = index;
            img.onload = function () {
                imgList[this.idx].obj = this;
                imgLoad++;
                pro = parseInt((imgLoad / imgList.length) * 100);
                $loadText.text(pro + '%');
                if (imgLoad >= imgList.length) {
                    Status = true;
                    $(".load-wrap").fadeOut(300);
                    console.log('加载完成');
                    // 首屏移动
                    setTimeout(function () {
                        oneMove();
                    }, 1000);
                }
            }
        });
    }
    loadImg();
    var $pictureWrap = $(".page-container"), //画布容器
        pageW = $('html,body').width(), //页面宽度
        pageH = $('html,body').height(), //页面高度
        bl = (((1650 / 750) * pageW) - pageH) / 2, //使屏幕内容居中适配容差值
        position = { //画布移动初始值
            y: 0
        },
        maxY = $pictureWrap.height(),
        tween = new TWEEN.Tween(position),
        userName = ''; //用户输入的姓名

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
    }
    requestAnimationFrame(animate);
    //画面移动
    function pictureStart(y, ani, s, endCallback) {
        tween.to({
                y: y + bl
            }, s)
            .easing(ani)
            .onUpdate(function () {
                $pictureWrap.css({
                    'transform': 'translate3d(0,' + position.y + 'px, 0)',
                    '-webkit-transform': 'translate3d(0,' + position.y + 'px,0)'
                });
            })
            .onComplete(function () {
                if (endCallback) endCallback();
            })
            .start();
    }

    //首屏移动
    function oneMove() {
        $(".load-wrap").fadeOut(300);
        $(".wrap-6").addClass('active');
        // return false;
        pictureStart(0.1 * maxY, TWEEN.Easing.Quadratic.Out, 4000);
        setTimeout(function () {
            $(".zhi-icon").fadeIn(300);
            pictureStart(0.22 * maxY, TWEEN.Easing.Quadratic.Out, 4000, function () {
                angleMove({
                    x: 14.5,
                    y: 62.3
                }, TWEEN.Easing.Quadratic.InOut, 1500);
            });
            setTimeout(function () {
                $(".wrap-5").addClass("active");
            }, 2000);
        }, 5000);
    }

    //天使移动
    var $angleWrap = $(".angle-icon"),
        ts = {
            x: -25,
            y: 65
        },
        tweenTwo = new TWEEN.Tween(ts);


    function angleMove(obj, ani, s, endCallback) {
        // return false;
        tweenTwo.to({
                x: obj.x,
                y: obj.y
            }, s)
            .easing(ani)
            .onUpdate(function () {
                $angleWrap.css({
                    'top': ts.y + '%',
                    'left': ts.x + '%'
                });
            })
            .onComplete(function () {
                if (endCallback) endCallback();
            })
            .start();
    }

    //为爱祈福
    $(".submit-btn").on("click", function () {
        userName = $("#userName").val();
        if (userName.length < 1) return alert('您还未输入昵称哦~');
        $(".J-user-name").text(userName);
        pictureStart(0.408 * maxY, TWEEN.Easing.Quadratic.Out, 4500);
        angleMove({
            x: 2,
            y: 48
        }, TWEEN.Easing.Quadratic.InOut, 5000);
    });

    $("#userName").on("blur", function () {
        var val = $(this).val();
        if (val.length > 6) {
            val = val.slice(0, 4);
        }
        $(this).val(val);
    });

    //选择祈福语
    var $qfList = $(".qifu-list");
    $qfList.on("click", '.qifu-item', function () {
        var $this = $(this),
            idx = $this.index();
        $this.addClass('active').siblings('li').removeClass('active');
        $(".result-msg-text").text($this.find('span').text());
        setTimeout(function () {
            pictureStart(0.59 * maxY, TWEEN.Easing.Quadratic.Out, 4500);
            angleMove({
                x: 55,
                y: 32
            }, TWEEN.Easing.Quadratic.InOut, 4000);
            setTimeout(function () {
                upNumber();
                $(".wrap-3").addClass('active');
            }, 2000);
        }, 500);
    });

    var qifuList = [
        '我爱你',
        '你是我幸福的礼物',
        '用一生伴你健康成长',
        '为了你，我会变得更强大',
        '你是我奋斗的理由',
        '你一笑，世界就变亮了',
        '愿你一生幸福快乐',
        '要无忧无虑健康生活',
        '我为你骄傲',
        '愿事业平稳一帆风顺',
        '早日脱单',
        '身体健康万事顺遂',
        '您陪我长大，我伴您到老',
        '您是我永远的英雄',
        '您在哪，家就在哪',
        '您是我至上的阳光',
        '我会成为你们的骄傲',
        '疫情后我们去旅游',
        '此生平安顺遂喜乐无忧',
        '因为有你，风雨无惧',
        '愿我们早日结束异地恋',
        '我们结婚吧',
        '有你的每天都是晴天',
        '愿生活因我们而有爱',
        '你负责貌美如花，我负责赚钱养家',
        '我会用一生守护你',
        '我们要永远在一起',
        '致敬逆行者',
        '您是人间的春天',
        '您是生命的守护神',
        '感谢您的无私奉献',
        '您是最美的天使',
        '感谢您与死神病魔抗争'
    ];

    function cutQfY() {
        var num = getRandom(0, qifuList.length - 1);
        $qfList.find('li').each(function (idx, ev) {
            $(ev).find("span").text(qifuList[num]);
            num++;
            if (num > qifuList.length - 1) num = 0;
        });
    }
    cutQfY();
    //切换祈福语 & 换一批
    $(".change-qifu-btn").on("click", function () {
        for (var i = 0; i < 3; i++) {
            $qfList.find('li').eq(i).delay(100 * i).animate({
                'left': '-.3rem',
                'opacity': 0
            }, 300, function () {
                $qfList.find('li').css({
                    'left': '.3rem'
                })
            });
        }
        setTimeout(function () {
            cutQfY();
            for (var i = 0; i < 3; i++) {
                $qfList.find('li').eq(i).delay(i * 100).animate({
                    'left': '0',
                    'opacity': 1
                })
            }
        }, 500);
    });

    //get随机数
    function getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    // 让爱起航
    var qfNum = 5684;
    $(".qihang-btn").on("click", function () {
        qfNum++;
        $(".J-qf-num").text(qfNum);
        $('.qifu-text').text(qfNum);
        $(".add-one").show();
        pictureStart(0.70 * maxY, TWEEN.Easing.Quadratic.Out, 4500, function () {
            $(".qifu-wrap").fadeOut(300);
        });
        setTimeout(function () {
            $(".wrap-2").addClass('active');
        }, 1500);
        setTimeout(function () {
            pictureStart(0.817 * maxY, TWEEN.Easing.Quadratic.Out, 4500, function () {
                $(".wrap-1").addClass('active');
            });
        }, 8500);
    });

    //数字动画
    function upNumber() {
        var num = qfNum - 300,
            $numberText = $('.qifu-text');
        var setTimer = setInterval(function () {
            num += 2;
            $numberText.text(num);
            if (num >= qfNum) clearInterval(setTimer);
        }, 16);
    }

    //海报二维码地址
    var url = window.location.href;
    $('#qrcode').qrcode(url);

    // 显示海报
    $(".create-poster-btn").on("click", function () {
        $(".pop-poster").show();
        //生成海报
        dom2img('#poster', {
            ondone: function () {
                $(".poster-tips-text").hide();
                $(".dom2img-result").clone().appendTo('.sava-hb-btn');
            }
        });
    });

    //重新祈福
    $(".again-btn").on("click", function () {
        $(".wrap").removeClass('active');
        $(".wrap-5").addClass('active');
        $(".qifu-wrap").show();
        $(".dom2img-result").remove();
        $(".poster-tips-text").show();
        pictureStart(.22 * maxY, TWEEN.Easing.Quadratic.Out, 4000);
        angleMove({
            x: 14.5,
            y: 62.3
        }, TWEEN.Easing.Quadratic.InOut, 4500);
    });

    //修复 IOS12，微信 6.7.4+ 键盘不回弹的问题
    $('body').on('blur', "input,select,textarea", function () {
        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            setTimeout(() => {
                const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
        }
    });

});
$(function () {

    //����֡ͼ
    function ztPlay() {
        // var $angleWrap = $(".angle-icon img"),
        //     idx = 0;
        // var setTimer = setInterval(function () {
        //     $angleWrap.hide().eq(idx).show();
        //     idx++;
        //     if (idx >= 18) {
        //         idx = 0;
        //     }
        // }, 1200 / 15);
    }

    //��������
    var music = document.getElementById('musicWrap');
    music.play();
    $(window).one('touchstart', function () {
        music.play();
    });
    // //΢���¼��ݴ���
    document.addEventListener("WeixinJSBridgeReady", function () {
        music.play();
    }, false);
    // //���ֿ���
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

    var Status = false; //�����Ƿ�����
    //����֡ͼ
    var imgList = [
        './img/angle.png',
        // './img/angle_1.png',
        // './img/angle_2.png',
        // './img/angle_3.png',
        // './img/angle_4.png',
        // './img/angle_5.png',
        // './img/angle_6.png',
        // './img/angle_7.png',
        // './img/angle_8.png',
        // './img/angle_9.png',
        // './img/angle_10.png',
        // './img/angle_11.png',
        // './img/angle_12.png',
        // './img/angle_13.png',
        // './img/angle_14.png',
        // './img/angle_15.png',
        // './img/angle_16.png',
        // './img/angle_17.png',
        // './img/angle_18.png',
        // './img/angle_19.png',
        './img/load_icon.png',
        './img/music_on.png',
        './img/music_off.png',
        './img/logo.png',
        './img/music_off.png',
        './img/music_on.png',
        './img/p1_btn.png',
        './img/p1_text.png',
        './img/p2_btn.png',
        './img/p3_btn.png',
        './img/p3_count_bg.png',
        './img/p3_text.png',
        './img/p4_btn.png',
        './img/p4_sp.png',
        './img/page_bg.jpg',
        './img/select_active_bg.png',
        './img/select_bg.png',
        './img/bi.png',
        './img/flower.png',
        './img/huaban.png',
        './img/pingzi.png',
        './img/qzh_1.png',
        './img/qzh_2.png',
        './img/qzh_3.png',
        './img/qzh_4.png',
        './img/qzh_5.png',
        './img/result_bg.png',
        './img/star_1.png',
        './img/star_2.png',
        './img/star_3.png',
        './img/zhi.png',
        './img/xinzhi_inset.png',
        './img/zhi_qzh.png',
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
                    // ztPlay();
                    // �����ƶ�
                    setTimeout(function () {
                        oneMove();
                    }, 1000);
                }
            }
            // if (index <= 18) {
            //     $(img).appendTo(".angle-icon");
            // }
        });
    }
    loadImg();
    var $pictureWrap = $(".page-container"), //��������
        pageW = $('html,body').width(), //ҳ����
        pageH = $('html,body').height(), //ҳ��߶�
        bl = (((1650 / 750) * pageW) - pageH) / 2, //ʹ��Ļ���ݾ��������ݲ�ֵ
        position = { //�����ƶ���ʼֵ
            y: 0
        },
        maxY = $pictureWrap.height(),
        tween = new TWEEN.Tween(position),
        userName = ''; //�û����������

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
    }
    requestAnimationFrame(animate);
    //�����ƶ�
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

    //�����ƶ�
    function oneMove() {
        $(".load-wrap").fadeOut(300);
        $(".wrap-6").addClass('active');
        pictureStart(0.1 * maxY, TWEEN.Easing.Quadratic.InOut, 4000);
        setTimeout(function () {
            pictureStart(0.22 * maxY, TWEEN.Easing.Quadratic.InOut, 4000, function () {
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

    //��ʹ�ƶ�
    var $angleWrap = $(".angle-icon"),
        ts = {
            x: -25,
            y: 65
        },
        tweenTwo = new TWEEN.Tween(ts);


    function angleMove(obj, ani, s, endCallback) {
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

    //Ϊ����
    $(".submit-btn").on("click", function () {
        userName = $("#userName").val();
        if (userName.length < 1) return alert('����δ�����ǳ�Ŷ~');
        $(".J-user-name").text(userName);
        pictureStart(0.408 * maxY, TWEEN.Easing.Quadratic.InOut, 4500);
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

    //ѡ������
    var $qfList = $(".qifu-list");
    $qfList.on("click", '.qifu-item', function () {
        var $this = $(this),
            idx = $this.index();
        $this.addClass('active').siblings('li').removeClass('active');
        $(".result-msg-text").text($this.find('span').text());
        setTimeout(function () {
            pictureStart(0.59 * maxY, TWEEN.Easing.Quadratic.InOut, 4500);
            angleMove({
                x: 55,
                y: 32
            }, TWEEN.Easing.Quadratic.InOut, 5000);
            setTimeout(function () {
                upNumber();
                $(".wrap-3").addClass('active');
            }, 3000);
        }, 500);
    });

    var qifuList = [
        '�������Ұ���',
        '���ӣ��һ��ػ��㽡���ɳ�',
        '������Ϊ���㣬�һ��ø�ǿ��',
        '�����������ҷܶ�������',
        '��������һЦ������ͱ�����',
        '������Ը��һ���Ҹ�����',
        '������Ը���������ǽ�������',
        '����������Ϊ�㽾��',
        'Ը�Լ�����ҵƽ��һ����˳',
        'ף�Լ��������ѵ�',
        'ϣ����ĸ���彡��',
        '���ף������ҳ����Ұ�������',
        '���ף���������Զ��Ӣ��',
        'ĸ�ף������ģ��Ҿ�����',
        'ĸ�ף����������ϵ�����',
        '�֣��裬�һ��Ϊ���ǵĽ���',
        '�֣��裬������Ҵ�����ȥ����',
        'ף���ˣ�����ƽ��˳��ϲ������',
        '��Ϊ���㣬�����޾�',
        '�װ��ģ�Ը�������ս��������',
        '�װ��ģ����ǽ���',
        '�װ��ģ������ÿ�춼������',
        '�װ��ģ�Ը���������Ƕ��а�',
        '�װ��ģ��㸺��ò���绨���Ҹ���׬Ǯ����',
        '�װ��ģ��һ���һ���ػ���',
        '�װ��ģ�����Ҫ��Զ��һ��',
        '�¾�������',
        '������ʹ�� �����˼�Ĵ���',
        '������ʹ�� �����������ػ���',
        '����Ӣ�ۣ� ��л������˽����',
        'ҽ���� ������������ʹ',
        'ҽ���� ��л��������ħ����'
    ];

    function cutQfY() {
        $qfList.find('li').each(function (idx, ev) {
            $(ev).find("span").text(qifuList[getRandom(0, qifuList.length)]);
        });
    }
    cutQfY();
    //�л����� & ��һ��
    $(".change-qifu-btn").on("click", function () {
        $qfList.animate({
            'margin-left': '-.3rem',
            'opacity': 0
        }, 300, function () {
            $qfList.css({
                'margin-left': '.3rem'
            }).delay(100).animate({
                'margin-left': '0',
                'opacity': 1
            })
            cutQfY();
        });
    });

    //get�����
    function getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    // �ð���
    var qfNum = 5684;
    $(".qihang-btn").on("click", function () {
        qfNum++;
        $(".J-qf-num").text(qfNum);
        $('.qifu-text').text(qfNum);
        $(".add-one").show();
        pictureStart(0.70 * maxY, TWEEN.Easing.Quadratic.InOut, 4500);
        setTimeout(function () {
            $(".wrap-2").addClass('active');
        }, 3000);
        setTimeout(function () {
            pictureStart(0.817 * maxY, TWEEN.Easing.Quadratic.InOut, 4500, function () {
                $(".wrap-1").addClass('active');
            });
        }, 7500);
    });

    function upNumber() {
        var num = qfNum - 300,
            $numberText = $('.qifu-text');
        var setTimer = setInterval(function () {
            num += 2;
            $numberText.text(num);
            if (num >= qfNum) clearInterval(setTimer);
        }, 16);
    }

    //�޸� IOS12��΢�� 6.7.4+ ���̲��ص�������
    $('body').on('blur', "input,select,textarea", function () {
        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            setTimeout(() => {
                const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
        }
    })
});
    var hzIdx = 0,//选择的徽章
        tiNum = 1,//当前题目序号
        result = [],//用户所选答案
        gradeList = [],//每一题所得分数，在最后一题完成时计算总分数
        fsz = [4, 3, 2 ,1],//选项id = 1时对应分数 4分,id = 2时对应3分,id = 3时对应2分,id = 4时对应1分
        grade = 0;//总分数
    
    //立即挑战
    function startAnswer(){
        // 已预约，直接进入选择徽章
        nextPageRead(2);
    }

    //选择徽章
    $(".select-hz-list li").on("click", function(){
        var $this = $(this),
            idx = $this.index();
        $this.addClass('active').siblings('li').removeClass("active");
        hzIdx = parseInt(idx)+1;
    });

    //我选好了
    $(".select-ok-btn").on("click", function(){
        if( !hzIdx )return alert('请先选择徽章哦~');
        // $(".part-3").show();
        nextPageRead(3);
        $(".answer-hz-icon").css('background-image', 'url(./ossweb-img/badge_'+hzIdx+'.png)');
        var part4H = $(".poster-dk-wrap").height(),
            bodyH = $("body").height();
        if( part4H > bodyH ){
            $(".poster-dk-wrap").addClass("static");
        }else {
            $(".poster-dk-wrap").addClass("f-middle");
        }
    });

    // 选择答案
    $(".answer-list").on("click", ".select-list .select-item", function(){
        var $this = $(this),
            idx = parseInt( $this.index() ) + 1;
        gradeList[tiNum-1] = fsz[parseInt($this.attr('data-idx')) - 1];//获取当前选项id，用以获取此选项分数
        $this.addClass('active').siblings('.select-item').removeClass('active');
        result[tiNum-1] = idx;
    });

    var $anserList = $(".answer-list .answer-item"),//题目列表
        $tiNum = $(".J-timu-num");//当前题号
    //回到上一题
    function cutPrevTimu(){
        if( tiNum - 1 < 1)return false;//不超出题目数量范围
        tiNum--;
        editTiStatus();//更新当前题目状态
        $anserList.eq(tiNum).css({
            'transform': "translate(-7rem, 10rem) rotate(-40deg)",
            '-webkit-transform': "translate(-7rem, 10rem) rotate(-40deg)"
        });
    }

    //切换下一题
    function cutNextTimu(){
        if(result[tiNum-1]){
            if( tiNum + 1 > 8 ) {
                gameEnd();
                return false;
            }
            tiNum++;
            $anserList.eq(tiNum-1).css({
                'transform': "translate(0, 0) rotate(0deg)",
                '-webkit-transform': "translate(0, 0) rotate(0deg)"
            });
            //进入下一题
            editTiStatus();//更新当前题目状态
        }else {
            // 提示回答此题
            TGDialogS('hdTips');
        }
    }

    //更新当前题目状态
    var $answerPrevBtn = $(".answer-btn-container .prev-btn"),
        $answerNextBtn = $(".answer-btn-container .next-btn"),
        $lookResultBtn = $(".look-result-btn");
    function editTiStatus(){
        $tiNum.text(tiNum);//更新当前题号
        if(tiNum <= 1){
            $answerPrevBtn.hide();
        }else {
            $answerPrevBtn.show();
        }
        if( tiNum >= 8 ){
            $answerNextBtn.hide();
            $lookResultBtn.show();
        }else {
            $answerNextBtn.show();
            $lookResultBtn.hide();
        }
    }

    //答题结算
    function gameEnd(){
        //禁用上一题按钮
        $answerPrevBtn.css('pointer-events', 'none');
        // 计算总分
        var g = 0;
        for(var i = 0;i<gradeList.length;i++){
            console.log(i);
            g += gradeList[i];
        }
        grade = g;
        if(grade<8)grade = 8;
        if(grade>32)grade = 32;
        createResult();//生成结果页
    }

    //结果页
    var msgTextList = [//文案列表
        '提到套路，通常你都是<span>被套路</span>的那个。陌生人面前比较<span>高冷的你</span>，反倒会引起很多人的关注，但是大多数情况，都是<span>别人追你逃</span>的状态，想要追到你可不是件容易的事。所以，奉劝那些想要追你的人多点耐心，才有机会看到你真正可爱的一面，而你也要记得多给别人一些机会噢~',
        '外在条件很不错的你，在爱情的道路上却总是受伤~你在恋爱中<span>温柔、好相处</span>的性格，很容易变成被欺负的一方，想抱抱一直付出的你。有时候，爱情也需要一些<span>技巧</span>，让人知道你的边界。但是在爱情中<span>跌倒又站起来</span>，获得了成长的人，往往才是最后<span>真正幸福</span>的。',
        '我想说，遇见你真是爱情中的<span>小确幸</span>呢。你有种独特的<span>初恋气息</span>，周围的人都会被你的单纯所感染，想在夏日午后的课间，在你桌上放一瓶冰冰的<span>波子汽水</span>。年少时的恋爱，干净的没有一丝杂质，你就是有这种魔力，让恋爱回到<span>最初的模样</span>。',
        '偶尔在网上看到的新鲜小套路，你也会想要在恋爱中进行实践，只可惜你玩起套路来<span>又单纯又可爱，内心耿直</span>的你，说点套路的话，恐怕自己都要脸红尴尬，对方都不忍心拆穿你~也许在恋爱中，<span>没有套路就是最深的套路</span>吧。',
        '这里想为你澄清一下，你并不是故意套路，但有时候<span>乱拳打死老师傅</span>说的就是你。<span>古灵精怪、脑回路清奇</span>的你，时常能让别人掉进你的陷阱，因此你常常能在感情中占据上风，让人<span>又爱又恨</span>。但是被聪明鬼马、懂得分寸的你牵着鼻子走，也未尝不是一种乐趣~',
        '套路是你恋爱中的<span>调味品</span>。和你恋爱的过程充满了小甜蜜、小惊喜，是一定不会无聊的~你骨子里是一个<span>浪漫主义</span>的人，<span>营造氛围</span>的高手，愿意为另一半制造生活中的小情调，烛光晚餐、旅游出行、节日惊喜都是你的<span>拿手好戏</span>。经历过你的小套路，可能很难再爱上别人了~',
        '<span>恋爱小天才</span>说的就是你吧！<span>心思细腻，聪明敏锐</span>的你，从对方的一个动作、一个眼神就能看出他的心思，让人觉得找到了<span>灵魂伴侣</span>。所以即使分开了，你也是一个让前任想起来就辗转难眠的存在。作为感情中天赋异禀的<span>高端玩家</span>，就看你想不想入局开一把游戏了。',
        '大师！快写一本<span>《恋爱千层套路》</span>拯救一下在爱情中迷路的众生吧！在恋爱中<span>如鱼得水</span>的你，不仅对自己的感情<span>经营有道</span>，周围人也时常向你请教感情相关的问题。只是，<span>游刃有余</span>的你，是否也会对过于擅长的领域感到厌倦，反而想要单纯的恋爱呢？',
        ],
        labelList = [//资质
            ['恋爱小白', '拒绝套路'],
            ['恋爱小迷糊', '温柔可爱'],
            ['国民初恋', '善良纯真'],
            ['恋爱萌新', '无招胜有招'],
            ['恋爱精灵', '脑回路清奇'],
            ['恋爱魔术师', '浪漫主义'],
            ['恋爱小天才', '聪明敏锐'],
            ['恋爱大师', '双商在线']
        ];
    /**
     * 分数对应层数
     * msgText的值对应msgTextList数组下标
     * label的值对应labelList下标
     * */ 
    var resultList = [//
        0,0,0,0,0,0,0,0,//前7层不显示层数
        {
            grade: 8,
            msgText: 0,
            plies: 250,
            label: 0,
        },{
            grade: 9,
            msgText: 0,
            plies: 281,
            label: 0,
        },{
            grade: 10,
            msgText: 0,
            plies: 312,
            label: 0,
        },{
            grade: 11,
            msgText: 1,
            plies: 343,
            label: 1,
        },{
            grade: 12,
            msgText: 1,
            plies: 375,
            label: 1,
        },{
            grade: 13,
            msgText: 1,
            plies: 406,
            label: 1,
        },{
            grade: 14,
            msgText: 2,
            plies: 437,
            label: 2,
        },{
            grade: 15,
            msgText: 2,
            plies: 468,
            label: 2,
        },{
            grade: 16,
            msgText: 2,
            plies: 500,
            label: 2,
        },{
            grade: 17,
            msgText: 3,
            plies: 531,
            label: 3,
        },{
            grade: 18,
            msgText: 3,
            plies: 562,
            label: 3,
        },{
            grade: 19,
            msgText: 3,
            plies: 593,
            label: 3,
        },{
            grade: 20,
            msgText: 4,
            plies: 624,
            label: 4,
        },{
            grade: 21,
            msgText: 4,
            plies: 656,
            label: 4,
        },{
            grade: 22,
            msgText: 4,
            plies: 687,
            label: 4,
        },{
            grade: 23,
            msgText: 5,
            plies: 718,
            label: 5,
        },{
            grade: 24,
            msgText: 5,
            plies: 749,
            label: 5,
        },{
            grade: 25,
            msgText: 5,
            plies: 780,
            label: 5,
        },{
            grade: 26,
            msgText: 6,
            plies: 812,
            label: 6,
        },{
            grade: 27,
            msgText: 6,
            plies: 843,
            label: 6,
        },{
            grade: 28,
            msgText: 6,
            plies: 874,
            label: 6,
        },{
            grade: 29,
            msgText: 7,
            plies: 905,
            label: 7,
        },{
            grade: 30,
            msgText: 7,
            plies: 937,
            label: 7,
        },{
            grade: 31,
            msgText: 7,
            plies: 968,
            label: 7,
        },{
            grade: 32,
            msgText: 7,
            plies: 999,
            label: 7,
        },
    ];

    //海报二维码地址
    var url = window.location.href;
    var qrcode = new QRCode('qrcode', {
        text: url,
        width: 210,
        height: 210,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // 生成结果页
    var $nameWrap = $('.J-name-text'),
        $perImg = $(".J-person-img"),
        $pilesWrap = $(".J-plies-text"),
        $wordWrap = $(".J-word-wrap img"),
        $badgeWrap = $(".J-badge-wrap img"),
        $labelList = $(".J-label-list"),
        $msgWrap = $(".J-msg-wrap p");
    function createResult(){
        var pIdx = getRandom(1, 4),//随机人物状态 可为1~4状态，对应当前人物的不同状态
            wordSrc = './ossweb-img/h_'+ hzIdx,//话语
            badgeSrc = './ossweb-img/badge_result_'+ hzIdx +'.png';//徽章
        grade >= 20 ? wordSrc=wordSrc+'_up.png' : wordSrc=wordSrc+'_down.png';
        $perImg.attr("src", './ossweb-img/person_'+hzIdx+'_'+pIdx+'.png');//更新封面
        $pilesWrap.text(resultList[grade].plies);//更新层数
        $wordWrap.attr("src", wordSrc);//更新话语
        $badgeWrap.attr("src", badgeSrc);//更新徽章
        $labelList.each(function(idx, ev){
            $(ev).find(".label-item").eq(0).find('span').text(labelList[resultList[grade].label][0]);
            $(ev).find(".label-item").eq(1).find('span').text(labelList[resultList[grade].label][1]);
        });
        $nameWrap.addClass('hz-'+hzIdx);
        $pilesWrap.parents(".plies-wrap").addClass('hz-'+hzIdx);
        $msgWrap.addClass('hz-'+hzIdx).html(msgTextList[resultList[grade].msgText]);
        $(".code-icon").css("background-image", "url('./ossweb-img/code_icon"+hzIdx+".png')");
        // $(".part-4").show();
        nextPageRead(4);
    }

    //生成海报
    $(".J-create-poster").on("click", function(){
        TGDialogS('posterPop');
        setTimeout(function(){
            dom2img('#poster', {
                ondone: function () {
                    $(".J-psTips-1").show();
                    $(".J-psTips-2").hide();
                    console.log("已生成海报");
                    localStorage.setItem('posterSrc', $(".dom2img-result").attr("src"));
                }
            });
        }, 500);
    });

    //随机数
    function getRandom(min, max){
        var min = parseInt(min-1);
        return Math.ceil( Math.random() * (max-min) + min );
    }
    
    

        var tiNum = 1,//当前题目序号
        result = [],//用户所选答案
        gradeList = [],//每一题所得分数，在最后一题完成时计算总分数
        fsz = [4, 3, 2 ,1],//选项id = 1时对应分数 4分,id = 2时对应3分,id = 3时对应2分,id = 4时对应1分
        grade = 8;//总分数
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
        if( tiNum + 1 > 8 ){//完成答题
            gameEnd();//答题结算
        }else {
            if(result[tiNum-1]){
                tiNum++;
                $anserList.eq(tiNum-1).css({
                    'transform': "translate(0, 0) rotate(0deg)",
                    '-webkit-transform': "translate(0, 0) rotate(0deg)"
                });
                //进入下一题
                editTiStatus();//更新当前题目状态
            }else {
                alert('先回答这一题才能进入下一题哦~');
            }
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
        var g = 8;
        for(var i = 0;i<gradeList.length-1;i++){
            g += gradeList[i];
        }
        grade = g;
        if(grade>32)grade = 32;
        console.log(grade);
        console.log(gradeList);
    }


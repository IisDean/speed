
        var tiNum = 1,//��ǰ��Ŀ���
        result = [],//�û���ѡ��
        gradeList = [],//ÿһ�����÷����������һ�����ʱ�����ܷ���
        fsz = [4, 3, 2 ,1],//ѡ��id = 1ʱ��Ӧ���� 4��,id = 2ʱ��Ӧ3��,id = 3ʱ��Ӧ2��,id = 4ʱ��Ӧ1��
        grade = 8;//�ܷ���
    // ѡ���
    $(".answer-list").on("click", ".select-list .select-item", function(){
        var $this = $(this),
            idx = parseInt( $this.index() ) + 1;
        gradeList[tiNum-1] = fsz[parseInt($this.attr('data-idx')) - 1];//��ȡ��ǰѡ��id�����Ի�ȡ��ѡ�����
        $this.addClass('active').siblings('.select-item').removeClass('active');
        result[tiNum-1] = idx;
    });

    var $anserList = $(".answer-list .answer-item"),//��Ŀ�б�
        $tiNum = $(".J-timu-num");//��ǰ���
    //�ص���һ��
    function cutPrevTimu(){
        if( tiNum - 1 < 1)return false;//��������Ŀ������Χ
        tiNum--;
        editTiStatus();//���µ�ǰ��Ŀ״̬
        $anserList.eq(tiNum).css({
            'transform': "translate(-7rem, 10rem) rotate(-40deg)",
            '-webkit-transform': "translate(-7rem, 10rem) rotate(-40deg)"
        });
    }

    //�л���һ��
    function cutNextTimu(){
        if( tiNum + 1 > 8 ){//��ɴ���
            gameEnd();//�������
        }else {
            if(result[tiNum-1]){
                tiNum++;
                $anserList.eq(tiNum-1).css({
                    'transform': "translate(0, 0) rotate(0deg)",
                    '-webkit-transform': "translate(0, 0) rotate(0deg)"
                });
                //������һ��
                editTiStatus();//���µ�ǰ��Ŀ״̬
            }else {
                alert('�Ȼش���һ����ܽ�����һ��Ŷ~');
            }
        }
    }

    //���µ�ǰ��Ŀ״̬
    var $answerPrevBtn = $(".answer-btn-container .prev-btn"),
        $answerNextBtn = $(".answer-btn-container .next-btn"),
        $lookResultBtn = $(".look-result-btn");
    function editTiStatus(){
        $tiNum.text(tiNum);//���µ�ǰ���
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

    //�������
    function gameEnd(){
        //������һ�ⰴť
        $answerPrevBtn.css('pointer-events', 'none');
        // �����ܷ�
        var g = 8;
        for(var i = 0;i<gradeList.length-1;i++){
            g += gradeList[i];
        }
        grade = g;
        if(grade>32)grade = 32;
        console.log(grade);
        console.log(gradeList);
    }


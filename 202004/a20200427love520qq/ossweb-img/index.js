    var hzIdx = 0,//ѡ��Ļ���
        tiNum = 1,//��ǰ��Ŀ���
        result = [],//�û���ѡ��
        gradeList = [],//ÿһ�����÷����������һ�����ʱ�����ܷ���
        fsz = [4, 3, 2 ,1],//ѡ��id = 1ʱ��Ӧ���� 4��,id = 2ʱ��Ӧ3��,id = 3ʱ��Ӧ2��,id = 4ʱ��Ӧ1��
        grade = 0;//�ܷ���
    
    //������ս
    function startAnswer(){
        // ��ԤԼ��ֱ�ӽ���ѡ�����
        nextPageRead(2);
    }

    //ѡ�����
    $(".select-hz-list li").on("click", function(){
        var $this = $(this),
            idx = $this.index();
        $this.addClass('active').siblings('li').removeClass("active");
        hzIdx = parseInt(idx)+1;
    });

    //��ѡ����
    $(".select-ok-btn").on("click", function(){
        if( !hzIdx )return alert('����ѡ�����Ŷ~');
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
            //������һ��
            editTiStatus();//���µ�ǰ��Ŀ״̬
        }else {
            // ��ʾ�ش����
            TGDialogS('hdTips');
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
        var g = 0;
        for(var i = 0;i<gradeList.length;i++){
            console.log(i);
            g += gradeList[i];
        }
        grade = g;
        if(grade<8)grade = 8;
        if(grade>32)grade = 32;
        createResult();//���ɽ��ҳ
    }

    //���ҳ
    var msgTextList = [//�İ��б�
        '�ᵽ��·��ͨ���㶼��<span>����·</span>���Ǹ���İ������ǰ�Ƚ�<span>�������</span>������������ܶ��˵Ĺ�ע�����Ǵ�������������<span>����׷����</span>��״̬����Ҫ׷����ɲ��Ǽ����׵��¡����ԣ���Ȱ��Щ��Ҫ׷����˶�����ģ����л��ῴ���������ɰ���һ�棬����ҲҪ�ǵö������һЩ������~',
        '���������ܲ�����㣬�ڰ���ĵ�·��ȴ��������~����������<span>���ᡢ���ദ</span>���Ը񣬺����ױ�ɱ��۸���һ�����뱧��һֱ�������㡣��ʱ�򣬰���Ҳ��ҪһЩ<span>����</span>������֪����ı߽硣�����ڰ�����<span>������վ����</span>������˳ɳ����ˣ������������<span>�����Ҹ�</span>�ġ�',
        '����˵�����������ǰ����е�<span>Сȷ��</span>�ء������ֶ��ص�<span>������Ϣ</span>����Χ���˶��ᱻ��ĵ�������Ⱦ�������������Ŀμ䣬�������Ϸ�һƿ������<span>������ˮ</span>������ʱ���������ɾ���û��һ˿���ʣ������������ħ�����������ص�<span>�����ģ��</span>��',
        'ż�������Ͽ���������С��·����Ҳ����Ҫ�������н���ʵ����ֻ��ϧ��������·��<span>�ֵ����ֿɰ������Ĺ�ֱ</span>���㣬˵����·�Ļ��������Լ���Ҫ�������Σ��Է��������Ĳ���~Ҳ���������У�<span>û����·�����������·</span>�ɡ�',
        '������Ϊ�����һ�£��㲢���ǹ�����·������ʱ��<span>��ȭ������ʦ��</span>˵�ľ����㡣<span>���龫�֡��Ի�·����</span>���㣬ʱ�����ñ��˵���������壬����㳣�����ڸ�����ռ���Ϸ磬����<span>�ְ��ֺ�</span>�����Ǳ������������÷ִ����ǣ�ű����ߣ�Ҳδ������һ����Ȥ~',
        '��·���������е�<span>��ζƷ</span>�����������Ĺ��̳�����С���ۡ�С��ϲ����һ���������ĵ�~���������һ��<span>��������</span>���ˣ�<span>Ӫ���Χ</span>�ĸ��֣�Ը��Ϊ��һ�����������е�С����������͡����γ��С����վ�ϲ�������<span>���ֺ�Ϸ</span>�����������С��·�����ܺ����ٰ��ϱ�����~',
        '<span>����С���</span>˵�ľ�����ɣ�<span>��˼ϸ�壬��������</span>���㣬�ӶԷ���һ��������һ��������ܿ���������˼�����˾����ҵ���<span>������</span>�����Լ�ʹ�ֿ��ˣ���Ҳ��һ����ǰ����������շת���ߵĴ��ڡ���Ϊ�������츳������<span>�߶����</span>���Ϳ����벻����ֿ�һ����Ϸ�ˡ�',
        '��ʦ����дһ��<span>������ǧ����·��</span>����һ���ڰ�������·�������ɣ���������<span>�����ˮ</span>���㣬�������Լ��ĸ���<span>��Ӫ�е�</span>����Χ��Ҳʱ��������̸�����ص����⡣ֻ�ǣ�<span>��������</span>���㣬�Ƿ�Ҳ��Թ����ó�������е���룬������Ҫ�����������أ�',
        ],
        labelList = [//����
            ['����С��', '�ܾ���·'],
            ['����С�Ժ�', '����ɰ�'],
            ['�������', '��������'],
            ['��������', '����ʤ����'],
            ['��������', '�Ի�·����'],
            ['����ħ��ʦ', '��������'],
            ['����С���', '��������'],
            ['������ʦ', '˫������']
        ];
    /**
     * ������Ӧ����
     * msgText��ֵ��ӦmsgTextList�����±�
     * label��ֵ��ӦlabelList�±�
     * */ 
    var resultList = [//
        0,0,0,0,0,0,0,0,//ǰ7�㲻��ʾ����
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

    //������ά���ַ
    var url = window.location.href;
    var qrcode = new QRCode('qrcode', {
        text: url,
        width: 210,
        height: 210,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // ���ɽ��ҳ
    var $nameWrap = $('.J-name-text'),
        $perImg = $(".J-person-img"),
        $pilesWrap = $(".J-plies-text"),
        $wordWrap = $(".J-word-wrap img"),
        $badgeWrap = $(".J-badge-wrap img"),
        $labelList = $(".J-label-list"),
        $msgWrap = $(".J-msg-wrap p");
    function createResult(){
        var pIdx = getRandom(1, 4),//�������״̬ ��Ϊ1~4״̬����Ӧ��ǰ����Ĳ�ͬ״̬
            wordSrc = './ossweb-img/h_'+ hzIdx,//����
            badgeSrc = './ossweb-img/badge_result_'+ hzIdx +'.png';//����
        grade >= 20 ? wordSrc=wordSrc+'_up.png' : wordSrc=wordSrc+'_down.png';
        $perImg.attr("src", './ossweb-img/person_'+hzIdx+'_'+pIdx+'.png');//���·���
        $pilesWrap.text(resultList[grade].plies);//���²���
        $wordWrap.attr("src", wordSrc);//���»���
        $badgeWrap.attr("src", badgeSrc);//���»���
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

    //���ɺ���
    $(".J-create-poster").on("click", function(){
        TGDialogS('posterPop');
        setTimeout(function(){
            dom2img('#poster', {
                ondone: function () {
                    $(".J-psTips-1").show();
                    $(".J-psTips-2").hide();
                    console.log("�����ɺ���");
                    localStorage.setItem('posterSrc', $(".dom2img-result").attr("src"));
                }
            });
        }, 500);
    });

    //�����
    function getRandom(min, max){
        var min = parseInt(min-1);
        return Math.ceil( Math.random() * (max-min) + min );
    }
    
    
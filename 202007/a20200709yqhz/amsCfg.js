//��ʼ��
amsCfg_682955 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    682955, //����id
    "fFlowSubmitEnd": function(res){
        globalInfo.user.isFirst = res.sOutValue1;//�״�
        var holdList = res.sOutValue2;
        var jfList = res.sOutValue3;
        var completeNum = res.sOutValue4;//ʣ������
        var cardProgress = res.sOutValue5;//��������
        globalInfo.user.starId = res.sOutValue7;//���Ƿ���
        //var syRet = res.sOutValue8;//����Ӧ��Ҫ
        var fmArray = globalInfo.user.starId.split("_");
        $.each(fmArray,function(k,v){
            $(".card-kh-list li").eq(k).removeClass('card-0').addClass('card-'+v).attr("thisStarId",v);
        });
        if(holdList.split(',')[0] > 0 && holdList.split(',')[1] > 0){
            //��ȡ������װ��ť
            $(".J-start-yy1").unbind().addClass('ylq');
        }

        //res.sOutValue5   mxCard,klCard
        if(res.sOutValue5.split(",")[1] ==  8){
            if(holdList.split(',')[0] == 0){
                $(".J-start-yy1").addClass('btn-scale');
            }
            $("#klCard a").removeClass().addClass("icons btn-lq2 btn-scale t");//��ȡ
            $("#klCard a").click(function(){
                $("#clothesName_first").text('����ǰ����װ(7��)');
                globalInfo.user.getType = 0;
                globalInfo.user.goodsType = 0;
                if(isMSDK()){
                    gpSubmit(316510,686110);//ǰ��
                }else{
                    $("#dh_first").unbind("click").click(function(){
                        gpSubmit(316510,686110);
                    });
                    gpSubmit(316510, 685199);//��ѯ��Ϸ�ǳ�
                }
            });

        }
        if(res.sOutValue5.split(",")[0] ==  3) {
            if(holdList.split(',')[1] == 0){
                $(".J-start-yy1").addClass('btn-scale');
            }
            $("#mxCard a").removeClass().addClass("icons btn-lq2 btn-scale t");//��ȡ
            $("#mxCard a").click(function () {
                globalInfo.user.getType = 0;
                globalInfo.user.goodsType = 1;
                $("#clothesName_first").text('����������װ(7��)');
                if(isMSDK()){
                    gpSubmit(316510, 686127);//����
                }else{
                    $("#dh_first").unbind("click").click(function () {
                        gpSubmit(316510, 686127);//����
                    });
                    gpSubmit(316510, 685199);//��ѯ��Ϸ�ǳ�
                }
            });

        }
        if(res.sOutValue5.split(",")[0] <  3){
            $("#mxCard a").removeClass().addClass("icons btn-wjq t");//δ����
        }
        if(res.sOutValue5.split(",")[1] <  8){
            $("#klCard a").removeClass().addClass("icons btn-wjq t");//δ����
        }
        if(holdList.split(',')[0] > 0){
            $("#klCard a").unbind("click").removeClass().addClass("icons btn-ylq2 btn-hover t");//����ȡ
            $("#ylq_qian").show();
        }
        if(holdList.split(',')[1] > 0){
            $("#mxCard a").unbind("click").removeClass().addClass("icons btn-ylq2 btn-hover t");//����ȡ
            $("#ylq_hou").show();
        }

        if(holdList.split(',')[2] > 0){
            //�ѻ��
            $("#Obtained2").show();//ǰ���ѻ��
            $("#xh_kh_btn").removeAttr("href").hide();
            $("#btn_q_ydh").show();//�Ѷһ�
        }
        if(holdList.split(',')[3] > 0){
            //�ѻ��
            $("#Obtained").show();//�����ѻ��
            $("#xh_mx_btn").removeAttr("href").hide();
            $("#btn_h_ydh").show();//�Ѷһ�
        }
        //ÿ������ȫ�����
        if(holdList.split(',')[4] > 0 && holdList.split(',')[5] > 0 && holdList.split(',')[6] > 0 && holdList.split(',')[7] > 0){
            globalInfo.user.doneTask = true;
        }
        if(holdList.split(',')[4] > 0){
            $("#dayTask1 a").hide();
            $("#dayTask1 i").show();
        }
        if(holdList.split(',')[5] > 0){
            $("#dayTask2 a").hide();
            $("#dayTask2 i").show();
        }
        if(holdList.split(',')[6] > 0){
            $("#dayTask3 a").hide();
            $("#dayTask3 i").show();
        }
        if(holdList.split(',')[7] > 0){
            $("#dayTask4 a").hide();
            $("#dayTask4 i").show();
        }
        if(isMSDK()){
            //��¼��Ϸ�������
            $("#dayTask1 a").hide();
            $("#dayTask1 i").show();
        }
        //��Ƭʣ����
        var jfList_1 =  jfList.split('|');
        $.each(jfList_1,function(k,v){
            if(k>0 && k<12){
                $("#"+'card'+k).text(v.split(" ")[4]);
                $("#"+'card_pop'+k).text(v.split(" ")[4]);
                $("#"+'card_pop_gx'+k).text(v.split(" ")[4]);
            }else if(k == 12){
                $("#surplus").text(v.split(" ")[4]);
            }
        });
        //res.sOutValue4 kh,mx
        $("#kCardNum").text(res.sOutValue4.split(",")[0]);
        $("#kCardNum_floor").text('�Ѽ�����'+res.sOutValue4.split(",")[0]+'��');
        $("#dCardNum").text(res.sOutValue4.split(",")[1]);
        $("#dCardNum_floor").text('�Ѽ������ǿ�'+res.sOutValue4.split(",")[1]+'��');
        $("#klCard p").text('������ȣ�'+ res.sOutValue5.split(",")[1] + '/8');
        $("#mxCard p").text('���ǿ����ȣ�'+ res.sOutValue5.split(",")[0] + '/3');
        if(res.sOutValue4.split(",")[0] >= 4){//ʣ��ںſ�����
            $("#xh_kh_btn").addClass("btn-scale");
        }
        if(res.sOutValue4.split(",")[1] >= 7){//ʣ�����ǿ�����
            $("#xh_mx_btn").addClass("btn-scale");
        }

        //����
        if(milo.request('shareCode') != ""){
            globalInfo.user.shareCode = decodeURIComponent(milo.request('shareCode'));
            gpSubmit(316510,685513);//����
        }else{
            gpSubmit(316510,689191);
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
    }
};
//��ѯ����Ӧ��Ҫ
amsCfg_689191 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    689191, //����id
    "fFlowSubmitEnd": function(res){
        var syRet = res.jData.iRet;
        if(res.jData.iRet == 100001){//�ޱ���Ӧ��Ҫ
            //�״ν���
            if(globalInfo.user.isFirst == 0){
                TGDialogS('pop34');
            }
        }else{
            var i = 0;
            var iCardId,iStarId,vGnickName,imgurl;
            //var tipsNum = syRet.jData.iRet.length;
            $.each(syRet,function(key,val){
                i++;
                iCardId = val['iCardId'];
                iStarId = val['iStarId'];//1��2��3��
                vGnickName = decodeURIComponent(val['vGnickName']);
            });
            $("#tipName").text(cardName[iCardId -1]);
            // var hasNum = $("#"+'card_pop'+iCardId).text();
            // $("#hasNum").text('�յ���'+ vGnickName +'����Ŀ�Ƭ');
            if(iStarId == 0){//δѡ�����
                var random = parseInt(Math.random()*3);//���0~2
                var mxImgList = ['//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_hmh.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_whd.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_wyl.jpg'];
                imgurl = mxImgList[random];
            }else{
                var mxImg = {1:'hmh', 2:'whd', 3:'wyl'};
                imgurl = '//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_kh'+ iCardId +'_'+ mxImg[iStarId] +'.jpg';
            }
            $("#pop31 img").attr("src", imgurl);
            $("#holdTicket").hide();
            TGDialogS('pop31');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};
//�Ѽ���Ƭ
amsCfg_681573 = {
    'iAMSActivityId' : '316510', // AMS���
    'activityId' : '356792', // ģ��ʵ����
    //��ѡ��չ����sData��
    "sData":{},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        if(callbackObj.sMsg== '�̫����~���Ժ�����'){
            alert('�̫����~���Ժ�����');
        }else{
            if(globalInfo.user.doneTask == true){
                TGDialogS('pop5');
            }else{
                TGDialogS('pop4');
            }
        }
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        gpSubmit(316510,682955);//��ʼ��
        var cardName = ipackageIdCard[callbackObj.iPackageId];
        if(callbackObj.iPackageId == '2004489' || callbackObj.iPackageId == '2004490' || callbackObj.iPackageId == '2008903'){
            // ����Ԫ�����ǿ�
            //0 = ����� 1 = ����� 2 = ������
            var fxMxId = {'2004489' : 1, '2004490' : 2, '2008903' : 0};
            var fxMxName = {'2004489' : '�����', '2004490' : '������', '2008903' : '�����'};
            ctrlJs.methods.fxMxcard({id: fxMxId[callbackObj.iPackageId],name: fxMxName[callbackObj.iPackageId]});
        }else{
            // ����Ԫ���ںſ�
            var obj = {
                idx: Card_index[callbackObj.iPackageId], //Ԫ������� �ܹ�8��
                name: cardName, //Ԫ��������
                cardNum:$("#card"+Card_index[callbackObj.iPackageId]).text(),//ʣ��x��
                //src:
            };
            ctrlJs.methods.fxYqCard(obj);

        }
        return;
    }
};
//����������
amsCfg_685513 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    685513, //����id
    "fFlowSubmitEnd": function(res){
        var syRet = res.sOutValue1;
        var iType = res.sOutValue2;
        var syCardId = res.sOutValue3;
        if(syRet == 0){
            if(iType == 1){
                //���ܹ���
                gpSubmit(316510,684788);
            }else if(iType == 2){
                //������Ҫ
                $("#syName").text(cardName[syCardId]);
                gpSubmit(316510,685169);
            }
        }else if(syRet == 100003){//������ȡ�Լ�������
            if(iType == 1){
                TGDialogS('pop12');
            }else{
                TGDialogS('pop15');
            }
        }
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
    }
};
//������
amsCfg_684787 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    684787, //����id
    "fFlowSubmitEnd": function(res){
        gpSubmit(316510,682955);//��ʼ��
        shareCode = res.sOutValue1;
        var shareNum = parseInt(Math.random()*3);//���0~3
        var gxDesc = {
            '�����': '����Ԫ�������ҵ��������󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
            '������': '����Ƥ�����ɡ���󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
            '�����': '��Ҫ����λ����Ҫ��������󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
            '����'  : '����Ԫ�������ҵ��������󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
        };
        if(globalInfo.user.cardId < 9){
            var nowStarId = globalInfo.user.starId.split('_')[globalInfo.user.cardId -1];
            var mxName; //0 = �����    1 = �����     2 = ������
            var shareNum = parseInt(Math.random()*3);//���0~2
            var mxArray = ['�����','�����','������'];
            if(nowStarId == 0){mxName = mxArray[shareNum];}else{mxName = mxArray[nowStarId - 1];}
            var cardName = cardnameArray[globalInfo.user.cardId - 1];
            var gxShareText = [mxName+'����һ�š�'+ cardName +'���������������������ͬ����װ>>',mxName+'�������㣬������¡�'+ cardName +'������ͬ����װ>>',mxName+'������ӣ���������졾'+ cardName +'������ͬ��С����װ>>'];
            globalInfo.share.nowTitle = gxShareText[shareNum];
            globalInfo.share.descript = gxDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }else{
            var mxObj = {9:'�����', 10:'������', 11:'�����'};
            var mxName = mxObj[globalInfo.user.cardId];
            var gxShareText = ['����һ�š�'+ mxName +'�����������������ͬ����װ>>','������¡�'+ mxName +'������һ��ͬ����װԪ������>>','��'+ mxName +'�������㣬һ��Ԫ�������춨����װ>>'];
            globalInfo.share.nowTitle = gxShareText[shareNum];
            globalInfo.share.descript = gxDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }
        if(isMSDK()){
            globalInfo.share.img = globalInfo.shareNormal.imgBase64;
            if(milo.request('appid') == '1106467070'){
                TGDialogS('pop1');
            }else{
                TGDialogS('pop2');
            }
        }else{
            toShare();
            TGDialogS('pop3');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
    }
};
//���ܹ���
amsCfg_684788 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    684788, //����id
    "fFlowSubmitEnd": function(res){
        var iRet = res.sOutValue1;
        var cardId = res.sOutValue2;
        var holdTicket = res.sOutValue3;
        var thisStarId = res.sOutValue4;
        var posterImg;
        if(iRet == 0){
            gpSubmit(316510,682955);//��ʼ��
            $("#tipName").text(cardName[cardId -1]);
            //var hasNum = $("#"+'card_pop'+cardId).text();
            //$("#hasNum").text('�յ����ѵĿ�Ƭ��Ŀǰӵ��'+ hasNum +'��');
            //$("#holdTicket").text('���ջ�������ȡ'+ holdTicket +'��');
            //$("#holdTicket").show();

            if(cardId < 9){
                var mx_name = {0:'whd',1:'hmh',2:'whd',3:'wyl'};
                posterImg = 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_kh'+ cardId +'_'+ mx_name[thisStarId] +'.jpg'
            }else{
                var mx_name = {9:'whd',10:'wyl',11:'hmh'};
                posterImg = 'https://game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_'+ mx_name[cardId] +'.jpg'
            }
            $("#pop31 img").attr("src",posterImg);
            TGDialogS('pop31');
        }else if(iRet == 100003){
            TGDialogS('pop12');
        }else if(iRet == 100008){
            TGDialogS('pop14');
        }else if(iRet == 100009){
            TGDialogS('pop13');
        }else if(iRet == 100010){
            TGDialogS('pop12_url');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
    }
};
//ʹ�÷���
amsCfg_686475 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    686475, //����id
    "fFlowSubmitEnd": function(res){
        //alert('��������Ϊ:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
    }
};
//������Ҫ
amsCfg_686116 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    686116, //����id
    "fFlowSubmitEnd": function(res){
        gpSubmit(316510,682955);//��ʼ��
        shareCode = res.sOutValue1;
        var shareNum = parseInt(Math.random()*3);//���0~3
        var syDesc = {
            '�����': '����Ԫ�������ҵ��������󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
            '������': '����Ƥ�����ɡ���󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
            '�����': '��Ҫ����λ����Ҫ��������󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
            '����'  : '����Ԫ�������ҵ��������󼪴��������Ƕ��Ǻ�ƽ��Ӣ��',
        };
        if(globalInfo.user.cardId < 9){//���
            var nowStarId = globalInfo.user.starId.split('_')[globalInfo.user.cardId -1];
            var mxName;
            var shareNum = parseInt(Math.random()*3);//���0~2
            var mxArray = ['�����','�����','������'];
            if(nowStarId == 0){mxName = mxArray[shareNum];}else{mxName = mxArray[nowStarId - 1];}
            var cardName = cardnameArray[globalInfo.user.cardId - 1];
            var syShareText = ['���ҡ�'+ cardName +'�����������'+ mxName +'һ����ͬ����װ>>','��'+ cardName +'�������������'+ mxName +'�ĳ����Ϸ���ͬ����װ>>','ֻ�'+ cardName +'�������Ҿ��ܴ���'+ mxName +'��ͬ����װ�������>>'];
            globalInfo.share.nowTitle = syShareText[shareNum];
            globalInfo.share.descript = syDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }else{//mx
            var mxObj = {9:'�����', 10:'������', 11:'�����'};
            var mxName = mxObj[globalInfo.user.cardId];
            var syShareText = ['���ҡ�'+ mxName +'������ ����������ͬ����װ>>','��'+ mxName +'������һ�ţ�Ԫ�������춨����װ>>','����һ�š�'+ mxName +'�������Ҿͺ��㴩���¿�Ԫ����װ>>'];
            globalInfo.share.nowTitle = syShareText[shareNum];
            globalInfo.share.descript = syDesc[mxName];
            globalInfo.share.nowUrl = 'http://gp.qq.com/cp/a20200709yqhz/index.html?shareCode='+shareCode;
        }
        if(isMSDK()){
            globalInfo.share.img = globalInfo.shareNormal.imgBase64;
            if(milo.request('appid') == '1106467070'){
                TGDialogS('pop1');
            }else{
                TGDialogS('pop2');
            }
        }else{
            toShare();
            TGDialogS('pop3');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
    }
};
//������Ҫ
amsCfg_685169 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    685169, //����id
    "fFlowSubmitEnd": function(res){
        var iRet = res.sOutValue1;
        var iCardId = res.sOutValue2;
        var iStarId = res.sOutValue3;
        var imgurl;
        if(iRet == 0){
            gpSubmit(316510,682955);//��ʼ��
            if(iStarId == 0){//δѡ�����
                var random = parseInt(Math.random()*3);//���0~2
                var mxImgList = ['//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_hmh.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_whd.jpg','//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_mx_wyl.jpg'];
                imgurl = mxImgList[random];
            }else{
                var mxImg = {1:'hmh', 2:'whd', 3:'wyl'};
                //imgurl = cardImg[iCardId]+'_'+ mxImg[iStarId] +'.png';
                imgurl = '//game.gtimg.cn/images/gp/cp/a20200709yqhz/poster_kh'+ iCardId +'_'+ mxImg[iStarId] +'.jpg';
            }
            $("#syName").text(cardName[iCardId-1]);
            $("#pop31_sy img").attr("src",imgurl);
            TGDialogS('pop31_sy');
        }else if(iRet == 100006){
            TGDialogS('pop13_sy');//��Ҫ�ѱ���Ӧ
        }else if(iRet == 100007){
            TGDialogS('pop14_sy');//������ȡ�Ѵ�����
        }else if(iRet == 100003){
            TGDialogS('pop15');
        }else{
            alert('�����벻��ȷ');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        if(res.sMsg == '��Ƭ����'){
            TGDialogS('pop16');
        }
    }
};
//��ѯ�ǳ�
amsCfg_685199 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316510, //�id
    "iFlowId":    685199, //����id
    "fFlowSubmitEnd": function(res){
        var nickName = decodeURIComponent(res.sOutValue1);
        //alert('��������Ϊ:' + res);
        $("#charName_first").text(nickName);
        $("#charName").text(nickName);
        if(globalInfo.user.getType == 0){
            if(globalInfo.user.goodsType == 0){//ǰ��
                $(".tz-title-text").text('����ǰ����װ');
                $("#pop33_first img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png")
            }else{
                $(".tz-title-text").text('����������װ');
                $("#pop33_first img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png")
            }
            TGDialogS('pop33_first');
        }else{
            if(globalInfo.user.goodsType == 0){//ǰ��
                $(".tz-title-text").text('����ǰ����װ');
                $("#pop33_desc").text("����4�׿ںſ��һ�");
                $("#pop33 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png")
            }else{
                $(".tz-title-text").text('����������װ');
                $("#pop33_desc").text("����7�����ǿ��һ�");
                $("#pop33 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png")
            }
            TGDialogS('pop33');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        $("#charName_first").text('��ǰϵͳ�޽�ɫ');
        $("#charName").text('��ǰϵͳ�޽�ɫ');
        TGDialogS('pop33');
        //alert(res.sMsg);
    }
};
// �齱��ȡ�����ܳ�ʼ��
amsCfg_686110 = amsCfg_686127 = amsCfg_686137 = amsCfg_686143 ={
    'iAMSActivityId' : '316510', // AMS���
    'activityId' : '357016', // ģ��ʵ����
    //��ѡ��չ����sData��
    "sData":{},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        gpSubmit(316510,682955);//��ʼ��
        if(callbackObj.iPackageId == 2017835){
            $("#clothesTime").text('7��');
            $("#prizeName").text(' ����ǰ����װ��7�죩');
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png");
        }else if(callbackObj.iPackageId == 2017828){
            $("#clothesTime").text('7��');
            $("#prizeName").text(' ����������װ��7�죩');
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png");
        }else if(callbackObj.iPackageId == 2017843){
            $("#xh_kh_btn").removeAttr("href").hide();
            $("#btn_q_ydh").show();//�Ѷһ�
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_2.png");
            $("#clothesTime").text('30��');
            $("#prizeName").text('����ǰ����װ��30�죩');
        }else{
            $("#xh_mx_btn").removeAttr("href").hide();
            $("#btn_h_ydh").show();//�Ѷһ�
            $("#pop37 img").attr("src","//game.gtimg.cn/images/gp/cp/a20200709yqhz/lj_tz_1.png");
            $("#clothesTime").text('30��');
            $("#prizeName").text('����������װ��30�죩');
        }
        TGDialogS('pop37');
        return;
    }
};
//���ã���ѯ�Ƿ��Ѿ���
milo.ready(function(){
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function (userInfo) {
                $("#userinfo").html(userInfo.uin);
                //��ȡ��ǰ�ǳ�
                amsCfg_694520.sData.MynickName = userInfo.nickName;

                amsInit(325431, 694368); //��ѯ�Ƿ��Ѱ�

            }, function () {
                LoginManager.login();
            });
        });

    }
);


function checkAMS(id)
{
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userInfo) {




            amsSubmit(325431,id); //ִ��

        }, function () {
            LoginManager.login();  //��¼
        });
    });
}



//��ѯ�Ƿ�󶨵�����
amsCfg_694368={
    type : "query",
    iQueryFlowID:694368,
    service:"wuxia" ,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����

    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

//�ύ�󶨵�����
amsCfg_694367={
    type : "comit",
    needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID:694368,
    service:"wuxia" ,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����
    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

// <input onclick="amsSubmit(325431,694473)" type="button" value="��Ը�齱[694473]" />
// �齱��ȡ�����ܳ�ʼ��
amsCfg_694473 = {
    'iAMSActivityId' : '325431', // AMS���
    'activityId' : '363224', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }

        LotteryManager.alert(callbackObj.sMsg);
    }
};


var wishDetail = {
    '0':'ϣ���¸���Ϧ�ҿ�����ʦ���ˡ�',
    '1':'ϣ��֯Ů����˫���ɵ��֣�������������ˡ�',
    '2':'���������ٻ�֯Ů������Ҫ��ϲȵ��',
    '3':'���¶��ߺ�ͷ��������������~',
    '4':'��Ը���ҵ������Լ����Ҹ���',
    '5':'��������ǹ⣬�Ƚ�ҹ�����Ӹ�Ѥ�á�',
    '6':'ǧ��ȵ������ᣬ�Ͻ���׻᲻�ᡣ',
    '7':'�����ҵ�С���ǣ�������շŹ�����',
    '8':'����ô���ڴ򱾣�����ȵ�ŵ���þ��ˡ�',
    '9':'���ǽ��������¶��ʤȴ�˼䳯ĺ������',
    '10':'ȵ��̫���ˣ��һ�Ҫ��������һ���ӣ�',
    '11':'�㻹���������Ե㹷����������ˡ�',
    '12':'��Ϧ����72���ֶΣ�����72������ʽ��',
    '13':'��������Ϧ��Ҳ����������������',
    '14':'�����б��˵Ļ�ǰ���£�������ķ���������',
    '15':'ţ�ɵ�֯Ů���������㣬���ڵ��㡣',
    '16':'��ϦûԼ����ƽ��š�',
    '17':'�����̸����̸�����������ƴ��䵽�������ϡ�',
    '18':'���Ϊ����ҹ�������ө���������Ϸ��⡣',
    '19':'����ѧϰ����ü����ﲨ������Ը�������'
};

//��Ը
function makeWish()
{
    //��ȡ��Ը������
    var FriNickname = encodeURIComponent($("#FriNickname").html());  //�����ǳ�
    var wishInfo = $("#zfyWrap").html();
    for(var i =0;i<wishDetail.length;i++)
    {
        if(wishDetail[i] == wishInfo)
        {
            var wishID = i;
        }
    }



    amsCfg_694520.sData.FriNickname = FriNickname;
    amsCfg_694520.sData.wishID = wishID;

    checkAMS(694520,0)


}

// <a href="#" onclick="javascript:amsSubmit(325431,694520);">�������� ��Ը -��ť [694520]</a>
//��Ը -��ť [694520]
amsCfg_694520 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694520, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        alert('��������Ϊ:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};




// <a href="#" onclick="javascript:amsSubmit(325431,694370);">�������� ��ʼ�� - ��ѯ�ҵ�Ը�� [694370]</a>
//��ѯ�ҵ�Ը�� [694370]
amsCfg_694370 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694370, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        if(res.iRet == 0)
        {
  //��ȷ���ҵ�Ը�����չʾ��
        }

    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};



// <a href="#" onclick="javascript:amsSubmit(325431,694371);">�������� ��ʼ��-����Ը�� [694371]</a>
//��ʼ��-����Ը�� [694371] checkAMS(694371,0)
amsCfg_694371 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694371, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        // alert('��������Ϊ:' + res);
        // return;
        if(res.iRet == 0)
        {
            var AllWish = res.jData.result;
            var Allstr = '';
            for(var i = 0;i<AllWish.length;i++)
            {
                str += '<li class="xy-'+i+1+'">' +
                    '<div class="bg xy-wrap">' +
                    '<p class="xy-title-name">'+AllWish.nickname+'<br/>@'+AllWish.frinickname+'</p>' +
                    '<p class="xy-msg-text">AllWish.wishInfo</p>' +
                    '<p class="author-msg-text">'+AllWish.area+'<br/>'+AllWish.time+'</p>' +
                    '</div>' +
                    '</li>'
            }
            $("#wish-container").html(str);
        }



    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};




// <a href="#" onclick="javascript:amsSubmit(325431,694488);">�������� ��������Ը�� -��ť [694488]</a>
//��������Ը�� -��ť [694488]
amsCfg_694488 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694488, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        alert('��������Ϊ:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};









//�������ܶ�����
function sort(element){
    for(var i = 0;i<element.length-1;i++) {
        for(var j = 0;j<element.length-i-1;j++){
            if(element[j]>element[j+1]){
                //�Ѵ�����ַŵ�����
                var swap = element[j];
                element[j] = element[j+1];
                element[j+1] = swap;
            }
        }
        console.log(element);
    }
}
// var element = [3,5,1,2,7,8,4,5,3,4];



//������Ϣ��������
function serFriend(FriendSearchArr,serkey)
{
    var vBingo = '';
    if(FriendSearchArr.length>0)
    {
        for(var i =0;i<FriendSearchArr.length;i++)
        {
            //��ȡ��ǰi�µ��ַ��������д���
            var listr = FriendSearchArr[i].friSer;
            if(listr.search(serkey) >=0)
            {
                //ƴ���ַ���
                vBingo +='<li>'+ FriendSearchArr[i].friname +'</li>';
            }
        }
        
        //���б�����ʾ���ݣ�
        $("#serFriend").html(vBingo);
    }

}


//����ȥ��
function newArr(arr){
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                //�����һ�����ڵڶ�����splice����ɾ���ڶ���
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}





// <a href="#" onclick="javascript:amsSubmit(325431,694374);">�������� �����б� -��ť [694374]</a>
var friendListArr = new Array();
var FriendValueArr = new Array(); //���ܶ�����
var FriendSearchArr = new Array(); //����������
var sortFriNameArr = new Array();  //�����ǳ�
var tTopFriend = [0,0,0]; //ǰ��
var sortFriendArr = [];
var tTopFriendName = []; //ǰ��

//�����б� -��ť [694374]
amsCfg_694374 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694374, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        console.log(res.jData);
        if(res.jData.result == '0')
        {
            var friendinfoList = res.jData.friendinfo_list;
            var FriendArr = friendinfoList.split('|');
            if(parseInt(FriendArr[0])>0)
            {
                for(var i=1;i<FriendArr.length-1;i++)
                {
                    friendListArr[i-1] = FriendArr[i].split(' ');  //����һ���µ����飬ԭʼ����תΪ����

                    //������ѯ��������
                    var skey = friendListArr[i-1][2];  //�����ǳ�
                    var sVal = friendListArr[i-1][0] +"*"+friendListArr[i-1][2]; //QQ+�ǳ�
                    var serObj = new Object();
                    serObj.friname = skey;
                    serObj.friSer = sVal;

                    FriendSearchArr[i-1] = serObj;


                    //һ���������ܶ����� + ���ܶȶ�Ӧ�ǳƵ�����
                    sortFriendArr[i-1] = parseInt(friendListArr[i-1][6]);  //ֻ�����ܶȵ�����

                    var nkey = friendListArr[i-1][2]; //�����ǳ�
                    var nval = friendListArr[i-1][6]; //���ܶ�
                    var friObj = new Object();
                    friObj.friname = nkey;
                    friObj.frivalue = nval;

                    sortFriNameArr[i-1] = friObj;


                }
                //�����ҳ�����ǰ�������ܶ�
                sort(sortFriendArr);
                var len = sortFriendArr.length;
                if(sortFriendArr.length >3)
                {
                    tTopFriend[0] = sortFriendArr[len-1];
                    tTopFriend[1] = sortFriendArr[len-2];
                    tTopFriend[2] = sortFriendArr[len-3];
                }else{
                    tTopFriend = sortFriendArr;
                }


                //�����������ܶ��Һ����ǳ�

                for(var m=0;m<sortFriNameArr.length;m++)
                {
                    for(var n = 0;n<tTopFriend.length;n++)
                    {
                        if(parseInt(sortFriNameArr[m].frivalue) == tTopFriend[n] )
                        {
                            tTopFriendName[m] = sortFriNameArr[m].nkey;
                        }
                    }

                }
                tTopFriendName = newArr(tTopFriendName);//ȥ��֮��ƴ���ַ���
                var frNamestr = '';
                for(var k=0;k<tTopFriendName.length;k++)
                {
                    frNamestr += '<li>'+tTopFriendName[k]+'</li>'
                }
                $("#FriensName").html(frNamestr);


            }else{
                console.log('��Ǹ�����û�û�к���');
            }



        }





    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};


// <a href="#" onclick="javascript:amsSubmit(325431,694425);">�������� ��ѯ������Ը�� -��ť [694425]</a>

//��ѯ������Ը�� -��ť [694425]
amsCfg_694425 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694425, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        alert('��������Ϊ:' + res);
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};


// <a href="#" onclick="javascript:amsSubmit(325431,694622);">�������� ��Ը���� [694622]</a>
//�ύ������AME
amsCfg_694622 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 325431, //�id
    "iFlowId":    694622, //����id
    "fFlowSubmitEnd": function(res){
        // alert('��������Ϊ:' + res);
        // return;
        if(res.iRet == 0)
        {
            var total = parseInt(res.sOutValue1);
            if(toatal >= 50000)
            {
                $("#total5").removeClass('grey');
            }
            if(toatal >= 100000)
            {
                $("#total4").removeClass('grey');
            }
            if(toatal >= 200000)
            {
                $("#total3").removeClass('grey');

            }
            if(toatal >= 500000)
            {
                $("#total2").removeClass('grey');

            }
        }
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};









//���ã���ѯ�Ƿ��Ѿ���
milo.ready(function(){
        amsInit(325431, 694368);
    }
);


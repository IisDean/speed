
var fnOb = {};
fnOb = {
  isLogin : false, //0 未登录, 1已经登录
  isSubmit: 0,
  gd_file: [],

  upload_file_info: {
    image: [],
    data:{}
  },
  fineId : [

  ],
  apis: {
    get_upload: "/jx3/submitpic200518/get_upload_token",
    submit: "/jx3/submitpic200518/submit",
  },
  ajax: function (o, callback) {
    console.log(o);
    var self = this;
    var t = {
      method: o.method || 'get',
      url: ajaxUrl + o.url,
      data: o.data || {},
      dataType: o.dataType || 'jsonp',
      contentType: o.contentType || 'application/x-www-form-urlencoded',
    };
    console.log(t)
    $.ajax({
      type: t.method,
      url: t.url,
      data: t.data,
      dataType: t.dataType,
      contentType: t.contentType,
      xhrFields: {withCredentials: true},  //跨域需要携带cookie是需要设置
      success: function (data) {
        if (callback) {
          callback(data);
        }

        console.log(data);
      },
      error: function (xhr, type) {
        if (callback) {
          callback({
            code: -505,
            msg: '系统错误，请稍后再试！',
            message: '系统错误，请稍后再试！',
            data: {
              phone: ''
            }
          });
        }
      }
    });
  },
  size: 1024 * 1024, //限制1M

  init: function () {
    XPASS.isLogin(function (name,obj) {
      //登录成功
      fnOb.isLogin = true;
      console.log(name,obj);
    }, function () {
    });
    this.initData();
    this.render();
    this.getFile_id();
  },
  initData: function () {
    this.roomType = $('.roomType a,.roomArea a');
    this.roomType1 = $('.roomType a');
    this.roomArea = $('.roomArea a');
    this.submitA = $('.submitBtm');
    this.Form = $('#indexForm');
    this.blueprintx = $('#blueprintx');
    this.Works = $('#Works');
    this.file = $('#file');
    this.WeiBo = $('#WeiBo');
    this.qqInput = $('#qqInput');

    this.game_n = $('#game_n');
    this.roles_n = $('#roles_n');
  },
  render: function () {
    var self = this;
    this.roomType.click(function () {
      $(this).addClass('on').siblings().removeClass('on');
    });
  },

  upFile:function(){
    //引入Plupload 、qiniu.js后

  },
  getFile_id: function(){
    var self = this;
    //图片上传
    $("#imgFile").uploadQiniu({
      btnId: 'imgFile',                 //上传按钮ID 注意没有#号
      ajaxUrl: 'http://test.ws.xoyo.com/jx3/submitpic200518/get_upload_token?type=1',  //请求上传token的url
      domain: 'http://7xq4h6.com1.z0.glb.clouddn.com', //下载资源用bucket 一般默认这个 后端有特殊要求再设置
      fileSize: '10M',
      filetype: 'jpg,jpeg,gif,png',           //上传类型
      FilesAdded: function (up, files) {
        //登录校验
        if(!fnOb.isLogin){
          up.removeFile(file);
          window.XPASS.signin();
          return;
        }
        //文件校验：类型和size
        var filetypeAllowed = up.getOption().filetype;
        var filesizeAllowed = up.getOption().max_file_size;
        var file = files[0];
        //文件类型校验
        var isAllowedType = false;  //文件是否通过校验
        var filetype = file.type;
        plupload.each(filetypeAllowed.split(','), function (it, ii) {
          console.log(it)
          if (filetype.indexOf(it) > -1) {
            isAllowedType = true;
            return false;
            ;
          }
        });
        if (!isAllowedType) {
          up.removeFile(file);
          OpenDialog('pop4', '上传类型只能是:' + filetypeAllowed);
          $('.pop').addClass('animated fadeIn')
          return;
        }
        //文件大小校验
        if (file.size > 2 * 1024 * 1024) {
          OpenDialog('pop4', '文件大小不能大于:2M');
          $('.pop').addClass('animated fadeIn')
          up.removeFile(file);
          return;
        }
      },
      cbPercent: function ($percent) {
        /*
             * 上传进行时回调
             * $percent 为上传进度百分比
             */
        //以下为demo代码
        $('#upload_p').empty().html($percent + '%');

      },
      uploadComplete: function ($file_info) {
        self.renderImageObj($file_info); //  图片
      },
      fileUploaded: function ($imglink) {
        console.log($imglink);
        self.renderFine($imglink);
        var lenObj = $('.z_photo > div').length;
        if (lenObj > 3) {
          $('.img-box').css('height', 'auto')
        } else {
          $('.img-box').css('height', '144px')
        }
      },
      cbGetTokenError: function (ret) {
        //获取token时报错
        if (ret.code == -10402) {
          window.XPASS.signin();
        }
        else {
          OpenDialog('pop4', ret.message);
        }
      },
      'Error': function (up, err, errTip) {
        //上传出错时,处理相关的事情
        console.log(errTip, 'Error')
        OpenDialog('pop4', errTip);
      }
    });

    //蓝图文件上传
    $("#blueprintx").uploadQiniu({
      btnId:'blueprintx',                 //上传按钮ID 注意没有#号
      ajaxUrl:'http://test.ws.xoyo.com/jx3/submitpic200518/get_upload_token?type=2',  //请求上传token的url
      domain:'http://7xq4h6.com1.z0.glb.clouddn.com', //下载资源用bucket 一般默认这个 后端有特殊要求再设置
      auto_start:true,
      fileSize:'10M',
      filetype: 'blueprintx',           //上传类型
      FilesAdded:function(up,files){
        //登录校验
        if(!fnOb.isLogin){
          up.removeFile(file);
          window.XPASS.signin();
          return;
        }

        //上传文件类型以及大小校验
        var filetypeAllowed = up.getOption().filetype;
        var filesizeAllowed = up.getOption().max_file_size;
        var file = files[0];
        //文件类型校验
        var isAllowedType = false;  //文件是否通过校验
        var filetype = file.type;
        var filename = file.name;
        if(filetype==''){
          filetype = filename.split('.')[filename.split('.').length-1];
        }
        plupload.each(filetypeAllowed.split(','),function (it,ii) {
          if(filetype.indexOf(it)>-1){
            isAllowedType = true;
            return false;
          }
        });
        if(!isAllowedType){
          up.removeFile(file);
          OpenDialog('pop4','上传类型只能是:'+filetypeAllowed);
          $('.pop').addClass('animated fadeIn')
          return;
        }

        //文件大小校验
        if(file.size>2*1024*1024){
          up.removeFile(file);
          OpenDialog('pop4','文件大小不能大于:2M');
          $('.pop').addClass('animated fadeIn')
          return;
        }

      },
      cbBeforeup: function(){  //上传前回调
      },
      cbPercent: function($percent){
        /*
         * 上传进行时回调
         * $percent 为上传进度百分比
         */
        //以下为demo代码
        $('#upload_p').empty().html($percent + '%');
      },
      uploadComplete:function ($file_info) {
        console.log($file_info);
        self.refreshUploadFileObj($file_info); //  文件
        OpenDialog('pop4','上传成功');
      },
      fileUploaded: function ($imglink) {
        console.log($imglink);
      },
      cbGetTokenError:function(ret){
        //获取token时报错
        console.log(ret,'error cbGetTokenError')
        if(ret.code==-10402){
          window.XPASS.signin();}
        else{
          OpenDialog('pop4',ret.message);
        }
      },
      'Error': function (up, err, errTip) {
        //上传出错时,处理相关的事情
        console.log(errTip,'Error')
        OpenDialog('pop4',errTip);
      }
    });
  },
  //拿到file_id以后的处理-图片
  renderImageObj: function($file_info) {
    var lenObj = $('.z_photo > div');
    if($file_info){
      $file_id = $file_info.file_id;
        // $file_link = $file_link.
    }
    //向dom元素中添加data-id属性

    var fileId = this.gd_file;
    fileId.push($file_id);
    for (var i = 0; i < fileId.length; i++) {
      lenObj.eq(i).attr('data-id', fileId[i]);
      lenObj.eq(i).attr('data-index', i);
    }
    fnOb.refreshUploadImageInfo();
  },
  //拿到file_id以后的处理-蓝图文件,以及全局变量中的存储蓝图文件file_id的数据
  refreshUploadFileObj: function($file_info) {
    console.log($file_info);
    if($file_info) {
      $file_id = $file_info.file_id;
      $('#blueprintx').attr('data-id',$file_id);
      fnOb.upload_file_info.data.file_id = $file_id;
    }
  },
  //得到dom元素中的data-img属性,以及全局变量中的存储image的file_id的数据
  refreshUploadImageInfo: function() {
    fnOb.upload_file_info.image = [];
    var dataId = null;
    $('.z_photo > div').each(function (index,item) {
      dataId = $(this).attr("data-id");
      fnOb.upload_file_info.image.push({type: (index==0?2:1), file_id: dataId});
    });
    console.log(fnOb.upload_file_info)
  },
  //上传成功后渲染房屋图片
  renderFine: function($imglink){
    var $section = '' +
      '<div class="up-section fl loading">' +
      ' <span class="up-span"></span>' +
      ' <img class="close-upimg" src="./assets/images/close.png">' +
      ' <img class="up-img" src="'+$imglink+'" />' +
      ' <input name="taglocation" value="" type="hidden" /><span class="coverFm">设为封面</span>' +
      ' <div class="fxBtm"><a href="javaScript:;" class="a-fl sur"></a><a href="javaScript:;" class="a-fr sur"></a></div>' +
      '</div>';
    $(".z_photo").append($section);
  },
  //判断各个条件是否满足
  isCondition: function(){

    //判断房型和和面积
    if (!this.roomType1.hasClass('on') ){
      OpenDialog('pop4','请选择房型');
      return false
    }

    if (!this.roomArea.hasClass('on') ) {
      OpenDialog('pop4','请选择房型面积');
      return false
    }

    // 判断是否填写作品标题
    if (this.Works.val() === '' ) {
      OpenDialog('pop4','请填写作品标题');
      return false;
    }

    //判断是否上传房屋图片
    if ($('.z_photo > div').length <= 0){
        OpenDialog('pop4','请上传房屋图片');
        return false;
    }else if ($('.z_photo > div').length < 6 || $('.z_photo > div').length > 9){
        OpenDialog('pop4','请上传6-9张图片');
        return false;
    }

    //判断file是否上次文件
    console.log(this.upload_file_info)
    if (!this.upload_file_info.data.file_id){
      OpenDialog('pop4','请上传蓝图文件');
      return false;
    }

    //判断是否填写微博
    if(this.WeiBo.val() === ''){
      OpenDialog('pop4','请填写微博');
      return false;
    }
    //判断是否填写qq
    if (this.qqInput.val() === ''){
      OpenDialog('pop4','请填写QQ');
      return false;
    }

    //判断奖励账号是否选取
    this.zhBox = $('.xsj-jx3-server-list');
    if (this.zhBox.find('.J_serverNameGlobalList').val() === "==请选择所在大区=="){
      OpenDialog('pop4','请选择奖励账号的所在大区');
      return false;
    }
    if (this.zhBox.find('.J_serverAreaGlobalList').val() === "==请选择所在服=="){
      OpenDialog('pop4','请选择奖励账号的所在服');
      return false;
    }

    //判断是否填写游戏账号
    if (this.game_n.val() === '') {
      OpenDialog('pop4','请填写游戏账号');
      return false;
    }
    //判断填写了角色名
    if (this.roles_n.val() === '') {
      OpenDialog('pop4','请填写角色名');
      return false;
    }

    //房屋地址
    this.zhBox1 = $('.xsj-jx3-server-list1');

    //房屋地址所在线
    this.room_line = $('#room_line');

    //房屋所在小区
    this.room_community = $('.small_qu');

    //房屋地址所在房号
    this.room_number = $('#room_number');
    return true;
  },
  ajaxFn:function (captchaObj){
    console.log(captchaObj);
    var self = this;
    var data = {
      room_type: $('.roomType a.on').attr('data-val'),
      title: self.Works.val(),
      room_area:$('.roomArea a.on').attr('data-val'),
      weibo_nickname: self.WeiBo.val(),
      qq: self.qqInput.val(),
      prize_zone_name: self.zhBox.find('.J_serverNameGlobalList').val(),
      prize_server_name: self.zhBox.find('.J_serverAreaGlobalList').val(),
      prize_account: self.game_n.val(),
      prize_role_name: self.roles_n.val(),
      room_zone_name: self.zhBox1.find('.J_serverNameGlobalList').val(),
      room_server_name: self.zhBox1.find('.J_serverAreaGlobalList').val(),
      room_community: self.room_community.val(),
      room_line: self.room_line.val(),
      room_number: self.room_number.val(),
      upload_file_info: self.upload_file_info,
      geetest_challenge: captchaObj.getValidate().geetest_challenge,
      geetest_validate: captchaObj.getValidate().geetest_validate,
      geetest_seccode: captchaObj.getValidate().geetest_seccode,

    }
    var options = {
      url: self.apis.submit+'?'+decodeURI(Qs.stringify(data)),
      data:{}
    };

    this.ajax(options,function (data) {
      console.log(data);
      if(data.code==1) {
        OpenDialog('pop4', '上传成功！');
        setTimeout(function () {
          location.href = '//jx3.xoyo.com/';
          closeDialog();
        }, 1200)
      }else{
        OpenDialog('pop4', '上传失败！'+data.message);
      }
    });
  },
};

$(function () {
  fnOb.init();

  //删除图片
  $('.z_photo').on('click','.close-upimg',function () {
    OpenDialog('pop2');
    var $item = $(this).parents('.up-section');
    var $z_file = $('.z_file');
    //确定删除
    $("#pop2").one('click','.wsdel-ok',function () {
      $($item).remove();
      closeDialog();
      // 移动完成以后更新file_info中的image数组
      fnOb.refreshUploadImageInfo();
    });
  });
  //设为封面
  $('.z_photo').on('click','.coverFm',function () {
    var obj = this;
    var $section = $(obj).parents('.up-section');//找到该section
    var $firstSection = $('.up-section').eq(0);
    OpenDialog('pop1');
    //确定设为封面
    $('#pop1').one('click','.check-ok',function(){
      if($section.index()>0){
        $section.insertBefore($firstSection);
      }
      closeDialog();
    });
  });
  //向左移动
  $('.z_photo').on('click','.fxBtm .a-fl',function () {
    var obj = this;
    var $section = $(obj).parents('.up-section');//找到该section
    var $sectionIndx = $section.index();
    var $section_prev = $section.prev();//获得匹配元素中每个元素紧邻的前一个同胞元素
    if($sectionIndx==0){
      OpenDialog('pop4','已经是第一张了，不可再移动了');
      return;
    }
    //向前移动
    $section_prev.insertAfter($section);//在被选元素之后插入 HTML 标记或已有的元素
    // if ($section_prev.length > 0) {
    //   parentpre.insertAfter(parenttr);//在被选元素之后插入 HTML 标记或已有的元素
    // } else {
    //   $('.z_photo').append(parenttr);
    // }
    // 移动完成以后更新file_info中的image数组
    fnOb.refreshUploadImageInfo();
  });
  //向右移动
  $('.z_photo').on('click','.fxBtm .a-fr',function () {
    var obj = this;
    var $section = $(obj).parents('.up-section');//找到该section
    var $section_next = $section.next();//查找每个段落的下一个同胞元素
    var $sectionIndx = $section.index();
    if($sectionIndx==$('.up-section').length-1){
      OpenDialog('pop4','已经是最后一张了，不可再移动了');
      return;
    }
    $section_next.insertBefore($section);//被选元素之前插入 HTML 标记或已有的元素
    // 移动完成以后更新file_info中的image数组
    fnOb.refreshUploadImageInfo();

    // if (parentpre.length > 0) {
    //   $section_next.insertBefore($section);//被选元素之前插入 HTML 标记或已有的元素
    //   //  $.post('/Text/common.ashx', {  }, function(d) {})//这里可以触发ajax更新数据库中的排序号
    // } else {
    //   //往ul的开头添加当前dom
    //   parenttr.prependTo('.z_photo')
    // }
  });






  var handler = function (captchaObj) {
    captchaObj.onReady(function () {
    }).onSuccess(function () {
      fnOb.ajaxFn(captchaObj);
      closeDialog();
      return;

      // 提价前先弹出扫码
      OpenDialog('pop3');

      $('.Neglect').one('click',function(){
        //暂不注册
        fnOb.ajaxFn(captchaObj);
        closeDialog();
      });
      $('.complete').one('click',function(){
        //我已注册
        fnOb.ajaxFn(captchaObj);
        closeDialog();
      });
    });
    $('.submitBtm').click(function () {
        if(fnOb.isLogin){
          if (fnOb.isCondition()) {
            captchaObj.verify();
          }
        }else{
          window.XPASS.signin();
        }
    })
    // 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
  };

  $.jiyanPublic({
    jiyanCallback:function (yzType,captchaObj) {
      handler(captchaObj);
    }
  });




  //埋点DEMO start
  $('.J_tongjiBtn').on('click', function () {
    var eventName = $(this).attr('data-eventName'),
      eventDesc = $(this).attr('data-eventDesc');
    window.stReportGlobal023MultiProps({eventName: eventName, eventDescription: eventDesc});
  });

  $('.J_loginBtn').on('click', function () {
    window.XPASS.signin()
  });



  $('.xsj-jx3-server-list').jx3SeverSelect({
    domName:'.xsj-jx3-server-list',
    isAreaInfo:true, //如果为true就显示区的信息 不设置就只显示服务器
    onStart:function () {   //DOM拼装完毕时 回调(用于修改DOM结构和文字)

    },
    serverInfoCallback: function($areaName,$areaId,$serverName,$serverId){
      console.log($areaName)
      console.log($serverName)
    }
  });
  $('.xsj-jx3-server-list1').jx3SeverSelect({
    domName:'.xsj-jx3-server-list1',
    isAreaInfo:true, //如果为true就显示区的信息 不设置就只显示服务器
    onStart:function () {   //DOM拼装完毕时 回调(用于修改DOM结构和文字)

    },

    serverInfoCallback: function($areaName,$areaId,$serverName,$serverId){
      console.log($areaName)
      console.log($serverName)
    }
  });
});

//图像上传
function selectImg(file) {
    if (!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    console.log(reader);
    reader.onload = function (evt) {
        var replaceSrc = evt.target.result;

        //更换cropper的图片
        $('#tailoringImg').cropper('replace', replaceSrc, false);//默认false，适应高度，不失真
    }
    reader.readAsDataURL(file.files[0]);
}

//cropper图片裁剪
$('#tailoringImg').cropper({
    aspectRatio: 1 / 1,//默认比例
    preview: '.previewImg',//预览视图
    guides: false,  //裁剪框的虚线(九宫格)
    autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    movable: false, //是否允许移动图片
    dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true,  //是否允许移动剪裁框
    resizable: true,  //是否允许改变裁剪框的大小
    zoomable: false,  //是否允许缩放图片大小
    mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
    rotatable: true,  //是否允许旋转图片
    crop: function (e) {
        // 输出结果数据裁剪图像。
    }
});

//关闭裁剪框
function closeTailor() {
    $(".tailoring-container").toggle();
}

var delParent;
var defaults = {
    fileType: ["jpg", "png"],   // 上传文件的类型
    fileSize: 1024 * (1024 * 2)       // 上传文件的大小 2M
};
/*点击图片的文本框*/
var LenFile = null;
// $(".file").change(function () {
//     var idFile = $(this).attr("id");
//     var file = document.getElementById(idFile);
//     var imgContainer = $(".z_photo"); //存放图片的父亲元素
//     var fileList = file.files; //获取的图片文件
//     var numUp = imgContainer.find(".up-section").length;
//     var totalNum = numUp + fileList.length;  //总的数量
//     LenFile = numUp + fileList.length; //判断用户传入多少图片
//     console.log(fileList);
//     if (totalNum == 4) {
//         $('.img-box').css('height', 'auto')
//     }
//     if (fileList.length > 6 || totalNum > 9) {
//         alert("上传图片数目不可以超过9个");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
//     } else {
//         fileList = validateUp(fileList);
//         //unbind 在页面内触发点击事件，调用了两次js，代码重复执行，
//         $("#sureCut").unbind('click').click(function () {
//             if ($("#tailoringImg").attr("src") == null) {
//                 return false;
//             } else {
//                 var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
//                 var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
//
//                 var $section = $("<div class='up-section fl loading'>");
//                 imgContainer.append($section);
//                 var $span = $("<span class='up-span'>");
//                 $span.appendTo($section);
//
//                 var $img0 = $("<img class='close-upimg'>").on("click", function (event) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                     OpenDialog('pop2')
//                     delParent = $(this).parent();
//                 });
//                 $img0.attr("src", "./assets/images/close.png").appendTo($section);
//                 var $img = $("<img class='up-img'>");
//                 $img.attr("src", base64url);
//                 $img.appendTo($section);
//                 var $p = $("<p class='img-name-p'>");
//                 $p.html(fileList[0].name).appendTo($section);
//                 var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
//                 $input.appendTo($section);
//
//                 var cover = $('<span class="coverFm" onclick=' + 'OpenDialog("pop1")' + '>设为封面</span>');
//                 cover.appendTo($section);
//
//                 var fxClick = $('<div class="fxBtm">' +
//                     '<a href="JavaScript:;" class="a-fl sur" onclick="up(this)"></a>' +
//                     '<a href="JavaScript:;" class="a-fr sur" onclick="down(this)"></a>' +
//                     '</div>');
//                 fxClick.appendTo($section);
//                 //关闭裁剪框
//                 closeTailor();
//             }
//         })
//     }
// });




// function validateUp(files) {
//     var arrFiles = [];//替换的文件数组
//     for (var i = 0, file; file = files[i]; i++) {
//         //获取文件上传的后缀名
//         var newStr = file.name.split("").reverse().join("");
//         if (newStr.split(".")[0] != null) {
//             var type = newStr.split(".")[0].split("").reverse().join("");
//             console.log(type + "===type===");
//             if (jQuery.inArray(type, defaults.fileType) > -1) {
//                 // 类型符合，可以上传
//                 console.log(defaults.fileSize, file);
//                 if (file.size >= defaults.fileSize) {
//                     // alert(file.size);
//                     OpenDialog('pop4')
//                     // alert('您这个"'+ file.name +'"文件大小过大');
//                 } else {
//                     // 在这里需要判断当前所有文件中
//                     $(".tailoring-container").toggle();
//                     arrFiles.push(file);
//                 }
//             } else {
//                 alert('您这个"' + file.name + '"上传类型不符合');
//             }
//         } else {
//             alert('您这个"' + file.name + '"没有类型, 无法识别');
//         }
//     }
//     return arrFiles;
// }




//上传图片排序
//上排序
function up(obj) {
    var parenttr = $(obj).parent().parent();//找到该section
    var parentpre = parenttr.prev();//获得匹配元素中每个元素紧邻的前一个同胞元素
    console.log(parentpre.length);
    if (parentpre.length > 0) {
        parentpre.insertAfter(parenttr);//在被选元素之后插入 HTML 标记或已有的元素
    } else {
        $('.z_photo').append(parenttr);
    }
}

//下排序
function down(obj) {
    var parenttr = $(obj).parent().parent();//找到该li
    var parentpre = parenttr.next();//查找每个段落的下一个同胞元素
    console.log(parentpre.length);
    if (parentpre.length > 0) {
        parentpre.insertBefore(parenttr);//被选元素之前插入 HTML 标记或已有的元素
        //  $.post('/Text/common.ashx', {  }, function(d) {})//这里可以触发ajax更新数据库中的排序号
    } else {
        //往ul的开头添加当前dom

        parenttr.prependTo('.z_photo')
    }
}




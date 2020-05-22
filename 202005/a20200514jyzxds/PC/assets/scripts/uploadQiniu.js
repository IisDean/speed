/**
 * uploadQiniu.js
 *
 * 通用方法类
 *
 * @author 段勤学 <duan831@126.com>
 *
 */
var console = console || {log:function(){return false;}};

(function(){
  $.fn.uploadQiniu = function(options){
    var defaults = {
      btnId:'',      //按钮ID,例如  button 不要加#号
      ajaxUrl:'',    //接口网址，返回的json必须统一格式
      domain:'http://7xq4h6.com1.z0.glb.clouddn.com',   //下载资源用bucket 一般默认这个
      fileSize:'10M',   //最大文件大小默认5M
      swfUrl: 'assets/swf/Moxie.swf', //兼容ie 为本地url
      filetype:'jpg,jpeg,gif,png',  //文件格式，不只是图片，也可以是其他文件类型
      auto_start:true, //默认选择文件后自动上传，若关闭需要自己绑定事件触发上传
      cbBeforeup: function($up, $file){  //上传前回调

      },
      cbPercent: function($percent){    //上传进行时 参数是百分比

      },
      fileUploaded: function($imglink){  //上传成功后 参数为成功后返回的图片路径

      },
      uploadComplete: function($file_id){     //上传完成  file_id回传给后端 用于保存图片信息

      },
      cbGetTokenError:function(ret){

      }
    };
    var sets = $.extend(defaults,options || {});
    var hoverTimer, outTimer;
    var file_info;
    var uploaded = false;

    return $(this).each(function(){
      var el = this;
      var option = {
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: sets.btnId,       //上传选择的点选按钮，**必需**
        uptoken: 'xx',
        upkey:'xx',
        // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: sets.domain,   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: true,  //设置上传文件的时候是否每次都重新获取新的token
        max_file_size: sets.fileSize,           //最大文件体积限制
        flash_swf_url: sets.swfUrl,  //引入flash,相对路径
        max_retries: 2,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        filetype:sets.filetype,
        init: {
          'FilesAdded': function(up, files) {
            //文件限制
            sets.FilesAdded(up,files)
          },
          'BeforeUpload': function(up, file) {
            console.log('BeforeUpload')
            // 每个文件上传前,处理相关的事情
            sets.cbBeforeup(up, file)
          },
          'UploadProgress': function(up, file) {
            // 每个文件上传时,处理相关的事情
            sets.cbPercent(file.percent)
          },
          'FileUploaded': function(up, file, info) {
            console.log('FileUploaded')
            console.log(info);
            // 每个文件上传成功后,处理相关的事情
            // 其中 info 是文件上传成功后，服务端返回的json，形式如
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

            uploaded = true;
            var domain = up.getOption('domain');
            var imgurl = $.parseJSON(info).data.file_link;
            sets.fileUploaded(imgurl);
            file_info = $.parseJSON(info);
            return file_info.data
          },
          'Error': function(up, err, errTip) {
            //上传出错时,处理相关的事情
            // alert(errTip)
          },
          'Start': function (up) {
            console.log('Start');
            $.ajax({
              'url': sets.ajaxUrl,
              'dataType': 'jsonp',
              'success': function ($data) {
                if($data.status*1 > 0){
                  option.uptoken = $data.data.input_values.token;
                  option.upkey = $data.data.input_values.key;
                  up.start();
                  console.log('start ！');
                }else{
                  sets.cbGetTokenError($data)
                  console.log('cant get token ！');
                  // alert($data.message);
                }
              }
            });
          },
          'UploadComplete': function() {
            console.log('UploadComplete')

            //队列文件处理完毕后,处理相关的事情
            console.log(typeof(file_info))
            if(uploaded){
              sets.uploadComplete(file_info.data);
            }

          },
          'Key': function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效

            // var key = "";
            // do something with key here
            // return key
            return option.upkey;
          }

        }
      }
      var Qiniu = new QiniuJsSDK();
      var uploader = Qiniu.uploader(option);

    });

  }
})()
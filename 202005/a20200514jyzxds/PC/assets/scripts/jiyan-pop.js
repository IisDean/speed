
/**
 * register.js
 *
 * lasttime: 201700510-2106
 *
 * @author <duan_qx@126.com>
 *
 * bugfix: 没有使用严格模式，导致function暴露在了全局环境中
 *
 * REGISTERLOGINPUB 对象暴露给全局变量，使其挂载的函数可以在适当的时候在任意地方调用
 */

  $.jiyanPublic = function (options) {
    var defaults = {
      domName: '',      //*必填*/class或者id名，最后把极验框插入这里
      isJizhiArea: false,   //是否 开启极致验证指定弹出区域 此时会把后续验证弹出到以下指定ID的区域内居中显示
      areaJizhiId: null,  //极致验证指定弹出区域 id
      nextWidthJizhi: '260px', //极致验证指定弹出区域 宽度
      ajaxUrl: '//test-ws.xoyo.com/', //接口网址
      // ajaxUrl:'//test.ws.xoyo.com/', //用于测试接口
      // ajaxUrl:'//test-ws.xoyo.com/', //用于测试接口,支持https
      domCodeyzm:[       //登录DOM
        '<style>',
        '.jiyan-public-box .hei-line { height: 44px; line-height: 44px;}',
        '.jiyan-public-box .per60_input { float: left; height: 100%; width: 60%}',
        '.jiyan-public-box .label-style { display: block; position: absolute;left: 30px; top: 0; width: 85%; color: #a9a9a9;}',
        '.jiyan-public-box .input-box { margin: 2px 0; position: relative; z-index: 1; overflow: hidden; background-color:#fff;  width: 99%; border:1px solid #7e7e7e;}',
        '.jiyan-public-box .input-box-jy { border:0 none;}',
        '.jiyan-public-box .input-box input { display: block; padding-left:5px; color:#57a9bb; height: 99%;width: 95%;border:0 none;*height:30px; *line-height: 30px; -webkit-appearance: none;}',
        '.jiyan-public-box .captcha-pr-box { position: relative; float:right; width:38%; background: #82aaff; cursor: pointer;text-align:center; color:#fff; font-size:14px;}',
        '.jiyan-public-box .captcha-pr-box img { display: block; position: absolute; right: 0; bottom: 0; width:100%; height:100%; -webkit-transition:all 0.2s linear 0s;transition:all 0.2s linear 0s}',

        '</style>',
        '<div class="jiyan-public-box J_jiyanConBox" style="display: none;">',
        '<div class="input-box input-box-jy hei-line J_jiyanOkBox" style="display:none">',
        '<div class="J_captchaJiyan">',
        '<p class="J_waitJiyan">正在加载验证码......</p>',
        '</div>',
        '</div>',
        '<div class="input-box hei-line J_putongYzBox" style="display:none">',
        '<div class="per60_input">',
        '<input value="" class="reg-icon J_inputPutongCodeVal" name="" type="text">',
        '</div>',
        '<div class="hei-line captcha-pr-box J_inputPutongCodeBtn">点击获取<img class="J_inputPutongCodeImg" src="//zhcdn01.xoyo.com/xassets/com/pf/register/jsreg/v2/skins/s001/transparent.png"></div>',
        '</div>',
        '</div>'
      ],
      onDomReady:function () {     //DOM拼装完毕时 回调(用于修改DOM结构和文字)

      },
      /**
       * yzType : 'putong','jiyan' 分普通，极致验证两种
       * 如果是极验： captchaObj 就是极验的回调值
       */
      jiyanCallback: function (yzType,captchaObj) {  //回调

      }
    };
    var sets = $.extend(defaults, options || {});
    //注册主体 start
    /**
     * REGISTERLOGINPUB不用var是用于暴露给全局对象，这样可以随时调用它挂载的方式
     */
    return function () {
      var JIYANPUBLICFUNC = {
        init: function () {

          var This = this;
          // this.domInsert();
          this.pre_authModule()
          if (typeof initGeetest === "undefined") {
            if (This.isInclude('//zhcdn01.xoyo.com/xassets/com/pf/xpass/jizhicode/gt.js')) {
            } else {
              this.require_js(
                '//zhcdn01.xoyo.com/',
                'xassets/com/pf/xpass/jizhicode/gt.js'
              );
            }
          }
        },
        require_js: function (domain_name, file_path) {
          var d_name = domain_name || '//zhcdn01.xoyo.com/';
          try {
            var head = document.getElementsByTagName('head').item(0),
              script;
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = d_name + file_path;
            head.appendChild(script);
          } catch (e) {
          }
        },
        domInsert: function () {
          // $(sets.domName).empty().html(sets.domCodeyzm.join(''));
          // sets.onDomReady();      //
          this.pre_authModule();
        },
        isInclude: function (name) {
          var js = /js$/i.test(name);
          var es = document.getElementsByTagName(js ? 'script' : 'link');
          for (var i = 0; i < es.length; i++)
            if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
          return false;
        },
        isPcMobi: function () {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

          if (isAndroid || isiOS) {
            return true;
          } else {
            return false;
          }
        },
        yzStyle: function () {   //极验验证方式 默认pc端（web） 移动端传(h5)  geetest_ctype :
          var This = this;
          if (This.isPcMobi()) {
            return 'h5';
          } else {
            return 'web';
          }
        },
        eventName : function () {
          var This = this;
          if (This.isPcMobi()) {
            return 'touchstart';
          } else {
            return 'click';
          }
        },

        handlerJiyan:function (captchaObj) {
          var This = this;

          // $(sets.domName).find('.J_jiyanConBox').show();
          // captchaObj.appendTo( $(sets.domName).find('.J_captchaJiyan') );
          // captchaObj.onReady(function () {
          //   $(sets.domName).find(".J_waitJiyan").hide();
          // });

          sets.jiyanCallback('jiyan',captchaObj)
        },

        putongVerification:function () {
          var This = this;
          $(sets.domName).find('.J_inputPutongCodeBtn').on(This.eventName(),function () {
            $(sets.domName).find('.J_inputPutongCodeImg').attr('src',
              sets.ajaxUrl + '/core/captcha/create?t=' + Math.random()
            );
          });
          sets.jiyanCallback('putong','')
        },

        pre_authModule: function () { //获取验证方式
          var This = this;
          try {

            $.ajax({
              url: sets.ajaxUrl + 'core/captcha/pre_auth',
              type: 'GET',
              data: {
                geetest_ctype: This.yzStyle()
              },
              dataType: 'jsonp',
              success: function (account) {
                //account = ({"code":1,"message":"","data":{"mode":1,"config":{"success":1,"gt":"9d8e7fc1b0a0c59391a0e227fdb5bda3","challenge":"40a6ef907de22e9166f494be4a94da47","new_captcha":1},"request_id":"25D94F32-80B4-6555-AD21-E5156F8CEA99"}});
                //修改 上线前删除
                if (account.code > 0) {
                  if (account.data.mode === 2) {  //极致模式
                    var _gt = account.data.config.gt;
                    var _challenge = account.data.config.challenge;
                    var _success = account.data.config.success;
                    var _new_captcha = account.data.config.new_captcha;
                    // $(sets.domName).find('.J_jiyanOkBox').show();
                    // console.log(sets)
                    if (sets.isJizhiArea) {
                      console.log(account)
                      if (!sets.areaJizhiId) {
                        alert('如开启极致验证指定区域弹出，请设置指定弹出层区域ID');
                        return;
                      }
                      setTimeout(function(){
                        initGeetest({
                          // 以下配置参数来自服务端 SDK
                          gt: _gt,
                          challenge: _challenge,
                          offline: !_success,
                          new_captcha: _new_captcha,
                          product: "bind", // 产品形式，包括：custom,float,popup
                          width: "100%",
                          next_width: sets.nextWidthJizhi,
                          area: sets.areaJizhiId,
                          bg_color: 'gray'
                        }, This.handlerJiyan)
                      },0);

                    } else {
                      if (typeof initGeetest === "undefined") {
                        console.log('gt.js 引入失败！')
                        if (This.isInclude('//zhcdn01.xoyo.com/xassets/com/pf/xpass/jizhicode/gt.js')) {
                        } else {
                          This.require_js(
                            '//zhcdn01.xoyo.com/',
                            'xassets/com/pf/xpass/jizhicode/gt.js'
                          );
                        }
                      }
                      setTimeout(function(){
                        console.log('进入')
                        initGeetest({
                          // 以下配置参数来自服务端 SDK
                          gt: _gt,
                          challenge: _challenge,
                          offline: !_success,
                          new_captcha: _new_captcha,
                          product: "bind", // 产品形式，包括：float，popup
                          width: "100%",

                        }, This.handlerJiyan)
                      },0);
                    }

                  } else {  //普通验证码模式
                    $(sets.domName).find('.J_jiyanConBox, .J_putongYzBox').show();
                    This.putongVerification();
                  }
                } else {
                  alert(account.message);
                }
              }
            });
          } catch (e) {


          }
        }
      }
      JIYANPUBLICFUNC.init()
    }();
  }



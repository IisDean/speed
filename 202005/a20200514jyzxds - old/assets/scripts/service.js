/*
 * @Created : 201411030930
 * @modify : 0
*/

;(function ($, undefined) {
  $.extend({
    inf: {
      ajaxUrl: "//ws.xoyo.com/jx3/tongren190401/",
      app_url: "//api-game.xoyo.com/jx3-fan-fiction-show/default/",
      //获取音频、图片、视频列表（kind=1-图片，kind=2-音频，kind=3-视频，kind=4-cos，kind=5-手办）
      getWrokList: function getWrokList($params, $fn) {
        var that = this;
        $.ajax({
          url: that.ajaxUrl + "get_works_list",
          type: "GET",
          dataType: "jsonp",
          data: $params,
          success: function success($data) {
            if ($fn) {
              $fn($data);
            }
          }
        });
      },
      getmedia_func: function getmedia_func($params, $fn) {
        var that = this;
        $.ajax({
          url: that.app_url + "getmedia",
          type: "GET",
          dataType: "jsonp",
          data: $params,
          success: function success($data) {
            if ($fn) {
              $fn($data);
            }
          }
        });
      },
      //根据id、kind获取作品详情
      getmediabyid_func: function getmediabyid_func($params, $fn) {
        var that = this;

        $.ajax({
          url: that.app_url + "getmediabyid",
          type: "GET",
          dataType: "jsonp",
          data: $params,
          success: function success($data) {
            if ($fn) {
              $fn($data);
            }
          }
        });
      },
      //点赞
      setpraise_func: function setpraise_func($params, $fn) {
        var that = this;

        $.ajax({
          url: that.app_url + "setpraise",
          type: "GET",
          dataType: "jsonp",
          data: $params,
          success: function success($data) {
            if ($fn) {
              $fn($data);
            }
          }
        });
      },
      //获得栏目的类型信息
      getstyle_func: function getstyle_func($params, $fn) {
        var that = this;

        $.ajax({
          url: that.app_url + "getstyle",
          type: "GET",
          dataType: "jsonp",
          data: $params,
          success: function success($data) {
            if ($fn) {
              $fn($data);
            }
          }
        });
      },
      //时间戳转换
      unixtime: function unixtime($time) {
        var str = new Date(parseInt($time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        return str;
      }
    }
  });

  //公用方法
  $.extend({ pub: {
      masonry_start: function masonry_start() {
        var that = this;
        // var img = $(".item img");
        // var img_count = img.length;

        that.reset_masonry();
      },
      reset_masonry: function reset_masonry() {
        if ($('.item-list').hasClass('masonry')) {
          $(".item-list").masonry('destroy');
        }
        $('.item-list-box').hide();
        // window.errorTips('');
        $(".item-list").imagesLoaded(function () {
          $('.item-list-box').show();
          $(".item-list").masonry({
            itemSelector: '.masonry-brick',
            columnWidth: 300,
            gutterWidth: 10,
            isAnimated: false
          });
        });
      }
    } });
})(jQuery, undefined);
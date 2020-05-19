function getDataByUrl(requestUrl, param, callBack) {
  $.ajax({
    url: requestUrl,
    type: 'GET',
    dataType: 'JSONP',
    data: param,
    success: function success(data) {
      console.log(data);
      switch (data.status) {
        case 1:
          {
            if (callBack && typeof callBack === 'function') {
              callBack(data);
            };

            break;
          }
        case -10204:
          {
            errorTips('您的登录态失效了，请重新登录~');
            window.location.reload();
            break;
          }
        default:
          {
            throw new Error(data.msg);
          }
      }
    },
    error: function error() {
      throw new Error('获取数据失败，requesetUrl:"' + requestUrl + '"');
    }

  });
}

function masonryRender(requestUrl, param, targetSelector, modelSelector, type) {
  getDataByUrl(requestUrl, param, function (data) {
    var list = data.data.my_list ? data.data.my_list : data.data.list;
    if (list) {
      if (list.length === 0) {
        //$('.my-works-group-3').show();
        $(targetSelector + ' .nothing').show();
      } else {
        var renderType = type;
        switch (renderType) {
          case 1 /*我的作品页面-已审核栏目*/
          :
            {
              list.forEach(function (item, index) {
                var itemDom = $(modelSelector).clone(true);
                itemDom.removeClass('model');
                itemDom.show();
                itemDom.find(".my-works-layer-39").attr('src', item.pic_link);
                itemDom.find(".my-works-layer-39").attr('data-work-id', item.id);
                itemDom.find(".id-text").html(item.id);
                itemDom.find(".my-works-layer-44").html(item.name);
                itemDom.find('.my-works-layer-41').hide();
                itemDom.find(".my-works-layer-43").html(item.create_time.split(" ")[0]);
                itemDom.find(".my-works-layer-45 .J_addLikeBtn").attr('data-work-id', item.id);
                itemDom.find(".likeCount").html(item.like);
                $(targetSelector).append(itemDom);
              });
              $(targetSelector).imagesLoaded(function () {
                $(targetSelector).fadeIn(800);
                $(targetSelector).masonry({
                  itemSelector: modelSelector.split('.model')[0],
                  gutterWidth: 20,
                  isAnimated: true,
                  isResizable: true
                });
              });
              break;
            }
          case 0 /*我的作品页面-待审核栏目*/
          :
            {
              list.forEach(function (item, index) {
                var itemDom = $(modelSelector).clone(true);
                itemDom.removeClass('model');
                itemDom.show();
                itemDom.find(".my-works-layer-39").attr('src', item.pic_link);
                itemDom.find(".id-text").html(item.id);
                itemDom.find(".my-works-layer-41").attr('work-id', item.id);
                itemDom.find(".my-works-layer-44").html(item.name);
                itemDom.find(".my-works-layer-43").html(item.create_time.split(" ")[0]);
                itemDom.find(".my-works-layer-45").html('');
                $(targetSelector).append(itemDom);
              });
              $(targetSelector).imagesLoaded(function () {
                $(targetSelector).fadeIn(800);
                $(targetSelector).masonry({
                  itemSelector: modelSelector.split('.model')[0],
                  gutterWidth: 20,
                  isAnimated: true,
                  isResizable: true
                });
              });
              break;
            }
          case -1 /*我的作品页面-不通过栏目*/
          :
            {
              list.forEach(function (item, index) {
                var itemDom = $(modelSelector).clone(true);
                itemDom.removeClass('model');
                itemDom.show();
                itemDom.find(".my-works-layer-39").attr('src', item.pic_link);
                itemDom.find(".my-works-layer-41").attr('work-id', item.id);
                itemDom.find(".my-works-layer-44").html(item.name);
                itemDom.find(".id-text").html(item.id);
                itemDom.find(".my-works-layer-43").html(item.create_time.split(" ")[0]);
                itemDom.find(".my-works-layer-45").html('原因：' + item.reason);
                itemDom.find(".my-works-layer-45").css('color', 'red');
                $(targetSelector).append(itemDom);
              });
              $(targetSelector).imagesLoaded(function () {
                $(targetSelector).fadeIn(800);
                $(targetSelector).masonry({
                  itemSelector: modelSelector.split('.model')[0],
                  gutterWidth: 20,
                  isAnimated: true,
                  isResizable: true
                });
              });
              break;
            }
          case 'work-by-author':
            {
              list.forEach(function (item, index) {
                var itemDom = $(modelSelector).clone(true);
                itemDom.removeClass('model');
                itemDom.show();
                itemDom.find(".my-works-layer-39").attr('src', item.pic_link);
                itemDom.find(".my-works-layer-39").attr('data-work-id', item.id);
                itemDom.find(".id-text").html(item.id);
                itemDom.find(".my-works-layer-44").html(item.name);
                itemDom.find(".my-works-layer-43").html(item.create_time.split(" ")[0]);
                itemDom.find(".likeCount").html(item.like);
                $(targetSelector).append(itemDom);
              });
              $(targetSelector).imagesLoaded(function () {
                $(targetSelector).fadeIn(800);
                $(targetSelector).masonry({
                  itemSelector: modelSelector.split('.model')[0],
                  gutterWidth: 20,
                  isAnimated: true,
                  isResizable: true
                });
              });
              break;
            }
        }
      }
    }
  });
}
const like = (param) => {
  /*点赞*/
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '@@ROOT_ADDRESS_DOMAIN@@/jx3/tongren190418/like',
      dataType: 'jsonp',
      type: 'POST',
      data: {
        works_id: param.works_id
      },
      success: function ($data) {
        if ($data.code === 1) {
          resolve($data);
        } else {
          window.errorTips($data.msg);
          reject($data.msg);
        }

      },
      error: function (error) {
        reject(error.msg);
      }
    })
  })
}

const getLikeList = function () {
  /*本次大赛，daily提供视频源，官网统计点赞数，点赞数和视频源分开请求*/
  return new Promise(function ($return, $error) {
    $.ajax({
      url: '@@ROOT_ADDRESS_DOMAIN@@/jx3/tongren190418/get_like_list',
      dataType: 'jsonp',
      type: 'POST',
      success: function ($data) {
        if ($data.status === 1) {
          $return($data.data.work_like_list);
        } else {
          window.errorTips($data.msg);
          $error($data.msg);
        }

      },
      error: function (error) {
        $error(error.msg);
      }
    })
  })
}

const getVideoList = function (params) {

  /*本次大赛，daily提供视频源，官网统计点赞数，点赞数和视频源分开请求*/
  return new Promise(function ($return, $error) {
    $.ajax({
      url: '@@ROOT_ADDRESS_DOMAIN@@/core/jhdaily/cms_query',
      dataType: 'jsonp',
      type: 'POST',
      data: params,
      success: function ($data) {
        if ($data.status === 1) {
          $return($data)
        } else {
          window.errorTips($data.msg);
          $error($data.msg);
        }

      },
      error: function (error) {
        $error(error.msg);
      }
    })
  })
}

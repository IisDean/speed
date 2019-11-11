'use strict';
var HOST_URI = ''; //请求的host
const app = getApp()
var onOff = true;
// token 用户信息, type 请求url, obj 参数, successfun 成功后处理函数, failfun 失败后处理函数, flag 是否使用application/json;charset=utf-8, showLoading 是否显示加载中
function POST(token, type, obj, successfun, failfun, flag, showLoading) {
  if (!showLoading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }

  function $params(obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
  }

  wx.request({
    url: HOST_URI + type,
    method: 'POST',
    header: {
      'content-type': flag ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded;charset=utf-8',
      'terminal': 2,
      'lz_sso_token': token,
      'versionId': 130
    },
    data: obj,
    success: (data) => {
      if (!showLoading) {
        wx.hideLoading()
      }
      if (data.data.code == 0) {
        //成功
        successfun(data)
      } else {
        // wx.showToast({
        //   title: data.data.msg,
        //   icon: 'loading',
        //   duration: 2000,
        //   mask: true
        // })
        //失败
        failfun(data)
      }
    },
    fail: (data) => {
      wx.showToast({
        title: '请求超时',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
function GET(token, type, obj, successfun, failfun, flag, showLoading) {
  if (!showLoading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
  wx.request({
    url: HOST_URI + type,
    method: 'GET',
    header: {
      'content-type': flag ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded;charset=utf-8',
      'lz_sso_token': token,
      'versionId': 130
    },
    data: obj,
    success: (data) => {
      if (!showLoading) {
        wx.hideLoading()
      }
      if (data.data.code == 0) {
        //成功
        successfun(data)
      } else {
        // wx.showToast({
        //   title: data.data.msg,
        //   icon: 'loading',
        //   duration: 2000,
        //   mask: true
        // })
        //失败
        failfun(data)
      }
    },
    fail: (data) => {
      wx.showToast({
        title: '请求超时',
        icon: 'none',
        duration: 2000
      })
    }
  })
}

module.exports = {
  POST: POST,
  GET: GET
};
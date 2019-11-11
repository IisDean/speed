// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick_name:'社区ID 123456',
    qf: '游戏ID123  ',
    yx_id: '电信区',
    array: ['电信1区', '电信2区', '电信3区', '电信4区'],
    id_arr: ['电信1', '电信2', '电信3', '电信4'],
    avatar: '../../assets/images/test_head.jpeg'
  },
  chooseImage: function(e) {
    console.log(111)
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths[0])
        _this.setData({
          avatar: res.tempFilePaths[0]
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log(e)
    this.setData({
      qf: this.data.array[e.detail.value]
    })
  },
  bindPickerName: function (e) {
    console.log(e)
    this.setData({
      yx_id: this.data.id_arr[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
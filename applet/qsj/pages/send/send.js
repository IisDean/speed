// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: false,
    type: 'img', //图文或视频类型
    successFlag:true, //发表成功或失败
    formats: {},
    showExpression: false,
    emoticon: [
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
      '../../assets/images/img_def.png',
    ],
    imgSrc: [
    ]
  },
  choseBlock: function () {
    //提交发表
    wx.navigateTo({
      url: '/pages/block/block',
    })
  },
  showExpressionFn: function () {
    this.setData({
      showExpression: !this.data.showExpression
    })
  },
  insertImage() {
    console.log(1)
    this.setData({
      showExpression: false
    })
    if (this.data.imgSrc.length == 9) {
      return
    }
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var arr = that.data.imgSrc;
        arr.push(res.tempFilePaths[0])
        that.setData({
          imgSrc: arr
        })
      }
    })
  },
  delImg: function (e) {
    var arr = this.data.imgSrc
    arr.splice(e.currentTarget.dataset.idx, 1)
    this.setData({
      imgSrc: arr
    })
  },
  addExpression: function (e) {
    if (this.data.imgSrc.length == 9) {
      return
    }
    var arr = this.data.imgSrc;
    arr.push(e.currentTarget.dataset.imgurl)
    this.setData({
      imgSrc: arr,
      showExpression: false
    })
  },
  sendFun: function() {
    //提交发表
    this.setData({
      showFlag: true
    })
  },
  hidePop:function() {
    this.setData({
      showFlag: false
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    this.setData({
      type: options.type
    })
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
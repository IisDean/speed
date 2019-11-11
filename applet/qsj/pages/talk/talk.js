// pages/talk/talk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        img:'../../assets/images/test_head.jpeg',
        type: 1, // 1 接受 2 发送
        text: '天聊天聊天聊天聊天聊天聊天聊'
      },
      {
        img: '../../assets/images/test_head.jpeg',
        type: 1, // 1 接受 2 发送
        text: '天聊天聊天聊天聊天聊天聊天聊'
      },
      {
        img: '../../assets/images/test_head.jpeg',
        type: 2, // 1 接受 2 发送
        text: '天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊天聊'
      },
    ]
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function () {
        console.log('在此插入上传图片方法')
      }
    })
  },
  bindConfirm(e){
    console.log(e.detail.value)
    var list = this.data.list
    var obj = {
      img: '../../assets/images/test_head.jpeg',
      type: 2,
      text: e.detail.value
    }
    list.push(obj)
    this.setData({
      list:list,
      inputValue: ''
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar({})
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
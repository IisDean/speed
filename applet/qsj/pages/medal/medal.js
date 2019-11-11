// pages/medal/medal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt: "125",
    eheight: 0,
    show:false,
    showPop: false
  },

  showPopFn:function() {
    this.setData({
      showPop: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let query = wx.createSelectorQuery()
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        query.selectAll('.my_medal').boundingClientRect(rect => {
          let heightAll = 0;
          rect.map((currentValue, index, arr) => {
            heightAll = heightAll + currentValue.height
          })
          this.setData({
            eheight: res.windowHeight - 155
          })
        }).exec();
      }
    })
  },
  showToggleFn:function (){
    this.setData({
      show: !this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获得circle组件
    this.circle = this.selectComponent("#circle1");
    // 绘制背景圆环
    this.circle.drawCircleBg('circle_bg1', 53, 3)
    // 绘制彩色圆环 最后一个值为百分比*2
    this.circle.drawCircle('circle_draw1', 53, 6, 1);
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
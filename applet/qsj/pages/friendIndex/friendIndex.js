// pages/friendIndex/friendIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: false,
    showReport: false,
    showChose: true,
    showLahei: false,
    currentIndex: 3,
    isFriend: false, //是否为好友
    eTop: 0,
    isTop: false
  },
  //点击更多
  showMore: function (e) {
    var that = this;
    // var index = e.currentTarget.dataset.index;
    wx.hideTabBar({})
    that.setData({
      showChose: true,
      more: true,
      // chooseIdx: index
    })
  },
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
      // rect.id      // 节点的ID
      // rect.dataset // 节点的dataset
      // rect.left    // 节点的左边界坐标
      // rect.right   // 节点的右边界坐标
      // rect.top     // 节点的上边界坐标
      // rect.bottom  // 节点的下边界坐标
      // rect.width   // 节点的宽度
      // rect.height  // 节点的高度
      console.log(rect)
      _this.setData({
        eTop: rect.top
      })
    }).exec()
  },
  onPageScroll: function (res) {
    if (res.scrollTop >= this.data.eTop) {
      console.log(1)
      this.setData({
        isTop: true
      })
    } else {
      this.setData({
        isTop: false
      })
    }
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
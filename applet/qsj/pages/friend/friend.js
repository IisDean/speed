// pages/friend/friend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 1,
    show1: true,
    show2: true,
    show3: true,
    show4: true,
    playIndex: null,//用于记录当前播放的视频的索引值
    courseList: [{
      videoUrl: '../../assets/images/test.mp4',//视频路径
      coverUrl: '../../assets/images/test3.jpg', //视频封面图
      duration: '03:00', //视频时长
    }]
  },
  titleClick: function (e) {
    console.log(e.currentTarget.dataset.idx)
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  toggleFold: function(e){
    var idx = e.currentTarget.dataset.show
    console.log(e.currentTarget.dataset.show,this.data[idx])
    switch (idx) {
      case 'show1':
        this.setData({
          show1: !this.data[idx]
        })
        break;
      case 'show2':
        this.setData({
          show2: !this.data[idx]
        })
        break;
      case 'show3':
        this.setData({
          show3: !this.data[idx]
        })
        break;
      case 'show4':
        this.setData({
          show4: !this.data[idx]
        })
        break;
    }
      
  
    console.log(e.currentTarget.dataset.show, this.data[idx])
  },
  videoPlay: function (e) {
    var curIdx = e.currentTarget.dataset.index;
    // 没有播放时播放视频
    if (!this.data.playIndex) {
      this.setData({
        playIndex: curIdx
      })
      var videoContext = wx.createVideoContext('video' + curIdx) //这里对应的视频id
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext('video' + this.data.playIndex)
      if (this.data.playIndex != curIdx) {
        videoContextPrev.pause()
      }
      this.setData({
        playIndex: curIdx
      })
      var videoContextCurrent = wx.createVideoContext('video' + curIdx)
      videoContextCurrent.play()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let query = wx.createSelectorQuery()
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        query.selectAll('.friend').boundingClientRect(rect => {
          let heightAll = 0;
          rect.map((currentValue, index, arr) => {
            heightAll = heightAll + currentValue.height
          })
          this.setData({
            eheight: (res.windowHeight - 74) *2
          })
        }).exec();
      }
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
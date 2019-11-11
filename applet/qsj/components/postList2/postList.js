// components/postList/postList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    playIndex: null,//用于记录当前播放的视频的索引值
    courseList: [{
      videoUrl: '../../assets/images/test.mp4',//视频路径
      coverUrl: '../../assets/images/test3.jpg', //视频封面图
      duration: '03:00', //视频时长
    }],
    more: false,

    showFlag: false,
    showReport: false,
    showChose: true,
    showLahei: false,
    chooseIdx: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
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

  }
})

// pages/postDetail/postDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAll:false,
    more: false,
    showReport: false,
    showChose: true,
    showLahei: false,
    showForm:true,
    autoFocus:false,
    likeIcon:'../../assets/images/post_icon4.png',
    scIcon:'../../assets/images/post_icon6.png',
    likeFlag:'false',
    scFlag: 'false',
    resource: ["../../assets/images/test4.jpg", "../../assets/images/test3.jpg", "../../assets/images/noPost.png", "http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg"
    ],
    resourceObj: [
      {
        img: '../../assets/images/test4.jpg',
        eHeight:300,
        eWidth:605
      },
      {
        img: '../../assets/images/test3.jpg',
        eHeight: 277,
        eWidth: 174
      },
      {
        img: '../../assets/images/noPost.png',
        eHeight: 282,
        eWidth: 197
      },
       {
         img: 'http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg',
        eHeight: 100,
        eWidth: 150
      }
    ]
  },
  imgDetail:function(e) {
    // var imageSize = imageUtil.imageUtil(e)
    console.log(e)
  },
  likeFn:function(){
    if (this.data.likeFlag) {
      this.setData({
        likeIcon: '../../assets/images/post_icon8.png',
        likeFlag: false
      })
    } else {
      this.setData({
        likeIcon: '../../assets/images/post_icon4.png',
        likeFlag: true
      })
    }
   
  },
  scFn: function () {
    if (this.data.scFlag) {
      this.setData({
        scIcon: '../../assets/images/star2.png',
        scFlag: false
      })
    } else {
      this.setData({
        scIcon: '../../assets/images/post_icon6.png',
        scFlag: true
      })
    }

  },
  showToggle:function() {
    this.setData({
      showAll: !this.data.showAll
    })
  },
  showFormFun:function(e) {
    // this.setData({
    //   autoFocus: true
    // })
    wx.navigateTo({
      url: '/pages/senReport/senReport',
    })
  },
  hideFormFun: function (e) {
    this.setData({
      showForm: false
    })
  },
  //前往回复
  goComment:function(e) {
    wx.navigateTo({
      url: '/pages/comment/comment',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //点击更多
  showMore: function (e) {
    var that = this;
    // var index = e.currentTarget.dataset.index;
    wx.hideTabBar({})
    that.setData({
      more: true,
      // chooseIdx: index
    })
  },
  // 点击图片进行大图查看
  LookPhoto: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.resource,
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
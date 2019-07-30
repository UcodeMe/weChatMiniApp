const post = require('../../../assets/urls/post.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobInfo: {},
    recruitmentProcess: ["报名", "匹配", "直推", "派发Offer"],
    url: 'http://qiniu.meefine.com/resource/process_8.html',
    postid: '',
    token: '',
    baseUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = "Bearer" + wx.getStorageSync('Authorization')
    let baseUrl = wx.getStorageSync('baseUrl')
    this.setData({
      postid: options.jobId,
      token: token,
      baseUrl: baseUrl
    })
    this._initJobInfo(options.jobId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * initJOB
   */
  _initJobInfo: function(data) {
    post._get(post.job_info + data).then((res) => {
      this.setData({
        jobInfo: res.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
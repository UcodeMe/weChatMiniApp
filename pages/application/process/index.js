const post = require('../../../assets/urls/post.js');
const user = require('../../../assets/urls/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobInfo: {},
    jobMine:{},
    trackH:"200rpx",
    trackShow:true,
    cvInfor:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postid: options.jobId
    })
    this._initJobInfo(options.jobId)
    this._initJobMine(options.jobId)
    this._initCv()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
       * initJOB
       */
  _initJobInfo: function (data) {
    post._get(post.job_info + data).then((res) => {
      this.setData({
        jobInfo: res.result
      })
    })
  },
  _initJobMine:function(jobId){
    post._get(post.search_job_mine + jobId).then((res) => {
      this.setData({
        jobMine: res.result
      })
    })
  },
  _trackMore:function(){
    this.setData({
      trackH:"auto",
      trackShow:false
    })
  },
  _initCv:function(){
    user._get(user.cv_list).then((res)=>{
      let arr=[]
      arr.push(res.result[0].imageUrl);
      this.setData({
        cvInfor: arr
      })
      console.log(this.data.cvInfor)
    })
  },
  /**
 * 
 * 取消报名
 * 
 */
  _cancelApp:function(){
    post._put(post.cancel_job + this.data.jobInfo.id).then((res)=>{
      wx.showToast({
        title: '取消成功',
        success:function(){
          setTimeout(function(){
            wx.redirectTo({
              url: '/pages/user/straightpush/index'
            })
          },2000)
        }
      })
    }).catch((err)=>{
      wx.showToast({
        title: 'err',
      })
    })
  },
/**
 * 
 * 简历预览
 * 
 */
  _viewFile: function () {
    // wx.downloadFile({
      // url: that.data.docLib.cvInfor[0],
      // success: function (res) {
        // const filePath = []
        // filePath.push(res.tempFilePath)
        wx.previewImage({
          current: this.data.cvInfor,
          urls: this.data.cvInfor,
        })
      // }
    // })
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
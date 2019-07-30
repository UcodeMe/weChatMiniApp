var WxParse = require('../../assets/wxParse/wxParse.js');
const post = require('../../assets/urls/post.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobInfo: {},
    showDownload: true,
    saveIcon: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this._initJobInfo(options.jobId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * initJOB
   */
  _initJobInfo: function(jobId) {
    post._get(post.job_info + jobId).then((res) => {
      WxParse.wxParse('jobDesc', 'html', res.result.jobDesc, this, 5);
      WxParse.wxParse('jobRequirement', 'html', res.result.jobRequirement, this, 5);
      this.setData({
        jobInfo: res.result,
        saveIcon: res.result.collection
      })
    })
  },
  _saveJob: function() {
    let id = this.data.jobInfo.id
    let that = this
    if (that.data.saveIcon) {
      post._put(post.job_uncollect + id).then((rest) => {
        console.log(rest)
        wx.showToast({
          title: '已取消收藏',
          icon: 'none'
        })
        that.setData({
          saveIcon: false
        })
      }).catch((errMsg) => {
        console.log(errMsg)
        wx.showToast({
          title: '取消收藏失败',
          icon: 'none'
        })
      })

    } else {
      post._put(post.job_collect + id).then((rest) => {
        console.log(rest)
        wx.showToast({
          title: '已收藏',
          icon: 'none'
        })
        that.setData({
          saveIcon: true
        })
      }).catch((errMsg) => {
        console.log(errMsg)
        wx.showToast({
          title: '收藏失败',
          icon: 'none'
        })
      })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    var shareObj = {
      title: this.data.jobInfo.jobName,
      // imageUrl: this.data.activitySubject.sharePicUrl,
      path: '/pages/job/detail?jobId=' + this.data.jobInfo.id
    }
    return shareObj
  },
  //网申职位
  _jobRegister: function() {
    wx.pageScrollTo({
      scrollTop: 0
    })
    post._put(post.get_online_job + this.data.jobInfo.id).then((res) => {
      this.setData({
        showDownload: false
      })
      wx.setClipboardData({
        data: res.result.applyUrl,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              wx.hideToast();
              console.log(res.data) // data
              that.setData({
                showDownload: false
              })
            }
          })
        }
      })
    }).catch((errMessage) => {
      wx.showToast({
        title: '网申失败',
        icon: 'none'
      })
    })

  },

  // 关闭网申提示
  _closeDownload: function() {
    this.setData({
      showDownload: true
    })
  }
})
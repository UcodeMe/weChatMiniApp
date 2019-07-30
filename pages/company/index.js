const company = require('../../assets/urls/company.js');
const post = require('../../assets/urls/post.js');
const _date = require('../../assets/js/getdate.js');
var WxParse = require('../../assets/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyLoaded: false,
    jobLoaded: false,
    detailH: 156,
    textdown: true,
    companyInfo: {},
    companyId: '',
    dateInfo: {},
    month: '',
    clickNum: 0,
    sendDate: '',
    publicizeInfo: [],
    jobInfo: {},
    showQrCode: false,
    follow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this._initCompanyInfo(options.companyId)
    this.setData({
      dateInfo: _date._getDate(),
      month: _date._getDate().month[0],
      sendDate: _date._getDate().fullDate[0],
      companyId: options.companyId
    })
    this._initpublicizeInfo()
    this._initCompanyJobs()
    console.log(this.data.dateInfo)
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
   * 初始化公司详情
   */
  _initCompanyInfo: function(companyId) {
    company._get(company.company_info + companyId).then((res) => {
      if (res.result) {
        WxParse.wxParse('companyDesc', 'html', res.result.companyDesc, this, 5);
        console.log(res);
        this.setData({
          companyInfo: res.result,
          follow: res.result.follow,
          companyLoaded: true
        })
      } else {
        wx.showToast({
          title: '不存在的公司',
          icon: 'none'
        })
      }
    })
  },
  _initpublicizeInfo: function() {
    let that = this
    company._get(company.company_publicize + "?companyId=" + that.data.companyId + "&holdDate=" + that.data.sendDate).then((res) => {
      console.log(res)
      that.setData({
        publicizeInfo: res.result
      })
    })
  },
  _initCompanyJobs: function() {
    let that = this
    post._get(post.company_job + "?companyId=" + that.data.companyId + "&pageIndex=1&pageSize=100").then((res) => {
      that.setData({
        jobInfo: res.result,
        jobLoaded: true
      })
    })
  },
  /**
   * 切换日期
   */
  _clickDtae: function(e) {
    console.log(e)
    let index = e.currentTarget.dataset.fulldate
    this.setData({
      clickNum: index,
      month: this.data.dateInfo.month[index],
      sendDate: this.data.dateInfo.fullDate[index]
    })
    this._initpublicizeInfo()
  },
  _showMore: function(e) {
    if (e.currentTarget.dataset.up == 1) {
      this.setData({
        textdown: true,
        detailH: 156
      })
    } else {
      this.setData({
        textdown: false,
        detailH: ''
      })
    }
  },
  //关注企业
  _follow: function() {
    company._put(company.follow_company + this.data.companyId).then((res) => {
      let _companyInfo = this.data.companyInfo
      if (res.success) {
        wx.showToast({
          title: '已关注',
          icon: 'none'
        })
        _companyInfo.follow = true
        this.setData({
          showQrCode: true,
          companyInfo: _companyInfo
        })
      }
    }).catch((errMsg) => {
      wx.showToast({
        title: '关注失败',
        icon: 'none'
      })
    })
  },
  //取消关注企业
  _unFollow: function() {
    company._put(company.un_follow_company + this.data.companyId).then((res) => {
      let _companyInfo = this.data.companyInfo
      if (res.success) {
        wx.showToast({
          title: '已取消关注',
          icon: 'none'
        })
        _companyInfo.follow = false
      }
      this.setData({
        companyInfo: _companyInfo
      })
    }).catch((errMsg) => {
      wx.showToast({
        title: '取消关注失败',
        icon: 'none'
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

  },
  _downloadQrcode: function() {
    wx.downloadFile({
      url: 'http://qiniu4.meefine.com/resource/zhichu_gzh_qrcode.jpg',
      success: function(res) {
        console.log(res)
        //获取相册授权
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '二维码下载完成',
              icon: 'none'
            })
          }
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  _closeMask: function() {
    this.setData({
      showQrCode: false
    })
  }
})
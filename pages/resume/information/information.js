const urls = require('../../../assets/js/urls.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shown: true,
    windowHeight: 0,
    userInfo: {}
  },
  onLoad: function(options) {
  
  },
  onShow: function() {
    var userInfo = wx.getStorageSync("userInfo") || {};
    this.setData({ userInfo: userInfo});
       
  }

  })
const urls = require('../../assets/js/urls.js')
const mta = require('../../assets/js/mta_analysis.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogin: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    mta.Page.init()
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          var myavatarUrl = wx.getStorageInfoSync('myavatarUrl');
          console.log(myavatarUrl);
          if (myavatarUrl){
            that.setData({
              isLogin: false
            });
            wx.showLoading({
              title: '登录中',
              success: function () {
                wx.redirectTo({
                  url: '/pages/passPage/passPage'
                })
              }
            });
          }
        }
      }
    });
  },
  /**
   * 获取微信用户信息
   */
  _bindGetUserInfo: function(e) {
    console.log('get wechat user info')
    console.log(e)
    wx.setStorageSync('myavatarUrl', e.detail.userInfo.avatarUrl);
    if ('getUserInfo:ok' == e.detail.errMsg) {
      //拿到授权用户信息
      var weixinUserInfo = e.detail.userInfo;
      var postData = {
        avatarUrl: weixinUserInfo.avatarUrl,
        gender: weixinUserInfo.gender,
        nickName: weixinUserInfo.nickName
      }
      this._registUserInfo(postData);
    } else {
      wx.showToast({
        title: '~为何获得更好的体验，请允许授权~',
        icon: 'none',
        duration: 3000
      })
    }
  },
  _registUserInfo: function(postData) {
    var that = this
    urls._put(urls.user_perfect_info, postData).then((res) => {
      wx.showToast({
        title: '授权成功',
        duration: 3000,
        success: function() {
          setTimeout(function() {
            wx.redirectTo({
              url: '/pages/passPage/passPage'
            })
          }, 800)
        }
      })
    }).catch((errMsg) => {
      wx.showToast({
        title: 'error',
        icon: 'none'
      })
    })
  }
})
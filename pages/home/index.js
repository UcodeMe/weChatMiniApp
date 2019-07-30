// pages/home/index/index.js
const urls = require('../../assets/js/urls.js');
const activity = require('../../assets/urls/activity.js');
const system = require('../../assets/urls/system.js');
const company = require('../../assets/urls/company.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadComplate: false,
    isLogin: true,
    windowHeight:0,
    swiperBannerImages: [],
    selectionList: [],
    pageIndex: 1,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
    var app = getApp()
    app._getToken().then(res => {
      console.log('start get token=============')
      var that = this
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            var myavatarUrl = wx.getStorageInfoSync('myavatarUrl');
            console.log(myavatarUrl);
            if (myavatarUrl) {
              that.setData({
                isLogin: false
              });
              wx.showLoading({
                title: '登录中',
                success: function() {
                  that._initBanner();
                  that._initSelection(true);
                  that.setData({
                    isLogin: false,
                    loadComplate: true
                  })
                  wx.hideLoading()
                }
              });
            }
          } else {
            that.setData({
              loadComplate: true
            })
          }
        }
      })
    })


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
        gender: weixinUserInfo.gender == 1 ? "MALE" : "FEMALE",
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
      wx.setStorageSync("userInfo", res.result)
      wx.showToast({
        title: '授权成功',
        duration: 2000,
        success: function() {
          that._initBanner();
          that._initSelection(true);
          setTimeout(function() {
            that.setData({
              isLogin: false,
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
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1
    })
    this._initSelection(true);
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._initSelection();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 加载广告位
   */
  _initBanner: function() {
    system._get(system.banner_list, {
      bannerCategory: 'SELECTION'
    }).then((res) => {
      this.setData({
        swiperBannerImages: res.result
      })
    }).catch((errMsg) => {
      wx.showToast({
        title: 'init banner fail',
        icon: 'none'
      })
    })
  },
  // 初始化列表
  _initSelection: function(reload) {
    var that = this
    var param = {}
    if (reload) {
      param = {
        pageIndex: 1,
        pageSize: 10
      }
    } else {
      that.setData({
        pageIndex: that.data.pageIndex + 1
      })
      param = {
        pageIndex: that.data.pageIndex,
        pageSize: 10
      }
    }

    company._get(company.selection_list, param).then((res) => {
      if (res.result.length == 0) return
      // wx.showToast({
      //   title: '没有更多数据',
      //   icon:'none'
      // })

      if (reload) {
        that.setData({
          // pageIndex: 1,
          selectionList: res.result
        })
      } else {
        that.setData({
          // pageIndex: that.data.pageIndex + 1,
          selectionList: that.data.selectionList.concat(res.result)
        })
      }
      // console.log(that.data.selectionList[4].companyInfo.recruitmentProcess.length)
    }).catch((errMsg) => {
      console.log(errMsg)
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    })
  },
})
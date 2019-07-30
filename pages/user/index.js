const urls = require('../../assets/js/urls.js');
const user = require('../../assets/urls/user.js');
const post = require('../../assets/urls/post.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // companyScaleList: [],

    shown: false,
    windowHeight: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    jobHuntingStatus: [{
      data: 'LOOKING_FOR_JOB',
      name: '正在求职'
    }, {
      data: 'IN_PRACTICE',
      name: '正在实习'
    }, {
      data: 'PLAN_FOR_JOB',
      name: '打算求职'
    }, {
      data: 'PLAN_FOR_PRACTICE',
      name: '打算实习'
    }, {
      data: 'WORKING',
      name: '已工作'
    }, ],
    onlineJobStatus: ''
  },
  onLoad: function(options) {
    // this._initCompanyScaleList()
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function() {
    var that = this
    // 这里要延迟1s,不然子页面storage还未写入完成
    setTimeout(function() {
      that._afterSelectRegion()
      that._afterSelectIndustry()
      that._afterSelectPost()
      that._afterSelectCompanyScale()
    }, 100)

    this._initUserInfo()
  },
  _jobfairs: function() {
    wx.showToast({
      title: '功能建设中...',
      icon: 'none'
    })
  },
  /**
   * 更改求职状态
   */
  _jobStatusChange: function(e) {
    console.log(e.detail.value)
    let that = this
    let indx = e.detail.value
    let param = {
      "jobHuntingStatus": that.data.jobHuntingStatus[indx].data
    }
    that.setData({
      onlineJobStatus: that.data.jobHuntingStatus[indx].data
    })
    user._put(user.update_user, param).then((res) => {
      console.log(res)
    })
  },
  _companyScaleChange: function(e) {
    // console.log(e)
    let id = e.detail.value
    this.data.companyScaleList.forEach(function(item) {

    })
  },
  /**
   * 加载用户信息
   */
  _initUserInfo: function() {
    let that = this
    wx.showLoading({
      title: '加载中...'
    });
    urls._get(urls.user_info).then((res) => {
      that.setData({
        userInfo: res.result,
        shown: true,
        onlineJobStatus: res.result.jobHuntingStatus ? res.result.jobHuntingStatus : null
      });
      wx.setStorageSync("userInfo", res.result)
      wx.hideLoading()
    }).catch((errMsg) => {
      wx.hideLoading()
      wx.showToast({
        title: 'error',
        icon: 'none'
      })
    })
  },
  /**
   * 选择地区后
   */
  _afterSelectRegion: function() {
    var that = this
    let _regionId = wx.getStorageSync('my-regionId')
    if (_regionId) {
      user._put(user.update_user, {
        "intentRegionIds": [_regionId]
      }).then((res) => {
        if (res.success) {
          that.setData({
            userInfo: res.result
          }, () => {
            wx.removeStorageSync('my-regionId')
            wx.removeStorageSync('my-regionName')
          })
        } else {
          console.log(res)
          wx.showToast({
            title: '更新意愿工作地点失败'
          })
        }
      })
    }

  },
  _afterSelectIndustry: function() {
    var that = this
    let _industryIds = wx.getStorageSync('industryIds')
    // console.log(_industryIds)
    if (_industryIds) {
      user._put(user.update_user, {
        "intentIndustryIds": _industryIds
      }).then((res) => {
        console.log(res)
        if (res.success) {
          that.setData({
            userInfo: res.result
          }, () => {
            //after set.remove it
            wx.removeStorageSync('industryIds')
          })
        } else {
          console.log(res)
          wx.showToast({
            title: '更新目标行业失败'
          })
        }
      })
    }
  },
  /**
   * 选择岗位后
   */
  _afterSelectPost: function() {
    var that = this
    let _postIds = wx.getStorageSync('postIds')
    console.log(_postIds)
    if (_postIds) {
      post._put(post.intent_post + _postIds).then((res) => {
        console.log(res)
        if (res.success) {
          that._initUserInfo()
          wx.removeStorageSync('postIds')
        } else {
          console.log(res)
          wx.showToast({
            title: '更新意愿岗位失败'
          })
        }
      })
    }
  },
  /**
   * 选择意向企业类型后
   */
  _afterSelectCompanyScale: function() {
    var that = this
    let _companyScaleIds = wx.getStorageSync('companyScaleIds')
    if (_companyScaleIds) {
      user._put(user.update_user, {
        "intentCompanyScaleIds": _companyScaleIds
      }).then((res) => {
        console.log(res)
        if (res.success) {
          that.setData({
            userInfo: res.result
          }, () => {
            wx.removeStorageSync('companyScaleIds')
          })
        } else {
          console.log(res)
          wx.showToast({
            title: '更新目标企业类型失败'
          })
        }
      })
    }
  }
})
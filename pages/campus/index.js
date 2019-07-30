const company = require('../../assets/urls/company.js');
const post = require('../../assets/urls/post.js');
const system = require('../../assets/urls/system.js');
const search = require('../../assets/urls/search.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 10,

    topFixed: false,
    tab: 0,

    regionId: null,
    regionName: '默认',

    swiperBannerImages: [],

    filterCondition: {},
    //推荐
    recommendList: [],
    recommendPageIndex: 1,
    //宣讲会
    publicizeList: [],
    publicizePageIndex: 1,
    //岗位
    jobList: [],
    jobPageIndex: 1,
    //实习
    practiceList: [],
    practicePageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._initBanner()
    this._initRecommendList()
  },
  onShow: function() {
    let _regionId = wx.getStorageInfoSync("campus-regionId")
    let _regionName = wx.getStorageSync("campus-regionName")
    if (_regionId != null && _regionName != null) {
      this.setData({
        regionId: _regionId,
        regionName: _regionName
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onPageScroll: function(e) {
    // console.log(e.scrollTop)
    if (this.data.topFixed) {
      if (e.scrollTop <= 400) {
        this.setData({
          topFixed: false
        })
      }
    } else {
      if (e.scrollTop >= 280) {
        this.setData({
          topFixed: true
        })
      }
    }
  },
  /**
   * 加载广告位
   */
  _initBanner: function() {
    system._get(system.banner_list, {
      bannerCategory: 'CAMPUS_RECRUITMENT'
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










  //推荐
  _initRecommendList: function() {
    let that = this
    that.setData({
      tab: 0
    }, () => {
      that._getRecommendList(true)
    })
  },
  _getRecommendList: function(reload) {
    wx.showLoading({
      title: '加载中...'
    })
    let _pageIndex = reload ? this.data.pageIndex : this.data.recommendPageIndex
    let that = this
    company._post(company.company_info_page + "?pageIndex=" + _pageIndex + "&pageSize=" + this.data.pageSize, this.data.filterCondition).then((res) => {
      if (reload) {
        that.setData({
          recommendList: res.result
        })
      } else {
        that.setData({
          recommendPageIndex: this.data.recommendPageIndex + 1,
          recommendList: that.data.recommendList.concat(res.result)
        })
      }
      wx.hideLoading()
    }).catch((errMsg) => {
      console.log(errMsg)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
      wx.hideLoading()
    })
  },





  _initPublicizeList: function() {
    let that = this
    this.setData({
      tab: 1
    }, () => {
      this._getPublicizeList(true)
    })
  },
  // 宣讲会
  _getPublicizeList: function(reload) {
    wx.showLoading({
      title: '加载中...'
    })
    let _pageIndex = reload ? this.data.pageIndex : this.data.publicizePageIndex
    let that = this
    company._post(company.publicize_list_bypage + "?pageIndex=" + _pageIndex + "&pageSize=" + this.data.pageSize, this.data.filterCondition).then((res) => {
      if (reload) {
        that.setData({
          publicizeList: res.result
        })
      } else {
        that.setData({
          publicizePageIndex: that.data.publicizePageIndex + 1,
          publicizeList: that.data.publicizeList.concat(res.result)
        })
      }
      wx.hideLoading()
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
      wx.hideLoading()
    })
  },







  //招聘会
  _getFairs: function() {
    wx.showToast({
      title: '功能建设中...',
      icon: 'none'
    })
  },


  /**
   * 岗位
   */
  _initJobList: function() {
    this.setData({
      tab: 2
    }, () => {
      this._getJobList(true)
    })
  },
  _getJobList: function(reload) {
    wx.showLoading({
      title: '加载中...'
    })
    let _pageIndex = reload ? this.data.pageIndex : this.data.jobPageIndex
    let that = this
    let _jobCondition = Object.assign({
      pageIndex: _pageIndex,
      pageSize: this.data.pageSize,
      jobNature: 'FULL_TIME'
    }, this.data.filterCondition)
    search._post(search.job_search, _jobCondition).then((res) => {
      if (reload) {
        that.setData({
          jobList: res.result
        })
      } else {
        that.setData({
          jobPageIndex: that.data.jobPageIndex + 1,
          jobList: that.data.jobList.concat(res.result)
        })
      }
      wx.hideLoading()
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
      wx.hideLoading()
    })
  },







  /**
   * 实习
   */
  _initPracticeList: function() {
    this.setData({
      tab: 3
    }, () => {
      this._getPracticeList(true)
    })
  },
  _getPracticeList: function(reload) {
    wx.showLoading({
      title: '加载中...'
    })
    let _pageIndex = reload ? this.data.pageIndex : this.data.jobPageIndex
    let that = this
    let _practiceConditon = Object.assign({
      pageIndex: _pageIndex,
      pageSize: this.data.pageSize,
      jobNature: "INTERNSHIP"
    }, this.data.filterCondition)
    search._post(search.job_search, _practiceConditon).then((res) => {
      if (reload) {
        that.setData({
          practiceList: res.result
        })
      } else {
        that.setData({
          practicePageIndex: that.data.practicePageIndex + 1,
          practiceList: that.data.practiceList.concat(res.result)
        })
      }
      wx.hideLoading()
    }).catch((err) => {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
      wx.hideLoading()
    })
  },




  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    let that = this
    let tab = that.data.tab
    if (tab == 0) {
      that._getRecommendList(false)
      return
    }
    if (tab == 1) {
      that._getPublicizeList(false)
      return
    }
    if (tab == 2) {
      that._getJobList(false)
      return
    }
    if (tab == 3) {
      that._getPracticeList(false)
      return
    }
  },
  _scrollToTop: function() {
    console.log("scroll page to top.")
    var that = this
    if (this.data.topFixed) return
    wx.pageScrollTo({
      scrollTop: 300,
      duration: 400
    })
  },
  _doFilter: function(e) {
    console.log("do filter params=↓↓↓↓")
    console.log(e.detail)
    let that = this
    //推荐

    this.setData({
      filterCondition: e.detail
    }, () => {
      if (this.data.tab == 0) {
        that._initRecommendList()
      } else if (this.data.tab == 1) {
        that._initPublicizeList()
      } else if (this.data.tab == 2) {
        that._initJobList()
      } else if (this.data.tab == 3) {
        that._initPracticeList()
      }
    })



  }
})
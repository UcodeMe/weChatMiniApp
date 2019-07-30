const urls = require('../../../assets/js/urls.js');
const post = require('../../../assets/urls/post.js');
const search = require('../../../assets/urls/search.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noSearchData: false,

    regionName: null,
    
    tabIndex: 0,
    pageSize: 10,

    jobPageIndex: 1,
    jobDataList: [],

    publicizePageIndex: 1,
    publicizeList: [],

    searchText: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.searchText) {
      this.setData({
        searchText: options.searchText
      })

      var searchBar = this.selectComponent("#searchBar")
      searchBar.setData({
        inputText: options.searchText
      })
    }
  },
  onReady: function() {
    this._loadList(false)
  },
  onReachBottom: function() {
    this._loadList()
  },
  _doSearch: function(e) {
    this.setData({
      searchText: e.detail.searchText
    })
    this._loadList(true)
  },
  /**
   * 切换swiper
   */
  _switchSwiper: function(event) {
    var _tabIndex = event.detail.tabIndex
    this.setData({
      tabIndex: _tabIndex
    })
    this._loadList(true)
  },
  _loadList: function(research) {
    if (this.data.tabIndex == 0) {
      this._searchJob(research)
    } else if (this.data.tabIndex == 1) {
      this._searchPublicize(research)
    } else if (this.data.tabIndex == 2) {
      wx.showToast({
        title: '功能建设中',
        icon: 'none'
      })
    }
  },
  /**
   * 搜索岗位列表
   */
  _searchJob: function(research) {
    var _pageIndex = research ? 1 : this.data.jobPageIndex
    if (this.data.searchText) {
      let param = {
        pageIndex: _pageIndex,
        pageSize: this.data.pageSize,
        jobName: this.data.searchText
      }
      post._get(post.search_job_list, param).then((res) => {
        var resultList = []
        //重新搜索
        if (research) {
          resultList = res.result
        } else {
          resultList = this.data.jobDataList.concat(res.result)
        }

        this.setData({
          jobDataList: resultList,
          jobPageIndex: _pageIndex + 1,
          noSearchData: resultList.length == 0
        })

      }).catch((errMsg) => {
        wx.showToast({
          title: 'error',
          icon: 'none'
        })
      })
    }
  },
  /**
   * 搜索宣讲会列表
   */
  _searchPublicize: function(research) {
    var _pageIndex = research ? 1 : this.data.publicizePageIndex
    if (this.data.searchText) {
      search._post(search.job_preach, {
        pageIndex: _pageIndex,
        pageSize: this.data.pageSize,
        keyword: this.data.searchText,
      }).then((res) => {
        var resultList = []
        //重新搜索
        if (research) {
          resultList = res.result
        } else {
          resultList = this.data.publicizeList.concat(res.result)
        }
        // console.log(res.result);
        this.setData({
          publicizeList: resultList,
          publicizePageIndex: _pageIndex + 1,
          noSearchData: resultList.length == 0
        })
      }).catch((errMsg) => {
        wx.showToast({
          title: 'error',
          icon: 'none'
        })
      })
    }
  }
})
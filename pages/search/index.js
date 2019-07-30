var searchHistoryKey = 'search-history'
const urls = require('../../assets/js/urls.js');
const system = require('../../assets/urls/system.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyTags: [],
    hotTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._hotSearch()
  },
  onShow: function() {
    var _history = wx.getStorageSync(searchHistoryKey)
    this.setData({
      historyTags: _history
    })
  },
  _hotSearch: function() {
    var that = this;
    const param = {
      hotWordsType: 'HOME',
      limit: 100
    };
    system._get(system.doc_hot_list, param).then((res) => {
      console.log(res);
      let hotArr = res.result;
      let hotTags = [];
      for (let v of hotArr) {
        console.log(v.hotWords);
        hotTags.push(v.hotWords)
        that.setData({
          hotTags: hotTags
        })
      };
    });
  },
  doSearch: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/search/result/index?searchText=' + event.detail.searchText
    })
  },
  onTapTag: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/search/result/index?searchText=' + event.detail.tagText
    })
  }
})
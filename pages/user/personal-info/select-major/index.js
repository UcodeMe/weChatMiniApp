const urls = require('../../../../assets/js/urls.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    searchText: null,
    majorList: [],
    noSearchData: false
  },
  onReady: function() {
    this._loadMajorList(true)
  },
  onReachBottom: function() {
    this._loadMajorList(false)
  },
  _loadMajorList: function(reload) {
    var param = {
      pageIndex: reload ? 1 : this.data.pageIndex,
      pageSize: 20
    }
    var _searchText = this.data.searchText
    if (_searchText != null && _searchText != '') {
      Object.assign(param, {
        majorName: _searchText
      })
    }
    urls._get(urls.dict_major, param).then((res) => {
      var _pageIndex = 1
      var _majorList = []
      var _noSearchData = false
      //如果是重新加载
      if (reload) {
        //没有数据
        if (res.result.length == 0) {
          _noSearchData = true
        } else {
          _pageIndex = res.pageInfo.pageIndex
          _majorList = res.result
        }
      } else {
        if (res.result.length == 0) {
          wx.showToast({
            title: urls.toast_msg.no_more_data,
            icon: 'none'
          })
        } else {
          _pageIndex = res.pageInfo.pageIndex + 1
          _majorList = this.data.majorList.concat(res.result)
        }
      }
      var userInfo = wx.getStorageSync("userInfo");
      var checkedId = userInfo.majorId;
      if (checkedId) {
        for (let i = 0; i < _majorList.length; i++) {
          if (_majorList[i].majorId == checkedId) {
            _majorList[i].checked = true
          } else {
            _majorList[i].checked = false
          }
        }
      }

      this.setData({
        pageIndex: _pageIndex,
        majorList: _majorList,
        noSearchData: _noSearchData
      })
    }).catch((errMsg) => {
      wx.showToast({
        title: 'error',
        icon: 'none'
      })
    });
  },
  _searchInputChange: function(e) {
    console.log(e)
    this.setData({
      searchText: e.detail
    })
  },
  _doSearch: function() {
    this._loadMajorList(true)
  },
  _onChange: function(e) {
    var selectedMajorId = parseInt(e.detail.value)
    for (var item of this.data.majorList) {
      if (item.majorId == selectedMajorId) {
        wx.setStorageSync("majorId", selectedMajorId)
        wx.setStorageSync("majorName", item.majorName)
      }
    }
    wx.navigateBack()
  }
})
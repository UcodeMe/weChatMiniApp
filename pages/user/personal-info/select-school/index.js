const urls = require('../../../../assets/js/urls.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    noSearchData: false,
    pageIndex: 1,
    schoolList: [],
    searchText: null,
  },
  onReady: function() {
    this._loadSchoolList(true)
  },
  onReachBottom: function() {
    this._loadSchoolList(false)
  },
  _loadSchoolList: function(reload) {
    var param = {
      pageIndex: reload ? 1 : this.data.pageIndex,
      pageSize: 20
    }
    var _searchText = this.data.searchText
    if (_searchText != null && _searchText != '') {
      Object.assign(param, {
        schoolName: _searchText
      })
    }
    urls._get(urls.dict_school, param).then((res) => {
      var _pageIndex = 1
      var _schoolList = []
      var _noSearchData = false
      //如果是重新加载
      if (reload) {
        //没有数据
        if (res.result.length == 0) {
          _noSearchData = true
        } else {
          _pageIndex = res.pageInfo.pageIndex
          _schoolList = res.result
        }
      } else {
        if (res.result.length == 0) {
          wx.showToast({
            title: urls.toast_msg.no_more_data,
            icon: 'none'
          })
        } else {
          _pageIndex = res.pageInfo.pageIndex
          _schoolList = this.data.schoolList.concat(res.result)
        }
      }
      var userInfo = wx.getStorageSync("userInfo");
      var checkedId = userInfo.schoolId;
      if (checkedId) {
        for (let i = 0; i < _schoolList.length; i++) {
          if (_schoolList[i].schoolId == checkedId) {
            _schoolList[i].checked = true
          } else {
            _schoolList[i].checked = false
          }
        }
      }

      this.setData({
        pageIndex: _pageIndex + 1,
        schoolList: _schoolList,
        noSearchData: _noSearchData
      })
    }).catch((errMsg) => {
      wx.showToast({
        title: 'load school fail',
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
    this._loadSchoolList(true)
  },
  _onChange: function(e) {
    var selectedSchoolId = parseInt(e.detail.value)
    for (var item of this.data.schoolList) {
      if (item.schoolId == selectedSchoolId) {
        //设置新的学校名称
        wx.setStorageSync("schoolId", selectedSchoolId)
        wx.setStorageSync("schoolName", item.schoolName)
        //移除院系信息
        wx.setStorageSync("instituteId", null)
        wx.setStorageSync("instituteName", null)

        this.setData({
          checkedId: selectedSchoolId
        })
      }
    }
    wx.navigateBack()
  }
})
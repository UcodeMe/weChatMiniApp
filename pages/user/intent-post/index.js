const urls = require('../../../assets/js/urls.js');
const user = require('../../../assets/urls/user.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    searchText: null,
    noSearchData: false,
    pageIndex: 1,
    postIds: []
  },
  onLoad: function(e) {
    this._initPostList()
  },
  _initPostList: function() {
    wx.showLoading({
      title: '加载中...'
    })
    var param = {
      pageIndex: 1,
      pageSize: 10000
    }
    if (this.data.searchText) {
      Object.assign(param, {
        postName: this.data.searchText
      })
    }
    urls._get(urls.post_list, param).then((res) => {
      if (res.success) {
        let userInfo = wx.getStorageSync("userInfo")
        let _postIds = userInfo.intentPostIds

        let _postList = []
        res.result.forEach(function(item) {
          let _checked = false
          if (_postIds && _postIds.indexOf(item.id) != -1) {
            _checked = true
          }
          _postList.push({
            id: item.id,
            name: item.postName,
            checked: _checked
          })
        })
        this.setData({
          postList: _postList,
          postIds: _postIds,
          noSearchData: _postList.length == 0
        })
      } else {
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
      }
      wx.hideLoading()
    }).catch((errMsg) => {
      wx.showToast({
        title: 'error',
        icon: 'none'
      })
    })
    wx.hideLoading()
  },
  _searchInputChange: function(e) {
    this.setData({
      searchText: e.detail
    })
    this._initPostList(true)
  },
  _onChange: function(e) {

    let _postIds = this.data.postIds

    let id = e.currentTarget.dataset.id
    let _postList = this.data.postList
    _postList.forEach(function(item) {
      let _checked = !item.checked
      if (item.id === id) {
        item.checked = _checked
        //选中，但ids中不包含
        if (_checked && _postIds.indexOf(id) == -1) {
          if (_postIds.length < 3) {
            _postIds.push(id)
          }
        }
        //未选中，但ids中包含
        if (!_checked && _postIds.indexOf(id) != -1) {
          _postIds.splice(_postIds.indexOf(id), 1)
        }
      }
    })
    this.setData({
      postList: _postList
    })
    wx.setStorageSync("postIds", _postIds)

    console.log(_postIds)

    if (_postIds.length == 3) {

      wx.showModal({
        title: '提示',
        content: '最多选择3个目标行业',
        success(res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
  }
})
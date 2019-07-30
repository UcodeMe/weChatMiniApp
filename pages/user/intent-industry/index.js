const urls = require('../../../assets/js/urls.js');
const industry = require('../../../assets/urls/post.js');
const user = require('../../../assets/urls/user.js');
Page({
  data: {
    industryIds: [],
    industryList: [],
    noSearchData: false
  },
  onLoad: function(e) {
    this._initIndustryList()
  },
  _initIndustryList: function() {
    wx.showLoading({
      title: '加载中...'
    })
    urls._get(urls.industry_query, {
      pageIndex: 1,
      pageSize: 10000
    }).then((res) => {
      if (res.success) {
        let userInfo = wx.getStorageSync("userInfo")
        let _industryIds = userInfo.intentIndustryIds

        let _industryList = []
        res.result.forEach(function(item) {
          let _checked = false
          if (_industryIds && _industryIds.indexOf(item.id) != -1) {
            _checked = true
          }
          _industryList.push({
            id: item.id,
            name: item.industryName,
            checked: _checked
          })
        })
        this.setData({
          industryList: _industryList,
          industryIds: _industryIds,
          noSearchData: _industryList.length == 0
        })
      } else {
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
      }
      wx.hideLoading()
    }).catch((errMsg) => {
      wx.hideLoading()
      console.log(errMsg)
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })

  },
  _onChange: function(e) {
    let _industryIds = this.data.industryIds

    let id = e.currentTarget.dataset.id
    let _industryList = this.data.industryList
    _industryList.forEach(function(item) {
      let _checked = !item.checked
      if (item.id === id) {
        item.checked = _checked
        //选中，但ids中不包含
        if (_checked && _industryIds.indexOf(id) == -1) {
          if (_industryIds.length < 3) {
            _industryIds.push(id)
          }
        }
        //未选中，但ids中包含
        if (!_checked && _industryIds.indexOf(id) != -1) {
          _industryIds.splice(_industryIds.indexOf(id), 1)
        }
      }
    })
    this.setData({
      industryList: _industryList
    })
    wx.setStorageSync("industryIds", _industryIds)
    // console.log(_industryIds)
    if (_industryIds.length == 3) {

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
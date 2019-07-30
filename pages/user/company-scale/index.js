const urls = require('../../../assets/js/urls.js');
const post = require('../../../assets/urls/post.js');
const user = require('../../../assets/urls/user.js');
Page({
  data: {
    noSearchData: false,
    companyScaleIds: [],
    companyScaleList: []
  },
  onLoad: function() {
    this._initCompanyScaleList();
  },
  _initCompanyScaleList: function() {
    urls._get(urls.dict_company_attr, {
      pageIndex: 1,
      pageSize: 1000
    }).then((res) => {

      if (res.success) {
        let userInfo = wx.getStorageSync("userInfo")
        let _companyScaleIds = userInfo.intentCompanyScaleIds

        let _companyScaleList = []
        res.result.forEach(function(item) {
          let _checked = false
          if (_companyScaleIds && _companyScaleIds.indexOf(item.id) != -1) {
            _checked = true
          }
          _companyScaleList.push({
            id: item.id,
            name: item.scaleName,
            checked: _checked
          })
        })
        this.setData({
          companyScaleList: _companyScaleList,
          companyScaleIds: _companyScaleIds,
          noSearchData: _companyScaleList.length == 0
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
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    });
  },
  _onChange: function(e) {

    let _companyScaleIds = this.data.companyScaleIds

    let id = e.currentTarget.dataset.id
    let _companyScaleList = this.data.companyScaleList
    _companyScaleList.forEach(function(item) {
      let _checked = !item.checked
      if (item.id === id) {
        item.checked = _checked
        //选中，但ids中不包含
        if (_checked && _companyScaleIds.indexOf(id) == -1) {
          if (_companyScaleIds.length < 3) {
            _companyScaleIds.push(id)
          }
        }
        //未选中，但ids中包含
        if (!_checked && _companyScaleIds.indexOf(id) != -1) {
          _companyScaleIds.splice(_companyScaleIds.indexOf(id), 1)
        }
      }
    })
    this.setData({
      companyScaleList: _companyScaleList
    })
    wx.setStorageSync("companyScaleIds", _companyScaleIds)

    if (_companyScaleIds.length == 3) {

      wx.showModal({
        title: '提示',
        content: '最多选择3个目标企业类型',
        success(res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
  }
})
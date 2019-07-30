const systemRequest = require('../../assets/urls/system.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: 0,
    pageIndex: 1,
    pageSize: 1000,
    selectedProvinceId: null,
    selectedCityId: null,
    provinceList: [],
    cityList: [],
    regionCategory: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //公用的地址选择，要区分回传到storage中的类型
    let _regionCategory = options.regionCategory

    let that = this
    this.setData({
      regionCategory: _regionCategory,
      pageHeight: wx.getSystemInfoSync().windowHeight
    }, () => {
      that._getProvinceList()
    })
  },
  _getProvinceList: function() {
    systemRequest._get(systemRequest.region_page, {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      regionType: 'PROVINCE'
    }).then(res => {
      this.setData({
        provinceList: res.result
      })
    })
  },
  _selectProvince: function(e) {
    let that = this
    let _provinceId = e.currentTarget.dataset.id
    console.log(_provinceId)
    this.setData({
      selectedProvinceId: _provinceId
    }, () => {
      systemRequest._get(systemRequest.region_page, {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        regionType: 'CITY',
        parentId: _provinceId
      }).then(res => {
        that.setData({
          cityList: res.result
        })
      })
    })
  },
  _selectCity: function(e) {
    let _cityId = e.currentTarget.dataset.id
    this.setData({
      selectedCityId: _cityId
    }, () => {
      wx.setStorageSync(this.data.regionCategory + "-regionId", _cityId)
      wx.setStorageSync(this.data.regionCategory + "-regionName", e.currentTarget.dataset.name)
      wx.navigateBack()
    })
  }
})
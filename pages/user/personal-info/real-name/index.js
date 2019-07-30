const urls = require('../../../../assets/js/urls.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textVal: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      textVal: options.textVal
    })
  },
  /**
   * 清除输入框文字
   */
  _clearInput: function() {
    this.setData({
      textVal: null
    })
  },
  _bindKeyInput: function(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  _saveData: function() {
    var reg = /^(\w|[\u4E00-\u9FA5]|\s|\.)*$/;
    if (reg.test(this.data.textVal)) {
      wx.setStorageSync("realName", this.data.textVal)
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '"用户名只允许为英文、数字、空格、小数点和汉字的混合,\n请检查是否前后有空格或者其他符号"',
        duration: 800
      })
    }


  }
})
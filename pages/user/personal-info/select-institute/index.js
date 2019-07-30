const urls = require('../../../../assets/js/urls.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    instituteList: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function() {
    this._loadInstituteList()
  },
  /**
   * 加载院系
   */
  _loadInstituteList: function() {
    let _schoolId = wx.getStorageSync("schoolId")
    if (_schoolId) {
      urls._get(urls.dict_institute, {
        pageIndex: 1,
        pageSize: 1000,
        schoolId: _schoolId
      }).then((res) => {
        var instituteList = res.result;
        var userInfo = wx.getStorageSync("userInfo");
        var checkedId = userInfo.secondInstituteId;
        if (checkedId) {
          for (let i = 0; i < instituteList.length; i++) {
            if (instituteList[i].instituteId == checkedId) {
              instituteList[i].checked = true
            } else {
              instituteList[i].checked = false
            }
          }
        }
        this.setData({
          instituteList: instituteList
        })
      }).catch((errMsg) => {
        wx.showToast({
          title: 'error',
          icon: 'none'
        })
      })
    } else {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
    }
  },
  _onChange: function(e) {
    var selectedInstituteId = parseInt(e.detail.value)
    for (var item of this.data.instituteList) {
      if (item.instituteId == selectedInstituteId) {
        //设置新的名称
        wx.setStorageSync("instituteId", selectedInstituteId)
        wx.setStorageSync("instituteName", item.instituteName)
        wx.setStorageSync("majorId", null)
        wx.setStorageSync("majorName", null)
      }
    }
    wx.navigateBack()
  }
})
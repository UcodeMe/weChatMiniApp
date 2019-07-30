const _date = require('../../assets/js/getdate.js');
const company = require('../../assets/urls/company.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateInfo: {},
    month: '',
    clickNum: 0,
    sendDate: '',
    publicizeList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.date) {
      this.setData({
        dateInfo: _date._getDate(),
        month: _date._getDate().month[0],
        sendDate: _date._getDate().fullDate[0]
      })
      this._initpublicizeList()
    } else {
      this.setData({
        dateInfo: _date._getDate(),
        month: _date._getDate().month[0],
        sendDate: _date._getDate().fullDate[0]
      })
      console.log(this.data.dateInfo)
      this._initpublicizeList()
    }

  },
  /**
   * 初始化列表
   */
  _initpublicizeList: function(date) {
    let param = {
      pageIndex: 1,
      pageSize: 10,
      holdDate: this.data.sendDate
    }

    company._get(company.publicize_list, param).then((res) => {
      console.log(res)
      let that = this
      that.setData({
        publicizeList: res.result
      })
    })
  },
  /**
   * 切换日期
   */
  _clickDtae: function(e) {
    console.log(e)
    let index = e.currentTarget.dataset.fulldate
    this.setData({
      clickNum: index,
      month: this.data.dateInfo.month[index],
      sendDate: this.data.dateInfo.fullDate[index]
    })
    this._initpublicizeList()
  },

  /**
   * 保存到相册
   */
  _savePhoto: function() {
    var that = this
    let purl = ''
    let param = {
      pageIndex: 1,
      pageSize: 100
    }
    company._get(company.publicize_shortcut, param).then((res) => {
      console.log(res)
      wx.downloadFile({
        url: res.result,
        success: function(res) {
          console.log(res)
          //获取相册授权
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#72B9C3',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    that.setData({
                      hidden: true
                    })
                  }
                }
              })
            }
          })
        },
        fail: function(err) {
          console.log(err)
        }
      })
    })



  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.sendDate + '校园宣讲会预告',
      desc: '最全最优的宣讲会信息都在这里',
      path: '/pages/publicize/index?date=' + this.data.sendDate
    }
  }
})
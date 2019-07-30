const post = require('../../../assets/urls/post.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    applicationList: {},
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._initApplictionList(true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },


  ///////////初始化网申列表
  _initApplictionList: function(reload) {
    let param = {}
    let that = this
    if (reload) {
      param = {
        relationType: 'DIRECT_RECOMMEND',
        pageIndex: 1,
        pageSize: 10
      }
    } else {
      param = {
        relationType: 'DIRECT_RECOMMEND',
        pageIndex: that.data.pageIndex,
        pageSize: 10
      }
    }
    post._get(post.onlineapplication_list, param).then((res) => {
      console.log(res)
      // if (res.result.length == 0) {
      //   wx.showToast({
      //     title: '没有更多数据',
      //     icon: 'none'
      //   })
      // } else {
        if (reload) {
          if (res.result.length == 0){
            this.setData({
              pageIndex: 1,
              show: false
            })
          }else{
            this.setData({
              applicationList: res.result,
              pageIndex: that.data.pageIndex + 1,
              show:true
            })
          }

        } else {
          this.setData({
            applicationList: that.data.applicationList.concat(res.result),
            pageIndex: that.data.pageIndex + 1
          })
        }
      // }

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
    this._initApplictionList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

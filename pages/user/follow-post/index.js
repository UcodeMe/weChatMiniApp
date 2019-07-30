const post = require('../../../assets/urls/post.js');
const company = require('../../../assets/urls/company.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focusList: [],
    postList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._initFocusList()
    this._initPostList()
  },
  _setFllow: function(e) {
    console.log(e.currentTarget.dataset.id)
    let _id = e.currentTarget.dataset.id
    post._put(post.post_follow + _id).then((res) => {
      wx.showLoading({
        title: '关注中…'
      })
      this._initFocusList()
      wx.hideLoading()
    })
  },
  _unFollow: function(e) {
    let that = this
    let _id = e.currentTarget.dataset.id
    let _name = e.currentTarget.dataset.name
    let _index = e.currentTarget.dataset.index
    console.log(that.data.focusList)
    console.log(_index)
    wx.showModal({
      title: '温馨提示',
      content: '确认对"' + _name + '"岗位取消关注么？',
      confirmText: '确认',
      cancelText: '取消',
      success: function(res) {

        if (res.confirm) {
          post._put(post.post_unfollow + _id).then((res) => {
            that.data.focusList[_index].unfollowed = true
            that.setData({
              focusList: that.data.focusList
            })
            // console.log("quxiaoquxiaoxuxauusdihuas")
          }).catch((err) => {
            wx.showToast({
              title: '取消关注失败',
            })
          })
        }
      }
    })
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
    this._initPostList()
  },


  ///////////初始化关注岗位列表
  _initFocusList: function() {
    let param = {
      relationType: 'FOLLOW',
      pageIndex: 1,
      pageSize: 1000
    }

    post._get(post.focuspost_list, param).then((res) => {
      console.log(res)
      let arr = []
      res.result.forEach(item => {
        item.unfollowed = false
        arr.push(item)
      })
      this.setData({
        focusList: arr
      })
    })

    console.log(this.data.focusList.length)
  },
  _initPostList: function() {
    let param = {
      relationType: 'INTENT',
      pageIndex: 1,
      pageSize: 1000
    }

    post._get(post.focuspost_list, param).then((res) => {
      console.log(res)
      this.setData({
        postList: res.result
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

  }
})
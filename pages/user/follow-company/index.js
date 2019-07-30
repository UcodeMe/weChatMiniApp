const post = require('../../../assets/urls/post.js');
const company = require('../../../assets/urls/company.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusList: [],
    Mstart:'',
    index:'',
    pageShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this._initFocusList(true)
  },
  //触摸开始
  touchstart: function (e) {
    this.setData({
      index: e.currentTarget.dataset.index,
      Mstart: e.changedTouches[0].pageX
    });
  },
  //开始滑动
  touchmove: function (e) {
    //列表项数组
    let list = this.data.focusList;
    let move = this.data.Mstart - e.changedTouches[0].pageX;
    list[this.data.index].x = move > 0 ? -move : 0;
    this.setData({
      focusList: list
    });
  },

  //滑动结束
  touchend: function (e) {
    let list = this.data.focusList;
    let move = this.data.Mstart - e.changedTouches[0].pageX;
    list[this.data.index].x = move > 100 ? -180 : 0;
    this.setData({
      focusList: list
    });
  },

  //点击删除
  _del:function(e){
    let that = this
    let _list = that.data.focusList
    let _index = e.currentTarget.dataset.index
    let _id = e.currentTarget.dataset.id
    let _name = e.currentTarget.dataset.name
    wx.showModal({
      title: '温馨提示',
      content: '确认对"'+_name+'"取消关注嘛？',
      confirmText:'确认',
      cancelText:'取消',
      success:function(res){
        if (res.confirm){
          company._put(company.un_follow_company+_id).then((res)=>{
            _list.splice(_index, 1)
            that.setData({
              focusList: _list
            })
          }).catch((err)=>{
            wx.showToast({
              title: '删除失败',
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

  },


  ///////////初始化网申列表
  _initFocusList: function(reload) {
    let param = {
      relationType: 'FOLLOW',
      pageIndex: 1,
      pageSize: 1000
    }
    wx.showLoading({
      title: '加载中…',
    })
    company._get(company.company_focus, param).then((res) => {
      if (reload) {
        if (res.result.length == 0) {
          this.setData({
            focusList: res.result,
            pageShow: false
          })
        }else{
          this.setData({
            focusList: res.result,
            pageShow: true
          })
        }
      }
      wx.hideLoading()
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

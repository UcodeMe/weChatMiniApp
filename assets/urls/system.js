const baseUrl = require('../urls/baseUrl.js');
var basePath = baseUrl.basePath;
module.exports = {
  //广告位banner
  banner_list: basePath + '/system-api/banner/api/list',
  //热门搜索
  //求职工具包热门搜索
  doc_hot_list: basePath + '/system-api/hot_words/api/list',
  //地区
  region_page: basePath + '/system-api/region/api/page',


  toast_msg: {
    no_more_data: '没有更多数据'
  },

  _get: function(url, data) {
    var promise = new Promise((resolve, reject) => {
      let param = data
      wx.request({
        url: url,
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('Authorization')
        },
        data: param,
        method: 'get',
        success: function(res) {
          if (res.statusCode == 401) {
            wx.navigateTo({
              url: '/pages/company/index'
            })
            return
          }
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(res.data.message)
          }
        },
        error: function(e) {
          reject('网络异常')
        }
      })
    })
    return promise
  },
  _post: function(url, data) {
    var promise = new Promise((resolve, reject) => {
      let postData = data
      wx.request({
        url: url,
        data: postData,
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('Authorization')
        },
        method: 'POST',
        success: function(res) {
          if (res.statusCode == 401) {
            wx.navigateTo({
              url: '/pages/company/index'
            })
            return
          }
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(res.data.message)
          }
        },
        error: function(e) {
          reject('网络异常')
        }
      })
    });
    return promise
  },
  _put: function(url, data) {
    var promise = new Promise((resolve, reject) => {
      let putData = data
      wx.request({
        url: url,
        data: putData,
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('Authorization')
        },
        method: 'PUT',
        success: function(res) {
          if (res.statusCode == 401) {
            wx.navigateTo({
              url: '/pages/company/index'
            })
            return
          }
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(res.data.message)
          }
        },
        error: function(e) {
          reject('网络异常')
        }
      })
    });
    return promise
  }
};
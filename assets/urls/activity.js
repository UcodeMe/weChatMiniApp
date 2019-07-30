//dev
const baseUrl = require('../urls/baseUrl.js');
var basePath = baseUrl.basePath;
module.exports = {
  //id获取求职工具包详情
  doc_help_info_by_doc_help_id: basePath + '/activity-api/doc_help/api/',


  toast_msg: {
    no_more_data: '没有更多数据'
  },

  _get: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      let param = data
      wx.request({
        url: url,
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('Authorization')
        },
        data: param,
        method: 'get',
        success: function (res) {
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
        error: function (e) {
          reject('网络异常')
        }
      })
    })
    return promise
  },
  _post: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      let postData = data
      wx.request({
        url: url,
        data: postData,
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('Authorization')
        },
        method: 'POST',
        success: function (res) {
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
        error: function (e) {
          reject('网络异常')
        }
      })
    });
    return promise
  },
  _put: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      let putData = data
      wx.request({
        url: url,
        data: putData,
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('Authorization')
        },
        method: 'PUT',
        success: function (res) {
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
        error: function (e) {
          reject('网络异常')
        }
      })
    });
    return promise
  }
};
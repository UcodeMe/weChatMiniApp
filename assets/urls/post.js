//dev
const baseUrl = require('../urls/baseUrl.js');
var basePath = baseUrl.basePath;
module.exports = {
  // 岗位与用户关系管理    分页查询网申
  onlineapplication_list: basePath + '/post-api/job/user/api/page',
  // 源岗位与用户关系管理    分页查询网申
  focuspost_list: basePath +'/post-api/post/user/api/page',
  // 源岗位与用户关系管理    分页查询网申
  updata_focuspost: basePath + '/post-api/post/user/api/update',
  //根据公司id查询 岗位信息
  company_job: basePath + '/post-api/job/api/page_by_company_id',
  //根据id 查询岗位信息
  job_info: basePath + '/post-api/job/api/',
  //分页查询岗位列表  查询界面
  search_job_list: basePath + '/post-api/job/api/page_with_company',
  //用户关注原岗位
  save_post: basePath + '/post-api/post/user/api/follow/',
  //根据job id查询直推、网申详情
  search_job_mine: basePath + '/post-api/job/user/api/',
  //用户取消岗位申请
  cancel_job: basePath +'/post-api/job/user/api/cancel/',
  //用户进行网申
  get_online_job: basePath +'/post-api/job/user/api/online_apply/',
  //用户收藏岗位
  job_collect:basePath+'/post-api/job/user/api/collect/',
  //用户取消收藏岗位
  job_uncollect:basePath+'/post-api/job/user/api/un_collect/',
  //用户新增意向原岗位
  intent_post:basePath+'/post-api/post/user/api/intent/',
  //用户关注原岗位
  post_follow: basePath +'/post-api/post/user/api/follow/',
  //用户取消关注原岗位
  post_unfollow: basePath +'/post-api/post/user/api/un_follow/',


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
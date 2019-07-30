//dev
const baseUrl = require('../urls/baseUrl.js');
var basePath = baseUrl.basePath;

module.exports = {
  // 公司严选信息相关接口
  selection_list: basePath + '/company-api/company/selection/api/page',
  //公司详情接口
  company_info: basePath +'/company-api/company/info/api/',
  //关注的企业
  company_focus: basePath + '/company-api/company/user/api/page',
  //校园宣讲会
  publicize_list: basePath + '/company-api/publicize/api/selection/page',
  //校园宣讲会分享截图
  publicize_shortcut: basePath + '/company-api/publicize/api/selection/shortcut',
    //公司id查询宣讲会
  company_publicize: basePath + '/company-api/publicize/api/list',
    //分页查询宣讲会
  publicize_list_bypage: basePath + '/company-api/publicize/api/page',
  //公司详情分页查询接口
  company_info_page: basePath + '/company-api/company/info/api/page',
  //分页查询企业性质
  company_nature: basePath + '/company-api/company/nature/api/page',
  //查询all企业性质
  company_nature_all: basePath + '/company-api/company/nature/api/list',
  //关注公司
  follow_company: basePath + '/company-api/company/user/api/follow/',
  //取消关注公司
  un_follow_company: basePath + '/company-api/company/user/api/un_follow/',
  //分页查询所属行业
  industry_list: basePath +'/company-api/company/industry/api/page',
  //查询所属行业
  industry_list_all: basePath +'/company-api/company/industry/api/list',
  //分页公司发展阶段查询
  scale_list: basePath + '/company-api/company/scale/api/page',
  //公司发展阶段查询
  scale_list_all: basePath + '/company-api/company/scale/api/list',
  //公司行业地位查询
  position_list: basePath + '/company-api/industry/position/api/list',



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
  _post: function (url, data,) {
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
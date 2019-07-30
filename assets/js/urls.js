//dev 
import activity from '../urls/activity.js';
import company from '../urls/company.js';
import post from '../urls/post.js';
import system from '../urls/system.js';
import user from '../urls/user.js';

const baseUrl = require('../urls/baseUrl.js');
var basePath = baseUrl.basePath;
module.exports = {
  //活动相关
  activity: activity,
  //公司相关
  company: company,
  //职位相关
  post:post,
  //系统相关
  system:system,
  //个人相关
  user:user,
  //首页广告位
  banner_list: basePath + '/system-api/banner/list',
  //课程列表
  course_page: basePath + '/course-api/course/api/page',
  //课程列表
  course_list: basePath + '/course-api/course/api/list/',
  //课程基本信息
  course_info: basePath + '/course-api/course/api/',
  //课程收藏或取消收藏
  course_collect: basePath + '/course-api/course/collect/',
  //获取课程测验题目
  course_exam: basePath + '/course/exam/',
  //更新课程测验题目的答案
  course_exam_answer: basePath + '/course/examAnswer/',
  //获取教师信息
  teacher_info: basePath + '/course-api/teacher/api/',

  //文章列表
  article_list: basePath + '/article-api/article/api/page',
  //文章详情
  article_info: basePath + '/article-api/article/api/',
  //更新浏览文章次数
  article_view: basePath + '/article-api/article/view/',
  //收藏/取消收藏文章
  article_collect: basePath + '/article-api/article/collect/',
  //搜索查询资料包
  search_doc_list: basePath + '/activity-api/doc_lib/api/page',
  //企业基本信息
  company_base_info: basePath + '/company/baseInfo/',
  //job列表
  job_list: basePath + '/post-api/job/api/page',
  //ob信息
  job_info: basePath + '/job/',
  //ob收藏/取消收藏
  job_collect: basePath + '/job/collect/',
  //企业宣讲会信息列表
  publicize_list: basePath + '/company-api/publicize/api/page',
  //企业宣讲会信息
  company_publicize: basePath + '/publicize/',
  //宣讲会搜索
  company_publicize_search: basePath + '/publicize/search',
  //企业岗位搜索
  company_job_search: basePath + '/job/search',
  //行业查询
  industry_query: basePath + '/company-api/company/industry/api/page',

  //工作申请
  job_apply: basePath + '/job/apply/',
  //我申请的岗位(job)
  job_apply_list: basePath + '/job/apply/list',

  //微信登陆获得openId
  user_wx_login: basePath + '/oauth-api/oauth/token',
  //微信手机号
  user_wx_phone: basePath + '/external-api/wx/ma/user/wx966e4d3aeba6f239/phone',
  //更新用户信息
  user_perfect_info: basePath + '/user-api/user/api/update',
  //个人信息
  user_info: basePath + '/user-api/user/api/info',
  //岗位意愿度
  user_post_prefer: basePath + '/post/personal/prefer/',
  //岗位了解程度
  user_post_familiar: basePath + '/post/personal/familiar/',

  //个人收藏课程列表
  course_collect_list: basePath + '/course/collect/list',
  // 个人收藏岗位列表
  job_collect_list: basePath + '/job/collect/list',
  // 个人收藏文章列表
  article_collect_list: basePath + '/article/collect/list',


  //字典-学校
  dict_school: basePath + '/user-api/school/api/page',
  //字典-院系
  dict_institute: basePath + '/user-api/institute/api/page',
  //字典-专业
  dict_major: basePath + '/user-api/major/api/page',
  //字典-地点
  dict_region: basePath + '/system-api/region/api/page',
  //字典-公司属性
  dict_company_attr: basePath + '/company-api/company/scale/api/page',
  //岗位列表
  post_list: basePath + '/post-api/post/api/page',



  //发起微信支付(活动订单-求职诊断)
  wechat_pay_activity: basePath + '/wechat/pay/activity/',


  //对活动感兴趣
  activity_like: basePath + '/activity/like/',
  //得到七牛云token
  get_token: basePath + '/external-api/qiniu/token',
  

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
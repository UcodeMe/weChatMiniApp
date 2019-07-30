const urls = require('/assets/js/urls.js')
const mta = require('/assets/js/mta_analysis.js')
const basePath = require('/assets/urls/baseUrl.js')

App({
  onLaunch: function(options) {
    var that = this;
    wx.setStorageSync('baseUrl', basePath.basePath);
    //初始化mta
    mta.App.init({
      "appID": "500631947",
      // "eventID": "500015824", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
      "lauchOpts": options, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
      "statPullDownFresh": true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statShareApp": true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statReachBottom": true // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
    })
  },
  /**
   * 进入小程序，首先进行登陆
   */
  _getToken: function() {
    return new Promise(function(resolve, reject) {
      wx.login({
        success: function(res) {
          // console.log(res.code)
          if (res.code) {
            wx.request({
              url: urls.user_wx_login,
              method: 'POST',
              header: {
                'Authorization': 'Basic YXBwOmFwcA==',
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                "grant_type": "password",
                "username": "wx966e4d3aeba6f239",
                "password": res.code,
                "auth_type": "wechatMA"
              },
              success: function(res) {
                if (res.statusCode == 200) {
                  // wx.setStorageSync('Authorization', res.data.value)
                  wx.setStorage({
                    key: 'Authorization',
                    data: res.data.value,
                    success: function() {
                      resolve()
                    }
                  })
                }
              },
              error: function(e) {
                reject('relogin fail')
              }
            })
          } else {
            console.log('获取jscode失败！' + res.errMsg)
          }
        }
      })
    })
  },
  onShow: function(options) {},
  onHide: function() {},
  onError: function(msg) {},
  onPageNotFound: function(res) {}
})
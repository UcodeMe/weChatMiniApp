const urls = require('../../../assets/js/urls.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    educationLevelName: null,
    secondSchoolName: null,

    userInfo: {},

    educationList: [{
        "educationId": 'DOCTOR',
        "educationName": '博士'
      },
      {
        "educationId": 'POSTGRADUATE',
        "educationName": '研究生'
      }, {
        "educationId": 'UNDERGRADUATE',
        "educationName": '本科'
      }, {
        "educationId": 'JUNIOR',
        "educationName": '大专'
      }
    ]
  },
  onLoad: function() {
    this._initUserInfo()
  },
  onShow: function() {
    let _realName = wx.getStorageSync("realName")
    if (_realName) {
      this.setData({
        ['userInfo.realName']: wx.getStorageSync("realName")
      })
    }
    let _schoolId = wx.getStorageSync("schoolId")
    if (_schoolId) {
      this.setData({
        ['userInfo.secondSchoolId']: wx.getStorageSync("schoolId")
      })
    }
    let _schoolName = wx.getStorageSync("schoolName")
    if (_schoolName) {
      this.setData({
        ['userInfo.secondSchoolName']: wx.getStorageSync("schoolName")
      })
    }
    let _instituteId = wx.getStorageSync("instituteId")
    if (_instituteId) {
      this.setData({
        ['userInfo.secondInstituteId']: wx.getStorageSync("instituteId")
      })
    }
    let _instituteName = wx.getStorageSync("instituteName")
    if (_instituteName) {
      this.setData({
        ['userInfo.secondInstituteName']: wx.getStorageSync("instituteName")
      })
    }
    let _majorId = wx.getStorageSync("majorId")
    if (_majorId) {
      this.setData({
        ['userInfo.secondMajorId']: wx.getStorageSync("majorId")
      })
    }
    let _majorName = wx.getStorageSync("majorName")
    if (_majorName) {
      this.setData({
        ['userInfo.secondMajorName']: wx.getStorageSync("majorName")
      })
    }
  },
  /**
   * 加载用户信息
   */
  _initUserInfo: function() {
    let that = this
    wx.showLoading({
      title: '加载中...'
    })
    urls._get(urls.user_info).then((res) => {
      that.setData({
        userInfo: res.result
      })
      let _educationLevel = res.result.educationLevel
      this.data.educationList.forEach(function(item) {
        if (item.educationId == _educationLevel) {
          that.setData({
            educationLevelName: item.educationName
          })
        }
      })

      wx.setStorageSync("userInfo", res.result)
      wx.hideLoading()
    }).catch(errMsg => {
      console.log(errMsg)
      wx.hideLoading()
      wx.showToast({
        title: '加载用户信息失败',
        icon: 'none'
      })
    })
  },
  /**
   * 性别选择
   */
  _onGenderChange: function(e) {
    this.setData({
      ['userInfo.gender']: parseInt(e.detail.value) + 1
    })
  },
  /**
   * 监听生日
   */
  _onBirthdayChange: function(e) {
    this.setData({
      ['userInfo.birthday']: e.detail.value
    })
  },
  /**
   * 监听学历
   */
  _onEducationChange: function(e) {
    var _education = this.data.educationList[e.detail.value]
    this.setData({
      ['userInfo.educationLevel']: _education.educationId,
      educationLevelName: _education.educationName
    })
  },
  /**
   * 入学年份
   */
  _onEntryTimeChange: function(e) {
    this.setData({
      ['userInfo.entryTime']: e.detail.value
    })
  },
  /**
   * 获取微信手机号
   */
  _getPhoneNumber: function(e) {
    var that = this
    //session_key 未过期，并且在本生命周期一直有效
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: function(res) {
          console.log(res)

          if (res.code) {
            //调用手机号获取
            urls._get(urls.user_wx_phone, {
              jsCode: res.code,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv
            }).then((res) => {
              console.log(res)
              if (res.success) {
                urls._put(urls.user_perfect_info, {
                  "mobile": res.result.phoneNumber
                }).then(updateRes => {
                  if (updateRes.success) {
                    that.setData({
                      userInfo: updateRes.result
                    })
                  } else {
                    wx.showToast({
                      title: '保存手机号失败',
                      icon: 'none'
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '获取微信手机号失败',
                  icon: 'none'
                })
              }

            }).catch((errMsg) => {
              console.log(errMsg)
              wx.showToast({
                title: '微信手机号授权失败',
                icon: 'none'
              })
            })
          } else {
            console.log('获取jscode失败！' + res.errMsg)
          }
        }
      })
    }
  },
  /**
   * 修改手机号
   */
  _editMobileNumber: function() {
    wx.showToast({
      title: '修改手机号功能暂未开放',
      icon: 'none'
    })
  },
  /**
   * 保存
   */
  _saveInfo: function() {
    var putData = {
      "realName": this.data.userInfo.realName,
      "gender": this.data.userInfo.gender,
      "birthday": this.data.userInfo.birthday,

      "secondSchoolId": this.data.userInfo.secondSchoolId,
      "secondInstituteId": this.data.userInfo.secondInstituteId,
      "secondMajorId": this.data.userInfo.secondMajorId,
      "educationLevel": this.data.userInfo.educationLevel,
      "entryTime": this.data.userInfo.entryTime
    }

    urls._put(urls.user_perfect_info, putData).then((res) => {
      wx.showToast({
        title: '保存成功'
      })
      wx.removeStorageSync('realName')
      wx.removeStorageSync('secondSchoolId')
      wx.removeStorageSync('secondSchoolName')
      wx.removeStorageSync('secondInstituteId')
      wx.removeStorageSync('secondInstituteName')
      wx.removeStorageSync('secondMajorId')
      wx.removeStorageSync('secondMajorName')
    }).catch((errMsg) => {
      wx.showToast({
        title: 'error',
        icon: 'none'
      })
    })
  }
})
const urls = require('../../../../assets/js/urls.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    industryList: [],
    searchText: null,
    noSearchData: false,
    pageIndex: 1,
    intentIndustryIds: []
  },
  onReady: function() {
    this._initIndustryList(true)
  },
  onUnload: function() {
    this._updateIntentIndustryIds()
  },
  onReachBottom: function() {
    this._initIndustryList(false)
  },
  _initIndustryList: function(research) {
    wx.showLoading({
      title: '加载中...'
    })
    var param = {
      pageIndex: research ? 1 : this.data.pageIndex,
      pageSize: 20
    }
    if (this.data.searchText) {
      Object.assign(param, {
        searchText: this.data.searchText
      })
    }
    urls._get(urls.industry_query, param).then((res) => {
      var resultList = []
      //重新搜索
      if (research) {
        resultList = res.result
      } else {
        resultList = this.data.industryList.concat(res.result)
      }
      //修改数据回显
      var userInfo = wx.getStorageSync("userInfo");
      var intentIndustryIds = [];
      if(!!userInfo.intentIndustryNames){
        var intentIndustryNames =userInfo.intentIndustryNames;
        for (let i =0 ;i< resultList.length;i++) {
          for(var item of intentIndustryNames){
            resultList[i].checked =  resultList[i].industryName== item || resultList[i].checked;
          }
        }
        for(let i =0 ;i< resultList.length;i++){
          if(  resultList[i].checked ){
            intentIndustryIds.push(resultList[i].id);
          }
        }

      }


      this.setData({
        intentIndustryIds:intentIndustryIds,
        industryList: resultList,
        pageIndex: res.pageInfo.pageIndex + 1,
        noSearchData: resultList.length == 0
      })

    }).catch((errMsg) => {
      wx.showToast({
        title: 'error',
        icon: 'none'
      })
    })
    wx.hideLoading()
  },
  _searchInputChange: function(e) {
    this.setData({
      searchText: e.detail
    })
    this._initIndustryList(true)
  },
  _onChange: function(e) {

    var selectedValues = e.detail.value;
    if (selectedValues.length == 0) {
      wx.showToast({
        title: '未选择任何数据',
        icon: 'none'
      })

    }
    var intentIndustryNames = new Array();
    var userInfo = wx.getStorageSync("userInfo");
    var industryList = this.data.industryList;
    for (let i =0 ;i< industryList.length;i++) {
      var industryId = industryList[i].id.toString();
      if( selectedValues.indexOf(industryId)>-1){
        industryList[i].checked = true;
        intentIndustryNames.push( industryList[i].industryName);

      }else{
        industryList[i].checked = false;
      }
    }

    userInfo.intentIndustryIds = selectedValues;
    userInfo.intentIndustryNames = intentIndustryNames;
    wx.setStorageSync("userInfo", userInfo);
    this.setData({
      industryList:industryList,
      intentIndustryIds: selectedValues
    });

    // max three
    if (selectedValues.length == 3) {
      wx.navigateBack()
    }
  },
  /**
   * 更新用戶意向岗位
   */
  _updateIntentIndustryIds: function() {
    if (this.data.intentIndustryIds) {

      urls._put(urls.user_perfect_info, {
        "intentIndustryIds": this.data.intentIndustryIds
      }).catch((errMsg) => {
        wx.showToast({
          title: 'update user intent Industry fail',
          icon: 'none'
        })
      })
    }
  }
})
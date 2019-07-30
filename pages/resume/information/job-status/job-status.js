const urls = require('../../../../assets/js/urls.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultList: [
      {
        id:'LOOKING_FOR_JOB',
        jobStatusListName:'正在求职'
      },
      {
        id: 'IN_PRACTICE',
        jobStatusListName: '正在实习'
      },
      {
        id: 'PLAN_FOR_JOB',
        jobStatusListName: '打算求职'
      },
      {
        id: 'PLAN_FOR_PRACTICE',
        jobStatusListName: '打算实习'
      },
      {
        id: 'WORKING',
        jobStatusListName: '已工作'
      }
    ],
    jobStatusList: [],
    searchText: null,
    noSearchData: false,
    pageIndex: 1,
    intentJobStatusListIds: []
  },
  onReady: function() {
    this._initJobStatusListList(true)
  },
  onUnload: function() {
    this._updateIntentJobStatusListIds()
  },
  onReachBottom: function() {
    this._initJobStatusListList(false)
  },
  _initJobStatusListList: function(research) {

    var resultList = this.data.resultList;
      //修改数据回显
      var userInfo = wx.getStorageSync("userInfo");
      var intentJobStatusListIds = [];
      if (!!userInfo.intentJobStatusListNames){
        var intentJobStatusListNames = userInfo.intentJobStatusListNames;
        for (let i =0 ;i< resultList.length;i++) {
          for (var item of intentJobStatusListNames){
            resultList[i].checked = resultList[i].jobStatusListName== item || resultList[i].checked;
          }
        }
        for(let i =0 ;i< resultList.length;i++){
          if(  resultList[i].checked ){
            intentJobStatusListIds.push(resultList[i].id);
          }
        }

      }


      this.setData({
        intentPostIds:intentPostIds,
        postList: resultList,
        pageIndex: res.pageInfo.pageIndex + 1,
        noSearchData: resultList.length == 0
      })

    
  },
  _searchInputChange: function(e) {
    this.setData({
      searchText: e.detail
    })
    this._initPostList(true)
  },
  _onChange: function(e) {

    var selectedValues = e.detail.value;
    if (selectedValues.length == 0) {
      wx.showToast({
        title: '未选择任何数据',
        icon: 'none'
      })

    }
    var intentPostNames = new Array();
    var userInfo = wx.getStorageSync("userInfo");
    var postList = this.data.postList;
    for (let i =0 ;i< postList.length;i++) {
      var postId = postList[i].postId.toString();
      if( selectedValues.indexOf(postId)>-1){
        postList[i].checked = true;
        intentPostNames.push( postList[i].postName);

      }else{
        postList[i].checked = false;
      }
    }

    userInfo.intentPostIds = selectedValues;
    userInfo.intentPostNames = intentPostNames;
    wx.setStorageSync("userInfo", userInfo);
    this.setData({
      postList:postList,
      intentPostIds: selectedValues
    });

    // max three
    if (selectedValues.length == 3) {
      wx.navigateBack()
    }
  },
  /**
   * 更新用戶意向岗位
   */
  _updateIntentPostIds: function() {
    if (this.data.intentJobStatusListIds) {

      urls._put(urls.user_perfect_info, {
        "intentJobStatusListIds": this.data.intentJobStatusListIds
      }).catch((errMsg) => {
        wx.showToast({
          title: 'update user intent JobStatus fail',
          icon: 'none'
        })
      })
    }
  }
})
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageList: Array
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showDetail: function(e) {
      // console.log(e.target.dataset)

      var _url = null
      if (e.target.dataset.linkType == 'COURSE') {
        // _url = '/pages/course/detail/course-detail?courseId=' + e.target.dataset.id
      } else if (e.target.dataset.linkType == 'KNOWLEDGE') {
        // _url = '/pages/article/article-detail?knowId=' + e.target.dataset.id
      } else if (e.target.dataset.linkType == 'ACTIVITY') {
        // _url = '/pages/activity/index?activitySubjectId=' + e.target.dataset.id
      } else if (e.target.dataset.linkType == 'COMPANY') {
        _url = '/pages/company/index?companyId=' + e.target.dataset.id
      } else if (e.target.dataset.linkType == 'JOB') {
        _url = '/pages/job/detail?jobId=' + e.target.dataset.id
      }
      if (_url) {
        wx.navigateTo({
          url: _url
        })
      }
    }
  }
})
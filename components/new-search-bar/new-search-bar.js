var searchHistoryKey = 'search-history'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noButton: Boolean,
    focus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    doSearch: function() {
      var _inputText = this.data.inputText
      if (_inputText == null || _inputText == "") {
        wx.showToast({
          title: '请输入搜索关键字',
          icon: 'none'
        })
        return
      }

      var searchHistory = wx.getStorageSync(searchHistoryKey)
      if (searchHistory) {
        if (!searchHistory.includes(_inputText)) {
          if (searchHistory.length >= 10) {
            searchHistory.pop()
          }
          searchHistory.unshift(_inputText)
        }
      } else {
        searchHistory = new Array(_inputText)
      }
      wx.setStorageSync("search-history", searchHistory)

      this.triggerEvent("tapSearch", {
        searchText: this.data.inputText
      })
    },
    searchInputChange: function(e) {
      this.triggerEvent("searchInputChange", e.detail.value)
      this.setData({
        inputText: e.detail.value
      })
    }
  }
})
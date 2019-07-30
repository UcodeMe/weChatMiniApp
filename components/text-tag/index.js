// components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagItems: {
      type: Array
    },
    defaultIfEmpty: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(event) {
      console.log(event)
      this.triggerEvent("tapTag", {
        tagText: event.target.dataset.text
      })
    }
  }
})
Component({
  externalClasses: ['outer-class-not-active', 'outer-class-bottom-padding'],
  /**
   * 组件的属性列表
   */
  properties: {
    tabbarItems: {
      type: Array
    },
    tabIndex: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(event) {
      var _tabIndex = event.target.dataset.current
      this.setData({
        tabIndex: _tabIndex
      });
      var eventDetail = {
        tabIndex: _tabIndex
      }
      this.triggerEvent('afterSelect', eventDetail);
    }
  }
})
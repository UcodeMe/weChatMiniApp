Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nodeNames: {
      type: Array,
      value: []
    }
  },

  ready: function () {
    console.log(this.properties.nodeNames)
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

  }
})
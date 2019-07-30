const companyRequest = require('../../assets/urls/company.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSalaryFilter: {
      type: Boolean,
      value: false
    },
    regionName: {
      type: String,
      value: '默认'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showFilter: false,
    showIndustry: false,
    showNature: false,
    showScale: false,
    showStaffCount: false,
    showIntents: false,
    showPosition: false,

    industryList: [],
    natureList: [],
    scaleList: [],
    /**
     * 企业规模
     */
    staffCountList: [{
        id: null,
        label: "不限",
        selected: false
      }, {
        id: "LESS_THAN_15",
        label: "少于15人",
        selected: false
      },
      {
        id: "BETWEEN_15_49",
        label: "15-50人",
        selected: false
      },
      {
        id: "BETWEEN_50_149",
        label: "50-150人",
        selected: false
      },
      {
        id: "BETWEEN_150_449",
        label: "150-500人",
        selected: false
      },
      {
        id: "BETWEEN_500_1999",
        label: "500-2000人",
        selected: false
      },
      {
        id: "BETWEEN_2000_9999",
        label: "2000-10000人",
        selected: false
      },
      {
        id: "GREATER_10000",
        label: "10000人以上",
        selected: false
      }
    ],
    //学历
    educationList: [{
        id: null,
        label: "不限",
        selected: false
      },
      {
        id: "DOCTOR",
        label: "博士",
        selected: false
      },
      {
        id: "POSTGRADUATE",
        label: "研究生",
        selected: false
      },
      {
        id: "UNDERGRADUATE",
        label: "本科",
        selected: false
      },
      {
        id: "JUNIOR",
        label: "大专",
        selected: false
      }
    ],
    schoolLevelList: [{
        id: null,
        label: "不限",
        selected: false
      },
      {
        id: "_985",
        label: "985",
        selected: false
      },
      {
        id: "_211",
        label: "211",
        selected: false
      }
    ],
    studentLevelList: [{
        id: null,
        label: "不限",
        selected: false
      },
      {
        id: "TOP5",
        label: "学霸",
        selected: false
      },
      {
        id: "TOP20",
        label: "实战经验",
        selected: false
      }
    ],
    positionList: [],
    salarySort: null
  },
  ready() {
    this._getIndustry()
    this._getNature()
    this._getScale()
    this._getPosition()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showIndustry: function() {
      this._setAllUnShown(0)
      console.log('current=')
      console.log(this.data.showIndustry)
      this.setData({
        showIndustry: !this.data.showIndustry,
        showFilter: !this.data.showIndustry
      }, () => {
        console.log(this.data.showIndustry)
        console.log(this.data.showFilter)
      })
    },
    _selectIndustry: function(e) {
      // console.log(e)
      let _industryList = this.data.industryList
      _industryList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        industryList: _industryList
      })
    },

    _showNature: function() {
      this._setAllUnShown(1)
      this.setData({
        showNature: !this.data.showNature,
        showFilter: !this.data.showNature
      })
    },
    _selectNature: function(e) {
      let _natureList = this.data.natureList
      _natureList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        natureList: _natureList
      })
    },

    _showScale: function() {
      this._setAllUnShown(2)
      this.setData({
        showScale: !this.data.showScale,
        showFilter: !this.data.showScale
      })
    },
    _selectScale: function(e) {
      let _scaleList = this.data.scaleList
      _scaleList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        scaleList: _scaleList
      })
    },


    _showStaffCount: function() {
      this._setAllUnShown(3)
      this.setData({
        showStaffCount: !this.data.showStaffCount,
        showFilter: !this.data.showStaffCount
      })
    },
    _selectStaffCount: function(e) {
      let _staffCountList = this.data.staffCountList
      _staffCountList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        staffCountList: _staffCountList
      })
    },

    _showIntents: function() {
      this._setAllUnShown(4)
      this.setData({
        showIntents: !this.data.showIntents,
        showFilter: !this.data.showIntents
      })
    },
    _selectSchoolLevel: function(e) {
      let _schoolLevelList = this.data.schoolLevelList
      _schoolLevelList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        schoolLevelList: _schoolLevelList
      })
    },
    _selectEducation: function(e) {
      let _educationList = this.data.educationList
      _educationList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        educationList: _educationList
      })
    },
    _selectStudentLevel: function(e) {
      let _studentLevelList = this.data.studentLevelList
      _studentLevelList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        studentLevelList: _studentLevelList
      })
    },


    _showPosition: function() {
      this._setAllUnShown(5)
      this.setData({
        showPosition: !this.data.showPosition,
        showFilter: !this.data.showPosition
      })
    },
    _selectPosition: function(e) {
      let _positionList = this.data.positionList
      _positionList.forEach(function(item) {
        if (e.currentTarget.dataset.id == item.id) {
          item.selected = !item.selected
        }
      })
      this.setData({
        positionList: _positionList
      })
    },

    /**
     * 设置其他为不显示
     */
    _setAllUnShown: function(index) {
      this.setData({
        showIndustry: index == 0 ? this.data.showIndustry : false,
        showNature: index == 1 ? this.data.showNature : false,
        showScale: index == 2 ? this.data.showScale : false,
        showStaffCount: index == 3 ? this.data.showStaffCount : false,
        showIntents: index == 4 ? this.data.showIntents : false,
        showPosition: index == 5 ? this.data.showPosition : false
      })
      console.log(this.data)
    },



    /**
     * 所属行业
     */
    _getIndustry: function() {
      let that = this
      companyRequest._get(companyRequest.industry_list_all).then((res) => {
        let _industryList = []
        res.result.forEach(item => {
          item.selected = false
          _industryList.push(item)
        })
        that.setData({
          industryList: _industryList
        })
      }).catch((err) => {})
    },
    /**
     * 企业性质
     */
    _getNature: function() {
      let that = this
      companyRequest._get(companyRequest.company_nature_all).then((res) => {
        let _natureList = []
        res.result.forEach(item => {
          item.selected = false
          _natureList.push(item)
        })
        that.setData({
          natureList: _natureList
        })
      }).catch((err) => {})
    },
    /**
     *
     *
     * 发展阶段
     *
     */
    _getScale: function() {
      let that = this
      companyRequest._get(companyRequest.scale_list_all).then((res) => {
        let _scaleList = []
        res.result.forEach(item => {
          item.selected = false
          _scaleList.push(item)
        })
        that.setData({
          scaleList: _scaleList
        })
        // console.log(this.data.scaleList)
      }).catch((err) => {})
    },
    /**
     *
     *
     * 行业地位
     *
     */
    _getPosition: function() {
      let that = this
      companyRequest._get(companyRequest.position_list).then((res) => {
        let _positionList = []
        res.result.forEach(item => {
          item.selected = false
          _positionList.push(item)
        })
        that.setData({
          positionList: _positionList
        })
        // console.log(this.data.positionList)
      }).catch((err) => {})
    },

    _doFilter: function() {
      let _industryIds = []
      this.data.industryList.forEach(function(item) {
        if (item.selected) _industryIds.push(item.id)
      })
      let _scaleIds = []
      this.data.scaleList.forEach(function(item) {
        if (item.selected) _scaleIds.push(item.id)
      })
      let _natureIds = []
      this.data.natureList.forEach(function(item) {
        if (item.selected) _natureIds.push(item.id)
      })
      let _industryPositionIds = []
      this.data.positionList.forEach(function(item) {
        if (item.selected) _industryPositionIds.push(item.id)
      })
      let _staffCounts = []
      this.data.staffCountList.forEach(function(item) {
        if (item.selected) _staffCounts.push(item.id)
      })
      let _schoolLevels = []
      this.data.schoolLevelList.forEach(function(item) {
        if (item.selected) _schoolLevels.push(item.id)
      })
      let _educationLevels = []
      this.data.educationList.forEach(function(item) {
        if (item.selected) _educationLevels.push(item.id)
      })
      let _studentLevels = []
      this.data.studentLevelList.forEach(function(item) {
        if (item.selected) _studentLevels.push(item.id)
      })
      let params = {
        industryIds: _industryIds,
        scaleIds: _scaleIds,
        natureIds: _natureIds,
        industryPositionIds: _industryPositionIds,
        staffCounts: _staffCounts,
        schoolLevels: _schoolLevels,
        educationLevels: _educationLevels,
        studentLevels: _studentLevels,
        salarySort: this.data.salarySort
      }
      this.triggerEvent('doFilter', params, {})
      this.setData({
        showFilter: false
      })
      this._setAllUnShown(-1)
    },

    _doReset: function() {
      let _industryList = this.data.industryList
      _industryList.forEach(function(item) {
        item.selected = false
      })

      let _natureList = this.data.natureList
      _natureList.forEach(function(item) {
        item.selected = false
      })

      let _scaleList = this.data.scaleList
      _scaleList.forEach(function(item) {
        item.selected = false
      })
      let _staffCountList = this.data.staffCountList
      _staffCountList.forEach(function(item) {
        item.selected = false
      })
      let _educationList = this.data.educationList
      _educationList.forEach(function(item) {
        item.selected = false
      })
      let _schoolLevelList = this.data.schoolLevelList
      _schoolLevelList.forEach(function(item) {
        item.selected = false
      })
      let _studentLevelList = this.data.studentLevelList
      _studentLevelList.forEach(function(item) {
        item.selected = false
      })
      let _positionList = this.data.positionList
      _positionList.forEach(function(item) {
        item.selected = false
      })

      this.setData({
        industryList: _industryList,
        natureList: _natureList,
        scaleList: _scaleList,
        staffCountList: _staffCountList,
        educationList: _educationList,
        schoolLevelList: _schoolLevelList,
        studentLevelList: _studentLevelList,
        positionList: _positionList,
        showFilter: false,
        salarySort: null
      })

      this._setAllUnShown(-1)
    },
    _showRegion: function() {
      wx.navigateTo({
        url: '/pages/region/index?regionCategory=campus'
      })
    },
    _doSalarySort: function() {
      //初始为空
      if (this.data.salarySort == null) {
        //点击倒序
        this.setData({
          salarySort: 'desc'
        })
      } else if (this.data.salarySort == 'desc') {
        this.setData({
          salarySort: 'asc'
        })
      } else if (this.data.salarySort == 'asc') {
        this.setData({
          salarySort: 'desc'
        })
      }
      console.log(this.data.salarySort)
    }
  }
})
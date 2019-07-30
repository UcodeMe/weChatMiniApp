const urls = require('../../../assets/js/urls.js');
Page({
    data: {
        regionList: [],
        searchText: null,
        noSearchData: false,
        pageIndex: 1,
        intentRegionIds: []
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this._initRegionList(true);
    },
    onUnload: function() {
        this._updateIntentRegionIds()
    },
    _doSearch: function() {
        this._initRegionList(true)
    },
    /**
     * 加载城市信息
     */
    _initRegionList: function(research) {
        wx.showLoading({
            title: '加载中...'
        })
        var param = {
            pageIndex: research ? 1 : this.data.pageIndex,
            pageSize: 20,
            regionType: 'CITY'
        }
        if (this.data.searchText) {
            Object.assign(param, {
                searchText: this.data.searchText
            })
        }
        urls._get(urls.dict_region, param).then((res) => {
            var resultList = []
            //重新搜索
            if (research) {
                resultList = res.result
            } else {
                resultList = this.data.regionList.concat(res.result)
            }
            //修改数据回显
            var userInfo = wx.getStorageSync("userInfo");
            var intentRegionIds = [];
            if (!!userInfo.intentRegionNames) {
                var intentRegionNames = userInfo.intentRegionNames;
                for (let i = 0; i < resultList.length; i++) {
                    for (var item of intentRegionNames) {
                        resultList[i].checked = resultList[i].regionName == item || resultList[i].checked;
                    }
                }
                for (let i = 0; i < resultList.length; i++) {
                    if (resultList[i].checked) {
                        intentRegionIds.push(resultList[i].id);
                    }
                }

            }

            this.setData({
                intentRegionIds: intentRegionIds,
                regionList: resultList,
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
        if (e.detail == null || e.detail == '') {
            this._initRegionList()
        }
    },
    onReachBottom: function() {
        this._initRegionList(false)
    },
    _onChange: function(e) {
        var selectedValues = e.detail.value
        if (selectedValues.length == 0) {
            wx.showToast({
                title: '未选择任何数据',
                icon: 'none'
            })

        }
        //更新data,storage数据
        var regionList = this.data.regionList;
        var intentRegionNames = [];
        for (let i = 0; i < regionList.length; i++) {
            var regionId = regionList[i].id.toString();
            if (selectedValues.indexOf(regionId) > -1) {
                regionList[i].checked = true;
                intentRegionNames.push(regionList[i].regionName);

            } else {
                regionList[i].checked = false;
            }

        }

        this.setData({
            regionList: regionList,
            intentRegionIds: selectedValues
        });
        var _location = wx.getStorageSync("location") || {};
        _location = intentRegionNames;
        // locationId = selectedValues;
        wx.setStorageSync("location", location);
        // max three
        if (selectedValues.length == 1) {
            wx.navigateBack()
        }
    },
    /**
     * 更新地点选择
     */
    _updateIntentRegionIds: function() {
        if (this.data.intentRegionIds) {
            // urls._put(urls.user_perfect_info, {
            //     "intentRegionIds": this.data.intentRegionIds
            // }).catch((errMsg) => {
            //     wx.showToast({
            //         title: '更新失败',
            //         icon: 'none'
            //     })
            // })
        }
    }
})

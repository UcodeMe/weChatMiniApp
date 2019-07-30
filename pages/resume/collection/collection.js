const urls = require('../../../assets/js/urls.js');
var WxParse = require('../../../assets/wxParse/wxParse.js');
var qiniuUploader = require('../../../assets/js/qiniuUploader.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jobId: null,
    jobInfo: {},
    article: null,
    token: null,
    resumeUrl: "https://qiniu3.meefine.com/images/yxtxs02.png"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   this._getUploadToken();
  },
  onReady: function() {
  },
  _getUploadToken() {
    urls._get(urls.get_token).then((res) => {
      this.setData({token:res.result})
    })
  },
 
  _uploadResume(e) {
    let that = this;

    /*wx.chooseImage({
     success(res) {
       const tempFilePaths = res.tempFilePaths[0]
       qiniuUploader.upload(tempFilePaths, (response) => {
         let url = response.imageURL;
         that.setData({ resumeUrl:url});
         
       }, (error) => {
         console.log('error: ' + error)
       }, {
         region: 'ECN',
         domain: 'https://qiniu3.meefine.com',
         uptoken: that.data.token
       }, (res) => {
         console.log(res)
         // console.log('上传进度', res.progress)
         // console.log('已经上传的数据长度', res.totalBytesSent)
         // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
       })
       
    }
   })*/
 },
  _deleteImage(e) {
    
  }

   
})
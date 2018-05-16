//index.js
const app = getApp()
Page({
  data: {
  },
  translate:function(){ //用户点击跳转到翻译页面的方法
    wx.navigateTo({
      url: '../translate/translate'
    })
  },
  onLoad: function () {
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来学习吧',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

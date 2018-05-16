 // pages/word/word.js
Page({
  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    obj:{},
    autiosrc:"../../img/abtn.png",
    hide:true,
    enddate:"",
    date:""
  },
  audioPlay: function () { //音频播放功能
    this.audioCtx.play() 
    this.setData({
      autiosrc:"../../img/abtn_select.png"
    })
  },
  audioend:function(){     //音频自然结束时的事件
    this.setData({
      autiosrc: "../../img/abtn.png"
    })
  },
  fx:function(){          //分享按钮的操作
    this.setData({
      hide:false
    })
  },
  longTap:function(e){  //用户长按保存图片事件
    let url = this.data.obj.fenxiang_img;
    let url1 = "https://"+url.slice(7)
    console.log(url1)
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        wx.downloadFile({
          url: url1,
          success: function (res) {
            console.log(res)
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                console.log(res)
              },
              fail: function (res) {
                console.log(res)
                console.log('fail')
              }
            })
          },
          fail: function () {
            console.log('fail')
          }
        }) 
      }
    }) 
  },
  close:function(){
    this.setData({
      hide: true
    })
  },
  bindDateChange:function(e){ //日期选择事件
    this.setData({
      date: e.detail.value
    })
    let date=this.data.date
    let that = this
    wx.request({
      url: 'https://open.iciba.com/dsapi',
      data: {
        file: "json",
        date: date
      },
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          obj: res.data,
          date: res.data.dateline
        })
      }
    })
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://open.iciba.com/dsapi',
      data: {
        file:"json",
        date:""
      },
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
            obj:res.data,
            date:res.data.dateline,
            enddate: res.data.dateline
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来学英语吧',
      path: 'pages/word/word',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
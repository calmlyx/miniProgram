// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      userName:"LiYunXing",
      userInfo:{},
      isShow:true
  },
  handle(){
    //点击页面跳转
    wx.switchTab({
      url:'/pages/list/list'
    })
  },
  getUserInfo(){
    // 判读用户是否授权
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          // 用户已授权
          this.setData({
            isShow: false
          })
        } else {
         //用户未授权
          this.setData({
            isShjow: true
          })
        }
      }
    })
    // 获取用户登录信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log("授权失败")
        // this.getUserInfo()
      }
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  handleGetUserInfo(data){
    // 判断用户是否点击的是允许
    if(data.detail.rawData){
      // 用户点击的是允许
      this.getUserInfo()
    }
  },
})
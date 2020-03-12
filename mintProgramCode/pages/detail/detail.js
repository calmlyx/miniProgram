// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数值
    let index = options.index;
    this.setData({
      detailObj:datas.list_data[index],
      index 
    })
    // 根据本地缓存判断该文章是否收藏
    let detailStorage = wx.getStorageSync("isCollected")
    if(!detailStorage){
      wx.setStorageSync('isCollected', {})
    }
    if(detailStorage[index]){
      this.setData({
        isCollected:true
      })
    }

  },
  // 点击收藏
  handleCollected(){
    let isCollected = !this.data.isCollected;
    // 更新状态
    this.setData({
      isCollected
    })
    // 提示用户
    let title = !isCollected?'取消收藏':'收藏成功'
    wx.showToast({
      title,
      icon:'success'
    })
    // 缓存状态
    let { index } = this.data
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        let Obj = datas.data
        Obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: Obj,
          success: () => {
            console.log('缓存成功')
          } 
        })
      }
    })
  },
  // 点击分享功能
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享给朋友','分享到朋友圈','分享给QQ好友'
      ],
    })
  }
})
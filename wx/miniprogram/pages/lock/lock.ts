const shareLocationKey = "share_location"

Page({


  data: {
      shareLocation: false,
      avatarURL: '',
  },

  async onLoad() {
    const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      avatarURL:userInfo.avatarUrl,
      shareLocation:wx.getStorageSync(shareLocationKey) || false
    })

  },

  onGetUserInfo() {

    const userInfo: WechatMiniprogram.UserInfo = {
      avatarUrl: '/resources/man.jpg', 
      city: '重庆',
      country: '中国',  
      gender: 1,
      language: "zh_CN",
      nickName: '测试号',
      province: '重庆',

    }
    if (userInfo) {
        getApp<IAppOption>().resolveUserInfo(userInfo)
        this.setData({
            shareLocation: true,
            avatarURL:userInfo.avatarUrl
        })
        wx.setStorageSync(shareLocationKey, true)
    }

  },

  onShareLocation(e: any) {
    this.data.shareLocation = e.detail.value
    wx.setStorageSync(shareLocationKey, this.data.shareLocation)
  
  },

  onUnlockTap() {
    wx.showLoading({
      title:'开锁中',
      mask:true, //透明蒙层
    })

    setTimeout(()=>{
      wx.redirectTo({
        url: '/pages/driving/driving',
        complete:()=>{
          wx.hideLoading()
        }
      })
    },2000)
      
  },

  onUnload() {
      this.clearCarRefresher()
      wx.hideLoading()
  },

  clearCarRefresher() {
    
  },
})
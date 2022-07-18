let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void = (reason?: any) =>{
  if (reason) console.log(reason)
}

// app.ts
App<IAppOption>({
  globalData: {
    userInfo:new Promise((resolve,reject)=>{
        resolveUserInfo = resolve
        rejectUserInfo = reject
    })
  },
  async onLaunch() {

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})
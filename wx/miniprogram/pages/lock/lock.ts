import { IAppOption } from "../../appoption"
import { routing } from "../../utils/routing"

const shareLocationKey = "share_location"

Page({


  data: {
      shareLocation: false,
      avatarURL: '',
  },

  async onLoad(opt: Record<'car_id', string>) {
    const o:routing.LockOpts = opt
    console.log('unlocking car',o.car_id)
    const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      avatarURL:userInfo.avatarUrl,
      shareLocation:wx.getStorageSync(shareLocationKey) || false
    })

  },

  onGetUserInfo(e:any) {

    const userInfo: WechatMiniprogram.UserInfo = e.detail.unserInfo
    if (userInfo) {
        getApp<IAppOption>().resolveUserInfo(userInfo)
        this.setData({
            shareLocation: true,
        })
        wx.setStorageSync(shareLocationKey, true)
    }

  },

  onShareLocation(e: any) {
    this.data.shareLocation = e.detail.value
    wx.setStorageSync(shareLocationKey, this.data.shareLocation)
  
  },

  onUnlockTap() {
    wx.getLocation({
      type:'gcj02',
      success:loc=>{
        console.log('starting a trip',{
          location:{
              latitude:loc.latitude,
              longitude:loc.longitude,
          },
          //TODO:需要双向绑定
          avatarURL:this.data.shareLocation ? this.data.avatarURL : '',
        }
        )
        const tripId = 'trip456'
        wx.showLoading({
          title:'开锁中',
          mask:true, //透明蒙层
        })
        setTimeout(()=>{
          wx.redirectTo({
            url:routing.driving({
              trip_id:tripId,
            }),
            complete:()=>{
              wx.hideLoading()
            }
          })
        },2000)
      },
      fail:() => {
        wx.showToast({
            icon: 'none',
            title: '请前往设置页授权位置信息',
        })
      }
    })
   
  },
})
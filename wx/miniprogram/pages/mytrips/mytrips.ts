import { routing } from "../../utils/routing"

interface Trip {
  id: string
  shortId: string
  start: string
  end: string
  duration: string
  fee: string
  distance: string
  status: string
  inProgress: boolean
}

interface MainItem {
  id: string
  navId: string
  navScrollId: string
  data: Trip
}

interface NavItem {
  id: string
  mainId: string
  label: string
}

interface MainItemQueryResult {
  id: string
  top: number
  dataset: {
      navId: string
      navScrollId: string
  }
}

Page({
  scrollStates: {
      mainItems: [] as MainItemQueryResult[],
  },

  layoutResolver: undefined as (()=>void)|undefined,

  data: {
      promotionItems: [
          {
              img: 'https://i0.hdslb.com/bfs/banner/de779b9b2a10a59c4c3e21754d59926024012b33.jpg@976w_550h_1c.webp',
              promotionID: 1,
          },            
          {
              img: 'https://w.wallhaven.cc/full/m9/wallhaven-m9jqz9.jpg',
              promotionID: 2,
          },
          {
              img: 'https://i0.hdslb.com/bfs/banner/9fce93d4d936eaa5847a9014436a5be6548093d7.jpg@976w_550h_1c.webp',
              promotionID: 3,
          },
          {
              img: 'https://i0.hdslb.com/bfs/banner/b8089866e3e7ed8073bab69b533c69483ef8dd71.png@976w_550h_1c.webp',
              promotionID: 4,
          },
          {
            img: 'https://i0.hdslb.com/bfs/banner/ba26f24c8972791bf8db14015bc7881e61cce97d.png@976w_550h_1c.webp',
            promotionID: 5,
        },   
      ],
  
      avatarURL: '',
      tripsHeight: 0,
      navCount: 0,
      mainItems: [] as MainItem[],
      mainScroll: '',
      navItems: [] as NavItem[],
      navSel: '',
      navScroll: '',
  },

  onLoad() {
     
  },

  onShow() {
    
  },

  onReady() {
      wx.createSelectorQuery().select('#heading')
          .boundingClientRect(rect => {
              const height = wx.getSystemInfoSync().windowHeight - rect.height
              this.setData({
                  tripsHeight: height,
                  navCount: Math.round(height/50),
              }, () => {
                  if (this.layoutResolver) {
                      this.layoutResolver()
                  }
              })
          }).exec()
  },

  populateTrips() {

  },

  prepareScrollStates() {
      wx.createSelectorQuery().selectAll('.main-item')
          .fields({
              id: true,
              dataset: true,
              rect: true,
          }).exec(res => {
              this.scrollStates.mainItems = res[0]
          })
  },

  onPromotionItemTap(e: any) {
      const promotionID:number = e.currentTarget.dataset.promotionId
      if (promotionID) {
          console.log('claiming promotion', promotionID)
      }
  },

  onGetUserInfo(e: any) {
      const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
      if (userInfo) {
          getApp<IAppOption>().resolveUserInfo(userInfo)
          this.setData({
              avatarURL: userInfo.avatarUrl,
          })
      }
  },

  onRegisterTap() {
    wx.navigateTo({
      url: routing.register(),
    })
     
  },

  onNavItemTap(e: any) {
      const mainId: string = e.currentTarget?.dataset?.mainId
      const navId: string = e.currentTarget?.id
      if (mainId && navId) {
          this.setData({
              mainScroll: mainId,
              navSel: navId,
          })
      }
  },

  onMainScroll(e: any) {
      const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
      if (top === undefined) {
          return
      }

      const selItem = this.scrollStates.mainItems.find(
          v => v.top >= top)
      if (!selItem) {
          return
      }

      this.setData({
          navSel: selItem.dataset.navId,
          navScroll: selItem.dataset.navScrollId,
      })
  },

  onMianItemTap(e: any) {
  }
})


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
              img: 'https://img.mukewang.com/5f7301d80001fdee18720764.jpg',
              promotionID: 1,
          },            
          {
              img: 'https://img.mukewang.com/5f6805710001326c18720764.jpg',
              promotionID: 2,
          },
          {
              img: 'https://img.mukewang.com/5f6173b400013d4718720764.jpg',
              promotionID: 3,
          },
          {
              img: 'https://img.mukewang.com/5f7141ad0001b36418720764.jpg',
              promotionID: 4,
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

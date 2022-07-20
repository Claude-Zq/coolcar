import { routing } from "../../utils/routing"

interface Trip {
    id: string
    start: string
    end: string
    duration: string
    fee: string
    distance: string
    status: string
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

    data: {
        promotionItems: [
            {
                img: 'https://i0.hdslb.com/bfs/banner/93cdd2d9c1a6a2c02b407090164f8fdc99658f1a.jpg@976w_550h_1c.webp',
                promotionID: 1,
            },            
            {
                img: 'https://i0.hdslb.com/bfs/banner/0cdf10d9501d28156b479cfe24c634dd8eb222d1.jpg@976w_550h_1c.webp'
            },
            {
                img: 'https://i0.hdslb.com/bfs/banner/4115a245830d32634b9fe5127749ec06af450e38.png@976w_550h_1c.webp',
                promotionID: 3,
            },
            {
                img: 'https://i0.hdslb.com/bfs/banner/3504a32e6eb3588dcca1b07585160dfcee78af45.png@976w_550h_1c.webp',
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

    async onLoad() {
        this.populateTrips()
        const userInfo = await getApp<IAppOption>().globalData.userInfo
        this.setData({
            avatarURL: userInfo.avatarUrl,
        })
    },

    onReady() {
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect(rect => {
                const height = wx.getSystemInfoSync().windowHeight - rect.height
                this.setData({
                    tripsHeight: height,
                    navCount: Math.round(height/50),
                })
            }).exec()
    },

    populateTrips() {
        const mainItems: MainItem[] = []
        const navItems: NavItem[] = []
        let navSel = ''
        let prevNav = ''
        for (let i = 0; i < 100; i++) {
            const mainId = 'main-' + i
            const navId = 'nav-' + i
            const tripId = (10001 + i).toString()
            if (!prevNav) {
                prevNav = navId
            }
            mainItems.push({
                id: mainId,
                navId: navId,
                navScrollId: prevNav,
                data: {
                    id: tripId,
                    start: '东方明珠',
                    end: '迪士尼',
                    distance: '27.0公里',
                    duration: '0时44分',
                    fee: '128.00元',
                    status: '已完成',
                },
            })
            navItems.push({
                id: navId,
                mainId: mainId,
                label: tripId,
            })
            if (i === 0) {
                navSel = navId
            }
            prevNav = navId
        }
        this.setData({
            mainItems,
            navItems,
            navSel,
        }, () => {
            this.prepareScrollStates()
        })
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
        console.log(e)
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
    }
})

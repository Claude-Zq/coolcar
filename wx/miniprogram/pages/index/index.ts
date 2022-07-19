

const initialLat = 29.761267625855936
const initialLng = 121.87264654736123

Page({

  data: {
    avatarURL: '',
    setting:{
      skew: 0,
      rotate: 0,
      showLocation: false,
      showScale: false,
      subKey: '',
      layerStyle: 1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,

      location:{
        latitude: initialLat,
        longitude: initialLng,
      },
    },
    scale:10,
    markers: [
      {
        iconPath: "/resources/man.jpg",
        id:0,
        latitude: 23.099994,
        longitude:113.324520,
        width:50,
        height:50 
      },
      {
        iconPath:"/resources/car.jpeg",
        id:1,
        latitude:23.099994,
        longitude:114.324520,
        width:50,
        height:50
      },
    ]
    },

    onScanClicked(){
        wx.scanCode({
          success:()=>{
            wx.navigateTo({
              url:'/pages/register/register',
            })
          },
          fail:console.error,
        })
    },

    onShow() {
      
    },

    onHide() {
      
    },
   
    async getInfo(){
      //获取用户信息
    },
    
    onMyLocationTap() {
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          this.setData({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
          })
        }, 
        fail: () => {
          wx.showToast({
            icon: 'none',
            title: '请前往设置页授权',
          })
        }
      })
    },

    moveCars(){
      const map = wx.createMapContext("map")
      const dest ={
        latitude: 23.099994,
        longitude:113.324520,
      }

      const moveCar= ()=>{
        dest.latitude += 0.1
        dest.longitude += 0.1
        map.translateMarker({
          destination:{
            latitude : dest.latitude,
            longitude:dest.longitude,
          },
          markerId :0,
          autoRotate:false,
          rotate : 0,
          duration : 5000,
          animationEnd:moveCar,
        })

        moveCar()

      }
      
    }
  
})

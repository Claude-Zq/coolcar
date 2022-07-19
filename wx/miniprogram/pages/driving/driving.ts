const updateIntervalSec = 5
const initialLat = 29.531873
const initialLng = 106.607808


Page({
  timer: undefined as number|undefined,
  tripID: '',

  data: {
      location: {
          latitude: initialLat,
          longitude: initialLng,
      },
      scale: 12,
      elapsed: '00:00:00',
      fee: '0.00',
      markers: [
          {
              iconPath: "/resources/car.jpeg",
              id: 0,
              latitude: initialLat,
              longitude: initialLng,
              width: 20,
              height: 20,
          },
      ],
  },

  onLoad(){
    this.setupLocationUpdator()
  },

  onUnload(){
    wx.stopLocationUpdate()
  },


  setupLocationUpdator(){
    wx.startLocationUpdate({
      fail:console.error,
    })
    wx.onLocationChange(loc=>{
      console.log('location : ',loc)
      this.setData({
        location:{
          latitude:loc.latitude,
          longitude:loc.longitude,
        },
      })
    })
  },
  
})
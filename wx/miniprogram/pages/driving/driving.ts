const updateIntervalSec = 5
const initialLat = 29.531873
const initialLng = 106.607808

function formatDuration(sec:number){
  const padString = (n:number)=>
    n < 10 ? '0'+n.toFixed(0) : n.toFixed(0)
  
  const h =Math.floor(sec /3600)
  sec -= 3600 *h
  const m = Math.floor(sec/60)
  sec -= 60 *m
  const s  = Math.floor(sec)
  return  `${padString(h)}:${padString(m)}:${padString(s)}`
}

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
    this.setupTimer()
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
  setupTimer(){
    let elapsedSec = 0
    setInterval(()=>{
      elapsedSec++
      this.setData({
        elapsed:formatDuration(elapsedSec),
      })

    },1000)
  },
  
})
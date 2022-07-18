Page({

  data:{
    licImgURL : undefined as string| undefined,
  },

  onUploadLic(){
    wx.chooseMedia({
      success:res=>{
        if (res.tempFiles.length > 0){
          this.setData({
            licImgURL:res.tempFiles[0].tempFilePath
          })
        }
      }
    })
  },
})
Page({
  redirectURL: '',

  data:{
    licNo: '',
    name: '',
    genderIndex: 0,
    genders: ['未知', '男', '女','其他'],
    birthDate: '1990-01-01',
    licImgURL: '',
    state:'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',
  },
  onLoad(opt: Record<'redirect', string>) {
    if(opt.redirect){
      this.redirectURL = decodeURIComponent(opt.redirect)
    }
  },

  onUploadLic(){
    wx.chooseMedia({
      success:res=>{
        if (res.tempFiles.length > 0){
          this.setData({
            licImgURL:res.tempFiles[0].tempFilePath
          })

          //TODO: upload image
          setTimeout(()=>{
            this.setData({
              licNo:'3252452345',
              name:'张三',
              genderIndex: 1,
              birthDate:'2001-10-10',
            })
          },1000)
        }
      }
    })
  },


  onGenderChange(e: any) {
    this.setData({
        genderIndex: parseInt(e.detail.value),
    })
  },
  onBirthDateChange(e: any) {
    this.setData({
        birthDate: e.detail.value,
    })
  },
  onSubmit() {
    //TODO : submit the form to server
    this.setData({
        state:'PENDING',
    })
    setTimeout(()=>{
      this.onLicVerified()
    },3000)
  },
  onResubmit() {
     //TODO : Resubmit the form to server
    this.setData({
      state:'UNSUBMITTED',
      licImgURL:''
    })
  },
  onLicVerified() {
    this.setData({
      state:'VERIFIED',
    })
    if (this.redirectURL){
      wx.redirectTo({
        url:this.redirectURL,
      })
    }
  }

})
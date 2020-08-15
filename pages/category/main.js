import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setNavigationBarTitle();
    this.getCates();

      // 获取本地缓存的数据
      const Cates=wx.getStorageSync('cates');
      // 1判断本地缓存中有无数据
      if(!Cates){
        // 没有数据就调用方法重新发送请求获取数据
        this.getCates();
      }else{
        if(Date.now()-Cates.time>1000*10){
          // 如果缓存中的数据超过10s,重新发起请求
          this.getCates();
        }else{
          // 可以使用旧的数据
          this.Cates=Cates.data;
          let leftMenuList=this.Cates.map(v=>v.cat_name);
          let rightContent=this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightContent
      })
        }

      }

  },
  // 获取导航标题文字
  setNavigationBarTitle() {
    wx.setNavigationBarTitle({
      title: '分类'
    })
  },
  
  // 获取分类数据
  async getCates() {
    // request({
    //   url: '/categories'
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;
    //   //把接口的数据存入本地缓存中
    //   wx.setStorageSync('cates', { time:Date.now(),data:this.Cates });
    //   // 构造左侧的大菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   // 构造右侧的商品数据
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    // 使用async await来发起请求
    const res=await request({url: '/categories'});
    this.Cates=res;
      //把接口的数据存入本地缓存中
       wx.setStorageSync('cates', { time:Date.now(),data:this.Cates });
      // 构造左侧的大菜单数据
       let leftMenuList=this.Cates.map(v=>v.cat_name);
       // 构造右侧的商品数据
       let rightContent=this.Cates[0].children;
      this.setData({
         leftMenuList,
         rightContent
       })
  },

//  左侧菜单的点击事件
handleItemTap(e) {
// 1.获取被点击的标题身上的索引
// 2.给data的currentIndex赋值就可以
// 根据不同的索引
  const { index } =e.currentTarget.dataset;
  let rightContent=this.Cates[index].children;
  this.setData({
    currentIndex: index,
    rightContent,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
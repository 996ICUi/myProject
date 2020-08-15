/* 
1 发送请求获取数据 


4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */
import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index.js";




      
      
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    // isCollect: false
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let pages=getCurrentPages();
    // let currentPage=pages[pages.length];
    // let options=currentPage.options;

    const {goods_id}=options;
    this.getGoodsDetail(goods_id);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj=await request ({url: '/goods/detail',data: {goods_id}});
    this.goodsInfo=goodsObj;
    // 获取缓存中的商品收藏的数目
    // let collect = wx.getStorageSync("collect") || [];
    // // 判断商品是否被收藏
    // let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // 部分水果机不识别webp格式
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics
      }
      // isCollect
    })
  },
  // 点击轮播图，放大预览
  // 2 点击轮播图 预览大图
  // 1 给轮播图绑定点击事件
  // 2 调用小程序的api  previewImage 
  handlePrevewImage(e) {
    // 1 先构造要预览的图片数组 
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });

  },

  // 3 点击 加入购物车
  // 1 先绑定点击事件
  // 2 获取缓存中的购物车数据 数组格式 
  // 3 先判断 当前的商品是否已经存在于 购物车
  // 4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  // 5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  // 6 弹出提示

  // 点击加入购物车
  handleCartAdd () {
    // 获取缓存中的购物车数组；
    let cart=wx.getStorageSync('cart')||[];
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      this.goodsInfo.num=1;
      this.goodsInfo.checked=true;
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo);
    }else{
      cart[index].num++;
    }
    // 把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart);
    // 弹出弹窗提示
    wx.showToast({
      title: '加入成功',
      mask: true
    });
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
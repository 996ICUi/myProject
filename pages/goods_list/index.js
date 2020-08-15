import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// 用户上滑页面 滚动条触底，开始加载下一页数据
// 1、找到滚动条触底事件
// 2.判断还有没有下一页数据
      // （1）获取到总页数
      // 总页数=总条数/页容量
      // （2）获取到当前的页码
      // （3）判断当前的页码是否大于总页数
// 3.假如没有下一页数据  弹出一个提示
// 4.假如还有下一页数据 来加载下一页数据
      // 1 当前的页码 ++
      // 2 重新发送请求
      // 3 数据请求回来  
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams:{
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList();
// 界面 交互API接口
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    },3500)

  },

  // 获取商品列表数据
  async getGoodsList() {
    const res=await request({url: '/goods/search',data:this.QueryParams});
    // 获取总条数
    const total=res.total;
    // console.log(total);
    // 获取总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    }),
    wx.stopPullDownRefresh();

  },
  // 标题点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    //1 获取被点击的标题索引
    const {index}=e.detail;
    // 2修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
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
  // 重置数组
    this.setData({
      goodsList: []
    }),
    // 重置页码 页码为1
    this.QueryParams.pagenum=1;
    // 3发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>this.totalPages) {
      // 没有下一页
      wx.showToast({
        title: '亲，已经到底了',
      });
    }else {
      // 还有下一页
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
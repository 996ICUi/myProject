const { request } = require("../../request/index.js");
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getOrders} from "../../utils/asyncWx.js";
// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退货/退款",
        isActive: false
      }
    ],
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let pages=getCurrentPages();
    // let currentPage=pages[pages,length-1];
    // console.log(currentPage.options);
    // const {type}=currentPage.options;

    // this.getOrders(type);
  },
//   async getOrders(type) {
// const res=await request({
//   url: '/my/orders/all',data: {type}
// });
// console.log(res);
//   },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
})
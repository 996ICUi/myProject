// 1点击支付按钮
//   先判断缓存中有没有token
//   没有 跳转到授权页面 获取token
//   有token
import { getSetting, chooseAddress, openSetting, showModal ,showToast,requestPayment} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    cart=cart.filter(v=>v.checked);
    this.setData({ address });
     // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;

    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice, 
      totalNum,
      address
    });
  }
  // handleOrderPay() {
  //   try {
  //     const token =wx.getStorageSync('token');
  //     if(!token) {
  //       wx.navigateTo({
  //         url: '/pages/auth/index',
  //       });
  //       return;
  //     }
      // // 创建订单
      //   // 请求头参数
      // const header={Authorization:token};
      //   // 请求体参数
      // const order_price=this.data.totalPrice;
      // const consignee_addr=this.data.address.all;
      // const cart=this.data.cart;
      // let goods=[];
      // cart.forEach(v=>goods.push({
      //   goods_id: v.goods_id,
      //   goods_number: v.num,
      //   goods_price: v.goods_price
      // }));
      // // 发送请求 获取订单编号
      // const {order_number}=await request({url: '/my/orders/create',method: 'post',data: orderParams,header});
      // // 发起 预支付
      // const {pay}=await request({url: '/my/orders/req_unifiedorder',method: 'post',header,data: {order_number}});
      // const res= await requestPayment(pay);
      // // 查询后台订单状态
      // const res=await  request({url: '/my/orders/req_unifiedorder',method: 'post',header,data: {order_number}});
      // await showToast({
      //   title: '支付成功'
      // });
      // // 手动删除缓存中 已经支付的商品
      // let newCart=wx.getStorageSync('cart');
      // newCart=newCart.filter(v=>!v.checked);
      // wx.setStorageSync('cart', newCart);
      // wx.navigateTo({
      //   url: '/pages/order/index'
      // });

    // } catch (error) {
    //   // await showToast({
    //   //   title: '支付失败'
    //   // })
    //   console.log(error);
    // }
  // }

 
})
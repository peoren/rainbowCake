const express = require('express');
const router = express.Router();
const shoppingcartCtrl = require('../control/shoppingcartCtrl');

/**
 * 购物车路由
 */
router.get('/shoppingcart',shoppingcartCtrl.getPage);
/**
 * 获取购物车数据
 */
router.get('/getShopList',shoppingcartCtrl.getShopList);

// 获取推荐商品数据

router.get('/getRecommend',shoppingcartCtrl.getRecommend);

//购物车数量改变
router.post('/numberChange',shoppingcartCtrl.numberChange);

//单个删除
router.delete('/delGood',shoppingcartCtrl.delGood);

//全部删除
router.delete('/delAll',shoppingcartCtrl.delAll);

//结算下单
router.post('/payOrder',shoppingcartCtrl.payOrder);

//加入购物车
router.post('/addToCart',shoppingcartCtrl.addToCart);

module.exports = router;
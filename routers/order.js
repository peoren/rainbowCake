const express = require('express');
const router = express.Router();
const orderCtl = require('../control/orderCtl');
const bodyParse=require('body-parser');
router.use(bodyParse.json());
router.use(bodyParse.urlencoded({extended:false}));


//进入主页面
router.get('/order',(req,res)=>{

    res.render('order/order');
    
})

// // console.log('choose router')
// //当前订单
router.get('/o_getOrder',orderCtl.order_current);

//收货地址
router.get('/o_getOrderAddress',(req,res)=>{
    console.log('orderCtl.order_address');
    
    orderCtl.order_address(req,res);
});
//获取默认地址

router.get('/o_getDefultAdd',orderCtl.order_defult);

// //获取生日
router.get('/o_getbirthday',orderCtl.order_birthday);
// //获取VIP
router.get('/o_getVIP',(req,res)=>{
    
    orderCtl.o_getVIP(req,res);
});
//订单存储
router.post('/o_postOrder',(req,res)=>{
    orderCtl.o_postOrder(req,res);
})

//购物车信息删除
router.post('/o_postShopping',(req,res)=>{
    orderCtl.o_postShopping(req,res);
})
//订单结算
router.post('/o_postBalance',(req,res)=>{
    orderCtl.o_postBalance(req,res);
})
//获取动态地址
router.get('/o_getSpaceAdd',(req,res)=>{
    orderCtl.o_getSpaceAdd(req,res);
})
//返回购物车
router.delete('/o_return',(req,res)=>{
    orderCtl.o_return(req,res);
})
// router.get('/oder_address',orderCtl.order_address);
// //查询byId
// router.get('/getDataById',function(){
//     orderCtl.getDataById;
// })



module.exports = router;
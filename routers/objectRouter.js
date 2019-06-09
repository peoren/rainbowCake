const express = require('express');
const router = express.Router();

const cobject = require('../control/objectCtrl');

console.log('choose router')
// 写样式用
router.get('/object',function(req,res) {
   res.render('objectpages/object.html');
}
);
// 获取赠送对象
router.get('/changeobject',cobject.changeobject);
// 获取分类对象
router.get('/classobject',cobject.classobject);
// 加入购物车
router.post('/addcarOnobject',cobject.addcarOnobject);
// 搜索
router.get('/searchgoods',cobject.searchgoods);
// 商品详情
router.get('/sendId',(req,res)=>{
    let id=req.query.id;
    res.locals.id=id;
    res.render('goodsDetails/index');
})
//添加订单
router.post('/addBillData',cobject.addBillData)
module.exports = router;
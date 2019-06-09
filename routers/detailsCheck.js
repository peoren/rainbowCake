const express = require('express');
const router = express.Router();
const details = require('../control/detailsCtrl');



router.get('/details',function(req,res){
  res.render('goodsDetails/index');
});
router.get('/getOrder',details.getOrder);
router.post('/jionShoppingCart',details.joinShoppingCart)
router.get('/getcomment',details.getComment);
router.get('/getGoodsMsg',details.getGoodsMsgs);
router.get('/upcomment',function(req,res){
    res.render('goodsDetails/upcomment')
})
    

module.exports = router;
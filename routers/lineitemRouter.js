const express = require('express');
const router = express.Router();
const lineitemCtrl = require('../control/lineitemCtrl');
const bodyParse=require('body-parser');
router.use(bodyParse.json());
router.use(bodyParse.urlencoded({extended:false}));

//进入页面
router.get('/lineitem',(req,res)=>{

    res.render('order/lineitem');
    
})
//获取订单
router.get('/l_getLineitem',(req,res)=>{
    
    lineitemCtrl.l_getLineitem(req,res);
})
//
router.get('/l_getVIP',(req,res)=>{
    
   lineitemCtrl.l_getVIP(req,res);
});

module.exports = router;
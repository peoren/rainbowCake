const express = require('express');
const router = express.Router();
const bodyParse=require('body-parser');
const ctrl=require('../control/homeCtrl')
router.use(bodyParse.json());
router.use(bodyParse.urlencoded({extended:false}));

//进入主页面
router.get('/',(req,res)=>{
    res.render('home/home');
})
//加载数据
router.get('/getAllGoodsData',(req,res)=>{
    ctrl.getAllGoodsData(req,res);
})
//传递id
router.get('/sendId',(req,res)=>{
    let id=req.query.id;
    res.locals.id=id;
    res.render('goodsDetails/index');
    
})
//传递搜索内容
router.get('/sendSearch',(req,res)=>{
    let searchContent=req.query.searchContent;
    res.locals.searchContent=encodeURI(searchContent) ;
    res.render('objectpages/object');
}) 
//添加订单
router.post('/addBillData',(req,res)=>{
    //权限判断
    let state=req.session.state;
    
    if(!state){
        res.json({
            state:-1,
            msg:'user_id undefined'
        })
        return false
    }
     
            
    ctrl.addBillData(req,res);
})

router.post('/intoShoppingCart',(req,res)=>{
    //权限判断
    let state=req.session.state;
    
    if(!state){
        res.json({
            state:-1,
            msg:'user_id undefined'
        })
        return false
    }else{
        res.json({
            state:0,
            
        })
        return false
    }
            
    
})
router.get('/exit',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
module.exports=router;
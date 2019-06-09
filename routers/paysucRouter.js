const express = require('express');
const router = express.Router();

const bodyParse=require('body-parser');
router.use(bodyParse.json());
router.use(bodyParse.urlencoded({extended:false}));

//进入页面
router.get('/paysuc',(req,res)=>{

    res.render('order/paysuc');
    
})
module.exports = router;
const express = require('express');
const router = express.Router();
const loginCheck = require('../control/loginCheckCtl')

router.get('/userlogin',function(req,res){
    res.render('login/login')
});
//登录
router.post('/login',loginCheck.login)
//注册
router.post('/regest',loginCheck.regester)

router.get('/libs/bootstrap/css/bootstrap.min.css.map',function(req,res){
    res.send('')
})

module.exports = router;
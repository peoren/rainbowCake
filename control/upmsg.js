const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../model/db')

// 自定义文件存储
let storage = multer.diskStorage({
    // 设置上传文件的存储地址，必须手动创建 uploads 目录
    destination: function(req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
      var fileFormat = (file.originalname).split('.');
      cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
  });
  let upload = multer({
    storage: storage
  });
  // 配置路由:
  // up-pic 对应 input 的 name
  router.post('/', upload.array('file',5),(req, res) => {
        var fileList = req.files;
        var len = fileList.length;
        var url =[];
        var msgArr  = [];
        var user_id=req.body.userID;//用户Id
        var goodsID = req.body.goodsID;//商品ID
        var orderID = req.body.orderID;//订单ID
        var star = req.body.star;//用户评定的星级
        var text = req.body.text;//评论内容；
     if(len){
         for(var i=0 ;i<len;i++){
            url.push(fileList[i].path);
         }
     }
      msgArr[0] = null;
      msgArr[1] = user_id;
      msgArr[2] = orderID;
      msgArr[3] = goodsID;  
      msgArr[4] = url.join('');
      msgArr[5] = text;
      msgArr[6] = star;
      msgArr[7] = new Date();
      msgArr.unshift(orderID)
      
      var sql = `update bill set order_e_state=1 where order_id= ? ;
        INSERT INTO evaluate VALUES(?,?,?,?,?,?,?,?);`
    db(sql,msgArr,function(err,data){
      res.send('成功')
    })
  });
  module.exports = router;

  
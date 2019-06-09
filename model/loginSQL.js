// 引入依赖
const db = require('./db');
const crypto = require("crypto");
const Base64 = require("js-base64").Base64;
module.exports = {
    // 注册
    registerSQL:(req,res,callback)=>{
        let randomWord = random(false,8);
        // let base64 = new Base64();
        //2.对生成的随机数加密
        let base64Random = Base64.encode(randomWord);
        let password = req.body.password;
        //3.将第二步的值与密码拼接
        let newPas = base64Random + password;
        let md5 = crypto.createHash("md5");
        //4.将第三步的进行md5加密
        let md5Pas = md5.update(newPas).digest("hex");
        //5.将第四步进行base64加密
        let base64Md5 = Base64.encode(md5Pas);
        //6.将第二步与第五步拼接
        password = base64Random + base64Md5;

        let username = req.body.username;
        let telephone=req.body.telephone;
        const sql='insert into users (user_phone,user_password,user_name) values(?,?,?)';
        db(sql,[telephone,password,username],callback);
    },
    //登录
    loginSQL:function(req,res,callback){
        let name = req.body.username;
        let sql = `SELECT user_password,user_id FROM users WHERE user_name = ?`;
        db(sql,name,callback)
    }
}

 // 生成随机数的 函数
 function random(randomFlag, min, max){
    var str = "",
    range = min,
          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      // 随机产生
      if(randomFlag){
          range = Math.round(Math.random() * (max-min)) + min;
      }
      for(var i=0; i<range; i++){
          var pos = Math.round(Math.random() * (arr.length-1));
          str += arr[pos];
      }
      return str;
  }
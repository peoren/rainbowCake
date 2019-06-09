
const loginSQL = require('../model/loginSQL');
const crypto = require("crypto");
const Base64 = require("js-base64").Base64;

module.exports = {
    //注册
   regester:function(req,res){
        loginSQL.registerSQL(req,res,(err,data)=>{
            
           if(data){
            // req.session.state=true;
               res.send('注册成功')
           }else{
               res.send('注册失败')
           }
           
        })
    },
    //登录
    login:function(req,res){
        loginSQL.loginSQL(req,res,(err,data)=>{
            if (err) return res.send(err);
            let password=req.body.password;
            // console.log(data[0].user_pwd,password);
            //1.获取到的密码截取前面随机数通过base64加密的结果
            let base64Random = data[0].user_password.substring(0,12);
            //2.将第一步的结果与用户输入的密码拼接
            let newPas = base64Random + password;
            //3.将第二步的结果进行MD5加密
            let md5 = crypto.createHash("md5");
            let md5Pas = md5.update(newPas).digest("hex");
            //4.将第三步进行base64加密
            // let base64 = new Base64();
            let base64Md5 = Base64.encode(md5Pas);
            //5.将第一步与第四步拼接
            password = base64Random + base64Md5;
            if (data[0].user_password == password){
                req.session.state=true;
                res.json({
                    state: 1,
                    msg: '登陆成功',
                    data: {
                        user_id: data[0].user_id,
                        user_name: data[0].user_name
                    }
                });
            } else {
                // req.session.auth=false;
                res.json({
                    state: 0,
                    msg: '用户名或密码输入错误，请重新输入'
                });
            }
        })
    },
}

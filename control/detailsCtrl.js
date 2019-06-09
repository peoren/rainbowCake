const detailsSQL = require('../model/detailsSQL');
module.exports ={
    //获取商品信息
    getGoodsMsgs:function(req,res){
        detailsSQL.getGoodsMsgs(req,res,function(err,data){
          res.send(data)
        })
    },
    //加入购物车
    joinShoppingCart:function(req,res){
        let state=req.session.state;
        if(!state){
                res.json({
                    state:-1,
                    msg:'user_id undefined'
                })
                return false;
          }
        detailsSQL.joinShoppingCart(req,res,(err,data)=>{
            res.send(data)
        })
    },
    //获取评价
    getComment:function(req,res){
        detailsSQL.getComment(req,res,(err,data)=>{
            res.send(data)
           
        })
    },
    //评论获取订单信息
    getOrder:function(req,res){
        detailsSQL.getOrder(req,res,(err,data)=>{
            res.send(data)
        })
    }
   


}
const shopSQL = require("../model/shoppingcartSQL");
module.exports = {
  getPage: (req, res) => {
    res.render("shoppingcart/shoppingcart");
  },

  /**
   * 获取参数，编写回调函数
   * 返回查询结果
   */

  //获取购物车数据
  getShopList: (req, res) => {
    const userId = req.query.user_id;
    shopSQL.getShopList(userId, (err, data) => {
      if (err) console.log("获取购物车数据异常：" + err);
      res.send(data);
    });
  },
  
  //获取推荐商品数据
  getRecommend:(req,res) => {
    shopSQL.getRecommend((err,data) => {
      if(err) console.log('获取推荐异常：' + err);
      res.send(data);
    })
  },

  //商品数量改变
  numberChange:(req,res) => {
    const shoppingCartId = req.body.shoppingcart_id;
    const changeNum = req.body.shoppingcart_amount;
    shopSQL.numberChange(shoppingCartId,changeNum,(err,data) => {
      if(err) console.log('数量变化异常：' + err);
      res.send(data);
    })
  },

  //单个删除
  delGood:(req,res) => {
    const shoppingCartId = req.body.shoppingcart_id;
    shopSQL.delGood(shoppingCartId,(err,data) => {
      if(err) console.log('删除单个商品失败：' + err);
      res.send(data);
    })
  },

  //全部删除
  delAll:(req,res) => {
    shopSQL.delAll((err,data) => {
      if(err) console.log('删除全部商品失败：' + err);
      res.send(data);
    })
  },
 
  //结算下单
  payOrder:(req,res) => {
    const user_id=req.body.user_id;
    const goods_id=req.body.goods_id;
    const size_id=req.body.size_id;
    const order_amount=req.body.order_amount;
    const shoppingcart_id=req.body.shoppingcart_id;
    let arr=[user_id,goods_id,size_id,order_amount,shoppingcart_id];
    shopSQL.payOrder(arr,(err,data) => {
      if(err) console.log('结算下单失败：' + err);
      res.send(data);
    })
  },

  //加入购物车
  addToCart:(req,res) =>{
    const user_id=req.body.user_id;
    const goods_id=req.body.goods_id;
    const goods_price = req.body.goods_price;
    let arr = [user_id,goods_id,goods_price];

    shopSQL.queryByGoodId(goods_id,(err,data) => {
      if(err) console.log('商品id查询失败：' + err);
      if(data.length > 0){
        let currentNum = data[0].shoppingcart_amount;
        currentNum++;
        shopSQL.numberChange(data[0].shoppingcart_id,currentNum,(err,data) =>{
          if(err) console.log('更新购物车数据库：' + err);
          res.send(data);
        })
      }else{
        shopSQL.addToCart(arr,(err,data) => {
          if(err) console.log('加入购物车失败：' + err);
          res.send(data);
        })
      }
    })

   
  }
};

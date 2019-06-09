const db = require('./db');

module.exports = {
    /**
     * 通过userId获取购物车数据
     * todo
     * 记得检查表名和字段名称
     * 还需联表查询获取商品图片和简介
     */
   getShopList: (user_id, callback) => {
       const sql = `select shoppingcart.goods_id,size.size_id,shoppingcart_id,goods.goods_pic_main,goods.goods_name,size.size_name,shoppingcart.goods_price,shoppingcart.shoppingcart_amount 
       from goods join shoppingcart  join size
       where shoppingcart.goods_id = goods.goods_id and shoppingcart.user_id = ? and shoppingcart.size_id = size.size_id
        `
       db(sql, [user_id], callback)
    },
   /**
    * 获取推荐商品数据
    * 
    */
   
    getRecommend:(callback) =>{
        const sql = `
        select goods_id,goods_name,goods_price,goods_pic_main from goods order by rand() limit 4;
        `
        db(sql,callback)
    },

    //更新商品数量
    numberChange:(shoppingCartId,changeNum,callback) => {
        const sql = `
        UPDATE shoppingcart SET shoppingcart_amount = ? WHERE shoppingcart_id = ?
        `
        db(sql,[changeNum,shoppingCartId],callback)
    },

    //删除单个商品
    delGood:(shoppingCartId,callback) => {
        const sql = `
        DELETE FROM shoppingcart WHERE shoppingcart_id = ?
        `
        db(sql,[shoppingCartId],callback)
    },

    //删除全部
    delAll:(callback) => {
        const sql = `
        DELETE FROM shoppingcart
        `
        db(sql,callback)   
    },

    //结算下单
    payOrder:(arr,callback) => {
        const sql = `
        INSERT INTO bill 
        (user_id,goods_id,size_id,order_amount,order_starttime,shoppingcart_id)
         VALUES(?,?,?,?,NOW(),?)
        `
        db(sql,arr,callback)
        // console.log(sql)
    },

    //加入购物车
    addToCart:(arr,callback) => {
        const sql = `
        INSERT INTO shoppingcart
        (user_id,goods_id,goods_price)
         VALUES(?,?,?)
        `
        db(sql,arr,callback)
    },

    //通过商品id查询购物车数据库
    queryByGoodId:(goods_id,callback) =>{
        const sql = `
        SELECT * FROM shoppingcart WHERE goods_id = ?
        `
        db(sql,goods_id,callback)
    }

   }

const db = require('./db');
module.exports = {
    getGoodsMsgs:function(req,res,callback){
        //获取参数
    let g_id = req.query.goods_id;
    let sql = `SELECT classify.classify_name,goods_detail.goods_name,goods_detail.goods_detail_pic_main,
    goods_detail.goods_detail_pic_desc,goods_detail.goods_detail_price,goods_detail.goods_detail_desripe,
    goods_detail.goods_detail_maxsize,goods_detail.goods_detail_storage,goods.goods_sweetns,
    goods_detail.goods_detail_material FROM goods_detail JOIN classify ON goods_detail.goods_id=? AND
    goods_detail.classify_id = classify.classify_id JOIN goods ON goods.goods_id = goods_detail.goods_id;
    `
    db(sql,[g_id],callback);
    },
    //加入购物车
    joinShoppingCart:function(req,res,callback){
        var msgArr = []
        let userId = req.body.userId;  
            msgArr.push( userId);  
        let goodsId = req.body.goodsId;
            msgArr.push( goodsId);
        let price = req.body.price;
            msgArr.push(price);
        let size = req.body.size;
            msgArr.push(size);
        let count = req.body.count;
            msgArr.push( count);
        let sql = `INSERT INTO shoppingcart VALUES(NULL,?,?,
        ?,?,?,DEFAULT)`  
        db(sql,msgArr,callback);
    },
    //获取评论信息
    getComment:function(req,res,callback){
        let goods_id = req.query.goodsId;
        let sql = `SELECT evaluate.evaluate_content, evaluate.evaluate_level, evaluate.evaluate_time,
        evaluate.evaluate_img,users.user_img,users.user_name FROM evaluate
        JOIN users ON  evaluate.goods_id = ? AND evaluate.user_id=users.user_id;`
        db(sql,[goods_id],callback);
    },
    //获取订单信息
    getOrder:function(req,res,callback){
        console.log(req.query.order_id)
        let order_id = req.query.order_id
        let sql = `SELECT bill.order_starttime,goods.goods_pic_main, goods.goods_id FROM bill JOIN goods ON order_id=? AND bill.goods_id = goods.goods_id;`
        db(sql,order_id,callback);
    }


}
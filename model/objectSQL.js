const db = require('./db');
module.exports = {
    getGoodsOfObject: function (req, res, callback) {
        //获取参数
        let c_object = req.query.cobject;
        let sql = `SELECT goods_name,goods_id,goods_sweetns,goods_price,goods_pic_main,c_object,
        (select sell_amount from sell where goods.goods_id = sell.goods_id)  as sell_amount FROM goods having c_object = ? `
        db(sql, [c_object], callback)
    },
    getGoodsOfClass: function (req, res, callback) {
        let classify = req.query.classify;
        console.log(classify)
        if (classify == '0') {
            let sql = `SELECT goods_name,goods_id,classify_id,goods_sweetns,goods_price,goods_pic_main,c_object,
            (select sell_amount from sell where goods.goods_id = sell.goods_id)  as sell_amount FROM goods`
            db(sql, [], callback)
        } else {
            let sql = `SELECT goods_name,goods_id,classify_id,goods_sweetns,goods_price,goods_pic_main,c_object,
            (select sell_amount from sell where goods.goods_id = sell.goods_id)  as sell_amount FROM goods having classify_id = ? `
            db(sql, [classify], callback)
        }

    },
    addcar: function (req, res, callback) {
        //获取参数
        let user_id = req.body.user_id;
        let goods_id = req.body.goods_id;
        let size_id = req.body.size_id;
        let goods_price = req.body.goods_price;
        let sql = `insert into shoppingcart (user_id,goods_id,size_id,goods_price) values(?,?,?,?)`
        db(sql, [user_id, goods_id, size_id, goods_price], callback)
    },
    searchGoods: function (req, res, callback) {
        //获取参数
        let searchtext = req.query.searchtext;
        let searchC = req.query.searchC;
  
        if (searchC == true){
    
            let sql =  `SELECT goods_name,goods_id,classify_id,goods_sweetns,goods_price,goods_pic_main,c_object,
            (select sell_amount from sell where goods.goods_id = sell.goods_id) as sell_amount FROM goods having classify_id = ? `
            db(sql, [searchtext], callback)
        } else {
           
            let sql = `SELECT goods_name,goods_id,goods_sweetns,classify_id,goods_price,goods_pic_main,c_object ,
            (select sell_amount from sell where goods.goods_id = sell.goods_id) as sell_amount 
            FROM goods where concat(goods_name,goods_sweetns) like '%' ? '%';`
            db(sql, [searchtext], callback)
        }
        
    },
    addbilldata: function (req, res, callback) {
        const user_id = req.body.user_id;
        const goods_id = req.body.goods_id;
        const size_id = req.body.size_id;
        const order_paytotal = req.body.order_paytotal;
        const order_amount = req.body.order_amount;
        let arr = [user_id, goods_id, size_id, order_amount, order_paytotal];
    
        let sql = `insert into bill (user_id,goods_id,size_id,order_amount,order_paytotal) values(?,?,?,?,?)`
        db(sql, arr, callback)
    }
}
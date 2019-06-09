const db = require('../model/db');

module.exports = {
    dbGetAllGoodsData:(arr,callback)=>{
        let sql='SELECT * FROM goods LEFT JOIN classify ON classify.`classify_id`=goods.`classify_id` ORDER BY goods.`c_object` ASC,goods.`goods_strattime` DESC;'
        db(sql,arr,callback);
    },
    dbAddBillData:(arr,callback)=>{
        let sql='INSERT INTO bill (user_id,goods_id,size_id,order_amount,order_paytotal,order_starttime) VALUES(?,?,?,?,?,NOW());'
        db(sql,arr,callback);
    },
}
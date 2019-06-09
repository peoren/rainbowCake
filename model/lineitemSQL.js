const db = require('../model/db');
module.exports = {

    l_getLineitemSQL: (req,res,callback) => {

        const order_id=req.query.order_id;
        const   sql = `SELECT * FROM  bill,size,goods,user_address WHERE bill.order_id=? AND bill.size_id=size.size_id AND bill.goods_id=goods.goods_id  AND bill.address_id=user_address.address_id`
        db(sql,order_id,callback);
        console.log(order_id)
    },
     //获取VIP
     l_VIPSQL:(req,res,callback)=>{
        const user_id =req.query.user_id;
        const sql = 'SELECT * FROM users WHERE user_id=?'
        db(sql,user_id,callback);
    },
    
}
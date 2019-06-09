const sql = require('../model/homeSQL');
module.exports = {
    //取得所有数据
    getAllGoodsData:(req,res)=>{
        sql.dbGetAllGoodsData((err,data)=>{
            if(err) return res.send('sql.dbGetAllGoodsData err');

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'dbGetAllGoodsData successful'
                })
            }else{
                res.json({
                    state:1,
                    msg:'dbGetAllGoodsData err'
                })
            }
        })
    },
    addBillData:(req,res)=>{
        const user_id=req.body.user_id;
        const goods_id=req.body.goods_id;
        const size_id=req.body.size_id;
        const order_paytotal=req.body.order_paytotal;
        const order_amount=req.body.order_amount;
        let arr=[user_id,goods_id,size_id,order_amount,order_paytotal];
        console.log(arr);
        
        sql.dbAddBillData(arr,(err,data)=>{
            if(err) return res.send('sql.dbAddBillData err');

            
            if(data.affectedRows>0){
                res.json({
                    state:0,
                    msg:'dbAddBillData successful'
                })
            }else{
                res.json({
                    state:1,
                    msg:'dbAddBillData err'
                })
            }
        })
    },
}
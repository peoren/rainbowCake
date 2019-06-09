const db = require('../model/db');

module.exports = {
    // 获取当前结算订单
    order_currentSQL: (req,res,callback) => {
        const user_id=req.query.user_id;  
        const   sql = ` SELECT goods.goods_pic_main,bill.goods_id,goods.goods_name,bill.order_id,size.size_name,goods.goods_price,bill.order_amount,bill.shoppingcart_id
        FROM goods,bill,size
        WHERE bill.goods_id = goods.goods_id AND bill.user_id = ? AND bill.order_state = 0 AND bill.size_id = size.size_id
         `
        db(sql,user_id,callback);
    },
    

    //获取收货地址
    order_addressSQL: (req,res,callback) => { 
        const user_id=req.query.user_id;  
        // console.log(user_id);   
        const sql = 'SELECT * FROM user_address WHERE user_id=?  '
        db(sql,user_id,callback);
       
        // console.log(user_id,'123')
    },
    //获取默认地址
    order_defultSQL: (req,res,callback) => { 

        
        const user_id=req.query.user_id;     
        const sql = 'SELECT * FROM user_address WHERE user_id=? AND address_default=1 '
        db(sql,user_id,callback);
        // console.log(user_id,'123')
    },
    //获取生日
    order_birthdaySQL:(req,res,callback)=>{
        const user_id =req.query.user_id;
        const sql = 'SELECT * FROM users WHERE user_id=?'
        db(sql,user_id,callback);
        // console.log(user_id,'123')
    },
    //获取VIP
    order_VIPSQL:(req,res,callback)=>{
        const user_id =req.query.user_id;
        const sql = 'SELECT * FROM users WHERE user_id=?'
        db(sql,user_id,callback);
    },
    //更改订单表
    order_postOrderSQL:(req,res,callback)=>{
        
        const address_name = req.body.address_name;
            // console.log('address_name',address_name);
        const address_id = req.body.address_id;
            // console.log('address_id',address_id);
        const order_detail_consigneetime = req.body.order_detail_consigneetime;
            // console.log('order_detail_consigneetime',order_detail_consigneetime);
        const order_detail_message = req.body.order_detail_message;
            // console.log('order_detail_message',order_detail_message);
        
        let form = req.body.order_id;
        // if(form.length == 1) {
        //     form = [];
        //     form.push(req.body.order_id);
        // }
            // console.log(form);
        
            let sql = ' ';
            let arr = [];
        // console.log((typeof form)== 'string')
        if((typeof form) == 'string') {
            // console.log('123')
            sql = `UPDATE bill,goods SET bill.order_paytotal=bill.order_amount*goods.goods_price,
            bill.order_starttime=NOW(),bill.address_name=?,bill.address_id=?,bill.order_detail_consigneetime=?,bill.order_detail_message=?
            WHERE bill.order_id =? AND bill.goods_id=goods.goods_id;`
            arr.push(address_name,address_id,order_detail_consigneetime,order_detail_message,form);
            
            // console.log(arr)
        }else{
            form.forEach(function(e,i) {
                let order_id = Number(e);
                sql = sql + `UPDATE bill,goods SET bill.order_paytotal=bill.order_amount*goods.goods_price,
                bill.order_starttime=NOW(),bill.address_name=?,bill.address_id=?,bill.order_detail_consigneetime=?,bill.order_detail_message=?
             WHERE bill.order_id =? AND bill.goods_id=goods.goods_id;`
                // console.log(e)
                arr.push(address_name,address_id,order_detail_consigneetime,order_detail_message,order_id);
                
                
                
            // console.log(order_detail_consigneetime[i]);
            })
        }
       
        // console.log(arr);
        db(sql,arr,callback)
       
       
    },
    order_postShoppingSQL:(req,res,callback)=>{
        let shop =[];
        let sql ='';
        const shopcart = req.body.shoppingcart_id;
        console.log(shopcart);
        shopcart.forEach(function(ele,i){
            let shoppingcart_id=Number(ele);
            sql = sql +`
            DELETE FROM shoppingcart WHERE shoppingcart_id=?;    `
            shop.push(shoppingcart_id);
            
        })
        // console.log(shop)
       db(sql,shop,callback)
    },
    order_postBalanceSQL:(req,res,callback)=>{
        const sql = `UPDATE bill SET order_state=1 WHERE order_state=0;  `
        // console.log(form2)
        // console.log(form2)
       db(sql,null,callback)
    },
    order_getSpaceAddSQL:(req,res,callback) => { 
        // console.log('3333');
        
        const address_id=req.query.address_id;     
        const sql = 'SELECT * FROM user_address WHERE address_id = ? '
        db(sql,address_id,callback);
        // console.log(address_id,'gg')
    },
    o_returnSQL:(req,res,callback)=>{
        
      
        const sql =' DELETE FROM bill WHERE order_state=0'; 
        // console.log(shop)
       db(sql,null,callback)
    },
    

}

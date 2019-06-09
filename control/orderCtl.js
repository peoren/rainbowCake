const sql=require('../model/orderSQL')
module.exports = {

    //当前订单
    order_current:(req,res) => {
        sql.order_currentSQL(req,res,(err,data)=>{
            if(err) res.send('getData err');
            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:"suc"
                })
            }else{
                res.json({
                    state:1,

                    msg:"err"
                })
            }
            
            
        })

        
    },
    order_address:(req,res)=>{
       
       
        sql.order_addressSQL(req,res,(err,data)=>{

            if(err) return res.send('GetOrderAddress err');
 
            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'GetOrderAddress suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'GetOrderAddress err'
                })
            }
        })
    },
    order_defult:(req,res)=>{
        sql.order_defultSQL(req,res,(err,data)=>{
             
           
            if(err) return res.send('order_defult err');

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'order_defult suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'order_defult err'
                })
            }
        })
    },
    order_birthday:(req,res)=>{
        sql.order_birthdaySQL(req,res,(err,data)=>{
            if(err) return res.send('order_birthday err');

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'order_birthday suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'order_birthday err'
                })
            }
        })
    },
    o_getVIP:(req,res)=>{
        
        sql.order_VIPSQL(req,res,(err,data)=>{
            if(err) return res.send('order_VIP err');

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'order_VIP suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'order_VIP err'
                })
            }
        })
    },
    o_postOrder:(req,res)=>{
    
        // console.log('ppppp');
        sql.order_postOrderSQL(req,res,(err,data)=>{
            if(err) return res.send(err);

            // if(data.length>0){
            //     res.json({
            //         state:0,
            //         data:data,
            //         msg:'order_postOrderSQL suc'
            //     })
            // }else{
            //     res.json({
            //         state:1,
                    
            //         msg:'order_postOrderSQL errdidd'
            //     })
            // }
            res.json(data)
        })
    },
    o_postShopping:(req,res)=>{
    //    console.log('dddd')
        
        sql.order_postShoppingSQL(req,res,(err,data)=>{
            if(err) return res.send(err);

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'order_postShoppingSQL suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'order_postShoppingSQL errdidd'
                })
            }
        })
    },
    o_postBalance:(req,res)=>{
       
        
        sql.order_postBalanceSQL(req,res,(err,data)=>{
            if(err) return res.send(err);

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'order_postBalanceSQL suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'order_postBalanceSQL errdidd'
                })
            }
        })
    }, 
    o_getSpaceAdd:(req,res)=>{
        sql.order_getSpaceAddSQL(req,res,(err,data)=>{
            if(err) return res.send('order_getSpaceAdd err');

            if(data.length>0){
                res.json({
                    state:0,
                    data:data,
                    msg:'order_getSpaceAdd suc'
                })
            }else{
                res.json({
                    state:1,
                    
                    msg:'orde_getSpaceAdd err'
                })
            }
        })
    },
    o_return:(req,res)=>{
        sql.o_returnSQL(req,res,(err,data)=>{
            if(err) return res.send('order_getSpaceAdd err');

            res.send()
        })
    }
}
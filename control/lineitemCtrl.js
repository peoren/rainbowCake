const sql=require('../model/lineitemSQL')
module.exports = {


    l_getLineitem:(req,res) => {
 
    sql.l_getLineitemSQL(req,res,(err,data)=>{
        // console.log('router_curentorder')
        if(err) res.send('getData err');
        // console.log(data)
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
 l_getVIP:(req,res)=>{
        
    sql.l_VIPSQL(req,res,(err,data)=>{
        if(err) return res.send('line_VIP err');

        if(data.length>0){
            res.json({
                state:0,
                data:data,
                msg:'line_VIP suc'
            })
        }else{
            res.json({
                state:1,
                
                msg:'line_VIP err'
            })
        }
    })
},
}
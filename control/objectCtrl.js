const ObjectSQL = require('../model/objectSQL');
module.exports = {

    truntoobject: (req, res) => {
        console.log('find object2')
        ObjectSQL.getGoods(req, res, function (err, data) {
            if (err) {
                console.log(err)
            }else{
                console.log('render object')
                console.log(data)
                // res.send('objectpages/object');
                res.render('objectpages/object.html');
            }
        })
    },
    classobject:(req,res) => {
        ObjectSQL.getGoodsOfClass(req,res,function(err,data){
            if(err){
                console.log(err)
            }else {
                if(data.length > 0) {
                    res.json({
                        state:0,
                        data:data
                    })
                }else{
                    res.json({
                        state:1
                    })
                }
            }
            
        })
    },
    changeobject: (req, res) => {
        ObjectSQL.getGoodsOfObject(req, res, function (err, data) {
            if (err) {
                console.log(err)
            }
            // 判断搜索结果是否为0
            if (data.length > 0) {
                res.json({
                    state: 0,
                    data: data
                });

            } else {
                res.json({
                    state: 1
                });
            }
        })
    },
    addcarOnobject:(req , res) => {
        // console.log(sessionStorage.getItem(user_id))
        ObjectSQL.addcar(req,res,function(err,data) {
            if(err){
                console.log(err)
            }else{
                console.log('获取的数据',data)
                // 添加模态框 条件
                res.json({
                    state: 0,
                    msg:'成功加入购物车'
                });
            }
        })
    },
    searchgoods:(req, res) => {
        ObjectSQL.searchGoods(req, res, function (err, data) {
            if (err) {
                console.log(err)
            }
            console.log('data  data',data)
            // 判断搜索结果是否为0
            if (data.length > 0) {
                res.json({
                    state: 0,
                    data: data
                });

            } else {
                res.json({
                    state: 1
                });
            }
        })
    },
    addBillData:(req,res)=>{
        
        ObjectSQL.addbilldata(req,res,function(err,data) {
            if(err){
                console.log(err)
            }else{
                console.log('获取的数据',data)
                // 添加模态框 条件
                res.json({
                    state: 0,
                    msg:'准备跳转订单页面'
                });
                // res.render('order/order');

            }
        })

    }
}
const pcSQL = require('../model/personal_centerSQL');

module.exports = {

    // 已完成订单
    order_finish: (req,res) => {
        res.render('personal_center/order_finish.html');
    },

    // 未完成订单
    order_unfinished: (req,res) => {
        res.render('personal_center/order_unfinished.html');
    },

    // 所有订单
    order_all: (req,res) => {
        res.render('personal_center/order_all.html');
    },

    // 个人资料
    p_data: (req,res) => {
        res.render('personal_center/p_data.html');
    },

    // 收货地址
    p_address: (req,res) => {
        res.render('personal_center/p_address.html');
    },

    // 获取密码
    p_getPassword: (req,res) => {
        res.render('personal_center/p_address.html');
    },

    // 修改密码
    p_password: (req,res) => {
        res.render('personal_center/p_password.html');
    },

    // 获取个人资料
    getData: (req,res) => {
        pcSQL.getData(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 设置基本资料
    setData: (req,res) => {
        pcSQL.setData(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 设置更多资料
    setMoreData: (req,res) => {
        pcSQL.setMoreData(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 获取收货地址
    getAddress: (req,res) => {
        pcSQL.getAddress(req,res,(err,data) => {
            if(err) res.send(err);
            if(data.length == 0) {
                res.json({
                    state: 0
                })
            }else {
                res.json({
                    state: 1,
                    data:data,
                })
            }
        })
    },

    // 新增收货地址
    addAddress: (req,res) => {
        pcSQL.addAddress(req,res,(err,data) => {
            if(err) res.send(err);
            res.send()
        })
    },

    // 设置默认地址
    setDefa: (req,res) => {
        pcSQL.setDefa(req,res,(err,data) => {
            if(err) res.send(err);
            res.send()
        })
    },

    // 删除地址
    delete: (req,res) => {
        pcSQL.delete(req,res,(err,data) => {
            if(err) res.send(err);
            res.send()
        })
    },

    // 获取密码
    getPassword: (req,res) => {
        pcSQL.getPassword(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 设置密码
    setPassword: (req,res) => {
        pcSQL.setPassword(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 给vip续时间
    addVip: (req,res) => {
        pcSQL.addVip(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 判断vip是否到期
    vip_isTimeout: (req,res) => {
        pcSQL.vip_isTimeout(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // vip到期将数据库置为0
    vip_timeout: (req,res) => {
        pcSQL.vip_timeout(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 获取订单信息
    get_order: (req,res) => {
        pcSQL.get_order(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 获取订单数量
    get_order_number: (req,res) => {
        pcSQL.get_order_number(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    },

    // 确认收货
    sureOrder: (req,res) => {
        pcSQL.sureOrder(req,res,(err,data) => {
            if(err) res.send(err);
            res.json(data)
        })
    }
}
const db = require('../model/db');

module.exports = {
    // 获取个人资料
    getData: (req,res,callback) => {
        const user_id = req.query.user_id;
        const sql = 'select * from users where user_id=?'
        db(sql,user_id,callback);
    },

    // 设置基本资料
    setData: (req,res,callback) => {
        const imgName = req.body.imgName;
        const user_id = req.body.user_id;
        const name = req.body.name;
        const sex = req.body.sex;
        const data_phone = req.body.data_phone;
        const sql = 'update users set user_phone=?,user_img=?,user_name=?,user_sex=? where user_id=?'
        db(sql,[data_phone,imgName,name,sex,user_id],callback);
    },

    // 设置更多资料
    setMoreData: (req,res,callback) => {
        const user_id = req.body.user_id;
        const marry = req.body.marry || null;
        const job = req.body.job || null;
        const prov = req.body.prov || null;
        const city = req.body.city || null;
        const area = req.body.area || null;
        const unit = req.body.unit || null;
        const year = req.body.year || null;
        const month = req.body.month || null;
        const day = req.body.day || null;
        const income = req.body.income || null;
        const sql = `update users set user_income=?,user_marry=?,user_job=?,user_job_prov=?,user_job_city=?,user_job_dis=?,
            user_job_name=?,user_birth_year=?,user_birth_month=?,user_birth_day=? where user_id=?`
        db(sql,[income,marry,job,prov,city,area,unit,year,month,day,user_id],callback);
    },

    // 获取收货地址
    getAddress: (req,res,callback) => {
        const user_id = req.query.user_id;
        const sql = 'SELECT * FROM users,user_address WHERE users.user_id=? AND user_address.user_id=? order by address_default desc'
        db(sql,[user_id,user_id],callback);
    },

    // 新增收货地址
    addAddress: (req,res,callback) => {
        const editFlag = req.body.editFlag;
        const editId = req.body.editId;
        const user_id = Number(req.body.user_id);
        const defa = Number(req.body.defa);
        const name = req.body.name;
        const phone = req.body.phone;
        const cmbProvince = req.body.cmbProvince;
        const cmbCity = req.body.cmbCity;   
        const cmbArea = req.body.cmbArea;       
        const data_more = req.body.data_more;  
        //添加收货地址并且不是默认地址
        if(editFlag == 'false' && defa == 0) {
            const sql = `insert into user_address(user_id,address_default,address_name,address_phone,address_previnces,address_city,address_regin,address_detail) 
                values(?,?,?,?,?,?,?,?) `
            db(sql,[user_id,defa,name,phone,cmbProvince,cmbCity,cmbArea,data_more],callback);
        }
        //添加收货地址并且是默认地址   
        if(editFlag == 'false' && defa == 1) {
            const sql = `update user_address set address_default=0;
                insert into user_address(user_id,address_default,address_name,address_phone,address_previnces,address_city,address_regin,address_detail) 
                values(?,?,?,?,?,?,?,?) `;
            db(sql,[user_id,defa,name,phone,cmbProvince,cmbCity,cmbArea,data_more],callback);
        }
        //修改收货地址并且不是默认地址   
        if(editFlag == 'true' && defa == 0) {
            const sql = `update user_address set address_default=?,address_name=?,address_phone=?,address_previnces=?,address_city=?,address_regin=?,address_detail=? where address_id=?`
            db(sql,[defa,name,phone,cmbProvince,cmbCity,cmbArea,data_more,editId],callback);
        }
        //修改收货地址并且是默认地址   
        if(editFlag == 'true' && defa == 1) {
            const sql = `update user_address set address_default=0;
                update user_address set address_default=?,address_name=?,address_phone=?,address_previnces=?,address_city=?,address_regin=?,address_detail=? where address_id=?`
            db(sql,[defa,name,phone,cmbProvince,cmbCity,cmbArea,data_more,editId],callback);
        }
    },

    // 设置默认地址
    setDefa: (req,res,callback) => {
        const defaId = req.body.defaId;
        const sql = `update user_address set address_default=0;
        update user_address set address_default=1 where address_id=?`
        db(sql,defaId,callback);
    },

    // 删除地址
    delete: (req,res,callback) => {
        const deleteId = req.body.deleteId;
        const sql = `delete from user_address where address_id=?`
        db(sql,deleteId,callback);
    },

    // 获取密码
    getPassword: (req,res,callback) => {
        const user_id = req.query.user_id;
        const sql = `select user_password from users where user_id=?`
        db(sql,user_id,callback);
    },

    // 设置密码
    setPassword: (req,res,callback) => {
        const user_id = req.body.user_id;
        const newPass = req.body.newPass;
        const sql = `update users set user_password=? where user_id=?`
        db(sql,[newPass,user_id],callback);
    },

    // 给vip续时间
    addVip: (req,res,callback) => {
        const user_id = req.body.user_id;
        const vip_time = req.body.vip_time;
        const isVip = req.body.isVip;
        if(isVip == 'false') {
            const sql = `UPDATE users SET user_vip_out=DATE_ADD(now(),INTERVAL ? DAY),user_vip=1 WHERE user_id=?`
            db(sql,[vip_time,user_id],callback);
        } else {
            const sql = `UPDATE users SET user_vip_out=DATE_ADD(user_vip_out,INTERVAL ? DAY),user_vip=1 WHERE user_id=?`
            db(sql,[vip_time,user_id],callback);
        }
        
    },

    // 判断vip是否到期
    vip_isTimeout: (req,res,callback) => {
        const user_id = req.query.user_id;
        const sql = `SELECT user_vip_out-NOW() FROM users WHERE user_id=?`
        db(sql,user_id,callback);
    },

    // vip到期将数据库置为0
    vip_timeout: (req,res,callback) => {
        const user_id = req.body.user_id;
        const sql = `update users set user_vip=0 WHERE user_id=?`
        db(sql,user_id,callback);
    },

    // 获取订单信息
    get_order: (req,res,callback) => {
        const user_id = req.query.user_id;
        const pages = Number(req.query.pages);
        const page = Number(req.query.page);
        const order_statu = req.query.order_statu;
        // 未完成
        if(order_statu == 'unfinish') {
            const sql = `select *,goods.goods_name from goods,bill where bill.user_id=? and goods.goods_id=bill.goods_id and (order_state=0 or order_state=1) order by bill.order_starttime desc limit ?,?`
            db(sql,[user_id,pages,page],callback);
        }
        // 已完成
        if(order_statu == 'finish') {
            const sql = `select *,goods.goods_name from goods,bill where bill.user_id=? and goods.goods_id=bill.goods_id and order_state=2 limit ?,?`
            db(sql,[user_id,pages,page],callback);
        }
        // 所有
        if(order_statu == 'all') {
            const sql = `select *,goods.goods_name from goods,bill where bill.user_id=? and goods.goods_id=bill.goods_id order by bill.order_starttime desc limit ?,?`
            db(sql,[user_id,pages,page],callback);
        }
    },

    // 获取订单数量
    get_order_number: (req,res,callback) => {
        const user_id = req.query.user_id;
        const order_statu = req.query.order_statu;
        // 未完成
        if(order_statu == 'unfinish') {
            const sql = `select count(*) as count from goods,bill where bill.user_id=? and goods.goods_id=bill.goods_id and (order_state=0 or order_state=1)`
            db(sql,user_id,callback);
        }
        // 已完成
        if(order_statu == 'finish') {
            const sql = `select count(*) as count from goods,bill where bill.user_id=? and goods.goods_id=bill.goods_id and order_state=2`
            db(sql,user_id,callback);
        }
        // 所有
        if(order_statu == 'all') {
            const sql = `select count(*) as count from goods,bill where bill.user_id=? and goods.goods_id=bill.goods_id`
            db(sql,user_id,callback);
        }
    },

    // 确认收货
    sureOrder: (req,res,callback) => {
        const order_id = Number(req.body.order_id);
        const sql = `update bill set order_state=2 WHERE order_id=?`
        db(sql,order_id,callback);
    },
}
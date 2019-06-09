const express = require('express');
const router = express.Router();
const personal_centerCtl = require('../control/personal_centerCtl');

// 已完成订单
router.get('/order_finish',personal_centerCtl.order_finish);

// 未完成订单
router.get('/order_unfinished',personal_centerCtl.order_unfinished);

// 所有订单
router.get('/order_all',personal_centerCtl.order_all);

// 个人资料
router.get('/p_data',personal_centerCtl.p_data);

// 收货地址
router.get('/p_address',personal_centerCtl.p_address);

// 修改密码
router.get('/p_password',personal_centerCtl.p_password);

// 获取个人资料
router.get('/p_getData',personal_centerCtl.getData);

// 设置基本资料
router.put('/p_setData',personal_centerCtl.setData);

// 设置更多资料
router.put('/p_setMoreData',personal_centerCtl.setMoreData);

// 获取收货地址
router.get('/p_getAddress',personal_centerCtl.getAddress);

// 新增收货地址
router.put('/p_addAddress',personal_centerCtl.addAddress);

// 设置默认地址
router.put('/p_setDefa',personal_centerCtl.setDefa);

// 删除地址
router.delete('/p_delete',personal_centerCtl.delete);

// 获取密码
router.get('/p_getPassword',personal_centerCtl.getPassword);

// 设置密码
router.put('/p_setPassword',personal_centerCtl.setPassword);

// 给vip续时间
router.post('/p_addVip',personal_centerCtl.addVip);

// 判断vip是否到期
router.get('/p_vip_isTimeout',personal_centerCtl.vip_isTimeout);

// vip到期将数据库置为0
router.put('/p_vip_timeout',personal_centerCtl.vip_timeout);

// 获取订单信息
router.get('/p_get_order',personal_centerCtl.get_order);

// 获取订单数量
router.get('/p_get_order_number',personal_centerCtl.get_order_number);

// 确认收货
router.post('/p_sureOrder',personal_centerCtl.sureOrder);





module.exports = router;
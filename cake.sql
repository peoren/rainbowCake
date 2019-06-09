/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.22 : Database - cake
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cake` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cake`;

/*Table structure for table `bill` */

CREATE TABLE `bill` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(32) DEFAULT NULL COMMENT '商品名称',
  `size_id` int(20) NOT NULL COMMENT '商品规格',
  `order_amount` int(10) DEFAULT '1' COMMENT '商品数量',
  `order_state` tinyint(4) DEFAULT '0' COMMENT '订单状态 : 0-待支付，1-已付款，发货中，2-已签收',
  `order_paytotal` decimal(12,2) DEFAULT NULL COMMENT '交易金额',
  `order_exchangestate` tinyint(4) DEFAULT '0' COMMENT '交易状态：0-进行中，1-交易成功，2-交易取消',
  `order_starttime` datetime NOT NULL COMMENT '订单支付成功时间',
  `order_del` tinyint(4) DEFAULT '0' COMMENT '删除该订单操作 ： 0-未删除，1-已删除',
  `order_deltime` datetime DEFAULT NULL COMMENT '删除订单时间',
  `order_endtime` datetime DEFAULT NULL COMMENT '订单关闭时间',
  `address_name` varchar(32) DEFAULT NULL COMMENT '收货人姓名',
  `address_id` int(10) DEFAULT NULL COMMENT '收货地址id(含收货人信息)',
  `shoppingcart_id` int(10) DEFAULT NULL COMMENT '购物车id',
  `order_detail_payway` int(10) DEFAULT NULL COMMENT '支付方式',
  `order_detail_paynumber` int(32) DEFAULT NULL COMMENT '支付流水号',
  `order_detail_number` varchar(32) DEFAULT NULL COMMENT '订单编号',
  `order_detail_consigneetime` datetime DEFAULT NULL COMMENT '收货时间',
  `order_detail_message` varchar(32) DEFAULT NULL COMMENT '留言',
  `order_g_img` varchar(255) DEFAULT NULL COMMENT '主图(url)',
  `order_e_state` tinyint(4) DEFAULT '0' COMMENT '是否评论：0-未评论 1-已评论',
  `order_detail_invoice` tinyint(4) DEFAULT '0' COMMENT '开具发票：0-不开发票 1-需要发票',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8;

/*Data for the table `bill` */

insert  into `bill`(`order_id`,`user_id`,`goods_id`,`goods_name`,`size_id`,`order_amount`,`order_state`,`order_paytotal`,`order_exchangestate`,`order_starttime`,`order_del`,`order_deltime`,`order_endtime`,`address_name`,`address_id`,`shoppingcart_id`,`order_detail_payway`,`order_detail_paynumber`,`order_detail_number`,`order_detail_consigneetime`,`order_detail_message`,`order_g_img`,`order_e_state`,`order_detail_invoice`) values (248,8,33,NULL,1,1,1,'185.00',0,'2019-04-09 15:49:54',0,NULL,NULL,'dfgds',1,45,NULL,NULL,NULL,'2019-04-11 17:00:00','',NULL,0,0),(249,8,33,NULL,1,1,1,'185.00',0,'2019-04-09 15:49:54',0,NULL,NULL,'dfgds',1,47,NULL,NULL,NULL,'2019-04-11 17:00:00','',NULL,0,0),(250,8,35,NULL,1,1,1,'200.00',0,'2019-04-09 15:49:54',0,NULL,NULL,'dfgds',1,46,NULL,NULL,NULL,'2019-04-11 17:00:00','',NULL,0,0),(251,8,28,NULL,1,1,1,'1950.00',0,'2019-04-09 15:49:54',0,NULL,NULL,'dfgds',1,48,NULL,NULL,NULL,'2019-04-11 17:00:00','',NULL,0,0),(252,8,28,NULL,1,1,1,'1950.00',0,'2019-04-09 15:49:54',0,NULL,NULL,'dfgds',1,49,NULL,NULL,NULL,'2019-04-11 17:00:00','',NULL,0,0);

/*Table structure for table `classify` */

CREATE TABLE `classify` (
  `classify_id` int(11) NOT NULL AUTO_INCREMENT,
  `classify_name` varchar(32) NOT NULL COMMENT '商品分类名称',
  `classify_faid` tinyint(4) DEFAULT '0' COMMENT '商品分类父id 默认0-蛋糕',
  PRIMARY KEY (`classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `classify` */

insert  into `classify`(`classify_id`,`classify_name`,`classify_faid`) values (1,'慕斯',0),(2,'香甜奶油',0),(3,'巧克力',0),(4,'鲜果',0),(5,'咸奶油',0),(6,'雪域',0);

/*Table structure for table `distribution` */

CREATE TABLE `distribution` (
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `distribution_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '订单配送id',
  `distribution_name` varchar(32) NOT NULL COMMENT '配送人员姓名',
  `distribution_phone` varchar(16) NOT NULL COMMENT '配送人员联系电话',
  `distribution_state` tinyint(4) DEFAULT '0' COMMENT '订单配送状态 : 0-等待配送 1-正在配送 2-收货成功',
  PRIMARY KEY (`distribution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `distribution` */

/*Table structure for table `evaluate` */

CREATE TABLE `evaluate` (
  `evaluate_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品评价id',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `order_id` int(10) NOT NULL COMMENT '订单id',
  `goods_id` int(10) NOT NULL,
  `evaluate_img` varchar(255) NOT NULL COMMENT '评价上传图片(url)',
  `evaluate_content` varchar(100) DEFAULT NULL COMMENT '评价内容',
  `evaluate_level` tinyint(4) DEFAULT '5' COMMENT '评价等级: 1-一星，2-二星，3-三星，4-四星，5-五星',
  `evaluate_time` datetime NOT NULL COMMENT '评价时间',
  PRIMARY KEY (`evaluate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `evaluate` */

insert  into `evaluate`(`evaluate_id`,`user_id`,`order_id`,`goods_id`,`evaluate_img`,`evaluate_content`,`evaluate_level`,`evaluate_time`) values (1,5,4,5,'public\\uploads\\file-1554114029322.gifpublic\\uploads\\file-1554114029341.png','dgfkjshgfskhfs;s;',4,'2019-04-01 18:20:29'),(2,5,4,5,'public\\uploads\\file-1554114498315.pngpublic\\uploads\\file-1554114498347.png','这评论很假',5,'2019-04-01 18:28:18'),(3,8,4,5,'','235423',4,'2019-04-09 11:22:09'),(4,8,4,5,'public\\uploads\\file-1554780293695.gif','123123123',5,'2019-04-09 11:24:54'),(5,8,191,13,'','hjasgfkagagflaglgagljf',4,'2019-04-09 13:05:08'),(6,8,187,33,'','测试1',4,'2019-04-09 13:05:54'),(7,8,187,33,'','东方会计师刚开始干考试不挂科吧',3,'2019-04-09 13:13:41'),(8,8,187,33,'','点开了计时开始',4,'2019-04-09 13:16:08'),(9,8,191,13,'','会计师赶快来上课了',3,'2019-04-09 13:16:18'),(10,8,192,33,'public\\uploads\\file-1554787136555.gif','123',5,'2019-04-09 13:18:57'),(11,8,193,13,'public\\uploads\\file-1554787199145.png','aaaaa',5,'2019-04-09 13:19:59');

/*Table structure for table `goods` */

CREATE TABLE `goods` (
  `goods_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goods_name` varchar(32) NOT NULL COMMENT '商品名称',
  `classify_id` int(11) NOT NULL COMMENT '商品分类id',
  `goods_pic_main` varchar(255) DEFAULT NULL COMMENT '主图(url)',
  `c_object` tinyint(4) NOT NULL COMMENT '商品赠送对象 :1-送长辈 2-送朋友 3-送闺蜜 4-送恋人 5-送亲子',
  `goods_price` decimal(12,2) NOT NULL COMMENT '商品价格价格',
  `goods_strattime` date DEFAULT NULL COMMENT '商品上架时间',
  `goods_endtime` date DEFAULT NULL COMMENT '商品下架时间',
  `goods_state` tinyint(4) DEFAULT '0' COMMENT '商品状态：0-可以购买， 1-不可购买',
  `goods_sweetns` tinyint(4) NOT NULL COMMENT '商品甜度： 1-微咸 2-微甜 3-适度 4-很甜甜',
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

insert  into `goods`(`goods_id`,`goods_name`,`classify_id`,`goods_pic_main`,`c_object`,`goods_price`,`goods_strattime`,`goods_endtime`,`goods_state`,`goods_sweetns`) values (1,'露水茶颜',1,'img/cake/mousse/dew/preview.png',2,'230.00','2019-02-22',NULL,0,1),(2,'莱茵河莓妖精',1,'img\\cake\\mousse\\rhine\\preview.png',3,'210.00','2019-02-22',NULL,0,4),(3,'玫瑰女王',1,'img\\cake\\mousse\\rose\\preview.png',4,'215.00','2019-02-22',NULL,0,3),(4,'新公爵慕斯',1,'img\\cake\\mousse\\tiramisu\\preview.png',1,'230.00','2019-03-31',NULL,0,2),(5,'许愿天使',1,'img\\cake\\mousse\\vow\\preview.png',1,'210.00','2019-03-22',NULL,0,4),(6,'白色红丝绒',1,'img\\cake\\mousse\\white\\preview.png',2,'230.00','2019-03-22',NULL,0,3),(7,'沃尔夫斯堡之春',1,'img\\cake\\mousse\\wolfsburg\\preview.png',5,'210.00','2019-03-22',NULL,0,4),(8,'兔小萌',2,'img\\cake\\cream\\coney\\preview.png',2,'195.00','2019-03-13',NULL,0,4),(9,'旺旺旺',2,'img\\cake\\cream\\dog\\preview.png',4,'210.00','2019-03-22',NULL,0,4),(10,'狮子王',2,'img\\cake\\cream\\lion\\preview.png',5,'240.00','2019-01-22',NULL,0,4),(11,'一见倾心',2,'img\\cake\\cream\\love\\preview.png',2,'215.00','2019-01-07',NULL,0,4),(12,'贝贝猪',2,'img\\cake\\cream\\pig\\preview.png',4,'230.00','2018-11-15',NULL,0,4),(13,'PAPI熊',3,'img\\cake\\chocolate\\bear\\preview.png',1,'199.00','2019-03-22',NULL,0,4),(14,'黑白巧克力',3,'img\\cake\\chocolate\\black\\preview.png',3,'188.00','2019-03-22',NULL,0,3),(15,'布朗尼精灵',3,'img\\cake\\chocolate\\brownie\\preview.png',2,'166.00','2019-01-19',NULL,0,4),(16,'慕尼黑巧克力',3,'img\\cake\\chocolate\\munich\\preview.png',1,'209.00','2019-03-14',NULL,0,3),(17,'巧色生香',3,'img\\cake\\chocolate\\tea\\preview.png',2,'219.00','2019-01-22',NULL,0,3),(18,'松露巧克力',3,'img\\cake\\chocolate\\truffle\\preview.png',1,'215.00','2019-03-19',NULL,0,4),(19,'蓝妃儿',4,'img\\cake\\fruit\\blueberry\\preview.png',2,'215.00','2019-03-10',NULL,0,3),(20,'金色榴莲',4,'img\\cake\\fruit\\durian\\preview.png',3,'230.00','2018-11-21',NULL,0,2),(21,'红莓恋人',4,'img\\cake\\fruit\\lover\\preview.png',4,'210.00','2019-03-22',NULL,0,2),(22,'落莓恋曲',4,'img\\cake\\fruit\\loveSong\\preview.png',3,'215.00','2019-01-22',NULL,0,3),(23,'芒GO',4,'img\\cake\\fruit\\mango\\preview.png',4,'230.00','2018-12-05',NULL,0,2),(24,'芒来芒去',4,'img\\cake\\fruit\\mango2\\preview.png',3,'210.00','2019-03-22',NULL,0,2),(25,'草莓拿破仑',4,'img\\cake\\fruit\\redPlum\\preview.png',4,'215.00','2019-01-22',NULL,0,3),(26,'轨迹',5,'img\\cake\\saltedCream\\locus\\preview.png',3,'175.00','2018-12-12',NULL,0,1),(27,'歌剧魅影',5,'img\\cake\\saltedCream\\opera\\preview.png',5,'180.00','2019-02-04',NULL,0,1),(28,'法师咸奶油',5,'img\\cake\\saltedCream\\leben\\preview.png',3,'1950.00','2018-11-01',NULL,0,1),(29,'小沙皮',5,'img\\cake\\saltedCream\\sharpei\\preview.png',2,'259.00','2019-03-22',NULL,0,1),(30,'白山羊之恋',6,'img\\cake\\snow\\aegeanSea\\preview.png',3,'250.00','2018-11-01',NULL,0,2),(31,'美刀刀',6,'img\\cake\\snow\\dollar\\preview.png',5,'220.00','2019-02-22',NULL,0,4),(32,'浓情花意',6,'img\\cake\\snow\\flower\\preview.png',5,'155.00','2019-03-22',NULL,0,3),(33,'极地牛乳雪域',6,'img\\cake\\snow\\milk\\preview.png',1,'185.00','2019-03-22',NULL,0,3),(34,'奥利奥雪域',6,'img\\cake\\snow\\orion\\preview.png',5,'260.00','2019-02-22',NULL,0,2),(35,'踏雪寻梅',6,'img\\cake\\snow\\snowflake\\preview.png',1,'200.00','2019-03-22',NULL,0,4);

/*Table structure for table `goods_detail` */

CREATE TABLE `goods_detail` (
  `goods_detail_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品详情id',
  `goods_id` int(10) NOT NULL COMMENT '商品id',
  `goods_name` varchar(32) NOT NULL COMMENT '商品名称',
  `classify_id` int(10) NOT NULL COMMENT '商品分类id',
  `goods_detail_pic_main` varchar(255) NOT NULL COMMENT '商品主图(url)',
  `goods_detail_pic_desc` varchar(255) NOT NULL COMMENT '商品详情(url)',
  `goods_detail_price` decimal(12,2) NOT NULL COMMENT '价格',
  `goods_detail_starttime` date NOT NULL COMMENT '商品上架时间',
  `goods_detail_endtime` date DEFAULT NULL COMMENT '商品下架时间',
  `sell_id` int(10) DEFAULT '0' COMMENT '商品销量id',
  `goods_detail_desripe` varchar(255) NOT NULL COMMENT '商品描述',
  `evaluate_state` tinyint(4) DEFAULT '0' COMMENT '订单评价状态：0-未评论 1-评论',
  `goods_detail_maxsize` tinyint(4) DEFAULT '2' COMMENT '商品最大规格 :0-1磅，1-1.5磅，2-2磅',
  `goods_detail_state` tinyint(4) DEFAULT '0' COMMENT '商品状态 : 1-不可购买，0-可以购买',
  `goods_detail_storage` varchar(255) NOT NULL COMMENT '储存条件',
  `goods_detail_material` varchar(255) NOT NULL COMMENT '原材料说明',
  `stock_id` int(10) DEFAULT NULL COMMENT '库存id',
  PRIMARY KEY (`goods_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `goods_detail` */

insert  into `goods_detail`(`goods_detail_id`,`goods_id`,`goods_name`,`classify_id`,`goods_detail_pic_main`,`goods_detail_pic_desc`,`goods_detail_price`,`goods_detail_starttime`,`goods_detail_endtime`,`sell_id`,`goods_detail_desripe`,`evaluate_state`,`goods_detail_maxsize`,`goods_detail_state`,`goods_detail_storage`,`goods_detail_material`,`stock_id`) values (1,1,'露水茶颜',1,'img/cake/mousse/dew/sample_1.jpg+img/cake/mousse/dew/sample_2.jpg+img/cake/mousse/dew/sample_3.jpg+img/cake/mousse/dew/sample_4.jpg','img/cake/mousse/dew/details_1.jpg+img/cake/mousse/dew/details_2.jpg+img/cake/mousse/dew/details_3.jpg','230.00','2019-02-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,1,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','纯脂黑巧克力，椰浆，安佳淡奶油，白巧克力，安佳黄油',NULL),(2,2,'莱茵河莓妖精',1,'img\\cake\\mousse\\rhine\\sample_1.jpg+img\\cake\\mousse\\rhine\\sample_2.jpg+img\\cake\\mousse\\rhine\\sample_3.jpg+img\\cake\\mousse\\rhine\\sample_4.jpg','img\\cake\\mousse\\rhine\\details_1.jpg+img\\cake\\mousse\\rhine\\details_2.jpg+img\\cake\\mousse\\rhine\\details_3.jpg','210.00','2019-02-22',NULL,0,'缓缓淋在蛋糕上的蓝莓果酱，填满奶油起伏之间的空白，好似从阿尔卑斯山麓流淌而来的莱茵河，流过半个欧洲。落在上面的颗颗蓝莓，宛如河水孕育的点点小镇。蓝莓的清爽和奶油的香甜完美融合，完成了一次从视觉、味觉到质感的完美构建。由于季节性原因，新鲜蓝莓可能会不稳定，请谨慎选择。',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口纯动物奶油、进口安佳奶酪、香滑巧克力、进口韩国幼砂糖、吉利丁',NULL),(3,3,'玫瑰女王',1,'img\\cake\\mousse\\rose\\sample_1.jpg+img\\cake\\mousse\\rose\\sample_2.jpg +img\\cake\\mousse\\rose\\sample_3.jpg+img\\cake\\mousse\\rose\\sample_4.jpg','img\\cake\\mousse\\rose\\details_1.jpg+img\\cake\\mousse\\rose\\details_2.jpg+img\\cake\\mousse\\rose\\details_3.jpg','215.00','2019-02-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(4,4,'新公爵慕斯',1,'img\\cake\\mousse\\tiramisu\\sample_1.jpg+img\\cake\\mousse\\tiramisu\\sample_2.jpg+img\\cake\\mousse\\tiramisu\\sample_3.jpg+img\\cake\\mousse\\tiramisu\\sample_4.jpg','img\\cake\\mousse\\tiramisu\\details_1.jpg+img\\cake\\mousse\\tiramisu\\details_2.jpg+img\\cake\\mousse\\tiramisu\\details_3.jpg','230.00','2019-03-22',NULL,0,'意大利文中，提拉米苏（Tiramisu）是“带我走”的意思。如此浪漫的名字是否真的为爱而生，我们也许无从考证。但是解释上的断层，用一种甜中微苦的绵密深沉去弥补，便能瞬间唤醒的你的味蕾。甜酒的醇、奶油的香、巧克力的馥郁、手指饼干的酥脆、可可粉的干爽，揉合在一起，把提拉米苏惑人的浓醇香气，一层一层精彩演绎。',0,1,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','原味戚风胚+特制乳脂奶油',NULL),(5,5,'许愿天使',1,'img\\cake\\mousse\\vow\\sample_1.jpg+img\\cake\\mousse\\vow\\sample_2.jpg+img\\cake\\mousse\\vow\\sample_3.jpg+img\\cake\\mousse\\vow\\sample_4.jpg','img\\cake\\mousse\\vow\\details_1.jpg+img\\cake\\mousse\\vow\\details_2.jpg+img\\cake\\mousse\\vow\\details_3.jpg','210.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,3,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','酸奶油、进口安佳奶酪、进口黄油',NULL),(6,6,'白色红丝绒',1,'img\\cake\\mousse\\white\\sample_1.jpg+img\\cake\\mousse\\white\\sample_2.jpg+img\\cake\\mousse\\white\\sample_3.jpg+img\\cake\\mousse\\white\\sample_4.jpg','img\\cake\\mousse\\white\\details_1.jpg+img\\cake\\mousse\\white\\details_2.jpg+img\\cake\\mousse\\white\\details_3.jpg','230.00','2019-03-22',NULL,0,'红色奢华眩目、白色经典大气，两者相配，诠释了优雅与尊贵。红丝绒低密度的蛋糕饼胚造就了她格外蓬松的口感，如天鹅绒一般丝滑细腻，轻抿一口，浓郁清甜，让人仿佛身处王室的后花园，回味而享受。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(7,7,'沃尔夫斯堡之春',1,'img\\cake\\mousse\\wolfsburg\\sample_1.jpg+img\\cake\\mousse\\wolfsburg\\sample_2.jpg+img\\cake\\mousse\\wolfsburg\\sample_3.jpg+img\\cake\\mousse\\wolfsburg\\sample_4.jpg','img\\cake\\mousse\\wolfsburg\\details_1.jpg+img\\cake\\mousse\\wolfsburg\\details_2.jpg+img\\cake\\mousse\\wolfsburg\\details_3.jpg','210.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,1,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口安佳淡奶油、红丝绒预拌粉、甜菜根粉',NULL),(8,8,'兔小萌',2,'img\\cake\\cream\\coney\\sample_1.jpg+img\\cake\\cream\\coney\\sample_2.jpg+img\\cake\\cream\\coney\\sample_3.jpg+img\\cake\\cream\\coney\\sample_4.jpg','img\\cake\\cream\\coney\\details_1.jpg+img\\cake\\cream\\coney\\details_2.jpg+img\\cake\\cream\\coney\\details_3.jpg','195.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,5,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(9,9,'旺旺旺',2,'img\\cake\\cream\\dog\\sample_1.jpg+img\\cake\\cream\\dog\\sample_2.jpg+img\\cake\\cream\\dog\\sample_3.jpg+img\\cake\\cream\\dog\\sample_4.jpg','img\\cake\\cream\\dog\\details_1.jpg+img\\cake\\cream\\dog\\details_2.jpg+img\\cake\\cream\\dog\\details_3.jpg','210.00','2019-03-22',NULL,0,'意大利文中，提拉米苏（Tiramisu）是“带我走”的意思。如此浪漫的名字是否真的为爱而生，我们也许无从考证。但是解释上的断层，用一种甜中微苦的绵密深沉去弥补，便能瞬间唤醒的你的味蕾。甜酒的醇、奶油的香、巧克力的馥郁、手指饼干的酥脆、可可粉的干爽，揉合在一起，把提拉米苏惑人的浓醇香气，一层一层精彩演绎。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(10,10,'狮子王',2,'img\\cake\\cream\\lion\\sample_1.jpg+img\\cake\\cream\\lion\\sample_2.jpg+img\\cake\\cream\\lion\\sample_3.jpg+img\\cake\\cream\\lion\\sample_4.jpg','img\\cake\\cream\\lion\\details_1.jpg+img\\cake\\cream\\lion\\details_2.jpg+img\\cake\\cream\\lion\\details_3.jpg','240.00','2019-01-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','德国进口白巧克力、新西兰安佳淡奶油、新鲜草莓、草莓果酱',NULL),(11,11,'一见倾心',2,'img\\cake\\cream\\love\\sample_1.jpg+img\\cake\\cream\\love\\sample_2.jpg+img\\cake\\cream\\love\\sample_3.jpg+img\\cake\\cream\\love\\sample_4.jpg','img\\cake\\cream\\love\\details_1.jpg+img\\cake\\cream\\love\\details_2.jpg+img\\cake\\cream\\love\\details_3.jpg','215.00','2019-03-22',NULL,0,'意大利文中，提拉米苏（Tiramisu）是“带我走”的意思。如此浪漫的名字是否真的为爱而生，我们也许无从考证。但是解释上的断层，用一种甜中微苦的绵密深沉去弥补，便能瞬间唤醒的你的味蕾。甜酒的醇、奶油的香、巧克力的馥郁、手指饼干的酥脆、可可粉的干爽，揉合在一起，把提拉米苏惑人的浓醇香气，一层一层精彩演绎。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(12,12,'贝贝猪',2,'img\\cake\\cream\\pig\\sample_1.jpg+img\\cake\\cream\\pig\\sample_2.jpg+img\\cake\\cream\\pig\\sample_3.jpg+img\\cake\\cream\\pig\\sample_4.jpg','img\\cake\\cream\\pig\\details_1.jpg+img\\cake\\cream\\pig\\details_2.jpg+img\\cake\\cream\\pig\\details_3.jpg','230.00','2019-01-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,3,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口安佳淡奶油、进口安佳黄油、白兰地酒、代脂黑巧克力、巴旦木（扁桃仁片）、防潮糖粉、进口安佳奶酪、代脂白巧克力',NULL),(13,13,'PAPI熊',3,'img\\cake\\chocolate\\bear\\sample_1.jpg+img\\cake\\chocolate\\bear\\sample_2.jpg+img\\cake\\chocolate\\bear\\sample_3.jpg+img\\cake\\chocolate\\bear\\sample_4.jpg','img\\cake\\chocolate\\bear\\details_1.jpg+img\\cake\\chocolate\\bear\\details_2.jpg+img\\cake\\chocolate\\bear\\details_3.jpg','199.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(14,14,'黑白巧克力',3,'img\\cake\\chocolate\\black\\sample_1.jpg+img\\cake\\chocolate\\black\\sample_2.jpg+img\\cake\\chocolate\\black\\sample_3.jpg+img\\cake\\chocolate\\black\\sample_4.jpg','img\\cake\\chocolate\\black\\details_1.jpg+img\\cake\\chocolate\\black\\details_2.jpg+img\\cake\\chocolate\\black\\details_3.jpg','188.00','2019-03-22',NULL,0,'如果你是一个巧克力控，你一定不能错过它。巧克力淋面 黑巧克力慕斯 巧克力戚风胚的完美组合，让你一秒就陷入巧克力的香浓诱惑。角落里的枫叶仿佛带来了慕尼黑的浪漫与清逸，巧克力带来的浓郁在加入了白兰地的衬托下，愈发香醇，让挑剔的味觉沉醉其中。',0,3,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口蓝莓、进口安佳淡奶油',NULL),(15,15,'布朗尼精灵',3,'img\\cake\\chocolate\\brownie\\sample_1.jpg+img\\cake\\chocolate\\brownie\\sample_2.jpg+img\\cake\\chocolate\\brownie\\sample_3.jpg+img\\cake\\chocolate\\brownie\\sample_4.jpg','img\\cake\\chocolate\\brownie\\details_1.jpg+img\\cake\\chocolate\\brownie\\details_2.jpg+img\\cake\\chocolate\\brownie\\details_3.jpg','166.00','2019-01-22',NULL,0,'你知道吗，布朗尼的诞生，源于一个“可爱的错误”，一次忘记将奶油打发的偶然，却产生了这意外的美味。游荡于蛋糕与饼干之间的口感，徜徉于朗姆酒与巧克力混合的香气，一口咬下去，香脆的核桃仁带来一丝别样的惊喜，每一秒都让你回味无穷。',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(16,16,'慕尼黑巧克力',3,'img\\cake\\chocolate\\munich\\sample_1.jpg+img\\cake\\chocolate\\munich\\sample_2.jpg+img\\cake\\chocolate\\munich\\sample_3.jpg+img\\cake\\chocolate\\munich\\sample_4.jpg','img\\cake\\chocolate\\munich\\details_1.jpg+img\\cake\\chocolate\\munich\\details_2.jpg+img\\cake\\chocolate\\munich\\details_3.jpg','209.00','2019-03-22',NULL,0,'如果你是一个巧克力控，你一定不能错过它。巧克力淋面 黑巧克力慕斯 巧克力戚风胚的完美组合，让你一秒就陷入巧克力的香浓诱惑。角落里的枫叶仿佛带来了慕尼黑的浪漫与清逸，巧克力带来的浓郁在加入了白兰地的衬托下，愈发香醇，让挑剔的味觉沉醉其中。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口新鲜蓝莓、进口原装安佳奶油、奶酪 进口黄油',NULL),(17,17,'巧色生香',3,'img\\cake\\chocolate\\tea\\sample_1.jpg+img\\cake\\chocolate\\tea\\sample_2.jpg+img\\cake\\chocolate\\tea\\sample_3.jpg+img\\cake\\chocolate\\tea\\sample_4.jpg','img\\cake\\chocolate\\tea\\details_1.jpg+img\\cake\\chocolate\\tea\\details_2.jpg+img\\cake\\chocolate\\tea\\details_3.jpg','219.00','2019-01-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(18,18,'松露巧克力',3,'img\\cake\\chocolate\\truffle\\sample_1.jpg+img\\cake\\chocolate\\truffle\\sample_2.jpg+img\\cake\\chocolate\\truffle\\sample_3.jpg+img\\cake\\chocolate\\truffle\\sample_4.jpg','img\\cake\\chocolate\\truffle\\details_1.jpg+img\\cake\\chocolate\\truffle\\details_2.jpg+img\\cake\\chocolate\\truffle\\details_3.jpg','215.00','2019-03-22',NULL,0,'传说有位法国皇家御厨为了给远嫁而来的西班牙公主解思乡之情，突发奇想将可可粉融入甜点中，并借用皇室珍馔“松露”的外形，从而诞生了松露巧克力。蛋糕表面的一层天然可可粉，覆在下层的黑巧克力慕斯上。细腻香醇、丝丝浓滑，带给你一场味觉的盛宴。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口蓝莓果酱、进口安佳淡奶油、奶酪',NULL),(19,19,'蓝妃儿',4,'img\\cake\\fruit\\blueberry\\sample_1.jpg+img\\cake\\fruit\\blueberry\\sample_2.jpg+img\\cake\\fruit\\blueberry\\sample_3.jpg+img\\cake\\fruit\\blueberry\\sample_4.jpg','img\\cake\\fruit\\blueberry\\details_1.jpg+img\\cake\\fruit\\blueberry\\details_2.jpg+img\\cake\\fruit\\blueberry\\details_3.jpg','215.00','2019-03-22',NULL,0,'生活总是透着惊喜，这一秒是蓝莓的新鲜酸甜、下一秒就是奶油的纯香丰盈。你还来不及回味，早就融化在口里，回归本真，锁住新鲜。由于季节性原因，新鲜蓝莓可能会不稳定，请谨慎选择。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(20,20,'金色榴莲',4,'img\\cake\\fruit\\durian\\sample_1.jpg+img\\cake\\fruit\\durian\\sample_2.jpg+img\\cake\\fruit\\durian\\sample_3.jpg+img\\cake\\fruit\\durian\\sample_4.jpg','img\\cake\\fruit\\durian\\details_1.jpg+img\\cake\\fruit\\durian\\details_2.jpg+img\\cake\\fruit\\durian\\details_3.jpg','230.00','2019-01-22',NULL,0,'若有一种味道，能让你闻香而欲动，必是果中之王“榴莲”。它可以轻易地将世界上的人分为两种，爱或不爱，永远没有中间地带。榴莲果肉饱满的甜味，伴着微微的奶香，带来双重浓郁和双倍香甜。复杂而浓烈的味道，奶油与果肉层层叠进的丰富口感，每分每秒，尽是对唇齿最温柔的宠溺。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','：进口安佳动物奶油、进口防潮可可粉、进口巧克力豆、进口黑巧克力',NULL),(21,21,'红莓恋人',4,'img\\cake\\fruit\\lover\\sample_1.jpg+img\\cake\\fruit\\lover\\sample_2.jpg+img\\cake\\fruit\\lover\\sample_3.jpg+img\\cake\\fruit\\lover\\sample_4.jpg','img\\cake\\fruit\\lover\\details_1.jpg+img\\cake\\fruit\\lover\\details_2.jpg+img\\cake\\fruit\\lover\\details_3.jpg','210.00','2019-03-22',NULL,0,'草莓薰红的季节,带来满口的酸甜,原汁原味,鲜丽诱人.进口的黑巧克力,每一口都倍感甜蜜',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(22,22,'落莓恋曲',4,'img\\cake\\fruit\\loveSong\\sample_1.jpg+img\\cake\\fruit\\loveSong\\sample_2.jpg+img\\cake\\fruit\\loveSong\\sample_3.jpg+img\\cake\\fruit\\loveSong\\sample_4.jpg','img\\cake\\fruit\\loveSong\\details_1.jpg+img\\cake\\fruit\\loveSong\\details_2.jpg+img\\cake\\fruit\\loveSong\\details_3.jpg','215.00','2019-01-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','：进口安佳动物奶油、进口防潮可可粉、进口巧克力豆、进口黑巧克力',NULL),(23,23,'芒GO',4,'img\\cake\\fruit\\mango\\sample_1.jpg+img\\cake\\fruit\\mango\\sample_2.jpg+img\\cake\\fruit\\mango\\sample_3.jpg+img\\cake\\fruit\\mango\\sample_4.jpg','img\\cake\\fruit\\mango\\details_1.jpg+img\\cake\\fruit\\mango\\details_2.jpg+img\\cake\\fruit\\mango\\details_3.jpg','230.00','2019-03-22',NULL,0,'金黄飘香的栗子被打成软绵可口的栗泥，质地细密，与柔软丝滑的慕斯完美结合。浓郁芳香的朗姆酒随性滴洒，仿佛一曲燃烧的弗朗明戈，栗香与酒香交相辉映，犹如一缕清风在唇边轻扬。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','酸奶油、进口安佳奶酪、进口黄油',NULL),(24,24,'芒来芒去',4,'img\\cake\\fruit\\mango2\\sample_1.jpg+img\\cake\\fruit\\mango2\\sample_2.jpg+img\\cake\\fruit\\mango2\\sample_3.jpg+img\\cake\\fruit\\mango2\\sample_4.jpg','img\\cake\\fruit\\mango2\\details_1.jpg+img\\cake\\fruit\\mango2\\details_2.jpg+img\\cake\\fruit\\mango2\\details_3.jpg','210.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,3,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(25,25,'草莓拿破仑',4,'img\\cake\\fruit\\redPlum\\sample_1.jpg+img\\cake\\fruit\\redPlum\\sample_2.jpg+img\\cake\\fruit\\redPlum\\sample_3.jpg+img\\cake\\fruit\\redPlum\\sample_4.jpg','img\\cake\\fruit\\redPlum\\details_1.jpg+img\\cake\\fruit\\redPlum\\details_2.jpg+img\\cake\\fruit\\redPlum\\details_3.jpg','215.00','2019-01-22',NULL,0,'拿破仑蛋糕又称千层酥,独特的制作手法保证酥皮的层层分明,薄脆爽口，搭配清新蓝莓，精准配比,既让蓝莓的水分充足又保证拿破仑蛋糕酥皮的清脆口感,这是富有层次的味觉体验',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','：进口安佳动物奶油、进口防潮可可粉、进口巧克力豆、进口黑巧克力',NULL),(26,26,'轨迹',5,'img\\cake\\saltedCream\\locus\\sample_1.jpg+img\\cake\\saltedCream\\locus\\sample_2.jpg+img\\cake\\saltedCream\\locus\\sample_3.jpg+img\\cake\\saltedCream\\locus\\sample_4.jpg','img\\cake\\saltedCream\\locus\\details_1.jpg+img\\cake\\saltedCream\\locus\\details_2.jpg+img\\cake\\saltedCream\\locus\\details_3.jpg','175.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(27,27,'歌剧魅影',5,'img\\cake\\saltedCream\\opera\\sample_1.jpg+img\\cake\\saltedCream\\opera\\sample_2.jpg+img\\cake\\saltedCream\\opera\\sample_3.jpg+img\\cake\\saltedCream\\opera\\sample_4.jpg','img\\cake\\saltedCream\\opera\\details_1.jpg+img\\cake\\saltedCream\\opera\\details_2.jpg+img\\cake\\saltedCream\\opera\\details_3.jpg','180.00','2019-02-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','酸奶油、进口安佳奶酪、进口黄油',NULL),(28,28,'法师咸奶油',5,'img\\cake\\saltedCream\\leben\\sample_1.jpg+img\\cake\\saltedCream\\leben\\sample_2.jpg+img\\cake\\saltedCream\\leben\\sample_3.jpg+img\\cake\\saltedCream\\leben\\sample_4.jpg','img\\cake\\saltedCream\\leben\\details_1.jpg+img\\cake\\saltedCream\\leben\\details_2.jpg+img\\cake\\saltedCream\\leben\\details_3.jpg','1950.00','2019-03-22',NULL,0,'他，安静内敛；她，活泼美好。他爱看她咯咯地笑，她爱在他拨弄琴弦的时候静静陪在一旁。旁人眼里的性格迥异，他们却相处和谐，无需矫揉造作，就像冻芝士的柔软遇上烤芝士的热情。爱的无限可能，等你来发掘。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(29,29,'小沙皮',5,'img\\cake\\saltedCream\\sharpei\\sample_1.jpg+img\\cake\\saltedCream\\sharpei\\sample_2.jpg+img\\cake\\saltedCream\\sharpei\\sample_3.jpg+img\\cake\\saltedCream\\sharpei\\sample_4.jpg','img\\cake\\saltedCream\\sharpei\\details_1.jpg+img\\cake\\saltedCream\\sharpei\\details_2.jpg+img\\cake\\saltedCream\\sharpei\\details_3.jpg','259.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','：进口安佳动物奶油、进口防潮可可粉、进口巧克力豆、进口黑巧克力',NULL),(30,30,'白山羊之恋',6,'img\\cake\\snow\\aegeanSea\\sample_1.jpg+img\\cake\\snow\\aegeanSea\\sample_2.jpg+img\\cake\\snow\\aegeanSea\\sample_3.jpg+img\\cake\\snow\\aegeanSea\\sample_4.jpg','img\\cake\\snow\\aegeanSea\\details_1.jpg+img\\cake\\snow\\aegeanSea\\details_2.jpg+img\\cake\\snow\\aegeanSea\\details_3.jpg','250.00','2019-03-22',NULL,0,'一眼望去，最纯净的白色中闪耀着那一点红妆，是富含维生素C的红加仑。丝滑的奶油蜿蜒起伏，像极了爱琴海上浪漫的波浪。奶油入口的瞬间，温婉细腻的少女情怀慢慢被激起。松软的戚风胚加上特制乳脂奶油的柔滑，浪漫的气息萦绕身旁，仿佛置身简单美好的纯白世界。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(31,31,'美刀刀',6,'img\\cake\\snow\\dollar\\sample_1.jpg+img\\cake\\snow\\dollar\\sample_2.jpg+img\\cake\\snow\\dollar\\sample_3.jpg+img\\cake\\snow\\dollar\\sample_4.jpg','img\\cake\\snow\\dollar\\details_1.jpg+img\\cake\\snow\\dollar\\details_2.jpg+img\\cake\\snow\\dollar\\details_3.jpg','220.00','2019-02-22',NULL,0,'用心打发而成的美味奶油,口感绵密，精致细腻,这份雪白让你有如获至宝的幸福感',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','进口抹茶粉、新西兰安佳淡奶油、进口巧克力',NULL),(32,32,'浓情花意',6,'img\\cake\\snow\\flower\\sample_1.jpg+img\\cake\\snow\\flower\\sample_2.jpg+img\\cake\\snow\\flower\\sample_3.jpg+img\\cake\\snow\\flower\\sample_4.jpg','img\\cake\\snow\\flower\\details_1.jpg+img\\cake\\snow\\flower\\details_2.jpg+img\\cake\\snow\\flower\\details_3.jpg','155.00','2019-03-22',NULL,0,'如同山脚下开满小花的原野，跳跃着愉悦，挑动着味蕾。点点露水和朵朵小花散落着数不清的芬芳思念，所有声音都在轻声呢喃着抹茶的美好。为了降低抹茶特有的苦涩，我们采用传统工艺，在不破坏茶香的基础上，最大程度降低抹茶入口时的涩感，将茶香味，苦涩味与甜味的比例处理的恰到好处。清雅至纯，细腻柔滑，让茶香在唇间绽放，醇香四溢，回味悠长。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','：进口安佳动物奶油、进口防潮可可粉、进口巧克力豆、进口黑巧克力',NULL),(33,33,'极地牛乳雪域',6,'img\\cake\\snow\\milk\\sample_1.jpg+img\\cake\\snow\\milk\\sample_2.jpg+img\\cake\\snow\\milk\\sample_3.jpg+img\\cake\\snow\\milk\\sample_4.jpg','img\\cake\\snow\\milk\\details_1.jpg+img\\cake\\snow\\milk\\details_2.jpg+img\\cake\\snow\\milk\\details_3.jpg','185.00','2019-03-22',NULL,0,'芝士的香气透过肆意飘洒的白雪氤氲开来，宛如午后从窗外洒进来的温暖阳光，不忍错过。内在的柔软细腻，更衬托出外表的纯白无瑕，简约的美铸就了经典。',0,4,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','酸奶油、进口安佳奶酪、进口黄油',NULL),(34,34,'奥利奥雪域',6,'img\\cake\\snow\\orion\\sample_1.jpg+img\\cake\\snow\\orion\\sample_2.jpg+img\\cake\\snow\\orion\\sample_3.jpg+img\\cake\\snow\\orion\\sample_4.jpg','img\\cake\\snow\\orion\\details_1.jpg+img\\cake\\snow\\orion\\details_2.jpg+img\\cake\\snow\\orion\\details_3.jpg','260.00','2019-02-22',NULL,0,'扭一扭、舔一舔、泡一泡，当童年经典的奥利奥饼干，碰上酸酸甜甜的蓝莓精灵，一起陷入奶油的醇香怀抱，缓缓融合又各具风味，丝毫不觉唐突。再搭配上浓香四溢的烤芝士层，美味无限，乐趣无穷。',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','：进口安佳动物奶油、进口防潮可可粉、进口巧克力豆、进口黑巧克力',NULL),(35,35,'踏雪寻梅',6,'img\\cake\\snow\\snowflake\\sample_1.jpg+img\\cake\\snow\\snowflake\\sample_2.jpg+img\\cake\\snow\\snowflake\\sample_3.jpg+img\\cake\\snow\\snowflake\\sample_4.jpg','img\\cake\\snow\\snowflake\\details_1.jpg+img\\cake\\snow\\snowflake\\details_2.jpg+img\\cake\\snow\\snowflake\\details_3.jpg','200.00','2019-03-22',NULL,0,'抹茶与红豆的默契，无需言说。早在入口的瞬间，就能体会。当沃尔夫斯堡的简约现代，邂逅日式的传统风雅，如沐春风间寻求平衡之美！',0,2,0,'最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时','酸奶油、进口安佳奶酪、进口黄油',NULL);

/*Table structure for table `homeimg` */

CREATE TABLE `homeimg` (
  `homeimg_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主页图片',
  `homeimg_use` tinyint(4) NOT NULL COMMENT '用途：0-banner 1- 其他',
  `homeimg_state` tinyint(4) DEFAULT '0' COMMENT '图片是否过期：0-可用 1-不可用',
  PRIMARY KEY (`homeimg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `homeimg` */

/*Table structure for table `sell` */

CREATE TABLE `sell` (
  `sell_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品销量id',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `sell_amount` int(10) NOT NULL COMMENT '商品累计销量',
  `sell_starttime` date NOT NULL COMMENT '首次销售时间',
  `sell_recenttime` date NOT NULL COMMENT '最近一次销售时间',
  PRIMARY KEY (`sell_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `sell` */

insert  into `sell`(`sell_id`,`goods_id`,`sell_amount`,`sell_starttime`,`sell_recenttime`) values (1,1,50,'2019-03-22','2019-03-22'),(2,2,60,'2019-03-22','2019-03-22'),(3,3,70,'2019-03-22','2019-03-22'),(4,4,80,'2019-03-22','2019-03-22'),(5,5,90,'2019-03-22','2019-03-22'),(6,6,100,'2019-03-22','2019-03-22'),(7,7,110,'2019-03-22','2019-03-22'),(8,8,120,'2019-03-22','2019-03-22'),(9,9,130,'2019-03-22','2019-03-22'),(10,10,140,'2019-03-22','2019-03-22'),(11,11,150,'2019-03-22','2019-03-22'),(12,12,50,'2019-03-22','2019-03-22'),(13,13,60,'2019-03-22','2019-03-22'),(14,14,70,'2019-03-22','2019-03-22'),(15,15,80,'2019-03-22','2019-03-22'),(16,16,90,'2019-03-22','2019-03-22'),(17,17,100,'2019-03-22','2019-03-22'),(18,18,110,'2019-03-22','2019-03-22'),(19,19,120,'2019-03-22','2019-03-22'),(20,20,130,'2019-03-22','2019-03-22'),(21,21,140,'2019-03-22','2019-03-22'),(22,22,150,'2019-03-22','2019-03-22'),(23,23,50,'2019-03-22','2019-03-22'),(24,24,60,'2019-03-22','2019-03-22'),(25,25,70,'2019-03-22','2019-03-22'),(26,26,80,'2019-03-22','2019-03-22'),(27,27,90,'2019-03-22','2019-03-22'),(28,28,100,'2019-03-22','2019-03-22'),(29,29,110,'2019-03-22','2019-03-22'),(30,30,120,'2019-03-22','2019-03-22'),(31,31,130,'2019-03-22','2019-03-22'),(32,32,130,'2019-03-22','2019-03-22'),(33,33,140,'2019-03-22','2019-03-22'),(34,34,150,'2019-03-22','2019-03-22'),(35,35,150,'2019-03-22','2019-03-22');

/*Table structure for table `shoppingcart` */

CREATE TABLE `shoppingcart` (
  `shoppingcart_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `user_id` int(10) DEFAULT NULL COMMENT '用户id',
  `goods_id` int(10) NOT NULL COMMENT '商品id',
  `goods_price` decimal(12,0) NOT NULL COMMENT '价格',
  `size_id` int(10) DEFAULT '1' COMMENT '商品规格',
  `shoppingcart_amount` int(10) DEFAULT '1' COMMENT '商品数量',
  `shoppingcart_state` tinyint(4) DEFAULT '0' COMMENT '购物车商品状态：0-有效 1-购买中',
  PRIMARY KEY (`shoppingcart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

/*Data for the table `shoppingcart` */

/*Table structure for table `size` */

CREATE TABLE `size` (
  `size_id` int(10) NOT NULL AUTO_INCREMENT,
  `size_name` varchar(20) NOT NULL COMMENT '商品规格名称： 重量1磅  重量1.5磅  重量2磅',
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `size` */

insert  into `size`(`size_id`,`size_name`) values (1,'重量1.2磅'),(2,'重量2.2磅'),(3,'重量3.2磅'),(4,'重量7.2磅');

/*Table structure for table `stock` */

CREATE TABLE `stock` (
  `stock_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '库存id',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `size_id` int(10) NOT NULL COMMENT '商品规格id',
  `classify_id` int(10) NOT NULL COMMENT '商品分类id',
  `stock_amount` int(10) NOT NULL COMMENT '库存数量',
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;

/*Data for the table `stock` */

insert  into `stock`(`stock_id`,`goods_id`,`size_id`,`classify_id`,`stock_amount`) values (1,1,1,1,5),(2,2,1,1,5),(3,3,1,1,5),(4,4,1,1,5),(5,5,1,1,5),(6,6,1,1,5),(7,7,1,1,5),(8,1,2,1,5),(9,2,2,1,5),(10,3,2,1,5),(11,4,2,1,5),(12,5,2,1,5),(13,6,2,1,5),(14,7,2,1,5),(15,1,3,1,5),(16,2,3,1,5),(17,3,3,1,5),(18,4,3,1,5),(19,5,3,1,5),(20,6,3,1,5),(21,7,3,1,5),(22,8,1,2,5),(23,9,1,2,5),(24,10,1,2,5),(25,11,1,2,5),(26,12,1,2,5),(27,8,2,2,5),(28,9,2,2,5),(29,10,2,2,5),(30,11,2,2,5),(31,12,2,2,5),(32,8,3,2,5),(33,9,3,2,5),(34,10,3,2,5),(35,11,3,2,5),(36,12,3,2,5),(37,13,1,3,5),(38,14,1,3,5),(39,15,1,3,5),(40,16,1,3,5),(41,17,1,3,5),(42,18,1,3,5),(43,13,2,3,5),(44,14,2,3,5),(45,15,2,3,5),(46,16,2,3,5),(47,17,2,3,5),(48,18,2,3,5),(49,13,3,3,5),(50,14,3,3,5),(51,15,3,3,5),(52,16,3,3,5),(53,17,3,3,5),(54,18,3,3,5),(55,19,1,4,5),(56,20,1,4,5),(57,21,1,4,5),(58,22,1,4,5),(59,23,1,4,5),(60,24,1,4,5),(61,25,1,4,5),(62,19,2,4,5),(63,20,2,4,5),(64,21,2,4,5),(65,22,2,4,5),(66,23,2,4,5),(67,24,2,4,5),(68,25,2,4,5),(69,19,3,4,5),(70,20,3,4,5),(71,21,3,4,5),(72,22,3,4,5),(73,23,3,4,5),(74,24,3,4,5),(75,25,3,4,5),(76,26,1,5,5),(77,27,1,5,5),(78,28,1,5,5),(79,29,1,5,5),(80,26,2,5,5),(81,27,2,5,5),(82,28,2,5,5),(83,29,2,5,5),(84,26,3,5,5),(85,27,3,5,5),(86,28,3,5,5),(87,29,3,5,5),(88,30,1,6,5),(89,31,1,6,5),(90,32,1,6,5),(91,33,1,6,5),(92,34,1,6,5),(93,35,1,6,5),(94,30,1,6,5),(95,31,2,6,5),(96,32,2,6,5),(97,33,2,6,5),(98,34,2,6,5),(99,35,2,6,5),(100,30,1,6,5),(101,31,3,6,5),(102,32,3,6,5),(103,33,3,6,5),(104,34,3,6,5),(105,35,3,6,5);

/*Table structure for table `user_address` */

CREATE TABLE `user_address` (
  `address_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户地址id',
  `user_id` int(10) DEFAULT NULL COMMENT '用户id',
  `address_country` varchar(16) DEFAULT '中国' COMMENT '所在国',
  `address_previnces` varchar(16) DEFAULT '四川' COMMENT '所在省',
  `address_city` varchar(16) DEFAULT '成都' COMMENT '所在市',
  `address_regin` varchar(16) DEFAULT NULL COMMENT '所在区',
  `address_detail` varchar(50) DEFAULT NULL COMMENT '详细地址',
  `address_name` varchar(32) DEFAULT NULL COMMENT '收货人姓名',
  `address_phone` varchar(16) DEFAULT NULL COMMENT '收货人电话',
  `address_default` tinyint(4) DEFAULT '0' COMMENT '默认收货地址：0-默认  1-非默认',
  `address_del` tinyint(4) DEFAULT '0' COMMENT '地址是否删除：0-未删除 1-已删除',
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `user_address` */

insert  into `user_address`(`address_id`,`user_id`,`address_country`,`address_previnces`,`address_city`,`address_regin`,`address_detail`,`address_name`,`address_phone`,`address_default`,`address_del`) values (1,8,'中国','上海','市辖区','黄浦区','成都成都成都','dfgds','18283600767',1,0),(2,8,'中国','上海','市辖区','黄浦区','123safdad','ewrt','18283600777',0,0);

/*Table structure for table `users` */

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_phone` varchar(16) DEFAULT NULL COMMENT '用户登录手机',
  `user_password` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `user_name` varchar(20) DEFAULT NULL COMMENT '用户名',
  `user_sex` int(11) DEFAULT NULL COMMENT '性别0-男 1-女',
  `user_img` varchar(255) DEFAULT NULL COMMENT '头像图片地址',
  `user_vip` int(11) DEFAULT NULL COMMENT '是否是vip 0-不是 1-是',
  `user_vip_out` datetime DEFAULT NULL COMMENT 'vip到期时间',
  `user_marry` int(11) DEFAULT NULL COMMENT '婚恋状态0-单身 1-恋爱 2-已婚',
  `user_birth_year` int(11) DEFAULT NULL COMMENT '生日 年',
  `user_birth_month` int(11) DEFAULT NULL COMMENT '生日 月',
  `user_birth_day` int(11) DEFAULT NULL COMMENT '生日 日',
  `user_income` int(11) DEFAULT NULL COMMENT '收入',
  `user_regis` datetime DEFAULT NULL COMMENT '注册时间',
  `user_job` varchar(20) DEFAULT NULL COMMENT '工作行业',
  `user_job_prov` varchar(50) DEFAULT NULL COMMENT '工作 省',
  `user_job_city` varchar(50) DEFAULT NULL COMMENT '工作 市',
  `user_job_dis` varchar(50) DEFAULT NULL COMMENT '工作 区',
  `user_job_name` varchar(255) DEFAULT NULL COMMENT '公司名字',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

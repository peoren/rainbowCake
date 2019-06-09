
// 引入
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');
const routers = require('./routers');
const ejs = require('ejs');
const upmsg = require('./control/upmsg');//上传文件
const app = express();

// 配置body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// 配置ejs
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('.html',ejs.__express);

// 配置本地存储
app.use(cookie('rainbowcake'));
app.use(session({
    secret:'rainbowcake',
    name:'rainbowcake',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxage:10*1000*60*6 //单位ms 默认20分钟
    },
}));

// 静态资源
app.use(express.static(path.join(__dirname,'public')));

// 路由
app.use('/upmsg',upmsg)
routers(app);

// 端口
app.listen(8888,() => {
    console.log('Server is running...');
})


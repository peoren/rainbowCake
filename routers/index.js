module.exports = (app) => {
    //路由
    app.use(require('./homeRouter'))
    

    // 个人中心
    app.use(require('./personal_head'));
    app.use(require('./personal_center'));
    //路由
    app.use(require('./detailsCheck'))

    //路由
    app.use(require('./loginCheck'))   

    //路由
    app.use(require('./shoppingcart'))    
    //路由
    app.use(require('./order')) 
    //路由
    app.use(require('./paysucRouter'))
    //路由
    app.use(require('./lineitemRouter'))  
    // //路由
    app.use(require('./objectRouter')) 
     
    //错误路由
    app.use((req,res,next) => {
        var err = new Error('404,not found');
        err.status=404;
        next(err);
    }); 
    app.use((err,req,res,next) => {
        res.status = err.status || 500;
        res.send('代码有问题');
    })

}
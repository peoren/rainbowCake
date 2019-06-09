const mySql = require('mysql');

module.exports = (sql,arr,callback) => {

    const myCon = mySql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'cake',
        multipleStatements:true,
    });

    myCon.connect();
   
    myCon.query(sql,arr,callback);

    myCon.end();
}
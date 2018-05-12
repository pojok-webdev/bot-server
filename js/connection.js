var mysql = require('promise-mysql');
doQuery = function(sql,callback){
    mysql.createConnection({
        host: 'localhost',
        user: 'teknis',
        password: 'teknis',
        database: 'teknis'
    }).then(function(conn){
        var result = conn.query(sql);
        conn.end();
        return result;
    }).then(function(rows){
        callback(rows);
    });    
}
module.exports = {
    query: doQuery
};
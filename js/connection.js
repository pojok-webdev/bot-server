var mysql = require('promise-mysql'),
config = require('./config');
doQuery = function(sql,callback){
    mysql.createConnection({
        host: 'localhost',
        user: config.user,
        password: config.password,
        database: config.database
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
mysql = require('mysql');
config = {
    mysql_pool : mysql.createPool({
        host:'localhost',
        user:'teknis',
        password:'teknis',
        database:'teknis'
    })
};
module.export = config;
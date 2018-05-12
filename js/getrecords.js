con = require('./connection.js');
sql = "select username from users where group_id=2";
var result;
module.exports = {
    get:function(){}
}
con.queryAsync(sql)
.then(function(res){
    out = JSON.stringify(res);
    console.log("Hasik",res[0]);
    //console.log("rec",res[0][0].username);
//    module.exports = res[0][0].username;
    return res[0];
})
.error(function(err){
    console.log('Error xxxx',err);
});
    
//module.exports = result;

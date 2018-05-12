con = require('./connection.js');
sql = "select username from users where group_id=2";
module.exports = {
    getResult : function(_sql,callback){
        con.query(_sql,function(err,res,fields){
            if(err){
                console.log("Error Query");
                throw(err);
                callback(err,null);
            }
            //console.log("Result",JSON.stringify(res));
            return callback(null,res);
        });
    }

}
/*getResult(sql,function(err,_out){
    //console.log(_out);
    console.log('0',_out[0].username);
    console.log('1',_out[1].username);
    if(err){
        console.log('Error',err);
    }else{
        console.log('Expot',_out);
        //return _out;
        module.exports = '_out';
    }
})*/
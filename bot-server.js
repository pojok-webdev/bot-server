var express = require('express'),
app = express(),
config = require('./js/config'),
path = require("path"),
https = require("https"),
url=require('url'),
moment=require("moment"),
Promise=require("bluebird"),
con = require('./js/connection'),
queries = require('./js/queries'),
bodyParser = require('body-parser');
app.engine('html', require('ejs').renderFile);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/views'));
app.locals.moment = moment;
app.locals.dtformat = "dd M YY";
/*app.use(bodyParser.json);*/
app.use(bodyParser.urlencoded({
	extended:true
}));
ug = require('./js/updateGetter.js');
var bot = config.bot,
url1 = 'https://api.telegram.org/'+bot+'/getUpdates';
app.get('/save',function(req,res){
  ug.myres(url1,function(body){
    amount = body.result.length;
    telegram_id = body.result[amount-1].update_id;
    chat_id = body.result[amount-1].message.chat.id;
    texts = body.result[amount-1].message.text.split('*');
    if(texts[0].trim()==='/visit')
    con.query(queries.checkexists(telegram_id),function(result){
      var sender = texts[1].trim(),
      clientname = texts[2].trim(),
      address = texts[3].trim();
      if(parseInt(result[0].cnt) > 0){
        console.log(telegram_id,"Sudah ada");
      }else{
        con.query(queries.save(sender,clientname,address,telegram_id),function(result){
          console.log("Sukses menyimpan",result.insertId);
          messageText = 'Nomor Visit anda '+result.insertId;
          msg = ug.sendmessage(bot,messageText,chat_id);
          ug.myhttps(msg,function(body){
            //res.send(body);
          })
        });    
      }
    });
  });
})
app.listen(process.env.PORT || 2018);

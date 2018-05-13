var express = require('express'),
app = express(),
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
var url0 = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
url1 = 'https://api.telegram.org/bot311276793:AAGpixXvuG9XdAWqUHE-inawZgdki3VsxjI/getUpdates',
url2 = 'https://api.telegram.org/bot201184174:AAH2Fy_3wS8A5KGi2cn468dtFCMJjhOqISQ/getUpdates';
url4 = 'https://api.telegram.org/bot311276793:AAGpixXvuG9XdAWqUHE-inawZgdki3VsxjI/sendmessage?text=I am bot&chat_id=219513951';
app.get('/x',function(req,res){
  ug.myres(url1,function(body){
    amount = body.result.length;
    console.log("Amount",amount);
    console.log("{UPDATE_ID}",body.result[amount-1]);
    console.log("UPDATE_ID",body.result[amount-1].update_id);
    console.log("MESSAGE",body.result[amount-1].message.chat);
    console.log("TEXT",body.result[amount-1].message.text);
    texts = body.result[amount-1].message.text.split('*');
    texts.forEach(function(x){
      console.log('->',x);
    })

    res.send(body.result[amount-1].message);
  });
})
app.get('/y',function(req,res){
  ug.myhttps(url2,function(body){
    console.log('HTTPS BODY',body);
    res.send(body);
  })
})
app.get('/sendmessage',function(req,res){
  ug.myhttps(url4,function(body){
    console.log('reply',body);
    res.send(body);
  })
})
app.get('/save',function(req,res){
  ug.myres(url1,function(body){
    amount = body.result.length;
    console.log("Amount",amount);
    telegram_id = body.result[amount-1].update_id;
    console.log("UPDATE_ID",telegram_id);
    console.log("MESSAGE",body.result[amount-1].message.chat);
    console.log("TEXT",body.result[amount-1].message.text);
    chat_id = body.result[amount-1].message.chat.id;
    texts = body.result[amount-1].message.text.split('*');
    con.query(queries.checkexists(telegram_id),function(result){
      console.log("HASIL CEK",result[0].cnt);
      if(parseInt(result[0].cnt) > 0){
        console.log(telegram_id,"Sudah ada");
      }else{
        con.query(queries.save(texts[1],texts[2],texts[3],telegram_id),function(result){
          console.log("Sukses menyimpan",result);
          bot = 'bot311276793:AAGpixXvuG9XdAWqUHE-inawZgdki3VsxjI';
          messageText = 'Nomor Visit anda '+result.insertId;
          msg = ug.sendmessage(bot,messageText,chat_id);
          ug.myhttps(msg,function(body){
            console.log('reply',body);
            console.log("MSG",msg);
            res.send(body);
          })
        });    
      }
    });
  });
})
app.get('/test',function(req,resu){
	resu.header("Access-Control-Allow-Origin", "*");
	console.log("Test");
});
app.listen(process.env.PORT || 2018);

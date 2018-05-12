var Promise=require("bluebird"),
request = require('request'),
https = require('https'),
myRes = function(url,callback){
    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        callback(body);
    });
}
myHttps = function(url,callback){
    https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
        callback(JSON.parse(data));
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

}
//url4 = 'https://api.telegram.org/bot311276793:AAGpixXvuG9XdAWqUHE-inawZgdki3VsxjI/sendmessage?text=I am bot&chat_id=219513951';
sendMessage = function(bot,messageText,chat_id){
    return 'https://api.telegram.org/'+bot+'/sendmessage?text='+messageText+'&chat_id='+chat_id;
}
module.exports = {
    myres: myRes,
    myhttps: myHttps,
    sendmessage : sendMessage
};
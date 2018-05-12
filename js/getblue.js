var mysql = require('mysql'),
que = require("./mybluebird.js");
var getUserById = function(id) {
    var params = [id];
    var query = "SELECT * FROM users WHERE id = ? LIMIT 1;";
    return que.query(mysql.format(query, params)).then(function (r) {
      return r;
   });
  }
  console.log("Hasil",getUserById(17));
var express = require("express");
var app = express();

app.use(express.static('public'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qweqwe',
    database : 'decontaminator'
  });

  var query = connection.query('SELECT * from Marker', function(err, result) {
    console.log(err);
    console.log(result);
  });
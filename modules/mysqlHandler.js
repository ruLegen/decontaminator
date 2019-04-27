const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dd',
    password : 'qweqwe',
    database : 'decontaminator'
  });

  var getMarkers = function(callbackSuccess,callbackError){
    connection.query('SELECT * from Marker', function(err, result) {
        if(err)
        callbackError()
        else
        callbackSuccess(result)
      });
  }


  module.exports.getAllMarckers = getMarkers
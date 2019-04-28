const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dd',
    password : 'qweqwe',
    database : 'decontaminator'
  });

  var getMarkers = function(callbackSuccess,callbackError){
    connection.query('SELECT id,lang,lat,rate from Marker', function(err, result) {
        if(err)
        callbackError()
        else
        callbackSuccess(result)
      });
  }
  var getMarkerInfo = function(id,callbackSuccess,callbackError)
  {
    connection.query('SELECT * from Marker Where id='+id, function(err, result) {
        if(err)
        callbackError()
        else
        callbackSuccess(result)
      });
  }

  var insertPlace = function(params,callbackSuccess,callbackError)
  { 
    var queryString = `INSERT INTO marker (lang,lat,time,caption,description,imgPath) VALUES (${params.lang},${params.lat},${params.time},'${params.caption}','${params.description}','${params.imgPath}')`
   console.log(queryString)
   
    connection.query(queryString,function(err,result) {
      if(err)
        callbackError()
      else
        callbackSuccess(result)
    })
  }

  var vote = function(id,callbackSuccess,callbackError)
  { 
    var queryString = ` UPDATE marker SET rate = rate + 1 WHERE id = ${id}`
   
    connection.query(queryString,function(err,result) {
      if(err)
        callbackError()
      else
        callbackSuccess(result)
    })
  }
  var checkFingerprint = function(params,callbackSuccess,callbackError)
  { 
    var queryString = `SELECT id from vote WHERE fingerprint= '${params.fingerprint}' and marker_id=${params.id}`
   
    connection.query(queryString,function(err,result) {
      if(err)
        callbackError()
      else
        callbackSuccess(result)
    })
  }

  var insertVote = function(params,callbackSuccess,callbackError)
  { 
    var queryString = `INSERT INTO vote (fingerprint,marker_id) VALUES ('${params.fingerprint}',${params.id})`
   
    connection.query(queryString,function(err,result) {
      if(err)
        callbackError()
      else
        callbackSuccess(result)
    })
  }
  module.exports.getAllMarckers = getMarkers
  module.exports.getMarkerByID = getMarkerInfo
  module.exports.insertPlace = insertPlace
  module.exports.vote = vote
  module.exports.checkFingerprint = checkFingerprint
  module.exports.insertVote = insertVote
var express = require("express")
var https = require("https")
var fs = require("fs")
var app = express();
var dbHandler = require('./modules/mysqlHandler.js')
var reportCreator = require('./modules/reportGenerator.js')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })




app.use(express.static('public'));
app.use('/img', express.static('uploads'));
app.use('/reports', express.static('reports'));

var port = process.env.PORT || 5000;

app.get('/getMarkers', function(req, res) {
    dbHandler.getAllMarckers(function(items){
      // console.log(items)
    res.send(items);
    })
  });

  app.post('/submitPlace', upload.single('imageFile'), function (req, res, next) {
    // req.file - файл `imageFile`
    // req.body сохранит текстовые поля, если они будут
    var params = {
      lang:req.body.lng,
      lat:req.body.lat,
      time:new Date().getTime()/1000, //gives in millis
      caption:req.body.caption,
      description:req.body.description,
      imgPath: req.file.filename
    }
    dbHandler.insertPlace(params,function(){
      res.send({status: "200"})
    },function(error){
      console.log()
      res.send({status: "500"})
    })
    console.log(params)

    //check if postion already exist


  })

  app.post('/getMarkerInfo', upload.none(), function (req, res, next) {
    // req.file - файл `imageFile`
    // req.body сохранит текстовые поля, если они будут
    console.log(req.body.id)
    dbHandler.getMarkerByID(req.body.id, function(data){
        res.send(data)
    },function(err){
        res.send({status: "404"})
    })
   
  })


  app.post('/vote', upload.none(), function (req, res, next) {
    // req.file - файл `imageFile`
    // req.body сохранит текстовые поля, если они будут
    var params = {fingerprint:req.body.fingerprint,id:req.body.id}
    dbHandler.checkFingerprint(params,function(data){
      //If there is no entries in table then vote for him
      console.log(data)
      if(data.length == 0)
      {
        console.log("ENTERED")
        dbHandler.vote(params.id,function(){
          dbHandler.insertVote(params,function(){})
          dbHandler.getMarkerByID(params.id,function(data){
            res.send({status:200,rate:data[0].rate})
          })
        })
      }
      else{
  
        res.send({status:500})
      }

    },function(){
      console.log("ERROR")
    })
  })
//make redirect from HTTP to HTTPS

app.post('/createReport', upload.none(), function (req, res, next) {
  // req.file - файл `imageFile`
  // req.body сохранит текстовые поля, если они будут
  var id = req.body.id
  dbHandler.getMarkerByID(id,function(data){
    var marker = data[0]
    var coords = `${marker.lat} С.Ш и ${marker.lang} В.Д в системе координат GPS`    
    reportCreator.createReport(`report_${marker.id}`,coords,marker.imgPath,function(){
      console.log("CREATED")
      res.send({url:`/reports/report_${marker.id}.docx`})
    })
  })
})


https.createServer({
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.cert'),
  
}, app)
.listen(port);





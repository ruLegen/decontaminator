var express = require("express")
var https = require("https")
var fs = require("fs")
var app = express();
var dbHandler = require('./modules/mysqlHandler.js')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })




app.use(express.static('public'));
var port = process.env.PORT || 5000;

app.get('/getMarkers', function(req, res) {
    dbHandler.getAllMarckers(function(items){
     //   console.log(items)
    res.send(items);
    })
  });

  app.post('/submitPlace', upload.single('imageFile'), function (req, res, next) {
    // req.file - файл `imageFile`
    // req.body сохранит текстовые поля, если они будут
    console.log(req.file,req.body)
    res.send({status: "200"})
  })

//make redirect from HTTP to HTTPS

https.createServer({
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.cert'),
  
}, app)
.listen(port);





const createReport =require('docx-templates')
var months = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября", "Ноября","Декабря"]
function Report(outputName,coords,imgPath,func)
{
  var currentDate = new Date();

var date = currentDate.getDate();
var month = currentDate.getMonth(); 
var year = currentDate.getFullYear();

var dateString = date + "    " +months[month] + "    " + year+"г.";

  createReport({
    template: 'templates/dump.docx',
    output: `reports/${outputName}.docx`,
    data:{
      project:{
        coords:coords,
        date:dateString,
        img:{
          width:16,
          height:9,
          path: `./uploads/${imgPath}` 
        }
      }
    }
  }).then(function(){func()},function(){})

}

module.exports.createReport = Report
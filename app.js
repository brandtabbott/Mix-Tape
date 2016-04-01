var color = require('tinycolor'),
    cookieParser = require('cookie-parser'), 
    ejs = require('ejs'),
    express = require('express'),    
    fs = require('fs')
    http = require('http'),
    path = require('path');
    
//Don't stop this server if an exception goes uncaught
process.on('uncaughtException', function (err) {
  console.error((err.stack+'').red.bold);
  console.error('Node trying not to exit...'.red.bold);
});     

var app = express();
app.set('port', 3000);
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

var contentDirectory = '/public/mixtape/';
var files = [];
fs.readdir(__dirname+contentDirectory, function(err,list){
  if(err) throw err;
  for(var i=0; i<list.length; i++){    
    files.push('"'+contentDirectory.replace('/public', '')+list[i]+'"');  
  }
});

app.get('/', function(req, res){
  res.locals.tracks=files;
  res.render('index');
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Listening on port',app.get('port'));
});
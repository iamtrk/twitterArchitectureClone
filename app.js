
/**
 * Module dependencies.
 */

var express = new require('express')
  , routes = require('./routes')
  , logon = require('./routes/logon')
  , user = require('./routes/user')
  , foodRoutes = require('./routes/foodRoutes')
  , http = require('http')
  , path = require('path')
  , fs   = require('fs');

var app = express();
var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger({stream: logFile}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/user',foodRoutes.userById)
app.post('/post',foodRoutes.post)
app.post('/signup',foodRoutes.userSignup)
app.post('/login',foodRoutes.userLogin)
app.post('/comment',foodRoutes.comment)
app.post('/mycomments',foodRoutes.commentsByAnUser)
app.post('/likecomment',foodRoutes.likeComment)
app.post('/unlikecomment',foodRoutes.unlikeComment)
app.post('/follow',foodRoutes.follow)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

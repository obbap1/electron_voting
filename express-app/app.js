var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flash = require('connect-flash');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout,process.stderr);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressValidator({
  errorFormatter: function(param,msg,value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
  while(namespace.length){
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param: formParam,
    msg:msg,
    value:value
  };
  }
}))

app.use(express.static(path.join(__dirname, 'public')));

let sess = {
  secret:'secret',
  saveUninitialized: true,
  reasave:true,
  cookie:{
    path:"/",
    maxAge:180000
  },
}

if(app.get('env')==='production'){
  app.set('trust proxy',1)
  sess.cookie.secure = true
}

app.use(session(sess));

app.use(flash());

app.use((req,res,next)=>{
  res.locals.messages = require('express-messages')(req,res);
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',require('./routes/apiRoutes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

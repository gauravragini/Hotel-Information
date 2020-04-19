var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('./config');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var hotelRouter = require('./routes/hotelRouter')
var roomRouter = require('./routes/roomRouter')
var guestRouter = require('./routes/guestRouter')
var billRouter = require('./routes/billRouter')

//Connecting to mongoDB server
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//using Routers
app.use('/', indexRouter);
app.use('/hotel',hotelRouter);
app.use('/rooms',roomRouter);
app.use('/guests',guestRouter);
app.use('/bills',billRouter);



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

/*
This application is designed to store detils of a specific hotel (more than one hotels can be created here but
guests,rooms and bills have been modeled consering that this application is for a specific hotel 
i.e., no refernce to hotel has been done in guests,bills or rooms Schema )

It  can be used to perform CRUD oprations guests, rooms, and bills for a specific hotel. 
 
 */ 

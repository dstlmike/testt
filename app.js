const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const config = require('./config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const cors = require('cors');
const fs = require('fs'); // PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:' + process.env.PORT + '/client/public' || http://localhost:' + process.env.PORT + '/server/public';
const imageRouter = require('./routes/image');
const pug = require('pug');
const app = express();
const PUBLIC_URL = process.env.NODE_PUBLIC_URL; //path.join(__dirname, 'public');

// view engine setup
app.set('views', path.join(__dirname, 'views')); //, 'server/views', 'client/views');
//path.join(__dirname, 'server/views'),
//path.join(__dirname, 'client/views'),
//]);
//app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'pug');

app.use(cors({
    origin: '*',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); //, '/client/public', '/server/public')); // __dirname + 'client/public'})));
//app.use('/server/public', express.static('public'); //path.join(__dirname, '/client/public')));


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = config.mongoURI;
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to the database
connect.then(() => {
  console.log('Connected to database: GridApp');
}, (err) => console.log(err));

/*
    GridFs Configuration
*/

// create storage engine
const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.use('/', imageRouter(upload));

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

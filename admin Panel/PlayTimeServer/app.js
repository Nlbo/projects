const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./configs/config');
//logger - start
var rfs = require('rotating-file-stream');
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var logDirectory = path.join(__dirname, 'log');
var uploadDirectory = path.join(__dirname, 'uploads');
//logger - end




// logger - start
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory);

var accessLogStream = rfs('access.log', {
    interval: config.loggerDays +  'd', // rotate daily
    path: logDirectory
});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('dev'));
// logger - end


// MongoDB connect - start

mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useCreateIndex: true})
    .then(_=> {console.log('MongoDB has Connected ...')})
    .catch(e => {console.log(e, 'MongoDB Connecting Error ...')});

// MongoDB connect - end



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors());
app.use(require('cors')());

require('./middleware/passport');
path.join(__dirname, 'uploads');
app.use(express.static('./uploads'));
app.use(passport.initialize());

// API routes - start
const auth = require('./routes/auth'),
    application = require('./routes/application'),
    web = require('./routes/web');

app.use('/api/auth', auth);
app.use('/api/web', web);
app.use('/api/images', application);

// API routes - end










module.exports = app;
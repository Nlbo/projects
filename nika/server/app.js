const config = require('./admin/config/configs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const User = require('./admin/models/user');

mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useCreateIndex: true})
    .then(_ => {
        console.log('MongoDB has connected ...')
    })
    .catch(err => {
        console.log('Error MongoDB not connected ...')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(require('cors')());

app.use(morgan('dev'));


app.use('/uploads', express.static('admin/_uploads'));

const admin = require('./admin/routes/admin');
const api = require('./api/routes/api');

app.use('/admin', admin);
app.use('/api', api);

// app.use('/admin-panel', express.static(__dirname + '/../admin/dist/Project'));

//----------- Connect to Angular client

app.use(express.static(__dirname + '/../client/dist/front'));
app.use(express.static(__dirname + '/../admin/dist/Project'));

app.get('/admin-panel', function (req, res) {
    res.sendFile(path.join(__dirname + '/../admin/dist/Project/index.html'));
});
app.get('/admin-panel/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../admin/dist/Project/index.html'));
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../client/dist/front/index.html'));
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../client/dist/front/index.html'));
});
//--------------------------------------


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
});


module.exports = app;



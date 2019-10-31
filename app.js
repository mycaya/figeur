//Framework to display a web page
var express = require("express");
const path = require('path');
var app = express();
const router = express.Router();
require('dotenv').config()

var mongo = require('mongodb').MongoClient;

app.set('view engine', 'hbs');

//Redirect all traffic to login untill ADFS federation
app.get('/', (req, res) => {
        res.redirect('/memes');
});

app.use(express.static('public'));

//Pages

const memes = require('./pages/memes/memes');
app.use('/', memes);

const test = require('./pages/test/test');
app.use('/', test);

const s3 = require('./pages/s3/s3');
app.use('/', s3);

const seo = require('./pages/seo/seo');
app.use('/', seo);

//APIs

const fileupload = require('./apis/fileupload');
app.use('/', fileupload);

const memeshot = require('./apis/memeshot');
app.use('/memeshot', memeshot);

//const post = require('./apis/post');
//app.use('/', post);

//const catchr = require('./apis/catchr');
//app.use('/', catchr);


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.post('/catchr', function (req, res, next) {
    console.log('Hit catchr: '+(req.body));
    //res.send('Hit catchr: '+(JSON.stringify(req.body)));
    res.send('Hit catchr: '+ JSON.stringify(req.body));
})

//var router = require('express').Router();
app.get('/memeshot', function (req, res, next) {
    console.log('memeshot: '+(req.body));
    //res.send('Hit memeshot: '+ req.body);
   //res.send('Hit catchr: '+(JSON.stringify(req.body)));
    const url = 'mongodb://localhost:27017'
    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err)
            }
        const db = client.db('figeur')
        const collection = db.collection('memes')
        collection.find().sort({created_on:-1}).limit(2).toArray((err, items) => {
    res.send(JSON.stringify(items));
  });
});
})

//Define port for app to listen on
var port = 80;
//This keeps the app listening for traffic on the port defined above (var port =*)
app.listen(port, () => {
    console.log("Server listening on port " + port);
});

module.exports = router;
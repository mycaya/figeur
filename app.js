//Framework to display a web page
var express = require("express");
const path = require('path');
var app = express();
const router = express.Router();
require('dotenv').config()

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

//APIs

const fileupload = require('./apis/fileupload');
app.use('/', fileupload);

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

//Define port for app to listen on
var port = 3000;
//This keeps the app listening for traffic on the port defined above (var port =*)
app.listen(port, () => {
    console.log("Server listening on port " + port);
});

module.exports = router;
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + 'dist'));
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || '4200';
app.set('port', port);
const server = http.createServer(app);
app.listen(port);

const api = require('./api.js');
app.use('/db', api);

app.get('*', function(req, res){
    res.sendFile(__dirname+'/dist/index.html');
});
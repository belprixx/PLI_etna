const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/routes');

var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.use(express.static(path.join('node_modules')));
app.use("/", express.static(path.join('./front')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(3000);
console.log('server is running');

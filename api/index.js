const path = require('path');
var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./routes/routes.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'pli',
        // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.set('view engine', 'jade');
      app.use(express.static(path.join('node_modules')));
      app.use("/", express.static(path.join('./front')));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

REST.prototype.connectGoogleDrive = function (err){
  var OAuth2 = google.auth.OAuth2;

  var oauth2Client = new OAuth2("532417609984-6grimhtlrblhkrjgkvmi1okem6pkfhs2.apps.googleusercontent.com", "JrSHP3fMBl-9CuZkGZmrgB2f", "http://localhost:3000/api/googleCallBack");

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
    'https://www.googleapis.com/auth/gmail.modify'
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
  });

  app.get("/url", function(req, res) {
    res.send(url);
  });
}

new REST();

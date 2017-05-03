var onedrive = require('node-onedrive-unofficial');
var clientId =  '9d572266-9b74-471f-bb0a-54cb1638d4b1';
var scopes =  'onedrive.readwrite wl.signin wl.offline_access';
var redirectUri = 'http://localhost:3000/api/onedrive/oauth2callback';

var url = "https://login.live.com/oauth20_authorize.srf?client_id=" + clientId +
           "&scope="+ encodeURIComponent(scopes) +"&response_type=code&redirect_uri="+encodeURIComponent(redirectUri);


var url_token = "https://login.live.com/oauth20_authorize.srf?client_id="+ clientId +"&scope="+ encodeURIComponent(scopes) +
    "&response_type=token&redirect_uri="+encodeURIComponent(redirectUri);

var mysql = require('mysql');
const opn = require('opn');
var Client_secret =  "ZTiFvpYNdBTqvwQoRhUSpHx";
var resource_id = "http://localhost:3000";


function REST_ONEDRIVE(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ONEDRIVE.prototype.handleRoutes= function(router,connection, md5) {
  
  router.post("/onedrive/test", function(req, res) {
    res.json({
      "Error": 200,
     });
  });

  router.post("/onedrive/url", function(req, res) {  
    userId = req.body.userId;
    idCloud = req.body.idCloud;

    var query = "INSERT INTO `token`(??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?)";
    var table = ["id", "id_user", "id_cloud", "access_token", "token_type", "expiry_date", "code", null, userId, idCloud, null, null, null, null];
    query = mysql.format(query,table);
    console.log(query);
    connection.query(query,function(err, rows){
      if(err) {
        console.log("Error: 400 : Error executing MySQL query");
      }
    });
    console.log(url);
    opn(url);
  });

  router.get("/onedrive/oauth2callback", function(req, res){
    var code = req.query.code;
    console.log(code);  


    //apl de url_token


     //INSERT TOKEN INTO DATABASE
      var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
      var table = ["token", "code", code, "id_user", global.userId, "id_cloud", 3];

      query = mysql.format(query,table);
      connection.query(query,function(err, rows){
        if(err) {
          res.json({
          "status" : 400
          });
        }else{
          res.json({
            "status" : 200,
          });
        }
      });
      res.redirect(url_token); //renvoie le token dans l'url
  });

}

module.exports = REST_ONEDRIVE;

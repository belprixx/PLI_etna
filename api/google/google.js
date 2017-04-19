var google = require("googleapis");
const opn = require('opn');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2('789981830396-ht9j545usj60vsqgpdccran0l6ghvmgv.apps.googleusercontent.com', 'Uge7KgC1gS0OTo1OsM1PyJYR', 'http://localhost:3000/api/google/oauth2callback');
var scopes = [
  'https://www.googleapis.com/auth/drive'
];
var mysql = require('mysql');
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});
var accessToken = "cc";

function REST_GOOGLE(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_GOOGLE.prototype.handleRoutes= function(router,connection,md5) {

// ROUTE TEST
     router.post ("/google/test", function(req, res){
         console.log("Google");
         res.json({
        	"Error": 200,
         });
     });
    // END ROUTE TEST

    router.post("/google/url", function(req, res) {
      console.log(req.body);
        userId = req.body.userId;
        idCloud = req.body.idCloud;

        var query = "INSERT INTO `token`(??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?)";
        var table = ["id", "id_user", "id_cloud", "access_token", "token_type", "expiry_date", "code", null, userId, idCloud, null, null, null, null];
        query = mysql.format(query,table);
        connection.query(query,function(err, rows){
            if(err) {
              console.log("Error: 400 : Error executing MySQL query");
            }
        });      
        opn(url);
	   });

    // ROUTE google oauthRedirect
    router.get("/google/oauth2callback", function(req, res){

	    var code = req.query.code;

	     oauth2Client.getToken(code, function(err, tokens) {
	      if (err) {
	        res.send(err);
	        return;
	      }
	      
        oauth2Client.setCredentials(tokens);
                
         //INSERT TOKEN INTO DATABASE
          accessToken = tokens.access_token
          var query = "UPDATE ?? SET ?? = ?, ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
          var table = ["token", "access_token", tokens.access_token,"token_type", 
                        tokens.token_type,"expiry_date", tokens.expiry_date,"code", code, "id_user", global.userId];
          
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
        //   res.send(tokens);  
      });
     });

  //RETURN FILES
  router.post ("/google/list", function(req, res){
    var query = "select ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "refresh_token",  "token", "id_user", req.body.userId];
    
    query = mysql.format(query,table);
    connection.query(query,function(err, rows){
      if(err) {
       res.json({
          "status" : 400
        });
      }else{
        oauth2Client.getToken(rows[0].code, function(err, tokens) {
          if (!err) {
            oauth2Client.setCredentials({
              access_tokens: rows[0].access_token,
              refresh_tokens: rows[0].refresh_token,
              expiry_date: true
            });
          }
            var files = listFiles(oauth2Client);
            console.log("Files : " + files);
            // res.json({
            //   "status" : 200,
            //   "data": files,
            // });
        });
      }      
    }); 
  });
     
}

function listFiles(auth) {
  console.log("inside listFiles");
  var service = google.drive('v3');
  service.files.list({auth: auth,pageSize: 10,fields: "nextPageToken, files(id, name)" }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) 
    {
      console.log('No files found.');
    } 
    else
    {
      console.log(files);
      return files;
    }
  });
}

module.exports = REST_GOOGLE;

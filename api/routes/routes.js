var mysql = require('mysql');

var google = require("googleapis");
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2('789981830396-ht9j545usj60vsqgpdccran0l6ghvmgv.apps.googleusercontent.com', 'Uge7KgC1gS0OTo1OsM1PyJYR', 'http://localhost:3000/api');

var scopes = [
  'https://www.googleapis.com/auth/drive'
];
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});



function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    
    // API RESGISTER
    router.post("/register",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
      var table = ["user","name","mail","roles","password",req.body.name,req.body.mail,req.body.roles,md5(req.body.password)];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : 200, "User" : {
                  "lastname": req.body.name,
                  "email": req.body.mail,
                  "password": req.body.password,
                  "role": req.body.roles
              }});
          }
      });
  });
  // END API REGISTER

  // API LOGIN
  router.post ("/login", function(req, res){
	var query = "SELECT ?? FROM ?? where ??= ? and ??=? ";
    var table = ["id", "user" ,"mail", req.body.mail, "password", md5(req.body.password)];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
		} else{
			res.json({
				"Error": 200,
				"User": rows
			});
		}
	 });
  });
  // END API LOGIN

// ROUTE TEST 
 router.post ("/test", function(req, res){
  // //test GOOGLE

  
  res.send(url);

  //test GOOGLE

 });
// END ROUTE TEST 
}

module.exports = REST_ROUTER;

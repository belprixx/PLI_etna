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
	    res.send(url);
	    res.status(200);
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
	      res.send(tokens);
	    });
     });
}

module.exports = REST_GOOGLE;

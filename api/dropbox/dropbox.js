const dropbox = require('dropbox-v2-api');
//set credentials
const oauth = dropbox.authenticate({
	client_id: '7vigo6r0jdtgdiu',
	client_secret: 'd7hza74wkx2hbjz',
	redirect_uri: 'http://localhost:3000/api/dropbox/oauthRedirect'
});


function REST_DROPBOX(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
REST_DROPBOX.prototype.handleRoutes= function(router,connection,md5) {
    // ROUTE TEST
     router.post ("/dropbox/test", function(req, res){
         console.log("cc");
         res.json({
        	"Error": 200,
         });
     });
    // END ROUTE TEST

    // ROUTE DropBox login
     router.get("/dropbox/login", function(req, res){
         console.log("cc1");
         const authUrl = oauth.generateAuthUrl();
         res.json({
        	"Error": 200,
            "Url": authUrl,
         });
     });
    // END DropBox login

    // ROUTE DropBox oauthRedirect
     router.get("/dropbox/oauthRedirect", function(req, res){
         var params = req.query;
         console.log(params);
        oauth.getToken(params.code, function(err, response){
            console.log(response);
        	console.log('user\'s access_token: ',response.access_token);
        	// call api
        	dropbox({
				resource: 'users/get_current_account'
			}, function(err, response){
				res.json({response: response});
			});
        });
     });
    // END DropBox oauthRedirect
}

module.exports = REST_DROPBOX;

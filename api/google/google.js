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

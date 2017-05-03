var google = require("googleapis");
const opn = require('opn');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2('789981830396-ht9j545usj60vsqgpdccran0l6ghvmgv.apps.googleusercontent.com', 'Uge7KgC1gS0OTo1OsM1PyJYR', 'http://localhost:3000/api/google/oauth2callback');
var scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.metadata'
];
var mysql = require('mysql');
var fs = require('fs');
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'offline' POUR FAIRE UN gets refresh_token
  scope: scopes
});

//SERVICE UTILISE POUR UTILISER L'API
var drive = google.drive({
  version: 'v3', //VERSION DE L'API
  auth: oauth2Client
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
      var query = "UPDATE ?? SET ?? = ?, ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
      var table = ["token", "access_token", tokens.access_token,"token_type",tokens.token_type,"expiry_date", tokens.expiry_date,"code", code, "id_user", global.userId];

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
    });
   });

  // LIST
  router.post ("/google/list", function(req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){

      if(err) {
	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } else{
	oauth2Client.setCredentials({
	  access_token: rows[0].access_token,
	  expiry_date: rows[0].expiry_date,
	  token_type: rows[0].token_type
	});

	drive.files.list({
	  auth: oauth2Client,
	  pageSize: 10,
	  fields: "nextPageToken, files(id, name, mimeType)"  //ajout du mimetype
	}, function(err, response) {
	  if (err) {
	    console.log('The API returned an error: ' + err);
	    return;
	  }
	  files = response.files;
	  if (files.length == 0) {
	    console.log('No files found.');
	  } else {

	res.json({
	    "status" : 200,
	    "data" : files,
	  });
	  }
	});
      }
    });
  });

  // DOWNLOAD
  router.post ("/google/download", function(req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){

      if(err) {
	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } else{
	oauth2Client.setCredentials({
	  access_token: rows[0].access_token,
	  expiry_date: rows[0].expiry_date,
	  token_type: rows[0].token_type
	});
	var download = false;
	download = downloadFiles(oauth2Client,"application/pdf", '0B_tt8ZmaBB4BcTNrNlhNdmRURjQ');
	if (download = false){
	  res.json({
	    "status" : 400
	  });
	}else{
	  res.json({
	    "status" : 200,
	    "tabListeFiles" : download,
	  });
	}
      }
    });
  });

  //UPLOAD
  router.post ("/google/upload", function(req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){

      if(err) {
	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } else{
	oauth2Client.setCredentials({
	  access_token: rows[0].access_token,
	  expiry_date: rows[0].expiry_date,
	  token_type: rows[0].token_type
	});
	var upload = false;
	upload = uploadFiles(oauth2Client, "text/html", "nomMediaTest", "/home/sfatier/index.html");
	if (upload = false){
	  res.json({
	    "status" : 400
	  });
	}else{
	  res.json({
	    "status" : 200
	  });
	}
      }
    });
  });


  //ABOUT USER
  router.post ("/google/about", function(req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){

      if(err) {
	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } else{
	oauth2Client.setCredentials({
	  access_token: rows[0].access_token,
	  expiry_date: rows[0].expiry_date,
	  token_type: rows[0].token_type
	});
	var about = getInfosUser(oauth2Client);
	if (about){
	  res.json({
	    "status" : 400
	  });
	}else{
	  res.json({
	    "status" : 200,
	    "data" : about
	  });
	}
      }
    });
  });

  //DELETE FILE
  router.post("google/delete", function (req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){

      if(err) {
	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } else{
	oauth2Client.setCredentials({
	  access_token: rows[0].access_token,
	  expiry_date: rows[0].expiry_date,
	  token_type: rows[0].token_type
	});
	var deleteFile = deleteFile(oauth2Client);
	if (deleteFile === true){
	  res.json({
	    "status" : 400
	  });
	}else{
	  res.json({
	    "status" : 200
	  });
	}
      }
    });
  });
}

  //ABOUT USER
  router.post ("/google/about", function(req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){
      if(err) {
      	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } 
      else{
      	oauth2Client.setCredentials({
      	  access_token: rows[0].access_token,
      	  expiry_date: rows[0].expiry_date,
      	  token_type: rows[0].token_type
      	});

        drive.about.get({ fields : "appInstalled,storageQuota,user"}, function(err, resp) {
          if (err){
            res.json({
              "status" : 400
            });
          }else{
            res.json({
              "status" : 200,
              "data" : resp
            });
          }
        });
      }
    });
  });





  //DELETE FILE
  router.post("google/delete", function (req, res){
    var query = "select ??, ??, ??, ?? from ?? where ?? = ?";
    var table = ["code", "access_token", "expiry_date", "token_type", "token", "id_user", req.body.userId];

    query = mysql.format(query,table);
    connection.query(query,function(err, rows){

      if(err) {
	res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
      } else{
	oauth2Client.setCredentials({
	  access_token: rows[0].access_token,
	  expiry_date: rows[0].expiry_date,
	  token_type: rows[0].token_type
	});
	var deleteFile = deleteFile(oauth2Client);
	if (deleteFile === true){
	  res.json({
	    "status" : 400
	  });
	}else{
	  res.json({
	    "status" : 200
	  });
	}
      }
    });
  });
}


/////////////////////////////////////FUNCTION////////////////////////////////////////////////


function downloadFiles(auth,typeMedia, fileId) {
 drive.files.get({fileId: fileId }, function (err, metadata) {
    if (err) {
      console.error("Error GET files :" +  err);
      return process.exit();
    }

    console.log('Downloading %s...', metadata.name);

    var dest = fs.createWriteStream(metadata.name);

    drive.files.export({fileId: fileId, mimeType: typeMedia}).on('error', function (err) {
      console.log('Error downloading file', err);
      process.exit();
    }).pipe(dest);

    dest.on('finish', function () {
	console.log('Downloaded %s!', metadata.name);
	return true
    }).on('error', function (err) {
      console.log('Error writing file', err);
      return false;
    });
  });
}

///
//Upload File
//nameMedia => nom
//typeMedia => png,jpg, pdf
//url => ordi...
///
function uploadFiles(auth,typeMedia, nameMedia, urlMedia){
  var fileMetadata = {
    'name': nameMedia
  };

  var media = {
    mimeType: typeMedia,
    body: fs.createReadStream(urlMedia)
  };

  drive.files.create({
     resource: fileMetadata,
     media: media,
     fields: 'id'
    }, function(err, file) {
    if(err) {
      console.log(err);
      return false;
    } else {
      console.log('Le fichier a été uploadé et possède l\'id : ', file.id);
      return true;
    }
  });
}


///
// Récupération de l'espace restante d'un compte Google
// Return : pourcentage de l'espace restante
// Exemple de json : {"user":{"kind":"drive#user","displayName":"Segolene FATIER","me":true,"permissionId":"07683764300488805781","emailAddress":"fatier_s@etna-alternance.net"},"storageQuota":{"usage":"1638130503","usageInDrive":"1508434825","usageInDriveTrash":"96876611"},"appInstalled":true}
////
function getInfosUser(auth){
  
}

function deleteFile(auth, idFile){
  drive.files.emptyTrash({fileId: idFile }, function(err, resp){
    if (err){
      console.log("Delete File :" + err);
      return false;
    }else{
      return true;
    }
  });
}

module.exports = REST_GOOGLE;

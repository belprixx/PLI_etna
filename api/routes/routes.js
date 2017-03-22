var mysql = require('mysql');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

    // API RESGISTER
    router.post("/register",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
      var table = ["user","Firstname","Lastname","mail","roles","password",req.body.fistName,req.body.lastName,req.body.mail,req.body.roles,md5(req.body.password)];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : 400, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : 200});
          }
      });
  });
  // END API REGISTER

  // API LOGIN
  router.post ("/login", function(req, res){
	var query = "SELECT * FROM ?? where ??= ? and ??=? ";
    var table = ["user" ,"mail", req.body.mail, "password", md5(req.body.password)];
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

}

module.exports = REST_ROUTER;

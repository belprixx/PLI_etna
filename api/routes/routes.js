var mysql = require('mysql');
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({ "Message" : "Hello World !" });
    });
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
}

module.exports = REST_ROUTER;

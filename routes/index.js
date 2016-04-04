var Massive=require("massive");
var db = Massive.connectSync({db : 'massive-test'});
var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
    res.render('index');
    console.log('page loaded');
});
   
    
db.users.find({email : "zchen088@uottawa.ca"}, function(err,res){
  console.log(res);
});


module.exports = router;
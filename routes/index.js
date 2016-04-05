var Massive = require("massive");
var db = Massive.connectSync({
    db: 'massive-test'
});
var express = require('express');
var router = express.Router();
var pg = require('pg');

//var connectionString = require(path.join(__dirname, '../', '../', 'config'));



router.get('/index', function (req, res, next) {
    res.render('index');
    console.log('page loaded');
    console.log('in the getter');


});

router.post('/home', function (req, res ,next){
    var email = req.body.email;
    var pass = req.body.password;
//    res.send("You suck");       
    console.log(email);
    console.log(pass);
    res.render('home');
    
//    try {
//        results = db.run("select email, password from user");
//        console.log("welcome");
//
//    } catch (err) {
//        console.log('err dected')
//        console.log(err);
//    }
    //    db.users.find(loginName, function (err, res) {
    //
    //            if (typeof (res.id) == number) {
    //                alert('you are in the database!');
    //            } else {
    //                alert('please enter again');
    //            }
    //
    //        });

});


db.users.find({
    email: "zchen088@uottawa.ca"
}, function (err, res) {
    console.log(res);
});




module.exports = router;
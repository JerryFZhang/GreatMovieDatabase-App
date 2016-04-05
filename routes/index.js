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

router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var userObject;

     db.users.find({
            email: email
    }, function (err, res) {
       userObject = res;
    });
    if(res.pass = password){    
    res.render('home');
    }
    else{
        res.send("pass failed");
    }
//    } else {
//     res.send("Your login were being declined." + emailValidation + passwordValidation );
//        
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
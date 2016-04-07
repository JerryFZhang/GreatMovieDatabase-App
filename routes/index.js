var Massive = require("massive");
var db = Massive.connectSync({
    db: 'massive-test'
});
var express = require('express');
var router = express.Router();



//Load index page when request sent.
router.get('/index', function (req, res, next) {
    res.render('index');
});

//Load login page when the request were sent.
router.post('/login', function (req, res, next) {

    // Find the user using email and pass
    db.users.find({
            email: req.body.email
            , pass: req.body.password
        }
        , function (err, result) {
            if (result[0] !== undefined) {

                res.render('login');

            } else {
                res.send('wrong pass');
            }
        });
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.post('/signup', function (req, res, next) {
    console.log(req.body);
    db.users.save(req.body, function (err, result) {
        console.log(result);
        console.log('user entered');
    });
});

db.run("select * from users", function(err, res){
console.log(res);
});

module.exports = router;
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
        if (result[0] !== []){
            
            res.render('login');
            
        }else 
            {
                //wrong pass
            }
        });
});

module.exports = router;
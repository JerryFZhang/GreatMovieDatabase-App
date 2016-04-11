var Massive = require("massive");
var db = Massive.connectSync({
    db: 'massive-test'
});
var express = require('express');
var router = express.Router();
var request = require('request');
var json2html = require('node-json2html');


router.get('/index', function (req, res, next) {
    res.render('index');
});

router.post('/login', function (req, res, next) {
    console.log(req.body);
    // Find the user using email and pass
    db.users.find({
            pass: req.body.password
            , email: req.body.email
        }
        , function (err, result) {
            console.log('result' + result);
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
    var userObject = req.body;
    var allUser;
    var lastUser;
    var thisuserIdNum;
    var lastuserId;
    var nextuserId;
    var insertionObject;

    db.run("select * from users", function (err, result) {
        allUser = result;
        console.log('All users');
        console.log(result);
        lastUser = allUser[allUser.length - 1];
        console.log('The last user');
        console.log(lastUser);

        lastuserId = lastUser.userid;

        console.log('lastuserId');
        console.log(lastuserId);

        thisuserIdNum = parseInt(lastuserId.substr(1, 4)) + 1;

        console.log('thisuserIdNum');
        console.log(thisuserIdNum);

        var my_string = '' + thisuserIdNum;

        while (my_string.length < 4) {
            my_string = '0' + my_string;
        }

        nextuserId = 'U' + my_string;
        console.log(nextuserId);

        insertionObject = {
            userid: nextuserId
            , pass: userObject.pw1
            , first_name: userObject.firstname
            , last_name: userObject.lastname
            , email: userObject.email
            , year_born: userObject.year
            , gender: userObject.gender
        };

        console.log(insertionObject);

        db.users.find('email =' + userObject.email, function (err, emailValidation) {
            console.log(emailValidation);
            if (typeof emailValidation === 'undefined') {
                db.users.insert(insertionObject, function (err, insertionResult) { //console.log(result);
                    console.log('user entered');
                    db.users.find({
                        email: userObject.email
                    }, function (err, insertionChecking) {
                        console.log(insertionChecking);
                        if (insertionChecking === []) {
                            res.send('internal error');
                        } else {
                            res.render('login');
                        }
                    });
                });
            } else {
                res.send('this email exist');
            }
        });
    });
});

router.get('/allmovie', function (req, res, next) {
    db.run("select * from movie inner join country on movie.countryid = country.countryid;", function (err, result) {
        var transform = {
            'tag': 'tr'
            , 'html': '<td>${mname}</td><td>${date_relased}</td><td>${cdescription}</td>'
        };
        var data = result;
        var table = "<tr><th>Movie Name</th><th>Release Date</th><th>Country</th></tr>"+json2html.transform(data, transform);

        res.send(table);
    });
});

router.get('/allactor', function (req, res, next) {
    db.run("select * from actor;", function (err, result) {
        var transform = {
            'tag': 'tr'
            , 'html': '<td>${first_name}&nbsp;${last_name}</td><td>${CountryId}</td>'
        };
        var data = result;
        var table = "<tr><th>Name</th><th>Country</th></tr>"+json2html.transform(data, transform);
        res.send(table);
    });
});
//db.run("select * from users", function (err, result) {
//    console.log(result);
//});

module.exports = router;
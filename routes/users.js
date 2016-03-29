var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registration');
  res.end('Ended');
});

module.exports = router;

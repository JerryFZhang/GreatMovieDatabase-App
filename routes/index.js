var express = require('express');
var router = express.Router();
// var pg = require('pg');
// var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:*******MY**PASSWORD*******@localhost:5433/postgres';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

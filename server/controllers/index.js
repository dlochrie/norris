var express = require('express');
var router = express.Router();

/**
 * Renders the main application page. Since this is a SPA, there should not be
 * many request to this route..
 */
router.get('/', function(req, res) {
  res.render('index', { title: 'Norris' });
});


module.exports = router;

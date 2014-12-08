var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Norris' });
});

/**
 * Tell Express to serve Angular Partials as html files.
 */
router.get('/partials/components/:filename', function(req, res) {
  var filename = req.params.filename;
  if (!filename) {
    res.send(404);
  } else {
    res.render('partials/components/' + filename);
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();


/**
 * Fetches all Posts.
 */
router.get('/posts', function(req, res) {
  res.json(req.session.posts);
});


/**
 * Adds a Post.
 */
router.post('/posts', function(req, res) {
  req.session.posts = req.session.posts || [];
  req.session.posts.push(req.body);

  // Return success.
  res.send(200).end();
});


module.exports = router;

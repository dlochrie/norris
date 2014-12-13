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

  // Return all the posts.
  res.json(req.session.posts);
});


module.exports = router;

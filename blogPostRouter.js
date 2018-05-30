'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require ('./models');

BlogPosts.create('Post #1', 'this is my first post', 'Ben', 'Tuesday');
BlogPosts.create('Post #2', 'this is my second post', 'Ben', 'Wednesday');
BlogPosts.create('Post #3', 'this is my third post', 'Ben', 'Thursday');

router.get('/', (req,res) => {
  res.json(BlogPosts.get());
});

module.exports = router;
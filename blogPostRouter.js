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

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body.  Please provide a Title, Content, and Author!`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

module.exports = router;
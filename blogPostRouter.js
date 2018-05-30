'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require ('./models');

BlogPosts.create('Post #1', 'this is my first post', 'Ben', 'Tuesday');
BlogPosts.create('Post #2', 'this is my second post', 'Ben', 'Wednesday');
BlogPosts.create('Post #3', 'this is my third post', 'Ben', 'Thursday');

/*===========GET============*/
router.get('/', (req,res) => {
  res.json(BlogPosts.get());
});

/*===========POST===========*/
router.post('/', jsonParser, (req, res) => {
  /* publishDate is NOT required because the BlogPosts.create() function specifies publishDate as
  publishDate: publishDate || Date.now(), so if a date is not specified, it will be created!!! */
  const requiredFields = ['title', 'content', 'author'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body.  Please provide a Title, Content, and Author!`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  console.log(`Creating blog post "${req.body.title}"`);
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

/*===========PUT============*/
router.put('/:id', jsonParser, (req,res) => {
  /* publishDate is NOT required because the BlogPosts.create() function specifies publishDate as
  publishDate: publishDate || Date.now(), so if a date is not specified, it will be created!!! */
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body.  Please provide a Title, Content, and Author!`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id} must match!`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post #${req.params.id}, "${req.body.title}"`);
  const updatedPost = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});
/*==========Delete==========*/
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post #${req.params.id}.`);
  res.status(204).end();
});

module.exports = router;
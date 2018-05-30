'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const blogPostRouter = require('./blogPostRouter');
const {BlogPosts} = require ('./models');
const app = express();

app.use(morgan('common'));
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
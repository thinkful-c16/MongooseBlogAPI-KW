'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');


const { DATABASE_URL } = require('../config');
const { BlogPost } = require('../models');


/* ========== GET/READ ALL ITEMS ========== */
router.get('/posts', (req, res) => {
  BlogPost
    .find({})
    .then(blogposts => {
      res.status(200, 'ok')
        .json({
          blogposts: blogposts.map(
            (post) => post.apiRepr())
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error.'});
    });
});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/posts/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .then(results => res.status(200, 'ok').json(results.apiRepr()))
    .catch((err) => {
      console.error(err);
      res.status(500).json({message: 'Internal server error.'});
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/posts', jsonParser,  (req, res) => {
  const requiredFields = ['title', 'author', 'content'];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const msg = `Missing ${field} in request body`;
      console.error(msg);
      return res.status(400).send(msg);
    }
  }

  if (req.body.title.length === 0) {
    const msg =  'Item must have a title';
    console.error(msg);
    res.status(400).send(msg);
  }

  BlogPost.create( {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content})
    .then(blogpost => res.status(201).json(blogpost.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error.'});
    });
});


/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/posts/:id', jsonParser, (req, res) => {
  //   const id = Number(req.params.id);

  // if (id !== req.body.id) {
  //   const msg = `Request id (${id}) and request body id (${req.body.id}) must match.`;
  //   console.error(msg);
  //   res.status(400).send(msg);
  // }
        
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/posts/:id', (req, res) => {

});

module.exports = router;
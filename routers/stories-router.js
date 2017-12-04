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
        .json(blogposts.map(
          (post) => post.apiRepr())
        );
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
 
  if (!(req.params.id === req.body.id)) {
    const msg = `Request id (${req.params.id}) and request body id (${req.body.id}) must match.`;
    console.error(msg);
    res.status(400).json({message: msg});
  }

  const toUpdate = {};
  const updateableFields = ['title', 'content', 'author'];
  console.log(req.body);
  updateableFields.forEach(field => {
    // console.log(field);
    if (field in req.body)  {
      // console.log(req.body[field]);
      toUpdate[field] = req.body[field];
      // console.log(toUpdate);
    }
  });
  BlogPost
    .findByIdAndUpdate(req.body.id, {$set: toUpdate}, {new: true})
    .then(blogpost => {
    // console.log('the updated post====>', blogpost);
    // res.status(200).json(blogpost.apiRepr());
      res.json(blogpost.apiRepr());
    
    })
    .catch(err => res.status(500).json({message: 'Internal server error.}'}));
  
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/posts/:id', (req, res) => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error.'}));

});

module.exports = router;
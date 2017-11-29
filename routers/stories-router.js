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
// router.post('/posts', jsonParser,  (req, res) => {
//   BlogPost.create( {
//     title: req.body.id,
//     author: req.body.author,
//     content: req.body  const id = Number(req.params.id);
//     const id = Number(req.params.id);
//     const id = Number(req.params.id);
    
//   })

// });

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/posts/:id', jsonParser, (req, res) => {

        
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/posts/:id', (req, res) => {

});

module.exports = router;
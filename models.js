'use strict';

const mongoose = require('mongoose');

const blogPostsSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: String,
  author: {
    firstName: String,
    lastName: String
  }

});

//virtuals and methods

blogPostsSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostsSchema.methods.apiRepr = function() {
  return {
    title: this.title,
    content: this.content,
    author: this.fullName
  };
};

const BlogPost = mongoose.model('BlogPost', blogPostsSchema, 'blogposts');

module.exports = {BlogPost};
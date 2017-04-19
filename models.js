const mongoose = require('mongoose');

// this is our schema to represent a blog
const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  created: {type: String}
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the author object
// we're storing in Mongo.
blogPostSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} + ${this.author.lastName}`.trim()});


// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogPostSchema.methods.apiRepr = function() {

  return {
    title: this.title,
    content: this.content,
    author: this.authorString,
    created: this.created
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Blogpost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {Blogpost};

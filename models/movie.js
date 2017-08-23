const mongoose = require('mongoose');
const Person = require('./person.js');

var movieSchema = mongoose.Schema({
    title: {type: String, unique: true},
    year: Number,
    director: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }],
    stars: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }]
});

console.log('What is a movieSchema? ', typeof movieSchema, movieSchema);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

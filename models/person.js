const mongoose = require('mongoose');
const Movie = require('./movie');

var personSchema = mongoose.Schema({
    name: String,
    birthdate: Date,
    birthplace: String
});

console.log('What is a personSchema? ', typeof personSchema, personSchema);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

const mongoose = require('mongoose');
const Movie = require('./models/movie.js');
const Person = require('./models/person.js');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/mongoose-build-a-schema');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected');
});

// const jakeHoffman = new Person({
//   name: 'Jake Hoffman',
//   birthdate: 'March 20, 1981',
//   birthplace: 'Los Angeles, California'
// });
//
// const devonAoki = new Person({
//   name: 'Devon Aoki',
//   birthdate: 'August 10, 1982',
//   birthplace: 'New York City, New York'
// });
//
// const johnVentimiglia = new Person({
//   name: 'John Ventimiglia',
//   birthdate: 'July 17, 1963',
//   birthplace: 'Ridgewood, New York'
// });
//
// const jordanGalland = new Person({
//   name: 'Jordan Galland',
//   birthdate: '1980',
//   birthplace: 'Farmington, Connecticut'
// });
// //
// jakeHoffman.save()
// devonAoki.save()
// johnVentimiglia.save()
// jordanGalland.save()
//
// Movie.create({
//   title: 'Rosencrantz and Guildenstern Are Undead',
//   year: 2009,
//   director: jakeHoffman._id,
//   stars: [devonAoki._id, johnVentimiglia._id, jordanGalland._id]})
//   .then(function (results) {
//     console.log('\nfindOne', results);
//     return Person.findOne({title: "Devon Aoki"})
//   }).then(function (results) {
//     console.log('\n\nfind returned ' + results.length + ' results');
//   }).catch(function (error) {
//     console.log('error ' + JSON.stringify(error));
//   })

// app.get('/', function (req,res) {
//   Movie.find()
// .then(function (movies) {
//   res.render('index', {data: movies})
// })})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});

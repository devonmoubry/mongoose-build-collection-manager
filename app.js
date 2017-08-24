const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Movie = require('./models/movie.js');
const Person = require('./models/person.js');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/mongoose-build-a-schema');

const app = express();
app.engine('mustache', mustacheExpress()); // Register '.mustache' extension with The Mustache Express
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected');
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
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

app.get('/', function (req,res) {
  Movie.find()
  .then(function (movies) {
    res.render('index', {data: movies})
  })
  Person.find()
  .then(function (people) {
    console.log(people);
  })
})

// GET method route
// app.get('/', function (req, res) {
//
//   // No query passed in means "find everything"
//   Person.find({name: "Devon Aoki"})
//   .then(function (people) {
//     res.status(200).send(people)
//     console.log(people);
//   })
// })

app.listen(3000, function () {
  console.log('🍸  Party at http://localhost:3000...');
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});

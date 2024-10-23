const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expenses = require('./models/expenses');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');
const app = express();
const port = 3005;

mongoose
  .connect(config.database)
  .then(() => {
    console.log('Database Connected to MongoDB');
    app.listen(port, () => {
      console.log(`port is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log('Connection failed!', err);
  });

// Set up static middleware
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Set the view engine to Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const expenses = new Expenses();

//session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

//Flash messages set up
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);
app.use(flash());

//Passport configuration
require('./config/passport');
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

const router = require('./server/routes/route');
const user = require('./server/routes/users');
app.use('/users/', user);
// All Url path Added to route folder
app.use('/', router);
//register setup

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//set Dashboard Layouts
app.get('/dashboard', (req, res) => {
  const labels = ['Food', 'Toys', 'Cloths'];
  const data = [10, 25, 15];

  res.render('dashboard', { labels, data, labels, data });
});

// //set Dashboard Layouts
// app.get('/register', (req, res) => {
//   res.render('register');
// });

//first get expense-table url using GET MEthod
app.get('/expense-table', (req, res) => {
  res.render('expense-table', {
    title: 'Expense list',
  });
});

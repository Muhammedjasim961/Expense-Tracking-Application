"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Expenses = require('./models/expenses');

var path = require('path');

var app = express();
var port = 3005;
mongoose.connect('mongodb://localhost:27017/expenses').then(function () {
  console.log('Database Connected to MongoDB');
  app.listen(port, function () {
    console.log("port is running on ".concat(port));
  });
})["catch"](function (err) {
  console.log('Connection failed!', err);
}); // Set up static middleware

app.use(express["static"](path.join(__dirname, 'public'))); // app.use(express.json());

app.use(express.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json()); // Set the view engine to Pug

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/add-expenses', function (req, res) {
  res.render('add-expenses', {
    title: 'Add Expenses'
  });
}); // save expense

app.post('/add-expenses', function _callee(req, res) {
  var _req$body, title, amount, category, expense;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, title = _req$body.title, amount = _req$body.amount, category = _req$body.category;
          _context.next = 4;
          return regeneratorRuntime.awrap(Expenses.save());

        case 4:
          expense = _context.sent;

          if (!expense) {
            res.status(404).json({
              message: 'could/nt found expenses'
            });
          } else {
            res.redirect('/expense-table');
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //first get expense-table url using GET MEthod

app.get('/expense-table', function (req, res) {
  var expenses = [{
    title: 'Shirt',
    amount: '123.54',
    category: 'Cloths'
  }];
  res.render('expense-table', {
    title: 'Expense list',
    expenses: expenses
  });
});
app.get('/', function (req, res) {
  res.render('layoutes');
});
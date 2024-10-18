"use strict";

var express = require('express');

var mongoose = require('mongoose');

var app = express();

var bodyParser = require('body-parser');

var Expenses = require('./models/expenses');

var port = 3005;
mongoose.connect('mongodb+srv://jasimwayanad961:SMnJVPdoQj8elriD@cluster0.rsluf.mongodb.net/expenses').then(function () {
  console.log('Database Connected to MongoDB');
  app.listen(port, function () {
    console.log("port is running on ".concat(port));
  });
})["catch"](function (err) {
  console.log('Connection failed!', err);
}); // app.use(express.json());

app.use(express.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json()); // Set the view engine to Pug

app.set('view engine', 'pug'); // Add expense

app.post('/add-expenses', function _callee(req, res) {
  var expense;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Expenses.find({}));

        case 3:
          expense = _context.sent;

          if (!expense) {
            res.status(404).json({
              message: 'could/nt found expenses'
            });
          } else {
            res.render('expense-table', {
              title: 'Expenses'
            });
          }

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(err);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get('/dashboard', function (req, res) {
  res.render('layoutes');
});
app.get('/expenses-table', function (req, res) {
  res.render('expense-table');
});
app.get('/add-expenses', function (req, res) {
  res.render('add-expenses');
});
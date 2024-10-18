const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Expenses = require('./models/expenses');

const port = 3005;

mongoose
  .connect(
    'mongodb+srv://jasimwayanad961:SMnJVPdoQj8elriD@cluster0.rsluf.mongodb.net/expenses'
  )
  .then(() => {
    console.log('Database Connected to MongoDB');
    app.listen(port, () => {
      console.log(`port is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log('Connection failed!', err);
  });

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Set the view engine to Pug
app.set('view engine', 'pug');

// Add expense
app.post('/add-expenses', async (req, res) => {
  try {
    const expense = await Expenses.find({});

    if (!expense) {
      res.status(404).json({ message: 'could/nt found expenses' });
    } else {
      res.render('expense-table', {
        title: 'Expenses',
      });
    }
  } catch (error) {
    console.log(err);
  }
});

app.get('/dashboard', (req, res) => {
  res.render('layoutes');
});
app.get('/expenses-table', (req, res) => {
  res.render('expense-table');
});
app.get('/add-expenses', (req, res) => {
  res.render('add-expenses');
});

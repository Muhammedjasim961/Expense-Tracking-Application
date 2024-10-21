const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expenses = require('./models/expenses');
const path = require('path');

const app = express();
const port = 3005;

mongoose
  .connect('mongodb://localhost:27017/expenses')
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
//Home route to find datas from mongodb to place here!
app.get('/expense-table', async (req, res) => {
  try {
    const expenses = await Expenses.find({});

    if (!expenses || expenses.length === 0) {
      console.log("Expenses can't be found in the table");
      return res.status(404).json({ message: "No Data's Found in Table" });
    }

    res.render('expense-table', {
      expenses: expenses,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});

// save expense
app.post('/add-expenses', async (req, res) => {
  try {
    const expenses = new Expenses();
    expenses.title = req.body.title;
    expenses.amount = req.body.amount;
    expenses.category = req.body.category;

    const addExpense = await expenses.save();

    if (!addExpense && addExpense.length === 0) {
      res.status(404).json({ message: 'could/nt found expenses' });
    } else {
      res.redirect('/expense-table');
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred while saving the expense' });
  }
});

// Edit EXPENSES
app.post('/editExpense/:id', async (req, res) => {
  try {
    const expenses = {};
    expenses.title = req.body.title;
    expenses.amount = req.body.amount;
    expenses.category = req.body.category;
    const query = { _id: req.params.id };
    const updateExpense = await Expenses.findByIdAndUpdate(query, expenses);
    console.log(updateExpense);

    if (!updateExpense) {
      console.log('Cant update expense');
      return;
    } else {
      res.redirect('/expense-table');
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: 'something wrong with update expense'.error });
  }
});

app.get('/editExpense/:id', async (req, res) => {
  try {
    const expenses = await Expenses.findById(req.params.id);
    res.render('editExpense', {
      expenses: expenses,
      title: 'Edit Expense',
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

//delete expenses
app.delete('/expense-table/:id', async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deleteExpense = await Expenses.findByIdAndDelete(expenseId);
    if (!deleteExpense) {
      res.status(404).json({ message: 'Error in deleting expense' });
      return;
    }
    res.status(200).json({ message: 'Expense Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//set Dashboard Layouts
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
//set save layouts
app.get('/add-expenses', (req, res) => {
  res.render('add-expenses', {
    title: 'Add Expenses',
  });
});

//first get expense-table url using GET MEthod
app.get('/expense-table', (req, res) => {
  res.render('expense-table', {
    title: 'Expense list',
  });
});

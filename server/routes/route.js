const express = require('express');
const Expenses = require('../../models/expenses');
const router = express.Router();
// const Expenses = require('../models/expenses');
//set save layouts
router.get('/add-expenses', (req, res) => {
  res.render('add-expenses', {
    title: 'Add Expenses',
  });
});

// Add POST  expense
router.post('/add-expenses', async (req, res) => {
  try {
    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('amount', 'Amount is Required').notEmpty();
    req.checkBody('category', 'Category is Required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.render('add-expenses', {
        title: 'Add Expense',
        errors: errors,
      });
      console.log('fill the form');
    } else {
      const expenses = new Expenses();
      expenses.title = req.body.title;
      expenses.amount = req.body.amount;
      expenses.category = req.body.category;

      const addExpense = await expenses.save();

      if (!addExpense || addExpense.length === 0) {
        res.status(404).json({ message: 'could/nt found expenses' });
      } else {
        req.flash('success', 'Expense Added to the List');
        res.redirect('/expense-table');
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred while saving the expense' });
  }
});

//Home route to find datas from mongodb to place here!
router.get('/expense-table', async (req, res) => {
  try {
    const expenses = await Expenses.find({});

    if (!expenses || expenses.length === 0) {
      console.log("Expenses can't be found in the table");
      return res.status(404).json({ message: "No Data's Found in Table" });
    }

    res.render('expense-table', {
      title: 'Add Expense',
      expenses: expenses,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});

// Update EXPENSES On POst Route
router.post('/editExpense/:id', async (req, res) => {
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
      req.flash('success', 'Expenses Updated Successfully');
      res.redirect('/expense-table');
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: 'something wrong with update expense'.error });
  }
});

router.get('/editExpense/:id', async (req, res) => {
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
router.delete('/expense-table/:id', async (req, res) => {
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

module.exports = router;

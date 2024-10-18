const express = require('express');
const mongoose = require('mongoose');

const ExpenSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expenses = mongoose.model('Expenses', ExpenSchema);
module.exports = Expenses;

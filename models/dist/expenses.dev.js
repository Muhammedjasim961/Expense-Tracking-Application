"use strict";

var express = require('express');

var mongoose = require('mongoose');

var ExpenSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var Expenses = mongoose.model('Expenses', ExpenSchema);
module.exports = Expenses;
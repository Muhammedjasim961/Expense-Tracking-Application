const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register',
  });
});

router.post('/register', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req
      .checkBody('password2', 'password2 is required')
      .equals(req.body.password);

    const errors = req.validationErrors();
    console.log(errors);

    if (errors) {
      res.render('register', {
        errors: errors,
      });
    } else {
      const newUser = new User({ name, email, username, password });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;

      await newUser.save(); // Use await here to save the user

      req.flash('success', 'You are now registered and can log in');
      return res.redirect('/users/login');
    }
  } catch (error) {
    console.error(error); // Add this line to log the error
    res
      .status(500)
      .json({ message: 'Error in Registration', error: error.message });
  }
});
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    console.log('login Error'.errors);
    res.render('login', {
      errors: errors,
    });
  }
  //login checking
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureMessage: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

//logout url
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are Logged Out');
  res.redirect('/users/login');
});
module.exports = router;

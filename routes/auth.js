const express = require('express');
const passport = require('passport');
const session = require("express-session")

const router = express.Router();

// Route to start Google OAuth process
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'] // Request profile and email from Google
}));

// Callback route that Google redirects to
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful login, redirect to the home page or dashboard
    req.session.user=true
    res.redirect('/');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load User Model
const User = require('../Models/User');


router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/google/callback', passport.authenticate('google',{ failureRedirect: '/users/login' }), (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;

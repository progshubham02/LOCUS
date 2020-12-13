const router = require('express').Router();
const pool = require('../config/database');
const passport = require('passport');

// Passport functionalities is included
require('../config/passport')(passport);

router.post('/log', passport.authenticate('local', {

    successRedirect: '/products',
    failureRedirect: '/'
  })
);

module.exports = router;

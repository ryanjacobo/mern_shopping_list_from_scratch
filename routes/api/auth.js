const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route POST api/auth
// @desc auth user
// @access Public

// Create new user
router.post('/', (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all required fields'});
    }

    // Check for existing user
    User.findOne({username})
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exists'});

      // Validate password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
          if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err)throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        // password: user.password
                    }
                })
            }
        )                  
      })
    })
})

// @route get api/auth/user
// @desc auth user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password') // don't return the pw
    .then(user => res.json(user))
});

module.exports = router;
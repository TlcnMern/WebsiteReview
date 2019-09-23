const User =require('../models/user.model');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const config =require('../config/config');

const signin = (req, res) => {
  User.findOne({
    "email": req.body.email
  }, (err, user) => {
    if (err || !user)
      return res.status('401').json({
        error: "User not found"
      });

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      });
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret);
    
    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email}
    });

  })
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})


module.exports={
    signin:signin,
    requireSignin:requireSignin
}

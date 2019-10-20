const User =require('../models/usertest');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const config =require('../config/config');

const signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    "local.email": req.body.email
  }, (err, user) => {
    if (err || !user){
      return res.status('401').json({
        error: "User not found"
      });
    }
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
      user: {_id: user._id}
    });

  })
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})


const hasAuthorization = (req, res, next) => {
  console.log(req.auth);
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  console.log('authorized '+ authorized);
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const  googleOAuth= async (req, res, next) => {
  // Generate token
  console.log('got here');
  const token = jwt.sign({
    _id: req.user.id
  }, config.jwtSecret);
  return res.json({
    token,
    user: {_id: req.user.id}
  });
  // res.status(200).json({ token });
}


module.exports={
    signin:signin,
    requireSignin:requireSignin,
    hasAuthorization:hasAuthorization,
    googleOAuth:googleOAuth
}

const User =require('../models/user.model');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const config =require('../config/config');

const signin = (req, res) => {
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
      user: {_id: user._id, avatar:user.avatar,name:user.name}
    });

  })
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  console.log('authorized '+ authorized);
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const  googleOAuth= async (req, res) => {
  const token = jwt.sign({
    _id: req.user._id
  }, config.jwtSecret);
  return res.json({
    token,
    user: {_id: req.user.id,avatar:req.user.avatar,name:req.user.name},
  });
}

module.exports={
    signin:signin,
    requireSignin:requireSignin,
    hasAuthorization:hasAuthorization,
    googleOAuth:googleOAuth
}

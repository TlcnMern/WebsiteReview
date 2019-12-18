const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const config = require('../config/config');
const { aclStore } = require('../helpers/acl-store');

const signin = (req, res) => {
    User.findOne({
        "local.email": req.body.email
    }, (err, user) => {
        if (err || !user) {
            return res.status('401').json({
                error: "User not found"
            });
        }
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Email and password don't match."
            });
        }

        aclStore.acl.hasRole(user._id.toString(), 'admin', (err, result) => {
            if (err) {
                console.log(err);
            }
            const token = jwt.sign({
                _id: user._id,
                isAdmin: result
            }, config.jwtSecret);

            return res.json({
                token,
                user: { _id: user._id, avatar: user.avatar, name: user.name },
                isAdmin:result
            });
        })
    })
};

// const requireSignin = expressJwt({
//     secret: config.jwtSecret,
//     userProperty: 'auth'
// })

const requireSignin = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.auth = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    // console.log('authorized ' + authorized);
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

const googleOAuth = async (req, res) => {
    const token = jwt.sign({
        _id: req.user._id
    }, config.jwtSecret);
    return res.json({
        token,
        user: { _id: req.user.id, avatar: req.user.avatar, name: req.user.name },
    });
}

const facebookOAuth = async (req, res) => {
    const token = jwt.sign({
        _id: req.user._id
    }, config.jwtSecret);
    return res.json({
        token,
        user: { _id: req.user.id, avatar: req.user.avatar, name: req.user.name },
    });
}

module.exports = {
    signin: signin,
    requireSignin: requireSignin,
    hasAuthorization: hasAuthorization,
    googleOAuth: googleOAuth,
    facebookOAuth: facebookOAuth
}
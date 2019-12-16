const express=require('express');
const controllerUser=require('../controllers/user.controller');
const controllerAuth=require('../controllers/auth.controller');
const router = express.Router()

const passport = require('passport');
const passportConf = require('../passport');//  de yen

//login local
router.route('/signin').post(controllerAuth.signin)
//signin gg
router.route('/oauth/google').post(passport.authenticate('googleToken', { session: false }), controllerAuth.googleOAuth);
router.route('/oauth/facebook').post(passport.authenticate('facebookToken', { session: false }), controllerAuth.facebookOAuth);
module.exports=router;


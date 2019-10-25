const express=require('express');
const controllerAuth=require('../controllers/auth.controller');
const router = express.Router()

const passport = require('passport');
const passportConf = require('../passport');



//login local
router.route('/signin').post(controllerAuth.signin)
//signin gg
router.route('/oauth/google').post(passport.authenticate('googleToken', { session: false }), controllerAuth.googleOAuth);

module.exports=router;


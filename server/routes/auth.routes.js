const express=require('express');
const controllerUser=require('../controllers/user.controller');
const controllerAuth=require('../controllers/auth.controller');
const router = express.Router()

const passport = require('passport');
const passportConf = require('../passport');//  de yen

const aclStore=require('../helpers/acl-store');
const aclLibrary=aclStore.aclStore.acl;

//login local
router.route('/signin').post(controllerAuth.signin)
//signin gg
router.route('/oauth/google').post(passport.authenticate('googleToken', { session: false }), controllerAuth.googleOAuth);
//authorized
router.route('/checkAuthorizedComment/:userID').post(controllerAuth.checkAuthorizedComment);
router.param('userID', controllerUser.UserById);
module.exports=router;


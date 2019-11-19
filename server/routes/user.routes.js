const express=require('express');
const controllerUser=require('../controllers/user.controller');
const controllerAuth=require('../controllers/auth.controller');
const router = express.Router();
const {aclStore}=require('../helpers/acl-store');
const aclLibrary=aclStore.acl;

//register
router.route('/users').post(controllerUser.register);

//get info user
router.route('/users/:userID').get(controllerUser.getInfoUser);

//edit profile
router.route('/users/editProfile/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,aclLibrary.middleware(2),controllerUser.update)

//follow
router.route('/users/checkFollow/:userID').post(controllerAuth.requireSignin,controllerUser.checkFollow);
router.route('/users/follow').put(controllerAuth.requireSignin,controllerUser.addFollowing,controllerUser.addFollower);
router.route('/users/unFollow').put(controllerAuth.requireSignin,controllerUser.removeFollowing, controllerUser.removeFollower)

router.param('userID', controllerUser.UserById);
module.exports=router;

const express=require('express');
const controllerUser=require('../controllers/user.controller');
const controllerAuth=require('../controllers/auth.controller');
const router = express.Router();


router.route('/users').post(controllerUser.register);
router.route('/users/:userID').get(controllerUser.getInfoUser);
router.route('/users/photo/:userID').get(controllerUser.photo,controllerUser.defaultPhoto);
router.route('/users/editProfile/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerUser.update)

//follow
router.route('/users/checkFollow/:userID').post(controllerAuth.requireSignin,controllerUser.checkFollow);
router.route('/users/follow').put(controllerAuth.requireSignin,controllerUser.addFollowing,controllerUser.addFollower);
router.route('/users/unFollow').put(controllerAuth.requireSignin,controllerUser.removeFollowing, controllerUser.removeFollower)


router.param('userID', controllerUser.UserById);
module.exports=router;

const express=require('express');
const controllerUser=require('../controllers/user.controller');
const controllerAuth=require('../controllers/auth.controller');
const router = express.Router()






router.route('/users').post(controllerUser.register);
router.route('/users/:userID').get(controllerUser.getInfoUser);
router.route('/users/photo/:userID').get(controllerUser.photo,controllerUser.defaultPhoto);
router.route('/users/editProfile/:userID').put(controllerAuth.requireSignin,controllerUser.update)

router.param('userID', controllerUser.UserById);
module.exports=router;

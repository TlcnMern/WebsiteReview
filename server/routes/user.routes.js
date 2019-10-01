const express=require('express');
const controllerUser=require('../controllers/user.controller');
const router = express.Router()



router.param('userID', controllerUser.UserById);
router.route('/users').post(controllerUser.register);
router.route('/users/:userID').get(controllerUser.getInfoUser);
router.route('/users/photo/:userID').get(controllerUser.photo,controllerUser.defaultPhoto);



module.exports=router;

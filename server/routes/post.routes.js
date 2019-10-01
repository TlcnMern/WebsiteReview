const express =require('express');
const router=express.Router();
const ControllerPost=require('../controllers/post.controller');
const ControllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');

router.param('userID', controllerUser.UserById);
router.route('/new/:userID').post(ControllerAuth.requireSignin, ControllerPost.create);
router.route('/NewFeeds').get(ControllerPost.getNewFeeds);
router.route('/photo/:postID').get(ControllerPost.photo)



router.param('postID', ControllerPost.postByID);
module.exports=router;
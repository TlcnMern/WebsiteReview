const express =require('express');
const router=express.Router();
const controllerPost=require('../controllers/post.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');

router.param('userID', controllerUser.UserById);
router.route('/new/:userID').post(controllerAuth.requireSignin, controllerPost.create);
router.route('/NewFeeds').get(controllerPost.getNewFeeds);
router.route('/photo/:postID').get(controllerPost.photo);

router.route('/addComment').put(controllerAuth.requireSignin,controllerPost.addComment);
router.route('/addRating').put(controllerAuth.requireSignin,controllerPost.addRating);
router.route('/checkRatingAndShow').post(controllerAuth.requireSignin,controllerPost.checkRatingAndShow);


router.param('userID', controllerUser.UserById);
router.param('postID', controllerPost.postByID);
module.exports=router;
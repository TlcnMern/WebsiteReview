const express =require('express');
const router=express.Router();
const controllerPost=require('../controllers/post.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');

router.route('/new/:userID').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization, controllerPost.create);
router.route('/NewFeeds').get(controllerPost.getNewFeeds);
router.route('/getPostFeatured').get(controllerPost.getPostFeatured);
router.route('/getDetailPost/:postId').get(controllerPost.getDetailPost);
router.route('/getTopListPostFollowTheme/:theme').get(controllerPost.getTopListPostFollowTheme);
router.route('/searchPost').get(controllerPost.searchPost);


//rating
router.route('/addRating').put(controllerAuth.requireSignin,controllerPost.addRating);
router.route('/checkRatingAndShow').post(controllerAuth.requireSignin,controllerPost.checkRatingAndShow);
router.route('/updateRatingOfUser').put(controllerAuth.requireSignin, controllerPost.updateRatingOfUser);
router.route('/calculateRaingtingEachPost').get(controllerPost.calculateRaingtingEachPost);

router.param('userID', controllerUser.UserById);
router.param('postId', controllerPost.postByID);
module.exports=router;
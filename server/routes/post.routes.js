const express =require('express');
const router=express.Router();
const controllerPost=require('../controllers/post.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');

router.route('/new/:userId').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization, controllerPost.create);
router.route('/newFeeds/:userId').get(controllerPost.getNewFeeds);
router.route('/getPostFeatured').get(controllerPost.getPostFeatured);
router.route('/getDetailPost/:postId').get(controllerPost.getDetailPost);
router.route('/getTopListPostFollowTheme/:theme').get(controllerPost.getTopListPostFollowTheme);
router.route('/searchPost').get(controllerPost.searchPost);
router.route('/sortPost').get(controllerPost.sortPost);
router.route('/getPostPaginate/:page').get(controllerPost.getPostPaginate);


router.param('userId', controllerUser.UserById);
router.param('postId', controllerPost.postByID);
module.exports=router;
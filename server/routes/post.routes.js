const express =require('express');
const router=express.Router();
const controllerPost=require('../controllers/post.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');
const controllerComment=require('../controllers/comment.controller');

const aclStore=require('../helpers/acl-store');
const aclLibrary=aclStore.aclStore.acl;

router.route('/new/:userID').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization, controllerPost.create);
router.route('/NewFeeds').get(controllerPost.getNewFeeds);
router.route('/getDetailPost/:postId').get(controllerPost.getDetailPost);

//comment
router.route('/getComment/:postId').get(controllerComment.getComment);
router.route('/addComment').put(controllerAuth.requireSignin,controllerComment.addComment);
router.route('/addSubComment').put(controllerAuth.requireSignin,controllerComment.addSubComment);
router.route('/deleteComment/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,aclLibrary.middleware(2),controllerComment.deleteComment);
router.route('/updateComment/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.updateComment);
router.route('/checkAuthorizedComment/:userID').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.checkAuthorizedComment);
router.route('/checkAuthorizedSubComment/:userID').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.checkAuthorizedSubComment);
router.route('/deleteSubComment/:userID').delete(controllerComment.deleteSubComment);
router.route('/updateSubComment/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.updateSubComment);


//rating
router.route('/addRating').put(controllerAuth.requireSignin,controllerPost.addRating);
router.route('/checkRatingAndShow').post(controllerAuth.requireSignin,controllerPost.checkRatingAndShow);
router.route('/updateRatingOfUser').put(controllerAuth.requireSignin, controllerPost.updateRatingOfUser);
router.route('/calculateRaingtingEachPost').get(controllerPost.calculateRaingtingEachPost);

router.param('userID', controllerUser.UserById);
router.param('postId', controllerPost.postByID);
module.exports=router;
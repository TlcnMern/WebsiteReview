const express =require('express');
const router=express.Router();
const controllerPost=require('../controllers/post.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');

const aclStore=require('../helpers/acl-store');
const aclLibrary=aclStore.aclStore.acl;

router.route('/new/:userID').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization, controllerPost.create);
router.route('/NewFeeds').get(controllerPost.getNewFeeds);
router.route('/photo/:postID').get(controllerPost.photo);

//comment
router.route('/getComment/:postID').get(controllerPost.getComment);
router.route('/addComment').put(controllerAuth.requireSignin,controllerPost.addComment);
router.route('/addSubComment').put(controllerAuth.requireSignin,controllerPost.addSubComment);
router.route('/deleteComment/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,aclLibrary.middleware(2),controllerPost.deleteComment);
router.route('/updateComment/:userID').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerPost.updateComment);
router.route('/checkAuthorizedComment/:userID').post(controllerPost.checkAuthorizedComment);

//rating
router.route('/addRating').put(controllerAuth.requireSignin,controllerPost.addRating);
router.route('/checkRatingAndShow').post(controllerAuth.requireSignin,controllerPost.checkRatingAndShow);
router.route('/updateRatingOfUser').put(controllerAuth.requireSignin, controllerPost.updateRatingOfUser);

router.param('userID', controllerUser.UserById);
router.param('postID', controllerPost.postByID);
module.exports=router;
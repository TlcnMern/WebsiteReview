const express =require('express');
const router=express.Router();
const controllerPost=require('../controllers/post.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');
const controllerComment=require('../controllers/comment.controller');

const aclStore=require('../helpers/acl-store');
const aclLibrary=aclStore.aclStore.acl;
//comment
router.route('/getComment/:postId').get(controllerComment.getComment);
router.route('/addComment').put(controllerAuth.requireSignin,controllerComment.addComment);
router.route('/addSubComment').put(controllerAuth.requireSignin,controllerComment.addSubComment);
router.route('/deleteComment/:userId').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,aclLibrary.middleware(2),controllerComment.deleteComment);
router.route('/updateComment/:userId').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.updateComment);
router.route('/checkAuthorizedComment/:userId').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.checkAuthorizedComment);
router.route('/checkAuthorizedSubComment/:userId').post(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.checkAuthorizedSubComment);
router.route('/deleteSubComment/:userId').delete(controllerComment.deleteSubComment);
router.route('/updateSubComment/:userId').put(controllerAuth.requireSignin,controllerAuth.hasAuthorization,controllerComment.updateSubComment);

router.route('/likeComment/:userId').put(controllerComment.likeComment);
router.route('/unLikeComment/:userId').put(controllerComment.unLikeComment);
router.route('/checkLike').get(controllerComment.checkLike);

router.param('userId', controllerUser.UserById);
router.param('postId', controllerPost.postByID);
module.exports=router;
const express=require('express');
const controllerAdmin=require('../controllers/admin.controller');
const router = express.Router()


//quan ly bai viet
router.route('/getPostList').get(controllerAdmin.getPostList);
router.route('/hidenPost/:postId').put(controllerAdmin.hidenPost);
router.route('/allowPost/:postId').put(controllerAdmin.allowPost);

//quan ly nguoi dung
router.route('/getUserList').get(controllerAdmin.getUserList);

//quan ly thong ke
router.route('/getPostHighRateFollowMonth/:month').get(controllerAdmin.getPostHighRateFollowMonth);
router.route('/getPostPopularFollowMonth/:month').get(controllerAdmin.getPostPopularFollowMonth);
router.route('/getUserRaking/:month').get(controllerAdmin.getUserRaking);
router.route('/getQuantityUsersEachMonth').get(controllerAdmin.getQuantityUsersEachMonth);
router.route('/getQuantityPostFollowThemeEachMonth').get(controllerAdmin.getQuantityPostFollowThemeEachMonth);

module.exports=router;
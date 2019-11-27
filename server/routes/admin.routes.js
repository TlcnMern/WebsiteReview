const express=require('express');
const controllerAdmin=require('../controllers/admin.controller');
const router = express.Router()

router.route('/getPostList').get(controllerAdmin.getPostList);
router.route('/hidenPost/:postId').put(controllerAdmin.hidenPost);
router.route('/allowPost/:postId').put(controllerAdmin.allowPost);

module.exports=router;
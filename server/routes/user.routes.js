const express=require('express');
const userCtrl=require('../controllers/user.controller');
const router = express.Router()

router.route('/users').post(userCtrl.register);
router.route('/users/:userId').get(userCtrl.getInfoUser);

module.exports=router;

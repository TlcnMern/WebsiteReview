const express =require('express');
const router=express.Router();
const controllerRating=require('../controllers/rating.controller');
const controllerAuth=require('../controllers/auth.controller');
const controllerUser=require('../controllers/user.controller');

//rating
router.route('/addRating').put(controllerAuth.requireSignin,controllerRating.addRating);
router.route('/checkRatingAndShow').post(controllerAuth.requireSignin,controllerRating.checkRatingAndShow);
router.route('/updateRatingOfUser').put(controllerAuth.requireSignin, controllerRating.updateRatingOfUser);
router.route('/calculateRaingtingEachPost').get(controllerRating.calculateRaingtingEachPost);

router.param('userID', controllerUser.UserById);
module.exports=router;
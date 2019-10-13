const User=require('../models/user.model');
const errorHandler=require('../helpers/dbErrorHandler');
const formidable=require('formidable');
const fs=require('fs');
var _ = require('lodash');


const register = (req, res) => {
  const user = new User(req.body)
  console.log(req.body);
  user.save((err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully signed up!"
    })
  })
};

const getInfoUser=(req, res)=>{
  const userID = req.params.userID;
  User.findById(userID, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)//No user could be found for this ID
      })
    }
    const userInfo={_id: user._id, name: user.name, email: user.email,gender:user.gender,created:user.created};
    return res.status(200).json({userInfo});
  });
}

const UserById=(req,res,next,userID)=>{
  User.findById(userID)
      .populate('following','_id name')
      .populate('follower','_id name')
      .exec((err,user)=>{
        if(err || !user){
          return res.status('200').json({
            err:'User not found'
          });
        }
        req.profile=user;
        next();
      })
}



const photo = (req, res, next) => {
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
}

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+profileImage);
}

const update = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    let user = req.profile;

    user = _.extend(user, fields);
    user.updated = Date.now();
    if(files.photo){
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    })
  })
}

const checkFollow= (req, res) => {
  const userIDFollow=req.body.userIDFollow;
  const match = req.profile.following.find((following)=> {
    return following._id == userIDFollow
  });
  res.json(match);
}


//người mình theo dõi
const addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    next();
  })
}


//người theo dõi mình
const addFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  })
}


const removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userID, {$pull: {following: req.body.unFollowId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    next();
  })
}
const removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.unFollowId, {$pull: {followers: req.body.userID}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

module.exports = {
  register: register,
  getInfoUser:getInfoUser,
  UserById: UserById,
  photo: photo,
  defaultPhoto:defaultPhoto,
  update:update,
  checkFollow:checkFollow,
  addFollowing:addFollowing,
  addFollower:addFollower,
  removeFollowing:removeFollowing,
  removeFollower:removeFollower
}
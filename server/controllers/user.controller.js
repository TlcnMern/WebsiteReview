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
          console.log('dm lỗi')
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
    console.log('vô2');
    if (err) {
      console.log('lỗi r');
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
      console.log(user);
      res.json(user);
    })
  })
}

module.exports = {
  register: register,
  getInfoUser:getInfoUser,
  UserById: UserById,
  photo: photo,
  defaultPhoto:defaultPhoto,
  update:update
}
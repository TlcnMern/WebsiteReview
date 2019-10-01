const User=require('../models/user.model');
const errorHandler=require('../helpers/dbErrorHandler');

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



module.exports = {
  register: register,
  getInfoUser:getInfoUser,
  UserById: UserById,
  photo: photo,
  defaultPhoto:defaultPhoto
}
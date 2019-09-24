const User=require('../models/user.model');
const errorHandler=require('../helpers/dbErrorHandler');

const register = (req, res) => {
  const user = new User(req.body)
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
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)//No user could be found for this ID
      })
    }
    const userInfo={_id: user._id, name: user.name, email: user.email,gender:user.gender,created:user.created};
    return res.status(200).json({userInfo});
  });
}



module.exports = {
  register: register,
  getInfoUser:getInfoUser
}
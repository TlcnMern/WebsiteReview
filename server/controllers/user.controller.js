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
  if(userId==null)
    res.status(200).json({
      message: "oe!"
    })

  if (req.user._id.toString() !== userId) { 
    return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); 
  }
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)//No user could be found for this ID
      })
    }
    return res.status(200).json({ user});
  });
}



module.exports = {
  register: register,
  getInfoUser:getInfoUser
}
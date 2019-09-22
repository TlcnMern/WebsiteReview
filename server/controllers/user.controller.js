const User=require('../models/user.model');
const errorHandler=require('../helpers/dbErrorHandler');

const create = (req, res) => {
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


module.exports = {
  create: create
}
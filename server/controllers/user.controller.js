const User = require('../models/user.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Post = require('../models/post.model');
const errorHandler = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
var _ = require('lodash');
const { aclStore } = require('../helpers/acl-store');


const register = (req, res) => {
  User.findOne({ "local.email": req.body.email }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    if (result) {
      res.status(403).json({
        message: "User existed!"
      })
    }
    else {
      const user = new User({
        method: 'local',
        name: req.body.name,
        local: {
          email: req.body.email
        },
        password: req.body.password
      });

      user.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        aclStore.acl.addUserRoles(result._id.toString(), 'user', err => {
          if (!err) {
            res.status(200).json({
              message: "Successfully signed up!"
            })
          }
        });
      })
    }
  });


};

const getInfoUser = (req, res) => {
  const userID = req.params.userID;
  User.findById(userID)
    .populate('followers', '_id name avatar')
    .populate('following', '_id name avatar')
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)//No user could be found for this ID
        })
      }
      const userInfo = {
        _id: user._id, name: user.name, email: user.local.email || user.google.email, gender: user.gender,
        created: user.created, address: user.address, birthday: user.birthday, avatar: user.avatar, followers: user.followers, following: user.following
      };
      return res.status(200).json({ userInfo });
    });
}

const UserById = (req, res, next, userID) => {
  User.findById(userID)
    .populate('following', '_id name')
    .populate('follower', '_id name')
    .exec((err, user) => {
      if (err || !user) {
        console.log(err);
        return res.status('200').json({
          err: 'User not found'
        });
      }
      req.session = {
        userId: user._id.toString()
      };
      req.profile = user;
      next();
    })
}
//update info user
const update = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = './dist';
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;//10MB

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.avatar = files.photo.path.toString().replace("\\", "/");
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      result.hashed_password = undefined;
      result.salt = undefined;
      res.json(result);
    })
  })
}

const checkFollow = (req, res) => {
  const userIDFollow = req.body.userIDFollow;
  const match = req.profile.following.find((following) => {
    return following._id == userIDFollow
  });
  res.json(match);
}
//người mình theo dõi
const addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } }, (err, result) => {
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
  User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
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
  User.findByIdAndUpdate(req.body.userID, { $pull: { following: req.body.unFollowId } }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    next();
  })
}

const removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.unFollowId, { $pull: { followers: req.body.userID } }, { new: true })
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

const getPostUser = (req, res) => {
  const userId = req.params.userId;
  Post.find({ postedBy: userId })
    .sort({ 'created': -1 })
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      posts = posts.slice(0, 5);
      res.json(posts);
    })
}

const countIndex = (req, res) => {
  const userId = req.params.userId;
  Post.find({ postedBy: userId })
    .count()
    .exec((err, result1) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      User.aggregate([
        { $match: { _id: ObjectId(userId) } },
        {
          $project: {
            name: 1,
            numberFollower: { $cond: { if: { $isArray: "$followers" }, then: { $size: "$followers" }, else: "0" } },
            numberFollowing: { $cond: { if: { $isArray: "$following" }, then: { $size: "$following" }, else: "0" } }
          }
        }
      ])
        .exec((err, result2) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }
          result2[0].numberPost = result1
          return res.json(result2[0]);
        })
    })

}

module.exports = {
  register: register,
  getInfoUser: getInfoUser,
  UserById: UserById,
  update: update,
  checkFollow: checkFollow,
  addFollowing: addFollowing,
  addFollower: addFollower,
  removeFollowing: removeFollowing,
  removeFollower: removeFollower,
  getPostUser: getPostUser,
  countIndex: countIndex
}
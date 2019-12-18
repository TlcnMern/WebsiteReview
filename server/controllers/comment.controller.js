const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const errorHandler = require('../helpers/dbErrorHandler');

//commnet
const checkAuthorizedComment = (req, res) => {
  const commentID = req.body.commentID;
  const userID = req.session.userId;
  Comment.findOne({ _id: commentID, commentBy: userID }, (err, comment) => {
    if (err || !comment) {
      return res.status('400').json({
        error: "User not authorized"
      });
    }
    return res.json(true);
  })
}

const checkAuthorizedSubComment = (req, res) => {
  const commentId = req.body.commentId;
  const subCommentId = req.body.subCommentId;
  const userId = req.session.userId;
  Comment.find({ _id: commentId }, {
    subComment: { $elemMatch: { _id: subCommentId, commentBy: userId } }
  })
    .exec((err, result) => {
      if (err) {
        return res.status(204).json({
          error: "User not authorized subcomment"
        });
      }
      if (result[0].subComment.length !== 0) {
        return res.json(true);
      } else {
        return res.status(204).json({
          error: "User not authorized subcomment"
        });
      }
    })
}
//get comment and sub comment of 1 post
const getComment = (req, res) => {
  Post.find({ _id: req.post._id })
    .populate({
      path: 'comments',
      populate: { path: 'commentBy', select: '_id name avatar' }
    })
    .populate({
      path: 'comments',
      populate: { path: 'subComment.commentBy', select: '_id name avatar' }
    })
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(posts[0].comments);
    })
}
//add comment
const addComment = (req, res) => {
  let comment = new Comment(req.body);
  comment.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    Post.findByIdAndUpdate(req.body.postId, { $push: { comments: result._id } }, { new: true })
      .populate('postedBy', '_id name avatar')
      .populate({
        path: 'comments',
        populate: { path: 'commentBy', select: '_id name avatar' }
      })
      .exec((err, result2) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        res.json(result2.comments);
      })
  })
}
//delete comment
const deleteComment = (req, res) => {
  const commentId = req.body.commentId;
  Comment.remove({ _id: commentId }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    Post.findByIdAndUpdate({ _id: req.body.postId }, { $pull: { comments: { $in: [commentId] } } }, { new: true })
      .populate({
        path: 'comments',
        populate: { path: 'commentBy', select: '_id name' }
      })
      .populate({
        path: 'comments',
        populate: { path: 'subComment.commentBy', select: '_id name' }
      })
      .exec((err, result2) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        res.json(result2.comments)
      })
  });
}

//delete subcomment
const deleteSubComment = (req, res) => {
  const subCommentId = req.body.subCommentId;
  Comment.findByIdAndUpdate({ _id: req.body.commentId }, { $pull: { subComment: { _id: subCommentId } } }, { new: true })
    .populate({
      path: 'comments',
      populate: { path: 'subComment.commentBy', select: '_id name' }
    })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(204).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      console.log(result);
      res.json(result.subComment)
    })
}
//update comment
const updateComment = (req, res) => {
  const commentId = req.body.commentId;
  const content = req.body.content;
  Comment.updateOne({ _id: commentId }, { content: content }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result);
  })
}

//update subcomment
const updateSubComment = (req, res) => {
  const subCommentId = req.body.subCommentId;
  const content = req.body.content;
  Comment.updateOne({ 'subComment._id': subCommentId }, {
    '$set': {
      'subComment.$.content': content
    }
  }, (err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    return res.status(200).json({
      message: 'ok',
      data: {}
    })
  })
}
//add subComment
const addSubComment = (req, res, next) => {
  var subComment = {};
  subComment.content = req.body.content;
  subComment.commentBy = req.body.userId;
  Comment.findByIdAndUpdate({ '_id': req.body.commentId }, { $push: { 'subComment': subComment } }, { new: true })
    .populate('subComment.commentBy')
    .exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result.subComment);
    })
}

//like comment
const likeComment = (req, res) => {
  var like={};
  like.likeBy=req.params.userId;
  Comment.findByIdAndUpdate({ _id: req.body.commentId }, 
    { $push: { likes: like },$inc: { totalLike: 1 }}, 
    { new: true })
    .exec((err, result) => {
      if (err || !result) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      return res.status('200').json({
        msg: "Added"
      })
    })
}

//unlike comment
const unLikeComment = (req, res) => {
  var like={};
  like.likeBy=req.params.userId;
  Comment.findByIdAndUpdate({ _id: req.body.commentId }, 
    { $pull: { likes: like },$inc: { totalLike: -1 }})
    .exec((err, result) => {
      if (err || !result) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      return res.status('200').json({
        msg: "unlike sucssess"
      })
    })
}

//check like
const checkLike = (req, res) => {
  const temp = req.query;
  var userId=temp.userId;
  var commentId=temp.commentId;
  Comment.find({ _id: commentId },
      { likes: { $elemMatch: {likeBy:userId } } }
  )
      .exec((err, result) => {
          if (err||!result[0].likes[0]) {
              return res.status(401).json({
                  error: "Dont have like"
              })
          }
          res.json({success:true});
      })
}

module.exports = {
  addComment: addComment,
  addSubComment: addSubComment,
  deleteComment: deleteComment,
  getComment: getComment,
  updateComment: updateComment,
  checkAuthorizedComment: checkAuthorizedComment,
  checkAuthorizedSubComment: checkAuthorizedSubComment,
  deleteSubComment: deleteSubComment,
  updateSubComment: updateSubComment,
  likeComment:likeComment,
  unLikeComment:unLikeComment,
  checkLike:checkLike
}
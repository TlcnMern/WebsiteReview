const Post=require('../models/post.model');
const Comment=require('../models/comment.model');
const errorHandler =require('../helpers/dbErrorHandler');
const fs=require('fs');


//commnet
const checkAuthorizedComment = (req, res) => {
  const commentID=req.body.commentID;
  const userID=req.session.userId;
  Comment.findOne({_id:commentID,commentBy:userID}, (err, comment) => {
    if (err || !comment){
      return res.status('204').json({
        error: "User not authorized"
      });
    }
    return res.json(true);
  })
}

const checkAuthorizedSubComment = (req, res) => {
  // const commentId=req.body.commentId;
  const subCommentId=req.body.subCommentId;
  // console.log(subCommentId)
  const userID=req.session.userId;
  Comment.find({'subComment._id':subCommentId},{subComment: { $elemMatch: { commentBy: userID } }})
  .exec((err, result) => {
    // console.log(result[0])
    if (err || result[0].subComment.length<=0){
      return res.status(204).json({
        error: "User not authorized subcomment"
      });
    }
    // console.log(result[0])
    return res.json(true);
  })
}
  //get comment and sub comment of 1 post
const getComment=(req,res)=>{
  Post.find({_id:req.post._id})
  .populate({
    path:'comments',
    populate: { path: 'commentBy',select:'_id name' }
  })
  .populate({
    path:'comments',
    populate: { path: 'subComment.commentBy',select:'_id name'}
  })
  .exec((err, posts) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(posts[0].comments);
  })
}
  //add comment
const addComment=(req,res,next)=>{
  let comment=new Comment(req.body);
  comment.save((err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    Post.findByIdAndUpdate(req.body.postId, {$push: {comments: result._id}}, {new: true})
    .populate('postedBy', '_id name')
    .populate({
      path:'comments',
      populate: { path: 'commentBy',select:'_id name' }
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
const deleteComment=(req,res)=>{
  const commentId= req.body.commentId;
  Comment.remove({_id:commentId},(err,result)=>{
    if(err){
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    Post.findByIdAndUpdate({_id:req.body.postId},{$pull:{comments:{$in: [commentId]}}}, {new: true})
    .populate({
      path:'comments',
      populate: { path: 'commentBy',select:'_id name' }
    })
    .populate({
      path:'comments',
      populate: { path: 'subComment.commentBy',select:'_id name'}
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
const deleteSubComment=(req,res)=>{
  const subCommentId=req.body.subCommentId;
  Comment.findByIdAndUpdate({_id:req.body.commentId},{$pull: { subComment: { _id: subCommentId } }}, {new: true})
  .populate({
    path:'comments',
    populate: { path: 'subComment.commentBy',select:'_id name'}
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
  const commentId=req.body.commentId;
  const content =req.body.content;
  Comment.updateOne({_id:commentId},{content:content},(err,result)=>{
    if(err){
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
  const subCommentId=req.body.subCommentId;
  const content =req.body.content;
  Comment.updateOne({'subComment._id':subCommentId}, {'$set': {
    'subComment.$.content': content
}},(err)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    return res.status(200).json({
      message:'ok',
      data:{}
    })
  })
}
  //add subComment
const addSubComment=(req,res,next)=>{
  var subComment={};
  subComment.content=req.body.content;
  subComment.commentBy=req.body.userId;
  Comment.findByIdAndUpdate({'_id':req.body.commentId}, {$push: {'subComment': subComment}},{new: true})
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

module.exports={
    addComment:addComment,
    addSubComment:addSubComment,
    deleteComment:deleteComment,
    getComment:getComment,
    updateComment:updateComment,
    checkAuthorizedComment:checkAuthorizedComment,
    checkAuthorizedSubComment:checkAuthorizedSubComment,
    deleteSubComment:deleteSubComment,
    updateSubComment:updateSubComment
}
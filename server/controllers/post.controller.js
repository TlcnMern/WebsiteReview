const Post=require('../models/post.model');
const Comment=require('../models/comment.model');
const errorHandler =require('../helpers/dbErrorHandler');
const formidable=require('formidable');
const fs=require('fs');

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let post = new Post(fields);
    post.postedBy= req.profile._id;
    if(files.photo){
      post.photo.data = fs.readFileSync(files.photo.path);//Buffer(fs.readFileSync(req.file.path), 'base64');
      post.photo.contentType = files.photo.type;//lấy định dạng ảnh
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result);

    })
  })
}

const getNewFeeds=(req,res,next)=>{
  Post.find({})
  .populate('postedBy', '_id name')
  // .populate({
  //   path:'comments',
  //   populate: { path: 'commentBy',select:'_id name' }
  // })
  // .populate({
  //   path:'comments',
  //   populate: { path: 'subComment.commentBy',select:'_id name'}
  // })
  .sort('-created')
  .exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(posts);
  })
}

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.json(req.post.photo);
}

const postByID = (req, res, next, id) => {
  Post.findById(id).populate('postedBy', '_id name').exec((err, post) => {
    if (err || !post)
      return res.status('400').json({
        error: "Post not found"
      })
    req.post = post
    next()
  })
}

//commnet
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

//rating
  //add rating of user
const addRating=(req,res)=>{
  let rating ={};
  rating.point = req.body.point;
  rating.postedBy = req.body.userId;
  console.log(rating);
  Post.findByIdAndUpdate({_id:req.body.postId}, {$push: {ratings: rating}}, {new: true})
  .populate('ratings.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    console.log(result)
    res.json(result);
  })
}

  //check user used to evaluation for post ? show rating : set rating 0
const checkRatingAndShow=(req,res)=>{
  const userId = req.body.userId;
  const postId = req.body.postId;
  Post.find({_id:postId },
    {ratings: { $elemMatch: { postedBy:userId } }}
  )
  .populate('ratings.postedBy', '_id point')
  .exec((err, result) => {
    if (err || !result){
      console.log(err);
      return res.status('400').json({
        error: "Post not found"
      })
    }
    res.json(result[0].ratings);
  })
}

  //update Rating When user used to evaluation
const updateRatingOfUser=(req,res)=>{
  const userId=req.body.userId;
  const postId=req.body.postId;
  const point =req.body.point;
  Post.update({_id:postId,'ratings.postedBy':userId}, {$set: {'ratings.$.point': point}} )
  .exec((err,result)=>{
    if(err || !result){
      console.log(err);
      return res.status('400').json({
        error:"Post not found"
      })
    }
    console.log(result);
    res.json(result);
  })
}


module.exports={
    create:create,
    getNewFeeds:getNewFeeds,
    photo:photo,
    postByID:postByID,
    addComment:addComment,
    addRating:addRating,
    checkRatingAndShow:checkRatingAndShow,
    updateRatingOfUser:updateRatingOfUser,
    addSubComment:addSubComment,
    deleteComment:deleteComment,
    getComment:getComment,
    updateComment:updateComment
}
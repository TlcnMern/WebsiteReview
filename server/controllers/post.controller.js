const Post=require('../models/post.model');
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
    post.postedBy= req.profile;
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
  Post.find({},{title:1,theme:1,content:1,contentSummary:1,productReview:1,link:1,created:1,comments:1})
  .populate('postedBy', '_id name')
  .populate('comments.postedBy', '_id name')
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

const addComment=(req,res,next)=>{
  let commentD ={};
  commentD.content = req.body.comment;
  commentD.postedBy = req.body.userId;
  Post.findByIdAndUpdate(req.body.postId, {$push: {comments: commentD}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result);
  })
}


// //version2
// const addComment=(req,res,next)=>{
//   let comment=new Comment(req.body);
//   comment.save((err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       })
//     }
//     Post.findByIdAndUpdate(req.body.postId, {$push: {comments: result._id}}, {new: true})
//     .populate('comments.postedBy', '_id name')
//     .populate('postedBy', '_id name')
//     .exec((err, result2) => {
//       if (err) {
//         return res.status(400).json({
//           error: errorHandler.getErrorMessage(err)
//         })
//       }
//           console.log(result2);
//       // res.json(result);
//     })


//     res.json(result);

//   })

 
// }

const addSubComment=(req,res,next)=>{
  console.log(req.body);
  var subComment={};
  subComment.content=req.body.content;
  subComment.commentBy=req.body.userId;
  Post.updateOne({'_id':req.body.postId,'comments._id':req.body.commentId}, {$push: {'comments.$.subComment': subComment}})
  .populate('comments.postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    console.log(result);
    res.json(result);
  })
}

//add rating of user
const addRating=(req,res,next)=>{
  let rating ={};
  rating.point = req.body.point;
  rating.postedBy = req.body.userId;
  Post.findByIdAndUpdate(req.body.postId, {$push: {ratings: rating}}, {new: true})
  .populate('ratings.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
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
    if (err || !result)
      return res.status('400').json({
        error: "Post not found"
      })
    // console.log(result[0].ratings)
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
    addSubComment:addSubComment
}
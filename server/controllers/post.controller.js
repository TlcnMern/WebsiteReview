const Post=require('../models/post.model');
// const Comment=require('../models/comment.model');
const errorHandler =require('../helpers/dbErrorHandler');
const formidable=require('formidable');
// const fs=require('fs');
const Rating =require ('../models/rating.model');

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir='./dist';
  form.keepExtensions = true;
  form.maxFieldsSize=10*1024*1024;//10MB
  form.multiples=true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    // for (const file of Object.entries(files['photo'])) {
    //   console.log(file);
    // }
    let post = new Post(fields);
    post.postedBy= req.profile._id;
    var listImage=files.photo;
    if(listImage){
      var listPathImage=[];
      if(Array.isArray(listImage)){
        listImage.forEach(element => {
          listPathImage.push(element.path.toString().replace("\\","/"));
        });
      }
      else{
        listPathImage.push(listImage.path.toString().replace("\\","/"));
      }
      post.photo = listPathImage;
      post.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        res.json(result);
      })
    }
    else{
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const getNewFeeds=(req,res)=>{
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

const getDetailPost=(req,res)=>{
  const postId=req.params.postId;
  Post.find({_id:postId})
  .populate('postedBy', '_id name')
  .exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(post);
  })
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
//rating
  //add rating of user
  //ver1
// const addRating=(req,res)=>{
//   let rating ={};
//   rating.point = req.body.point;
//   rating.postedBy = req.body.userId;
//   Post.findByIdAndUpdate({_id:req.body.postId}, {$push: {ratings: rating}}, {new: true})
//   .populate('ratings.postedBy', '_id name')
//   .populate('postedBy', '_id name')
//   .exec((err, result) => {
//     if (err||!result) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       })
//     }
//     return res.status('200').json({
//       msg:"Added"
//     })
//   })
// }


const addRating=(req,res)=>{
  let rating =new Rating({
    point:req.body.point,
    postedBy:req.body.userId,
    postId:req.body.postId
  });
  rating.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    return res.status('200').json({
      msg:"Added"
    })
  });
}

  //check user used to evaluation for post ? show rating : set rating 0
// const checkRatingAndShow=(req,res)=>{
//   const userId = req.body.userId;
//   const postId = req.body.postId;
//   Post.find({_id:postId },
//     {ratings: { $elemMatch: { postedBy:userId } }}
//   )
//   .populate('ratings.postedBy', '_id point')
//   .exec((err, result) => {
//     if (err || !result){
//       console.log(err);
//       return res.status('400').json({
//         error: "Post not found"
//       })
//     }
//     res.json(result[0].ratings);
//   })
// }

const checkRatingAndShow=(req,res)=>{
  const userId = req.body.userId;
  const postId = req.body.postId;
  Rating.find({postId:postId,postedBy:userId})
  .exec((err, result) => {
    if (err || !result[0]){
      return res.status('400').json({
        error: "Rating not found"
      })
    }
    res.json(result[0].point);
  })
}

  //update Rating When user used to evaluation
// const updateRatingOfUser=(req,res)=>{
//   const userId=req.body.userId;
//   const postId=req.body.postId;
//   const point =req.body.point;
//   Post.update({_id:postId,'ratings.postedBy':userId}, {$set: {'ratings.$.point': point}} )
//   .exec((err,result)=>{
//     if(err || !result){
//       console.log(err);
//       return res.status('400').json({
//         error:"Post not found"
//       })
//     }
//     return res.status('200').json({
//       msg:"Updated"
//     })
//   })
// }

const updateRatingOfUser=(req,res)=>{
  const userId=req.body.userId;
  const postId=req.body.postId;
  const point =req.body.point;
  Rating.update({postId:postId,postedBy:userId}, {$set: {point: point}} )
  .exec((err,result)=>{
    if(err || !result){
      console.log(err);
      return res.status('400').json({
        error:"Rating not found"
      })
    }
    return res.status('200').json({
      msg:"Updated"
    })
  })
}

module.exports={
    create:create,
    getNewFeeds:getNewFeeds,
    getDetailPost:getDetailPost,
    postByID:postByID,
    addRating:addRating,
    checkRatingAndShow:checkRatingAndShow,
    updateRatingOfUser:updateRatingOfUser
}
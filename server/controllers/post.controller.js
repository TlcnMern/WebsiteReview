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
    Post.find({})
    .populate('postedBy', '_id name')
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

module.exports={
    create:create,
    getNewFeeds:getNewFeeds,
    photo:photo,
    postByID:postByID,
    addComment:addComment
}
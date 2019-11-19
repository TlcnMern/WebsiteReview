const Post = require('../models/post.model');
const formidable=require('formidable');
const errorHandler = require('../helpers/dbErrorHandler');

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = './dist';
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;//10MB
  form.multiples = true;
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
    post.postedBy = req.profile._id;
    post.pointRating = {point:null}
    var listImage = files.photo;
    if (listImage) {
      var listPathImage = [];
      if (Array.isArray(listImage)) {
        listImage.forEach(element => {
          listPathImage.push(element.path.toString().replace("\\", "/"));
        });
      }
      else {
        listPathImage.push(listImage.path.toString().replace("\\", "/"));
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
    else {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const getNewFeeds = (req, res) => {
  Post.find({})
    .populate('postedBy', '_id name avatar')
    // .populate({
    //   path:'comments',
    //   populate: { path: 'commentBy',select:'_id name' }
    // })
    // .populate({
    //   path:'comments',
    //   populate: { path: 'subComment.commentBy',select:'_id name'}
    // })
    .sort({'created':-1})
    .exec((err, posts) => {

      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      posts=posts.slice(0,3);
      res.json(posts);
    })
}

const getPostFeatured = (req, res) => {

  Post.find({})
    .populate('postedBy', '_id name avatar')
    .sort({'pointRating.totalRate':-1})
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      posts=posts.slice(0,5);
      res.json(posts);
    })
}

const getTopListPostFollowTheme = (req, res) => {
  const theme=req.params.theme;
  Post.find({theme:theme})
    .populate('postedBy', '_id name avatar')
    .sort({'pointRating.totalRate':-1})
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      posts=posts.slice(0,5);
      res.json(posts);
    })
}

const searchPost = (req, res) => {
  const query=req.query;
  Post.find({title: {'$regex': query.search, '$options': "i"}})
    .populate('postedBy', '_id name avatar')
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(posts);
    })
}

const getDetailPost = (req, res) => {
  const postId = req.params.postId;
  Post.find({ _id: postId })
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

module.exports = {
  create: create,
  getNewFeeds: getNewFeeds,
  getDetailPost: getDetailPost,
  postByID: postByID,
  getPostFeatured:getPostFeatured,
  getTopListPostFollowTheme:getTopListPostFollowTheme,
  searchPost:searchPost
}
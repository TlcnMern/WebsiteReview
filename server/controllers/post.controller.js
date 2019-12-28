const Post = require('../models/post.model');
const formidable = require('formidable');
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
    let post = new Post(fields);
    post.postedBy = req.profile._id;
    post.state=false;
    post.pointRating = { point: null }
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
  var query={
    hiden:null,
    state:true
  }
  if(req.profile){
    query.postedBy= { $in : req.profile.following }
  }
  Post.find(query)
    .populate('postedBy', '_id name avatar')
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

const getPostPaginate = (req, res) => {
  const page = req.params.page;
  Post.paginate({hiden:null,state:true}, {populate:{path:'postedBy',select:'_id name avatar'}, page: page, limit: 10 }, function(err, result){
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result);
  })
};

const getPostFeatured = (req, res) => {
  Post.find({hiden:null,state:true})
    .populate('postedBy', '_id name avatar')
    .sort({ 'pointRating.totalRate': -1 })
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

const getTopListPostFollowTheme = (req, res) => {
  const theme = req.params.theme;
  Post.find({ theme: theme,hiden:null,state:true})
    .populate('postedBy', '_id name avatar')
    .sort({ 'pointRating.totalRate': -1 })
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

const searchPost = (req, res) => {
  const query = req.query;
  Post.find({ productReview: { '$regex': query.search, '$options': "i" },hiden:null,state:true })
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

const sortPost = (req, res) => {
  const temp = req.query;
  var query = {hiden:null,state:true};
  if (temp.theme) {
    query.theme = temp.theme;
  }
  if (temp.kind) {
    query.kind = temp.kind
  }
  if (temp.formality) {
    query.formality = temp.formality
  }

  var sort = {}
  if (temp.sortRate) {
    if (temp.sortRate === '1') {
      sort = { 'pointRating.point': -1 };
    }
    if (temp.sortRate === '2') {
      sort = { 'pointRating.totalRate': -1 };
    }
  }

  Post.find(query)
    .populate('postedBy', '_id name avatar')
    .sort(sort)
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

const likePost = (req, res) => {
  var like = {};
  like.likeBy = req.params.userId;
  Post.findByIdAndUpdate({ _id: req.body.postId },
    { $push: { likes: like }, $inc: { totalLike: 1 } })
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
//check like
const checkLikePost = (req, res) => {
  const temp = req.query;
  var userId = temp.userId;
  var postId = temp.postId;
  Post.find({ _id: postId },
    { likes: { $elemMatch: { likeBy: userId } } }
  )
    .exec((err, result) => {
      if (err || !result[0].likes[0]) {
        return res.status(401).json({
          error: "Dont have like"
        })
      }
      res.json({ success: true });
    })
}

//unlike
const unLikePost = (req, res) => {
  var like = {};
  like.likeBy = req.params.userId;
  Post.findByIdAndUpdate({ _id: req.body.postId },
    { $pull: { likes: like }, $inc: { totalLike: -1 } })
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

module.exports = {
  create: create,
  getNewFeeds: getNewFeeds,
  getDetailPost: getDetailPost,
  postByID: postByID,
  getPostFeatured: getPostFeatured,
  getTopListPostFollowTheme: getTopListPostFollowTheme,
  searchPost: searchPost,
  sortPost: sortPost,
  getPostPaginate:getPostPaginate,
  likePost:likePost,
  checkLikePost:checkLikePost,
  unLikePost:unLikePost
}
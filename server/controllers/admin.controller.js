const Post = require('../models/post.model');
const errorHandler = require('../helpers/dbErrorHandler');
const getPostList = (req, res) => {
    const temp = req.query;
    var query = {hiden:null};
    query.state = temp.state
    if (temp.productReview) {
        query.productReview = { '$regex': temp.productReview, '$options': "i" }
    }
    Post.find(query)
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

const hidenPost = (req, res) => {
    const postId = req.params.postId;
    Post.findByIdAndUpdate({_id:postId},{hiden:true,state:false})
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(result);
        })
}

const allowPost = (req, res) => {
    const postId = req.params.postId;
    Post.findByIdAndUpdate({_id:postId},{state:true})
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(result);
        })
}

module.exports = {
    getPostList: getPostList,
    hidenPost:hidenPost,
    allowPost:allowPost
}
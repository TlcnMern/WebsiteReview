const Post = require('../models/post.model');
const User = require('../models/user.model');
const errorHandler = require('../helpers/dbErrorHandler');


// quan ly bai viet
const getPostList = (req, res) => {
    const temp = req.query;
    var query = { hiden: null };
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
    Post.findByIdAndUpdate({ _id: postId }, { hiden: true, state: false })
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
    Post.findByIdAndUpdate({ _id: postId }, { state: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(result);
        })
}


// quan ly nguoi dung
const getUserList = (req, res) => {
    const temp = req.query;
    var query = {};
    if (temp.name) {
        query.name = { '$regex': temp.name, '$options': "i" }
    }
    User.find(query)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(users);
        })
}

//quan ly thong ke

//get top 5 post popular follow Month
const getPostPopularFollowMonth = (req, res) => {
    Post.aggregate([
        { $project: { title: 1, pointRating: 1, photo: 1, postedBy: 1, month: { $month: '$created' } } },
        { $match: { month: parseInt(req.params.month) } }
    ])
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

//get top 5 post high rating follow Month
const getPostHighRateFollowMonth = (req, res) => {
    Post.aggregate([
        // { $project: { title: 1, pointRating: 1, photo: 1, postedBy: 1, month: { $month: '$created' } } },
        // { $match: { month: parseInt(req.params.month) } },
        {
            $lookup: {
                from: "User",
                localField: "name",    // field in the orders collection
                foreignField: "name",  // field in the items collection
                as: "postedBy"
             }
        },
    ])
        // .populate('postedBy', '_id name avatar')
        .sort({ 'pointRating.totalRate': -1 })
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            // posts = posts.slice(0, 5);
            res.json(posts);
        })
}
//get 10 people have high number post follow month
const getUserRaking = (req, res) => {
    Post.aggregate([
        {
            $group: {
                _id: { postedBy: "$postedBy", month: { $month: '$created' } },
                count: { $sum: 1 }
            }
        },
        { $match: { '_id.month': parseInt(req.params.month) } }
    ])
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            return res.json(result);
        })
}

module.exports = {
    getPostList: getPostList,
    hidenPost: hidenPost,
    allowPost: allowPost,
    getUserList: getUserList,

    getPostPopularFollowMonth: getPostPopularFollowMonth,
    getPostHighRateFollowMonth: getPostHighRateFollowMonth,
    getUserRaking: getUserRaking
}
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
        .sort({ 'pointRating.totalRate': -1 })
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }

            User.populate(posts, { path: 'postedBy' }, function (err, result) {
                // Your populated translactions are inside populatedTransactions
                result = result.slice(0, 5);
                res.json(result);
            });
        })
}

//get top 5 post high rating follow Month
const getPostHighRateFollowMonth = (req, res) => {
    Post.aggregate([
        { $project: { title: 1, pointRating: 1, photo: 1, postedBy: 1, month: { $month: '$created' } } },
        { $match: { month: parseInt(req.params.month) } },
        // {
        //     "$lookup": {
        //         "from": "User",
        //         "localField": "postedBy.str",    // field in the orders collection
        //         "foreignField": "_id",  // field in the items collection
        //         "as": "postedBy"
        //      }
        // },
    ])
        // .populate('postedBy', '_id name avatar')
        .sort({ 'pointRating.point': -1 })
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }

            User.populate(posts, { path: 'postedBy' }, function (err, result) {
                // Your populated translactions are inside populatedTransactions
                result = result.slice(0, 5);
                res.json(result);
            });


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
        { $match: { '_id.month': parseInt(req.params.month) } },
    ])
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            User.populate(result, { path: '_id.postedBy' }, function (err, users) {
                // Your populated translactions are inside populatedTransactions
                users = users.slice(0, 5);
                res.json(users);
            });
        })
}

//get quantity users each month
const getQuantityUsersEachMonth = (req, res) => {
    User.aggregate([
        {
            $group: {
                _id: {month: { $month: '$created' } },
                count: { $sum: 1 }
            }
        }
    ])
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(result);
        })
}

//get quantity post follow theme each month
const getQuantityPostFollowThemeEachMonth = (req, res) => {
    Post.aggregate([
        {
            $group: {
                _id: {month: { $month: '$created' },theme:'$theme',year: { $year: "$created" }},
                count: { $sum: 1 }
            }
        }
    ])
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
    hidenPost: hidenPost,
    allowPost: allowPost,
    getUserList: getUserList,

    getPostPopularFollowMonth: getPostPopularFollowMonth,
    getPostHighRateFollowMonth: getPostHighRateFollowMonth,
    getUserRaking: getUserRaking,
    getQuantityUsersEachMonth: getQuantityUsersEachMonth,
    getQuantityPostFollowThemeEachMonth:getQuantityPostFollowThemeEachMonth
}
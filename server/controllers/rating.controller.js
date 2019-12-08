const Post = require('../models/post.model');
const errorHandler = require('../helpers/dbErrorHandler');
//rating
const addRating = (req, res) => {
    let rating = {};
    rating.point = req.body.point;
    rating.postedBy = req.body.userId;
    Post.findByIdAndUpdate({ _id: req.body.postId }, { $push: { ratings: rating } }, { new: true })
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

const checkRatingAndShow = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    Post.find({ _id: postId },
        { ratings: { $elemMatch: { postedBy: userId } } }
    )
        .exec((err, result) => {
            if (err || !result[0].ratings[0]) {
                return res.status(401).json({
                    error: "Dont have rating"
                })
            }
            res.json(result[0].ratings[0].point);
        })
}

const updateRatingOfUser = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const point = req.body.point;
    Post.update({ _id: postId, 'ratings.postedBy': userId }, { $set: { 'ratings.$.point': point } })
        .exec((err, result) => {
            if (err || !result) {
                return res.status('400').json({
                    error: "Post not found"
                })
            }
            return res.status('200').json({
                msg: "Updated"
            })
        })
}

const calculateRaingtingEachPost = (req, res) => {
    Post.find({})
        .exec((err, posts) => {
            if (err || !posts[0]) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            posts.forEach(post => {
                var oneStar = 0, twoStar = 0, threeStar = 0, fourStar = 0, fiveStar = 0;
                if (post.ratings.length > 0) {
                    post.ratings.forEach(rating => {
                        switch (rating.point) {
                            case 0: {
                                oneStar = oneStar + 1;//so luong nguoi danh gia
                                break;
                            }
                            case 1: {
                                twoStar = twoStar + 1;
                                break;
                            }
                            case 2: {
                                threeStar = threeStar + 1;
                                break;
                            }
                            case 3: {
                                fourStar = fourStar + 1;
                                break;
                            }
                            case 4: {
                                fiveStar = fiveStar + 1;
                                break;
                            }
                        }
                    });
                    var totalRate = (oneStar + twoStar + threeStar + fourStar + fiveStar);
                    var point = ((1 * oneStar) + (2 * twoStar) + (3 * threeStar) + (4 * fourStar) + (5 * fiveStar)) / totalRate;
                    var n = parseFloat(point);
                    point = Math.round(n * 100) / 100
                    var pointRating = {
                        point: point,
                        totalRate: totalRate,
                        oneStar: oneStar,
                        twoStar: twoStar,
                        threeStar: threeStar,
                        fourStar: fourStar,
                        fiveStar: fiveStar
                    }

                    Post.update({ _id: post._id }, { $set: { 'pointRating': pointRating } })
                        .exec((err) => {
                            if (err) {
                                return res.status('400').json({
                                    error: "err"
                                })
                            }
                        })
                }
            });

            res.status(200).json({
                data: posts,
                msg: 'calculate Raingting Each Post done'
            });
        })
}

module.exports = {
    addRating: addRating,
    checkRatingAndShow: checkRatingAndShow,
    updateRatingOfUser: updateRatingOfUser,
    calculateRaingtingEachPost: calculateRaingtingEachPost
}
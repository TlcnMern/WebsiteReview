const mongoose = require('mongoose');
const RatingSchema = new mongoose.Schema({
    postId:{type:mongoose.Schema.ObjectId, ref: 'Post'},
    point:{
        type:Number
    },
    created:{type:Date,default:Date.now},
    postedBy:{type:mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports= mongoose.model('Rating', RatingSchema);
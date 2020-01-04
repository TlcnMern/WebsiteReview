const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'content is required'
  },
  
  subComment: [{
    content: String,
    created:{ type: Date, default: Date.now},
    commentBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],

  commentBy: {type: mongoose.Schema.ObjectId, ref: 'User'},

  totalLike:{
    type:Number,
    default:0
  },

  likes: [{
    likeBy:{ type: mongoose.Schema.ObjectId, ref: 'User'}
  }
  ],

  created: {
    type: Date,
    default: Date.now
  }
})

module.exports= mongoose.model('Comment', CommentSchema);
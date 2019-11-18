const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required:'Title is required'
  },
  theme:{
    type: String,
    required:'theme is required'
  },
  productReview:{
    type: String,
    required: 'productReview is require'
  },

  contentSummary:{
    type:String,
    required:'content summary is require'
  },

  link:{
    type:String,
  },

  content: {
    type: String,
    required: 'content is required'
  },

  photo: [{
    type:String
  }],
  
  comments:[{type:mongoose.Schema.ObjectId, ref: 'Comment'}],

  ratings:[{
    point:Number,
    created:{type:Date,default:Date.now},
    postedBy:{type:mongoose.Schema.ObjectId, ref: 'User'}
  }],

  pointRating:{
    point:Number,
    oneStar:Number,
    twoStar:Number,
    threeStar:Number,
    fourStar:Number,
    fiveStar:Number
  },

  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},

  created: {
    type: Date,
    default: Date.now
  }
})

module.exports= mongoose.model('Post', PostSchema);
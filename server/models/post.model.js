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
  photo: {
    data: Buffer,
    contentType: String
  },
  comments: [{
    content: String,
    subComment:[{
      content: String,
      created:{ type: Date, default: Date.now},
      commentBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
    }],
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  ratings:[{
    point:Number,
    created:{type:Date,default:Date.now},
    postedBy:{type:mongoose.Schema.ObjectId, ref: 'User'}
  }],
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports= mongoose.model('Post', PostSchema);
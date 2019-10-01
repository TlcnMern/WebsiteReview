const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required:'Title is required'
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
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports= mongoose.model('Post', PostSchema);
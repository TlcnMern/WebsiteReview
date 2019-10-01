const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'content is required'
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports= mongoose.model('Post', PostSchema);
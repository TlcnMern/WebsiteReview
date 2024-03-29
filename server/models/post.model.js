const mongoose = require('mongoose');
const mongoosePaginate =require('mongoose-paginate');
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  theme: {
    type: String,
    required: 'theme is required'
  },

  kind: {
    type: String
  },

  formality: {
    type: String
  },

  productReview: {
    type: String,
    required: 'productReview is require'
  },

  contentSummary: {
    type: String,
    required: 'content summary is require'
  },

  link: {
    type: String,
  },

  linkYoutube: {
    type: String,
  },

  content: {
    type: String,
    required: 'content is required'
  },

  photo: [{
    type: String
  }],

  totalLike:{
    type:Number,
    default:0
  },

  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],

  ratings: [{
    point: Number,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  
  likes:[{
    likeBy:{ type: mongoose.Schema.ObjectId, ref: 'User'}
  }],

  state: {
    type: Boolean,
    default: false
  },

  hiden: {
    type: Boolean
  },

  pointRating: {
    point: Number,
    totalRate: Number,
    oneStar: Number,
    twoStar: Number,
    threeStar: Number,
    fourStar: Number,
    fiveStar: Number
  },

  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },

  created: {
    type: Date,
    default: Date.now
  },

  hiden: {
    type: Boolean,
  },

})
PostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Post', PostSchema);
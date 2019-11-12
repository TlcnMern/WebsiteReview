const mongoose = require('mongoose');
var crypto = require('crypto');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    hashed_password:{
      type:String
    },
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  name: {
    type: String,
    trim: true
  },
  role: {
    type: String
  },
  birthday: {
    type: Date
  },

  gender: {
    type: String
  },

  salt: String,

  avatar: {
    type:String
  },
  background: {
    type:String
  },
  created: {
    type: Date,
    default: Date.now
  },
  notifyComment: [{
    commentBy: {type:mongoose.Schema.ObjectId, ref: 'User'},
    postComment: {type:mongoose.Schema.ObjectId, ref: 'Post'},
    seen:{
      type:Boolean,
      default:false
    }
  }],
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.local.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
});


userSchema.path('local.hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null);

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.local.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
};

module.exports= mongoose.model('User', userSchema);
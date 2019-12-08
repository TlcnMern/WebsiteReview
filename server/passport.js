const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config/config');
const User = require('./models/user.model');
const {aclStore}=require('./helpers/acl-store');

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    // console.log('profile', profile);
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);

    // console.log(profile)
    const existingUser = await User.findOne({ "google.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'google',
      name:profile.displayName,
      google: {
        id: profile.id,
        email: profile.emails[0].value
      },
      avatar:profile.photos[0].value.replace("=s50","")
    });

    await newUser.save((err,result)=>{
      if(err){
        console.log(err);
      }
      aclStore.acl.addUserRoles(result._id.toString(),'user');
      done(null, result);
    });

  } catch(error) {
    console.log(error);
    done(error, false, error.message);
  }
}));

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log('profile', profile);
    
    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      name:profile.displayName,
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      },
      avatar:profile.photos[0].value
    });

    await newUser.save((err,result)=>{
      if(err){
        console.log(err);
      }
      aclStore.acl.addUserRoles(result._id.toString(),'user');
      done(null, result);
    });
  } catch(error) {
    done(error, false, error.message);
  }
}));
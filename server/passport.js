const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config = require('./config/config');
const User = require('./models/usertest');

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

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
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    console.log(error);
    done(error, false, error.message);
  }
}));
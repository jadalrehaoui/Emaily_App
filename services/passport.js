const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
  done(null, user.id)
})
passport.deserializeUser( (id, done) => {
  User.findById(id).then(user => { done(null, user)} )
})
passport.use(new GoogleStrategy(
    // configuration
    {
      clientID: keys.GOOGLE_ClientID,
      clientSecret: keys.GOOGLE_ClientSecret,
      callbackURL: '/api/auth/google/callback', // same as google API Services callback
      proxy: true, // to let google trust the proxy in production
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({googleID: profile.id}) // async action
      if(!user){
        const user = await new User({
          googleID: profile.id,
          name: profile.displayName
        }).save();
        return done(null, user) // error = null, user = user created
      }
      // else
      return done(null, user); // error = null, user = user already existing

    }
  )
);

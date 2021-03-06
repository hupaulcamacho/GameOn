const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbAPI = require('../db/dbAPI');
const helpers = require('./helpers');

//Session configuration
passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  dbAPI.getUserById(id, (err, user) => {
    done(err, user)
  })
})

//Strategy conf
//The strategy runs first then the serialization 
passport.use(
  new LocalStrategy((username, password, done) => {
      dbAPI.getUserByUsername(username, (err, user) => {
        if(err) return done(err);
        if(!user) return done(null, false);
        if(!helpers.comparePasswords(password, user.password_digest)) return done(null, false);
        //If none of the above then all went well
        const userWithoutPassword = {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          profile_pic: user.profile_pic,
        }
        //console.log(user)
        return done(null, userWithoutPassword)
      })
    })
)

module.exports = passport;

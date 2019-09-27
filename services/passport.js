const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const key = require("../config/key").jwtkey;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key
};

const localLogin = new LocalStrategy(
  { usernameField: "email" },
  function(email, password, done) {
    if (!email || !password) return done(null, false);
    User.findOne({ email }).then(user => {
      if (!user) return done(null, false);
      user.comparePassword(password, function(err, isMatch) {
        if (err) return done(err);
        console.log(isMatch);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    });
  }
);
const jwtStrategy = new JWTStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = passport => {
  passport.use(jwtStrategy);
  passport.use(localLogin);
};

const passport = require('passport');
const User = require('../models/User');

const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.initialize();
passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },

    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, userId, password, done) => {
      try {
        const { nickname, avatar } = req.body;

        let user = await User.findOne({ userId });
        const userNickname = await User.findOne({ nickname });

        if (user) {
          return done(null, false, {
            errors: [{ msg: '아이디가 이미 존재합니다..' }],
          });
        }

        if (userNickname) {
          return done(null, false, {
            errors: [{ msg: '닉네임이 이미 존재합니다..' }],
          });
        }

        user = new User({
          userId,
          nickname,
          avatar,
          password,
        });

        await user.save();

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
    },
    async (userId, password, done) => {
      try {
        const user = await User.findOne({ userId });

        if (!user || user === null) {
          return done(null, false, {
            errors: [{ msg: '사용자가 존재하지 않습니다.' }],
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            errors: [{ msg: '패스워드가 일치하지 않습니다.' }],
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = { passport };

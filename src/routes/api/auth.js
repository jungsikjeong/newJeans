const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// user by token
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    console.log(req);
    console.log(req.user);
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

// 회원가입
router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: '회원가입 완료',
      user: req.user,
    });
  }
);

// 로그인
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      if (!user) {
        return res.status(401).json({
          errors: [{ msg: '유저를 찾을 수 없습니다.' }],
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, userId: user.userId };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;

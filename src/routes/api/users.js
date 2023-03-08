const express = require('express');
const passport = require('passport');
const router = express.Router();

const isLogin = require('../../middleware/isLogin');

const User = require('../../models/User');

// 유저 정보 변경
router.post('/edit/profile', isLogin, async (req, res) => {
  const { nickname, password, avatar } = req.body;
  try {
    if (!password || password.length === 0) {
      const user = await User.findById(req.user);
      const exist = await User.find({ nickname: nickname });

      if (exist && exist.length !== 0) {
        return res.status(404).json({
          errors: { msg: '이미 존재하는 닉네임입니다.' },
        });
      }

      const newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            nickname: nickname ? nickname : user.nickname,
            avatar: avatar ? avatar : user.avatar,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);
    } else {
      const user = await User.findById(req.user);
      const exist = await User.find({ nickname: nickname });

      if (exist && exist.length !== 0) {
        return res.status(404).json({
          errors: { msg: '이미 존재하는 닉네임입니다.' },
        });
      }

      const newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            nickname: nickname ? nickname : user.nickname,
            avatar: avatar ? avatar : user.avatar,
            password: password,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      await user.save();

      return res.json(newUser);
    }
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;

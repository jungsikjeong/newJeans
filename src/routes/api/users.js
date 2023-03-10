const express = require('express');
const passport = require('passport');
const router = express.Router();

const isLogin = require('../../middleware/isLogin');
const bcrypt = require('bcrypt');

const User = require('../../models/User');

// 유저 정보 변경
router.post('/edit/profile', isLogin, async (req, res) => {
  const { nickname, password, avatar, nicknameMode, passwordMode } = req.body;

  try {
    let newUser;
    const user = await User.findById(req.user);

    // 닉네임만 바꾸면,
    if (nicknameMode && !passwordMode) {
      const exist = await User.find({ nickname: nickname });

      if (exist && exist.length !== 0) {
        return res.status(404).json({
          errors: { msg: '이미 존재하는 닉네임입니다.' },
        });
      }

      newUser = await User.findByIdAndUpdate(
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
    }

    // 패스워드만 바꾸면,
    if (passwordMode && !nicknameMode) {
      const hash = await bcrypt.hash(password, 10);

      newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            nickname: nickname ? nickname : user.nickname,
            avatar: avatar ? avatar : user.avatar,
            password: hash,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);
    }

    // 닉네임, 패스워드 둘다 바꾸게된다면,
    if (passwordMode && nicknameMode) {
      const hash = await bcrypt.hash(password, 10);

      const exist = await User.find({ nickname: nickname });

      if (exist && exist.length !== 0) {
        return res.status(404).json({
          errors: { msg: '이미 존재하는 닉네임입니다.' },
        });
      }

      newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            nickname: nickname ? nickname : user.nickname,
            avatar: avatar ? avatar : user.avatar,
            password: hash,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);
    }

    // 아바타만 변경하게된다면,
    newUser = await User.findByIdAndUpdate(
      user,
      {
        $set: {
          avatar: avatar ? avatar : user.avatar,
        },
      },
      { new: true }
    )
      .select('-password')
      .exec();

    return res.json(newUser);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;

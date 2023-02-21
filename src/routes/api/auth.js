const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

// 회원가입
router.post(
  '/register',
  [
    check('userId', '유저 아이디를 확인해주세요').not().isEmpty().isLength({
      max: 12,
    }),
    check('nickname', '닉네임을 확인해주세요').not().isEmpty().isLength({
      min: 2,
      max: 6,
    }),
    check('password', '6자 이상의 비밀번호를 입력해주세요').isLength({
      min: 6,
      max: 6,
    }),
  ],
  async () => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, nickname, password } = req.body;

    console.log(userId, nickname, password);
  }
);

module.exports = router;

const express = require('express');
const passport = require('passport');

const upload = require('../../middleware/multer');
const isLogin = require('../../middleware/isLogin');

const router = express.Router();

router.post('/', isLogin, upload.single('file'), async (req, res, p) => {
  try {
    console.log('야');
    console.log(req.file);
    res.json({
      success: true,
      fileInfo: req.file,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

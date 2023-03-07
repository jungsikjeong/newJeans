const express = require('express');
const router = express.Router();

const isLogin = require('../../middleware/isLogin');
const upload = require('../../middleware/multer');

const Post = require('../../models/Post');
const User = require('../../models/User');

let now = new Date();
let yearNum = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let year = yearNum.toString();
let newYear = parseInt(year.substr(2, 3));
let fullDate = '';

// fullDate += newYear + '.' + month + '.' + date;
fullDate = `${newYear}.${month}.${date}.${hours}${minutes}${seconds}`;

/** 모든 게시글 불러오기 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({
        date: -1,
      })
      .limit(12);
    // .skip(6);

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 게시글 작성 */
router.post('/', isLogin, upload.single('file'), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { title, textBody, category } = JSON.parse(obj.data);

  try {
    const user = await User.findById(req.user);
    const newPost = new Post({
      title: title,
      body: textBody,
      category: category,
      image: req.file.filename ? req.file.filename : '',
      date: fullDate,
    });

    user.posts.push(newPost);
    await user.save();

    const post = await newPost.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

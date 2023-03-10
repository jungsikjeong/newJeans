const express = require('express');
const router = express.Router();

const isLogin = require('../../middleware/isLogin');
const upload = require('../../middleware/multer');

const Post = require('../../models/Post');
const User = require('../../models/User');

function dataFun() {
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

  fullDate = `${newYear}.${month}.${date}${hours}${minutes}${seconds}`;

  return fullDate;
}

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

/** 마이페이지에서 내가 쓴글 불러오기 */
router.get('/mypage', isLogin, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user }).sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 특정 게시글 불러오기 */
router.get('/:id', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 특정 게시글 수정하기 */
router.put('/:id', isLogin, upload.single('file'), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { title, textBody, category } = obj;

  const currentDate = dataFun();

  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      const newPost = await Post.findByIdAndUpdate(
        post,
        {
          $set: {
            title: title ? title : post.title,
            body: textBody ? textBody : post.body,
            category: category ? category : post.category,
            image: req.file?.filename ? req.file.filename : post.image,
            user: req.user,
            date: currentDate,
          },
        },
        { new: true }
      ).exec();

      return res.json(newPost);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 게시글 작성 */
router.post('/', isLogin, upload.single('file'), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { title, textBody, category } = JSON.parse(obj.data);

  const currentDate = dataFun();
  console.log(obj);
  try {
    const newPost = new Post({
      title: title,
      body: textBody,
      category: category,
      image: req.file.filename ? req.file.filename : '',
      user: req.user,
      date: currentDate,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

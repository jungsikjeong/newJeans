const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
  const { value } = req.query;
  const page = parseInt(req.body.params?.page || '1', 10);

  const posts = await Post.find()
    .or([{ title: { $regex: value, $options: /^ABC/i } }, { category: value }])
    .sort({ _id: -1 })
    .skip((page - 1) * 12)
    .limit(12)
    .lean();

  const postCount = await Post.countDocuments().exec();

  res.header('Last-Page', postCount);

  if (posts.length === 0 || !posts) {
    return res.status(404).json({
      errors: { msg: 'No posts found' },
    });
  }

  return res.status(200).json(posts);
});

module.exports = router;

const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  if (text) {
    const posts = await Post.find({ category: text }).sort({ _id: -1 }).exec();
    if (posts.length === 0 || !posts) {
      return res.status(404).json({
        errors: { msg: 'No posts found' },
      });
    }

    return res.status(200).json(posts);
  } else {
    const posts = await Post.find({ category: req.query.value })
      .sort({ _id: -1 })
      .exec();

    if (posts.length === 0 || !posts) {
      return res.status(404).json({
        errors: { msg: 'No posts found' },
      });
    }

    return res.status(200).json(posts);
  }
});

module.exports = router;

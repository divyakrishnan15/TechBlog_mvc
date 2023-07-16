const { Comment } = require('../models');

const userComment = [
  {
    user_id: 1,
    post_id:1,
    comment_desc:'this is my first blog post'
  },
  {
    user_id: 1,
    post_id:2,
    comment_desc:'this is my second blog post'
  },
  {
    user_id: 2,
    post_id:1,
    comment_desc:'Javascript blog'
  },
  {
    user_id: 3,
    post_id:1,
    comment_desc:'Node Expressjs blog'
  },
];

const seedComment = () => Comment.bulkCreate(userComment);

module.exports = seedComment;

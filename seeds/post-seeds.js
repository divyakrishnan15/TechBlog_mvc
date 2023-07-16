const { Post } = require('../models');

const userPost = [
  {
    title: 'reactjs',
    post_content:'Reactjs is most used front end dev language',
    post_date:'2023-07-23',
    user_id:1
  },
  {
    title: 'javascript',
    post_content:'Javascript is most used scripting language',
    post_date:'2023-07-25',
    user_id:2
  },
  {
    title: 'nodejs',
    post_content:'Node is most used Back end dev language',
    post_date:'2023-07-28',
    user_id:3
  },
];

const seedPost = () => Post.bulkCreate(userPost);

module.exports = seedPost;

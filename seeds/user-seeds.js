const { User } = require('../models');

const userData = [
  {
    username: 'divya',
    email:'divya@gmail.com',
    password:'testt12345'
  },
  {
    username: 'sush',
    email:'sush@gmail.com',
    password:'susht12345'
  },
  {
    username: 'krish',
    email:'krish@gmail.com',
    password:'krish12345'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

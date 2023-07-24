const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations

// POST - USER

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
});



// COMMENT - POST
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
});



// COMMENT - USER
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
});
  

module.exports = {User, Post, Comment};
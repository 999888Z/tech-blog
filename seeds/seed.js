const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user.json');
const blogPost = require('./blog-post.json');

const commentData = require('./comment.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Post.bulkCreate(blogPost, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
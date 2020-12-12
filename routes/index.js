const express = require('express');
const BlogPostController = require('../controllers/BlogPostController');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'status'});
});


router.get('/api/blog-post', BlogPostController.getPosts); // Get all posts
router.get('/api/:user_id/blog-post', BlogPostController.getUserPosts); // Get all user posts
router.get('/api/:user_id/blog-post/post_id', BlogPostController.getUserPost) // Get particular post

router.post('/api/:user_id/blog-post', BlogPostController.createBlogPost); // Create a new post for a user

router.patch('/api/:user_id/blog-post/:post_id', BlogPostController.updatePost); // Update an existing post for paticular user

router.delete('/api/:user_id/blog-post/:post_id', BlogPostController.updatePost); // Remove particular post

module.exports = router;
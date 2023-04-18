const express = require('express');
const router = express.Router();
const postController = require('../Controllers/PostController');

router.get('/get-posts', postController.getAllPosts);
router.post('/add-posts', postController.addPost);
router.get('/get-comments', postController.getAllComments);
router.post('/add-comment', postController.addComment);
router.get('/get-replies', postController.getAllReplies);
router.post('/add-replies', postController.addReplies);
router.get('/get-followers/:id', postController.getFollowers);
router.get('/get-following/:id', postController.getFollowing);
router.post('/add-follower', postController.addFollower);


module.exports = router;